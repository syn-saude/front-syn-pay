import React from "react";
import InputMask from "react-input-mask";
import style from "./style.module.css";

interface InputWithMaskProps {
  mask: string;
  value: string;
  placeholder: string;
  onChange: (event: any) => void;
  type: string;
}

export default function InputWithMask({
  mask,
  value,
  onChange,
  type,
  ...rest
}: InputWithMaskProps) {
  return (
    <InputMask
      mask={mask}
      value={value}
      onChange={onChange}
      type={type}
      className={style.myInput}
      {...rest}
    />
  );
}
{
  /* Exemplos de uso:
<InputWithMask mask="99/99/9999" placeholder="Data de Nascimento" />
<InputWithMask mask="999.999.999-99" placeholder="CPF" />
<InputWithMask mask="(99) 99999-9999" placeholder="Telefone" /> 
*/
}
