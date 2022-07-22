import { GoogleLogin } from "react-google-login";
import * as Api from "../../api";

const CLIENT_ID =
  "356728374824-e4eaoap3tv0cr35gtq8i46qhlpts75nq.apps.googleusercontent.com";

const onSuccess = (res) => {
  console.log("LOGIN SUCESS! Current user: ", res.profileObj);
  const { email, name, imageUrl } = res.profileObj;
  const data = {
    email: email,
    nickname: name,
    loginType: "google",
    profileImg: imageUrl,
  };

  // "/apiusers/sign-in" 엔드포인트로 post요청함.
  const googleRegister = async () => {
    try {
      const res = await Api.post("api/users/sign-up", data);
    } catch (error) {
      console.log(error);
    }
  };
  // register 처리
  // try {
  //   const result = await Api.postAuth("");
  // } catch (err) {}
};
const onFailure = (res) => {
  console.log("LOGIN FAILED! res: ", res);
};

const btnStyle = {
  height: "2rem",
  width: "20rem",
  borderRadius: 10,
  fontWeight: "bold",
  margin: "0.5rem",
  border: "solid 0.1em #d9d9d9",
};

export default function LoginWithGoogle({ buttonText, isStart }) {
  const elem = <GoogleLogin />;
  console.log(elem.props.disabledStyle);

  return (
    <div id="singInButton">
      <GoogleLogin
        clientId={CLIENT_ID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        disabledStyle={btnStyle}
      >
        구글로 시작하기
      </GoogleLogin>
    </div>
  );
}
