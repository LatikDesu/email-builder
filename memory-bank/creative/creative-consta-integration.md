# 🎨 CREATIVE PHASE: Consta Design System Integration

## PROBLEM STATEMENT

Необходимо спроектировать стратегию интеграции Consta Design System в email builder, которая:
- Обеспечит плавную миграцию с Material-UI на Consta
- Создаст единообразный и современный дизайн
- Поддержит кастомизацию темы для email builder специфики
- Интегрируется с drag-and-drop функциональностью
- Сохранит производительность и доступность
- Обеспечит совместимость с существующими компонентами

## OPTIONS ANALYSIS

### Option 1: Полная замена Material-UI на Consta
**Описание**: Единовременная замена всех Material-UI компонентов на Consta аналоги
**Подход**:
- Создать mapping таблицу MUI → Consta
- Заменить все компоненты за один этап
- Обновить всю стилизацию под Consta theme
- Удалить Material-UI зависимости

**Migration Strategy**:
```
Phase 1: Replace all Button → Button (Consta)
Phase 2: Replace all TextField → TextField (Consta)
Phase 3: Replace all Dialog → Modal (Consta)
Phase 4: Replace theme system
Phase 5: Remove MUI dependencies
```

**Pros**:
- Чистое решение без legacy кода
- Единообразный дизайн сразу
- Меньший bundle size
- Простота поддержки

**Cons**:
- Высокий риск поломки функциональности
- Большой объем работы единовременно
- Сложно тестировать все изменения
- Возможные проблемы с совместимостью

**Complexity**: High
**Implementation Time**: 4-5 недель

### Option 2: Постепенная миграция с coexistence
**Описание**: Поэтапная замена компонентов с временным сосуществованием двух систем
**Подход**:
- Создать Consta wrapper компоненты
- Мигрировать по одному компоненту/feature
- Поддерживать оба theme provider'а
- Постепенно удалять MUI компоненты

**Migration Strategy**:
```
Phase 1: Setup Consta + create basic components
Phase 2: Migrate new features to Consta
Phase 3: Migrate existing features one by one
Phase 4: Create bridge components for compatibility
Phase 5: Remove MUI when all migrated
```

**Pros**:
- Низкий риск поломки
- Возможность тестирования на каждом этапе
- Гибкость в планировании
- Сохранение работоспособности

**Cons**:
- Больший bundle size временно
- Сложность поддержки двух систем
- Возможные конфликты стилей
- Дольше время миграции

**Complexity**: Medium
**Implementation Time**: 3-4 недели

### Option 3: Hybrid подход с Custom Design System
**Описание**: Создание собственной обертки над Consta с адаптацией под email builder
**Подход**:
- Создать EmailBuilder Design System на базе Consta
- Кастомизировать компоненты под специфику email редактора
- Добавить email-specific компоненты
- Создать unified API для всех UI компонентов

**Architecture**:
```
EmailBuilder DS
├── Core (Consta base)
├── Customized (Consta + customizations)
├── Email-specific (custom components)
└── Legacy Bridge (MUI compatibility)
```

**Pros**:
- Полный контроль над дизайном
- Оптимизация под email builder задачи
- Возможность расширения
- Единый API для всех компонентов

**Cons**:
- Больше времени на разработку
- Необходимость поддержки собственной системы
- Сложность обновления Consta
- Риск over-engineering

**Complexity**: High
**Implementation Time**: 5-6 недель

## DECISION

**Выбираю Option 2: Постепенная миграция с coexistence**

### Обоснование:
1. **Минимизация рисков**: Постепенная миграция снижает вероятность критических ошибок
2. **Непрерывная работоспособность**: Приложение остается функциональным на всех этапах
3. **Возможность тестирования**: Каждый этап можно протестировать изолированно
4. **Гибкость планирования**: Можно адаптировать план в процессе работы
5. **Команда разработки**: Проще для команды изучать Consta постепенно

## DETAILED INTEGRATION DESIGN

