import React, { useState, useEffect, ChangeEvent, ReactElement } from "react"
import {
  EMAIL_MAX_LEN,
  PASSWORD_MAX_LEN,
  FIRST_NAME_MAX_LEN,
  LAST_NAME_MAX_LEN,
  USERNAME_MAX_LEN,
  EMAIL_MIN_LEN,
  PASSWORD_MIN_LEN,
  FIRST_NAME_MIN_LEN,
  LAST_NAME_MIN_LEN,
  USERNAME_MIN_LEN,
  URL,
} from "../constants"
import { Input } from "./input"
import { FormProvider, useForm } from "react-hook-form";
import { bool } from "aws-sdk/clients/signer";

interface InputProp {
  label: string;
  placeholder: string;
  htmlFor: string;
  type: string;
  name: string;
  validation: {
    required: {
      value: boolean;
      message: string;
    };
    minLength: {
      value: number;
      message: string;
    };
    maxLength: {
      value: number;
      message: string;
    }
  }
  includeInSignIn?: bool | undefined;
}

export const Form = (props: { formInputs: InputProp[]; showSignIn: bool; signInUser: any; registerUser: any; }): ReactElement<any> => {
  const {
    formInputs, showSignIn, signInUser, registerUser
  } = props

  const methods = useForm()

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data)
  })



  return (
    <>
      <FormProvider {...methods}>
        <form className="px-8 pt-6 pb-8 w-full">
          {showSignIn ?
            formInputs
              .filter((items: any) => items.includeInSignIn)
              .map((inputItems: any) => (
                <div className="my-5 m-3" key={inputItems.label} >
                  <Input {...inputItems} />
                </div>
              ))
            :
            formInputs.map((inputItems: any) => (
              <div className="my-5 m-3" key={inputItems.label} >
              </div>
            ))
          }
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={() => {
                onSubmit();
                return showSignIn ? signInUser : registerUser
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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSignIn, setShowSignIn] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const formInputs = [
    {
      "label": "Email",
      "placeholder": "Email",
      "htmlFor": "email",
      "type": "email",
      "name": "email",
      "validation": {
        required: {
          value: true,
          message: 'required',
        },
        minLength: {
          value: EMAIL_MIN_LEN,
          message: `min ${EMAIL_MIN_LEN} characters`,
        },
        maxLength: {
          value: EMAIL_MAX_LEN,
          message: `max ${EMAIL_MAX_LEN} characters`,
        }

      }
    },
    {
      "label": "Username",
      "placeholder": "Username",
      "htmlFor": "username",
      "type": "text",
      "name": "username",
      "validation": {
        required: {
          value: true,
          message: 'required',
        },
        minLength: {
          value: USERNAME_MIN_LEN,
          message: `min ${USERNAME_MIN_LEN} characters`,
        },
        maxLength: {
          value: USERNAME_MAX_LEN,
          message: `max ${USERNAME_MAX_LEN} characters`,
        }
      },
      "includeInSignIn": true,
    },
    {
      "label": "Password",
      "placeholder": "Password",
      "htmlFor": "password",
      "type": "password",
      "name": "password",
      "validation": {
        required: {
          value: true,
          message: 'required',
        },
        minLength: {
          value: PASSWORD_MIN_LEN,
          message: `min ${PASSWORD_MIN_LEN} characters`,
        },
        maxLength: {
          value: PASSWORD_MAX_LEN,
          message: `max ${PASSWORD_MAX_LEN} characters`,
        }
      },
      "includeInSignIn": true,
    },
    {
      "label": "First Name",
      "placeholder": "First Name",
      "htmlFor": "fname",
      "type": "text",
      "name": "firstName",
      "validation": {
        required: {
          value: true,
          message: 'required',
        },
        minLength: {
          value: FIRST_NAME_MIN_LEN,
          message: `min ${FIRST_NAME_MIN_LEN} characters`,
        },
        maxLength: {
          value: FIRST_NAME_MAX_LEN,
          message: `max ${FIRST_NAME_MAX_LEN} characters`,
        }
      },
    },
    {
      "label": "Last Name",
      "placeholder": "Last Name",
      "htmlFor": "lname",
      "type": "text",
      "name": "lastName",
      "validation": {
        required: {
          value: true,
          message: 'required',
        },
        minLength: {
          value: LAST_NAME_MIN_LEN,
          message: `min ${LAST_NAME_MIN_LEN} characters`,
        },
        maxLength: {
          value: LAST_NAME_MAX_LEN,
          message: `max ${LAST_NAME_MAX_LEN} characters`,
        }
      },
    },
  ];

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
    <>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
        font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
        toggle modal
      </button>
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
              {/* TODO: FORM HERE */}
              <Form
                showSignIn={showSignIn}
                signInUser={signInUser}
                registerUser={registerUser}
                formInputs={formInputs}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

