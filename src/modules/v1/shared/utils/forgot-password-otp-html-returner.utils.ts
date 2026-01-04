import { ENV } from '@/config';

export const forgotPasswordEmailHtmlReturner = (otp: string): string => {
  return `
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>بازیابی رمز عبور ✔👀</title>
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
            padding:40px 24px;
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
              font-size:28px;
              font-weight:bold;
              line-height:64px;
            ">
              🔒
            </div>

            <h1 style="
              margin:0;
              font-size:24px;
              font-weight:bold;
              letter-spacing:-0.4px;
            ">
              بازیابی رمز عبور
            </h1>

            <p style="
              margin-top:10px;
              font-size:14px;
              color:#9ca3af;
            ">
              درخواست تغییر رمز عبور حساب کاربری
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
              سلام،
            </p>

            <p>
              درخواست بازیابی رمز عبور برای حساب شما در
              <strong style="color:#ffffff;">میورا</strong>
              دریافت شد.
            </p>

            <p>
              اگر این درخواست از طرف شما بوده، کد تأیید زیر را در اپلیکیشن وارد کنید:
            </p>

            <!-- OTP -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:36px 0;">
              <tr>
                <td align="center">
                  <div style="
                    display:inline-block;
                    padding: 0px 44px;
                    background:#ffffff;
                    color:#000000;
                    font-size:26px;
                    font-weight:bold;
                    letter-spacing:6px;
                    border-radius:12px;
                    font-family:Courier New, monospace;
                    box-shadow:0 12px 30px rgba(255,255,255,0.2);
                  ">
                    ${otp}
                  </div>
                </td>
              </tr>
            </table>

            <p style="font-size:14px;color:#9ca3af;">
              این کد تا
              <strong style="color:#ffffff;">
                ${ENV.FORGOT_PASSWORD_OTP_EXPIRE_TIMER / 60} دقیقه
              </strong>
              آینده معتبر است.
            </p>

            <p style="margin-top:24px;">
              اگر شما این درخواست را ثبت نکرده‌اید، این ایمیل را نادیده بگیرید.
            </p>

            <p style="
              margin-top:40px;
              font-size:13px;
              color:#9ca3af;
              text-align:center;
            ">
              © 2025 Kara Company — Miora
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
