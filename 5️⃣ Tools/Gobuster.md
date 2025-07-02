أوكي، هشرحلك أداة **Gobuster** بأبسط طريقة ممكنة بالعربي، مع أمثلة للأوامر ورموز لتسهيل الفهم!

###  ** 
### 📌 إيهGobuster ؟ 
ال Gobuster هي أداة مفتوحة المصدر تُستخدم في اختبار الاختراق (Penetration Testing) عشان تساعدك تكتشف:
- **المجلدات المخفية** (Hidden Directories) على موقع ويب.
- **الملفات المخفية** (Hidden Files) زي (admin.php أو config.txt).
- **نطاقات فرعية** (Subdomains) لو بتستخدمها في وضع DNS.

الفكرة إنها بتعمل "برايت فورس" (Brute Force) بمعنى إنها بتجرب كلمات من قايمة (Wordlist) عشان تشوف إيه اللي موجود على السيرفر.

---

### 🛠 **ازاي تشتغل بيها؟**
1. لازم تكون مثبتة على جهازك (لو لينكس مثلاً: `sudo apt install gobuster`).
2. بتحتاج:
   - رابط الموقع (URL).
   - قايمة كلمات (Wordlist) عشان تجرب منها (زي `/usr/share/wordlists/dirb/common.txt`).
3. بتكتب الأمر في الترمينال وتستنى النتايج.

---

### 🎯 **أوامر بسيطة وشائعة**
هنا هشرح الأوامر بطريقة سهلة مع رموز:

#### 1️⃣ **اكتشاف المجلدات والملفات (Dir Mode)**
```bash
gobuster dir -u http://test.com -w /usr/share/wordlists/dirb/wordlist.txt
```
#### لو الصفحه كانت بتطلب user و password فانت لازم تعمل الامر زي كده :
```
gobuster -U username -P pasword - dir -u http://10.10.173.35:8080/ -w /usr/share/wordlists/dirb/common.txt
```

- `dir`: وضع البحث عن مجلدات وملفات.
- `-u`: الرابط بتاع الموقع (URL).
- `-w`: مسار قايمة الكلمات (Wordlist).

**مثال:**
```bash
gobuster dir -u http://test.com -w /usr/share/wordlists/dirb/wordlist.txt
```
👉 النتيجة: بيطلعلك زي `/admin`, `/login`, `/backup` لو موجودين.

---

#### 2️⃣ **اكتشاف النطاقات الفرعية (DNS Mode)**
```bash
gobuster dns -d example.com -w /path/to/subdomains.txt
```
- `dns`: وضع البحث عن سب دومينز.
- `-d`: اسم النطاق (Domain).
- `-w`: قايمة الكلمات للسب دومينز.

**مثال:**
```bash
gobuster dns -d google.com -w /usr/share/wordlists/subdomains.txt
```
👉 النتيجة: بيطلعلك زي `mail.google.com`, `dev.google.com` لو موجودين.

---

#### 3️⃣ **إضافات مفيدة**
- `-x`: ابحث عن ملفات بامتداد معين (زي php, txt).
  ```bash
  gobuster dir -u http://example.com -w wordlist.txt -x php,txt,html
  ```
  👉 بيجرب `/admin.php`, `/config.txt`.

- `-t`: عدد الثريدز (Threads) عشان تسرّع البحث.
  ```bash
  gobuster dir -u http://example.com -w wordlist.txt -t 50
  ```

- `-o`: احفظ النتايج في ملف.
  ```bash
  gobuster dir -u http://example.com -w wordlist.txt -o results.txt
  ```

---

### 🌟 **نصايح سريعة**
- استخدم قايمة كلمات قوية (زي اللي في Kali Linux).
- لو الموقع بيرد بكود 403 أو 404 كتير، جرب تضيف `-s 200,301` عشان يركز على الردود الناجحة بس:
  ```bash
  gobuster dir -u http://example.com -w wordlist.txt -s 200,301
  ```

---

### 💡 **يعني باختصار**
ال Gobuster زي مفتاح سحري بيفتحلك أبواب مخفية في المواقع، سواء مجلدات أو ملفات أو سب دومينز. بتديله الرابط وقايمة كلمات، وهو بيشتغل ويطلعلك كل حاجة يلاقيها!

لو عندك سؤال زيادة عن أمر معين، قوللي!