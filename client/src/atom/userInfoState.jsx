import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

const userInfoState = atom({
  key: "userInfoState",
  default: {
    userId: "",
    userName: "",
    userEmail: "",
    useType: "user",
    nickName: "",
    
  },
});

export default userInfoState;

// const userInfoSelector = selector({
//   key: "userInfoSelector",
//   get: ({ get }) => {
//     return userInfoState;
//   },
// });

export { userInfoState };
