import { MouseEvent, MouseEventHandler } from 'react';
import styled from 'styled-components';


type CustomButton = {
  title: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
};

export const CustomButton = ({ title, onClick, isDisabled = false }: CustomButton) => {
  const onClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onClick(e);
  };

  return (
    <StyledButton onClick={onClickHandler} disabled={isDisabled}>
      {title}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ disabled: boolean }>`
  padding: 20px;
  color: ${(props) => (props.disabled ? "gray" : "#303030")};
  border-radius: 12px;
  border: none;
  min-width: 150px;
  cursor: pointer;
  font-size: 24px;
  font-weight: 700;
  background-color: ${(props) => (props.disabled ? "#e2e2e2" : "white")};
`;
