export type PlanId = "free" | "pro" | "enterprise";
export type InvoiceStatus = "paid" | "pending" | "failed";

export interface Plan {
  id: PlanId;
  name: string;
  priceMonthly: number;
  renewsAt: string;
  status: "active" | "canceled" | "past_due";
}

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface Invoice {
  id: string;
  description: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  createdAt: string;
  invoiceUrl: string | null;
}

export interface BillingUsage {
  creditsUsed: number;
  creditsTotal: number;
  seatsUsed: number;
  seatsTotal: number;
  reportsGenerated: number;
}
