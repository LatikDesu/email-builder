import { useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useCallback } from 'react'
import { BlockDragState, DraggableBlockItem, DroppableBlockZone } from '../config/types'

// Hook for making blocks draggable
export const useDraggableBlock = (blockId: string, blockType: string) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: blockId,
    data: {
      type: blockType,
      blockId,
    } as DraggableBlockItem,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
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

// Hook for making containers droppable
export const useDroppableContainer = (containerId: string, containerType: string) => {
  const { isOver, setNodeRef } = useDroppable({
    id: containerId,
    data: {
      containerId,
      containerType,
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
export const useSortableBlock = (blockId: string, blockType: string) => {
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
      type: blockType,
      blockId,
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