import React, { useState, useEffect, ChangeEvent, ReactElement } from "react"
import {
  FORM_INPUTS,
  URL,
} from "../constants"
import { Input } from "./input"
import { FormProvider, useForm } from "react-hook-form";
import { bool } from "aws-sdk/clients/signer";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { InputProp } from "interfaces/InputProp";

export const Form = (props: { showSignIn: bool; signInUser: any; registerUser: any; handleOnChange: any; }): ReactElement<any> => {
  const {
    showSignIn, signInUser, registerUser, handleOnChange
  } = props

  const methods = useForm()

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data)
  })

  return (
    <>
      <FormProvider {...methods}>
        <form className="px-8 h-3/4 pb-8 w-full">
          {showSignIn ?
            FORM_INPUTS
              .filter((items: any) => items.includeInSignIn)
              .map((inputItems: any) =>
                <div className="my-5 m-3" key={inputItems.label} >
                  <Input handleOnChange={handleOnChange} inputAttributes={inputItems} />
                </div>
              )
            :
            FORM_INPUTS.map((inputItems: any) => (
              <div className="my-5 m-3" key={inputItems.label}>
                <Input handleOnChange={handleOnChange} inputAttributes={inputItems} />
              </div>
            ))
          }
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={() => {
                onSubmit();
                showSignIn ? signInUser() : registerUser();
              }}
            >
              {showSignIn ? "Sign In" : "Register"}
            </button>
          </div>
        </form>
      </FormProvider >
    </>
  );
}

export const RegisterSignIn = (props: any) => {
  const [showSignIn, setShowSignIn] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

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

    const response = await fetch(`${URL}login`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: myHeaders,
    });
    console.log(response);
  }

  const registerUser = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(`${URL}users`, {
      method: "POST",
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username,
        password,
        email
      }),
      headers: myHeaders,
    });
    console.log(response);
  }
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-700 bg-opacity-70">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">

        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between border-b border-solid border-gray-300 rounded-t ">
            {/* <h3 className="text-3xl font=semibold">Sign In</h3> */}
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500">
              {
                tabs.map(({ text }) =>
                  <li className="me-2">
                    <button key={text} onClick={() => setShowSignIn(text !== "Register")} className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active hover:text-blue-400">{text}</button>
                  </li>
                )
              }
            </ul>
          </div>
          <div className="relative p-6 flex-auto">
            <Form
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

