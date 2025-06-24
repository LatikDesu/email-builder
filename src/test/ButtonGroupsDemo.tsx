import React from 'react'

import FontWeightInput from '../App/InspectorDrawer/ConfigurationPanel/input-panels/helpers/inputs/FontWeightInput'
import TextAlignInput from '../App/InspectorDrawer/ConfigurationPanel/input-panels/helpers/inputs/TextAlignInput'

export default function ButtonGroupsDemo() {
  const containerStyle: React.CSSProperties = {
    padding: '20px',
    backgroundColor: 'white',
    maxWidth: '400px',
    margin: '20px'
  }

  const sectionStyle: React.CSSProperties = {
    marginBottom: '30px',
    padding: '15px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px'
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '15px',
    color: '#333'
  }

  const descriptionStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '15px'
  }

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Группы кнопок с переключением primary/ghost view</h1>
      
      <div style={sectionStyle}>
        <div style={titleStyle}>1. TextAlignInput - Выравнивание текста</div>
        <div style={descriptionStyle}>
          Три кнопки с иконками. Активная кнопка синяя (primary), неактивные серые (ghost).
        </div>
        <TextAlignInput 
          label="Text Alignment" 
          defaultValue="left" 
          onChange={(value) => console.log('Alignment changed:', value)} 
        />
      </div>

      <div style={sectionStyle}>
        <div style={titleStyle}>2. FontWeightInput - Жирность текста</div>
        <div style={descriptionStyle}>
          Две кнопки с текстом. Активная кнопка синяя (primary), неактивная серая (ghost).
        </div>
        <FontWeightInput 
          label="Font Weight" 
          defaultValue="normal" 
          onChange={(value) => console.log('Weight changed:', value)} 
        />
      </div>

      <div style={sectionStyle}>
        <div style={titleStyle}>Как это работает:</div>
        <div style={descriptionStyle}>
          • Кликните на кнопки чтобы увидеть переключение<br/>
          • Активная кнопка становится синей (view="primary")<br/>
          • Неактивные кнопки серые (view="ghost")<br/>
          • Состояние управляется через useState<br/>
          • Изменения выводятся в консоль браузера
        </div>
      </div>
    </div>
  )
} 