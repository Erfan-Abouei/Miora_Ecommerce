import { ENV } from '@/config';

export const welcomeEmailHtmlReturner = (): string => {
  return `<div dir="rtl" style="margin:0;padding:0;font-family:'Vazir', Tahoma, sans-serif; background:#000000; color:#ffffff;">
  <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css" rel="stylesheet">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; margin:30px auto; background:#1a1a1a; border-radius:10px; overflow:hidden; box-shadow:0 4px 25px rgba(0,0,0,0.5);">
    
    <!-- Header / Logo -->
    <tr>
      <td style="padding:25px; text-align:center; background:#111;">
        <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Logo" width="80" style="display:block; margin:0 auto 10px;">
        <h1 style="margin:0; font-size:26px; color:#fff; font-family:'Vazir', Tahoma, sans-serif;">به میورا خوش اومدی !</h1>
      </td>
    </tr>

    <!-- Main Content -->
    <tr>
      <td style="padding:25px; font-size:16px; line-height:1.6; font-family:'Vazir', Tahoma, sans-serif; color: #ffffff !important;">
        <p>از ثبت نامت توی <strong>میورا</strong> خیلی خوشحالیم</p>
        <p>امیدواریم بتونیم بهترین خدمات رو با بهترین کیفیت توی <strong>میورا</strong> بهت بدیم</p>
        <p>تمامی حقوق این ایمیل محفوظ است.</p>
        
        <!-- CTA Button -->
        <p style="text-align:center; margin:30px 0;">
          <a href="https://karaflow.com" style="display:inline-block; padding:12px 25px; background:#ffffff; color:#000; font-weight:600; text-decoration:none; border-radius:6px; font-family:'Vazir', Tahoma, sans-serif;">ورود به کارا</a>
        </p>

        <p style="font-size:14px; color:#aaa; text-align:center; margin-top:20px;">
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
