import { useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useCallback } from 'react'
import { BlockDragState, DraggableBlockItem, DroppableBlockZone } from '../config/types'

// Hook for making blocks draggable (from palette)
export const useDraggableBlock = (blockId: string, blockType: string, content?: string) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: blockId,
    data: {
      id: blockId,
      type: blockType,
      blockId,
      content: content, // Добавляем content для использования в drop handler
      draggable: true, // Mark as draggable (from palette)
    } as DraggableBlockItem,
  })

  const style = {
    // Don't apply transform to palette blocks - they should stay in place
    opacity: isDragging ? 0.6 : 1, // Slightly transparent when dragging to show it's active
  }

  return {
    attributes,
    listeners,
    setNodeRef,
    style,
    isDragging,
  }
}

// Hook for making containers droppable
export const useDroppableContainer = (containerId: string, containerType: string) => {
  const { isOver, setNodeRef } = useDroppable({
    id: containerId,
    data: {
      id: containerId,
      containerId,
      containerType,
      droppable: true, // Mark as droppable
      accepts: ['text', 'heading', 'button', 'image', 'divider', 'spacer', 'container'],
    } as DroppableBlockZone,
  })

  return {
    setNodeRef,
    isOver,
    canDrop: true, // TODO: implement validation logic
  }
}

// Hook for sortable blocks within containers
export const useSortableBlock = (blockId: string, blockType: string, containerId?: string) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: blockId,
    data: {
      id: blockId,
      type: blockType,
      blockId,
      sortable: {
        containerId: containerId, // Important: specify which container this belongs to
        index: 0, // TODO: get actual index
      },
    } as DraggableBlockItem,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return {
    attributes,
    listeners,
    setNodeRef,
    style,
    isDragging,
  }
}

// Hook for monitoring drag events
export const useBlockDragMonitor = (onDragStateChange: (state: Partial<BlockDragState>) => void) => {
  const handleDragStart = useCallback((event: any) => {
    onDragStateChange({
      isDragging: true,
      draggedBlock: event.active.data.current as DraggableBlockItem,
    })
  }, [onDragStateChange])

  const handleDragOver = useCallback((event: any) => {
    const { over } = event
    if (over) {
      onDragStateChange({
        dragOverContainer: over.id,
        isValidDrop: true, // TODO: implement validation
      })
    }
  }, [onDragStateChange])

  const handleDragEnd = useCallback((event: any) => {
    onDragStateChange({
      isDragging: false,
      draggedBlock: null,
      dragOverContainer: null,
      dragPosition: null,
    })
  }, [onDragStateChange])

  useDndMonitor({
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
  })
} 