# Material-UI to Consta Migration Guide

## Phase 4.1: Component Migration Mapping

**Status**: Phase 4 - Active Migration
**Priority**: High - Core UI Migration

---

## 📊 **MUI Component Audit Results**

### Found MUI Components (38 files):
- **Layout**: Box, Stack, Paper
- **Navigation**: Tabs, Tab, ToggleButton, ToggleButtonGroup, Menu
- **Inputs**: TextField, Slider, Switch, Button, ButtonBase, IconButton
- **Display**: Typography, InputLabel, FormControlLabel
- **Feedback**: Tooltip, Snackbar
- **Utils**: Drawer, Dialog, CssBaseline, ThemeProvider

---

## 🎯 **Migration Strategy**

### Priority 1: Core Layout & Typography
```
Box → Consta Layout/div with CSS classes
Stack → Consta Layout with direction prop
Typography → Consta Text component
```

### Priority 2: Form Inputs
```
TextField → Consta TextField
Button → Consta Button
IconButton → Consta Button with iconOnly
Switch → Consta Switch
Slider → Consta Slider
```

### Priority 3: Navigation & Feedback
```
Tabs/Tab → Consta Tabs/Tab
ToggleButton → Consta ChoiceGroup
Menu → Consta ContextMenu
Tooltip → Consta Tooltip
```

---

## 📋 **Detailed Component Mapping**

### 1. Layout Components

| MUI Component | Consta Equivalent | Migration Notes |
|---------------|-------------------|-----------------|
| `Box` | `<div>` + CSS classes | Use Consta spacing/layout utilities |
| `Stack` | `Layout` | Use `direction`, `space` props |
| `Paper` | `Card` | Use Consta Card with appropriate shadow |
| `Container` | `Layout` | Use maxWidth with Consta breakpoints |

**Example Migration:**
```tsx
// Before (MUI)
<Box sx={{ p: 2, m: 1 }}>
  <Stack direction="row" spacing={2}>
    <Typography variant="h6">Title</Typography>
  </Stack>
</Box>

// After (Consta)
<Layout className="p-2 m-1">
  <Layout direction="row" space="s">
    <Text size="l" weight="semibold">Title</Text>
  </Layout>
</Layout>
```

### 2. Form Input Components

| MUI Component | Consta Equivalent | Migration Notes |
|---------------|-------------------|-----------------|
| `TextField` | `TextField` | Similar API, check validation props |
| `Button` | `Button` | Map variant: contained→primary, outlined→secondary |
| `IconButton` | `Button` | Use `iconOnly` prop, `size="xs"` |
| `Switch` | `Switch` | Similar API |
| `Slider` | `Slider` | Check value/onChange API differences |

**Example Migration:**
```tsx
// Before (MUI)
<TextField
  variant="outlined"
  label="Email"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
<Button variant="contained" color="primary">
  Submit
</Button>

// After (Consta)
<TextField
  label="Email"
  value={value}
  onChange={({ value }) => setValue(value)}
/>
<Button view="primary" label="Submit" />
```

### 3. Navigation Components

| MUI Component | Consta Equivalent | Migration Notes |
|---------------|-------------------|-----------------|
| `Tabs` | `Tabs` | Similar API, check tab structure |
| `Tab` | `Tab` | Use within Consta Tabs |
| `ToggleButton` | `ChoiceGroup` | For single/multiple selection |
| `ToggleButtonGroup` | `ChoiceGroup` | Use `multiple` prop |
| `Menu` | `ContextMenu` | Check positioning and trigger |

### 4. Feedback Components

| MUI Component | Consta Equivalent | Migration Notes |
|---------------|-------------------|-----------------|
| `Tooltip` | `Tooltip` | Similar API |
| `Snackbar` | `SnackBar` | Check positioning and actions |
| `Dialog` | `Modal` | Use Consta Modal component |
| `Drawer` | `Sidebar` | Use Consta Sidebar |

### 5. Theme & Styling

| MUI Concept | Consta Equivalent | Migration Notes |
|-------------|-------------------|-----------------|
| `ThemeProvider` | `Theme` | Use Consta Theme component |
| `useTheme()` | `useTheme()` | Consta hook, different structure |
| `sx` prop | CSS classes | Use Consta design tokens |
| `styled()` | CSS modules | Prefer Consta utilities |

---

## 🔄 **Migration Phases**

### Phase 4.1: Core Components (Current)
- [x] Audit all MUI usage (38 files found)
- [ ] Migrate theme system (ThemeProvider → Theme)
- [ ] Replace Box/Stack with Layout
- [ ] Replace Typography with Text
- [ ] Update main app layout

### Phase 4.2: Form Components
- [ ] Migrate all TextField instances
- [ ] Replace Button/IconButton
- [ ] Update Switch/Slider components
- [ ] Migrate form validation

### Phase 4.3: Complex Components
- [ ] Migrate Tabs/Tab navigation
- [ ] Replace ToggleButton with ChoiceGroup
- [ ] Update Menu/ContextMenu
- [ ] Migrate Dialog/Modal

### Phase 4.4: Cleanup & Polish
- [ ] Remove MUI dependencies
- [ ] Update imports across codebase
- [ ] Test all migrated components
- [ ] Performance optimization

---

## 📁 **File-by-File Migration Plan**

### High Priority Files (Core App):
1. `src/main.tsx` - ThemeProvider → Theme
2. `src/App/index.tsx` - Stack → Layout
3. `src/theme.ts` - Complete theme migration
4. `src/App/InspectorDrawer/index.tsx` - Drawer → Sidebar

### Medium Priority (Components):
5. All `input-panels/*.tsx` - Form components
6. `TemplatePanel/*.tsx` - Navigation components
7. `blocks/helpers/*.tsx` - Layout components

### Low Priority (Block Editors):
8. Block-specific components
9. Utility components
10. Test components

---

## 🎯 **Success Criteria**

### Phase 4.1 Complete When:
- [ ] No MUI imports in core app files
- [ ] Consta theme fully configured
- [ ] Main layout using Consta components
- [ ] Typography migrated to Text
- [ ] Build passes without MUI warnings

### Phase 4 Complete When:
- [ ] Zero MUI dependencies
- [ ] All components use Consta
- [ ] Visual consistency maintained
- [ ] Performance equal or better
- [ ] Accessibility preserved

---

## ⚠️ **Migration Risks & Mitigation**

### Risk: API Differences
**Mitigation**: Create wrapper components for complex migrations

### Risk: Visual Regression
**Mitigation**: Component-by-component testing with screenshots

### Risk: Performance Impact
**Mitigation**: Bundle size monitoring and performance testing

### Risk: Accessibility Loss
**Mitigation**: A11y testing after each component migration

---

## 🔧 **Migration Tools & Utilities**

### Automated Migration Helpers:
```bash
# Find all MUI imports
grep -r "@mui/material" src/ --include="*.tsx" --include="*.ts"

# Find specific components
grep -r "import.*{.*Button.*}" src/ --include="*.tsx"

# Replace imports (example)
sed -i 's/@mui\/material/\@consta\/uikit/g' file.tsx
```

### Component Wrapper Pattern:
```tsx
// Temporary wrapper for gradual migration
import { Button as MuiButton } from '@mui/material'
import { Button as ConstaButton } from '@consta/uikit'

export const Button = USE_CONSTA ? ConstaButton : MuiButton
```

---

**Next Steps**: Begin with theme migration and core layout components. 