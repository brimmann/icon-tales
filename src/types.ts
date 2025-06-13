export interface Tale {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TaleCreateData = Omit<Tale, "id" | "createdAt" | "updatedAt">;
