import { delay } from "./delay";
import type { Plan, PaymentMethod, Invoice, BillingUsage } from "../billing/billing.types";

export const mockBillingApi = {
  getPlan: async (): Promise<Plan> => {
    await delay();
    return { id: "pro", name: "Pro Plan", priceMonthly: 49, renewsAt: "2025-09-01T00:00:00Z", status: "active" };
  },
  getUsage: async (): Promise<BillingUsage> => {
    await delay();
    return { creditsUsed: 1240, creditsTotal: 5000, seatsUsed: 8, seatsTotal: 10, reportsGenerated: 42 };
  },
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    await delay();
    return [{ id: "pm1", brand: "Visa", last4: "4242", expiryMonth: 9, expiryYear: 2027, isDefault: true }];
  },
  getInvoices: async (): Promise<Invoice[]> => {
    await delay();
    return [
      { id: "inv1", description: "Pro Plan", amount: 49, currency: "USD", status: "paid", createdAt: "2025-08-01T00:00:00Z", invoiceUrl: null },
      { id: "inv2", description: "Pro Plan", amount: 49, currency: "USD", status: "paid", createdAt: "2025-07-01T00:00:00Z", invoiceUrl: null },
      { id: "inv3", description: "Pro Plan", amount: 49, currency: "USD", status: "paid", createdAt: "2025-06-01T00:00:00Z", invoiceUrl: null },
      { id: "inv4", description: "Starter Plan", amount: 29, currency: "USD", status: "paid", createdAt: "2025-05-01T00:00:00Z", invoiceUrl: null },
    ];
  },
  cancelSubscription: async (): Promise<void> => {
    await delay(300, 600);
  },
};
