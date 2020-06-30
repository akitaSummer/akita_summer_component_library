import React, { FC, useState, DragEvent } from "react";
import classNames from "classnames";

interface DraggerProps {
  onFile: (files: FileList) => void
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props
  const [ dragOver, setDargOver ] = useState(false)
  const classes = classNames('akita-uploader-dragger', {
    'is-dragover': dragOver
  })
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDargOver(over)
  }
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDargOver(false)
    onFile(e.dataTransfer.files)
  }
  return (
    <div
      className={classes}
      onDragOver={e => { handleDrag(e, true) }}
      onDragLeave={e => { handleDrag(e, false)}}
      onDrop={handleDrop}
    >
      { children }
    </div>
  )
}

export default Dragger
