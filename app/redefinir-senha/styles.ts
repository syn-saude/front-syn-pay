import styled from "styled-components"

import Button from "@/components/ui/button"

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
`

export const LoginContent = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: -80px;
`

export const FormContent = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
`

export const InputLabel = styled.span`
  font-weight: 600;
`

export const InputContent = styled.input`
  margin-bottom: 1rem;
  height: 60px;
  border: 0;
  border-radius: 0.5rem;
  background-color: var(--green-200);
  color: var(--black);
  padding: 1rem;
  border: 1.5px solid var(--green-300);
  font-weight: 400;
`
export const btnBack = styled.a`
  font-size: 1rem;
  cursor: pointer;
  color: var(--green-100);
  display: flex;
  gap: 0.3rem;
  justify-content: center;
  align-items: center;
  &:hover {
    color: var(--green-300);
  }
`

export const ButtonContent = styled(Button)`
  background-color: var(--syn-primary);
  color: var(--white);
  &:hover {
    background-color: var(--syn-primary-foreground);
  }
`

export default ButtonContent
