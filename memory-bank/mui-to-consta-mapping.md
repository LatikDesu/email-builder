# Material-UI to Consta Component Mapping

## Analysis Summary
**Total MUI imports found**: 50+ files
**Main MUI components used**: Layout, Forms, Buttons, Icons, Feedback

## Component Mapping Table

### Layout Components
| Material-UI | Consta Equivalent | Notes |
|-------------|------------------|-------|
| `Stack` | `Layout` | Use Layout with direction prop |
| `Box` | `div` with CSS classes | Use Consta spacing system |
| `Paper` | `Card` | Card component for elevated surfaces |

### Form Components
| Material-UI | Consta Equivalent | Notes |
|-------------|------------------|-------|
| `TextField` | `TextField` | Direct equivalent available |
| `MenuItem` | `Select` options | Use Select component items |
| `InputLabel` | `Text` | Use Text component with appropriate size |
| `FormControlLabel` | Custom wrapper | Combine Checkbox/Switch with Text |
| `Switch` | `Switch` | Direct equivalent available |
| `Slider` | `Slider` | Direct equivalent available |

### Button Components
| Material-UI | Consta Equivalent | Notes |
|-------------|------------------|-------|
| `Button` | `Button` | Direct equivalent, map view prop |
| `IconButton` | `Button` | Use Button with iconLeft/iconRight |
| `ToggleButton` | `Button` | Use Button with checked state |
| `ToggleButtonGroup` | `RadioGroup` | For single selection |
| `ButtonBase` | `Button` | Use Button with view="clear" |

### Navigation Components
| Material-UI | Consta Equivalent | Notes |
|-------------|------------------|-------|
| `Tabs` | `Tabs` | Direct equivalent available |
| `Tab` | `Tabs.Tab` | Use Tabs component items |

### Feedback Components
| Material-UI | Consta Equivalent | Notes |
|-------------|------------------|-------|
| `Tooltip` | `Tooltip` | Direct equivalent available |
| `Snackbar` | `SnackBar` | Direct equivalent available |
| `Menu` | `ContextMenu` | Use ContextMenu for dropdown menus |

### Typography
| Material-UI | Consta Equivalent | Notes |
|-------------|------------------|-------|
| `Typography` | `Text` | Use Text with size and weight props |

### Theme Components
| Material-UI | Consta Equivalent | Notes |
|-------------|------------------|-------|
| `ThemeProvider` | `Theme` | Use Consta Theme component |
| `CssBaseline` | Not needed | Consta handles base styles |

### Icons
| Material-UI Icons | Consta Equivalent | Notes |
|------------------|------------------|-------|
| `@mui/icons-material` | `@consta/icons` | Replace with Consta icon set |
| Various icons | Equivalent Consta icons | Map specific icons as needed |

## Prop Mapping

### Button Props
| MUI Prop | Consta Prop | Values |
|----------|-------------|--------|
| `variant="contained"` | `view="primary"` | Primary button style |
| `variant="outlined"` | `view="secondary"` | Secondary button style |
| `variant="text"` | `view="clear"` | Text button style |
| `color="primary"` | `view="primary"` | Primary color |
| `color="secondary"` | `view="secondary"` | Secondary color |

### TextField Props
| MUI Prop | Consta Prop | Notes |
|----------|-------------|-------|
| `label` | `label` | Direct mapping |
| `value` | `value` | Direct mapping |
| `onChange` | `onChange` | Direct mapping |
| `variant` | `view` | Map variants to views |

### Typography Props
| MUI Prop | Consta Prop | Values |
|----------|-------------|--------|
| `variant="h1"` | `size="3xl"` | Largest heading |
| `variant="h2"` | `size="2xl"` | Large heading |
| `variant="h3"` | `size="xl"` | Medium heading |
| `variant="h4"` | `size="l"` | Small heading |
| `variant="h5"` | `size="m"` | Body large |
| `variant="h6"` | `size="s"` | Body medium |
| `variant="body1"` | `size="m"` | Body text |
| `variant="body2"` | `size="s"` | Small text |

## Migration Strategy

### Phase 1: Core Components (Week 1)
- [ ] Replace Button components
- [ ] Replace Typography → Text
- [ ] Replace basic layout (Stack, Box)
- [ ] Update theme provider

### Phase 2: Form Components (Week 2)
- [ ] Replace TextField components
- [ ] Replace form controls (Switch, Slider)
- [ ] Replace input labels
- [ ] Update form validation styling

### Phase 3: Complex Components (Week 3)
- [ ] Replace Tabs navigation
- [ ] Replace Menu/Dropdown components
- [ ] Replace feedback components (Tooltip, Snackbar)
- [ ] Update icon usage

### Phase 4: Polish & Cleanup (Week 4)
- [ ] Remove MUI dependencies
- [ ] Update custom components
- [ ] Final styling adjustments
- [ ] Performance testing

## Breaking Changes to Address

### 1. Theme Structure
- MUI theme object structure differs from Consta
- Need to migrate custom theme values
- Update theme provider setup

### 2. CSS-in-JS vs CSS Classes
- MUI uses emotion/styled-components
- Consta uses CSS classes and CSS variables
- Update styling approach

### 3. Icon Import Paths
- Change from `@mui/icons-material` to `@consta/icons`
- Map icon names to Consta equivalents
- Update icon sizes and colors

### 4. Event Handlers
- Some event handler signatures may differ
- Update onChange, onClick handlers as needed

### 5. Responsive Breakpoints
- MUI and Consta may have different breakpoint systems
- Update responsive design accordingly

## Custom Components Requiring Redesign

### 1. Color Picker Components
- `ColorInput/BaseColorInput.tsx`
- `ColorInput/Picker.tsx`
- `ColorInput/Swatch.tsx`
- **Action**: Redesign with Consta components

### 2. Complex Form Inputs
- `ColumnWidthsInput.tsx`
- `PaddingInput.tsx`
- `FontSizeInput.tsx`
- **Action**: Rebuild with Consta form components

### 3. Block Menu System
- `AddBlockMenu/BlocksMenu.tsx`
- `AddBlockMenu/BlockButton.tsx`
- **Action**: Redesign as Consta-based draggable palette

### 4. Editor Wrapper Components
- `EditorBlockWrapper.tsx`
- `TuneMenu.tsx`
- **Action**: Update with Consta styling and drag handles

## Compatibility Bridge Strategy

Create temporary bridge components to ease migration:

```typescript
// Example bridge component
export const CompatButton = ({ variant, color, ...props }) => {
  const constaProps = {
    view: mapVariantToView(variant),
    status: mapColorToStatus(color),
    ...props
  };
  return <ConstaButton {...constaProps} />;
};
```

## Testing Strategy

### 1. Component-by-Component Testing
- Test each migrated component individually
- Verify visual consistency
- Check functionality preservation

### 2. Integration Testing
- Test component interactions
- Verify form workflows
- Check responsive behavior

### 3. Visual Regression Testing
- Compare before/after screenshots
- Ensure design consistency
- Validate theme application

## Timeline Estimation

- **Week 1**: Core components (Buttons, Typography, Layout) - 25%
- **Week 2**: Form components (Inputs, Controls) - 50%
- **Week 3**: Complex components (Navigation, Feedback) - 75%
- **Week 4**: Polish, cleanup, testing - 100%

**Total Estimated Time**: 4 weeks
**Risk Level**: Medium (due to extensive MUI usage)
**Mitigation**: Gradual migration with bridge components 