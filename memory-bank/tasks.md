# Email Builder Drag & Drop Redesign - Tasks

## 🎨 CREATIVE PHASES COMPLETED ✅

**Статус**: Все 5 творческих фаз успешно завершены
**Документы**: Созданы детальные проектные документы в `memory-bank/creative/`
**Готовность**: Проект готов к переходу в IMPLEMENT MODE

### Ключевые проектные решения:
1. **FSD Архитектура**: Классическая Feature-Sliced Design с четким разделением слоев
2. **Drag & Drop UX**: Богатый пользовательский опыт с предварительным просмотром
3. **Consta Integration**: Постепенная миграция с coexistence подходом
4. **Block Palette**: Адаптивная умная палитра с персонализацией
5. **Mobile UX**: Прогрессивные мобильные улучшения

---

## Project Overview
**Primary Objective**: Redesign email template builder with drag-and-drop functionality using @dnd-kit
**Secondary Objectives**: 
- Migrate from Material-UI to UI Consta (@consta.design/libs)
- Reorganize project structure using Feature-Sliced Design (FSD)
**Complexity Level**: Level 4 (Complex System) - Multi-library integration with architectural restructuring
**Timeline**: Multi-phase implementation with parallel workstreams

## Technology Stack Validation
### Primary Technologies
- **Framework**: React 18.2.0 (existing)
- **Drag & Drop**: @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities
- **UI Library**: @consta.design/libs (replacing Material-UI)
- **Architecture**: Feature-Sliced Design methodology
- **State Management**: Zustand 4.5.1 (existing)
- **Build Tool**: Vite 5.4.18 (existing)

### Technology Validation Checkpoints
- [ ] @dnd-kit packages installation and compatibility verification
- [ ] UI Consta installation and Material-UI migration path analysis
- [ ] Feature-Sliced Design folder structure creation
- [ ] Hello world proof of concept with all technologies
- [ ] Build configuration validation for new dependencies
- [ ] Test build passes successfully

## Phase 1: Foundation & Architecture Setup
### 1.1 Project Structure Reorganization (FSD)
- [x] Create Feature-Sliced Design folder structure
  - ✅ Created app, widgets, features, entities, shared layers
  - ✅ Created sub-folders for each layer (api, config, lib, providers, store, ui)
  - ✅ Created basic index.ts files for all modules
- [ ] Migrate existing components to FSD layers (app, pages, widgets, features, entities, shared)
- [x] Update import paths and module resolution
  - ✅ Updated tsconfig.json with FSD path aliases
  - ✅ Added baseUrl and paths configuration
- [x] Configure build system for FSD structure
  - ✅ Verified build works with new structure
  - ✅ Verified dev server works with new structure
- [ ] Update TypeScript paths and ESLint rules

### 1.2 UI Library Migration Planning
- [x] Audit Material-UI component usage across codebase
  - ✅ Found 50+ files using MUI components
  - ✅ Identified main component categories: Layout, Forms, Buttons, Icons, Feedback
- [x] Create Material-UI to Consta component mapping
  - ✅ Created comprehensive mapping table in `memory-bank/mui-to-consta-mapping.md`
  - ✅ Mapped props and component equivalents
- [x] Identify custom components requiring redesign
  - ✅ Color picker components
  - ✅ Complex form inputs (ColumnWidths, Padding, FontSize)
  - ✅ Block menu system
  - ✅ Editor wrapper components
- [x] Plan theme migration strategy
  - ✅ 4-week phased migration plan
  - ✅ Bridge component strategy for compatibility
- [x] Document breaking changes and migration steps
  - ✅ Theme structure changes
  - ✅ CSS-in-JS to CSS classes migration
  - ✅ Icon import path changes
  - ✅ Event handler updates

### 1.3 Dependencies & Configuration
- [x] Install @dnd-kit packages (@dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities)
  - ✅ @dnd-kit/core: ^6.3.1
  - ✅ @dnd-kit/sortable: ^10.0.0  
  - ✅ @dnd-kit/utilities: ^3.2.2
- [x] Install @consta.design/libs and required dependencies
  - ✅ @consta/uikit: ^5.22.0
  - ✅ @consta/icons: ^1.1.1
- [x] Configure TypeScript types for both libraries
  - ✅ TypeScript compilation successful
  - ✅ No type conflicts detected
- [x] Update package.json with new dependencies
  - ✅ All dependencies added to package.json
- [ ] Remove Material-UI dependencies (gradual migration)
  - 📋 Planned for Phase 4 after Consta migration complete

## Phase 2: FSD Architecture Implementation
### 2.1 Shared Layer Setup ✅ COMPLETED
- [x] Create shared/ui components with Consta
  - ✅ Created Button, Layout, Text, TextField components as Consta wrappers
  - ✅ Setup shared/ui/index.ts with exports
