# Style Guide: Drag & Drop Implementation

## Code Style & Patterns

### 1. Component Naming Conventions
```typescript
// Drag-and-drop specific components
DraggableBlockWrapper    // Wrapper for draggable blocks
DroppableContainer      // Container accepting drops
DragPreview            // Drag overlay component
DropZoneIndicator      // Visual drop zone feedback
```

### 2. Hook Naming Patterns
```typescript
// Custom hooks for drag-and-drop
useDragState()         // Drag state management
useDropValidation()    // Drop validation logic
useDragPreview()       // Drag preview handling
useBlockDrag()         // Block-specific drag logic
```

### 3. Type Definitions
```typescript
// Drag-and-drop type conventions
type DragItem = {
  id: string;
  type: string;
  data: any;
};

type DropResult = {
  success: boolean;
  position?: number;
  containerId?: string;
};
```

### 4. State Management Patterns
```typescript
// Zustand store extensions
interface DragState {
  activeDragItem: DragItem | null;
  dragOverContainer: string | null;
  isDragging: boolean;
  dropZones: string[];
}
```

## Visual Design Guidelines

### 1. Drag Feedback
- **Drag Handle**: Subtle grip icon, visible on hover
- **Drag Preview**: Semi-transparent block representation
- **Cursor States**: Grabbing, dragging, not-allowed
- **Active State**: Highlighted border and shadow

### 2. Drop Zone Indicators
- **Valid Drop**: Blue dashed border with subtle background
- **Invalid Drop**: Red border with error indication
- **Active Drop**: Solid blue border with animation
- **Insertion Point**: Thin blue line indicating drop position

### 3. Animation & Transitions
```css
/* Smooth transitions for drag operations */
.drag-transition {
  transition: transform 200ms ease;
}

.drop-zone-active {
  border: 2px dashed #1976d2;
  background-color: rgba(25, 118, 210, 0.1);
  transition: all 150ms ease;
}
```

### 4. Accessibility Considerations
- **Keyboard Navigation**: Tab order preserved during drag
- **Screen Reader**: Descriptive aria-labels for drag actions
- **Focus Management**: Clear focus indicators
- **Announcements**: Live region updates for drag status

## Implementation Standards

### 1. Performance Guidelines
- Use transform-based positioning (no DOM mutations during drag)
- Implement efficient collision detection
- Minimize re-renders with selective subscriptions
- Lazy load drag-related components

### 2. Error Handling
```typescript
// Consistent error handling for drag operations
const handleDragError = (error: DragError) => {
  console.error('Drag operation failed:', error);
  // Reset drag state
  resetDragState();
  // Show user feedback
  showErrorMessage(error.message);
};
```

### 3. Testing Patterns
```typescript
// Test utilities for drag-and-drop
const mockDragEvent = (type: string, data: any) => ({
  type,
  dataTransfer: { getData: () => JSON.stringify(data) }
});

// Component testing with drag simulation
const simulateDrag = (source: Element, target: Element) => {
  // Drag simulation logic
};
```

### 4. Documentation Standards
- Document all drag-and-drop specific props
- Include usage examples for custom hooks
- Provide accessibility guidelines
- Document performance considerations

## Integration Guidelines

### 1. Existing Component Enhancement
- Extend existing components, don't replace
- Maintain backward compatibility
- Preserve existing prop interfaces
- Add drag capabilities as optional features

### 2. State Management Integration
- Extend Zustand store, don't replace
- Maintain existing state structure
- Add drag state as separate slice
- Preserve existing subscriptions

### 3. Validation Integration
- Use existing Zod schemas for validation
- Extend schemas for drag-specific data
- Maintain type safety throughout
- Validate drop operations consistently

## Quality Assurance

### 1. Code Quality Checks
- ESLint rules for drag-and-drop code
- TypeScript strict mode compliance
- Consistent error handling patterns
- Performance monitoring integration

### 2. User Experience Standards
- Intuitive drag-and-drop interactions
- Clear visual feedback at all stages
- Responsive design for all screen sizes
- Accessibility compliance (WCAG 2.1)

### 3. Testing Requirements
- Unit tests for all drag-and-drop components
- Integration tests for drag workflows
- Cross-browser compatibility testing
- Performance benchmarking
