import { ENV } from '@/config';

export const welcomeEmailHtmlReturner = (dashboardCallbackRoute: string): string => {
  return `
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>به میورا خوش اومدی ✔👀</title>
</head>

<body style="
  margin:0;
  padding:0;
  background-color:#0b0b0b;
  font-family:Tahoma, Arial, sans-serif;
  color:#ffffff;
">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
  <tr>
    <td align="center">

      <table width="600" cellpadding="0" cellspacing="0" style="
        background:#111111;
        border-radius:16px;
        overflow:hidden;
        box-shadow:0 20px 60px rgba(0,0,0,0.8);
      ">

        <!-- HEADER -->
        <tr>
          <td style="
            padding:42px 24px;
            text-align:center;
            background:#0f0f0f;
          ">
            <div style="
              width:64px;
              height:64px;
              margin:0 auto 18px;
              border-radius:50%;
              background:#ffffff;
              color:#000;
              font-size:32px;
              font-weight:bold;
              line-height:64px;
            ">
              ✓
            </div>

            <h1 style="
              margin:0;
              font-size:26px;
              font-weight:bold;
              letter-spacing:-0.5px;
            ">
              به میورا خوش آمدید
            </h1>

            <p style="
              margin-top:10px;
              font-size:14px;
              color:#9ca3af;
            ">
              تجربه‌ای مدرن برای مدیریت حرفه‌ای
            </p>
          </td>
        </tr>

        <!-- CONTENT -->
        <tr>
          <td style="
            padding:34px 32px;
            font-size:15px;
            line-height:2;
            color:#e5e7eb;
          ">
            <p style="margin-top:0;">
              خوشحالیم که به <strong style="color:#ffffff;">میورا</strong> پیوستید.
            </p>

            <p>
              ما اینجا هستیم تا فرآیندهای شما را ساده‌تر، امن‌تر و شفاف‌تر کنیم.
            </p>

            <p>
              حساب کاربری شما آماده است و می‌توانید همین حالا وارد داشبورد شوید.
            </p>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:36px 0;">
              <tr>
                <td align="center">
                  <a href="${dashboardCallbackRoute}"
                     style="
                       display:inline-block;
                       padding:16px 42px;
                       background:#ffffff;
                       color:#000000;
                       text-decoration:none;
                       font-size:15px;
                       font-weight:bold;
                       border-radius:10px;
                       box-shadow:0 12px 30px rgba(255,255,255,0.2);
                     ">
                    ورود به داشبورد
                  </a>
                </td>
              </tr>
            </table>

            <p style="
              margin-top:40px;
              font-size:13px;
              color:#9ca3af;
              text-align:center;
            ">
              اگر سوالی دارید، تیم پشتیبانی میورا کنار شماست.
            </p>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="
            padding:20px;
            text-align:center;
            background:#0b0b0b;
            font-size:12px;
            color:#6b7280;
          ">
            <a href="${ENV.APP_LINKDIN_LINK}" style="color:#d1d5db;text-decoration:none;margin:0 8px;">LinkedIn</a> |
            <a href="${ENV.APP_INSTAGRAM_LING}" style="color:#d1d5db;text-decoration:none;margin:0 8px;">Instagram</a> |
            <a href="${ENV.APP_X_LINK}" style="color:#d1d5db;text-decoration:none;margin:0 8px;">X</a>

            <div style="margin-top:12px;">
              © 2025 Kara Company — Miora
            </div>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
`;
};
