import styled from 'styled-components';


type Screen = {
  title: number;
};

export const Screen = (props: Screen) => {
  return <StyledScreen className={props.title >= 5 ? "alarm" : ""}>{props.title}</StyledScreen>;
};

const StyledScreen = styled.div`
  min-height: 100px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  font-weight: 700;
  background-color: #b3b3b3;
  margin: 50px auto;
  background-color: white;
  color: #303030;

  &.alarm {
    color: red;
  }
`;
