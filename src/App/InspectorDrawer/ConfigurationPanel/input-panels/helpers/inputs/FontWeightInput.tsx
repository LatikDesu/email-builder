import React, { useState } from 'react'

import { Button } from '@consta/uikit/Button'

type Props = {
  label: string;
  defaultValue: string;
  onChange: (value: string) => void;
};

export default function FontWeightInput({ label, defaultValue, onChange }: Props) {
  const [value, setValue] = useState(defaultValue);

  const containerStyle: React.CSSProperties = {
    width: '100%',
    marginBottom: '16px'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--email-builder-text-primary)',
    marginBottom: '8px'
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: 'flex',
    gap: '4px'
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>{label}</label>
      <div style={buttonGroupStyle}>
        <Button
          size="s"
          view={value === 'normal' ? 'primary' : 'ghost'}
          label="Regular"
          onClick={() => handleChange('normal')}
        />
        <Button
          size="s"
          view={value === 'bold' ? 'primary' : 'ghost'}
          label="Bold"
          onClick={() => handleChange('bold')}
        />
      </div>
    </div>
  );
}
