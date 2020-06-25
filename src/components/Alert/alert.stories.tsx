import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Alert from "./alert";

const defaultAlert = () => <Alert title={'default alert'} onClose={action('clicked')}/>

const alertWithType = () => (
  <div>
    <Alert title={'success alert'} onClose={action('success alert clicked')} type={'success'}/>
    <Alert title={'default alert'} onClose={action('default alert clicked')} type={'default'}/>
    <Alert title={'danger alert'} onClose={action('danger alert clicked')} type={'danger'}/>
    <Alert title={'warning alert'} onClose={action('warning alert clicked')} type={'warning'}/>
  </div>
)

const alertWithDescription = () => (
  <Alert title={'this is alert!!'} type={'success'} description={'this is a description'}/>
)


storiesOf('Alert Component', module)
  .add('默认Alert', defaultAlert)
  .add('不同类型Alert', alertWithType)
  .add('有内容的Alert', alertWithDescription)
