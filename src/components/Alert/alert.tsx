import React, { useState, FC, BaseHTMLAttributes } from 'react'
import classNames from "classnames";
import Icon from "../Icon/icon";

type AlertType = 'success' | 'default' | 'danger' | 'warning'

interface BaseAlertProps {
  className?: string
  /**设置 Alert 是否可以关闭*/
  closable?: boolean
  /**设置 Alert 的类型*/
  type?: AlertType
  /**设置 Alert 的title*/
  title?: string
  /**设置 Alert 的内容*/
  description?: string
  /**设置 Alert 的关闭时的回调*/
  onClose?: (...item: any[]) => void
}

export type AlertProps = Partial<BaseAlertProps & BaseHTMLAttributes<HTMLElement>>

const Alert: FC<AlertProps> = (props) => {
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
          <Icon
            icon={'times'}
            size={'1x'}
            className={'alert-close'}
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
  type: 'default',
  closable: true,
  title: ''
}

export default Alert;
