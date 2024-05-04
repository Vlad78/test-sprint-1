import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { action, STATUS } from '../../features/counterSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Screen } from '../../Screen';
import { CustomButton } from '../CustomButton';
import { CustomInput } from '../CustomInput';
import { FlexWrapper } from '../FlexWrapper';
import { TileWrapper } from '../TileWrapper';


export const Counter = () => {
  // const [localStorage, setLocalStorage] = useLocalStorage(initStateDefValues);

  const { alarmValue, count, defaultValue, maxValue, statusMessage } = useAppSelector(
    (state) => state.counter
  );
  const dispatcher = useAppDispatch();

  // setLocalStorage({ maxValue, defaultValue, alarmValue, statusMessage, count });

  const handleIncrement: MouseEventHandler<HTMLButtonElement> = () => {
    if (count === maxValue) return;
    dispatcher(action.increment());
  };
  const handleReset: MouseEventHandler<HTMLButtonElement> = () => {
    dispatcher(action.reset());
  };
  const handleSet: MouseEventHandler<HTMLButtonElement> = () => {
    dispatcher(action.setCount());
  };

  const inputHandleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatcher(action.setConditions({ value: Number(e.target.value), tagName: e.target.name }));
  };

  return (
    <>
      <StyledSetup>
        <TileWrapper>
          <FlexWrapper justify="space-around" direction="column">
            <CustomInput
              name="maxValue"
              title="Max value: "
              type="number"
              value={maxValue}
              onChange={inputHandleChange}
              isError={
                statusMessage === STATUS.MAX_LESS_0 ||
                statusMessage === STATUS.EQUAL ||
                statusMessage === STATUS.MAX_LESS_DEF
              }
            />
            <CustomInput
              name="defaultValue"
              title="Default value: "
              type="number"
              value={defaultValue}
              onChange={inputHandleChange}
              isError={
                statusMessage === STATUS.DEF_LESS_0 ||
                statusMessage === STATUS.EQUAL ||
                statusMessage === STATUS.MAX_LESS_DEF
              }
            />
            <CustomInput
              name="alarmValue"
              title="Alarm value: "
              type="number"
              value={alarmValue}
              onChange={inputHandleChange}
              isError={statusMessage === STATUS.ALARM_LESS_0}
            />
            <CustomButton
              onClick={handleSet}
              title={"Set"}
              isDisabled={
                statusMessage === STATUS.DEF_LESS_0 ||
                statusMessage === STATUS.ALARM_LESS_0 ||
                statusMessage === STATUS.MAX_LESS_0 ||
                statusMessage === STATUS.EQUAL ||
                statusMessage === STATUS.MAX_LESS_DEF ||
                statusMessage === STATUS.EMPTY
              }
            />
          </FlexWrapper>
        </TileWrapper>
      </StyledSetup>

      <StyledCounter>
        <TileWrapper>
          <Screen
            title={statusMessage !== STATUS.EMPTY ? statusMessage : count}
            isAlarmed={statusMessage === STATUS.EMPTY && count >= alarmValue}
          />
          <div className={"Counter__buttons-block"}>
            <CustomButton
              onClick={handleIncrement}
              title={"Increment"}
              isDisabled={count >= maxValue || statusMessage !== STATUS.EMPTY}
            />
            <CustomButton
              onClick={handleReset}
              title={"Reset"}
              isDisabled={count === defaultValue || statusMessage !== STATUS.EMPTY}
            />
          </div>
        </TileWrapper>
      </StyledCounter>
    </>
  );
};

const StyledCounter = styled.div`
  .Counter__buttons-block {
    padding: 40px 20px;
    display: flex;
    justify-content: space-around;
    border-radius: 12px;
    background-color: inherit;
    border: 5px solid white;
  }
`;

const StyledSetup = styled.div``;
