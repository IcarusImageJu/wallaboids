import './App.css';
import p5Types from "p5"; //Import this for typechecking and intellisense

import Sketch from "react-p5";

function App() {

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.colorMode('hsb', 360, 100, 100, 1);
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
    for(let i = 0; i < 100; i += 1) {
      
    }
  }

  const draw = (p5: p5Types) => {

	};

  return (
    <Sketch className="wall" setup={setup} draw={draw}/>
  );
}

export default App;
