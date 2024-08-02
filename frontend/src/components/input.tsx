import cn from 'classnames'
import { findInputError, isFormInvalid } from '../utils'
import { useFormContext } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { MdError } from 'react-icons/md'

interface Input {
  htmlFor: string,
  label: string,
  type: string,
  id: string,
  placeholder: string,
  name: string,
}

export const Input = (inputAttributes: Input, handleOnChange: any) => {
  const { htmlFor, label, type, placeholder, name } = inputAttributes
  return (
    <div key={label} className="flex flex-col w-full gap-2">
      <div className="flex justify-between">
        <label htmlFor={htmlFor} className="font-semibold capitalize">
          {label}
        </label>
      </div>
      <input
        id={label}
        name={name}
        type={type}
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