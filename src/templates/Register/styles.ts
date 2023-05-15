import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const BoxStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  min-height: 100vh;

  & > div {
    width: 100%;
  }

  & > div > span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & div.loginInputs {
    margin-bottom: 24px;
  }
`;

export const Header = styled(Box)`
  justify-content: initial !important;
  margin-bottom: 24px;
`;
