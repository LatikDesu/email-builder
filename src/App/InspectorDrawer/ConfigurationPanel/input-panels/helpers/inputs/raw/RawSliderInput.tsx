import React from 'react'

import { Slider } from '@consta/uikit/Slider'

type SliderInputProps = {
  iconLabel: JSX.Element;

  step?: number;
  marks?: boolean;
  units: string;
  min?: number;
  max?: number;

  value: number;
  setValue: (v: number) => void;
};

export default function RawSliderInput({ iconLabel, value, setValue, units, ...props }: SliderInputProps) {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    width: '100%',
    marginBottom: '16px'
  };

  const iconStyle: React.CSSProperties = {
    minWidth: '24px',
    lineHeight: 1,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const sliderStyle: React.CSSProperties = {
    flex: 1
  };

  const valueStyle: React.CSSProperties = {
    minWidth: '32px',
    textAlign: 'right',
    flexShrink: 0,
    fontSize: '12px',
    color: 'var(--email-builder-text-secondary)',
    lineHeight: 1
  };

  return (
    <div style={containerStyle}>
      <div style={iconStyle}>{iconLabel}</div>
      <div style={sliderStyle}>
        <Slider
          {...props}
          value={value}
          onChange={(value) => {
            if (typeof value !== 'number') {
              throw new Error('RawSliderInput values can only receive numeric values');
            }
            setValue(value);
          }}
        />
      </div>
      <div style={valueStyle}>
        {value}{units}
      </div>
    </div>
  );
}
