import { GlobalStyles as GlobalStyle } from "@mui/styled-engine";

const GlobalStyles = () => {
  return (
    <GlobalStyle
      styles={{
        "@font-face": {
          fontFamily: "Katuri",
          src: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_13@1.0/Katuri.woff') format('woff')`,
          fontWeight: "normal",
          fontStyle: "normal",
        },
        
        "html, body": {
          padding: 0,
          margin: 0,
          fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
        },

        a: {
          color: "inherit",
          textDecoration: "none",
        },

        "*": {
          boxSizing: "border-box",
        },

        // '.css-1wugh11-MuiButtonBase-root-MuiListItemButton-root': {
        //   padding: '4px 10px !important',
        //   margin: '10px 6px !important',
        //   '&:hover': {
        //     backgroundColor: 'rgba(84, 209, 63, .12) !important',
        //   },
        // },
        // '.css-1wugh11-MuiButtonBase-root-MuiListItemButton-root.Mui-selected': {
        //   backgroundColor: 'rgba(84, 209, 63, .24) !important',
        //   '& svg': {
        //     color: '#4c7727'
        //   },
        //   '& span': {
        //     color: '#4c7727'
        //   }
        // }
      }}
    />
  );
};

export default GlobalStyles;
