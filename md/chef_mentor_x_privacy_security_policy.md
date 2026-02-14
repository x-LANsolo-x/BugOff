# ChefMentor X – Privacy & Security Policy

**Version:** 1.0  
**Last Updated:** February 12, 2026  
**Status:** Approved for Implementation

---

## 1. Overview

This document defines privacy practices and security measures for ChefMentor X to protect user data and ensure compliance with regulations.

### Core Principles
1. **Privacy by Design:** Minimal data collection, user control
2. **Transparency:** Clear communication about data usage
3. **Security First:** Industry-standard security practices
4. **Compliance:** GDPR, CCPA, and mobile app store requirements

---

## 2. Data Collection & Usage

### 2.1 What Data We Collect

**Account Information:**
- Email address (for login)
- Name (optional, for personalization)
- OAuth provider data (Google login)
- Skill level (beginner/intermediate/advanced)
- Created timestamp

**Cooking Activity Data:**
- Recipes viewed/cooked
- Cooking sessions (start/end times, completion status)
- Steps completed
- Questions asked to AI
- Timer usage
- Session duration

**Uploaded Content:**
- Dish photos (for Failed Dish Analysis)
- Upload timestamp
- Associated recipe/session

**Device & Analytics:**
- Device type (iOS/Android)
- App version
- Session analytics (PostHog)
- Error logs (Sentry)
- Performance metrics

**Voice Data:**
- Voice commands transcribed to text (audio NOT stored)
- Intent classification results

---

### 2.2 What Data We DO NOT Collect

❌ Precise geolocation  
❌ Audio recordings (deleted after transcription)  
❌ Contacts  
❌ Payment information (no monetization in MVP)  
❌ Health data  
❌ Biometric data  
❌ Third-party tracking cookies

---

### 2.3 How We Use Data

**Primary Uses:**
- Provide cooking guidance and AI mentoring
- Save user progress and preferences
- Analyze dish photos for feedback
- Improve app features and performance
- Debug errors and issues

**We DO NOT:**
- ❌ Sell user data to third parties
- ❌ Use data for advertising
- ❌ Share photos publicly without consent
- ❌ Train AI models on user data (without explicit consent)

---

## 3. Data Storage & Retention

### 3.1 Storage Locations

| Data Type | Storage | Location | Encryption |
|-----------|---------|----------|------------|
| User accounts | PostgreSQL | Railway (US/EU) | At rest (AES-256) |
| Cooking sessions | PostgreSQL | Railway (US/EU) | At rest (AES-256) |
| Uploaded photos | Cloudinary | CDN (global) | HTTPS in transit |
| Analytics | PostHog | Self-hosted or cloud | At rest |
| Logs | Railway/Sentry | US/EU | At rest |

---

### 3.2 Data Retention Policy

**Active Data (while user has account):**
- Account information: Indefinite (until account deletion)
- Cooking sessions: 90 days (auto-delete after)
- Uploaded photos: 30 days (auto-delete after)
- Analytics events: 90 days
- Error logs: 30 days

**Deleted Account:**
- All user data permanently deleted within 7 days
- Aggregated analytics (anonymized) may be retained

**Implementation:**
```python
# Automated cleanup job (runs daily)
async def cleanup_old_data():
    """Delete data past retention period"""
    
    # Delete sessions older than 90 days
    cutoff_90 = datetime.utcnow() - timedelta(days=90)
    await db.cooking_sessions.delete_many({
        "created_at": {"$lt": cutoff_90}
    })
    
    # Delete photos older than 30 days
    cutoff_30 = datetime.utcnow() - timedelta(days=30)
    old_photos = await db.uploaded_photos.find({
        "uploaded_at": {"$lt": cutoff_30}
    })
    
    for photo in old_photos:
        # Delete from Cloudinary
        await cloudinary_client.delete(photo["cloudinary_id"])
        # Delete from DB
        await db.uploaded_photos.delete_one({"id": photo["id"]})
    
    logger.info("Automated data cleanup completed")
```

---

## 4. User Privacy Controls

### 4.1 User Rights

**Users can:**
- ✅ View all their data (data export)
- ✅ Delete their account and all data
- ✅ Opt out of analytics
- ✅ Delete individual photos
- ✅ Delete cooking sessions
- ✅ Change privacy settings

