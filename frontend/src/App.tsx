import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
// import { uploadFile, FileStateProperties } from "./util/s3_helper";

import { Navbar } from "./components/navbar"
import Home from "./pages/Home"
import Posts from "./pages/Posts";
import Pagination from "./components/pagination"
import { RegisterSignIn } from "./components/registerSignIn"

import { URL } from "./constants"

const App = () => {
  let location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState<boolean>(false);
  const [registerSigninModal, setRegisterSigninModal] = useState<boolean>(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(true)
  const [postsPerPage, setPostsPerPage] = useState(10)
  // const [file, setFile] = useState<FileStateProperties>();
  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   let files = (e.target as HTMLInputElement).files;
  //   files && files[0] && setFile(files[0]);
  // };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // correct fetch?
        const response = await fetch(`${URL}posts`)
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts()
  }, []);

  useEffect(() => {
    fetch(`${URL}session-status`)
      .then(response => response.json())
      .then(json => setLoggedInUser(json?.logged_in))
      .catch(error => {
        setLoggedInUser(false);
        console.error(error);
      });
  }, []);

  // not sure what to do with this yet
  const handlePagination = (pageNumber) => {
    setCurrentPage (pageNumber);
  };

  return (
    <div className="App">
      <Navbar
        registerSigninModal={registerSigninModal}
        setRegisterSigninModal={setRegisterSigninModal}
        loggedInUser={loggedInUser}
      />
      {/* <button data-modal-target="static-modal" data-modal-toggle="static-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Toggle modal
      </button> */}

      {registerSigninModal &&
        <RegisterSignIn
          allowExit={location.pathname === "/"}
          hideModal={(() => setRegisterSigninModal(false))}
        />
      }
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<><Posts posts={posts} loading={loading}/><Pagination/></>} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/profile element={<Profile />} /> */}
        </Routes>
      </>
      {/* <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={() => uploadFile(file!)}>Upload</button>
      </div> */}
    </div>
  );
}

export default App;