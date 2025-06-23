# System Patterns Analysis

## Current Architecture Patterns

### 1. Store Pattern (Centralized State)
**Location**: `src/documents/editor/EditorContext.tsx`
**Implementation**: Zustand with subscribeWithSelector middleware
**Usage**: Global state for document, selection, UI panels
**Strengths**: Reactive updates, clean separation, type-safe
**DnD Integration**: Perfect foundation for drag state management

### 2. Registry/Dictionary Pattern
**Location**: `src/documents/editor/core.tsx`
**Implementation**: `EDITOR_DICTIONARY` mapping block types to schemas/components
**Usage**: Dynamic block system with validation
**Strengths**: Extensible, type-safe, centralized
**DnD Integration**: Enables drag-and-drop of any registered block type

### 3. Schema Validation Pattern
**Location**: Throughout codebase with Zod schemas
**Implementation**: Runtime validation with TypeScript inference
**Usage**: Data integrity for blocks and configurations
**Strengths**: Type safety, runtime validation, error handling
**DnD Integration**: Validates dropped block data automatically

### 4. Component Composition Pattern
**Location**: `src/App/`, `src/documents/blocks/`
**Implementation**: React composition with props and context
**Usage**: Building complex UI from simple components
**Strengths**: Reusable, testable, maintainable
**DnD Integration**: Composable drag/drop wrappers and containers

### 5. Wrapper Pattern
**Location**: `src/documents/blocks/helpers/block-wrappers/EditorBlockWrapper.tsx`
**Implementation**: HOC-style wrapper for block selection/hover
**Usage**: Consistent interaction behavior across all blocks
**Strengths**: Centralized interaction logic, visual feedback
**DnD Integration**: Natural place to add drag handles and drop zones

### 6. Service/Utility Pattern
**Location**: `src/getConfiguration/`, validation utilities
**Implementation**: Pure functions for data operations
**Usage**: Loading, parsing, validating external data
**Strengths**: Testable, reusable, side-effect free
**DnD Integration**: Handle drag data transformations and validations

## Drag & Drop Integration Strategy

### Pattern Alignment
1. **Store Pattern** → Drag state management (active drag, drop zones)
2. **Registry Pattern** → Draggable block type resolution
3. **Validation Pattern** → Drop validation and data integrity
4. **Wrapper Pattern** → Drag handles and drop zone indicators
5. **Composition Pattern** → DndContext and provider composition

### New Patterns to Introduce

#### 1. Drag Provider Pattern
```typescript
// DndContext wrapping application
<DndContext sensors={sensors} collisionDetection={closestCenter}>
  <App />
</DndContext>
```

#### 2. Draggable/Droppable Wrapper Pattern
```typescript
// Enhanced block wrapper with drag capabilities
<DraggableBlockWrapper blockId={blockId} blockType={blockType}>
  <EditorBlockWrapper>
    <BlockComponent />
  </EditorBlockWrapper>
</DraggableBlockWrapper>
```

#### 3. Sortable Container Pattern
```typescript
// Container blocks with sortable children
<SortableContext items={childrenIds} strategy={verticalListSortingStrategy}>
  {children.map(child => <SortableBlockItem key={child.id} {...child} />)}
</SortableContext>
```

## Performance Considerations

### Current Strengths
- Zustand's selective subscriptions minimize re-renders
- Component composition reduces unnecessary updates
- Schema validation prevents invalid states

### DnD Performance Strategy
- Use @dnd-kit's transform approach (no DOM mutations during drag)
- Leverage existing selective subscriptions for drag state
- Maintain current validation patterns for dropped data
- Preserve component composition for optimal re-rendering
