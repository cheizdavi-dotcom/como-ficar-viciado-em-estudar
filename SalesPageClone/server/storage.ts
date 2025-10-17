import { randomUUID } from "crypto";

export interface Order {
  id: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  totalAmount: number;
  upsellProducts: string[];
  createdAt: Date;
}

export interface InsertOrder {
  name: string;
  email: string;
  phone: string;
  state: string;
  totalAmount: number;
  upsellProducts: string[];
}

export interface IStorage {
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;
}

export class MemStorage implements IStorage {
  private orders: Map<string, Order>;

  constructor() {
    this.orders = new Map();
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
}

export const storage = new MemStorage();
