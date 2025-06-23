# 🎨 CREATIVE PHASE: Block Palette UX Design

## PROBLEM STATEMENT

Необходимо спроектировать интуитивную и эффективную палитру блоков для email builder, которая:
- Обеспечит быстрый доступ ко всем типам блоков
- Поддержит drag-and-drop из палитры на canvas
- Предоставит предварительный просмотр блоков
- Будет организована логично и понятно для пользователей
- Интегрируется с Consta design system
- Поддержит поиск и категоризацию блоков
- Работает эффективно на разных размерах экрана

## OPTIONS ANALYSIS

### Option 1: Классическая боковая панель
**Описание**: Традиционная вертикальная палитра в боковой панели
**Layout**:
```
┌─────────────┬─────────────────┬─────────────┐
│             │                 │             │
│   PALETTE   │     CANVAS      │   CONFIG    │
│             │                 │             │
│ [📝] Text   │                 │             │
│ [🖼️] Image  │                 │             │
│ [🔘] Button │                 │             │
│ [📦] Container                │             │
│ [📊] Columns│                 │             │
│ [➖] Divider│                 │             │
│             │                 │             │
└─────────────┴─────────────────┴─────────────┘
```

**Interaction Pattern**:
- Вертикальный список блоков
- Drag из палитры на canvas
- Группировка по категориям
- Collapse/expand секции

**Pros**:
- Привычный паттерн для пользователей
- Много места для описаний
- Легко добавлять новые блоки
- Хорошо работает на больших экранах

**Cons**:
- Занимает много горизонтального пространства
- Может быть неудобно на маленьких экранах
- Длинный скролл при большом количестве блоков

**Complexity**: Low
**Implementation Time**: 1-2 недели

### Option 2: Floating Toolbar с категориями
**Описание**: Плавающая панель инструментов с выпадающими категориями
**Layout**:
```
┌─────────────────────────────────────────────┐
│ [📝▼] [🖼️▼] [🎨▼] [📊▼] [⚙️▼]              │ ← Floating toolbar
└─────────────────────────────────────────────┘
              ↓ (on click)
         ┌─────────────┐
         │ 📝 Text     │
         │ 📝 Heading  │
         │ 📝 Quote    │
         └─────────────┘

┌─────────────────────────────────────────────┐
│                                             │
│              CANVAS AREA                    │
│                                             │
└─────────────────────────────────────────────┘
```

**Interaction Pattern**:
- Категории в горизонтальной панели
- Dropdown с блоками при клике на категорию
- Drag из dropdown на canvas
- Автоскрытие dropdown после drag

**Pros**:
- Экономит пространство экрана
- Быстрый доступ к категориям
- Современный интерфейс
- Хорошо работает на мобильных

**Cons**:
- Требует дополнительные клики
- Меньше места для предварительного просмотра
- Может быть неочевидно для новых пользователей

**Complexity**: Medium
**Implementation Time**: 2-3 недели

### Option 3: Adaptive Smart Palette
**Описание**: Умная палитра, которая адаптируется к контексту и поведению пользователя
**Features**:
- Часто используемые блоки всегда видны
- Контекстные предложения блоков
- Поиск с автодополнением
- Избранные блоки пользователя
- Адаптивный layout

**Layout (Desktop)**:
```
┌─────────────┬─────────────────┬─────────────┐
│ 🔍 Search   │                 │             │
│ ───────────│                 │             │
│ ⭐ FAVORITES│     CANVAS      │   CONFIG    │
│ [📝] Text   │                 │             │
│ [🔘] Button │                 │             │
│ ───────────│                 │             │
│ 📦 LAYOUT   │                 │             │
│ [📦] Container               │             │
│ [��] Columns│                 │             │
│ ───────────│                 │             │
│ 🎨 CONTENT  │                 │             │
│ [🖼️] Image  │                 │             │
│ [➖] Divider│                 │             │
└─────────────┴─────────────────┴─────────────┘
```

