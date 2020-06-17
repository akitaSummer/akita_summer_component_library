import React from 'react';
import Button, {ButtonSize, ButtonType} from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button> Hello </Button>
        <Button btnType={ButtonType.Danger}> Hello </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> Hello </Button>
        <Button btnType={ButtonType.Link} href={'http://www.baidu.com'}> Hello Baidu </Button>
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
