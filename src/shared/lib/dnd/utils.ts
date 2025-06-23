import { DragItem, DropZone } from './types';

// Check if drag item can be dropped in a zone
export const canDrop = (item: DragItem, zone: DropZone): boolean => {
  return zone.accepts.includes(item.type);
};

// Generate unique drag item ID
export const generateDragId = (type: string, index?: number): string => {
  const timestamp = Date.now();
  const suffix = index !== undefined ? `_${index}` : '';
  return `${type}_${timestamp}${suffix}`;
};

// Get drag preview element
export const createDragPreview = (element: HTMLElement): HTMLElement => {
  const preview = element.cloneNode(true) as HTMLElement;
  preview.style.opacity = '0.8';
  preview.style.transform = 'rotate(5deg)';
  preview.style.pointerEvents = 'none';
  return preview;
}; 