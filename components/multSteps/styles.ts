import styled from "styled-components"

export const progressContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`

export const StepNumberMobile = styled.span`
  display: flex;
  position: relative;
  left: 80%;
  font-weight: bold;
  font-size: 14px;
`

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  gap: 8px;
`

export const ProgressBar = styled.div`
  height: 100%;
  background-color: #24ae7c;
  border-radius: 5px;
  transition: width 0.3s ease;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const StepContainer = styled.div`
  display: flex;
  gap: 6px;
  justify-content: left;
  flex-direction: row;
`
export const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
export const StepDivider = styled.div`
  width: 1px;
  height: 30px;
  background-color: #9e9da1;
  margin: 0px 14px;
`

export const StepNumber = styled.span<{ isNext?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  color: ${(props) => (props?.isNext ? "var(--white)" : "#9e9da1")};
  background-color: ${(props) => (props?.isNext ? "#01a63e" : "#E0E0E0")};
  cursor: pointer;
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
`

export const StepLabel = styled.span`
  // color: var(--black);
  font-size: 16px;
  font-weight: 600;
  justify-content: flex-start;
`
