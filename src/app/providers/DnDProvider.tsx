import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import {
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable'
import { BlockDragState, useBlockDragMonitor } from '@features/block-drag-drop'
import React from 'react'

interface DnDProviderProps {
  children: React.ReactNode
  onDrop?: (event: DragEndEvent) => void
  onSort?: (event: DragEndEvent) => void
  onDragStart?: (event: DragStartEvent) => void
  onDragOver?: (event: DragOverEvent) => void
}

// Internal component that uses drag monitor inside DndContext
const DragMonitor: React.FC<{ 
  onDragStateChange: (state: Partial<BlockDragState>) => void 
}> = ({ onDragStateChange }) => {
  useBlockDragMonitor(onDragStateChange)
  return null
}

// DnD Context Provider for Email Builder
export const DnDProvider: React.FC<DnDProviderProps> = ({ 
  children, 
  onDrop, 
  onSort, 
  onDragStart: externalOnDragStart, 
  onDragOver: externalOnDragOver 
}) => {
  const [dragState, setDragState] = React.useState<BlockDragState>({
    isDragging: false,
    draggedBlock: null,
    dragOverContainer: null,
    dragPosition: null,
    isValidDrop: false,
  })

  // Configure sensors for drag interactions
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Minimum drag distance to activate
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Handle drag start
  const handleDragStart = React.useCallback((event: DragStartEvent) => {
    const { active } = event
    
    setDragState(prev => ({
      ...prev,
      isDragging: true,
      draggedBlock: active.data.current as any,
      isValidDrop: false,
    }))

    console.log('Drag started:', active.id, active.data.current)
    
    // Вызываем внешний обработчик если есть
    if (externalOnDragStart) {
      externalOnDragStart(event)
    }
  }, [externalOnDragStart])

  // Handle drag over
  const handleDragOver = React.useCallback((event: DragOverEvent) => {
    const { active, over } = event
    
    if (over) {
      setDragState(prev => ({
        ...prev,
        dragOverContainer: over.id as string,
        isValidDrop: true, // TODO: implement drop validation
      }))
    }

    console.log('Drag over:', over?.id, over?.data.current)
    
    // Вызываем внешний обработчик если есть
    if (externalOnDragOver) {
      externalOnDragOver(event)
    }
  }, [externalOnDragOver])

  // Handle drag end
  const handleDragEnd = React.useCallback((event: DragEndEvent) => {
    const { active, over } = event

    console.log('=== DRAG END EVENT ===')
    console.log('Active:', {
      id: active.id,
      data: active.data.current
    })
    console.log('Over:', {
      id: over?.id,
      data: over?.data.current
    })

    if (over && active.id !== over.id) {
      const activeData = active.data.current
      const overData = over.data.current

      console.log('=== DROP/SORT ANALYSIS ===')
      console.log('Active has sortable:', !!activeData?.sortable)
      console.log('Over has sortable:', !!overData?.sortable)
      console.log('Active has draggable:', !!activeData?.draggable)
      console.log('Over has droppable:', !!overData?.droppable)

      // Определяем тип операции на основе данных
      if (activeData?.sortable && overData?.sortable) {
        // Сортировка внутри контейнера (оба элемента sortable)
        const activeContainerId = activeData.sortable.containerId
        const overContainerId = overData.sortable.containerId
        
        console.log('=== SORT OPERATION ===')
        console.log('Active container:', activeContainerId)
        console.log('Over container:', overContainerId)
        
        if (activeContainerId === overContainerId && onSort) {
          console.log('✅ Calling onSort:', { activeContainerId, activeId: active.id, overId: over.id })
          onSort(event)
          return // Важно: выходим, чтобы не вызывать onDrop
        }
      }
      
      // Все остальные случаи обрабатываем как drop операции
      if (onDrop) {
        console.log('=== DROP OPERATION ===')
        console.log('Calling onDrop for event')
        onDrop(event)
      } else {
        console.log('❌ No onDrop handler available')
      }
    } else {
      console.log('=== NO DROP/SORT ===')
      if (!over) console.log('No over target')
      if (over && active.id === over.id) console.log('Same element')
    }

    // Reset drag state
    setDragState({
      isDragging: false,
      draggedBlock: null,
      dragOverContainer: null,
      dragPosition: null,
      isValidDrop: false,
    })

    console.log('=== DRAG END COMPLETE ===')
  }, [onDrop, onSort])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]}
    >
      <DragMonitor onDragStateChange={(state) => setDragState(prev => ({ ...prev, ...state }))} />
      {children}
      
      {/* Drag overlay for visual feedback */}
      <DragOverlay>
        {dragState.isDragging && dragState.draggedBlock ? (
          <div className="drag-overlay">
            <div className="drag-preview">
              <div className="block-preview">
                {dragState.draggedBlock.type} Block
              </div>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

// CSS for drag overlay (restored old style - no rotation)
const dragOverlayStyles = `
  .drag-overlay {
    pointer-events: none;
    z-index: 9999;
  }
  
  .drag-preview {
    background: rgba(37, 99, 235, 0.1);
    border: 2px dashed #2563eb;
    border-radius: 8px;
    padding: 12px;
    min-width: 200px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .block-preview {
    color: #2563eb;
    font-weight: 500;
    text-align: center;
    font-size: 14px;
  }
`

// Inject styles (temporary solution)
if (typeof document !== 'undefined') {
  const existingStyle = document.querySelector('#drag-overlay-styles')
  if (!existingStyle) {
    const styleElement = document.createElement('style')
    styleElement.id = 'drag-overlay-styles'
    styleElement.textContent = dragOverlayStyles
    document.head.appendChild(styleElement)
  }
} 