import React, { FC, useEffect, useContext } from "react";
import classNames from "classnames";
import { TabsContext } from './tabs'

export interface TabItemProps {
  index?: number,
  disabled?: boolean,
  className?: string,
  style?: React.CSSProperties
  label: string | React.ReactNode
}

const TabItem: FC<TabItemProps> = (props) => {
  const { index, disabled, className, style, children, label } = props
  const context = useContext(TabsContext)
  const classes = classNames('akita-tab-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })
  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === "number") {
      context.onSelect(index, children)
    }
  }
  useEffect(() => {
    if (context.index === index) {
      handleClick()
    }
  }, [])
  return (
    <li className={classes} style={style} onClick={handleClick}>
      { label }
    </li>
  )
}

TabItem.defaultProps = {
  disabled: false
}

TabItem.displayName = 'TabItem'

export default TabItem
