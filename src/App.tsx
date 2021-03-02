import './App.css';
import p5Types from "p5"; //Import this for typechecking and intellisense

import Sketch from "react-p5";
import { useEffect, useState } from 'react';


function App() {
  const [x, setX] = useState(1);
	const y = 50;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.colorMode('hsb', 360, 100, 100, 1);
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
  }

  const draw = (p5: p5Types) => {
		p5.background(0);
		p5.ellipse(x, y, 50, 50);
		setX(x+2);
	};

  useEffect(() => {
    if(x > window.innerWidth) {
      setX(0)
    }
  }, [x])

  return (
    <Sketch className="wall" setup={setup} draw={draw}/>
  );
}

export default App;
