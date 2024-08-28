import React, { ChangeEvent, ChangeEventHandler, useState } from "react"
import { InputProp } from "interfaces/InputProp"


export const Input = (props: { inputAttributes: InputProp, handleOnChange: ChangeEventHandler<HTMLInputElement> }) => {
  const { inputAttributes, handleOnChange } = props
  const { htmlFor, label, type, placeholder, name, validation } = inputAttributes
  const [validationError, setValidationError] = useState<string>("");

  const validate = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const { required, minLength, maxLength, minInt, maxInt, pattern } = validation

    if (minLength && input.length < minLength.value)
      setValidationError(minLength.message);
    else if (maxLength && input.length > maxLength.value)
      setValidationError(maxLength.message);
    else if (minInt && parseInt(input) < minInt.value)
      setValidationError(minInt.message)
    else if (maxInt && parseInt(input) < maxInt.value)
      setValidationError(maxInt.message)
    else if (pattern && !input.match(pattern.value))
      setValidationError(pattern.message);
    else if (required && (!input || input.length === 0)) setValidationError(required.message);
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