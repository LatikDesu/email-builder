# Consta Migration Patterns - Конкретные примеры

## 1. Группы кнопок с переключением primary/ghost view

### Паттерн TextAlignInput (выравнивание текста с иконками)
```tsx
// До: MUI ToggleButton
<ToggleButton value="left">
  <FormatAlignLeftOutlined fontSize="small" />
</ToggleButton>

// После: Consta Button group
<Button
  size="s"
  view={value === 'left' ? 'primary' : 'ghost'}  // ← Переключение состояния
  iconLeft={IconAlignLeft}                        // ← Consta иконка
  onlyIcon
  onClick={() => handleChange('left')}
/>
```

### Паттерн FontWeightInput (жирность текста с лейблами)
```tsx
// До: MUI ToggleButton
<ToggleButton value="normal">Regular</ToggleButton>
<ToggleButton value="bold">Bold</ToggleButton>

// После: Consta Button group
<Button
  size="s"
  view={value === 'normal' ? 'primary' : 'ghost'}  // ← Переключение состояния
  label="Regular"                                   // ← Текстовый лейбл
  onClick={() => handleChange('normal')}
/>
```

## 2. Интеграция Consta иконок с правильным размером

### Миграция иконок выравнивания
```tsx
// До: MUI иконки
import { FormatAlignLeftOutlined, FormatAlignCenterOutlined, FormatAlignRightOutlined } from '@mui/icons-material'

// После: Consta иконки
import { IconAlignLeft } from '@consta/icons/IconAlignLeft'
import { IconAlignCenter } from '@consta/icons/IconAlignCenter'
import { IconAlignRight } from '@consta/icons/IconAlignRight'

// Использование в Button
iconLeft={IconAlignLeft}  // ← Прямая передача компонента иконки
```

### Миграция иконок действий
```tsx
// До: MUI иконки
import { FileUploadOutlined, FileDownloadOutlined } from '@mui/icons-material'

// После: Consta иконки
import { IconUpload } from '@consta/icons/IconUpload'
import { IconDownload } from '@consta/icons/IconDownload'
```

## 3. Обработка загрузок файлов без href атрибутов

### До: MUI IconButton с href
```tsx
<IconButton href={href} download="emailTemplate.json">
  <FileDownloadOutlined fontSize="small" />
</IconButton>
```

### После: Consta Button с программным созданием ссылок
```tsx
const handleDownload = () => {
  const link = document.createElement('a')     // ← Программное создание ссылки
  link.href = href
  link.download = 'emailTemplate.json'
  document.body.appendChild(link)
  link.click()                                 // ← Программный клик
  document.body.removeChild(link)              // ← Очистка DOM
}

<Button
  onClick={handleDownload}                     // ← Обработчик вместо href
  view="ghost"
  size="s"
  iconLeft={IconDownload}
  onlyIcon
/>
```

## 4. Управление состоянием для визуальной обратной связи

### Паттерн состояния в группах кнопок
```tsx
const [value, setValue] = useState(defaultValue ?? 'left')

const handleChange = (newValue: string) => {
  setValue(newValue)      // ← Локальное состояние
  onChange(newValue)      // ← Уведомление родителя
}

// Визуальная обратная связь через view prop
view={value === 'left' ? 'primary' : 'ghost'}  // ← Условное отображение
```

### Паттерн группировки кнопок
```tsx
const buttonGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '4px'              // ← Консистентные отступы между кнопками
}

<div style={buttonGroupStyle}>
  {/* Группа кнопок */}
</div>
```

## 5. Миграция Tooltip компонентов

### До: MUI Tooltip
```tsx
import { Tooltip } from '@mui/material'

<Tooltip title="Import JSON">
  <IconButton>...</IconButton>
</Tooltip>
```

### После: Consta Tooltip
```tsx
import { Tooltip } from '@consta/uikit/Tooltip'

<Tooltip content="Import JSON">  {/* ← title → content */}
  <Button>...</Button>
</Tooltip>
```

## 6. Стилизация компонентов

### Консистентные стили контейнеров
```tsx
const containerStyle: React.CSSProperties = {
  width: '100%',
  marginBottom: '16px'
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--email-builder-text-primary)',  // ← CSS переменные темы
  marginBottom: '8px'
}
```

## Что вы должны видеть в интерфейсе:

1. **Template Action Buttons** (правый верхний угол):
   - Кнопка загрузки с иконкой стрелки вверх (IconUpload)
   - Кнопка скачивания с иконкой стрелки вниз (IconDownload)
   - Обе кнопки должны быть видимыми с view="ghost"

2. **Text Alignment Controls** (в боковой панели):
   - Три кнопки с иконками выравнивания
   - Активная кнопка выделена синим (view="primary")
   - Неактивные кнопки серые (view="ghost")

3. **Font Weight Controls**:
   - Две кнопки "Regular" и "Bold"
   - Переключение между primary/ghost состояниями 