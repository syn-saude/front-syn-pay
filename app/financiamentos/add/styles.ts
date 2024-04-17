import styled from "styled-components"

export const AprovadoContainer = styled.div<{ isHovered?: any }>`
  display: flex;
  height: 80px;
  border: 1px solid #605dec;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #f4f3fe;
  cursor: pointer;

  &:hover,
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
