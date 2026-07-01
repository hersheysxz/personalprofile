const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendAdminNotification, sendUserConfirmation } = require('../config/email');

const requireAdminKey = (req, res, next) => {
  if (!process.env.ADMIN_KEY) {
    return res.status(503).json({ error: 'Admin API is not configured' });
  }

  if (req.headers['x-admin-key'] !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  return next();
};

router.post('/', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('subject')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Subject must be between 3 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters'),
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone must be 20 characters or less')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => err.msg)
      });
    }

    const contactData = {
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      phone: req.body.phone || '',
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    };

    const contact = new Contact(contactData);
    await contact.save();
    console.log('Contact message saved to MongoDB');

    const [adminEmail, userEmail] = await Promise.allSettled([
      sendAdminNotification(contactData),
      sendUserConfirmation(contactData)
    ]);

    contact.emailStatus = {
      adminNotificationSent: adminEmail.status === 'fulfilled' && adminEmail.value === true,
      userConfirmationSent: userEmail.status === 'fulfilled' && userEmail.value === true,
      lastAttemptAt: new Date()
    };
    await contact.save();

    const emailSent = contact.emailStatus.adminNotificationSent || contact.emailStatus.userConfirmationSent;

    if (!emailSent) {
      console.error('Email notification failed for contact submission');
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your message was received. Email delivery may be delayed, but the message is stored.',
        id: contact._id,
        emailSent: false
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Rachel will get back to you soon.',
      id: contact._id,
      emailSent: true
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your message. Please try again.'
    });
  }
});

router.get('/', requireAdminKey, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(50);
    return res.json({
      success: true,
      total: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

router.get('/:id', requireAdminKey, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Message not found' });
    }

    return res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    return res.status(500).json({ error: 'Failed to fetch message' });
  }
});

router.put('/:id/read', requireAdminKey, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ error: 'Message not found' });
    }

    return res.json({
      success: true,
      message: 'Message marked as read',
      data: contact
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    return res.status(500).json({ error: 'Failed to update message' });
  }
});

router.delete('/:id', requireAdminKey, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Message not found' });
    }

    return res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;
