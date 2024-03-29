import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import styled from "styled-components";

import { Screen } from "../../Screen";
import { CustomButton } from "../CustomButton";
import { CustomInput } from "../CustomInput";
import { FlexWrapper } from "../FlexWrapper";
import { TileWrapper } from "../TileWrapper";

export enum STATUS {
  MAX_LESS_0 = "Max value can't be less than 0",
  DEF_LESS_0 = "Default value can't be less than 0",
  ALARM_LESS_0 = "Alarm value can't be less than 0",
  EQUAL = "Values can't be equal",
  MAX_LESS_DEF = "Max value can't be less then default value",
  SET = "Set values",
  EMPTY = "",
}

export const Counter = () => {
  const [maxValue, setMaxValue] = useState(5);
  const [defaultValue, setDefaultValue] = useState(0);
  const [alarmValue, setAlarmValue] = useState(5);

  const [statusMessage, setStatusMessage] = useState(STATUS.SET);

  const [count, setCount] = useState(defaultValue);

  const validateInput = (value: number, name: string) => {
    let status = STATUS.SET;

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

  const handleIncrement: MouseEventHandler<HTMLButtonElement> = () => {
    if (count === maxValue) return;
    setCount((p) => p + 1);
  };
  const handleReset: MouseEventHandler<HTMLButtonElement> = () => {
    setCount(defaultValue);
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

  const handleSet: MouseEventHandler<HTMLButtonElement> = () => {
    setCount(defaultValue);
    setStatusMessage(STATUS.EMPTY);
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
                statusMessage === STATUS.MAX_LESS_DEF
              }
            />
          </FlexWrapper>
        </TileWrapper>
      </StyledSetup>

      <StyledCounter>
        <TileWrapper>
          <Screen
            title={statusMessage ? statusMessage : count}
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
