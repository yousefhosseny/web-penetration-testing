تمام، هنشرح **سيرفرات الويب ووظايفها (Web Servers and Their Functions)** بنفس الطريقة السابقة: شرح مفصل وعملي مع أكواد وأوامر، مع تركيز على اختبار الاختراق (Pentesting)، وبعد كل جزء هخلّص بالعامية المصرية، وفي الآخر هقدم خطوات عملية للاستغلال.

---

### **1. شرح سيرفرات الويب ووظايفها بالتفصيل:**

#### **أ. المفهوم الأساسي (What Are Web Servers):**
- سيرفر الويب هو برنامج (أو جهاز) بيستقبل طلبات HTTP من العميل (المتصفح) وبيرد عليها بصفحات ويب أو بيانات. بيشتغل كوسيط بين العميل والتطبيقات على السيرفر.
- أمثلة: Apache، Nginx، IIS.
- وظيفته الأساسية: يسمع الطلبات على بورت (زي 80 أو 443) ويخدم الملفات أو ينفذ كود.

- **مثال عملي:**
  - طلب: `GET /index.html HTTP/1.1`.
  - رد: 
    ```
    HTTP/1.1 200 OK
    Content-Type: text/html
    <html>Hello</html>
    ```

- **جانب عملي للبينتست:**
  - جرب تكتشف السيرفر:
    - `curl -I http://example.com | grep Server` (مثل `Server: Apache/2.4.41`).
  - شوف البورتات:
    - `nmap -p 80,443 example.com` (مفتوحة ولا لأ).

- **خلاصة بالعامية:**
  - "سيرفر الويب ده زي البواب بتاع العمارة، إنت بتقوله عايز إيه وهو بيجيبلك الطلب من جوه، لو عرفت تكلمه صح هيديك كل حاجة."

---

#### **ب. وظايف سيرفرات الويب (Functions):**

1. **استقبال الطلبات (Handling Requests):**
   - بيسمع الطلبات على بورت معين (80 لـ HTTP، 443 لـ HTTPS).
   - مثال: `curl http://example.com` (يبعت GET للبورت 80).

2. **معالجة الطلبات (Processing):**
   - بيحدد إيه المطلوب (ملف HTML، صورة، أو كود ديناميكي زي PHP).
   - مثال: لو طلب `/script.php`، بيمرره لمحرك PHP.

3. **إرجاع الردود (Serving Responses):**
   - بيبعت الصفحة أو البيانات للعميل.
   - مثال: 
     ```
     HTTP/1.1 200 OK
     Server: Nginx
     Content-Type: text/html
     <h1>Welcome</h1>
     ```

4. **إدارة الموارد (Resource Management):**
   - بيتعامل مع الملفات، قواعد البيانات، والكاش.
   - مثال: لو فيه كاش، بيرد بسرعة بدون ما يسأل الـ Backend.

- **جانب عملي للبينتست:**
  - Requests: جرب طرق غريبة: `curl -X TRACE http://example.com` (شوف لو مسموح).
  - Processing: حقن مسار: `curl http://example.com/../etc/passwd` (Path Traversal).
  - Responses: لو `Server: IIS/8.0`، ابحث عن ثغرات النسخة.
  - Resources: جرب هجمات DoS: `hping3 -S -p 80 -c 5000 example.com`.

- **خلاصة بالعامية:**
  - "السيرفر ده بيسمعك، بيفكر، وبيرد عليك، لو لعبت في أي حتة من شغله هتعرف تكسره أو تاخد منه حاجة."

---

#### **ج. أنواع سيرفرات الويب (Types of Web Servers):**
- **Apache:** مرن وشعبي، بيدعم كتير من اللغات (زي PHP).
- **Nginx:** سريع وخفيف، بيستخدم للحمل العالي.
- **IIS (Internet Information Services):** من مايكروسوفت، بيشتغل مع ASP.NET.
- **LiteSpeed:** بديل سريع لـ Apache.

- **مثال عملي:**
  - Apache: `Server: Apache/2.4.41` في الرؤوس.
  - Nginx: `Server: nginx/1.18.0`.

- **جانب عملي للبينتست:**
  - Apache: جرب ثغرات قديمة: `curl http://example.com/.htaccess` (لو مكشوف).
  - Nginx: جرب سوء تهيئة: `curl http://example.com/nginx_status` (معلومات داخلية).
  - IIS: `curl http://example.com/test.asp` (لو بيرجع أخطاء ASP).
  - LiteSpeed: ابحث عن إصدارات ضعيفة في CVE.

- **خلاصة بالعامية:**
  - "كل سيرفر ليه شخصيته، Apache زي الجدع الشعبي، Nginx زي السريع، IIS زي الرسمي، اعرف مين قدامك واضربه في ضعفه."

---

#### **د. الثغرات المرتبطة (Vulnerabilities):**
- **Misconfiguration:** مسارات مكشوفة أو أوامر زي TRACE مسموحة.
- **Outdated Versions:** ثغرات معروفة في إصدارات قديمة.
- **Verbose Headers:** بيكشف نوع السيرفر والإصدار.
- **DoS:** لو مش محمي، ممكن تبهدله بالطلبات.

- **مثال عملي:**
  - Misconfig: `curl http://example.com/server-status` (Apache مكشوف).
  - Version: `Server: Apache/2.2.0` (قديم ومعرض للثغرات).

- **جانب عملي للبينتست:**
  - Misconfig: جرب مسارات: `curl http://example.com/config.php.bak`.
  - Version: لو `Nginx/1.14`: ابحث عن CVEs (مثل CVE-2019-11043).
  - Headers: `curl -I http://example.com` (شوف `Server` واستغله).
  - DoS: `slowloris http://example.com` (هجوم بطيء).

- **خلاصة بالعامية:**
  - "السيرفر لو مش متظبط هيبقى زي عربية مفتوحة، اقلبه، زوّر عليه، أو اكسرله الكلاكس، وهتدخل جوه."

---

### **خطوات عملية للاستغلال (Pentesting):**
1. **اكتشف السيرفر:**
   - `curl -I http://example.com | grep Server` (نوعه وإصدار).
   - `nmap -sV -p 80,443 example.com` (خدمات).

2. **اختبر الوظايف:**
   - `curl -X TRACE http://example.com` (TRACE مفعل؟).
   - `curl http://example.com/../etc/passwd` (Path Traversal).

3. **هاجم النوع:**
   - Apache: `curl http://example.com/.htpasswd` (ملفات حساسة).
   - Nginx: `curl http://example.com/nginx.conf` (لو مكشوف).
   - IIS: `curl http://example.com/test.aspx?id=1' OR '1'='1` (SQLi).

4. **استغل الثغرات:**
   - Misconfig: `dirb http://example.com /wordlist.txt` (مسارات مخفية).
   - DoS: `hping3 -S -p 80 -c 10000 example.com`.

5. **تحلل الردود:**
   - لو 500: `curl http://example.com/?cmd=whoami` (Command Injection).
   - لو Verbose: ابحث عن ثغرات الإصدار في CVE.

---

### **خلاصة نهائية بالعامية:**
- "سيرفر الويب ده البواب الكبير، لو عرفت ازاي يسمعك ويرد عليك، هتخليه يفتحلك كل الأبواب أو يقع منك، بس خلّيك دماغ عشان متتلبسش!"