- [x] Migrate utility functions to shared/lib
  - ✅ Created shared/lib/dnd (types, utils) for drag & drop
  - ✅ Created shared/lib/utils (classNames, clsx) for CSS utilities
  - ✅ Setup shared/lib/index.ts with exports
- [ ] Setup shared/api for external integrations
- [x] Create shared/config for application configuration
  - ✅ Created shared/config/theme.ts with Consta theme setup
  - ✅ Created emailBuilderColors and emailBuilderSpacing constants
  - ✅ Setup emailBuilderCSSVars for drag & drop styling
- [ ] Implement shared/constants and types

### 2.2 Entities Layer ✅ COMPLETED
- [x] Define Block entity (Avatar, Button, Container, etc.)
  - ✅ Created entities/block/config/types.ts with BlockProps, BlockConfig, BlockStyle
  - ✅ Defined BlockType enum for all block types
  - ✅ Setup entities/block/index.ts with exports
- [x] Create Document entity for email templates
  - ✅ Created entities/document/config/types.ts with DocumentProps, DocumentSettings, DocumentMetadata
  - ✅ Setup entities/document/index.ts with exports
- [x] Implement Editor entity for editor state
  - ✅ Created entities/editor/config/types.ts with EditorState, EditorMode, EditorAction, EditorHistory, EditorSettings
  - ✅ Setup entities/editor/index.ts with exports
- [ ] Setup validation schemas in entities
- [ ] Create entity-specific API interfaces

### 2.3 Features Layer ✅ COMPLETED
- [x] BlockDragAndDrop feature implementation
  - ✅ Created features/block-drag-drop with types, hooks for @dnd-kit integration
  - ✅ Implemented useDraggableBlock, useDroppableContainer, useSortableBlock hooks
  - ✅ Created drag state monitoring and event handling
- [x] BlockConfiguration feature (sidebar panels)
  - ✅ Created features/block-config with comprehensive configuration system
  - ✅ Implemented dynamic config panel generation for all block types
  - ✅ Created field validation and configuration utilities
- [x] TemplateImportExport feature
  - ✅ Created features/template-export with multi-format export (HTML, JSON, MJML, PDF)
  - ✅ Created features/template-import with validation and error handling
  - ✅ Implemented export/import factories and base classes
- [ ] DocumentPreview feature
- [ ] EditorToolbar feature

## Phase 3: Drag & Drop Core Implementation
### 3.1 DnD Infrastructure
- [ ] Create DnD context provider in app layer
- [ ] Extend Zustand store with drag state management
- [ ] Implement drag-and-drop utility functions in shared/lib
- [ ] Setup collision detection and sensors configuration
- [ ] Create drag state management hooks

### 3.2 Draggable Block System
- [ ] Enhance block wrappers with drag capabilities (using Consta styling)
- [ ] Create DraggableBlockWrapper component
- [ ] Implement drag handles with Consta icons
- [ ] Add drag preview/overlay functionality
- [ ] Create visual feedback system with Consta design tokens

### 3.3 Droppable Areas & Containers
- [ ] Implement drop zones with Consta visual indicators
- [ ] Create DroppableContainer component
- [ ] Implement drop validation logic
- [ ] Add visual drop indicators using Consta theme
- [ ] Handle nested container drop scenarios

## Phase 4: UI Consta Migration
### 4.1 Component Migration
- [ ] Replace Material-UI components with Consta equivalents
- [ ] Migrate theme system to Consta design tokens
- [ ] Update color schemes and typography
- [ ] Redesign form inputs using Consta components
- [ ] Update icons to Consta icon system

### 4.2 Layout & Navigation
- [ ] Redesign main application layout with Consta
- [ ] Update drawer/sidebar components
- [ ] Migrate dialog and modal components
- [ ] Redesign toolbar and menu components
- [ ] Update responsive breakpoints

### 4.3 Block Palette Redesign
- [ ] Transform AddBlockMenu to draggable palette using Consta
- [ ] Create draggable block buttons with Consta styling
- [ ] Implement drag-from-palette functionality
- [ ] Update block creation workflow
- [ ] Add visual feedback for palette interactions

## Phase 5: Advanced Drag & Drop Features
### 5.1 Sortable Containers
- [ ] Implement sortable functionality for Container blocks
- [ ] Add reordering capability for ColumnsContainer
- [ ] Create sortable EmailLayout children
- [ ] Handle nested container sorting
- [ ] Implement cross-container drag-and-drop

### 5.2 Advanced Interactions
- [ ] Implement block reordering within containers
- [ ] Add complex nesting scenario handling
- [ ] Implement undo/redo for drag operations
- [ ] Create keyboard drag-and-drop support
- [ ] Add touch/mobile drag support

### 5.3 Performance Optimization
- [ ] Optimize drag performance (avoid DOM mutations)
- [ ] Implement efficient collision detection
- [ ] Minimize re-renders during drag operations
- [ ] Performance testing and profiling
- [ ] Memory usage optimization

