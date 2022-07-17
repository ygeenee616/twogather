import styled from "styled-components";
import { FcSettings } from "react-icons/fc";

export default function BookedButtonBox() {
  return (
    <ButtonBox>
      <Button>
        <FcSettings size="1.5rem" className="icon" />
      </Button>
    </ButtonBox>
  );
}

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const Button = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & .icon:hover {
    transform: scale(1.1);
    transition: 0.3s;
  }
`;
