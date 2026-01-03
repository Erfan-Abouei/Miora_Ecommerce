import { ENV } from '@/config';

export const forgotPasswordEmailHtmlReturner = (otp: string): string => {
  return `<div dir="rtl" style="margin:0;padding:0;background:#0b0b0b;font-family:'Vazir',Tahoma,sans-serif;color:#ffffff;">
  <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet">
  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="max-width:600px;margin:40px auto;background:#141414;border-radius:14px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.7);">
    <!-- Header -->
    <tr>
      <td style="padding:36px 20px;text-align:center;
        background:linear-gradient(135deg,#0f0f0f,#1c1c1c);">
        <div style="display:inline-block;">
          <!-- Custom Key SVG for Password Reset -->
          <svg width="72" height="72" viewBox="0 0 100 100" style="display:block;margin:0 auto 16px auto;">
            <defs>
              <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="100%" stop-color="#9ca3af"/>
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="46" fill="none" stroke="url(#g2)" stroke-width="4"/>
            <path d="M35 50 Q35 35 50 35 Q65 35 65 50 Q65 65 50 65 Q40 65 35 60" fill="none" stroke="url(#g2)" stroke-width="6" stroke-linecap="round"/>
            <circle cx="70" cy="50" r="15" fill="none" stroke="url(#g2)" stroke-width="6"/>
            <line x1="85" y1="50" x2="95" y2="50" stroke="url(#g2)" stroke-width="6" stroke-linecap="round"/>
          </svg>
        </div>
        <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;letter-spacing:-0.4px;">
          بازیابی رمز عبور
        </h1>
      </td>
    </tr>
    <!-- Content -->
    <tr>
      <td style="padding:30px 28px;font-size:15.5px;line-height:1.9;color:#e5e5e5;">
       
        <p style="margin-top:0;">
          سلام!
        </p>
        <p>
          درخواست بازیابی رمز عبور برای حساب شما در <strong style="color:#ffffff;">میورا</strong> دریافت شد.
        </p>
        <p>
          اگر این درخواست از طرف شما بوده، برای تنظیم رمز عبور جدید کد زیر را در اپلیکیشن وارد کنید.
        </p>
        <p>
          این کد تا <strong>${ENV.FORGOT_PASSWORD_OTP_EXPIRE_TIMER / 60} دقیقه</strong> آینده معتبر است. اگر بعد از این مدت منقضی شد، می‌توانید دوباره درخواست دهید.
        </p>
        <!-- CTA -->
        <div style="text-align:center;margin:38px 0;">
          <span
             style="
               display:inline-block;
               padding:14px 38px;
               background:linear-gradient(135deg,#ffffff,#d1d5db);
               color:#000000;
               text-decoration:none;
               font-weight:700;
               border-radius:8px;
               font-size:15px;
               box-shadow:0 8px 25px rgba(255,255,255,0.15);
             ">
            ${otp}
          </span>
        </div>
        <p>
          اگر شما این درخواست را نداده‌اید، لطفاً این ایمیل را نادیده بگیرید و برای امنیت بیشتر، حساب خود را بررسی کنید.
        </p>
        <p style="margin-top:32px;font-size:13px;color:#9ca3af;text-align:center;">
          © 2025 Kara Company — Miura
        </p>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="padding:18px;text-align:center;background:#0f0f0f;font-size:12px;color:#888;">
        <a href="${ENV.APP_LINKDIN_LINK}" style="color:#d1d5db;text-decoration:none;margin:0 6px;">LinkedIn</a> |
        <a href="${ENV.APP_INSTAGRAM_LING}" style="color:#d1d5db;text-decoration:none;margin:0 6px;">Instagram</a> |
        <a href="${ENV.APP_X_LINK}" style="color:#d1d5db;text-decoration:none;margin:0 6px;">X</a>
      </td>
    </tr>
  </table>
</div>`;
};