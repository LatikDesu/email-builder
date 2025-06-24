import React, { useState } from 'react'

import { Switch } from '@consta/uikit/Switch'

type Props = {
  label: string;
  defaultValue: boolean;
  onChange: (value: boolean) => void;
};

export default function BooleanInput({ label, defaultValue, onChange }: Props) {
  const [value, setValue] = useState(defaultValue);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--email-builder-text-primary)',
    cursor: 'pointer'
  };

  const handleChange = () => {
    const newValue = !value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div style={containerStyle}>
      <Switch
        checked={value}
        onChange={handleChange}
      />
      <label style={labelStyle} onClick={handleChange}>
        {label}
      </label>
    </div>
  );
}
