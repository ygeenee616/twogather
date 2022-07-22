import styled from "styled-components";

export default function TypeSelector({ state, setState }) {
  const lists = state.items;

  function handleSelectItem(e) {
    setState({ ...state, selectItem: e.target.value });
    console.log(e.target.value);
  }

  return (
    <>
      <Container>
        {lists.map((item, i) => {
          return (
            <RadioBox key={i}>
              <label>
                <input
                  value={item}
                  type="radio"
                  name="spaceType"
                  onChange={(e) => {
                    handleSelectItem(e);
                  }}
                  checked={state.selectItem === item}
                />
                {item}
              </label>
            </RadioBox>
          );
        })}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const RadioBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
