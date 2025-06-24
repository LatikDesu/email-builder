import React, { useMemo } from 'react'

import { IconDownload } from '@consta/icons/IconDownload'
import { Button } from '@consta/uikit/Button'

import { useDocument } from '../../../documents/editor/EditorContext'

export default function DownloadJson() {
  const doc = useDocument()
  const href = useMemo(() => {
    return `data:text/plain,${encodeURIComponent(JSON.stringify(doc, null, '  '))}`
  }, [doc])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = href
    link.download = 'emailTemplate.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button
      onClick={handleDownload}
      view="ghost"
      size="s"
      iconLeft={IconDownload}
      onlyIcon
      title="Download JSON file"
    />
  )
}
