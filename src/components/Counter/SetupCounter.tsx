import { ChangeEventHandler, MouseEventHandler } from 'react';
import styled from 'styled-components';

import { STATUS } from '../../features/counterSlice';
import { CustomButton } from '../CustomButton';


type SetupCounter = {
  statusMessage: STATUS;
  maxValue: number;
  defaultValue: number;
  inputHandleChange: ChangeEventHandler<HTMLInputElement>;
  buttonHandleOnClick: MouseEventHandler<HTMLButtonElement>;
  buttonIsDisabled: boolean;
};

export const SetupCounter = ({
  buttonHandleOnClick,
  buttonIsDisabled,
  inputHandleChange,
  maxValue,
  defaultValue,
  statusMessage,
}: SetupCounter) => {
  return (
    <StyledSetupCounter>
      <div>
        <div className="max-value">
          <div>Max value: </div>
          <input
            type="number"
            name="maxValue"
            className={
              statusMessage === STATUS.MAX_LESS_0 ||
              statusMessage === STATUS.EQUAL ||
              statusMessage === STATUS.MAX_LESS_DEF
                ? "error"
                : ""
            }
            value={maxValue}
            onChange={inputHandleChange}
          />
        </div>
        <div className="default-value">
          <div>Default value: </div>
          <input
            type="number"
            name="defaultValue"
            className={
              statusMessage === STATUS.DEF_LESS_0 ||
              statusMessage === STATUS.EQUAL ||
              statusMessage === STATUS.MAX_LESS_DEF
                ? "error"
                : ""
            }
            value={defaultValue}
            onChange={inputHandleChange}
          />
        </div>
      </div>
      <CustomButton
        onClick={buttonHandleOnClick}
        title={"Set"}
        // isDisabled={maxValue < 0 || defaultValue < 0 || maxValue <= defaultValue}
        isDisabled={buttonIsDisabled}
      />
    </StyledSetupCounter>
  );
};

const StyledSetupCounter = styled.div`
  margin: 40px;
  padding: 40px;
  background-color: #70bcac;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  height: 400px;
  width: 400px;
  border-radius: 12px;
  border: solid 2px gray;
  font-size: 20px;

  & > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  .default-value,
  .max-value {
    input.error {
      border: 2px solid red;

      &:focus-visible {
        outline: none;
      }
    }
  }
`;
