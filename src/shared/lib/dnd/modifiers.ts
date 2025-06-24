import { Modifier } from '@dnd-kit/core'

// Restrict dragging to email canvas area
export const restrictToEmailCanvas: Modifier = ({ transform, containerNodeRect, draggingNodeRect }) => {
  if (!containerNodeRect || !draggingNodeRect) {
    return transform
  }

  // Find email canvas container (you may need to adjust this selector)
  const emailCanvas = document.querySelector('[data-email-canvas]') as HTMLElement
  if (!emailCanvas) {
    return transform
  }

  const canvasRect = emailCanvas.getBoundingClientRect()
  
  const minX = canvasRect.left - containerNodeRect.left
  const maxX = canvasRect.right - containerNodeRect.left - draggingNodeRect.width
  const minY = canvasRect.top - containerNodeRect.top
  const maxY = canvasRect.bottom - containerNodeRect.top - draggingNodeRect.height

  return {
    ...transform,
    x: Math.min(Math.max(transform.x, minX), maxX),
    y: Math.min(Math.max(transform.y, minY), maxY),
  }
}

// Snap to grid modifier for precise positioning
export const snapToGrid = (gridSize: number = 8): Modifier => {
  return ({ transform }) => {
    return {
      ...transform,
      x: Math.round(transform.x / gridSize) * gridSize,
      y: Math.round(transform.y / gridSize) * gridSize,
    }
  }
}

// Apply rotation during drag for visual feedback
export const applyDragRotation = (angle: number = 5): Modifier => {
  return ({ transform }) => {
    return {
      ...transform,
      scaleX: 0.95,
      scaleY: 0.95,
    }
  }
}

// Constrain vertical movement for horizontal containers
export const constrainVerticalMovement: Modifier = ({ transform, activeNodeRect }) => {
  if (!activeNodeRect) {
    return transform
  }

  // Limit vertical movement for better UX
  return {
    ...transform,
    y: Math.min(Math.abs(transform.y), 50) * Math.sign(transform.y), // Limit to 50px vertical movement
  }
}

// Smooth transition modifier
export const smoothTransition: Modifier = ({ transform }) => {
  const maxDistance = 300
  const distance = Math.sqrt(transform.x ** 2 + transform.y ** 2)
  
  if (distance > maxDistance) {
    const scale = maxDistance / distance
    return {
      ...transform,
      x: transform.x * scale,
      y: transform.y * scale,
    }
  }
  
  return transform
}

// Combine multiple modifiers
export const createModifierChain = (...modifiers: Modifier[]): Modifier => {
  return (args) => {
    return modifiers.reduce((transform, modifier) => {
      return modifier({ ...args, transform })
    }, args.transform)
  }
}

// Email builder default modifiers
export const emailBuilderModifiers = createModifierChain(
  restrictToEmailCanvas,
  snapToGrid(4),
  smoothTransition
) 