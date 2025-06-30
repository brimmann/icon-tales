import type { UniqueIdentifier } from "@dnd-kit/core";
import type { CSSProperties } from "react";

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

export type TextBoxStyle = Pick<
  CSSProperties,
  "fontSize" | "fontWeight" | "fontStyle" | "textAlign" | "color"
>;

export interface TextBoxEntity {
  id: UniqueIdentifier;
  content: string;
  transform: Transform;
  style: TextBoxStyle;
}

export type NativeDragEvent = MouseEvent | TouchEvent;
