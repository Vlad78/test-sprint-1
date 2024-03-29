import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import styled from 'styled-components';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Screen } from '../../Screen';
import { CustomButton } from '../CustomButton';
import { CustomInput } from '../CustomInput';
import { FlexWrapper } from '../FlexWrapper';
import { TileWrapper } from '../TileWrapper';


export enum STATUS {
  MAX_LESS_0 = "Max value can't be less than 0",
  DEF_LESS_0 = "Default value can't be less than 0",
  ALARM_LESS_0 = "Alarm value can't be less than 0",
  EQUAL = "Values can't be equal",
  MAX_LESS_DEF = "Max value can't be less then default value",
  PENDING = "Set values",
  EMPTY = "none",
}

const initStateDefValues = {
  maxValue: 10,
  defaultValue: 0,
  alarmValue: 5,
  statusMessage: STATUS.PENDING,
  count: 0,
};

export const Counter = () => {
  const [localStorage, setLocalStorage] = useLocalStorage(initStateDefValues);

  const [maxValue, setMaxValue] = useState(localStorage.maxValue);
  const [defaultValue, setDefaultValue] = useState(localStorage.defaultValue);
  const [alarmValue, setAlarmValue] = useState(localStorage.alarmValue);

  const [statusMessage, setStatusMessage] = useState(localStorage.statusMessage);

  const [count, setCount] = useState(localStorage.count);

  setLocalStorage({ maxValue, defaultValue, alarmValue, statusMessage, count });

  const handleIncrement: MouseEventHandler<HTMLButtonElement> = () => {
    if (count === maxValue) return;
    setCount((p) => p + 1);
  };
  const handleReset: MouseEventHandler<HTMLButtonElement> = () => {
    setCount(defaultValue);
  };
  const handleSet: MouseEventHandler<HTMLButtonElement> = () => {
    setCount(defaultValue);
    setStatusMessage(STATUS.EMPTY);
  };

  const inputHandleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, status } = validateInput(Number(e.target.value), e.target.name);
    setStatusMessage(status);

    if (e.target.name === "maxValue") {
      setMaxValue(value);
    } else if (e.target.name === "defaultValue") {
      setDefaultValue(value);
    } else if (e.target.name === "alarmValue") {
      setAlarmValue(value);
    }
  };

  const validateInput = (value: number, name: string) => {
    let status = STATUS.PENDING;

    if (name === "maxValue") {
      if (value < defaultValue) status = STATUS.MAX_LESS_DEF;
      if (value === defaultValue) status = STATUS.EQUAL;
      if (defaultValue < 0) status = STATUS.DEF_LESS_0;
      if (alarmValue < 0) status = STATUS.ALARM_LESS_0;
      if (value < 0) status = STATUS.MAX_LESS_0;
    }
    if (name === "defaultValue") {
      if (value > maxValue) status = STATUS.MAX_LESS_DEF;
      if (value === maxValue) status = STATUS.EQUAL;
      if (maxValue < 0) status = STATUS.MAX_LESS_0;
      if (alarmValue < 0) status = STATUS.ALARM_LESS_0;
      if (value < 0) status = STATUS.DEF_LESS_0;
    }
    if (name === "alarmValue") {
      if (defaultValue < 0) status = STATUS.DEF_LESS_0;
      if (maxValue < 0) status = STATUS.MAX_LESS_0;
      if (value < 0) status = STATUS.ALARM_LESS_0;
    }
    return { value, status };
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
