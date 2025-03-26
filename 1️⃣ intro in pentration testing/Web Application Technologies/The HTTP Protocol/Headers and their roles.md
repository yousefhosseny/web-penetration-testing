تمام، هنشرح **الرؤوس (Headers) ودورها** بنفس الطريقة السابقة: شرح مفصل وعملي مع أكواد وأوامر، مع تركيز على اختبار الاختراق (Pentesting)، وبعد كل جزء هخلّص بالعامية المصرية، وفي الآخر هقدم خطوات عملية للاستغلال.

---

### **1. شرح الرؤوس (Headers) ودورها بالتفصيل:**

#### **أ. المفهوم الأساسي (What Are Headers):**
- الرؤوس هي معلومات إضافية بتتروح مع طلبات وردود HTTP. بتيجي بعد سطر الطلب أو الرد الأول، وبيكون ليها دور في التحكم في السلوك بتاع العميل والسيرفر.
- بتتكون من **اسم: قيمة** (مثل `Host: example.com`).
- موجودة في الطلب (Request Headers) والرد (Response Headers).

- **مثال عملي:**
  - طلب:
    ```
    GET / HTTP/1.1
    Host: example.com
    User-Agent: Mozilla/5.0
    ```
  - رد:
    ```
    HTTP/1.1 200 OK
    Content-Type: text/html
    Server: Apache
    ```

- **جانب عملي للبينتست:**
  - جرب تشوف الرؤوس:
    - `curl -I http://example.com` (يجيبلك رؤوس الرد).
  - أضف رأس:
    - `curl -H "User-Agent: TestBot" http://example.com` (تغيير User-Agent).

- **خلاصة بالعامية:**
  - "الرؤوس دي زي الكارنيه بتاعك، بتقول للسيرفر مين إنت وإنت عايز إيه، وهو بيرد يقولك أنا مين وهديك إيه."

---

#### **ب. أنواع الرؤوس وأدوارها (Types & Roles):**

1. **Request Headers (رؤوس الطلب):**
   - **Host:** بيحدد الدومين (مطلوب في HTTP/1.1).
     - مثال: `Host: example.com`.
   - **User-Agent:** بيقول نوع العميل (متصفح أو أداة).
     - مثال: `User-Agent: Chrome/89`.
   - **Content-Type:** نوع البيانات المبعتة (في POST مثلاً).
     - مثال: `Content-Type: application/json`.
   - **Cookie:** بيانات الجلسة.
     - مثال: `Cookie: session=abc123`.

2. **Response Headers (رؤوس الرد):**
   - **Content-Type:** نوع البيانات المرجعة.
     - مثال: `Content-Type: text/html`.
   - **Server:** نوع السيرفر.
     - مثال: `Server: Nginx/1.18`.
   - **Set-Cookie:** بيحدد كوكيز جديدة.
     - مثال: `Set-Cookie: session=xyz789`.
   - **Location:** بيوجهك لمكان جديد (في 3xx).
     - مثال: `Location: http://example.com/new`.

- **مثال عملي:**
  - طلب: `curl -H "Cookie: session=abc123" http://example.com`.
  - رد: `curl -I http://example.com` (شوف `Server` و`Content-Type`).

- **جانب عملي للبينتست:**
  - Host: جرب تزوير: `curl -H "Host: fake.com" http://example.com` (Host Header Injection).
  - User-Agent: حقن: `curl -H "User-Agent: <script>alert(1)</script>" http://example.com` (XSS).
  - Cookie: تعديل: `curl -b "session=admin" http://example.com/admin` (Session Hijacking).
  - Server: ابحث عن ثغرات: لو `Apache/2.4.41`، دور على CVEs.

- **خلاصة بالعامية:**
  - "كل رأس ليه شغلته: Host بيحدد المكان، Cookie بيفتكرك، Server بيقولك مين بيرد، لو لعبت فيهم هتكتشف كنوز."

---

