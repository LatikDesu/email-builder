# 🎨 CREATIVE PHASE: Mobile Interaction Design

## PROBLEM STATEMENT

Необходимо спроектировать оптимизированные мобильные взаимодействия для email builder, которые:
- Обеспечат полную функциональность на touch устройствах
- Адаптируют drag-and-drop для touch интерфейсов
- Оптимизируют использование ограниченного экранного пространства
- Поддержат различные размеры экранов (телефоны, планшеты)
- Обеспечат комфортную работу с мелкими элементами
- Интегрируются с @dnd-kit touch сенсорами
- Сохранят производительность на мобильных устройствах

## OPTIONS ANALYSIS

### Option 1: Desktop-First Адаптация
**Описание**: Адаптация существующего desktop интерфейса для мобильных устройств
**Подход**:
- Масштабирование существующих элементов
- Адаптивные breakpoints
- Touch-friendly размеры кнопок
- Упрощенная навигация

**Mobile Layout**:
```
┌─────────────────────┐
│ ☰ Email Builder     │ ← Header with hamburger menu
├─────────────────────┤
│                     │
│      CANVAS         │ ← Full-width canvas
│   (scrollable)      │
│                     │
├─────────────────────┤
│ [+] Add [⚙️] Config │ ← Bottom toolbar
└─────────────────────┘
```

**Interaction Flow**:
1. Tap [+] → Open block palette modal
2. Tap block → Add to canvas
3. Long press block → Enable drag mode
4. Drag to reorder
5. Tap [⚙️] → Open config panel

**Pros**:
- Быстрая реализация
- Сохранение знакомого интерфейса
- Минимальные изменения в коде
- Легкое тестирование

**Cons**:
- Не оптимизировано для мобильного опыта
- Ограниченная функциональность
- Может быть неудобно для сложных операций
- Не использует мобильные паттерны

**Complexity**: Low
**Implementation Time**: 1-2 недели

### Option 2: Mobile-Specific Interface
**Описание**: Специализированный мобильный интерфейс с touch-оптимизированными паттернами
**Подход**:
- Полноэкранные модальные окна
- Swipe gestures для навигации
- Context menus для действий
- Touch-optimized drag & drop

**Mobile Layout**:
```
Portrait Mode:
┌─────────────────────┐
│ Email Builder    [≡]│ ← Header with menu
├─────────────────────┤
│                     │
│      CANVAS         │ ← Full canvas view
│   (pinch to zoom)   │
│                     │
│                     │
├─────────────────────┤
│ 📝 🖼️ 🔘 📦 [+]     │ ← Quick block toolbar
└─────────────────────┘

Landscape Mode:
┌─────────────────────────────────────┐
│ Email Builder              [≡]      │
├─────────────┬───────────────────────┤
│ 📝 Text     │                       │
│ 🖼️ Image    │      CANVAS           │
│ 🔘 Button   │   (main area)         │
│ 📦 Container│                       │
│ [+] More    │                       │
└─────────────┴───────────────────────┘
```

**Interaction Patterns**:
- **Long press + drag**: Move blocks
- **Double tap**: Edit block
- **Swipe up from bottom**: Open block palette
- **Swipe left/right**: Switch between canvas/config
- **Pinch**: Zoom canvas
- **Two-finger tap**: Context menu

**Pros**:
- Оптимизировано для мобильного опыта
- Использует native мобильные паттерны
- Лучшая производительность
- Интуитивные жесты

**Cons**:
- Больше времени на разработку
- Необходимость поддержки двух интерфейсов
- Сложнее тестирование
- Риск фрагментации UX

**Complexity**: High
**Implementation Time**: 4-5 недель

### Option 3: Progressive Mobile Enhancement
**Описание**: Прогрессивное улучшение мобильного опыта с адаптивными паттернами
**Подход**:
- Базовый touch-friendly интерфейс
- Прогрессивное добавление мобильных возможностей
- Адаптивные компоненты в зависимости от устройства
- Умное определение возможностей устройства

