import './App.css';

import styled from 'styled-components';

import { Counter } from './Counter';
import logo from './logo.svg';


function App() {
  return (
    <StyledApp className="App">
      <Counter />
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
`;
