import React from 'react'
import classNames from "classnames";

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'Warning'
}

interface AlertProps {
  className?: string
  closable?: boolean
  type?: AlertType
  title?: string
  description?: string
  onClose?: (...item: any[]) => void
}

const Alert: React.FC<AlertProps> = (props) => {
  const { className, closable , type , title , description, onClose } = props
  const classes = classNames('alert', className, {
    [`alert-${type}`]: type
  })
  return (
    <div className={classes}>
      <span className={'alert-title'}>{title}</span>
      <span className={'alert-close'}></span>
    </div>
  )
}

Alert.defaultProps = {
  type: AlertType.Default,
  closable: true,
  title: ''
}

export default Alert
