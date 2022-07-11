import { useScript } from "./usefulFunction";


function kakaoLogin() {
    window.Kakao.Auth.login({
        scope: 'profile, account_email, gender',
        success: function(authObj){
            window.Kakao.API.request({
                url:'v2/user/me',
                success: res => {
                    const kakao_account = res.kakao_account;
                }
            })
        }
    })


}
