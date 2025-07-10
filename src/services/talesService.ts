import Dexie, { type Table } from "dexie";
import type { Tale, TaleCreateData } from "../types";
import { tales } from "./seed";

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
  async loadTalesMetadata(): Promise<Omit<Tale, "slides">[]> {
    const tales = await db.tales
      .orderBy("updatedAt")
      .reverse()
      .toArray((tales) => tales.map(({ slides, ...metadata }) => metadata));
    return tales;
  }

  async getTaleById(id: number): Promise<Tale | null> {
    const tale = await db.tales.get(id);
    return tale || null;
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

  async resetAndSeedTestData(): Promise<void> {
    try {
      await db.tales.clear();
      for (const tale of tales) {
        await db.tales.add(tale);
      }
      console.log("✅ Database seeded successfully");
    } catch (error) {
      console.error("❌ Error seeding database:", error);
    }
  }
}

export const taleStorageService = new TalesStorageService();
