declare module '@paystack/inline-js' {
  interface PaystackTransaction {
    reference: string;
    status: string;
    trans: string;
    transaction: string;
    message: string;
  }

  interface PaystackOptions {
    key: string;
    email: string;
    amount: number;
    reference: string;
    onSuccess: (transaction: PaystackTransaction) => void;
    onCancel: () => void;
  }

  class PaystackPop {
    newTransaction(options: PaystackOptions): void;
  }

  export default PaystackPop;
}
