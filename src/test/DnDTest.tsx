import { DnDProvider } from '@app/providers'
import { useDragState } from '@app/store'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDraggableBlock, useSortableBlock } from '@features/block-drag-drop'
import { DropZone, Text } from '@shared/ui'
import React, { useState } from 'react'

// Simple test block component for palette (draggable)
const TestBlock: React.FC<{ id: string; content: string }> = ({ id, content }) => {
  // Передаем content в hook, чтобы он был доступен в data
  const { attributes, listeners, setNodeRef, style, isDragging } = useDraggableBlock(id, 'block', content)

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        p-3 mb-2 bg-blue-100 border border-blue-300 rounded-lg
        cursor-grab active:cursor-grabbing
        ${isDragging ? 'opacity-60' : 'hover:bg-blue-200'}
        transition-all duration-200
      `}
    >
      <Text size="s" weight="semibold">{content}</Text>
      <Text size="xs" className="text-gray-600">Drag me to container</Text>
    </div>
  )
}

// Sortable block component for containers
const SortableTestBlock: React.FC<{ 
  id: string; 
  content: string;
  containerId: string;
}> = ({ id, content, containerId }) => {
  const { attributes, listeners, setNodeRef, style, isDragging } = useSortableBlock(id, 'block', containerId)

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        p-3 mb-2 bg-green-100 border border-green-300 rounded-lg
        cursor-grab active:cursor-grabbing
        ${isDragging ? 'opacity-50' : 'hover:bg-green-200'}
        transition-all duration-200
      `}
    >
      <Text size="s" weight="semibold">{content}</Text>
      <Text size="xs" className="text-gray-600">In {containerId}</Text>
    </div>
  )
}

// Test drop zone component
const TestDropZone: React.FC<{ 
  id: string; 
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
}> = ({ id, children, className = '', isHighlighted = false }) => {
  return (
    <DropZone
      id={id}
      containerType="container"
      placeholder="Drop blocks here"
      className={`
        ${className} 
        ${isHighlighted ? 'border-blue-500 bg-blue-50' : ''}
        transition-colors duration-200
      `}
    >
      {children}
    </DropZone>
  )
}

// Drag state monitor component
const DragStateMonitor: React.FC = () => {
  const dragState = useDragState()

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6">
      <Text size="s" weight="semibold" className="mb-2">Drag State Monitor</Text>
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <strong>Is Dragging:</strong> {dragState.isDragging ? '✅' : '❌'}
        </div>
        <div>
          <strong>Dragged Block:</strong> {dragState.draggedBlock?.type || 'none'}
        </div>
        <div>
          <strong>Over Container:</strong> {dragState.dragOverContainer || 'none'}
        </div>
        <div>
          <strong>Valid Drop:</strong> {dragState.isValidDrop ? '✅' : '❌'}
        </div>
      </div>
    </div>
  )
}

// Drop indicator component for showing insertion position
const DropIndicator: React.FC<{ 
  isVisible: boolean; 
  className?: string 
}> = ({ isVisible, className = '' }) => {
  // Debug logging
  if (isVisible) {
    console.log('💫 DropIndicator is VISIBLE');
  }
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={className}
      style={{
        position: 'relative',
        height: '32px',
        width: '100%',
        margin: '8px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        // Временный яркий фон для отладки
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        border: '2px solid red',
        borderRadius: '4px'
      }}
    >
      {/* БОЛЬШОЙ ЗАМЕТНЫЙ ТЕКСТ */}
      <div style={{
        position: 'absolute',
        backgroundColor: '#ff0000',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold',
        zIndex: 1002
      }}>
        ⬇️ DROP HERE ⬇️
      </div>
      
      {/* Main indicator line */}
      <div 
        style={{
          position: 'absolute',
          width: '100%',
          height: '4px',
          backgroundColor: '#3b82f6',
          borderRadius: '9999px',
          boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)',
          animation: 'dropIndicatorPulse 1.5s ease-in-out infinite'
        }}
      />
      
      {/* Center dot */}
      <div 
        style={{
          position: 'relative',
          width: '16px',
          height: '16px',
          backgroundColor: '#3b82f6',
          borderRadius: '50%',
          border: '2px solid white',
          boxShadow: '0 0 15px rgba(59, 130, 246, 0.8)',
          animation: 'dropIndicatorBounce 2s ease-in-out infinite',
          zIndex: 1001
        }}
      />
      
      {/* Side arrows */}
      <div 
        style={{
          position: 'absolute',
          left: '10px',
          width: '0',
          height: '0',
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          borderRight: '12px solid #3b82f6',
          animation: 'dropIndicatorPulse 1.5s ease-in-out infinite'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          right: '10px',
          width: '0',
          height: '0',
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          borderLeft: '12px solid #3b82f6',
          animation: 'dropIndicatorPulse 1.5s ease-in-out infinite'
        }}
      />
    </div>
  );
};

