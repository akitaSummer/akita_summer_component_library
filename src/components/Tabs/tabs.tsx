import React, { FC, useState, createContext } from "react";
import classNames from "classnames";
import {TabItemProps} from "./tabItem";

type TabsType = 'default' | 'card'

type SelectCallback = (selectIndex: number) => void

type ItemCallback = (selectIndex: number, children: string | React.ReactNode) => void

interface TabsProp {
  type?: TabsType,
  defaultIndex?: number,
  className?: string,
  style?: React.CSSProperties,
  onSelect?: SelectCallback
}

interface ITabsContext {
  index: number,
  onSelect?: ItemCallback,
  type?: TabsType
}

export const TabsContext = createContext<ITabsContext>({ index: 0 })

const Tabs: FC<TabsProp> = (props) => {
  const { type, defaultIndex, children, style, className, onSelect} = props
  const [currentActive, setAcitve] = useState(defaultIndex as number)
  const [context, setContext] = useState<string | React.ReactNode>('')
  const classes = classNames('akita-tabs', className, {
    'default-tabs': type === 'default',
    'card-tabs': type === 'card'
  })

  const handleClick = (index: number, children: string | React.ReactNode) => {
    setAcitve(index)
    setContext(children)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: ITabsContext = {
    index: currentActive,
    onSelect: handleClick
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabItemProps>
      const { displayName } = childElement.type
      if (displayName === 'TabItem') {
        return React.cloneElement(childElement, {
          index
        })
      }
    })
  }

  return (
    <div className={'akita-tabs-container'}>
      <ul className={classes}>
        <TabsContext.Provider value={passedContext}>
          {renderChildren()}
        </TabsContext.Provider>
      </ul>
      {context}
    </div>
  )
}

Tabs.defaultProps = {
  type: 'default',
  defaultIndex: 0
}

export default Tabs;
