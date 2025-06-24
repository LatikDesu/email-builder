import React, { useState } from 'react'

import { TextField } from '@consta/uikit/TextField'

type Props = {
  label: string
  rows?: number
  placeholder?: string
  helperText?: string | JSX.Element
  defaultValue: string
  className?: string
  onChange: (v: string) => void
}

export default function TextInput({ 
  helperText, 
  label, 
  placeholder, 
  rows, 
  defaultValue, 
  className, 
  onChange 
}: Props) {
  const [value, setValue] = useState(defaultValue)
  const isMultiline = typeof rows === 'number' && rows > 1

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

  const helperStyle: React.CSSProperties = {
    fontSize: '12px',
    color: 'var(--email-builder-text-secondary)',
    marginTop: '4px'
  }

  const textFieldStyle: React.CSSProperties = {
    width: '100%'
  }

  return (
    <div style={containerStyle} className={className}>
      {label && <label style={labelStyle}>{label}</label>}
      <TextField
        value={value}
        placeholder={placeholder}
        type={isMultiline ? 'textarea' : 'text'}
        rows={isMultiline ? rows : undefined}
        style={textFieldStyle}
        onChange={(value) => {
          setValue(value || '')
          onChange(value || '')
        }}
      />
      {helperText && <div style={helperStyle}>{helperText}</div>}
    </div>
  )
}