**Adaptive Features**:
```typescript
const mobileFeatures = {
  touch: {
    dragDelay: 500,        // Long press delay
    touchTargetSize: 44,   // Minimum touch target
    hapticFeedback: true,  // Vibration support
    preventScroll: true    // Prevent scroll during drag
  },
  gestures: {
    swipeToDelete: true,   // Swipe to delete blocks
    pinchToZoom: true,     // Canvas zoom
    pullToRefresh: false,  // Not needed for editor
    doubleTapToEdit: true  // Quick edit access
  },
  layout: {
    collapsiblePanels: true,  // Auto-collapse on small screens
    fullscreenModals: true,   // Full-screen config panels
    bottomSheetUI: true,      // Bottom sheet for actions
    adaptiveToolbar: true     // Context-aware toolbar
  }
};
```

**Responsive Breakpoints**:
- **Mobile Portrait** (< 480px): Single column, bottom toolbar
- **Mobile Landscape** (480px - 768px): Sidebar + canvas
- **Tablet Portrait** (768px - 1024px): Three-column layout
- **Tablet Landscape** (> 1024px): Full desktop experience

**Pros**:
- Лучший баланс между функциональностью и UX
- Единый codebase с адаптациями
- Постепенное улучшение опыта
- Гибкость в развитии

**Cons**:
- Средняя сложность реализации
- Необходимость тестирования на разных устройствах
- Компромиссы в специфичных мобильных возможностях

**Complexity**: Medium-High
**Implementation Time**: 3-4 недели

## DECISION

**Выбираю Option 3: Progressive Mobile Enhancement**

### Обоснование:
1. **Баланс ресурсов**: Оптимальное соотношение времени разработки и качества UX
2. **Единый codebase**: Проще поддерживать один адаптивный интерфейс
3. **Гибкость**: Возможность постепенно улучшать мобильный опыт
4. **Тестирование**: Проще тестировать адаптивные компоненты
5. **Команда**: Подходит для команды с ограниченными ресурсами

## DETAILED MOBILE INTERACTION DESIGN

### 1. Touch-Optimized Drag & Drop

```typescript
// features/block-drag-drop/lib/mobileDragDrop.ts
export const useMobileDragDrop = () => {
  const [isDragMode, setIsDragMode] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState(null);
  
  const handleTouchStart = useCallback((event, block) => {
    const timer = setTimeout(() => {
      setIsDragMode(true);
      // Haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      // Visual feedback
      showDragModeIndicator(block);
    }, 500); // 500ms long press
    
    setLongPressTimer(timer);
  }, []);
  
  const handleTouchEnd = useCallback(() => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    setIsDragMode(false);
  }, [longPressTimer]);
  
  const handleTouchMove = useCallback((event) => {
    if (isDragMode) {
      // Prevent page scroll during drag
      event.preventDefault();
      // Update drag position
      updateDragPosition(event.touches[0]);
    }
  }, [isDragMode]);
  
  return {
    isDragMode,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove
  };
};
```

### 2. Adaptive Layout System

```typescript
// shared/lib/useAdaptiveLayout.ts
export const useAdaptiveLayout = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize());
  const [orientation, setOrientation] = useState(getOrientation());
  
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
      setOrientation(getOrientation());
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);
  
  const layoutConfig = useMemo(() => {
    if (screenSize === 'mobile' && orientation === 'portrait') {
      return {
        layout: 'single-column',
        showSidebar: false,
        useBottomSheet: true,
        collapsePanels: true
      };
    }
    
    if (screenSize === 'mobile' && orientation === 'landscape') {
      return {
        layout: 'sidebar-canvas',
        showSidebar: true,
        useBottomSheet: false,
        collapsePanels: false
      };
    }
    
    if (screenSize === 'tablet') {
      return {
        layout: 'three-column',
        showSidebar: true,
        useBottomSheet: false,
        collapsePanels: false
      };
    }
    
    return {
      layout: 'desktop',
      showSidebar: true,
      useBottomSheet: false,
      collapsePanels: false
    };
  }, [screenSize, orientation]);
  
  return layoutConfig;
};
```

### 3. Mobile-Optimized Components

#### Touch-Friendly Drag Handle
```typescript
// features/block-drag-drop/ui/MobileDragHandle.tsx
export const MobileDragHandle = ({ onDragStart, block }) => {
  const { handleTouchStart, handleTouchEnd, isDragMode } = useMobileDragDrop();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  if (!isMobile) return <DragHandle onDragStart={onDragStart} />;
  
  return (
    <div
      className={cn('mobile-drag-handle', {
        'drag-mode': isDragMode
      })}
      onTouchStart={(e) => handleTouchStart(e, block)}
      onTouchEnd={handleTouchEnd}
      style={{
        minWidth: 44,
        minHeight: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <IconDragDrop size="m" />
      {isDragMode && (
        <div className="drag-mode-indicator">
          <Text size="xs">Перетащите для перемещения</Text>
        </div>
      )}
    </div>
  );
};
```

