import styled from "styled-components"

export const AprovadoContainer = styled.div `
display: flex;
height:80px;
width:340px;
border: 1px solid #605dec;
border-radius: 8px;
justify-content: space-between;
align-items: center;
padding: 12px;
background-color: #f4f3fe;
cursor: pointer;
&:hover {
    background-color: #36bf76;
    border: none;
    color: white;
    & > * {
      color: white;
    }
  }
`;
//#36bf76  #605dec #f4f3fe
export const ValorContainer = styled.div `
display: flex;
flex-direction: column;
`;

export const LabelInfo = styled.span<{ isHovered?: any }>`
font-size: 13px;
font-weight: 500;
color: ${(props) => (props.isHovered ? 'white' : '#605dec')};
`;

export const LabelValue = styled.span<{ isHovered?: any }>`
font-size: 18px;
font-weight: 700;
color: ${(props) => (props.isHovered ? 'white' : '#605dec')};
`;
