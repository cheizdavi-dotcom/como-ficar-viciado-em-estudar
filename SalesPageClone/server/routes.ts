import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { checkoutSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Checkout endpoint
  app.post("/api/checkout", async (req, res) => {
    try {
      const validatedData = checkoutSchema.parse(req.body);
      
      // Simulate checkout processing
      const order = await storage.createOrder({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        state: validatedData.state,
        totalAmount: 5.90 + (validatedData.upsellProducts.length * 2.50),
        upsellProducts: validatedData.upsellProducts,
      });

      res.json({
        success: true,
        orderId: order.id,
        message: "Pedido processado com sucesso!",
      });
    } catch (error) {
      console.error("Checkout error:", error);
      res.status(400).json({
        success: false,
        message: "Erro ao processar pedido. Verifique os dados e tente novamente.",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
