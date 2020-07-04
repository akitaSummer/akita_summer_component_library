import {FC} from "react";
import Tabs, { TabsProp } from "./tabs";
import TabItem, { TabItemProps } from "./tabItem";

export type ITabsComponent = FC<TabsProp> & {
  Item: FC<TabItemProps>
}

const TransTabs = Tabs as ITabsComponent

TransTabs.Item = TabItem

export default TransTabs
