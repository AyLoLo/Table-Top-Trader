import React, { ChangeEvent, ChangeEventHandler, useState } from "react"
import { findInputError, isFormInvalid } from '../utils'
import { MdError } from 'react-icons/md'
import { InputProp } from "interfaces/InputProp"


export const Input = (props: { inputAttributes: InputProp, handleOnChange: ChangeEventHandler<HTMLInputElement> }) => {
  const { inputAttributes, handleOnChange } = props
  const { htmlFor, label, type, placeholder, name, validation } = inputAttributes
  const [validationError, setValidationError] = useState<string>("");

  const validate = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const { required, minLength, maxLength, pattern } = validation

    if (minLength && text.length < minLength.value)
      setValidationError(minLength.message);
    else if (maxLength && text.length > maxLength.value)
      setValidationError(maxLength.message);
    else if (pattern && !text.match(pattern.value))
      setValidationError(pattern.message);
    else if (required && (!text || text.length === 0)) setValidationError(required.message);
    else setValidationError("");
  }

  return (
    <div key={label} className="flex flex-col w-full gap-2">
      <div className="flex justify-between">
        <label htmlFor={htmlFor} className="font-semibold capitalize">
          {label}
        </label>
        {validationError && <p className="text-red-500 max-w-xs">{validationError}</p>}
      </div>
      <input
        id={label}
        name={name}
        type={type}
        onChange={(e) => { validate(e); handleOnChange(e); }}
        className="w-full p-5 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
        placeholder={placeholder}
      />
    </div>
  )
}
export const InputError = () => {
  return <div>error;</div>
}

export const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 }
}