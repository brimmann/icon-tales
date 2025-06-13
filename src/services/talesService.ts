import type { Tale, TaleCreateData } from "../types";

class TalesStorageService {
  private readonly STORAGE_KEY = "tales";

  private generateId() {
    return crypto.randomUUID();
  }

  private getStorageData(): Tale[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return [];

    const parsed = JSON.parse(data, (key, value) => {
      if (key.endsWith("At") && typeof value === "string") {
        return new Date(value);
      }
      return value;
    });

    return parsed;
  }

  private saveStorageData(tales: Tale[]): void {
    const serialized = JSON.stringify(tales, (_, value) => {
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value;
    });
    localStorage.setItem(this.STORAGE_KEY, serialized);
  }

  createProject(taleCreateData: TaleCreateData): Tale {
    const now = new Date();
    const newTale: Tale = {
      id: this.generateId(),
      title: taleCreateData.title,
      createdAt: now,
      updatedAt: now,
    };

    const tales = this.getStorageData();
    tales.push(newTale);
    this.saveStorageData(tales);

    return newTale;
  }
}

export const taleStorageService = new TalesStorageService();