**Layout (Mobile)**:
```
┌─────────────────────────────────────────────┐
│ [+] Add Block            [🔍] [⭐] [📦] [🎨] │ ← Collapsible
└─────────────────────────────────────────────┘
              ↓ (on [+] click)
┌─────────────────────────────────────────────┐
│ 🔍 Search blocks...                         │
│ ─────────────────────────────────────────── │
│ ⭐ Text    🔘 Button   📦 Container         │
│ 🖼️ Image   ➖ Divider  📊 Columns          │
└─────────────────────────────────────────────┘
```

**Pros**:
- Персонализированный опыт
- Эффективное использование пространства
- Подходит для разных устройств
- Ускоряет работу опытных пользователей

**Cons**:
- Сложность реализации
- Необходимость аналитики поведения
- Может быть непредсказуемо для новых пользователей

**Complexity**: High
**Implementation Time**: 3-4 недели

## DECISION

**Выбираю Option 3: Adaptive Smart Palette**

### Обоснование:
1. **Современный UX**: Адаптивный интерфейс соответствует современным стандартам
2. **Эффективность**: Умные предложения ускоряют работу пользователей
3. **Масштабируемость**: Легко добавлять новые блоки без переполнения интерфейса
4. **Мобильная поддержка**: Отлично работает на разных устройствах
5. **Персонализация**: Улучшает пользовательский опыт со временем

## DETAILED UX DESIGN

### 1. Block Categories Organization

```typescript
const blockCategories = {
  favorites: {
    id: 'favorites',
    label: 'Избранное',
    icon: IconStar,
    color: 'warning',
    blocks: [] // Динамически заполняется
  },
  layout: {
    id: 'layout',
    label: 'Макет',
    icon: IconGrid,
    color: 'primary',
    blocks: ['container', 'columns', 'spacer', 'divider']
  },
  content: {
    id: 'content',
    label: 'Контент',
    icon: IconEdit,
    color: 'success',
    blocks: ['text', 'heading', 'image', 'html']
  },
  interactive: {
    id: 'interactive',
    label: 'Интерактив',
    icon: IconCursor,
    color: 'accent',
    blocks: ['button', 'link']
  },
  social: {
    id: 'social',
    label: 'Соцсети',
    icon: IconShare,
    color: 'secondary',
    blocks: ['social-links', 'avatar']
  }
};
```

### 2. Block Definitions with Rich Metadata

```typescript
const blockDefinitions = {
  text: {
    id: 'text',
    label: 'Текст',
    description: 'Параграф текста с форматированием',
    icon: IconText,
    category: 'content',
    preview: {
      thumbnail: '/previews/text-block.svg',
      template: '<p>Пример текста...</p>'
    },
    tags: ['текст', 'параграф', 'контент'],
    usage: 0, // Счетчик использования
    isFavorite: false
  },
  button: {
    id: 'button',
    label: 'Кнопка',
    description: 'Кликабельная кнопка с действием',
    icon: IconButton,
    category: 'interactive',
    preview: {
      thumbnail: '/previews/button-block.svg',
      template: '<button>Нажмите здесь</button>'
    },
    tags: ['кнопка', 'действие', 'клик', 'cta'],
    usage: 0,
    isFavorite: false
  },
  // ... другие блоки
};
```

### 3. Smart Palette Component Architecture

```typescript
// widgets/block-palette/ui/SmartPalette.tsx
export const SmartPalette = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('favorites');
  const [isExpanded, setIsExpanded] = useState(true);
  
  const {
    filteredBlocks,
    favoriteBlocks,
    recentBlocks,
    suggestedBlocks
  } = useSmartPaletteData(searchQuery, activeCategory);

  return (
    <Card className="smart-palette">
      <PaletteHeader 
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />
      
      {isExpanded && (
        <>
          <SearchInput 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Поиск блоков..."
          />
          
          <CategoryTabs 
            categories={blockCategories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
          
          <BlockGrid 
            blocks={filteredBlocks}
            onDragStart={handleBlockDragStart}
            onFavoriteToggle={handleFavoriteToggle}
          />
          
          {searchQuery && (
            <SearchSuggestions 
              query={searchQuery}
              suggestions={suggestedBlocks}
            />
          )}
        </>
      )}
    </Card>
  );
};
```

