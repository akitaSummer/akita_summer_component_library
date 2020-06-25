import React from "react";
import { storiesOf } from "@storybook/react";

import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
import {action} from "@storybook/addon-actions";

const defaultMenu = () => (
  <Menu
    defaultIndex="0"
    defaultOpenSubMenus={[]}
    mode="horizontal"
    onSelect={(selectedIndex) => {
      action('selected')
    }}
  >
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem>
      cool link 2
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem>
    <SubMenu title="下拉选项">
      <MenuItem>
        下拉选项一
      </MenuItem>
      <MenuItem>
        下拉选项二
      </MenuItem>
    </SubMenu>
  </Menu>
)

const menuWithVertical = () => (
  <Menu
    defaultIndex="0"
    defaultOpenSubMenus={[]}
    mode="vertical"
    onSelect={(selectedIndex) => {
      action(`${selectedIndex}`)
    }}
  >
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem>
      cool link 2
    </MenuItem>
    <SubMenu title="点击下拉选项">
      <MenuItem>
        下拉选项一
      </MenuItem>
      <MenuItem>
        下拉选项二
      </MenuItem>
    </SubMenu>
  </Menu>
)

const menuWithdefaultOpenSubMenus = () => (
  <Menu
    defaultIndex="0"
    defaultOpenSubMenus={[
      '2'
    ]}
    mode="vertical"
    onSelect={(selectedIndex) => {
      action(`${selectedIndex}`)
    }}
  >
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem>
      cool link 2
    </MenuItem>
    <SubMenu title="默认展开下拉选项">
      <MenuItem>
        下拉选项一
      </MenuItem>
      <MenuItem>
        下拉选项二
      </MenuItem>
    </SubMenu>
  </Menu>
)


storiesOf('Menu Component', module)
  .add('Menu', defaultMenu)
  .add('纵向Menu', menuWithVertical)
  .add('默认展开Menu', menuWithdefaultOpenSubMenus)
