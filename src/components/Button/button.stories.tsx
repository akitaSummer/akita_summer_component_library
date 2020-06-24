import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "./button";

const defaultButton = () => <Button onClick={action('clicked')}> default button </Button>

const buttonWithSize = () => (
  <div>
    <Button onClick={action('large button clicked')} size={'lg'}>large button</Button>
    <Button onClick={action('small button clicked')} size={'sm'}>small button</Button>
  </div>
)

const buttonWithType = () => (
  <div>
    <Button onClick={action('primary button clicked')} btnType={'primary'}>primary button</Button>
    <Button onClick={action('default button clicked')} btnType={'default'}>default button</Button>
    <Button onClick={action('danger button clicked')} btnType={'danger'}>danger button</Button>
    <Button onClick={action('link button clicked')} btnType={'link'} href={'https://www.google.com'}>link button</Button>
  </div>
)



storiesOf('Button Component', module)
  .add('默认Button', defaultButton)
  .add('不同尺寸Button', buttonWithSize)
  .add('不同类型Button', buttonWithType)