### 1. Theme Architecture
```typescript
// Unified Theme Provider
const EmailBuilderThemeProvider = ({ children }) => {
  return (
    <ConstaThemeProvider theme={emailBuilderTheme}>
      <MaterialUIThemeProvider theme={muiCompatTheme}>
        {children}
      </MaterialUIThemeProvider>
    </ConstaThemeProvider>
  );
};

// Custom Email Builder Theme
const emailBuilderTheme = {
  ...presetGpnDefault,
  color: {
    ...presetGpnDefault.color,
    primary: '#2563eb',     // Email builder brand color
    accent: '#7c3aed',      // Secondary brand color
    success: '#059669',     // Success actions
    warning: '#d97706',     // Warning states
    alert: '#dc2626',       // Error states
  },
  space: {
    ...presetGpnDefault.space,
    xs: '4px',
    s: '8px',
    m: '12px',
    l: '16px',
    xl: '24px',
    xxl: '32px',
  },
  font: {
    ...presetGpnDefault.font,
    primary: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  }
};
```

### 2. Component Migration Strategy

#### Phase 1: Core UI Components (Week 1)
```typescript
// shared/ui/index.ts
export { Button } from './Button/Button';
export { TextField } from './TextField/TextField';
export { Select } from './Select/Select';
export { Modal } from './Modal/Modal';
export { Card } from './Card/Card';

// Wrapper approach for smooth migration
const Button = ({ variant, ...props }) => {
  // Map MUI variants to Consta variants
  const constaVariant = variant === 'contained' ? 'primary' : 'secondary';
  return <ConstaButton view={constaVariant} {...props} />;
};
```

#### Phase 2: Form Components (Week 2)
```typescript
// Email builder specific form components
export const ColorPicker = ({ value, onChange }) => (
  <ConstaTextField
    value={value}
    onChange={onChange}
    type="color"
    rightSide={<IconColorPalette />}
  />
);

export const FontSelector = ({ value, onChange, fonts }) => (
  <ConstaSelect
    value={value}
    onChange={onChange}
    items={fonts}
    renderItem={({ item }) => (
      <div style={{ fontFamily: item.value }}>
        {item.label}
      </div>
    )}
  />
);
```

#### Phase 3: Layout Components (Week 2-3)
```typescript
// Layout specific to email builder
export const EditorLayout = ({ children }) => (
  <ConstaLayout>
    <ConstaHeader>
      <EditorToolbar />
    </ConstaHeader>
    <ConstaLayout direction="row">
      <ConstaSider width={300}>
        <BlockPalette />
      </ConstaSider>
      <ConstaContent>
        {children}
      </ConstaContent>
      <ConstaSider width={350}>
        <ConfigurationPanel />
      </ConstaSider>
    </ConstaLayout>
  </ConstaLayout>
);
```

### 3. Email Builder Specific Components

#### Drag Handle Component
```typescript
// features/block-drag-drop/ui/DragHandle.tsx
import { IconDragDrop } from '@consta/icons/IconDragDrop';
import { Button } from '@consta/uikit/Button';

export const DragHandle = ({ onDragStart, ...props }) => {
  return (
    <Button
      view="clear"
      size="xs"
      iconLeft={IconDragDrop}
      className="drag-handle"
      onMouseDown={onDragStart}
      aria-label="Перетащить блок"
      {...props}
    />
  );
};
```

#### Block Configuration Panel
```typescript
// features/block-config/ui/ConfigPanel.tsx
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { Collapse } from '@consta/uikit/Collapse';

export const ConfigPanel = ({ block, onChange }) => {
  return (
    <Card verticalSpace="m" horizontalSpace="m">
      <Text size="l" weight="semibold">
        Настройки блока
      </Text>
      <Collapse label="Внешний вид">
        <ColorInput 
          label="Цвет фона"
          value={block.backgroundColor}
          onChange={(color) => onChange({ backgroundColor: color })}
        />
        <FontSelector
          label="Шрифт"
          value={block.fontFamily}
          onChange={(font) => onChange({ fontFamily: font })}
        />
      </Collapse>
      <Collapse label="Размеры">
        <SliderInput
          label="Отступы"
          value={block.padding}
          onChange={(padding) => onChange({ padding })}
        />
      </Collapse>
    </Card>
  );
};
```

#### Block Palette Component
```typescript
// widgets/block-palette/ui/BlockPalette.tsx
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { IconAdd } from '@consta/icons/IconAdd';

export const BlockPalette = () => {
  const blockTypes = [
    { type: 'text', label: 'Текст', icon: IconText },
    { type: 'image', label: 'Изображение', icon: IconImage },
    { type: 'button', label: 'Кнопка', icon: IconButton },
  ];

  return (
    <Card verticalSpace="m" horizontalSpace="m">
      <Text size="l" weight="semibold">
        Блоки
      </Text>
      {blockTypes.map((blockType) => (
        <DraggableBlockButton
          key={blockType.type}
          blockType={blockType}
          onDragStart={() => startDrag(blockType)}
        />
      ))}
    </Card>
  );
};

const DraggableBlockButton = ({ blockType, onDragStart }) => (
  <Card
    verticalSpace="xs"
    horizontalSpace="s"
    className="draggable-block-button"
    onMouseDown={onDragStart}
  >
    <div className="flex items-center gap-s">
      <blockType.icon size="s" />
      <Text size="m">{blockType.label}</Text>
      <IconAdd size="xs" />
    </div>
  </Card>
);
```

