import React, { useState } from 'react'

import { ChoiceGroup } from '@consta/uikit/ChoiceGroup'

type ChoiceItem = {
  id: string
  label: string
  value: string
}

type Props = {
  label: string | JSX.Element
  children: JSX.Element | JSX.Element[]
  defaultValue: string
  onChange: (v: string) => void
}

export default function RadioGroupInput({ label, children, defaultValue, onChange }: Props) {
  const [value, setValue] = useState(defaultValue)

  const containerStyle: React.CSSProperties = {
    width: '100%',
    marginBottom: '16px'
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--email-builder-text-primary)',
    marginBottom: '8px'
  }

  // Преобразуем children в items для ChoiceGroup
  const items: ChoiceItem[] = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && child.props && typeof child.props === 'object' && 'value' in child.props) {
      const props = child.props as { value: string; children?: React.ReactNode }
      return {
        id: props.value,
        label: props.value,
        value: props.value
      }
    }
    return {
      id: `item-${index}`,
      label: `Item ${index}`,
      value: `item-${index}`
    }
  }) || []

  const selectedItem = items.find(item => item.value === value) || null

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <ChoiceGroup
        name="radio-group"
        value={selectedItem}
        items={items}
        getItemLabel={(item: ChoiceItem) => item.label}
        onChange={(item: ChoiceItem | null) => {
          if (item) {
            setValue(item.value)
            onChange(item.value)
          }
        }}
        size="s"
        view="ghost"
        multiple={false}
      />
    </div>
  )
}
