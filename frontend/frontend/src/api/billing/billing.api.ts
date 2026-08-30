import { apiClient } from "../client";
import type { Plan, PaymentMethod, Invoice, BillingUsage } from "./billing.types";

export const billingApi = {
  getPlan: async (): Promise<Plan> => {
    const { data } = await apiClient.get<Plan>("/billing/plan");
    return data;
  },

  getUsage: async (): Promise<BillingUsage> => {
    const { data } = await apiClient.get<BillingUsage>("/billing/usage");
    return data;
  },

  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    const { data } = await apiClient.get<PaymentMethod[]>("/billing/payment-methods");
    return data;
  },

  getInvoices: async (): Promise<Invoice[]> => {
    const { data } = await apiClient.get<Invoice[]>("/billing/invoices");
    return data;
  },

  cancelSubscription: async (): Promise<void> => {
    await apiClient.post("/billing/cancel");
  },
};
