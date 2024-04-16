import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap:16px;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  margin: 0px auto;

`

export const NextButton = styled.button`
display: flex;
padding: 12px;
border: 1px solid #E0E0E0;
border-radius: 6px;
background-color: var(--dark-700);
color:var(--white);
transition: all  0.7s;
&:hover{
  color: var(--green-900);
  transform: scale(1.03);
}
`;