import React, { ChangeEventHandler, useState } from "react"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import TTTLogo from "../assets/TTTLogo.jpg"

export const Navbar = (props: any) => {
  const {
    loggedInUser,
    setRegisterSigninModal,
  } = props;

  const [nav, setNav] = useState(false);
  const [postsSubNav, setPostsSubNav] = useState(false);

  const postsSubNavItems = [
    { id: 1, text: "Create a Post", hideIfLoggedIn: false, link: "" },
    { id: 2, text: "Browse Posts", hideIfLoggedIn: false, link: "" }
  ]

  const navItems = [
    { id: 1, text: "Home", link: "/" },
    { id: 2, text: "Sign up/Sign In", hideIfLoggedIn: true, link: "", action: () => { console.log("show logged in user"); setRegisterSigninModal(true) } },
    { id: 3, text: "BG Posts", link: "", hideIfLoggedOut: true, subNavBar: setPostsSubNav },
  ];

  // Toggle function to handle the navbar"s display
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="bg-green-300 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        {/* Logo */}
        <div className="grid grid-cols-5">
          <img className="h-12 w-12" src={TTTLogo} alt="Let's Roll" />
          <h1 className="text-3xl font-bold text-red-600 col-span-4 col-start-2">Table Top Trader</h1>
        </div>
        {/* Desktop Navigation */}
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:border-gray-700">
          {!postsSubNav &&
            navItems
              .filter(({ hideIfLoggedIn }) => (loggedInUser && !hideIfLoggedIn) || true)
              .map((item) => {
                return (
                  <li
                    key={item.id}
                    className="block py-2 px-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  >
                    <p onClick={item.action}>{item.text}</p>
                  </li>
                )
              })}
          {
            postsSubNav &&
            postsSubNavItems
              .filter(({ hideIfLoggedIn }) => !hideIfLoggedIn)
              .map((item) => {
                return (
                  <div id="mega-menu-full-dropdown" className="mt-1 border-gray-200 shadow-sm border-y dark:border-gray-600">
                    <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">

                      <li>
                        <a href={`/${item.text}`} className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                          {item.text}
                        </a>
                      </li>
                    </div>
                  </div>
                )
              })
          }
        </ul>

        {/* Mobile Navigation Icon */}
        <div onClick={handleNav} className="block md:hidden">
          {nav ?
            <AiOutlineClose size={20} /> :
            <AiOutlineMenu size={20} />}
        </div>

        {/* Mobile Navigation Menu */}
        <ul
          className={
            nav
              ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
              : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
          }
        >
          {/* Mobile Logo */}
          <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">REACT.</h1>

          {/* Mobile Navigation Items */}
          {navItems.map(item => (
            <li
              key={item.id}
              className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600"
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
