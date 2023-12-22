const mongoose = require('mongoose');

const qaSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    favourite: {
      type: Boolean,
    },
    totalTokens: {
      type: Number,
    },
    responseTime: {
      type: Number,
    },
    inputTokens: {
      type: Number
    },
    outputTokens: {
      type: Number
    }

  },
  { timestamps: true }
);

const QA = mongoose.model('QA', qaSchema);

module.exports = QA;