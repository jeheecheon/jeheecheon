import React, { useReducer } from 'react';

import './App.css';
import TestComponent from '@common/TestComponent';

function App() {

  return (
    <React.Fragment>
      <h1 className='text-3xl font-bold underline'>
        Hello World!
      </h1>
      <TestComponent></TestComponent>
    </React.Fragment>
  );
}

export default App;
