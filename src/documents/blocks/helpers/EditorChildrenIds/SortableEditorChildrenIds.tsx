import React, { Fragment, useState } from 'react'

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { TEditorBlock } from '../../../editor/core'
import EditorBlock from '../../../editor/EditorBlock'

import AddBlockButton from './AddBlockMenu'

export type EditorChildrenChange = {
  blockId: string
  block: TEditorBlock
  childrenIds: string[]
}

function generateId() {
  return `block-${Date.now()}`
}

// Drop indicator component for showing insertion position
const DropIndicator: React.FC<{ 
  isVisible: boolean; 
  className?: string 
}> = ({ isVisible, className = '' }) => {
  if (!isVisible) return null;
  
  return (
    <div 
      className={`drop-indicator ${className}`}
      style={{
        height: '2px',
        width: '100%',
        backgroundColor: '#0066cc',
        borderRadius: '1px',
        margin: '4px 0',
        boxShadow: '0 0 6px rgba(0, 102, 204, 0.6)',
        animation: 'dropIndicatorPulse 1.5s ease-in-out infinite',
        position: 'relative'
      }}
    >
      {/* Center dot */}
      <div 
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '8px',
          height: '8px',
          backgroundColor: '#0066cc',
          borderRadius: '50%',
          border: '2px solid white',
          boxShadow: '0 0 8px rgba(0, 102, 204, 0.8)',
        }}
      />
    </div>
  );
};

// Sortable wrapper for individual blocks
function SortableEditorBlock({ id }: { id: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    position: 'relative' as const,
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
    >
      <EditorBlock id={id} />
    </div>
  )
}

export type SortableEditorChildrenIdsProps = {
  childrenIds: string[] | null | undefined
  onChange: (val: EditorChildrenChange) => void
  onReorder?: (oldIndex: number, newIndex: number, childrenIds: string[]) => void
}

export default function SortableEditorChildrenIds({ 
  childrenIds, 
  onChange, 
  onReorder
}: SortableEditorChildrenIdsProps) {
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    insertIndex?: number;
  }>({ isDragging: false });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Нужно сдвинуть мышь на 8px чтобы начался drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const appendBlock = (block: TEditorBlock) => {
    const blockId = generateId()
    return onChange({
      blockId,
      block,
      childrenIds: [...(childrenIds || []), blockId],
    })
  }

  const insertBlock = (block: TEditorBlock, index: number) => {
    const blockId = generateId()
    const newChildrenIds = [...(childrenIds || [])]
    newChildrenIds.splice(index, 0, blockId)
    return onChange({
      blockId,
      block,
      childrenIds: newChildrenIds,
    })
  }

  const handleDragStart = (event: DragStartEvent) => {
    setDragState({ isDragging: true });
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over || !childrenIds) {
      setDragState({ isDragging: true });
      return;
    }

    // Calculate insertion index based on drag position
    const overIndex = childrenIds.indexOf(over.id as string);
    if (overIndex !== -1) {
      setDragState({
        isDragging: true,
        insertIndex: overIndex
      });
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    setDragState({ isDragging: false });

    if (active.id !== over?.id && childrenIds) {
      const oldIndex = childrenIds.indexOf(active.id as string)
      const newIndex = childrenIds.indexOf(over?.id as string)
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newChildrenIds = arrayMove(childrenIds, oldIndex, newIndex)
        
        // Call onReorder callback if provided
        if (onReorder) {
          onReorder(oldIndex, newIndex, newChildrenIds)
        }
      }
    }
  }

  if (!childrenIds || childrenIds.length === 0) {
    return <AddBlockButton placeholder onSelect={appendBlock} />
  }

  return (
    <>
      {/* CSS for drop indicator animation */}
      <style>{`
        @keyframes dropIndicatorPulse {
          0%, 100% { 
            opacity: 0.6;
            transform: scaleY(1);
          }
          50% { 
            opacity: 1;
            transform: scaleY(1.5);
          }
        }
      `}</style>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={childrenIds} strategy={verticalListSortingStrategy}>
          <div style={{ position: 'relative' }}>
            {/* Drop indicator at the beginning */}
            <DropIndicator 
              isVisible={dragState.isDragging && dragState.insertIndex === 0}
            />
            
            {childrenIds.map((childId, i) => (
              <Fragment key={childId}>
                <AddBlockButton onSelect={(block) => insertBlock(block, i)} />
                <SortableEditorBlock id={childId} />
                
                {/* Drop indicator after each block */}
                <DropIndicator 
                  isVisible={dragState.isDragging && dragState.insertIndex === i + 1}
                />
              </Fragment>
            ))}
            
            <AddBlockButton onSelect={appendBlock} />
          </div>
        </SortableContext>
        
        <DragOverlay>
          {/* Drag overlay shows a semi-transparent version of the dragged block */}
          <div style={{ 
            opacity: 0.8, 
            transform: 'rotate(2deg)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            borderRadius: '4px',
            background: 'white'
          }}>
            {/* TODO: Add drag overlay content */}
          </div>
        </DragOverlay>
      </DndContext>
    </>
  )
} 