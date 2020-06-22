import React from 'react'
import classNames from "classnames";
import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core"; // 在icon属性中输入字符串即可显示对应图标
import { fas } from '@fortawesome/free-solid-svg-icons' // 引入所有图标

export type ThemeProps = 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'ligth'
  | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}

library.add(fas)

const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props
  const classes = classNames('viking-icon', className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} {...restProps} />
  )
}

export default Icon
