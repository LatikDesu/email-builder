import { DnDProvider } from '@app/providers'
import { useDraggableBlock } from '@features/block-drag-drop'
import { DragHandle, DropZone, Layout, Text } from '@shared/ui'
import React from 'react'

// Simple test draggable block component
const SimpleTestBlock: React.FC<{ id: string; type: string; children: React.ReactNode }> = ({ 
  id, 
  type, 
  children 
}) => {
  const { attributes, listeners, setNodeRef, style, isDragging } = useDraggableBlock(id, type)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        test-block p-4 mb-2 bg-white border-2 border-gray-200 rounded-lg
        flex items-center justify-between
        ${isDragging ? 'opacity-50' : 'hover:border-blue-300'}
        transition-all duration-200
      `}
    >
      <div className="flex-1">
        {children}
      </div>
      <DragHandle 
        listeners={listeners}
        attributes={attributes}
        size="m"
      />
    </div>
  )
}

// Simple test container component
const SimpleTestContainer: React.FC<{ 
  id: string
  title: string
  children?: React.ReactNode 
}> = ({ id, title, children }) => {
  return (
    <div className="test-container bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
      <Text size="s" weight="semibold" className="mb-3 text-gray-600">
        {title}
      </Text>
      <DropZone
        id={id}
        containerType="container"
        placeholder={`Drop blocks in ${title}`}
        className="min-h-[120px]"
      >
        {children}
      </DropZone>
    </div>
  )
}

// Simple test content without Zustand dependency
const SimpleDnDTestContent: React.FC = () => {
  return (
    <div className="dnd-test-page p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <Text size="xl" weight="bold" className="mb-2">
          🧪 Simple Drag & Drop Test
        </Text>
        <Text size="s" className="text-gray-600">
          Basic DnD functionality test without store dependencies
        </Text>
      </div>

      <Layout direction="row" className="gap-6">
        {/* Source blocks */}
        <div className="w-1/3">
          <Text size="m" weight="semibold" className="mb-4">
            📦 Draggable Blocks
          </Text>
          
          <div className="space-y-2">
            <SimpleTestBlock id="simple-text-1" type="text">
              <div>
                <Text size="s" weight="semibold">Text Block</Text>
                <Text size="xs" className="text-gray-500">Drag me!</Text>
              </div>
            </SimpleTestBlock>

            <SimpleTestBlock id="simple-heading-1" type="heading">
              <div>
                <Text size="s" weight="semibold">Heading Block</Text>
                <Text size="xs" className="text-gray-500">I'm a heading</Text>
              </div>
            </SimpleTestBlock>

            <SimpleTestBlock id="simple-button-1" type="button">
              <div>
                <Text size="s" weight="semibold">Button Block</Text>
                <Text size="xs" className="text-gray-500">Click to drag</Text>
              </div>
            </SimpleTestBlock>
          </div>
        </div>

        {/* Drop containers */}
        <div className="w-2/3">
          <Text size="m" weight="semibold" className="mb-4">
            🎯 Drop Zones
          </Text>
          
          <Layout direction="row" className="gap-4">
            <div className="flex-1">
              <SimpleTestContainer id="simple-container-1" title="Email Body" />
            </div>
            
            <div className="flex-1">
              <SimpleTestContainer id="simple-container-2" title="Sidebar" />
            </div>
          </Layout>

          <div className="mt-4">
            <SimpleTestContainer id="simple-container-3" title="Footer Section" />
          </div>
        </div>
      </Layout>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <Text size="s" weight="semibold" className="mb-2">
          📋 Simple Test Instructions:
        </Text>
        <div className="text-xs space-y-1 text-gray-700">
          <div>1. Try dragging blocks from the left panel to the drop zones</div>
          <div>2. Check console for drag events</div>
          <div>3. Notice visual feedback (borders, colors, hover effects)</div>
        </div>
      </div>
    </div>
  )
}

// Simple wrapped test component with DnD provider
export const SimpleDnDTest: React.FC = () => {
  return (
    <DnDProvider>
      <SimpleDnDTestContent />
    </DnDProvider>
  )
} 