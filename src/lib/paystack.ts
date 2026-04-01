// Paystack configuration
export const paystackConfig = {
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
  secretKey: process.env.PAYSTACK_SECRET_KEY || '',
};

// Generate unique payment reference
export const generatePaymentReference = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `cynkare_${timestamp}_${random}`;
};
