import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from "classnames";

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  className?: string
  /**设置 Button 是否禁用*/
  disabled?: boolean
  /**设置 Button 的尺寸*/
  size?: ButtonSize
  /**设置 Button 的类型*/
  btnType?: ButtonType
  children: React.ReactNode
  href?: string
}

// 兼容原生事件
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const Button: FC<ButtonProps> = (props) => {
  const { btnType, disabled, size, children, className, href, ...restProps } = props
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled
  })
  if (btnType === 'link' && href) {
    return (
      <a href={href} className={classes} {...restProps}>{ children }</a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>{ children }</button>
    )
  }
}


Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button;
