const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  priority: { type: String, enum: ['High','Medium','Low'], default: 'Medium' },
  completed: { type: Boolean, default: false },
  dueDate: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
