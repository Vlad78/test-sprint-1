import { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';

import { CustomButton } from './CustomButton';
import { Screen } from './Screen';


export const Counter = () => {
  const [count, setCount] = useState(1);

  const handleIncrement: MouseEventHandler<HTMLButtonElement> = () => {
    if (count === 5) return;
    setCount((p) => p + 1);
  };
  const handleReset: MouseEventHandler<HTMLButtonElement> = () => {
    setCount(1);
  };

  return (
    <StyledCouner>
      <Screen title={count} />
      <div>
        <CustomButton onClick={handleIncrement} title={"Inrement"} isDisabled={count >= 5} />
        <CustomButton onClick={handleReset} title={"Reset"} />
      </div>
    </StyledCouner>
  );
};

const StyledCouner = styled.div`
  padding: 40px;
  background-color: #70bcac;
  width: 400px;
  height: 400px;
  border-radius: 12px;
  border: solid 2px gray;

  div:nth-child(2) {
    padding: 40px 20px;
    display: flex;
    justify-content: space-around;
    border-radius: 12px;
    background-color: inherit;
    border: 5px solid white;
  }
`;
