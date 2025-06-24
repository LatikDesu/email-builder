import { BlockDragState, BlockDropResult, DraggableBlockItem } from '@features/block-drag-drop'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

// Drag Store State
interface DragStoreState extends BlockDragState {
  // Actions
  setDragState: (state: Partial<BlockDragState>) => void
  startDrag: (block: DraggableBlockItem) => void
  endDrag: () => void
  setDragOver: (containerId: string | null, position?: number) => void
  
  // Drop handling
  handleDrop: (result: BlockDropResult) => void
  
  // Validation
  canDropInContainer: (containerId: string, blockType: string) => boolean
  
  // History for undo/redo
  dragHistory: BlockDropResult[]
  addToHistory: (result: BlockDropResult) => void
  clearHistory: () => void
}

// Create drag store
export const useDragStore = create<DragStoreState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    isDragging: false,
    draggedBlock: null,
    dragOverContainer: null,
    dragPosition: null,
    isValidDrop: false,
    dragHistory: [],

    // Actions
    setDragState: (state) =>
      set((prev) => ({ ...prev, ...state })),

    startDrag: (block) =>
      set({
        isDragging: true,
        draggedBlock: block,
        dragOverContainer: null,
        dragPosition: null,
        isValidDrop: false,
      }),

    endDrag: () =>
      set({
        isDragging: false,
        draggedBlock: null,
        dragOverContainer: null,
        dragPosition: null,
        isValidDrop: false,
      }),

    setDragOver: (containerId, position) =>
      set((prev) => ({
        dragOverContainer: containerId,
        dragPosition: position || null,
        isValidDrop: containerId ? get().canDropInContainer(containerId, prev.draggedBlock?.type || '') : false,
      })),

    handleDrop: (result) => {
      const { addToHistory } = get()
      
      // Add to history for undo/redo
      addToHistory(result)
      
      // TODO: Implement actual block movement in document store
      console.log('Handling drop:', result)
      
      // End drag
      get().endDrag()
    },

    canDropInContainer: (containerId, blockType) => {
      // TODO: Implement proper drop validation logic
      // This should check container types, nesting rules, etc.
      
      // For now, allow all drops except some basic rules
      const restrictedContainers = ['email-header', 'email-footer']
      const restrictedBlocks = ['html'] // HTML blocks might have restrictions
      
      if (restrictedContainers.includes(containerId) && restrictedBlocks.includes(blockType)) {
        return false
      }
      
      return true
    },

    addToHistory: (result) =>
      set((prev) => ({
        dragHistory: [...prev.dragHistory.slice(-9), result], // Keep last 10 operations
      })),

    clearHistory: () =>
      set({ dragHistory: [] }),
  }))
)

// Selectors for common use cases
export const dragSelectors = {
  isDragging: (state: DragStoreState) => state.isDragging,
  draggedBlock: (state: DragStoreState) => state.draggedBlock,
  dragOverContainer: (state: DragStoreState) => state.dragOverContainer,
  isValidDrop: (state: DragStoreState) => state.isValidDrop,
  canDrop: (state: DragStoreState) => (containerId: string, blockType: string) =>
    state.canDropInContainer(containerId, blockType),
}

// Hook for drag state subscription
export const useDragState = () => {
  const dragState = useDragStore((state) => ({
    isDragging: state.isDragging,
    draggedBlock: state.draggedBlock,
    dragOverContainer: state.dragOverContainer,
    dragPosition: state.dragPosition,
    isValidDrop: state.isValidDrop,
  }))
  
  return dragState
}

// Hook for drag actions
export const useDragActions = () => {
  const actions = useDragStore((state) => ({
    setDragState: state.setDragState,
    startDrag: state.startDrag,
    endDrag: state.endDrag,
    setDragOver: state.setDragOver,
    handleDrop: state.handleDrop,
    canDropInContainer: state.canDropInContainer,
  }))
  
  return actions
} 