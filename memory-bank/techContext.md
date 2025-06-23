# Technical Context: Email Builder Architecture

## Current Technology Stack

### Core Dependencies
- **React**: 18.2.0 - UI framework
- **TypeScript**: 5.2.2 - Type safety
- **Vite**: 5.4.18 - Build tool and dev server
- **Material-UI**: 5.15.10 - UI component library
- **Zustand**: 4.5.1 - State management
- **Zod**: 3.22.4 - Schema validation

### Block System Dependencies
- **@usewaypoint/document-core**: 0.0.6 - Core document functionality
- **@usewaypoint/email-builder**: 0.0.8 - Email rendering engine
- **@usewaypoint/block-***: Various versions - Individual block components

### Development Tools
- **ESLint**: Code quality
- **Prettier**: Code formatting
- **Terser**: Minification
- **TypeScript ESLint**: TS-specific linting

## Architecture Patterns

### 1. Centralized State Management (Zustand)
```typescript
// EditorContext.tsx - Single source of truth
type TValue = {
  document: TEditorConfiguration;
  selectedBlockId: string | null;
  selectedSidebarTab: 'block-configuration' | 'styles';
  // ... other state
};
```

### 2. Block Registry Pattern
```typescript
// core.tsx - Extensible block system
const EDITOR_DICTIONARY = buildBlockConfigurationDictionary({
  Avatar: { schema: AvatarPropsSchema, Component: AvatarComponent },
  Button: { schema: ButtonPropsSchema, Component: ButtonComponent },
  // ... other blocks
});
```

### 3. Schema Validation (Zod)
```typescript
// Strict type checking and validation
export const EditorBlockSchema = buildBlockConfigurationSchema(EDITOR_DICTIONARY);
export type TEditorConfiguration = Record<string, TEditorBlock>;
```

### 4. Component Composition
- **Wrapper Pattern**: EditorBlockWrapper for selection/hover states
- **Service Layer**: getConfiguration for data loading/parsing
- **Panel System**: Modular UI panels for different functionalities

## Current Interaction Model
- **Selection-based**: Click to select blocks
- **Menu-driven**: Add blocks through popup menus
- **Panel-configured**: Modify properties in sidebar panels
- **Static positioning**: Blocks added in predetermined positions

## Target Integration: @dnd-kit
- **Lightweight**: ~10kb minified, zero dependencies
- **React-native**: Built for React with hooks
- **Accessible**: Keyboard support and screen reader friendly
- **Performant**: Avoids DOM mutations during drag
- **Extensible**: Custom sensors, collision detection, modifiers
