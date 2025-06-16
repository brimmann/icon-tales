import Dexie, { type Table } from "dexie";
import type { Tale, TaleCreateData } from "../types";

class AppDatabase extends Dexie {
  tales!: Table<Tale>;

  constructor() {
    super("AppDatabase");

    this.version(1).stores({
      tales: "++id, title, createAt, updatedAt",
    });
  }
}

const db = new AppDatabase();

class TalesStorageService {
  async getTales(): Promise<Tale[]> {
    const tales = await db.tales.orderBy("updatedAt").reverse().toArray();
    return tales;
  }

  async createTale(taleCreateData: TaleCreateData): Promise<Tale> {
    const now = new Date();
    const newTale: Tale = {
      title: taleCreateData.title,
      createdAt: now,
      updatedAt: now,
    };

    await db.tales.add(newTale);

    return newTale;
  }
}

export const taleStorageService = new TalesStorageService();
