import os
import random
import string
import datetime
from pymongo import MongoClient
from redis import Redis
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017")
REDIS_URI = os.environ.get("REDIS_URI", "redis://localhost:6379/0")

# Setup MongoDB
try:
    mongo_client = MongoClient(MONGO_URI)
    db = mongo_client['lolbomber']
    premium_keys_col = db['premium_keys']
    attacks_col = db['attacks'] # NEW collection for attack logs
except Exception as e:
    print(f"MongoDB Connection Warning: {e}")

# Setup Redis
try:
    redis_client = Redis.from_url(REDIS_URI, decode_responses=True)
except Exception as e:
    print(f"Redis Connection Warning: {e}")


def generate_key_string():
    # Format: LOL-UK21-SDA1363 (LOL-[2L][2D]-[3L][4D])
    p1_l = ''.join(random.choices(string.ascii_uppercase, k=2))
    p1_d = ''.join(random.choices(string.digits, k=2))
    p2_l = ''.join(random.choices(string.ascii_uppercase, k=3))
    p2_d = ''.join(random.choices(string.digits, k=4))
    return f"LOL-{p1_l}{p1_d}-{p2_l}{p2_d}"

def add_new_key(order_id, payment_id):
    """
    Creates a new key, saves it to MongoDB, and returns the key string.
    """
    new_key = generate_key_string()
    
    doc = {
        "key_string": new_key,
        "razorpay_order_id": order_id,
        "razorpay_payment_id": payment_id,
        "created_at": datetime.datetime.utcnow(),
        "is_active": True
    }
    
    # Insert to MongoDB
    premium_keys_col.insert_one(doc)
    
    # Warm up Cache (set validity for 1 hour to prevent DB queries)
    redis_client.setex(f"premium_key:{new_key}", 3600, "1")
    
    return new_key

def is_key_valid(key_string):
    """
    Checks if a key is valid. Hits Redis First. Defaults to MongoDB if cache miss.
    """
    if not key_string:
        return False
        
    cache_key = f"premium_key:{key_string}"
    
    # 1. Check Redis Cache First (Microsecond operation)
    try:
        if redis_client.exists(cache_key):
            val = redis_client.get(cache_key)
            return val == "1"
    except:
        pass # Fallback to Mongo if Redis goes down
        
    # 2. Cache Miss - Check MongoDB (Millisecond operation)
    doc = premium_keys_col.find_one({"key_string": key_string})
    if doc and doc.get("is_active"):
        # Save to Redis for next time (Cache for 10 minutes)
        try:
            redis_client.setex(cache_key, 600, "1")
        except:
            pass
        return True
    else:
        # Save invalid state to redis to cache bad requests for 1 minute
        try:
            redis_client.setex(cache_key, 60, "0")
        except:
            pass
        return False

def is_rate_limited(ip_address):
    """
    Check if an IP address has exceeded the limit of 10 requests per 5 minutes for Free mode.
    """
    limit = 10
    window = 300 # 5 minutes in seconds
    key = f"rate_limit:{ip_address}"
    
    try:
        current = redis_client.get(key)
        if current and int(current) >= limit:
            return True
        
        # Increment and set expiry if first request
        pipe = redis_client.pipeline()
        pipe.incr(key)
        pipe.expire(key, window)
        pipe.execute()
    except:
        pass # If Redis fails, allow the request to prevent false positives
        
    return False

def log_attack(attack_type, target, mode):
    """
    Store an attack record in MongoDB.
    """
    try:
        attacks_col.insert_one({
            "type": attack_type,
            "target": target,
            "mode": mode,
            "timestamp": datetime.datetime.utcnow()
        })
    except:
        pass

def get_admin_stats():
    """
    Aggregate statistics for the Admin Dashboard.
    """
    try:
        total_keys = premium_keys_col.count_documents({})
        total_revenue = total_keys * 49
        
        # Attacks in the last 24 hours
        yesterday = datetime.datetime.utcnow() - datetime.timedelta(hours=24)
        attacks_24h = attacks_col.count_documents({"timestamp": {"$gt": yesterday}})
        
        # Top 10 most recent attacks
        recent_attacks = list(attacks_col.find({}, {"_id": 0, "type": 1, "target": 1, "mode": 1, "timestamp": 1})
                              .sort("timestamp", -1).limit(10))
        
        return {
            "total_keys": total_keys,
            "total_revenue": total_revenue,
            "attacks_24h": attacks_24h,
            "recent_attacks": recent_attacks
        }
    except Exception as e:
        return {"error": str(e)}

def get_analytics_data():
    """
    Returns daily attack and revenue counts for the last 7 days for Chart.js.
    """
    try:
        days = []
        attack_counts = []
        revenue_counts = []
        
        for i in range(6, -1, -1):
            date = (datetime.datetime.utcnow() - datetime.timedelta(days=i)).date()
            start = datetime.datetime.combine(date, datetime.time.min)
            end = datetime.datetime.combine(date, datetime.time.max)
            
            # Count attacks for this day
            a_count = attacks_col.count_documents({"timestamp": {"$gte": start, "$lte": end}})
            
            # Count keys sold for this day (to calc revenue)
            k_count = premium_keys_col.count_documents({"created_at": {"$gte": start, "$lte": end}})
            
            days.append(date.strftime("%d %b"))
            attack_counts.append(a_count)
            revenue_counts.append(k_count * 49)
            
        return {
            "labels": days,
            "attacks": attack_counts,
            "revenue": revenue_counts
        }
    except Exception as e:
        return {"error": str(e)}

def list_all_keys():
    """
    Return all issued keys from MongoDB.
    """
    try:
        keys = list(premium_keys_col.find({}, {"_id": 0}).sort("created_at", -1))
        return keys
    except Exception as e:
        return []

def toggle_key_status(key_string):
    """
    Deactivate or Activate a license key.
    """
    try:
        doc = premium_keys_col.find_one({"key_string": key_string})
        if not doc:
            return False
            
        new_status = not doc.get("is_active", True)
        premium_keys_col.update_one({"key_string": key_string}, {"$set": {"is_active": new_status}})
        
        # Sync Cache immediately
        redis_client.setex(f"premium_key:{key_string}", 600, "1" if new_status else "0")
        return True
    except:
        return False

def generate_admin_key(custom_key=None):
    """
    Manually generate a license key from Admin Panel.
    """
    new_key = custom_key if custom_key else generate_key_string()
    
    # Check if key already exists
    if premium_keys_col.find_one({"key_string": new_key}):
        return None
        
    doc = {
        "key_string": new_key,
        "razorpay_order_id": "ADMIN_MANUAL",
        "razorpay_payment_id": "ADMIN_MANUAL",
        "created_at": datetime.datetime.utcnow(),
        "is_active": True
    }
    
    premium_keys_col.insert_one(doc)
    redis_client.setex(f"premium_key:{new_key}", 3600, "1")
    return new_key
