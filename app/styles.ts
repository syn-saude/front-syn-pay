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
`

export const FormContent = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

export const ButtonContent = styled(Button)`
  background-color: var(--green-300);
  color: var(--white);
  &:hover {
    background-color: var(--green-100);
  }
`

export default ButtonContent
