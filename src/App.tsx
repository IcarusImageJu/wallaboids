import { FC, useState } from 'react';

import './App.css';
import Canvas from './Canvas';
import Html from './Html';

const App:FC = function() {
  const [mode, setMode] = useState<'canvas'|'html'|undefined>('canvas');

  switch (mode) {
    case 'canvas':
      return <Canvas />;
    case 'html':
      return <Html />;
    default:
      return (
        <>
          <button type="button" onClick={() => setMode('canvas')}>Canvas</button>
          <button type="button" onClick={() => setMode('html')}>html</button>
        </>
      );
  }
};

export default App;
