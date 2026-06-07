const mongoose = require('mongoose')

const DoohEntrySchema = new mongoose.Schema(
  {
    place: { type: String, required: true, trim: true, index: true },
    placeType: { type: String, default: '', trim: true },
    ad: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    paymentFrequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'one-time'],
      default: 'monthly',
    },
    checkoutDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true, min: 0 },
    sharePct: { type: Number, required: true, min: 0, max: 100 },
    status: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
      index: true,
    },
    paidAt: { type: Date },
    notes: { type: String, default: '', trim: true },
  },
  { timestamps: true },
)

// Convenience virtual: amount owed to the venue
DoohEntrySchema.virtual('venueAmount').get(function () {
  return (Number(this.totalAmount) * Number(this.sharePct)) / 100
})

DoohEntrySchema.set('toJSON', { virtuals: true })
DoohEntrySchema.set('toObject', { virtuals: true })

module.exports = mongoose.model('DoohEntry', DoohEntrySchema)
