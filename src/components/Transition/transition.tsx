import React from 'react'
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom'

type TransitionProps =  {
  animation?: AnimationName,
  wrapper?: boolean // 如果children自身有transition，则会覆盖掉CSSTransition，设定一个变量，如果为true则外部包裹一个div阻止覆盖
} & CSSTransitionProps

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    children,
    classNames,
    animation,
    wrapper,
    ...restProps
  } = props
  return (
    <CSSTransition
      classNames={ classNames ? classNames : animation }
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
}

export default Transition
