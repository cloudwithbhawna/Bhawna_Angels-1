// routes/payment.js
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();

// Initialize Razorpay instance with your credentials
const razorpayInstance = new Razorpay({
  key_id: 'rzp_live_b4EYdELZMb2OrT',           // Replace with your Razorpay Key ID
  key_secret: 'TybwJGx0gyQ39JLOng4DwQGY'      // Replace with your Razorpay Key Secret
});

// Create Order endpoint with fixed Rs 300 fee (300 * 100 = 30000 paise)
router.post('/createOrder', async (req, res) => {
  const amount = 300; // fixed amount in rupees
  const options = {
    amount: amount * 100, // convert rupees to paise
    currency: "INR"
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Payment endpoint
router.post('/verifyPayment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Generate signature using your key_secret
  const generatedSignature = crypto
    .createHmac('sha256', 'TybwJGx0gyQ39JLOng4DwQGY')  // Use the same secret key as above
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (generatedSignature === razorpay_signature) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, error: 'Invalid signature' });
  }
});

module.exports = router;