import { ENV } from '@/config';

export const forgotPasswordEmailHtmlReturner = (resetLink: string): string => {
  return `<div dir="rtl" style="margin:0;padding:0;font-family:'Vazir', Tahoma, sans-serif; background:#000000; color:#ffffff;">
  <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; margin:30px auto; background:#1a1a1a; border-radius:10px; overflow:hidden; box-shadow:0 4px 25px rgba(0,0,0,0.5);">
    
    <!-- Header / Logo -->
    <tr>
      <td style="padding:25px; text-align:center; background:#111;">
        <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Logo" width="80" style="display:block; margin:0 auto 10px;">
        <h1 style="margin:0; font-size:26px; color:#fff; font-family:'Vazir', Tahoma, sans-serif;">بازیابی رمز عبور</h1>
      </td>
    </tr>

    <!-- Main Content -->
    <tr>
      <td style="padding:25px; font-size:16px; line-height:1.6; font-family:'Vazir', Tahoma, sans-serif; color: #ffffff !important;">
        <p>سلام!</p>
        <p>درخواست بازیابی رمز عبور برای حساب شما در <strong>میورا</strong> دریافت شد.</p>
        <p>اگر این درخواست از طرف شما بوده، برای تنظیم رمز عبور جدید روی دکمه زیر کلیک کنید:</p>
        
        <!-- CTA Button -->
        <p style="text-align:center; margin:35px 0;">
          <a href="${resetLink}" style="display:inline-block; padding:14px 30px; background:#ffffff; color:#000000; font-weight:600; font-size:16px; text-decoration:none; border-radius:6px; font-family:'Vazir', Tahoma, sans-serif;">تغییر رمز عبور</a>
        </p>

        <p>این لینک تا <strong>۳۰ دقیقه</strong> آینده معتبر است. اگر بعد از این مدت منقضی شد، می‌توانید دوباره درخواست بازیابی رمز عبور بدهید.</p>
        <p>اگر شما درخواست تغییر رمز عبور نداده‌اید، لطفاً این ایمیل را نادیده بگیرید و حساب خود را بررسی کنید.</p>

        <p style="font-size:14px; color:#aaa; text-align:center; margin-top:30px;">
          © 2025 کارافلو تیم. همه حقوق محفوظ است. <br>
          میورا - Kara Company
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding:15px; text-align:center; background:#111; font-family:'Vazir', Tahoma, sans-serif;">
        <p style="color:#888; font-size:12px; margin:0;">
          شبکه‌های اجتماعی: 
          <a href="${ENV.APP_LINKDIN_LINK}" style="color:#ffffff; text-decoration:none;">LinkedIn</a> | 
          <a href="${ENV.APP_INSTAGRAM_LING}" style="color:#ffffff; text-decoration:none;">Instagram</a> | 
          <a href="${ENV.APP_X_LINK}" style="color:#ffffff; text-decoration:none;">X</a>
        </p>
      </td>
    </tr>

  </table>
</div>`;
};