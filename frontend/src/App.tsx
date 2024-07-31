import { ChangeEvent, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { uploadFile, FileStateProperties } from "./util/s3_helper";

import { Navbar } from "./components/navBar"
import Home from "./pages/Home"

import { RegisterSignIn } from "./components/registerSignIn"

const App = () => {
  // const [file, setFile] = useState<FileStateProperties>();
  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   let files = (e.target as HTMLInputElement).files;
  //   files && files[0] && setFile(files[0]);
  // };

  return (
    <div className="App">
      <Navbar props={null}/>
      {/* <button data-modal-target="static-modal" data-modal-toggle="static-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Toggle modal
      </button> */}

      <RegisterSignIn />
      <>
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/posts" element={<Posts />} />
            <Route path="/about" element={<About />} />
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