### 4. Styling Integration

#### CSS Variables Integration
```css
/* Consta + Custom variables */
:root {
  /* Consta base variables */
  --color-bg-primary: var(--color-bg-default);
  --color-bg-secondary: var(--color-bg-secondary);
  
  /* Email builder specific */
  --email-editor-bg: #f8fafc;
  --email-canvas-bg: #ffffff;
  --email-block-border: var(--color-bg-border);
  --email-drag-handle: var(--color-control-typo-ghost);
  
  /* Drag & Drop colors */
  --dnd-drop-zone-valid: var(--color-bg-success);
  --dnd-drop-zone-invalid: var(--color-bg-alert);
  --dnd-ghost-opacity: 0.5;
}
```

#### Component Styling
```scss
// Email builder specific styles
.email-editor {
  background: var(--email-editor-bg);
  min-height: 100vh;
  
  .email-canvas {
    background: var(--email-canvas-bg);
    border: 1px solid var(--email-block-border);
    border-radius: var(--control-radius);
    box-shadow: var(--shadow-group);
  }
  
  .block-wrapper {
    position: relative;
    border: 2px solid transparent;
    transition: border-color 0.2s ease;
    
    &:hover {
      border-color: var(--color-control-bg-border-default-hover);
    }
    
    &.selected {
      border-color: var(--color-control-bg-border-primary);
    }
  }
  
  .drag-handle {
    position: absolute;
    top: 4px;
    left: 4px;
    opacity: 0;
    transition: opacity 0.2s ease;
    
    .block-wrapper:hover & {
      opacity: 1;
    }
  }
}
```

### 5. Migration Checklist

#### Week 1: Foundation
- [ ] Setup Consta theme provider
- [ ] Create basic wrapper components
- [ ] Migrate Button, TextField, Select
- [ ] Update color scheme
- [ ] Test basic functionality

#### Week 2: Forms & Inputs
- [ ] Migrate all form components
- [ ] Create email-specific inputs (ColorPicker, FontSelector)
- [ ] Update validation styling
- [ ] Test form functionality

#### Week 3: Layout & Navigation
- [ ] Migrate layout components
- [ ] Update drawer/sidebar
- [ ] Migrate modals and dialogs
- [ ] Test responsive behavior

#### Week 4: Polish & Cleanup
- [ ] Remove unused MUI components
- [ ] Optimize bundle size
- [ ] Final styling adjustments
- [ ] Performance testing

### 6. Compatibility Bridge

```typescript
// For gradual migration - bridge components
export const CompatButton = ({ variant, color, ...props }) => {
  // Map MUI props to Consta props
  const constaProps = {
    view: mapVariantToView(variant),
    status: mapColorToStatus(color),
    ...props
  };
  
  return <ConstaButton {...constaProps} />;
};

const mapVariantToView = (variant) => {
  switch (variant) {
    case 'contained': return 'primary';
    case 'outlined': return 'secondary';
    case 'text': return 'clear';
    default: return 'primary';
  }
};
```

### 7. Performance Considerations

#### Bundle Size Optimization
```typescript
// Tree-shaking friendly imports
import { Button } from '@consta/uikit/Button';
import { TextField } from '@consta/uikit/TextField';

// Instead of
// import { Button, TextField } from '@consta/uikit';
```

#### CSS-in-JS Strategy
```typescript
// Use Consta's built-in styling system
const useEmailEditorStyles = () => {
  const theme = useTheme();
  
  return {
    editor: {
      backgroundColor: theme.color.bg.default,
      padding: theme.space.l,
    },
    canvas: {
      backgroundColor: theme.color.bg.primary,
      borderRadius: theme.control.radius,
    }
  };
};
```

🎨🎨🎨 EXITING CREATIVE PHASE - DECISION MADE 🎨🎨🎨

**Результат**: Спроектирована стратегия постепенной миграции на Consta с coexistence подходом
**Следующий шаг**: Переход к проектированию Block Palette UX
