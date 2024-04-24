import styled from "styled-components"

export const AprovadoContainer = styled.div<{ isHovered?: any }>`
  display: flex;
  height: 80px;
  // border: 1px solid #605dec;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #f4f3fe;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 100px;
  }
  &.selecionado {
    background-color: #36bf76;
    border: none;
    color: white;
    & > * {
      color: white;
    }
  }
`

export const LabelInfo = styled.span<{ isHovered?: any }>`
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => (props.isHovered ? "white" : "#605dec")};
`
export const ButtonNewSimulation = styled.button`
  display: flex;
  height: 50px;
  width: 360px;
  border: none;
  background-color: #605dec;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  padding: 6px;
  font-size: 16px;

  &:hover {
    font-size: 16.1px;
  }
`
export const LabelNotAprov = styled.span`
  display: flex;
  font-size: 20px;
  font-weight: 700;
  justify-content: center;
  align-items: center;
`

export const StepDivider = styled.div`
  width: 40%;
  height: 1px;
  background-color: #9e9da1;
`

export const LabelTitleSimulation = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #605dec;
`
export const TextSimulation = styled.span`
  font-size: 14px;
  font-weight: 500;
  /* color: #605dec; */
`

export const ContainerBoxSimulation = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`
export const ContentBoxSimulation = styled.div`
  display: flex;
  flex-direction: column;
`
export const TextInfoSimulation = styled.span`
  font-size: 12px;
`
export const InforBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40%;
  padding: 16px;
  border: 1px solid #605dec;
  background-color: #f4f3fe;
`
