import React from 'react'

import { IconAdd } from '@consta/icons/IconAdd'

type Props = {
  onClick: () => void
}

export default function PlaceholderButton({ onClick }: Props) {
  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '48px',
    width: '100%',
    backgroundColor: 'rgba(0,0,0, 0.05)',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease'
  }

  const iconStyle: React.CSSProperties = {
    padding: '2px',
    backgroundColor: 'var(--email-builder-brand-blue, #0078D4)',
    borderRadius: '50%',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px'
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'rgba(0,0,0, 0.1)'
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'rgba(0,0,0, 0.05)'
  }

  return (
    <button
      onClick={(ev) => {
        ev.stopPropagation()
        onClick()
      }}
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={iconStyle}>
        <IconAdd size="xs" />
      </div>
    </button>
  )
}
