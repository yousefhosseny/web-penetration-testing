تمام، هنشرح **طرق HTTP (HTTP Methods مثل GET وPOST وغيرهم)** بنفس الطريقة السابقة: شرح مفصل وعملي مع أكواد وأوامر، مع تركيز على اختبار الاختراق (Pentesting)، وبعد كل جزء هخلّص بالعامية المصرية، وفي الآخر هقدم خطوات عملية للاستغلال.

---

### **1. شرح طرق HTTP (HTTP Methods) بالتفصيل:**

#### **أ. المفهوم الأساسي (What Are HTTP Methods):**
- طرق HTTP هي الأوامر اللي بيستخدمها العميل (المتصفح أو أي أداة) عشان يقول للسيرفر "أنا عايز أعمل إيه". كل طريقة ليها غرض معين:
  - **GET:** جيب بيانات (زي فتح صفحة).
  - **POST:** ابعت بيانات (زي تسجيل دخول).
  - **PUT:** عدل بيانات موجودة.
  - **DELETE:** امسح حاجة.
  - **OPTIONS:** قوللي إنت بتسمح بإيه.
  - **HEAD:** جيب الرؤوس بس من غير الجسم.

- **مثال عملي:**
  - `GET /page HTTP/1.1` (جيب الصفحة).
  - `POST /login HTTP/1.1` مع `username=test&password=123` (ابعت بيانات).

- **جانب عملي للبينتست:**
  - جرب تشوف الطرق المسموحة:
    - `curl -X OPTIONS http://example.com` (يشوف السيرفر بيدعم إيه).
  - استخدم `curl` لـ GET:
    - `curl http://example.com` (شوف الرد).

- **خلاصة بالعامية:**
  - "الطرق دي زي الطلبات في المطعم: جيب، ابعت، عدل، امسح، كل واحد ليه شغلته، ولو لعبت فيهم صح هتعرف تسيطر."

---

#### **ب. الطرق الرئيسية واستخداماتها (Main Methods):**

1. **GET:**
   - بيجيب بيانات من السيرفر، البيانات بتتروح في الـ URL (Query String).
   - مثال: `GET /search?q=test HTTP/1.1`.
   - عملي: `curl http://example.com/search?q=test`.

2. **POST:**
   - بيبعت بيانات للسيرفر في الجسم (Body)، مش في الـ URL.
   - مثال: 
     ```
     POST /login HTTP/1.1
     Host: example.com
     Content-Type: application/x-www-form-urlencoded

     username=test&password=123
     ```
   - عملي: `curl -X POST -d "username=test&password=123" http://example.com/login`.

3. **PUT:**
   - بيعدل أو يضيف بيانات في مكان معين.
   - مثال: `PUT /users/1 HTTP/1.1` مع `{"name": "newname"}`.
   - عملي: `curl -X PUT -d '{"name":"newname"}' -H "Content-Type: application/json" http://example.com/users/1`.

4. **DELETE:**
   - بيمسح حاجة من السيرفر.
   - مثال: `DELETE /users/1 HTTP/1.1`.
   - عملي: `curl -X DELETE http://example.com/users/1`.

5. **OPTIONS:**
   - بيسأل السيرفر عن الطرق المسموحة.
   - مثال: `OPTIONS / HTTP/1.1`.
   - عملي: `curl -X OPTIONS -i http://example.com`.

6. **HEAD:**
   - زي GET بس بيجيب الرؤوس بس من غير جسم.
   - مثال: `HEAD /page HTTP/1.1`.
   - عملي: `curl -I http://example.com`.

- **جانب عملي للبينتست:**
  - GET: جرب حقن: `curl http://example.com/search?q=test' OR '1'='1` (SQLi).
  - POST: حقن في الجسم: `curl -X POST -d "username=admin' OR 1=1 --" http://example.com/login` (SQLi).
  - PUT: جرب تعديل غير مصرح: `curl -X PUT -d '{"admin":true}' http://example.com/users/2`.
  - DELETE: جرب تمسح حاجة مش ليك: `curl -X DELETE http://example.com/users/999`.
  - OPTIONS: شوف لو السيرفر بيكشف حاجات زيادة.

