import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10rem;
  margin: 0px 250px;
  background: var(--white);
`;

export const LoginContent = styled.div`
  margin-top: 2rem;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const FormContent = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
`;

export const InputLabel = styled.span`
  font-weight: 600;
`;

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
`;

export const ButtonContent = styled.button`
  height: 60px;
  font-size: 1.3rem;
  width: 90%;
  background-color: var(--green-300);
  border-radius: 0.5rem;
  color: var(--white);
  border: 0;
`;