**Implementation:**
```python
# API endpoint for data export
@app.get("/api/user/export-data")
async def export_user_data(current_user: User):
    """Export all user data as JSON"""
    
    data = {
        "user": {
            "email": current_user.email,
            "name": current_user.name,
            "skill_level": current_user.skill_level,
            "created_at": current_user.created_at.isoformat()
        },
        "sessions": await get_user_sessions(current_user.id),
        "photos": await get_user_photos(current_user.id),
        "preferences": await get_user_preferences(current_user.id)
    }
    
    return JSONResponse(content=data)

# API endpoint for account deletion
@app.delete("/api/user/account")
async def delete_account(current_user: User):
    """Permanently delete user account and all data"""
    
    # Delete uploaded photos from Cloudinary
    photos = await db.uploaded_photos.find({"user_id": current_user.id})
    for photo in photos:
        await cloudinary_client.delete(photo["cloudinary_id"])
    
    # Delete all user data (cascading)
    await db.users.delete_one({"id": current_user.id})
    
    # Log deletion for compliance
    await db.audit_logs.insert_one({
        "event": "account_deleted",
        "user_id": current_user.id,
        "timestamp": datetime.utcnow()
    })
    
    return {"message": "Account deleted successfully"}
```

---

### 4.2 Photo Upload Consent Flow

**First-Time Photo Upload:**

```typescript
// Frontend consent dialog
function PhotoUploadConsent() {
  const [consentGiven, setConsentGiven] = useState(false);
  
  const handleConsent = async () => {
    // Save consent preference
    await api.updateUserPreferences({
      photo_upload_consent: true,
      consented_at: new Date().toISOString()
    });
    
    setConsentGiven(true);
  };
  
  return (
    <Modal visible={!consentGiven}>
      <Text>Photo Privacy Notice</Text>
      <Text>
        Your photos are processed by AI to provide cooking feedback.
        
        - Photos stored for 30 days, then auto-deleted
        - Processed securely, never shared publicly
        - You can delete photos anytime
        - Not used to train AI models
      </Text>
      
      <Button onPress={handleConsent}>I Understand</Button>
      <Button onPress={() => navigation.goBack()}>Cancel</Button>
    </Modal>
  );
}
```

**Backend Validation:**
```python
@app.post("/api/photos/upload")
async def upload_photo(
    file: UploadFile,
    current_user: User
):
    """Upload photo with consent check"""
    
    # Check if user has given consent
    preferences = await db.user_preferences.find_one({"user_id": current_user.id})
    
    if not preferences or not preferences.get("photo_upload_consent"):
        raise HTTPException(
            status_code=403,
            detail="Photo upload consent required"
        )
    
    # Proceed with upload
    # ...
```

---

## 5. Security Measures

### 5.1 Authentication & Authorization

