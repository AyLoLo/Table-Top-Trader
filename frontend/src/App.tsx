import { useState, useEffect, ChangeEvent } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { uploadFile, FileStateProperties } from "./utils/s3_helper";

import { Navbar } from "./components/navbar"
import Home from "./pages/Home"
import { URL } from "./constants"
import PostMap from "./pages/PostMap"
import { PostsMap } from "./components/postsMap"
import { RegisterSignIn } from "./components/registerSignIn"


const App = () => {
  let location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState<boolean>(false);
  const [registerSigninModal, setRegisterSigninModal] = useState<boolean>(false);

  const [file, setFile] = useState<FileStateProperties>();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    let files = (e.target as HTMLInputElement).files;
    files && files[0] && setFile(files[0]);
  };


  useEffect(() => {
    fetch(`${URL}session-status`)
      .then(response => response.json())
      .then(json => setLoggedInUser(json?.logged_in))
      .catch(error => {
        setLoggedInUser(false);
        console.error(error);
      });
  }, []);

  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCoords({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      err => {
        setLoading(false);
        console.log(err);
      }
    );
  }, []);

  return (
    <div className="App overflow-x-hidden relative">
      <Navbar
        registerSigninModal={registerSigninModal}
        setRegisterSigninModal={setRegisterSigninModal}
        loggedInUser={loggedInUser}
      />

      {/* <PostMap /> */}
      <PostsMap
        mapCoords={coords}
        setMapCoords={setCoords}
        loading={loading}
        setLoading={setLoading}
        draggableMarker={true}
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
          {/* <Route path="/posts" element={<Posts />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile element={<Profile />} /> */}
        </Routes>
      </>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={() => uploadFile(file!)}>Upload</button>
      </div>
    </div>
  );
}

export default App;