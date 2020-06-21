import React, { useState, createContext } from 'react'
import classNames from "classnames";
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
  defaultIndex?: string,
  className?: string,
  mode?: MenuMode,
  style?: React.CSSProperties,
  onSelect?: SelectCallback,
  defaultOpenSubMenus?: string[]
}

interface IMenuContext {
  index: string,
  onSelect?: SelectCallback,
  mode?: MenuMode,
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props
  const [currentActive, setAcitve] = useState(defaultIndex)
  const classes = classNames('akita-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })

  const handleClick = (index: string) => {
    setAcitve(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode: mode,
    defaultOpenSubMenus
  }

  // 只渲染MenuItem组件
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // 为每个MenuItem添加index
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        // 如果不为MenuItem组件则报错
        console.error('Warning: Menu has a child which is not a MenuItem')
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid='test-menu'>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu
