import { ValidationError } from "yup";

interface InputError {
  [key: string]: string;
}

export default function GetInputErrors(err: ValidationError): InputError {
  const errorObject: InputError = {};

  for (let i = 0; i < err.inner.length; i++) {
    errorObject[err.inner[i].path] = err.inner[i].message;
  }

  return errorObject;
}
