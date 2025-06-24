import { closestCenter, CollisionDetection, pointerWithin, rectIntersection } from '@dnd-kit/core'

// Custom collision detection for email builder
export const emailBuilderCollision: CollisionDetection = (args) => {
  const { droppableContainers, active, pointerCoordinates } = args

  // First, try pointer-based detection for immediate feedback
  if (pointerCoordinates) {
    const pointerCollisions = pointerWithin(args)
    if (pointerCollisions.length > 0) {
      return pointerCollisions
    }
  }

  // Fallback to rectangle intersection for complex layouts
  const rectCollisions = rectIntersection(args)
  if (rectCollisions.length > 0) {
    return rectCollisions
  }

  // Final fallback to closest center
  return closestCenter(args)
}

// Collision detection optimized for vertical containers
export const verticalContainerCollision: CollisionDetection = (args) => {
  const { droppableContainers, active, pointerCoordinates } = args

  if (!pointerCoordinates) {
    return closestCenter(args)
  }

  // Filter containers that are vertically aligned
  const verticalContainers = Array.from(droppableContainers.values()).filter(container => {
    const rect = container.rect.current
    if (!rect) return false
    
    // Check if pointer is within horizontal bounds
    return pointerCoordinates.x >= rect.left && pointerCoordinates.x <= rect.right
  })

  if (verticalContainers.length === 0) {
    return closestCenter(args)
  }

  // Find the container with the closest vertical position
  const closestVertical = verticalContainers.reduce((closest, container) => {
    const rect = container.rect.current
    if (!rect) return closest

    const distance = Math.abs(pointerCoordinates.y - (rect.top + rect.height / 2))
    
    if (!closest.distance || distance < closest.distance) {
      return { container, distance }
    }
    
    return closest
  }, {} as { container?: any, distance?: number })

  return closestVertical.container ? [{ id: closestVertical.container.id }] : []
}

// Collision detection for block palette (horizontal layout)
export const paletteCollision: CollisionDetection = (args) => {
  // For palette, we want immediate pointer-based feedback
  return pointerWithin(args)
}

// Smart collision detection that adapts based on drag source
export const adaptiveCollision: CollisionDetection = (args) => {
  const { active } = args
  const activeData = active.data.current

  // If dragging from palette, use palette-optimized collision
  if (activeData?.sourceContainer === 'palette') {
    return emailBuilderCollision(args)
  }

  // If dragging within vertical containers, use vertical-optimized collision
  if (activeData?.containerType === 'email' || activeData?.containerType === 'container') {
    return verticalContainerCollision(args)
  }

  // Default to email builder collision
  return emailBuilderCollision(args)
} 