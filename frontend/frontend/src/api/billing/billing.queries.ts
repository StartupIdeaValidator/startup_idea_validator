import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { billingApi } from "./billing.api";

export const billingKeys = {
  all: ["billing"] as const,
  plan: () => [...billingKeys.all, "plan"] as const,
  usage: () => [...billingKeys.all, "usage"] as const,
  paymentMethods: () => [...billingKeys.all, "payment-methods"] as const,
  invoices: () => [...billingKeys.all, "invoices"] as const,
};

export const useBillingPlan = () => {
  return useQuery({
    queryKey: billingKeys.plan(),
    queryFn: billingApi.getPlan,
  });
};

export const useBillingUsage = () => {
  return useQuery({
    queryKey: billingKeys.usage(),
    queryFn: billingApi.getUsage,
  });
};

export const usePaymentMethods = () => {
  return useQuery({
    queryKey: billingKeys.paymentMethods(),
    queryFn: billingApi.getPaymentMethods,
  });
};

export const useInvoices = () => {
  return useQuery({
    queryKey: billingKeys.invoices(),
    queryFn: billingApi.getInvoices,
  });
};

export const useCancelSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: billingApi.cancelSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: billingKeys.plan() });
    },
  });
};
