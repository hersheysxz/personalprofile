const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/, 'Please provide a valid email']
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject'],
      trim: true,
      minlength: 3,
      maxlength: 200
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
      trim: true,
      minlength: 10,
      maxlength: 5000
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 20
    },
    ip: {
      type: String,
      default: null
    },
    userAgent: {
      type: String,
      default: null
    },
    isRead: {
      type: Boolean,
      default: false
    },
    emailStatus: {
      adminNotificationSent: {
        type: Boolean,
        default: false
      },
      userConfirmationSent: {
        type: Boolean,
        default: false
      },
      lastAttemptAt: {
        type: Date,
        default: null
      }
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
