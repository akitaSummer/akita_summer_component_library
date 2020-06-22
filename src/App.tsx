import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import Button from "./components/Button/button";
import Alert, { AlertType } from'./components/Alert/alert'
import Menu from "./components/Menu/menu";
import MenuItem from './components/Menu/menuItem'
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";
import Transition from "./components/Transition/transition";

function App() {
  const [show, setShow] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon={'coffee'} theme={'primary'} size={'10x'}/>
        <FontAwesomeIcon icon={faCoffee} size='1x'/>
        <Button> Hello </Button>
        <Button btnType={'danger'} size={'sm'}> Hello </Button>
        <Button disabled size={'lg'}> Hello </Button>
        <Button btnType={'link'} disabled href={'http://www.baidu.com'} target='_blank'> Hello Baidu </Button>
        <Button btnType={'link'} href={'http://www.baidu.com'} target='_blank'> Hello Baidu </Button>
        <Alert title={'this is alert!!'}/>
        <Alert title={'this is alert!!'} type={AlertType.Danger} description={'this is a description'}/>
        <Menu defaultIndex={'0'} onSelect={(index) => {alert(index)}}>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem>
            cool link
          </MenuItem>
          <SubMenu title={'dropdown'}>
            <MenuItem>
              cool link
            </MenuItem>
          </SubMenu>
        </Menu>
        <Button size={'lg'} onClick={() => { setShow(!show) }}>Toggle</Button>
        <Transition
          in={show}
          timeout={300}
          animation={'zoom-in-left'}
        >
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </Transition>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
