export interface Tale {
  id?: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TaleCreateData = Omit<Tale, "id" | "createdAt" | "updatedAt">;

export interface Transform {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TextBoxEntity {
  id: number;
  content: string;
  transform: Transform;
}

export interface DragStartPoint {
  x: number;
  y: number;
}

export type NativeDragEvent = MouseEvent | TouchEvent;
