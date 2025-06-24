import { useDroppableContainer } from '@features/block-drag-drop'
import { cn } from '@shared/lib/utils'
import React from 'react'

interface DropZoneProps {
  id: string
  containerType: 'email' | 'container' | 'columns'
  children?: React.ReactNode
  className?: string
  placeholder?: string
  isActive?: boolean
  acceptedTypes?: string[]
  onDrop?: (blockId: string, position?: number) => void
}

// Drop Zone Component for containers
export const DropZone: React.FC<DropZoneProps> = ({
  id,
  containerType,
  children,
  className,
  placeholder = 'Drop blocks here',
  isActive = false,
  acceptedTypes = ['text', 'heading', 'button', 'image', 'divider', 'spacer'],
  onDrop,
}) => {
  const { setNodeRef, isOver, canDrop } = useDroppableContainer(id, containerType)

  const isEmpty = !children || (Array.isArray(children) && children.length === 0)
  const showPlaceholder = isEmpty && !isOver
  const isValidDrop = isOver && canDrop

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'drop-zone',
        'min-h-[60px] p-2',
        'border-2 border-dashed border-transparent',
        'transition-all duration-200 ease-in-out',
        // Default state
        !isOver && !isActive && 'border-gray-200',
        // Active state (container is selected)
        isActive && !isOver && 'border-blue-300 bg-blue-50/30',
        // Drag over state
        isValidDrop && 'border-blue-500 bg-blue-100/50',
        isOver && !canDrop && 'border-red-400 bg-red-100/50',
        // Empty state
        showPlaceholder && 'bg-gray-50/50',
        className
      )}
      data-drop-zone={id}
      data-container-type={containerType}
    >
      {showPlaceholder ? (
        <div className="flex items-center justify-center h-full min-h-[60px]">
          <div className="text-center">
            <div className="text-gray-400 text-sm font-medium mb-1">
              {placeholder}
            </div>
            <div className="text-gray-300 text-xs">
              Accepted: {acceptedTypes.join(', ')}
            </div>
          </div>
        </div>
      ) : (
        <div className="drop-zone-content">
          {children}
        </div>
      )}
      
      {/* Drop indicator overlay */}
      {isValidDrop && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-1 bg-blue-500 rounded-full animate-pulse" />
        </div>
      )}
    </div>
  )
}

// CSS for drop zone (temporary inline styles)
const dropZoneStyles = `
  .drop-zone {
    position: relative;
  }
  
  .drop-zone.drag-over-valid {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
  }
  
  .drop-zone.drag-over-invalid {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.15);
  }
  
  .drop-zone-content {
    position: relative;
    z-index: 1;
  }
  
  @keyframes dropZonePulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
  
  .drop-zone.drag-over-valid::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #3b82f6, #1d4ed8);
    border-radius: 8px;
    z-index: -1;
    animation: dropZonePulse 1.5s ease-in-out infinite;
  }
`

// Inject styles (temporary solution)
if (typeof document !== 'undefined') {
  const existingStyle = document.querySelector('#drop-zone-styles')
  if (!existingStyle) {
    const styleElement = document.createElement('style')
    styleElement.id = 'drop-zone-styles'
    styleElement.textContent = dropZoneStyles
    document.head.appendChild(styleElement)
  }
} 