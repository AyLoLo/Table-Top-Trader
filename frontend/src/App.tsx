import { ChangeEvent, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { uploadFile, FileStateProperties } from "./util/s3_helper";

import { Navbar } from "./components/navbar"
import Home from "./pages/Home"


function App() {
  const [file, setFile] = useState<FileStateProperties>();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    let files = (e.target as HTMLInputElement).files;
    files && files[0] && setFile(files[0]);
  };

  return (
    <div className="App">
      <Navbar props={null}/>
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