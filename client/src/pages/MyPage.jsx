import styled from "styled-components";
import MyProfile from "../components/MyProfile";

function MyPage() {
  return (
    <div>
      <PageTitle> 마이페이지 </PageTitle>
      <MyProfile></MyProfile>
    </div>
  );
}

const PageTitle = styled.div`
  color: #a8c1e8;
`;


export default MyPage;