#### Bottom Sheet for Actions
```typescript
// shared/ui/BottomSheet/BottomSheet.tsx
export const BottomSheet = ({ 
  isOpen, 
  onClose, 
  children, 
  title,
  height = '50vh' 
}) => {
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  
  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };
  
  const handleTouchMove = (e) => {
    const current = e.touches[0].clientY;
    setCurrentY(current);
    
    // Allow closing by swiping down
    if (current - startY > 100) {
      onClose();
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="bottom-sheet-modal"
    >
      <div 
        className="bottom-sheet"
        style={{ height }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="bottom-sheet-handle" />
        
        <div className="bottom-sheet-header">
          <Text size="l" weight="semibold">{title}</Text>
          <Button
            view="clear"
            size="s"
            iconLeft={IconClose}
            onClick={onClose}
          />
        </div>
        
        <div className="bottom-sheet-content">
          {children}
        </div>
      </div>
    </Modal>
  );
};
```

#### Mobile Block Palette
```typescript
// widgets/block-palette/ui/MobileBlockPalette.tsx
export const MobileBlockPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const layoutConfig = useAdaptiveLayout();
  
  if (!layoutConfig.useBottomSheet) {
    return <SmartPalette />;
  }
  
  return (
    <>
      <FloatingActionButton 
        onClick={() => setIsOpen(true)}
        icon={IconAdd}
        label="Добавить блок"
      />
      
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Добавить блок"
        height="70vh"
      >
        <MobileQuickBlocks />
        <MobileBlockGrid />
      </BottomSheet>
    </>
  );
};

const MobileQuickBlocks = () => {
  const favoriteBlocks = useFavoriteBlocks();
  
  return (
    <div className="mobile-quick-blocks">
      <Text size="m" weight="medium">Часто используемые</Text>
      <div className="quick-blocks-grid">
        {favoriteBlocks.slice(0, 6).map(block => (
          <MobileBlockButton 
            key={block.id}
            block={block}
            size="large"
          />
        ))}
      </div>
    </div>
  );
};
```

### 4. Gesture Recognition System

```typescript
// shared/lib/useGestures.ts
export const useGestures = (element, options = {}) => {
  const [gestureState, setGestureState] = useState({
    isSwipe: false,
    isPinch: false,
    isLongPress: false
  });
  
  useEffect(() => {
    if (!element) return;
    
    let startTime;
    let startTouches = [];
    let longPressTimer;
    
    const handleTouchStart = (e) => {
      startTime = Date.now();
      startTouches = Array.from(e.touches);
      
      // Long press detection
      if (options.longPress) {
        longPressTimer = setTimeout(() => {
          setGestureState(prev => ({ ...prev, isLongPress: true }));
          options.onLongPress?.(e);
        }, options.longPressDelay || 500);
      }
    };
    
    const handleTouchMove = (e) => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
      
      // Pinch detection
      if (e.touches.length === 2 && options.pinch) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        
        options.onPinch?.(distance);
      }
      
      // Swipe detection
      if (e.touches.length === 1 && options.swipe) {
        const touch = e.touches[0];
        const startTouch = startTouches[0];
        
        if (startTouch) {
          const deltaX = touch.clientX - startTouch.clientX;
          const deltaY = touch.clientY - startTouch.clientY;
          
          if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
            const direction = Math.abs(deltaX) > Math.abs(deltaY)
              ? (deltaX > 0 ? 'right' : 'left')
              : (deltaY > 0 ? 'down' : 'up');
            
            options.onSwipe?.(direction, { deltaX, deltaY });
          }
        }
      }
    };
    
    const handleTouchEnd = () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
      }
      setGestureState({ isSwipe: false, isPinch: false, isLongPress: false });
    };
    
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [element, options]);
  
  return gestureState;
};
```

### 5. Mobile Canvas Interactions

