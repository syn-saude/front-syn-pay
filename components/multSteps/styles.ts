import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: var(--white);
  padding: 10px 20px 20px 20px;
  border-radius: 6px;
  background-color: var(--white);
  border: 1px solid #E0E0E0;
  @media (max-width: 600px) {
    flex-direction: row;
  }
`

export const StepContainer = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  flex-direction: row;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`
export const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  @media (max-width: 600px) {
    flex-direction: row;
  }
`
export const StepDivider = styled.div`
  width: 1px;
  height: 30px;
  background-color:#9e9da1;
  margin: 0px 14px;
  @media (max-width: 600px) {
    width: 30px;
    height: 2px;
    margin: 14px 0px;
  }
`

export const StepNumber = styled.span<{ isNext?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  color: ${props => (props?.isNext ? 'var(--white)' : '#9e9da1')};
  background-color: ${props => (props?.isNext ? '#01a63e' : '#E0E0E0')};
  cursor : pointer;
`


export const StepActive = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  padding: 1px;
  border-radius: 50%;
  color: var(--white);
  background-color: #1650cf;
  border: 1.1px solid #1650cf;
  box-shadow: inset 0 0 0 1px white;
`;

export const StepLabel = styled.span`
  color: var(--black);
  font-size: 16px;
  font-weight: 600;
  justify-content: flex-start;
  @media (max-width: 600px) {
    font-size: 10px;
  }
`
