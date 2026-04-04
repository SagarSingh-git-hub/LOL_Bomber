<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=timeGradient&height=200&section=header&text=LOLBomber%20v3.0&fontSize=80&fontAlignY=35&desc=Next-Gen%20Bulk%20Bombing%20Platform&descAlignY=55&descAlign=50" />

  <p align="center">
    <strong>The most powerful, beautifully designed, and reliable bombing service available in 2026.</strong>
  </p>

  <p align="center">
    <a href="#features"><img src="https://img.shields.io/badge/Version-3.0.0-blue.svg?style=for-the-badge&color=0ea5e9"></a>
    <a href="#tech-stack"><img src="https://img.shields.io/badge/Python-Flask-blue.svg?style=for-the-badge&logo=python&color=3776AB&logoColor=yellow"></a>
    <a href="#tech-stack"><img src="https://img.shields.io/badge/Database-MongoDB-green.svg?style=for-the-badge&logo=mongodb&color=47A248"></a>
    <a href="#tech-stack"><img src="https://img.shields.io/badge/Cache-Redis-red.svg?style=for-the-badge&logo=redis&color=DC382D"></a>
  </p>
</div>

---

## ⚡ Overview

**LOLBomber** provides an advanced, ultra-fast bombing service that lets you send high volumes of SMS, calls, emails, and WhatsApp messages to numbers for *entertainment and prank purposes*. With its hyper-modern **glass-morphism UI** and dark mode, you not only get an incredibly powerful tool but also one that looks absolutely stunning. 

Join thousands of satisfied users who trust our free, highly-available bombing solutions!

> **⚠️ DISCLAIMER:** This project is solely for **educational and entertainment purposes**. It is your responsibility to comply with local laws and obtain consent from any individual you interact with using this tool.

---

## 🔥 Key Features

### 💣 Bombing Capabilities
- **📱 SMS Bomber**: Send unlimited, rapid-fire SMS messages.
- **📞 Call Bomber**: Automate multiple voice calls effortlessly.
- **✉️ Email Bomber**: Dispatch bulk emails reliably and fast.
- **💬 WhatsApp Bomber**: Automate messages via WhatsApp.

### 💎 Monetization & License System
- **Razorpay Integration**: Fully automated payment gateway for buying Premium Keys (₹49).
- **Secure Key Generation**: Cryptographically secure keys (format: `LOL-XX00-XXX0000`) verified via backend.
- **Hybrid Bombing**: 
  - **Free Mode**: Sliding-window rate limit (10 req/5 min) via Redis.
  - **Premium Mode**: High-speed, custom message delivery via Twilio SDK.

### 🛡️ Protection & Security
- **Anti-Bomb Shield**: Protect your own number from existing bombing attacks forever.
- **Rate-Limiting**: Built-in mechanisms to prevent systemic abuse.
- **Privacy First**: Temporary processing only. No sensitive data is ever stored on our servers.

### 📊 SaaS Admin Dashboard (Secret)
- **Central Command**: Real-time analytics charts (Revenue & Traffic) using Chart.js.
- **License Manager**: Live search, revoke/restore keys, and manual key generation.
- **Operation Logs**: Detailed global activity monitoring.

### 💻 User Experience
- **Live Console**: A real-time terminal interface to monitor attacks.
- **Dynamic Stats Board**: Live tracking of current active users and daily payload delivery.
- **Premium Glassmorphism**: Modern UI powered by TailwindCSS, frosted glass effects, smooth hover animations, and a cohesive dark theme.

### 🛡️ Enterprise-Grade Security
- **Redis Rate Limiter**: Protects server resources from spam/DDoS.
- **MongoDB Persistence**: Encrypted attack logs and transaction records.
- **Admin Authentication**: Header-based password protection with session persistence.

---

## 🛠️ Tech Stack

*   **Frontend**: React 18 (CDN), Tailwind CSS 3, Chart.js, Lucide/FontAwesome.
*   **Backend**: Python 3.10+, Flask, Flask-CORS.
*   **Database**: MongoDB (Persistence) & Redis (Cache/Rate-Limiting).
*   **APIs & SDKs**: Razorpay (Payments), Twilio (Premium SMS).

---

## 🚀 Installation & Setup

### 1. Prerequisites
Ensure you have the following installed:
- [Python 3.10+](https://nodejs.org/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [Redis for Windows/Linux](https://github.com/tporadowski/redis/releases)

### 2. Configure Environment
Create a `.env` file in the `backend/` directory:
```bash
# Mongo & Redis
MONGO_URI=mongodb://localhost:27017
REDIS_URI=redis://localhost:6379/0

# Razorpay (For billing)
RAZORPAY_KEY_ID=your_rzp_id
RAZORPAY_KEY_SECRET=your_rzp_secret

# Twilio (For Premium SMS)
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_number

# Admin Security
ADMIN_PASSWORD=your_secure_password
```

### 3. Start the Engines
**Terminal 1 (Backend):**
```bash
cd backend
pip install -r requirements.txt
python app.py
```

**Terminal 2 (Frontend):**
```bash
# In the root directory
python -m http.server 3000
```

Visit `http://localhost:3000` to access the platform.

---

## 📂 Project Structure

```text
📦 LOLBomber
 ┣ 📂 backend/                  # Python Flask Backend
 ┃ ┣ 📜 app.py                  # API Endpoints & Payment Logic
 ┃ ┣ 📜 database.py             # MongoDB & Redis Integration
 ┃ ┣ 📜 .env                    # Configuration Keys
 ┃ ┗ 📜 requirements.txt        # Dependencies
 ┣ 📂 components/               # React UI Components (SaaS Grade)
 ┃ ┣ 📜 AttackPanel.js          # Unified Free/Premium Interface
 ┃ ┣ 📜 AdminDashboard.js       # SaaS Management Console
 ┃ ┣ 📜 NewSidebar.js           # Modern Navigation
 ┃ ┗ ... (Refactorized components)
 ┣ 📜 app.js                    # Main Application Logic
 ┣ 📜 index.html                # Entry Point (Chart.js & Babel)
 ┗ 📜 README.md                 # Documentation
```

---

## 🤝 Support
Join our community of pranksters! 
- **Secret Admin**: Find the subtle dot link in the footer to access reports.
- **Feedback**: Open a ticket for new features or API integration ideas.

---

## 🤝 Support & Contributions

If you love this project, please consider leaving a ⭐! 

- **Found a bug?** Open an [Issue](https://github.com/SagarSingh-git-hub/LOL_Bomber/issues).
- **Have an idea?** Submit a [Pull Request](https://github.com/SagarSingh-git-hub/LOL_Bomber/pulls).
- **Need help?** Contact our support via email: *support@lolbomber.example.com*

---

> **⚠️ LEGAL DISCLAIMER:** This software is for educational purposes only. Misuse of this tool for harassment is strictly prohibited!
