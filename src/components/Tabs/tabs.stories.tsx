import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Tabs from "./tabs";
import TabItem from "./tabItem";
import Icon from "../Icon/icon";

const defaultTabs = () => (
  <Tabs
    onSelect={(index) => {
      return action(`${index}`)
    }}
  >
    <TabItem label="选项卡一">
      this is content one
    </TabItem>
    <TabItem label="选项卡二">
      this is content two
    </TabItem>
    <TabItem label="用户管理">
      this is content three
    </TabItem>
  </Tabs>
)

const tabsWithType = () => (
  <Tabs
    defaultIndex={0}
    onSelect={(index) => {
      return action(`${index}`)
    }}
    type="card"
  >
    <TabItem label="card1">
      this is card one
    </TabItem>
    <TabItem label="card2">
      this is content two
    </TabItem>
    <TabItem
      disabled
      label="disabled"
    >
      this is content three
    </TabItem>
  </Tabs>
)

const tabsWithLabel = () => (
  <Tabs
    defaultIndex={0}
    onSelect={function noRefCheck(){}}
    type="card"
  >
    <TabItem label={<><Icon icon="exclamation-circle" />{'  '}自定义图标</>}>
      this is card one
    </TabItem>
    <TabItem label="tab2">
      this is content two
    </TabItem>
  </Tabs>
)


storiesOf('Tabs Component', module)
  .add('Tabs', defaultTabs)
  .add('选项卡样式的Tabs', tabsWithType)
  .add('label支持ReactNode', tabsWithLabel)
