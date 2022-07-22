import axios from "axios";
import { AiOutlineConsoleSql } from "react-icons/ai";

const backendPortNumber = "3000";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";

async function getAuth(endpoint, params = "") {
  console.log(`%cGET 요청 ${serverUrl + endpoint + params}`, "color: #a25cd1;");
  let response;
  try {
    response = await axios.get(serverUrl + endpoint + params, {
      // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
      headers: {
        Authorization: `${localStorage.getItem("userToken")}`,
      },
    });

    console.log(response);
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/401";
    }
  }
  return response;
}

// noToken get요청
async function get(endpoint, params = "") {
  console.log(`%cGET 요청 ${serverUrl + endpoint + params}`, "color: #a25cd1;");

  return axios.get(serverUrl + endpoint + params);
}

async function postAuth(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPOST 요청: ${serverUrl + endpoint}`, "color: #296aba;");
  console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

  let response;
  try {
    response = await axios.post(serverUrl + endpoint, bodyData, {
      // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("userToken")}`,
      },
    });
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/401";
    }
  }
  return response;
}

async function post(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPOST 요청: ${serverUrl + endpoint}`, "color: #296aba;");
  console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("userToken")}`,
    },
  });
}

async function postImg(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}

  console.log(`%cPOST Img 요청: ${serverUrl + endpoint}`, "color: #059c4b;");
  console.log(`%cPOST Img 요청 데이터: ${data}`, "color: #059c4b;");

  return axios.post(serverUrl + endpoint, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `${localStorage.getItem("userToken")}`,
    },
  });
}

async function postImgAuth(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}

  console.log(`%cPOST Img 요청: ${serverUrl + endpoint}`, "color: #059c4b;");
  console.log(`%cPOST Img 요청 데이터: ${data}`, "color: #059c4b;");

  let response;
  try {
    response = axios.post(serverUrl + endpoint, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${localStorage.getItem("userToken")}`,
      },
    });
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/401";
    }
  }
  return response;
}

async function putAuth(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPUT 요청: ${serverUrl + endpoint}`, "color: #059c4b;");
  console.log(`%cPUT 요청 데이터: ${bodyData}`, "color: #059c4b;");

  let response;
  try {
    response = await axios.put(serverUrl + endpoint, bodyData, {
      // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("userToken")}`,
      },
    });
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/401";
    }
  }
  return response;
}

async function put(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPUT 요청: ${serverUrl + endpoint}`, "color: #059c4b;");
  console.log(`%cPUT 요청 데이터: ${bodyData}`, "color: #059c4b;");

  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function patchAuth(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);

  console.log(`%cPATCH 요청: ${serverUrl + endpoint}`, "color: #059c4b;");
  console.log(`%cPATCH 요청 데이터: ${bodyData}`, "color: #059c4b;");

  let response;
  try {
    response = await axios.patch(serverUrl + endpoint, bodyData, {
      // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("userToken")}`,
      },
    });
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/401";
    }
  }
  return response;
}

async function patch(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);

  console.log(`%cPATCH 요청: ${serverUrl + endpoint}`, "color: #059c4b;");
  console.log(`%cPATCH 요청 데이터: ${bodyData}`, "color: #059c4b;");

  return axios.patch(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function deleteAuth(endpoint, params = "") {
  console.log(`DELETE 요청 ${serverUrl + endpoint + "/" + params}`);

  let response;
  try {
    response = await axios.delete(serverUrl + endpoint + "/" + params, {
      // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
      headers: {
        Authorization: `${localStorage.getItem("userToken")}`,
      },
    });
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/401";
    }
  }
  return response;
}

async function del(endpoint, params = "") {
  console.log(`DELETE 요청 ${serverUrl + endpoint + "/" + params}`);
  return axios.delete(serverUrl + endpoint + "/" + params);
}
// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export {
  get,
  getAuth,
  post,
  postAuth,
  postImgAuth,
  put,
  patchAuth,
  patch,
  postImg,
  deleteAuth,
  del as delete,
};
