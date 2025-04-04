 
 ## **🔍 Scanning – تعريفه، أهميته، وأنواعه**

### **📌 ما هو Scanning؟**

**Scanning** هو عملية تحليل واستكشاف الشبكات والأنظمة لجمع معلومات مثل المنافذ المفتوحة، الخدمات التي تعمل، وأنظمة التشغيل. تُستخدم هذه المعلومات لتحديد **نقاط الضعف المحتملة** التي قد تُستغل في الهجمات السيبرانية أو اختبار الاختراق.

يُعتبر Scanning **المرحلة الثانية في اختبار الاختراق** بعد **جمع المعلومات (Reconnaissance)**، وهو مرحلة ضرورية لاكتشاف الطرق الممكنة لاختراق الشبكة أو النظام المستهدف.



## من شرح الكورس

يعني اي scaning
 
  انا ببعت لل request  target واخد منه reply ال  nmap بتحلل ال  reply وتاخد منها معلومات

---

### **🎯 لماذا يعتبر Scanning مهمًا؟**

✅ **تحديد المنافذ المفتوحة** التي يمكن استغلالها.  
✅ **الكشف عن الخدمات والتطبيقات** التي تعمل على الأجهزة المستهدفة.  
✅ **معرفة إصدار نظام التشغيل** مما يساعد في استهداف ثغرات محددة.  
✅ **تحديد نقاط الضعف** المحتملة في النظام.

📌 **الخلاصة:**  
Scanning هو **خطوة أساسية في أي اختبار اختراق**، لأنه يسمح لك **بمعرفة الأهداف** التي يمكنك استغلالها لاحقًا.

---

## **🔍 أنواع Scanning الرئيسية**

### **1️⃣ فحص المنافذ ([[Port Scanning]])**

📌 **الهدف:**  
تحديد المنافذ المفتوحة والخدمات التي تعمل عليها.

📌 **الأدوات المستخدمة:**

- **Nmap** – أشهر أداة لفحص المنافذ.
- **Masscan** – لفحص عدد كبير من الأجهزة بسرعة عالية.

✅ **مثال على فحص المنافذ باستخدام Nmap:**

```bash
nmap -p- 192.168.1.1
```

👀 **ماذا نستفيد؟**  
إذا كان المنفذ **22** مفتوحًا → **SSH يعمل**  
إذا كان المنفذ **80** مفتوحًا → **يوجد خادم ويب**

📌 **الخلاصة:**  
فحص المنافذ يكشف **نقاط الدخول المحتملة** إلى النظام.

---

### **2️⃣ فحص الخدمات ([Service Enumeration](obsidian://open?vault=The%20Web%20Application%20Hacker%20%20Handbook%20-%20Finding%20and%20Exploiting%20Security%20Flaws&file=Scanning%2F5%EF%B8%8F%E2%83%A3%20Scanning%20%D8%AA%D8%AD%D9%84%D9%8A%D9%84%20%D9%86%D8%AA%D8%A7%D8%A6%D8%AC%2F%D8%AA%D8%AD%D9%84%D9%8A%D9%84%20%D8%A8%D8%B5%D9%85%D8%A7%D8%AA%20%D8%A7%D9%84%D8%A3%D9%86%D8%B8%D9%85%D8%A9%20%D9%88%D8%A7%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA))*

📌 **الهدف:**  
معرفة **إصدارات** الخدمات التي تعمل على المنافذ المفتوحة، مما يساعد في **تحديد الثغرات**.

📌 **الأدوات المستخدمة:**

- **Nmap (مع -sV لتحديد الخدمات والإصدارات)**
- **Netcat**

✅ **مثال باستخدام [[Nmap]]:**

```bash
nmap -sV 192.168.1.1
```

👀 **ماذا نستفيد؟**  
إذا كان **FTP يعمل بإصدار قديم**، فقد يحتوي على ثغرات يمكن استغلالها.

📌 **الخلاصة:**  
معرفة **إصدار الخدمة** يسمح لك بتحديد **الثغرات المحتملة**.

---

