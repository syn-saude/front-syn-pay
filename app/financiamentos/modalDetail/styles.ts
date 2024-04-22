import styled from "styled-components"

export const BtnClosed = styled.button`
  display: flex;
  position: relative;
  left: 98%;
  top: -20px;
  margin-bottom: -25px;
  border: 0;
  background-color: transparent;
  color: var(--black);
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.1);
    color: var(--red-900);
  }
`
