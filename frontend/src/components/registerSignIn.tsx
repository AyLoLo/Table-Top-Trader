import React, { useState, useEffect, ChangeEvent, ReactElement } from "react"
import {
  FORM_INPUTS,
  URL,
} from "../constants"
import { Input } from "./input"
import { FormProvider, useForm } from "react-hook-form";
import { bool } from "aws-sdk/clients/signer";
// import { AiOutlineConsoleSql } from "react-icons/ai";
// import { InputProp } from "interfaces/InputProp";

export const Form = (props: {
  showSignIn: bool;
  signInUser: Function;
  registerUser: Function;
  handleOnChange: any;
  error: string;
  hideModal: Function;
  allowExit: boolean;
}): ReactElement<any> => {

  const {
    showSignIn,
    signInUser,
    registerUser,
    handleOnChange,
    error,
    allowExit,
    hideModal,
  } = props

  const methods = useForm()

  const onSubmit = methods.handleSubmit(() => {
    showSignIn ? signInUser() : registerUser();
  })

  return (
    <>
      <FormProvider {...methods}>
        <form className="h-3/4 w-full">
          {error && <p className="text-red-500">{error}</p>}
          {showSignIn ?
            FORM_INPUTS
              .filter((items: any) => items.includeInSignIn)
              .map((inputItems: any) =>
                <div className="m-3" key={inputItems.label} >
                  <Input handleOnChange={handleOnChange} inputAttributes={inputItems} />
                </div>
              )
            :
            FORM_INPUTS.map((inputItems: any) => (
              <div className="m-3" key={inputItems.label}>
                <Input handleOnChange={handleOnChange} inputAttributes={inputItems} />
              </div>
            ))
          }
          <div className="flex items-center justify-end pt-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-white bg-green-300 active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={onSubmit}
            >
              {showSignIn ? "Sign In" : "Register"}
            </button>
            {allowExit &&
              <button
                className="text-white bg-red-500 active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => hideModal()}
              >
                Close
              </button>}
          </div>
        </form>
      </FormProvider >
    </>
  );
}

export const RegisterSignIn = (props: any) => {
  const { hideModal, allowExit } = props
  const [showSignIn, setShowSignIn] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const tabs = [
    { "text": "Sign In" },
    { "text": "Register" },
  ]
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {

    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      default:
        break;
    }
  }

  const signInUser = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    await fetch(`${URL}login`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: myHeaders,
    }).then(response => response.json()).then(response => {
      if (!response.error) {
        hideModal();
        return response;
      }
      setError(response.error)
    }).catch(error => console.error(error));
  }
  const registerUser = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    await fetch(`${URL}users`, {
      method: "POST",
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username,
        password,
        email
      }),
      headers: myHeaders,
    }).then(response => response.json()).then(response => {
      if (!response.error) {
        hideModal();
        return response;
      }
      setError(response.error)
    }).catch(error => console.error(error))
  }

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-700 bg-opacity-70">
      <div className="relative my-6 w-2/4 max-w-xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between border-b border-solid border-gray-300 rounded-t ">
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 w-full">
              {
                tabs.map(({ text }) =>
                  <li className="w-3/6">
                    <button key={text} onClick={() => setShowSignIn(text !== "Register")} className={`w-full inline-block p-4 text-blue-600 border-solid border border-solid
	border-gray-300 rounded-t-lg active hover:text-blue-400 ${(showSignIn && text === "Sign In") || (!showSignIn && text === "Register") ? "bg-gray-100" : "bg-gray-300"}`}>{text}</button>
                  </li>
                )
              }
            </ul>
          </div>
          <div className="relative p-6 flex-auto">
            <Form
              allowExit={allowExit}
              hideModal={hideModal}
              error={error}
              handleOnChange={handleOnChange}
              showSignIn={showSignIn}
              signInUser={signInUser}
              registerUser={registerUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

