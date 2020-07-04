import { library } from "@fortawesome/fontawesome-svg-core"; // 在icon属性中输入字符串即可显示对应图标
import { fas } from '@fortawesome/free-solid-svg-icons' // 引入所有图标
library.add(fas)

export { default as Button } from './components/Button'
export { default as Icon } from './components/Icon'
export { default as Alert } from './components/Alert'
export { default as Menu } from './components/Menu'
export { default as Tabs } from './components/Tabs'
export { default as AutoComplete } from './components/AutoComplete'
export { default as Upload } from './components/Upload'

