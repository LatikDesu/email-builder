import React, { useState } from 'react'

import { IconUpload } from '@consta/icons/IconUpload'
import { Button } from '@consta/uikit/Button'

import ImportJsonDialog from './ImportJsonDialog'

export default function ImportJson() {
  const [open, setOpen] = useState(false)

  let dialog = null
  if (open) {
    dialog = <ImportJsonDialog onClose={() => setOpen(false)} />
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        view="ghost"
        size="s"
        iconLeft={IconUpload}
        onlyIcon
        title="Import JSON"
      />
      {dialog}
    </>
  )
}
