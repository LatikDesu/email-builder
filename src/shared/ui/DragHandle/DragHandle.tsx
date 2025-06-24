import { IconDrag } from '@consta/icons/IconDrag'
import { cn } from '@shared/lib/utils'
import React from 'react'

interface DragHandleProps {
  listeners?: any
  attributes?: any
  className?: string
  size?: 's' | 'm' | 'l'
  visible?: boolean
}

// Drag Handle Component for blocks
export const DragHandle: React.FC<DragHandleProps> = ({
  listeners,
  attributes,
  className,
  size = 'm',
  visible = true,
}) => {
  if (!visible) {
    return null
  }

  const sizeClasses = {
    s: 'w-4 h-4',
    m: 'w-5 h-5',
    l: 'w-6 h-6',
  }

  return (
    <button
      className={cn(
        'drag-handle',
        'flex items-center justify-center',
        'bg-gray-100 hover:bg-gray-200',
        'border border-gray-300',
        'rounded cursor-grab active:cursor-grabbing',
        'transition-colors duration-150',
        'focus:outline-none focus:ring-2 focus:ring-blue-500',
        sizeClasses[size],
        className
      )}
      {...listeners}
      {...attributes}
      aria-label="Drag to move this block"
    >
      <IconDrag size="xs" />
    </button>
  )
}

// CSS for drag handle (temporary inline styles)
const dragHandleStyles = `
  .drag-handle {
    position: relative;
    opacity: 0.7;
    transition: opacity 0.15s ease;
  }
  
  .drag-handle:hover {
    opacity: 1;
  }
  
  .drag-handle:active {
    transform: scale(0.95);
  }
  
  .drag-handle:focus {
    opacity: 1;
  }
`

// Inject styles (temporary solution)
if (typeof document !== 'undefined') {
  const existingStyle = document.querySelector('#drag-handle-styles')
  if (!existingStyle) {
    const styleElement = document.createElement('style')
    styleElement.id = 'drag-handle-styles'
    styleElement.textContent = dragHandleStyles
    document.head.appendChild(styleElement)
  }
} 