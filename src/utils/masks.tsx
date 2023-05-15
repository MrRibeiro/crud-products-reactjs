import { ChangeEvent } from "react";

export const validateCPF = (value: string) => {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  if (!regex.test(value)) {
    return "CPF inválido";
  }
  return true;
};

export const formatCPF = (e: ChangeEvent<HTMLInputElement>) => {
  const { value } = e.target;
  const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  return value.replace(regex, "$1.$2.$3-$4");
};
