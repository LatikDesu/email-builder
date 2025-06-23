// Editor Entity Types

export interface EditorState {
  selectedBlockId: string | null;
  selectedBlockIds: string[];
  hoveredBlockId: string | null;
  isDragging: boolean;
  isResizing: boolean;
  mode: EditorMode;
}

export type EditorMode = 'edit' | 'preview' | 'code';

export interface EditorAction {
  type: string;
  payload?: any;
  timestamp: number;
}

export interface EditorHistory {
  past: EditorAction[];
  present: EditorAction | null;
  future: EditorAction[];
}

export interface EditorSettings {
  showGrid: boolean;
  snapToGrid: boolean;
  gridSize: number;
  showRulers: boolean;
  zoom: number;
} 