- **خلاصة بالعامية:**
  - "كل طريقة ليها شغلها، لو عرفت تستغلها أو تخترقها، هتفتح أبواب السيرفر على مصراعيها."

---

#### **ج. الفرق بين الطرق (Differences):**
- **GET vs POST:**
  - GET: البيانات في الـ URL، مرئية ومحدودة الحجم.
  - POST: البيانات في الجسم، أكبر وأكثر أمان.
- **PUT vs POST:**
  - PUT: للتعديل أو الإضافة في مكان محدد.
  - POST: لإنشاء حاجة جديدة.
- **DELETE vs GET/POST:**
  - DELETE للمسح، الباقي للجلب أو الإرسال.

- **مثال عملي:**
  - GET: `curl http://example.com?id=1`.
  - POST: `curl -d "id=1" http://example.com`.

- **جانب عملي للبينتست:**
  - جرب تحول GET لـ POST:
    - لو `http://example.com/?id=1` شغال، جرب: `curl -X POST -d "id=1" http://example.com` (شوف لو بيقبل).
  - اختبر سوء التهيئة:
    - `curl -X DELETE http://example.com/admin` (لو بيمسح من غير تصريح).

- **خلاصة بالعامية:**
  - "الفرق بينهم زي الفرق بين الكاش والبطاقة، كل حاجة ليها طريقتها، ولو السيرفر مش منظم هتستغل الفوضى."

---

#### **د. الأمن والثغرات (Security & Vulnerabilities):**
- **GET:** معرض للتسريب لأن البيانات في الـ URL (Log Injection).
- **POST:** أكثر أمان بس ممكن يكون معرض لـ CSRF.
- **PUT/DELETE:** لو مش محميين، أي حد يقدر يعدل أو يمسح.
- **OPTIONS:** ممكن يكشف معلومات زيادة عن السيرفر.

- **مثال عملي:**
  - GET: `curl http://example.com/?file=../../etc/passwd` (Path Traversal).
  - POST: `<form action="http://example.com/login" method="POST"><input name="user" value="hacked"></form>` (CSRF).

- **جانب عملي للبينتست:**
  - GET: جرب Command Injection: `curl http://example.com/?cmd=;ls`.
  - POST: استخدم Burp Suite لتزوير طلبات CSRF.
  - PUT: `curl -X PUT -d '{"role":"admin"}' http://example.com/users/1` (تغيير صلاحيات).
  - DELETE: `curl -X DELETE http://example.com/users/1` (مسح بدون تصريح).

- **خلاصة بالعامية:**
  - "لو السيرفر مش حاطط عينه على الطرق دي، هتدخل من الباب اللي مش متوقعه وتاخد كل حاجة."

---

### **خطوات عملية للاستغلال (Pentesting):**
1. **اكتشف الطرق المسموحة:**
   - `curl -X OPTIONS http://example.com` (شوف إيه متاح).
   - `nmap -p 80 --script http-methods example.com` (سكان بـ Nmap).

2. **اختبر GET:**
   - `curl http://example.com/search?q=test' OR '1'='1` (SQLi).
   - `curl http://example.com/?file=../config` (Path Traversal).

3. **هاجم POST:**
   - `curl -X POST -d "user=admin&pass=1' OR '1'='1" http://example.com/login` (SQLi).
   - حقن CSRF بـ HTML بسيط.

4. **استغل PUT/DELETE:**
   - `curl -X PUT -d '{"admin":true}' http://example.com/users/1` (تعديل غير مصرح).
   - `curl -X DELETE http://example.com/admin` (مسح بدون تصريح).

5. **تحلل الردود:**
   - لو 405 (Method Not Allowed): جرب تزوّر الـ Header: `curl -H "X-HTTP-Method-Override: DELETE" http://example.com`.
   - لو 200: كرر الهجوم بحمولات أكبر.

---

### **خلاصة نهائية بالعامية:**
- "طرق HTTP دي زي المفاتيح، لو عرفت تستخدمها صح أو تكسر القفل، هتفتح السيرفر وتعمل اللي عايزه، بس خلّيك حذر عشان متتركنش!"