// Drag & Drop Types for Email Builder

export interface DragItem {
  id: string;
  type: string;
  data?: any;
}

export interface DropZone {
  id: string;
  accepts: string[];
  data?: any;
}

export interface DragPreview {
  type: string;
  content: React.ReactNode;
}

export interface DragState {
  isDragging: boolean;
  draggedItem: DragItem | null;
  dragPreview: DragPreview | null;
}

export type DragEventType = 'start' | 'move' | 'end' | 'cancel'; 