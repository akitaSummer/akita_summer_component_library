import React, { useState } from 'react'
import classNames from "classnames";

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'Warning'
}

interface BaseAlertProps {
  className?: string
  closable?: boolean
  type?: AlertType
  title?: string
  description?: string
  onClose?: (...item: any[]) => void
}

export type AlertProps = Partial<BaseAlertProps & React.BaseHTMLAttributes<HTMLElement>>

const Alert: React.FC<AlertProps> = (props) => {
  const [isClose, setIsClose] = useState(false)
  const [isDel, setIsDel] = useState(false)
  const { className, closable , type , title , description, onClose, ...restProps } = props
  const containerClasses = classNames('alert-container', className)
  const classes = classNames('alert', {
    [`alert-${type}`]: type,
    'close': isClose
  })
  return (
    <div className={containerClasses} {...restProps}>
    {
      isDel ? '' : (
        <div className={classes}>
          <span className={'alert-title'}>{title}</span>
          <span
            className={'alert-close iconfont icon-close'}
            onClick={() => {
              setIsClose(true)
              setTimeout(() => {setIsDel(true)}, 500)
              onClose && onClose()
            }}
          />
          { closable ? <div className="alert-description">{ description }</div> : ''}
        </div>
      )
    }
    </div>
  )
}

Alert.defaultProps = {
  type: AlertType.Default,
  closable: true,
  title: ''
}

export default Alert