### **3️⃣ تحليل نظام التشغيل ([OS Fingerprinting](obsidian://open?vault=The%20Web%20Application%20Hacker%20%20Handbook%20-%20Finding%20and%20Exploiting%20Security%20Flaws&file=Scanning%2F5%EF%B8%8F%E2%83%A3%20Scanning%20%D8%AA%D8%AD%D9%84%D9%8A%D9%84%20%D9%86%D8%AA%D8%A7%D8%A6%D8%AC%2F%D8%AA%D8%AD%D9%84%D9%8A%D9%84%20%D8%A8%D8%B5%D9%85%D8%A7%D8%AA%20%D8%A7%D9%84%D8%A3%D9%86%D8%B8%D9%85%D8%A9%20%D9%88%D8%A7%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA))**

📌 **الهدف:**  
معرفة **نظام التشغيل** المستخدم على الجهاز المستهدف.

📌 **الأدوات المستخدمة:**

- **[[Nmap]]**
- **[[Xprobe2]]**

✅ **مثال باستخدام [[Nmap]]:**

```bash
nmap -O 192.168.1.1
```

👀 **ماذا نستفيد؟**  
إذا كان النظام **Windows 7**، فقد يكون عرضة لهجمات مثل **EternalBlue**.

📌 **الخلاصة:**  
معرفة نظام التشغيل يساعد في **تحديد نوع الهجمات المناسبة**.

---

### **4️⃣ فحص الثغرات (Vulnerability Scanning)**

📌 **الهدف:**  
الكشف عن الثغرات الأمنية الموجودة في الخدمات التي تعمل على الجهاز المستهدف.

📌 **الأدوات المستخدمة:**

- **[[Nmap]] (مع --script=vuln لاكتشاف الثغرات)**
- **[[Nessus]]** – أداة احترافية لفحص الثغرات.

✅ **مثال باستخدام [[Nmap]]:**

```bash
nmap --script vuln 192.168.1.1
```

👀 **ماذا نستفيد؟**  
إذا وجدنا أن الخدمة تعمل بإصدار **قديم ومليء بالثغرات**، فيمكننا استغلالها لاحقًا.

📌 **الخلاصة:**  
يتيح لنا فحص الثغرات تحديد **النقاط الضعيفة التي يمكن استغلالها**.

---

## **🚀 خطوات عملية لاختبار الاختراق باستخدام Scanning**

✅ **1️⃣ اكتشاف الأجهزة الفعالة في الشبكة:**

```bash
nmap -sn 192.168.1.0/24
```

📌 **الهدف:** معرفة الأجهزة التي تعمل في الشبكة.

✅ **2️⃣ فحص المنافذ المفتوحة:**

```bash
nmap -p- 192.168.1.1
```

📌 **الهدف:** معرفة المنافذ المفتوحة للخدمات.

✅ **3️⃣ تحديد الخدمات وإصداراتها:**

```bash
nmap -sV 192.168.1.1
```

📌 **الهدف:** معرفة التفاصيل عن الخدمات التي تعمل.

✅ **4️⃣ تحليل نظام التشغيل:**

```bash
nmap -O 192.168.1.1
```

📌 **الهدف:** معرفة نظام التشغيل للاستهداف المناسب.

✅ **5️⃣ البحث عن الثغرات الأمنية:**

```bash
nmap --script vuln 192.168.1.1
```

📌 **الهدف:** اكتشاف الثغرات المحتملة.

---

### **🎯 الخلاصة النهائية**

📌 Scanning هو **خطوة أساسية** في اختبار الاختراق، ويتيح لك:  
✔️ معرفة **الأجهزة الفعالة**  
✔️ اكتشاف **المنافذ المفتوحة**  
✔️ تحديد **الخدمات التي تعمل وإصداراتها**  
✔️ معرفة **نظام التشغيل**  
✔️ البحث عن **الثغرات الأمنية**

💡 **بعد تنفيذ Scanning، يمكنك الانتقال إلى مرحلة استغلال الثغرات (Exploitation) بناءً على المعلومات التي تم جمعها!** 🚀