import { BlockType } from '@entities/block'
import { DragItem, DropZone } from '@shared/lib/dnd'

// Block Drag & Drop Feature Types

export interface DraggableBlockItem extends DragItem {
  type: BlockType
  blockId: string
  sourceContainer?: string
  originalIndex?: number
}

export interface DroppableBlockZone extends DropZone {
  containerId: string
  containerType: 'email' | 'container' | 'columns'
  position?: number
  isNested?: boolean
}

export interface BlockDragState {
  isDragging: boolean
  draggedBlock: DraggableBlockItem | null
  dragOverContainer: string | null
  dragPosition: number | null
  isValidDrop: boolean
}

export interface BlockDropResult {
  blockId: string
  sourceContainer: string
  targetContainer: string
  sourceIndex: number
  targetIndex: number
  operation: 'move' | 'copy' | 'create'
}

export type BlockDragEventType = 
  | 'drag-start'
  | 'drag-move' 
  | 'drag-over'
  | 'drag-end'
  | 'drop'
  | 'drag-cancel' 