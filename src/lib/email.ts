import nodemailer from 'nodemailer';

export async function sendApprovalEmail(email: string) {
  const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/login`

  // 1. Log to console for development safety
  console.log('------------------------------------------')
  console.log(`--- SENDING REAL EMAIL TO: ${email} ---`)
  console.log('------------------------------------------')

  // 2. Attempt real email send if SMTP configuration exists
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    console.warn('⚠️ Missing SMTP configuration in .env file. Email logged to console but not sent.')
    console.warn('⚠️ Required variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS')
    return { success: true, mocked: true }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: parseInt(smtpPort, 10) === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"NMS Mission Portal" <${smtpUser}>`, 
      to: email,
      subject: 'Portal Access Approved - Nepal Missionary Society',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #1a2a3a; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Nepal Missionary Society</h1>
          </div>
          <div style="padding: 32px; color: #374151;">
            <h2 style="color: #1a2a3a; margin-top: 0;">Access Approved!</h2>
            <p>Your request for access to the <strong>Mission Portal</strong> has been approved by the administration.</p>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 24px 0;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280;">Login Credentials:</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Password:</strong> (The password you set during registration)</p>
            </div>

            <p style="font-size: 14px; color: #6b7280; margin-bottom: 32px;">
              You can now safely log in using your credentials.
            </p>

            <a href="${loginUrl}" style="display: inline-block; background-color: #c5a059; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Login to Portal
            </a>
          </div>
          <div style="background-color: #f3f4f6; padding: 16px; text-align: center; font-size: 12px; color: #9ca3af;">
            &copy; ${new Date().getFullYear()} Nepal Missionary Society. All rights reserved.
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);

    return { success: true, data: info }
  } catch (err) {
    console.error('❌ Failed to send email via SMTP:', err)
    return { success: false, error: err }
  }
}

export async function sendResetEmail(email: string, resetLink: string) {
  console.log('------------------------------------------')
  console.log(`--- PASSWORD RESET LINK FOR: ${email} ---`)
  console.log(`--- LINK: ${resetLink} ---`)
  console.log('------------------------------------------')

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    console.warn('⚠️ Missing SMTP configuration. Reset link logged to console above.')
    return { success: true, mocked: true }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: parseInt(smtpPort, 10) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"NMS Mission Portal" <${smtpUser}>`, 
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #1a2a3a; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 20px;">Nepal Missionary Society</h1>
          </div>
          <div style="padding: 32px; color: #374151;">
            <h2 style="color: #1a2a3a; margin-top: 0;">Password Reset</h2>
            <p>You requested to reset your password. Click the button below to set a new password.</p>
            
            <a href="${resetLink}" style="display: inline-block; background-color: #c5a059; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 24px; margin-bottom: 24px;">
              Reset Password
            </a>

            <p style="font-size: 12px; color: #6b7280;">If you did not request this, please ignore this email.</p>
          </div>
          <div style="background-color: #f3f4f6; padding: 16px; text-align: center; font-size: 12px; color: #9ca3af;">
            &copy; ${new Date().getFullYear()} Nepal Missionary Society. All rights reserved.
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Reset Email sent successfully:', info.messageId);

    return { success: true, data: info }
  } catch (err) {
    console.error('❌ Failed to send reset email via SMTP:', err)
    return { success: false, error: err }
  }
}
