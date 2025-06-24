import React, { createContext, useContext, useState } from 'react'

import {
  Active,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'

import { TEditorBlock } from './core'

// Types for drag operations
export interface DragData {
  type: 'block' | 'new-block' | 'remove-block';
  blockId?: string;
  containerId?: string;
  blockType?: string;
  block?: TEditorBlock;
}

export interface DropData {
  type: 'container' | 'position';
  containerId: string;
  position?: number;
}

// Global drag state
interface GlobalDragState {
  isDragging: boolean;
  activeItem?: Active;
  dragData?: DragData;
}

// Context for managing global drag operations
interface GlobalDnDContextType {
  dragState: GlobalDragState;
  registerDropHandler: (containerId: string, handler: (dragData: DragData, position?: number) => void) => void;
  unregisterDropHandler: (containerId: string) => void;
}

const GlobalDnDContext = createContext<GlobalDnDContextType | null>(null);

export function useGlobalDnD() {
  const context = useContext(GlobalDnDContext);
  if (!context) {
    throw new Error('useGlobalDnD must be used within GlobalDnDProvider');
  }
  return context;
}

interface GlobalDnDProviderProps {
  children: React.ReactNode;
}

export default function GlobalDnDProvider({ children }: GlobalDnDProviderProps) {
  const [dragState, setDragState] = useState<GlobalDragState>({ isDragging: false });
  const [dropHandlers, setDropHandlers] = useState<Map<string, (dragData: DragData, position?: number) => void>>(new Map());

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const registerDropHandler = (containerId: string, handler: (dragData: DragData, position?: number) => void) => {
    setDropHandlers(prev => new Map(prev).set(containerId, handler));
  };

  const unregisterDropHandler = (containerId: string) => {
    setDropHandlers(prev => {
      const newMap = new Map(prev);
      newMap.delete(containerId);
      return newMap;
    });
  };

  // Custom collision detection to prevent multiple drop zones showing
  const customCollisionDetection: CollisionDetection = (args) => {
    // First try pointer intersection for precise targeting
    const pointerIntersections = pointerWithin(args);
    if (pointerIntersections.length > 0) {
      // Filter for drop zones first, then containers
      const dropZones = pointerIntersections.filter(({ id }: { id: string }) => 
        String(id).includes('-drop-')
      );
      if (dropZones.length > 0) {
        return [dropZones[0]]; // Return only the first drop zone
      }
      
      const containers = pointerIntersections.filter(({ id }: { id: string }) => 
        String(id).includes('-container')
      );
      if (containers.length > 0) {
        return [containers[0]]; // Return only the first container
      }
      
      return [pointerIntersections[0]];
    }

    // Fallback to rectangle intersection
    const rectIntersections = rectIntersection(args);
    if (rectIntersections.length > 0) {
      return [rectIntersections[0]];
    }

    // Final fallback to closest center
    return closestCenter(args);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const dragData = active.data.current as DragData;
    
    setDragState({
      isDragging: true,
      activeItem: active,
      dragData
    });
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Handle drag over for visual feedback
    // This can be used to show drop indicators
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    setDragState({ isDragging: false });

    if (!over || !dragState.dragData) {
      return;
    }

    const dropData = over.data.current as DropData;
    
    if (dropData && (dropData.type === 'container' || dropData.type === 'position')) {
      // Handle cross-container moves
      if (dragState.dragData.type === 'block' && 
          dragState.dragData.containerId && 
          dragState.dragData.containerId !== dropData.containerId) {
        
        console.log('Global DnD: Cross-container move detected', {
          from: dragState.dragData.containerId,
          to: dropData.containerId,
          blockId: dragState.dragData.blockId
        });
        
        // First, remove from source container
        const sourceHandler = dropHandlers.get(dragState.dragData.containerId);
        if (sourceHandler) {
          // Signal source to remove the block
          sourceHandler({
            type: 'remove-block',
            blockId: dragState.dragData.blockId,
            containerId: dragState.dragData.containerId
          } as DragData, -1); // -1 indicates removal
        }
        
        // Then, add to target container
        const targetHandler = dropHandlers.get(dropData.containerId);
        if (targetHandler) {
          targetHandler(dragState.dragData, dropData.position);
        }
      } else {
        // Same container or new block
        const handler = dropHandlers.get(dropData.containerId);
        if (handler) {
          handler(dragState.dragData, dropData.position);
        }
      }
    }
  };

  const contextValue: GlobalDnDContextType = {
    dragState,
    registerDropHandler,
    unregisterDropHandler
  };

  return (
    <GlobalDnDContext.Provider value={contextValue}>
      <DndContext
        sensors={sensors}
        collisionDetection={customCollisionDetection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {children}
        
        <DragOverlay>
          {dragState.isDragging && dragState.activeItem && (
            <div style={{ 
              opacity: 0.8, 
              transform: 'rotate(2deg)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              borderRadius: '4px',
              background: 'white',
              padding: '8px',
              minHeight: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {dragState.dragData?.blockType || 'Block'}
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </GlobalDnDContext.Provider>
  );
} 