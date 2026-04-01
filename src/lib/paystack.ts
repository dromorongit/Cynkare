import PaystackPop from '@paystack/inline-js';

// Paystack configuration
export const paystackConfig = {
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
  secretKey: process.env.PAYSTACK_SECRET_KEY || '',
};

// Initialize Paystack payment
export const initializePaystackPayment = ({
  email,
  amount,
  reference,
  onSuccess,
  onCancel,
}: {
  email: string;
  amount: number;
  reference: string;
  onSuccess: (reference: string) => void;
  onCancel: () => void;
}) => {
  const paystack = new PaystackPop();
  
  paystack.newTransaction({
    key: paystackConfig.publicKey,
    email,
    amount: amount * 100, // Convert to kobo (smallest currency unit)
    reference,
    onSuccess: (transaction: { reference: string }) => {
      onSuccess(transaction.reference);
    },
    onCancel: () => {
      onCancel();
    },
  });
};

// Generate unique payment reference
export const generatePaymentReference = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `cynkare_${timestamp}_${random}`;
};
