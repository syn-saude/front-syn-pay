import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function InputE({ ...rest }: InputProps) {
  return <input className={styles.input} {...rest} />;
}

export function TextAreaE({ ...rest }: TextAreaProps) {
  return <textarea className={styles.input} {...rest}></textarea>;
}
