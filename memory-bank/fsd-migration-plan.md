# FSD Migration Plan - От Смешанной к Чистой Архитектуре

## 🔍 **АНАЛИЗ ТЕКУЩЕГО СОСТОЯНИЯ**

### **Проблема**: Смешанная архитектура
У нас одновременно существуют:
- ✅ **FSD слои**: `app/`, `entities/`, `features/`, `shared/`, `widgets/`, `pages/`
- ❌ **Старые директории**: `App/`, `documents/`, `getConfiguration/`
- ❌ **Смешанные импорты**: Часть из FSD, часть из старой структуры

### **Риски текущего состояния**:
- Сложность навигации и понимания кода
- Дублирование логики в разных местах
- Нарушение принципов FSD (изоляция слоев)
- Сложность поддержки и развития

## 📋 **ДЕТАЛЬНЫЙ ПЛАН МИГРАЦИИ**

### **Phase 1: Анализ и Подготовка**

#### 1.1 Полный аудит существующих файлов
```bash
# Найти все импорты из старых директорий
grep -r "from '\./App" src/
grep -r "from '\./documents" src/
grep -r "from '\./getConfiguration" src/
```

#### 1.2 Картирование компонентов
| Старое местоположение | Новое FSD местоположение | Слой |
|----------------------|--------------------------|------|
| `src/App/` | `src/widgets/app/` | widgets |
| `src/documents/editor/` | `src/entities/editor/` | entities |
| `src/documents/blocks/` | `src/entities/block/` | entities |
| `src/getConfiguration/` | `src/shared/config/` | shared |

### **Phase 2: Миграция по слоям**

#### 2.1 Entities Layer Migration
**Цель**: Переместить `src/documents/` → `src/entities/`

**Шаги**:
1. **Migrate Editor Entity**
   ```
   src/documents/editor/ → src/entities/editor/
   ├── core.tsx → entities/editor/lib/core.ts
   ├── EditorBlock.tsx → entities/editor/ui/EditorBlock.tsx
   ├── EditorContext.tsx → entities/editor/store/EditorContext.ts
   └── GlobalDnDProvider.tsx → entities/editor/providers/GlobalDnDProvider.tsx
   ```

2. **Migrate Block Entity**
   ```
   src/documents/blocks/ → src/entities/block/
   ├── helpers/ → entities/block/lib/
   ├── ColumnsContainer/ → entities/block/ui/ColumnsContainer/
   ├── Container/ → entities/block/ui/Container/
   └── EmailLayout/ → entities/block/ui/EmailLayout/
   ```

#### 2.2 Widgets Layer Migration
**Цель**: Переместить `src/App/` → `src/widgets/`

**Шаги**:
1. **Main App Widget**
   ```
   src/App/index.tsx → src/widgets/app/ui/App.tsx
   ```

2. **Template Panel Widget**
   ```
   src/App/TemplatePanel/ → src/widgets/template-panel/
   ├── index.tsx → ui/TemplatePanel.tsx
   ├── HtmlPanel.tsx → ui/HtmlPanel.tsx
   ├── JsonPanel.tsx → ui/JsonPanel.tsx
   └── MainTabsGroup.tsx → ui/MainTabsGroup.tsx
   ```

3. **Inspector Drawer Widget**
   ```
   src/App/InspectorDrawer/ → src/widgets/inspector-drawer/
   ├── index.tsx → ui/InspectorDrawer.tsx
   ├── ConfigurationPanel/ → ui/ConfigurationPanel/
   └── EmailSettingsPanel.tsx → ui/EmailSettingsPanel.tsx
   ```

#### 2.3 Shared Layer Migration
**Цель**: Переместить `src/getConfiguration/` → `src/shared/`

**Шаги**:
1. **Configuration**
   ```
   src/getConfiguration/ → src/shared/config/
   ├── index.tsx → config/configuration.ts
   └── sample/ → config/samples/
   ```

2. **Theme Migration**
   ```
   src/theme.ts → src/shared/config/legacy-theme.ts (временно)
   ```

## 🎯 **IMMEDIATE ACTION PLAN**

### **Сейчас нужно**:
1. **Заморозить добавление нового функционала** до завершения миграции
2. **Выбрать стратегию**: Big Bang vs Постепенная миграция
3. **Создать migration checklist** для каждого компонента

### **Рекомендуемая стратегия**: Постепенная миграция
- Неделя 1: Entities (editor, block)
- Неделя 2: Widgets (app, template-panel, inspector-drawer)  
- Неделя 3: Shared (config) + cleanup
- Неделя 4: Тестирование и валидация

## 📊 **ТЕКУЩИЙ СТАТУС**

**FSD Migration Progress: 20%**
- ✅ Базовая FSD структура создана
- ❌ Компоненты не мигрированы
- ❌ Импорты смешанные
- ❌ Старые директории не удалены

**Критичность**: ВЫСОКАЯ - архитектурный долг растет
