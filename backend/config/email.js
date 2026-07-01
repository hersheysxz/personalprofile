const nodemailer = require('nodemailer');

const normalizeEnv = (name) => {
  const value = process.env[name];
  if (value === undefined || value === null) {
    return '';
  }

  return String(value).trim();
};

const requiredEnv = (name) => {
  const value = normalizeEnv(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const normalizeSecret = (value) => String(value).replace(/\s+/g, '').trim();

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const getFromAddress = () => {
  const from = normalizeEnv('EMAIL_FROM');
  if (from) {
    return from;
  }

  const user = normalizeEnv('EMAIL_USER');
  if (user) {
    return user;
  }

  return requiredEnv('EMAIL_FROM');
};

const textFromContact = (contactData) => [
  `Name: ${contactData.name}`,
  `Email: ${contactData.email}`,
  `Phone: ${contactData.phone || 'Not provided'}`,
  `Subject: ${contactData.subject}`,
  '',
  contactData.message
].join('\n');

const getTransporter = () => {
  const provider = process.env.EMAIL_PROVIDER || 'gmail';

  switch (provider) {
    case 'gmail':
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: requiredEnv('EMAIL_USER'),
          pass: normalizeSecret(requiredEnv('EMAIL_PASSWORD'))
        }
      });

    case 'sendgrid':
      return nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
          user: 'apikey',
          pass: normalizeSecret(requiredEnv('SENDGRID_API_KEY'))
        }
      });

    case 'custom':
      return nodemailer.createTransport({
        host: requiredEnv('SMTP_HOST'),
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: requiredEnv('SMTP_USER'),
          pass: normalizeSecret(requiredEnv('SMTP_PASSWORD'))
        }
      });

    default:
      throw new Error('Invalid EMAIL_PROVIDER in environment');
  }
};

const sendAdminNotification = async (contactData) => {
  try {
    const transporter = getTransporter();
    const safe = {
      name: escapeHtml(contactData.name),
      email: escapeHtml(contactData.email),
      phone: escapeHtml(contactData.phone || 'Not provided'),
      subject: escapeHtml(contactData.subject),
      message: escapeHtml(contactData.message).replace(/\n/g, '<br>')
    };

    await transporter.sendMail({
      from: getFromAddress(),
      to: requiredEnv('ADMIN_EMAIL'),
      replyTo: contactData.email,
      subject: `New Portfolio Contact: ${contactData.subject}`,
      text: textFromContact(contactData),
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Phone:</strong> ${safe.phone}</p>
        <p><strong>Subject:</strong> ${safe.subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${safe.message}</p>
        <hr>
        <p><small>Received at: ${new Date().toLocaleString()}</small></p>
      `
    });

    console.log('Admin notification email sent');
    return true;
  } catch (error) {
    console.error('Admin email sending error:', error);
    return false;
  }
};

const sendUserConfirmation = async (contactData) => {
  try {
    const transporter = getTransporter();
    const safe = {
      name: escapeHtml(contactData.name),
      subject: escapeHtml(contactData.subject),
      message: escapeHtml(contactData.message).replace(/\n/g, '<br>')
    };

    await transporter.sendMail({
      from: getFromAddress(),
      to: contactData.email,
      subject: 'Thank you for contacting Rachel A. Regacho',
      text: [
        `Hi ${contactData.name},`,
        '',
        'I received your message and will get back to you as soon as possible.',
        '',
        `Subject: ${contactData.subject}`,
        contactData.message,
        '',
        'Best regards,',
        'Rachel A. Regacho'
      ].join('\n'),
      html: `
        <h2>Thank You!</h2>
        <p>Hi ${safe.name},</p>
        <p>I received your message and will get back to you as soon as possible.</p>
        <hr>
        <p><strong>Your message summary:</strong></p>
        <p><strong>Subject:</strong> ${safe.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${safe.message}</p>
        <hr>
        <p>Best regards,<br><strong>Rachel A. Regacho</strong></p>
        <p><small>This is an automated response. Please do not reply to this email.</small></p>
      `
    });

    console.log('User confirmation email sent');
    return true;
  } catch (error) {
    console.error('User confirmation email error:', error);
    return false;
  }
};

module.exports = {
  sendAdminNotification,
  sendUserConfirmation,
  getTransporter
};
