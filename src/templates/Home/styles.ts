import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-direction: row;

  & > span {
    flex-grow: 1;
    background: linear-gradient(233deg, #ffb800 0%, #b4c749 47%, #008d00 97%);
  }
`;

export const MainColumn = styled.main`
  display: flex;
  flex-direction: column;
  width: 340px;
  padding: 40px;
  background-color: #f5f5f5;

  justify-content: center;
  align-items: center;

  & > span {
    flex-grow: 0;
    width: 100%;
    margin-bottom: 4px;
  }

  form,
  form > * {
    width: 100%;
  }
`;
