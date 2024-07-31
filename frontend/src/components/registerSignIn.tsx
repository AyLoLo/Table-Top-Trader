import React, { useState } from "react"

export const RegisterSignIn = (props: any) => {
  const [showModal, setShowModal] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);

  const registrationInputs = [
    { "id": 1, "text": "Email", "labelFor": "email", "inputType": "email", "required": true, "maxlength": 50, "minlength": 8 },
    { "id": 2, "text": "Username", "labelFor": "username", "inputType": "text", "minlength": 5, "maxlength": 15, "required": true },
    { "id": 3, "text": "Password", "labelFor": "password", "inputType": "password", "minlength": 8, "maxlength": 25, "required": true },
    { "id": 4, "text": "First Name", "labelFor": "fname", "inputType": "text", "minlength": 3, "maxlength": 20, "required": true },
    { "id": 5, "text": "Last Name", "labelFor": "lname", "inputType": "text", "minlength": 2, "maxlength": 25, "required": true },
  ];

  const signinInputs = [
    { "id": 1, "text": "Email", "labelFor": "email", "inputType": "email", "required": true, "maxlength": 50, "minlength": 8 },
    { "id": 2, "text": "Password", "labelFor": "password", "inputType": "password", "minlength": 8, "maxlength": 25, "required": true },
  ];
  const tabs = [
    { "id": 1, "text": "Sign In" },
    { "id": 2, "text": "Register" },
  ]

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
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-700 bg-opacity-70">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between border-b border-solid border-gray-300 rounded-t ">
                  {/* <h3 className="text-3xl font=semibold">Sign In</h3> */}
                  <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500">
                    {
                      tabs.map(({ id, text }) =>
                        <li className="me-2">
                          <button key={id} onClick={() => setShowSignIn(id === 1)} className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active hover:text-blue-400">{text}</button>
                        </li>
                      )
                    }
                  </ul>
                </div>

                <div className="relative p-6 flex-auto">
                  <form className="px-8 pt-6 pb-8 w-full">
                    {showSignIn ?
                      signinInputs.map(({ id, text, labelFor, inputType, minlength, maxlength, required }) => (
                        <div className="my-5 m-3" key={id} >
                          <label htmlFor={labelFor} className="block text-black text-sm font-bold mb-1">
                            {text}
                          </label>
                          <input type={inputType} required={required} minLength={minlength} maxLength={maxlength} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                        </div>
                      ))
                      :
                      registrationInputs.map(({ id, text, labelFor, inputType, minlength, maxlength, required }) => (
                        <div className="my-5 m-3" key={id} >
                          <label htmlFor={labelFor} className="block text-black text-sm font-bold mb-1">
                            {text}
                          </label>
                          <input type={inputType} required={required} minLength={minlength} maxLength={maxlength} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                        </div>
                      ))
                    }
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div >
        </>
      ) : null}
    </>
  )
}