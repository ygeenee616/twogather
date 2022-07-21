import React, { useState } from "react";
import { uploadFile } from "react-s3";
import * as Api from "../../api";

const ImgToS3 = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const imgName = "";
  const handleFileInput = (e) => {
    console.log(e.target.files);
    setSelectedFile(e.target.files);
    imgData.append("images", selectedFile);
    console.log(imgData);

  };

  //개수 4개 제한걸고, spaceId받아오기
  //예정예정룸112
  const spaceId = 112;
  const imgData = new FormData();



  
  const handleUpload = async (selectedFile) => {
    console.log(selectedFile);

    Array.from(selectedFile).map((item) => {
      imgData.append("images", item);
      console.log(item.name);
    });

    await Api.postImg(`api/uploads/space/${spaceId}`, imgData);
  };

  return (
    <div>
      <div>React S3 File Upload</div>
      <input type="file" name="images" multiple onChange={handleFileInput} />
      <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
  );
};

export default ImgToS3;
