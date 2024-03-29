import styled from "styled-components";

type Screen = {
  title: string | number;
  isAlarmed: boolean;
};

export const Screen = ({ isAlarmed, title }: Screen) => {
  return <StyledScreen className={isAlarmed ? "alarm" : ""}>{title}</StyledScreen>;
};

const StyledScreen = styled.div`
  min-height: 100px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 700;
  background-color: #b3b3b3;
  margin: 50px auto;
  background-color: white;
  color: #303030;

  &.alarm {
    color: red;
  }
`;