// Main test function
export function DnDTest() {
  // Состояние для блоков в контейнерах
  const [containerBlocks, setContainerBlocks] = useState<{
    container1: Array<{ id: string; content: string }>;
    container2: Array<{ id: string; content: string }>;
  }>({
    container1: [],
    container2: []
  });

  // Состояние для drag over визуализации
  const [dragOverState, setDragOverState] = useState<{
    containerId?: string;
    insertIndex?: number;
    isDragging: boolean;
  }>({
    isDragging: false
  });

  // Обработчик drop событий
  const handleDrop = (event: DragEndEvent) => {
    console.log('🎯 Drop event:', event);
    
    const { active, over } = event;
    
    if (!over) {
      console.log('❌ No drop target');
      return;
    }

    const activeData = active.data.current;
    const overData = over.data.current;
    
    // Определяем целевой контейнер и позицию
    let targetContainerId: string;
    let insertIndex: number | undefined;
    
    if (over.id.toString().startsWith('container')) {
      if (over.id.toString().endsWith('-end')) {
        // Drop на end зону - добавляем в конец
        targetContainerId = over.id.toString().replace('-end', '');
        insertIndex = undefined; // В конец
      } else {
        // Drop на сам контейнер - добавляем в конец
        targetContainerId = over.id as string;
        insertIndex = undefined; // В конец
      }
    } else if (overData?.sortable?.containerId) {
      targetContainerId = overData.sortable.containerId;
      const targetBlocks = containerBlocks[targetContainerId as keyof typeof containerBlocks];
      insertIndex = targetBlocks.findIndex(block => block.id === over.id);
    } else {
      console.log('❌ Cannot determine target container');
      return;
    }

    console.log(`🎯 Target container: ${targetContainerId}, insert at index: ${insertIndex}`);

    // Определяем тип операции
    if (activeData?.draggable) {
      // Перетаскивание из палитры в контейнер
      const draggedBlockContent = activeData.content || `Block ${active.id}`;
      const newBlock = {
        id: `${active.id}-${Date.now()}`,
        content: draggedBlockContent
      };
      
      console.log(`✅ Adding block from palette to ${targetContainerId} at index ${insertIndex}`);
      setContainerBlocks(prev => {
        const targetBlocks = prev[targetContainerId as keyof typeof prev];
        const newBlocks = [...targetBlocks];
        
        if (insertIndex !== undefined) {
          // Вставляем в конкретную позицию
          newBlocks.splice(insertIndex, 0, newBlock);
        } else {
          // Добавляем в конец
          newBlocks.push(newBlock);
        }
        
        return {
          ...prev,
          [targetContainerId]: newBlocks
        };
      });
    } else if (activeData?.sortable) {
      // Cross-container drag или drop из контейнера в контейнер
      const sourceContainerId = activeData.sortable.containerId;
      
      if (sourceContainerId !== targetContainerId) {
        console.log(`🔄 Moving block from ${sourceContainerId} to ${targetContainerId} at index ${insertIndex}`);
        
        setContainerBlocks(prev => {
          const sourceBlocks = prev[sourceContainerId as keyof typeof prev];
          const targetBlocks = prev[targetContainerId as keyof typeof prev];
          
          // Находим перемещаемый блок
          const blockToMove = sourceBlocks.find(block => block.id === active.id);
          if (!blockToMove) {
            console.log('❌ Block not found in source container');
            return prev;
          }
          
          // Создаем новые массивы
          const newSourceBlocks = sourceBlocks.filter(block => block.id !== active.id);
          const newTargetBlocks = [...targetBlocks];
          
          if (insertIndex !== undefined) {
            // Вставляем в конкретную позицию
            newTargetBlocks.splice(insertIndex, 0, blockToMove);
          } else {
            // Добавляем в конец
            newTargetBlocks.push(blockToMove);
          }
          
          console.log('✅ Successfully moved block between containers with position');
          return {
            ...prev,
            [sourceContainerId]: newSourceBlocks,
            [targetContainerId]: newTargetBlocks
          };
        });
      } else {
        console.log('🔄 Same container - will be handled by sort');
      }
    }
  };

  // Обработчик sort событий
  const handleSort = (event: DragEndEvent) => {
    console.log('🔄 Sort event:', event);
    
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      return;
    }

    // Правильное извлечение containerId из sortable данных
    const containerId = active.data.current?.sortable?.containerId;
    if (!containerId) {
      console.log('❌ No containerId found in sortable data');
      return;
    }

    console.log(`🔄 Sorting within container: ${containerId}`);

    setContainerBlocks(prev => {
      const containerItems = prev[containerId as keyof typeof prev];
      const oldIndex = containerItems.findIndex(item => item.id === active.id);
      const newIndex = containerItems.findIndex(item => item.id === over.id);
      
      if (oldIndex === -1 || newIndex === -1) {
        console.log('❌ Invalid indices for sorting');
        return prev;
      }

      console.log(`✅ Moving item from index ${oldIndex} to ${newIndex}`);
      const newItems = arrayMove(containerItems, oldIndex, newIndex);
      
      return {
        ...prev,
        [containerId]: newItems
      };
    });
  };

  // Обработчик drag over событий для визуальной обратной связи
  const handleDragOver = (event: any) => {
    const { active, over } = event;
    
    if (!over || !active) {
      setDragOverState({ isDragging: true });
      return;
    }

    const activeData = active.data.current;
    const overData = over.data.current;
    
    // Определяем целевой контейнер и позицию для визуализации
    let targetContainerId: string;
    let insertIndex: number | undefined;
    
    if (over.id.toString().startsWith('container')) {
      if (over.id.toString().endsWith('-end')) {
        // Drop на end зону - добавляем в конец
        targetContainerId = over.id.toString().replace('-end', '');
        insertIndex = undefined; // В конец
      } else {
        // Drop на сам контейнер - добавляем в конец
        targetContainerId = over.id as string;
        insertIndex = undefined; // В конец
      }
    } else if (overData?.sortable?.containerId) {
      targetContainerId = overData.sortable.containerId;
      const targetBlocks = containerBlocks[targetContainerId as keyof typeof containerBlocks];
      insertIndex = targetBlocks.findIndex(block => block.id === over.id);
    } else {
      setDragOverState({ isDragging: true });
      return;
    }

    // Обновляем состояние только для cross-container операций или palette drops
    if (activeData?.draggable || (activeData?.sortable && activeData.sortable.containerId !== targetContainerId)) {
      console.log(`🎯 Setting drag over state: container=${targetContainerId}, index=${insertIndex}`);
      setDragOverState({
        isDragging: true,
        containerId: targetContainerId,
        insertIndex
      });
    } else {
      console.log('🔄 Same container drag - no indicators');
      setDragOverState({ isDragging: true });
    }
  };

  // Обработчик drag start
  const handleDragStart = () => {
    setDragOverState({ isDragging: true });
  };

  // Обработчик drag end
  const handleDragEndWrapper = (event: any) => {
    handleDrop(event);
    setDragOverState({ isDragging: false });
  };

  // Обработчик sort end
  const handleSortWrapper = (event: any) => {
    handleSort(event);
    setDragOverState({ isDragging: false });
  };

  return (
    <DnDProvider 
      onDrop={handleDragEndWrapper} 
      onSort={handleSortWrapper}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
    >
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Drag & Drop Test Suite</h1>
        
        <DragStateMonitor />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Block Palette */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Block Palette</h2>
            <div className="space-y-2">
              <TestBlock id="text-block" content="Text Block" />
              <TestBlock id="image-block" content="Image Block" />
              <TestBlock id="button-block" content="Button Block" />
              <TestBlock id="spacer-block" content="Spacer Block" />
            </div>
          </div>
          
          {/* Container 1 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Container 1</h2>
            <TestDropZone 
              id="container1"
              className="min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg p-4"
              isHighlighted={dragOverState.isDragging && dragOverState.containerId === 'container1'}
            >
              {containerBlocks.container1.length === 0 ? (
                <div className="text-gray-500 text-center py-8">
                  Drop blocks here
                  {/* Drop indicator for empty container */}
                  <DropIndicator 
                    isVisible={dragOverState.containerId === 'container1'}
                    className="mt-4"
                  />
                </div>
              ) : (
                <SortableContext items={containerBlocks.container1.map(b => b.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">
                    {/* Drop indicator at the beginning */}
                    <DropIndicator 
                      isVisible={dragOverState.containerId === 'container1' && dragOverState.insertIndex === 0}
                    />
                    
                    {containerBlocks.container1.map((block, index) => (
                      <React.Fragment key={block.id}>
                        <SortableTestBlock
                          id={block.id}
                          content={block.content}
                          containerId="container1"
                        />
                        {/* Drop indicator after each block */}
                        <DropIndicator 
                          isVisible={dragOverState.containerId === 'container1' && dragOverState.insertIndex === index + 1}
                        />
                      </React.Fragment>
                    ))}
                    
                    {/* Final drop indicator at the very end */}
                    <DropIndicator 
                      isVisible={dragOverState.containerId === 'container1' && (
                        dragOverState.insertIndex === undefined || 
                        dragOverState.insertIndex === containerBlocks.container1.length
                      )}
                    />
                    
                    {/* Invisible drop zone at the end */}
                    <div style={{ 
                      height: '20px', 
                      width: '100%',
                      backgroundColor: 'rgba(0,255,0,0.1)' // Временно для отладки
                    }}>
                      <TestDropZone
                        id="container1-end"
                        className=""
                      >
                        <div style={{ height: '100%', width: '100%' }}>
                          {/* Пустая зона для drop в конец */}
                        </div>
                      </TestDropZone>
                    </div>
                  </div>
                </SortableContext>
              )}
            </TestDropZone>
          </div>

          {/* Container 2 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Container 2</h2>
            <TestDropZone 
              id="container2"
              className="min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg p-4"
              isHighlighted={dragOverState.isDragging && dragOverState.containerId === 'container2'}
            >
              {containerBlocks.container2.length === 0 ? (
                <div className="text-gray-500 text-center py-8">
                  Drop blocks here
                  {/* Drop indicator for empty container */}
                  <DropIndicator 
                    isVisible={dragOverState.containerId === 'container2'}
                    className="mt-4"
                  />
                </div>
              ) : (
                <SortableContext items={containerBlocks.container2.map(b => b.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">
                    {/* Drop indicator at the beginning */}
                    <DropIndicator 
                      isVisible={dragOverState.containerId === 'container2' && dragOverState.insertIndex === 0}
                    />
                    
                    {containerBlocks.container2.map((block, index) => (
                      <React.Fragment key={block.id}>
                        <SortableTestBlock
                          id={block.id}
                          content={block.content}
                          containerId="container2"
                        />
                        {/* Drop indicator after each block */}
                        <DropIndicator 
                          isVisible={dragOverState.containerId === 'container2' && dragOverState.insertIndex === index + 1}
                        />
                      </React.Fragment>
                    ))}
                    
                    {/* Final drop indicator at the very end */}
                    <DropIndicator 
                      isVisible={dragOverState.containerId === 'container2' && (
                        dragOverState.insertIndex === undefined || 
                        dragOverState.insertIndex === containerBlocks.container2.length
                      )}
                    />
                    
                    {/* Invisible drop zone at the end */}
                    <div style={{ 
                      height: '20px', 
                      width: '100%',
                      backgroundColor: 'rgba(0,255,0,0.1)' // Временно для отладки
                    }}>
                      <TestDropZone
                        id="container2-end"
                        className=""
                      >
                        <div style={{ height: '100%', width: '100%' }}>
                          {/* Пустая зона для drop в конец */}
                        </div>
                      </TestDropZone>
                    </div>
                  </div>
                </SortableContext>
              )}
            </TestDropZone>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Debug State</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium">Container 1 ({containerBlocks.container1.length} blocks)</h4>
              <pre className="text-xs bg-gray-100 p-2 rounded mt-1">
                {JSON.stringify(containerBlocks.container1, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="font-medium">Container 2 ({containerBlocks.container2.length} blocks)</h4>
              <pre className="text-xs bg-gray-100 p-2 rounded mt-1">
                {JSON.stringify(containerBlocks.container2, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="font-medium">Drag Over State</h4>
              <pre className="text-xs bg-gray-100 p-2 rounded mt-1">
                {JSON.stringify(dragOverState, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </DnDProvider>
  );
}

// CSS for enhanced drop indicators
const dropIndicatorStyles = `
  @keyframes dropIndicatorPulse {
    0%, 100% { 
      opacity: 0.4;
      transform: scaleY(1);
    }
    50% { 
      opacity: 1;
      transform: scaleY(1.2);
    }
  }
  
  @keyframes dropIndicatorGlow {
    0%, 100% { 
      box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
    }
    50% { 
      box-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
    }
  }
  
  @keyframes dropIndicatorBounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-4px);
    }
    60% {
      transform: translateY(-2px);
    }
  }
  
  .drop-indicator-line {
    animation: dropIndicatorPulse 1.5s ease-in-out infinite;
  }
  
  .drop-indicator-dot {
    animation: dropIndicatorBounce 2s ease-in-out infinite,
               dropIndicatorGlow 1.5s ease-in-out infinite;
  }
  
  .drop-indicator-glow {
    animation: dropIndicatorPulse 2s ease-in-out infinite;
  }
`

// Inject drop indicator styles
if (typeof document !== 'undefined') {
  const existingStyle = document.querySelector('#drop-indicator-styles')
  if (!existingStyle) {
    const styleElement = document.createElement('style')
    styleElement.id = 'drop-indicator-styles'
    styleElement.textContent = dropIndicatorStyles
    document.head.appendChild(styleElement)
  }
} 