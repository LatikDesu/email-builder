import React, { useState } from 'react'

import { IconAlignCenter } from '@consta/icons/IconAlignCenter'
import { IconAlignLeft } from '@consta/icons/IconAlignLeft'
import { IconAlignRight } from '@consta/icons/IconAlignRight'
import { Button } from '@consta/uikit/Button'

type Props = {
  label: string
  defaultValue: string | null
  onChange: (value: string | null) => void
}

export default function TextAlignInput({ label, defaultValue, onChange }: Props) {
  const [value, setValue] = useState(defaultValue ?? 'left')

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

  const buttonGroupStyle: React.CSSProperties = {
    display: 'flex',
    gap: '4px'
  }

  const handleChange = (newValue: string) => {
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>{label}</label>
      <div style={buttonGroupStyle}>
        <Button
          size="s"
          view={value === 'left' ? 'primary' : 'ghost'}
          iconLeft={IconAlignLeft}
          onlyIcon
          onClick={() => handleChange('left')}
        />
        <Button
          size="s"
          view={value === 'center' ? 'primary' : 'ghost'}
          iconLeft={IconAlignCenter}
          onlyIcon
          onClick={() => handleChange('center')}
        />
        <Button
          size="s"
          view={value === 'right' ? 'primary' : 'ghost'}
          iconLeft={IconAlignRight}
          onlyIcon
          onClick={() => handleChange('right')}
        />
      </div>
    </div>
  )
}
