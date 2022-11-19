// import React, { useState } from "react";
// import { uploadFile } from "react-s3";
// import * as Api from "../../api";
// import styled from "styled-components";
// import { useEffect } from "react";

// const ImgToS3 = ({ imageState, spaceId, imgData }) => {
//   //   const [selectedFile, setSelectedFile] = useState(null);
//   const [viewState, setViewState] = useState(null);
//   //업로드 버튼 클릭 및 onChange 시 사진파일 갱신

//   //   const data = new FormData();
//   //   const handleImgFileInput = (e) => {
//   //     imageState = e.target.files[0];
//   //     data.append("images", imageState);
//   //     console.log(data);
//   //     imageState = data;
//   //     console.log(imageState);
//   //   };

//   //이미지 미리보기 로직,
//   const loadDetailImage = (e) => {
//     setViewState(e.target.files);

//     const fileArr = Array.from(e.target.files);
//     const imgBox = document.querySelector(".imgBox");
//     fileArr.forEach((file, index) => {
//       const reader = new FileReader();

//       //이미지 박스와 이미지 생성
//       const imgDiv = document.createElement("div");
//       const img = document.createElement("img");

//       img.classList.add("image"); //이미지에 이미지 태그 붙이기
//       imgDiv.classList.add("imgDiv");

//       imgDiv.addEventListener("click", (e) => {
//         fileArr.splice(index, 1);
//         setViewState(fileArr);
//         e.target.remove();
//         imgDiv.remove();
//       });

//       imgDiv.appendChild(img);

//       reader.onload = () => {
//         img.src = reader.result;
//       }; //end on load

//       imgBox.appendChild(imgDiv);
//       reader.readAsDataURL(file);
//     });
//   };

//   //개수 4개 제한걸고, spaceId받아오기

//   //이미지 업로드 버튼 클릭시
//   //이미지 등록 api

//   //   const handleImgUpload = async (selectedFile, spaceId) => {
//   //     console.log(selectedFile);

//   //     Array.from(selectedFile).map((item) => {
//   //       imgData.append("images", item);
//   //       console.log(item.name);
//   //     });

//   //     setImageState(imgData);
//   //     //이미지 등록 api
//   //     await Api.postImg(`api/uploads/space/${spaceId}`, imgData);
//   //   };

//   return (
//     <InputBox>
//       <StyledLabel>공간 이미지 선택</StyledLabel>
//       <SubImageView
//         className="imgBox"
//         name="spaceSubImages"
//         onChange={loadDetailImage}
//       ></SubImageView>
//       <ImageInput
//         name="images"
//         type="file"
//         multiple
//         accept="image/*"
//         onChange={(e) => {
//           loadDetailImage(e);
//           handleImgFileInput(e);
//         }}
//         id="imgs"
//         style={{ display: "none" }}
//       ></ImageInput>
//       <Label for="imgs" id="imgs" type="file">
//         사진선택
//       </Label>
//       {/* <input type="file" name="uploadfile" id="img" style="display:none;" />{" "}
//     <label for="img">Click me to upload image</label> */}
//     </InputBox>
//   );
// };

// const StyledButton = styled.button`
//   width: 48%;
//   height: 40px;
//   line-height: 40px;

//   border: none;
//   border-radius: 10px;
//   font-size: 1rem;

//   background-color: ${(props) => props.backGroundColor};
//   color: ${(props) => props.color};

//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   transition-duration: 0.3s;

//   :hover {
//     background-color: #5155a6;
//   }
//   & + & {
//     margin-left: 20px;
//   }
// `;

// const SubImageView = styled.div`
//   border: 1px solid lightgrey;
//   outline-color: #8daef2;
//   height: 300px;
//   margin: 10px 0;
//   padding: 5px;
//   width: 100%;
//   overflow: auto;
//   border-radius: 4px;
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr 1fr;

//   .image {
//     width: 100%;
//     display: block;
//   }
// `;

// const ImageView = styled.div`
//   border: 1px solid lightgrey;
//   outline-color: #8daef2;
//   height: 300px;
//   margin: 10px 0;
//   padding: 5px;
//   width: 100%;
//   overflow: auto;
//   border-radius: 4px;
// `;

// const InputBox = styled.div`
//   display: flex;
//   align-items: start;
//   text-align: start;
//   flex-direction: column;
//   margin: 40px auto;
// `;

// const Label = styled.label`
//   width: 48%;
//   height: 40px;
//   line-height: 40px;

//   border: none;
//   border-radius: 10px;
//   font-size: 1rem;

//   background-color: #8daef2;
//   color: white;

//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   transition-duration: 0.3s;

//   :hover {
//     background-color: #5155a6;
//   }
//   & + & {
//     margin-left: 20px;
//   }
// `;

// const StyledLabel = styled.div`
//   color: #8daef2;
//   text-align: start;
//   font-family: system-ui;
//   margin-bottom: 10px;
//   font-size: 1rem;
//   font-style: bold;
// `;

// const ImageInput = styled.input``;

// export default ImgToS3;