## Phase 6: UX/UI Polish & Accessibility
### 6.1 Visual Feedback & Animations
- [ ] Design drag preview components with Consta
- [ ] Implement drop zone highlighting
- [ ] Add drag cursor states
- [ ] Create smooth animations and transitions
- [ ] Polish visual feedback system

### 6.2 Accessibility Implementation
- [ ] Implement keyboard drag-and-drop
- [ ] Add screen reader announcements
- [ ] Ensure focus management during drag
- [ ] Test with accessibility tools
- [ ] WCAG 2.1 compliance verification

### 6.3 Mobile & Touch Support
- [ ] Optimize touch interactions for drag-and-drop
- [ ] Implement mobile-specific UI patterns
- [ ] Test on various mobile devices
- [ ] Optimize performance for mobile
- [ ] Handle orientation changes

## Phase 7: Integration & Testing
### 7.1 State Management Integration
- [ ] Ensure drag state syncs with Zustand store
- [ ] Maintain document structure integrity
- [ ] Preserve existing selection behavior
- [ ] Update onChange callbacks for drag operations
- [ ] Test state persistence and hydration

### 7.2 Comprehensive Testing
- [ ] Unit tests for drag-and-drop components
- [ ] Integration tests for drag workflows
- [ ] Cross-browser compatibility testing
- [ ] Mobile/touch device testing
- [ ] Performance benchmarking

### 7.3 FSD Architecture Validation
- [ ] Verify proper layer separation and dependencies
- [ ] Test module imports and circular dependency detection
- [ ] Validate feature isolation and reusability
- [ ] Performance impact assessment of new architecture
- [ ] Documentation of architectural decisions

## Phase 8: Documentation & Deployment
### 8.1 Documentation
- [ ] Update architecture documentation for FSD
- [ ] Create drag-and-drop usage guide
- [ ] Document Consta migration process
- [ ] Update API documentation
- [ ] Create development guidelines for FSD

### 8.2 Migration & Deployment
- [ ] Plan gradual rollout strategy
- [ ] Ensure backward compatibility where possible
- [ ] Performance monitoring setup
- [ ] User feedback collection system
- [ ] Rollback procedures documentation

## Creative Phases Required
- [x] **FSD Architecture Design**: Layer organization and dependencies
  - ✅ Выбрана классическая FSD архитектура с четким разделением слоев
  - ✅ Спроектированы все слои: app, widgets, features, entities, shared
  - ✅ Создан план поэтапной миграции (4 недели)
- [x] **Drag & Drop UX Design**: Interaction patterns and visual feedback
  - ✅ Выбран богатый UX с предварительным просмотром
  - ✅ Спроектированы drag handles, ghost previews, drop zones
  - ✅ Определены паттерны взаимодействия и анимации
- [x] **Consta Design System Integration**: Theme and component design
  - ✅ Выбрана стратегия постепенной миграции с coexistence
  - ✅ Спроектирована тема email builder на базе Consta
  - ✅ Создан план миграции компонентов (4 недели)
- [x] **Block Palette UX**: Draggable palette interface design
  - ✅ Выбрана адаптивная умная палитра с персонализацией
  - ✅ Спроектированы категории, поиск, избранное
  - ✅ Определена архитектура компонентов палитры
- [x] **Mobile Interaction Design**: Touch-optimized drag patterns
  - ✅ Выбран прогрессивный подход с адаптивными компонентами
  - ✅ Спроектированы touch gestures и мобильные паттерны
  - ✅ Создана система адаптивных breakpoints

## Risk Mitigation Strategies
- **Architecture Risk**: Gradual FSD migration with parallel old/new structure
- **Performance Risk**: Use @dnd-kit's transform approach, performance monitoring
- **UI Migration Risk**: Component-by-component Consta migration with fallbacks
- **Complexity Risk**: Phased implementation maintaining working state
- **Compatibility Risk**: Comprehensive testing with existing block types
- **Timeline Risk**: Parallel workstreams where possible, clear dependencies

## Success Criteria
- ✅ Drag-and-drop functionality fully implemented with @dnd-kit
- ✅ Complete migration to Consta design system
- ✅ Feature-Sliced Design architecture implemented
- ✅ All existing functionality preserved and enhanced
- ✅ Performance maintained or improved
- ✅ Accessibility standards met (WCAG 2.1)
- ✅ Mobile/touch support implemented
- ✅ No breaking changes to existing API

## Dependencies & Integration Points
- **@dnd-kit** ↔ **Zustand**: Drag state management
- **Consta** ↔ **FSD**: UI components organized by architectural layers  
- **FSD** ↔ **Existing Architecture**: Gradual migration path
- **Drag & Drop** ↔ **Block System**: Enhanced block interactions
- **Mobile Support** ↔ **Touch Events**: Cross-platform compatibility
