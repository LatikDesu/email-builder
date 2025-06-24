import React, { useState } from 'react'
import App from './App'
import { DnDTest } from './test/DnDTest'

export default function TestApp() {
  const [mode, setMode] = useState<'main' | 'test'>('test')

  return (
    <div>
      {/* Mode switcher */}
      <div style={{ 
        position: 'fixed', 
        top: 10, 
        right: 10, 
        zIndex: 10000,
        background: 'white',
        padding: '8px',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #ddd'
      }}>
        <button 
          onClick={() => setMode('main')}
          style={{
            marginRight: '8px',
            padding: '4px 8px',
            background: mode === 'main' ? '#007bff' : '#f8f9fa',
            color: mode === 'main' ? 'white' : '#333',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Main App
        </button>
        <button 
          onClick={() => setMode('test')}
          style={{
            padding: '4px 8px',
            background: mode === 'test' ? '#007bff' : '#f8f9fa',
            color: mode === 'test' ? 'white' : '#333',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          DnD Test
        </button>
      </div>

      {/* Content */}
      {mode === 'main' ? <App /> : <DnDTest />}
    </div>
  )
} 