**JWT Token Security:**
```python
# JWT configuration
JWT_SECRET = os.getenv("JWT_SECRET")  # Strong random secret
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15  # Short-lived tokens
REFRESH_TOKEN_EXPIRE_DAYS = 7

# Token generation
def create_access_token(user_id: str) -> str:
    """Create JWT access token"""
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    payload = {
        "sub": user_id,
        "exp": expire,
        "iat": datetime.utcnow(),
        "type": "access"
    }
    
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

# Token validation
async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    """Validate JWT and return user"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("sub")
        
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user = await db.users.find_one({"id": user_id})
        
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        
        return User(**user)
        
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

---

### 5.2 Password Security

**Hashing:**
```python
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against hash"""
    return pwd_context.verify(plain_password, hashed_password)
```

**Password Requirements:**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character

```python
import re

def validate_password(password: str) -> bool:
    """Validate password strength"""
    if len(password) < 8:
        return False
    
    if not re.search(r"[A-Z]", password):
        return False
    
    if not re.search(r"[a-z]", password):
        return False
    
    if not re.search(r"\d", password):
        return False
    
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False
    
    return True
```

---

### 5.3 API Rate Limiting

**Tiered Rate Limits:**
```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

# General API endpoints
@app.get("/api/recipes")
@limiter.limit("60/minute")  # 60 requests per minute
async def get_recipes():
    pass

# AI endpoints (more expensive)
@app.post("/api/ai/guidance")
@limiter.limit("20/minute")  # 20 requests per minute
async def ai_guidance():
    pass

# Photo upload (abuse prevention)
@app.post("/api/photos/upload")
@limiter.limit("5/hour")  # 5 uploads per hour
async def upload_photo():
    pass

# Authentication (brute force prevention)
@app.post("/api/auth/login")
@limiter.limit("5/minute")  # 5 login attempts per minute
async def login():
    pass
```

---

### 5.4 File Upload Security

**Validation & Sanitization:**
```python
from PIL import Image
import io

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "heic"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

async def validate_and_process_image(file: UploadFile) -> bytes:
    """Validate and sanitize uploaded image"""
    
    # Check file extension
    ext = file.filename.split(".")[-1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(400, "Invalid file type")
    
    # Read file
    contents = await file.read()
    
    # Check file size
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(400, "File too large")
    
    # Validate it's actually an image (and strip EXIF metadata)
    try:
        image = Image.open(io.BytesIO(contents))
        
        # Re-encode image (removes EXIF metadata, malicious payloads)
        buffer = io.BytesIO()
        image.save(buffer, format="JPEG", quality=85)
        return buffer.getvalue()
        
    except Exception as e:
        raise HTTPException(400, "Invalid image file")
```

**Virus Scanning (Optional for Production):**
```python
import clamd

async def scan_file_for_viruses(file_contents: bytes) -> bool:
    """Scan file with ClamAV"""
    try:
        cd = clamd.ClamdUnixSocket()
        result = cd.scan_stream(file_contents)
        
        # Check if clean
        if result and 'stream' in result:
            status = result['stream'][0]
            return status == 'OK'
        
        return False
    except Exception as e:
        logger.error(f"Virus scan failed: {e}")
        return False  # Fail safe: reject file if scan fails
```

---

### 5.5 SQL Injection Prevention

**Using SQLAlchemy (Parameterized Queries):**
```python
# GOOD: SQLAlchemy automatically parameterizes
from sqlalchemy import select

async def get_user_by_email(email: str):
    stmt = select(User).where(User.email == email)
    result = await session.execute(stmt)
    return result.scalar_one_or_none()

# BAD: Never do string concatenation
# stmt = f"SELECT * FROM users WHERE email = '{email}'"  # VULNERABLE!
```

---

### 5.6 XSS Prevention

**Input Sanitization:**
```python
from markupsafe import escape

def sanitize_user_input(text: str) -> str:
    """Sanitize user input to prevent XSS"""
    return escape(text)

# Example usage
@app.post("/api/sessions/note")
async def add_session_note(note: str, current_user: User):
    """Add note to cooking session"""
    
    # Sanitize before storing
    sanitized_note = sanitize_user_input(note)
    
    await db.session_notes.insert_one({
        "user_id": current_user.id,
        "note": sanitized_note,
        "created_at": datetime.utcnow()
    })
```

---

### 5.7 HTTPS/TLS

**All API Communication:**
- ✅ HTTPS enforced (TLS 1.2+)
- ✅ Certificate pinning (mobile app)
- ✅ No HTTP fallback

**CORS Configuration:**
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://chefmentor.app",  # Production frontend
        "http://localhost:8081",   # Expo dev server
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)
```

---

## 6. Third-Party Services

### 6.1 Service Inventory

| Service | Purpose | Data Shared | Privacy Policy |
|---------|---------|-------------|----------------|
| Google OAuth | Authentication | Email, name | https://policies.google.com/privacy |
| Gemini API | AI responses | Prompts (no PII) | https://ai.google.dev/terms |
| Groq API | AI fallback | Prompts (no PII) | https://groq.com/privacy |
| Cloudinary | Photo storage | Uploaded images | https://cloudinary.com/privacy |
| PostHog | Analytics | Usage events | https://posthog.com/privacy |
| Sentry | Error tracking | Error logs | https://sentry.io/privacy |
| Railway | Hosting | All backend data | https://railway.app/legal/privacy |

---

### 6.2 Data Processing Agreements

**Required for Production:**
- [ ] Sign DPA with Cloudinary
- [ ] Review Google Gemini API terms
- [ ] Review Groq API terms
- [ ] Configure PostHog data retention
- [ ] Configure Sentry data scrubbing

---

## 7. Compliance

### 7.1 GDPR Compliance (EU Users)

**Requirements Met:**
- ✅ Lawful basis: User consent for photo processing
- ✅ Right to access: Data export API
- ✅ Right to erasure: Account deletion
- ✅ Right to rectification: Update profile API
- ✅ Right to data portability: JSON export
- ✅ Data minimization: Only collect necessary data
- ✅ Purpose limitation: Data used only for stated purposes
- ✅ Storage limitation: Auto-delete after retention period

**GDPR Checklist:**
- [ ] Privacy policy updated
- [ ] Cookie consent (if web version)
- [ ] Data Processing Agreement with processors
- [ ] Appoint Data Protection Officer (if required)
- [ ] Breach notification process (72 hours)

---

### 7.2 CCPA Compliance (California Users)

**Requirements Met:**
- ✅ Right to know: Privacy policy discloses data collection
- ✅ Right to delete: Account deletion API
- ✅ Right to opt-out: Analytics opt-out
- ✅ Non-discrimination: No penalty for opting out
- ✅ Do Not Sell: We don't sell user data

**CCPA Notice:**
```
California Residents: You have the right to request disclosure of 
what personal information we collect and how we use it. You also have 
the right to request deletion of your personal information. 

We do not sell your personal information to third parties.

To exercise your rights, contact: privacy@chefmentor.app
```

---

### 7.3 App Store Requirements

**Apple App Store:**
- ✅ Privacy nutrition labels (App Privacy section)
- ✅ In-app privacy policy link
- ✅ No tracking without ATT (App Tracking Transparency)
- ✅ Data collection disclosure

**Google Play Store:**
- ✅ Data safety section completed
- ✅ Privacy policy link
- ✅ Data types disclosed
- ✅ Data security practices disclosed

---

## 8. Incident Response

### 8.1 Data Breach Response Plan

**If breach detected:**

1. **Contain (< 1 hour):**
   - Isolate affected systems
   - Stop data exfiltration
   - Preserve evidence

2. **Assess (< 4 hours):**
   - Determine scope (how many users affected)
   - Identify what data was accessed
   - Assess risk level

3. **Notify (< 72 hours):**
   - **GDPR:** Notify supervisory authority within 72 hours
   - **CCPA:** Notify California AG if > 500 residents affected
   - **Users:** Notify affected users if high risk
   - **Partners:** Notify relevant third parties

4. **Remediate:**
   - Patch vulnerability
   - Reset credentials if needed
   - Improve security measures

5. **Document:**
   - Create incident report
   - Lessons learned
   - Update security policies

**Contact:**
- Security Team: security@chefmentor.app
- Legal Team: legal@chefmentor.app

---

### 8.2 Security Monitoring

**Automated Alerts:**
```python
# Example: Alert on suspicious activity
async def monitor_suspicious_activity():
    """Monitor for security anomalies"""
    
    # Multiple failed login attempts
    failed_logins = await db.audit_logs.count_documents({
        "event": "login_failed",
        "timestamp": {"$gt": datetime.utcnow() - timedelta(minutes=5)}
    })
    
    if failed_logins > 20:
        await send_security_alert("High volume of failed logins detected")
    
    # Unusual upload volume
    recent_uploads = await db.uploaded_photos.count_documents({
        "uploaded_at": {"$gt": datetime.utcnow() - timedelta(hours=1)}
    })
    
    if recent_uploads > 100:
        await send_security_alert("Unusual photo upload volume detected")
```

---

## 9. Privacy Policy (User-Facing)

**Preview (Full policy should be reviewed by legal):**

```markdown
# ChefMentor X Privacy Policy

Last Updated: February 12, 2026

## What We Collect
- Email address for your account
- Cooking activity (recipes you cook, questions you ask)
- Photos you upload for dish analysis
- Device and app usage data

## How We Use It
- Provide AI cooking guidance
- Analyze your dish photos for feedback
- Improve the app
- Send important updates

## Your Rights
- View your data anytime
- Delete your account and all data
- Opt out of analytics
- Delete individual photos

## Data Retention
- Cooking sessions: 90 days
- Uploaded photos: 30 days (auto-deleted)
- Account data: Until you delete your account

## We Don't
- Sell your data
- Share your photos publicly
- Use your data for advertising

For full details: https://chefmentor.app/privacy

Questions? Contact: privacy@chefmentor.app
```

---

## 10. Implementation Checklist

**Privacy Features:**
- [ ] Implement data export API
- [ ] Implement account deletion API
- [ ] Add photo upload consent flow
- [ ] Create automated data cleanup job
- [ ] Add privacy settings to user profile
- [ ] Create privacy policy page

**Security Features:**
- [ ] Implement JWT authentication
- [ ] Add password hashing (bcrypt)
- [ ] Configure rate limiting
- [ ] Add file upload validation
- [ ] Implement CORS properly
- [ ] Set up HTTPS/TLS
- [ ] Add security headers
- [ ] Configure Sentry data scrubbing

**Compliance:**
- [ ] Write user-facing privacy policy
- [ ] Create GDPR data processing records
- [ ] Configure app store privacy labels
- [ ] Set up breach notification process
- [ ] Document data retention policy
- [ ] Review third-party DPAs

**Monitoring:**
- [ ] Set up security alerts
- [ ] Configure audit logging
- [ ] Regular security reviews
- [ ] Penetration testing (pre-launch)

---

## 11. Regular Security Audits

**Monthly:**
- Review access logs for anomalies
- Check for outdated dependencies
- Review rate limit effectiveness

**Quarterly:**
- Security code review
- Privacy policy review
- Third-party service audit
- User data audit (retention compliance)

**Annually:**
- Full security penetration test
- GDPR/CCPA compliance review
- Update privacy policy
- Review and update DPAs

---

**Document Owner:** Security & Compliance Team  
**Review Cycle:** Quarterly  
**Last Reviewed:** February 12, 2026  
**Legal Review Required:** Yes (before launch)
