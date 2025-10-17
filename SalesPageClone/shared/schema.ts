import { z } from "zod";

// Checkout form schema
export const checkoutSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  confirmEmail: z.string().email("Email inválido"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  state: z.string().min(1, "Estado é obrigatório"),
  cardNumber: z.string().min(16, "Número do cartão inválido"),
  cardMonth: z.string().min(1, "Mês é obrigatório"),
  cardYear: z.string().min(1, "Ano é obrigatório"),
  cardCvc: z.string().min(3, "CVC é obrigatório"),
  upsellProducts: z.array(z.string()).default([]),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Os emails não coincidem",
  path: ["confirmEmail"],
});

export type CheckoutForm = z.infer<typeof checkoutSchema>;

// Upsell product type
export interface UpsellProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

// Checkout response
export interface CheckoutResponse {
  success: boolean;
  orderId?: string;
  message: string;
}
