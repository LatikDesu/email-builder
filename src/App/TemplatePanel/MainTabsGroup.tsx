import React from 'react'

import { IconCode } from '@consta/icons/IconCode'
import { IconData } from '@consta/icons/IconData'
import { IconEdit } from '@consta/icons/IconEdit'
import { IconEye } from '@consta/icons/IconEye'
import { Tabs } from '@consta/uikit/Tabs'

import { setSelectedMainTab, useSelectedMainTab } from '../../documents/editor/EditorContext'

type MainTab = 'editor' | 'preview' | 'html' | 'json'

const mainTabs = [
  { 
    id: 'editor' as MainTab, 
    label: 'Edit',
    icon: IconEdit
  },
  { 
    id: 'preview' as MainTab, 
    label: 'Preview',
    icon: IconEye
  },
  { 
    id: 'html' as MainTab, 
    label: 'HTML',
    icon: IconCode
  },
  { 
    id: 'json' as MainTab, 
    label: 'JSON',
    icon: IconData
  }
]

export default function MainTabsGroup() {
  const selectedMainTab = useSelectedMainTab()
  
  const selectedTab = mainTabs.find(tab => tab.id === selectedMainTab) || mainTabs[0]

  const handleChange = (value: typeof mainTabs[0]) => {
    if (value) {
      setSelectedMainTab(value.id)
    }
  }

  const getItemLabel = (tab: typeof mainTabs[0]) => {
    return tab.label
  }

  const getItemIcon = (tab: typeof mainTabs[0]) => {
    return tab.icon
  }

  return (
    <Tabs
      value={selectedTab}
      items={mainTabs}
      view="bordered"
      linePosition="bottom"
      fitMode="scroll"
      size="m"
      onChange={handleChange}
      getItemLabel={getItemLabel}
      getItemIcon={getItemIcon}
    />
  )
}

