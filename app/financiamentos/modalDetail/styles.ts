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

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
export const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  gap:4px;
`

export const ContenteInfo = styled.div`
display: flex;
flex-direction: row;
gap:6px;
`

export const TextLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: var(--green-100);
`
export const TextInfo = styled.span`
  font-size: 12px;
  font-weight: 500;
`