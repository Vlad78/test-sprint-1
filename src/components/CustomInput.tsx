import { ChangeEventHandler } from "react";
import styled, { css } from "styled-components";

type CustomInput = {
  title: string;
  type: string;
  name: string;
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  isError?: boolean;
};
export const CustomInput = ({
  name,
  title,
  type,
  value,
  onChange,
  isError = false,
}: CustomInput) => {
  return (
    <StyledInput isError={isError}>
      <h3>{title}</h3>
      <input type={type} name={name} value={value} onChange={onChange} />
    </StyledInput>
  );
};

const StyledInput = styled.div<{ isError: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-size: 20px;

  h3 {
    color: white;
    font-size: 24px;
    white-space: nowrap;
  }

  input {
    min-width: 100px;
    max-width: 200px;
    border-radius: 12px;
    border: solid 2px gray;
    min-height: 30px;
    font-size: inherit;
    padding: 10px;
  }

  ${(props) =>
    props.isError &&
    css`
      input {
        border: 2px solid red;

        &:focus-visible {
          outline: none;
        }
      }
    `}
`;
