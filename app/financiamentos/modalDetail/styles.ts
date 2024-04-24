import styled from "styled-components"
// import  logo from "@/public/"

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

export const Container = styled.div`
display: flex;
  flex-direction: column;
  gap: 18px;`;

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`
export const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  gap:4px;
`

export const ContenteInfo = styled.div`
display: flex;
flex-direction: column;
gap:2px;
`
export const ContenteInfoRow = styled.div`
display: flex;
flex-direction: row;
gap:6px;
`

export const TextLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
`
export const TextLabelInfo = styled.span`
  font-size: 14px;
  font-weight: 500;

`
export const TextInfo = styled.span`
  font-size: 12px;
  font-weight: 400;
`

export const StepDivider = styled.div`
  height: 1px;
  background-color: #9e9da1;
`