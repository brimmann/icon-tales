import type { Modifier } from "@dnd-kit/core";
import type { ClientRect } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";

export const restrictToParent: Modifier = ({
  transform,
  draggingNodeRect,
  containerNodeRect,
}: {
  transform: Transform;
  draggingNodeRect: ClientRect | null;
  containerNodeRect: ClientRect | null;
}): Transform => {
  // If we don't have the dimensions of the elements, we can't do anything.
  if (!draggingNodeRect || !containerNodeRect) {
    return transform;
  }

  const newTransform: Transform = { ...transform };

  // Check the left boundary
  if (draggingNodeRect.left + transform.x < containerNodeRect.left) {
    newTransform.x = containerNodeRect.left - draggingNodeRect.left;
  }
  // Check the right boundary
  else if (draggingNodeRect.right + transform.x > containerNodeRect.right) {
    newTransform.x = containerNodeRect.right - draggingNodeRect.right;
  }

  // Check the top boundary
  if (draggingNodeRect.top + transform.y < containerNodeRect.top) {
    newTransform.y = containerNodeRect.top - draggingNodeRect.top;
  }
  // Check the bottom boundary
  else if (draggingNodeRect.bottom + transform.y > containerNodeRect.bottom) {
    newTransform.y = containerNodeRect.bottom - draggingNodeRect.bottom;
  }

  return newTransform;
};
