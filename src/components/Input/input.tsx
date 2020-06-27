import React, {ChangeEvent, FC, InputHTMLAttributes, ReactElement} from 'react'
import classNames from "classnames";
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from "../Icon/icon";

type InputSize = 'lg' | 'sm'

// 使用Omit忽略掉InputHTMLAttributes中size属性配置，只使用我们InputProps中size属性配置
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
  /**是否禁用Input*/
  disabled?: boolean,
  /**设置Input大小*/
  size?: InputSize,
  /**添加图标*/
  icon?: IconProp,
  /**添加前缀*/
  prepend?: string | ReactElement,
  /**添加后缀*/
  append?: string | ReactElement,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, className, style, ...restProps } = props
  const classes = classNames('akita-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })

  const fixControlledValue = (value: any) => {
    // 解决受控组件初始值为undefined时组件会变成非受控组件
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }

  if ('value' in props) {
    // 当传入了value，则为受控组件，需要将传入的defaultValue删除，这样就不会进行非受控组件和受控组件转换
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  return (
    <div className={classes} style={style}>
      {prepend && <div className={'akita-input-group-prepend'}>{prepend}</div>}
      {icon && <div className={'icon-wrapper'}><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input
        className="akita-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="akita-input-group-append">{append}</div>}
    </div>
  )
}

export default Input
