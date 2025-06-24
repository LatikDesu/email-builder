import React from 'react'

import { Text } from '@consta/uikit/Text'

type BlockMenuButtonProps = {
  label: string
  icon: React.ReactNode
  onClick: () => void
}

export default function BlockTypeButton({ label, icon, onClick }: BlockMenuButtonProps) {
  const buttonStyle: React.CSSProperties = {
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    minHeight: '80px',
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  }

  const iconContainerStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'var(--email-builder-cadet-200, #E6EEF3)',
    display: 'flex',
    justifyContent: 'center',
    padding: '8px',
    border: '1px solid var(--email-builder-cadet-300, #DCE4EA)',
    borderRadius: '4px',
    marginBottom: '6px'
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'var(--email-builder-cadet-100, #F0F5F8)'
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent'
  }

  return (
    <button
      style={buttonStyle}
      onClick={(ev) => {
        ev?.stopPropagation()
        onClick()
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={iconContainerStyle}>
        {icon}
      </div>
      <Text size="s" align="center">
        {label}
      </Text>
    </button>
  )
}
