import AWS from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { ChangeEvent, useState } from "react";

interface FileStateProperties {
  name: string;
}

function App() {
  // Create state to store file
  const [file, setFile] = useState<FileStateProperties>();

  // Function to upload file to s3
  const uploadFile = async () => {
    // S3 Bucket Name
    const S3_BUCKET : string = (process.env.S3_IMAGE_BUCKET_NAME as string);

    // S3 Region
    const REGION : string = (process.env.BUCKET_REGION as string);

    // S3 Credentials
    AWS.config.update({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Files Parameters

    const params: PutObjectRequest = {
      Bucket: S3_BUCKET,
      Key: file?.name || "",
      Body: file,
      ACL: "public-read",
    };

    // Uploading file to s3

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        return console.log(
            "uploading..."
          );
      })
      .promise();

    await upload;
  };
  // Function to handle file and store it to file state
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    let files = (e.target as HTMLInputElement).files;
    files && files[0] && setFile(files[0]);
  };

  return (
    <div className="App">
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
    </div>
  );
}

export default App;