import React from 'react';
import Button, {ButtonSize, ButtonType} from "./components/Button/button";
import Alert from'./components/Alert/alert'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button> Hello </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}> Hello </Button>
        <Button disabled size={ButtonSize.Large}> Hello </Button>
        <Button btnType={ButtonType.Link} disabled href={'http://www.baidu.com'} target='_blank'> Hello Baidu </Button>
        <Button btnType={ButtonType.Link} href={'http://www.baidu.com'} target='_blank'> Hello Baidu </Button>
        <Alert title={'this is alert!!'}/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
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