### 4. Block Grid Component

```typescript
// widgets/block-palette/ui/BlockGrid.tsx
export const BlockGrid = ({ blocks, onDragStart, onFavoriteToggle }) => {
  return (
    <div className="block-grid">
      {blocks.map((block) => (
        <DraggableBlockCard
          key={block.id}
          block={block}
          onDragStart={() => onDragStart(block)}
          onFavoriteToggle={() => onFavoriteToggle(block.id)}
        />
      ))}
    </div>
  );
};

const DraggableBlockCard = ({ block, onDragStart, onFavoriteToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card
      className="draggable-block-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={onDragStart}
      draggable
    >
      <div className="block-preview">
        <block.icon size="m" />
        {isHovered && (
          <PreviewTooltip content={block.preview.template} />
        )}
      </div>
      
      <div className="block-info">
        <Text size="s" weight="medium">{block.label}</Text>
        <Text size="xs" view="secondary">{block.description}</Text>
      </div>
      
      <div className="block-actions">
        <Button
          view="clear"
          size="xs"
          iconLeft={block.isFavorite ? IconStarFilled : IconStar}
          onClick={onFavoriteToggle}
        />
        <Button
          view="clear"
          size="xs"
          iconLeft={IconDragDrop}
          className="drag-handle"
        />
      </div>
    </Card>
  );
};
```

### 5. Search and Filtering Logic

```typescript
// widgets/block-palette/lib/useSmartPaletteData.ts
export const useSmartPaletteData = (searchQuery, activeCategory) => {
  const { blocks, updateBlockUsage } = useBlockStore();
  const { favoriteBlocks } = useUserPreferences();
  
  const filteredBlocks = useMemo(() => {
    let result = Object.values(blocks);
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(block => 
        block.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        block.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        block.tags.some(tag => tag.includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by category
    if (activeCategory !== 'favorites') {
      result = result.filter(block => block.category === activeCategory);
    } else {
      result = result.filter(block => block.isFavorite);
    }
    
    // Sort by usage and favorites
    return result.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return b.usage - a.usage;
    });
  }, [blocks, searchQuery, activeCategory]);
  
  const recentBlocks = useMemo(() => {
    return Object.values(blocks)
      .filter(block => block.usage > 0)
      .sort((a, b) => b.lastUsed - a.lastUsed)
      .slice(0, 5);
  }, [blocks]);
  
  const suggestedBlocks = useMemo(() => {
    if (!searchQuery) return [];
    
    // Smart suggestions based on search query
    return Object.values(blocks)
      .filter(block => 
        block.tags.some(tag => 
          tag.includes(searchQuery.toLowerCase())
        )
      )
      .slice(0, 3);
  }, [blocks, searchQuery]);
  
  return {
    filteredBlocks,
    favoriteBlocks,
    recentBlocks,
    suggestedBlocks
  };
};
```

### 6. Mobile Adaptive Layout

```typescript
// widgets/block-palette/ui/MobilePalette.tsx
export const MobilePalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  if (!isMobile) return <SmartPalette />;
  
  return (
    <>
      <FloatingAddButton onClick={() => setIsOpen(true)} />
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="mobile-palette-modal"
      >
        <ModalHeader>
          <Text size="l" weight="semibold">Добавить блок</Text>
        </ModalHeader>
        
        <ModalContent>
          <QuickBlockGrid 
            blocks={favoriteBlocks}
            onBlockSelect={handleBlockSelect}
          />
          
          <CategoryTabs 
            categories={blockCategories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
          
          <BlockGrid 
            blocks={filteredBlocks}
            onBlockSelect={handleBlockSelect}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

const FloatingAddButton = ({ onClick }) => (
  <Button
    view="primary"
    size="l"
    iconLeft={IconAdd}
    className="floating-add-button"
    onClick={onClick}
  >
    Добавить блок
  </Button>
);
```