#### **ج. رؤوس الأمان (Security Headers):**
- بتحمي التطبيق من الهجمات:
  - **X-Content-Type-Options: nosniff:** بتمنع المتصفح يخمن نوع المحتوى.
  - **X-Frame-Options: DENY:** بتمنع تحميل الصفحة في إطار (Clickjacking).
  - **Content-Security-Policy (CSP):** بتحدد المصادر المسموحة.
  - **Strict-Transport-Security (HSTS):** بيفرض HTTPS.

- **مثال عملي:**
  - رد آمن:
    ```
    HTTP/1.1 200 OK
    X-Frame-Options: DENY
    Content-Security-Policy: default-src 'self'
    ```

- **جانب عملي للبينتست:**
  - جرب تكتشف غيابهم:
    - `curl -I http://example.com | grep X-Frame` (لو مش موجود، جرب Clickjacking).
  - لو مفيش HSTS:
    - `sslstrip` لتحويل HTTPS لـ HTTP.
  - CSP ضعيف:
    - جرب حقن: `curl http://example.com?q=<script src="evil.com">` (XSS).

- **خلاصة بالعامية:**
  - "رؤوس الأمان دي زي الحراس، لو مش موجودين أو نايمين، الباب مفتوح ليك تدخل وتخرب."

---

#### **د. الثغرات المرتبطة (Vulnerabilities):**
- **Host Header Injection:** لو السيرفر بيثق في `Host` بشكل أعمى.
- **Missing Security Headers:** بيفتح الباب لـ XSS وClickjacking.
- **Verbose Headers:** زي `Server` بيكشف معلومات زيادة.
- **Cookie Misconfiguration:** لو بدون `Secure` أو `HttpOnly`.

- **مثال عملي:**
  - Host Injection: `curl -H "Host: attacker.com" http://example.com/reset` (إعادة توجيه خبيث).
  - Cookie: `curl -I http://example.com | grep Set-Cookie` (شوف لو بدون `Secure`).

- **جانب عملي للبينتست:**
  - Host: جرب كذا قيمة: `curl -H "Host: localhost" http://example.com`.
  - Security Headers: `curl -I http://example.com` (لو مفيش `X-Frame-Options`، جرب `<iframe>`).
  - Server: لو `Server: IIS/8.0`، ابحث عن ثغرات النسخة.
  - Cookie: سرقة بـ MITM: `arpspoof` مع `tcpdump`.

- **خلاصة بالعامية:**
  - "الرؤوس لو مش متظبطة هتكون نقطة ضعفك، زوّرها أو استغل غيابها، وهتدخل السيرفر من الباب الخلفي."

---

### **خطوات عملية للاستغلال (Pentesting):**
1. **اكتشف الرؤوس:**
   - `curl -I http://example.com` (رؤوس الرد).
   - `nmap -p 80 --script http-headers example.com` (سكان).

2. **اختبر Request Headers:**
   - `curl -H "Host: evil.com" http://example.com` (Host Injection).
   - `curl -H "User-Agent: <script>alert(1)</script>" http://example.com` (XSS).

3. **هاجم Response Headers:**
   - لو مفيش CSP: حقن `<script>` في أي إدخال.
   - لو `Server: Apache/2.4.41`: ابحث عن CVEs.

4. **استغل الكوكيز:**
   - `curl -b "session=admin" http://example.com/admin` (تجاوز).
   - لو بدون `Secure`: `sslstrip` للتجسس.

5. **جرب التزوير:**
   - `curl -H "X-Forwarded-For: 127.0.0.1" http://example.com/admin` (تجاوز IP).
   - `curl -H "Referer: http://example.com" http://example.com/private` (تجاوز قيود).

---

### **خلاصة نهائية بالعامية:**
- "الرؤوس دي زي الجواز بتاع الطلب، لو عرفت تزوّره أو تستغل اللي مش موجود، هتدخل السيرفر وتعمل اللي عايزه، بس خلّيك دماغ عشان متتركنش!"