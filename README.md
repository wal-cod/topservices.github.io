# موقع د. أحمد القطناني - دليل الاستضافة والتشغيل

## 📋 محتويات الملفات

```
📁 project-folder/
├── index.html          # الصفحة الرئيسية (الهيكل)
├── style.css           # التنسيقات والتصميم
├── script.js           # الوظائف والتفاعلات
├── README.md           # هذا الملف
└── assets/
    └── profile.jpg     # صورة البروفايل (اختياري)
```

---

## 🚀 خطوات الاستضافة على Hostinger

### الخطوة 1: إعداد الملفات

1. **أنشئ مجلد جديد** على حاسوبك باسم `ahmad-portfolio`
2. **انسخ الملفات الثلاثة** إليه:
   - `index.html`
   - `style.css`
   - `script.js`
3. **أنشئ مجلد فرعي** باسم `assets`
4. **ضع صورتك الشخصية** في المجلد `assets` باسم `profile.jpg`

### الخطوة 2: تسجيل الدخول إلى Hostinger

1. ادخل إلى لوحة التحكم: **https://hpanel.hostinger.com**
2. استخدم بيانات دخول حسابك
3. اختر النطاق (Domain) الخاص بك

### الخطوة 3: رفع الملفات

1. انتقل إلى **File Manager** (مدير الملفات)
2. افتح المجلد `public_html`
3. احذف الملفات القديمة (إن وجدت)
4. **اسحب وأفلت** الملفات الثلاثة مباشرة إلى المجلد
5. انسخ مجلد `assets` أيضاً

### الخطوة 4: تحديث بيانات الاتصال

**افتح ملف `index.html`** واستبدل:

```html
<!-- بدل هذه البيانات -->
<p dir="ltr">+966 50 123 4567</p>
<p>ahmed@example.com</p>
<p>الرياض، المملكة العربية السعودية</p>
```

بـ بيانات الاتصال الفعلية الخاصة بك.

---

## 📧 إعداد نموذج الاتصال

### الخيار 1: استخدام Formspree (الأسهل والأفضل) ✅

#### المميزات:
- ✅ مجاني تماماً
- ✅ لا يحتاج backend
- ✅ سهل جداً
- ✅ تستقبل الرسائل على بريدك مباشرة

#### الخطوات:

1. **اذهب إلى:** https://formspree.io
2. **سجل حساب جديد مجاني**
3. **أنشئ نموذج جديد:**
   - اختر "Create a new form"
   - اكتب اسم النموذج (مثل: "Contact")
   - اضغط Create
4. **انسخ Form ID** (مثال: `f_abc123xyz`)
5. **افتح `script.js`** وابحث عن هذا السطر:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```
6. **استبدل `YOUR_FORM_ID`** بـ Form ID الفعلي:
   ```javascript
   const response = await fetch('https://formspree.io/f/f_abc123xyz', {
   ```

**الآن النموذج جاهز! ✅**

### الخيار 2: استخدام PHP مباشرة (متقدم)

إذا أردت حلاً أكثر تقدماً باستخدام PHP على خادم Hostinger:

1. **أنشئ ملف `send-email.php`** في المجلد الرئيسي:

```php
<?php
// أضف رأس CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $phone = htmlspecialchars($_POST['phone'] ?? '');
    $service = htmlspecialchars($_POST['service'] ?? '');
    $message = htmlspecialchars($_POST['message'] ?? '');
    
    // بريد المستقبل (استبدل بريدك)
    $to = 'your-email@gmail.com';
    $subject = "رسالة جديدة من $name - خدمة: $service";
    
    $body = "اسم المرسل: $name\n";
    $body .= "البريد الإلكتروني: $email\n";
    $body .= "الهاتف: $phone\n";
    $body .= "نوع الخدمة: $service\n";
    $body .= "الرسالة:\n$message";
    
    $headers = "From: $email\r\nReply-To: $email";
    
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true, 'message' => 'تم الإرسال بنجاح']);
    } else {
        echo json_encode(['success' => false, 'message' => 'فشل الإرسال']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'طريقة غير صحيحة']);
}
?>
```

2. **عدّل `script.js`** واستخدم:

```javascript
const response = await fetch('send-email.php', {
    method: 'POST',
    body: new FormData(contactForm)
});
```

---

## 🎨 تخصيص الموقع

### تغيير الألوان

افتح `style.css` وجد هذا القسم:

```css
:root {
    --primary-color: #2c3e50;      /* الأزرق الداكن */
    --accent-color: #d4a574;       /* الذهبي */
    --secondary-color: #34495e;    /* الأزرق الرمادي */
}
```

غيّر الألوان حسب رغبتك!

### تعديل النصوص

كل النصوص موجودة في `index.html`. عدّلها مباشرة:

```html
<h1 class="hero-title">
    <span class="highlight">الكلمة الصحيحة</span> تصنع الفرق
</h1>
```

### إضافة صور

ضع صورك في مجلد `assets` وعدّل المسار:

```html
<img src="assets/your-image.jpg" alt="وصف الصورة">
```

---

## 🔧 استكشاف الأخطاء

### المشكلة: النموذج لا يرسل الرسائل

**الحل:**
1. تأكد من تثبيت Form ID في `script.js`
2. افتح أدوات المتصفح (F12) وانظر إلى Console
3. تأكد من أن Formspree تعمل بشكل صحيح

### المشكلة: الموقع يبدو مشوهاً على الهاتف

**الحل:**
1. تأكد من وجود هذا السطر في `<head>`:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```
2. امسح ذاكرة التخزين المؤقت (Ctrl+Shift+Delete)

### المشكلة: الصور لا تظهر

**الحل:**
1. تأكد من وضع الصور في مجلد `assets`
2. تحقق من اسم الملف (حروف صغيرة)
3. تأكد من المسار صحيح: `assets/filename.jpg`

---

## 📱 SEO وتحسين محركات البحث

أضف هذه الأسطر في `<head>` لتحسين SEO:

```html
<meta name="description" content="د. أحمد القطناني - متخصص في التدقيق اللغوي وحلول تقنية">
<meta name="keywords" content="تدقيق لغوي, برمجة, تصميم مواقع, الرياض">
<meta name="author" content="د. أحمد القطناني">
```

---

## 🔐 الأمان

- تجنب إضافة بيانات حساسة في الملفات
- استخدم HTTPS على Hostinger (متوفر افتراضياً)
- لا تضع كلمات مرور في الكود

---

## 📞 الدعم الفني

إذا واجهت مشكلة:

1. **Hostinger Support:** https://hostinger.com/support
2. **Formspree Support:** https://formspree.io/support
3. **MDN Web Docs:** https://developer.mozilla.org

---

## ✅ قائمة التحقق النهائية

- [ ] تم رفع جميع الملفات إلى Hostinger
- [ ] بيانات الاتصال محدثة
- [ ] Form ID مضاف إلى script.js
- [ ] الصورة الشخصية موجودة
- [ ] الموقع يعمل بشكل صحيح
- [ ] النموذج يرسل الرسائل
- [ ] الموقع يبدو جيداً على الهاتف

---

## 🎉 تم!

موقعك جاهز الآن! استمتع بموقع احترافي وحديث! 🚀

---

**آخر تحديث:** 2024
**النسخة:** 1.0
