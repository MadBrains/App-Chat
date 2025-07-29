import {styled} from "@mui/material/styles";
import {Menu as MuiMenu, MenuItem as MuiMenuItem} from "@mui/material";

export const MenuItem = styled(MuiMenuItem)`
  padding: 10px;
  margin: 5px 0;
  
  & .MuiTypography-root {
    font-size: 14px;
  }
`;
export const Menu = styled(MuiMenu)`
  .MuiList-root {
    padding: 2px 15px;
    letter-spacing: -0.03em;
  }
`;
