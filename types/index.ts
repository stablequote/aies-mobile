// types/index.ts
export interface AnalyticsResponse {
  expenses: { today: number; week: number; avgWeekly: number };
  purchases: { today: number; week: number; avgWeekly: number };
  production: { today: number; flipsToday: number; week: number };
  revenue: { unitCost: number; netToday: number; netWeek: number };
  distribution: {
    pendingCount: number;
    pendingAmount: number;
    distributionsToday: number;
    distributionsWeek: number;
  };
  inventory: { availableStock: number };
}

export interface DistributionCreatePayload {
  merchant: string;
  product: string;
  quantity: number;
  unitSalePrice: number;
  paymentMethod?: "cash" | "bank";
  paymentStatus?: "pending" | "paid" | "partial";
  date?: string;
}

export interface InventoryItem {
  _id: string;
  product: string;
  productName?: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExpenseItem {
  _id: string;
  amount: number;
  category?: string;
  notes?: string;
  createdAt: string;
}