### 7. Drag and Drop Integration

```typescript
// widgets/block-palette/lib/usePaletteDragDrop.ts
export const usePaletteDragDrop = () => {
  const { addBlock } = useEditorStore();
  
  const handleBlockDragStart = useCallback((block) => {
    // Create drag data
    const dragData = {
      type: 'PALETTE_BLOCK',
      blockType: block.id,
      blockConfig: block.defaultProps || {}
    };
    
    // Start drag operation
    return dragData;
  }, []);
  
  const handleBlockDrop = useCallback((dragData, dropPosition) => {
    if (dragData.type === 'PALETTE_BLOCK') {
      // Add new block to editor
      addBlock({
        type: dragData.blockType,
        props: dragData.blockConfig,
        position: dropPosition
      });
      
      // Update usage statistics
      updateBlockUsage(dragData.blockType);
    }
  }, [addBlock]);
  
  return {
    handleBlockDragStart,
    handleBlockDrop
  };
};
```

### 8. Styling with Consta Theme

```scss
// widgets/block-palette/ui/SmartPalette.scss
.smart-palette {
  .block-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: var(--space-s);
    padding: var(--space-m);
  }
  
  .draggable-block-card {
    position: relative;
    cursor: grab;
    transition: all 0.2s ease;
    border: 2px solid transparent;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-group);
      border-color: var(--color-control-bg-border-default-hover);
    }
    
    &:active {
      cursor: grabbing;
      transform: scale(0.95);
    }
    
    .block-preview {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      background: var(--color-bg-ghost);
      border-radius: var(--control-radius);
      margin-bottom: var(--space-xs);
    }
    
    .block-info {
      text-align: center;
      margin-bottom: var(--space-xs);
    }
    
    .block-actions {
      display: flex;
      justify-content: space-between;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    
    &:hover .block-actions {
      opacity: 1;
    }
  }
  
  .floating-add-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    box-shadow: var(--shadow-group);
  }
}

// Mobile styles
@media (max-width: 768px) {
  .smart-palette {
    .block-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-xs);
    }
    
    .draggable-block-card {
      .block-preview {
        height: 40px;
      }
      
      .block-actions {
        opacity: 1; // Always visible on mobile
      }
    }
  }
}
```

### 9. Performance Optimizations

```typescript
// Virtualization for large block lists
import { FixedSizeGrid as Grid } from 'react-window';

const VirtualizedBlockGrid = ({ blocks, onBlockSelect }) => {
  const Cell = ({ columnIndex, rowIndex, style }) => {
    const blockIndex = rowIndex * COLUMNS_COUNT + columnIndex;
    const block = blocks[blockIndex];
    
    if (!block) return null;
    
    return (
      <div style={style}>
        <DraggableBlockCard 
          block={block}
          onSelect={onBlockSelect}
        />
      </div>
    );
  };
  
  return (
    <Grid
      columnCount={COLUMNS_COUNT}
      columnWidth={140}
      height={400}
      rowCount={Math.ceil(blocks.length / COLUMNS_COUNT)}
      rowHeight={120}
      width="100%"
    >
      {Cell}
    </Grid>
  );
};
```

🎨🎨🎨 EXITING CREATIVE PHASE - DECISION MADE 🎨🎨🎨

**Результат**: Спроектирована адаптивная умная палитра блоков с персонализацией и поиском
**Следующий шаг**: Переход к последней творческой фазе - Mobile Interaction Design