```typescript
// widgets/editor/ui/MobileCanvas.tsx
export const MobileCanvas = ({ children }) => {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  
  useGestures(canvasRef.current, {
    pinch: true,
    onPinch: (distance) => {
      // Zoom canvas on pinch
      const newZoom = Math.max(0.5, Math.min(2, zoom * (distance / 100)));
      setZoom(newZoom);
    },
    
    swipe: true,
    onSwipe: (direction, { deltaX, deltaY }) => {
      // Pan canvas on swipe (when zoomed)
      if (zoom > 1) {
        setPan(prev => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY
        }));
      }
    },
    
    longPress: true,
    onLongPress: (e) => {
      // Show context menu on long press
      showContextMenu(e);
    }
  });
  
  return (
    <div 
      ref={canvasRef}
      className="mobile-canvas"
      style={{
        transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
        transformOrigin: 'center center'
      }}
    >
      {children}
      
      {zoom !== 1 && (
        <ZoomControls 
          zoom={zoom}
          onZoomIn={() => setZoom(prev => Math.min(2, prev + 0.1))}
          onZoomOut={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
          onReset={() => {
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }}
        />
      )}
    </div>
  );
};
```

### 6. Mobile-Specific Styling

```scss
// Mobile-first responsive design
.email-builder {
  // Mobile portrait (default)
  .editor-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    
    .editor-header {
      height: 56px;
      padding: 0 16px;
      border-bottom: 1px solid var(--color-bg-border);
    }
    
    .editor-canvas {
      flex: 1;
      overflow: auto;
      padding: 16px;
    }
    
    .editor-toolbar {
      height: 64px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-top: 1px solid var(--color-bg-border);
      background: var(--color-bg-default);
    }
  }
  
  // Mobile landscape
  @media (orientation: landscape) and (max-width: 768px) {
    .editor-layout {
      flex-direction: row;
      
      .block-palette {
        width: 200px;
        border-right: 1px solid var(--color-bg-border);
      }
      
      .editor-canvas {
        flex: 1;
      }
      
      .editor-toolbar {
        width: 64px;
        height: auto;
        flex-direction: column;
        border-left: 1px solid var(--color-bg-border);
        border-top: none;
      }
    }
  }
  
  // Tablet and up
  @media (min-width: 768px) {
    .editor-layout {
      flex-direction: row;
      
      .block-palette {
        width: 280px;
      }
      
      .config-panel {
        width: 320px;
        border-left: 1px solid var(--color-bg-border);
      }
    }
  }
}

// Touch-friendly sizes
.mobile-drag-handle {
  min-width: 44px;
  min-height: 44px;
  
  &.drag-mode {
    background: var(--color-bg-success);
    border-radius: var(--control-radius);
    
    .drag-mode-indicator {
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-bg-default);
      padding: 4px 8px;
      border-radius: var(--control-radius);
      box-shadow: var(--shadow-group);
      white-space: nowrap;
    }
  }
}

// Bottom sheet styles
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-bg-default);
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  
  .bottom-sheet-handle {
    width: 40px;
    height: 4px;
    background: var(--color-control-typo-ghost);
    border-radius: 2px;
    margin: 8px auto;
  }
  
  .bottom-sheet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid var(--color-bg-border);
  }
  
  .bottom-sheet-content {
    padding: 20px;
    overflow-y: auto;
    max-height: calc(100% - 80px);
  }
}
```

### 7. Performance Optimizations for Mobile

```typescript
// Intersection Observer for efficient rendering
const useMobileOptimizations = () => {
  const [visibleBlocks, setVisibleBlocks] = useState(new Set());
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const blockId = entry.target.dataset.blockId;
          if (entry.isIntersecting) {
            setVisibleBlocks(prev => new Set([...prev, blockId]));
          } else {
            setVisibleBlocks(prev => {
              const next = new Set(prev);
              next.delete(blockId);
              return next;
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all block elements
    document.querySelectorAll('[data-block-id]').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);
  
  return { visibleBlocks };
};

// Throttled touch events
const useThrottledTouch = (callback, delay = 16) => {
  const lastCall = useRef(0);
  
  return useCallback((...args) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  }, [callback, delay]);
};
```

🎨🎨🎨 EXITING CREATIVE PHASE - DECISION MADE 🎨🎨🎨

**Результат**: Спроектирована прогрессивная мобильная система с адаптивными компонентами
**Все творческие фазы завершены**: Готов к переходу в IMPLEMENT MODE
