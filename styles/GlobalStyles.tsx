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
        // 사이드바 Drawer 스타일링
        '.css-12i7wg6-MuiPaper-root-MuiDrawer-paper': {
          backgroundColor: '#009e5d !important',
          boxShadow: '7px -6px 16px -8px rgba(176,176,176,1) !important',
          border: 'none !important',
        },
        // ListItemIcon 스타일링
        '.MuiListItemIcon-root.css-cveggr-MuiListItemIcon-root': {
          color: '#fff',
          // minWidth: '50px',
          marginLeft: '10px',
        },
        // ListItemText 스타일링
        '.MuiListItemText-primary.css-10hburv-MuiTypography-root': {
          color: '#fff',
          fontFamily: 'Katuri',
          fontSize: 18,
        },

        '.css-nzzti6-MuiButtonBase-root-MuiListItemButton-root': {
          padding: '4px 10px !important',
          margin: '10px 6px !important',
          borderRadius: '4px !important',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, .6) !important',
            '& svg': {
              color: '#009e5d'
            },
            '& span': {
              color: '#009e5d'
            }
          },
        },
        '.css-nzzti6-MuiButtonBase-root-MuiListItemButton-root.Mui-selected': {
          backgroundColor: '#fff !important',
          '& svg': {
            color: '#009e5d'
          },
          '& span': {
            color: '#009e5d'
          }
        }
      }}
    />
  );
};

export default GlobalStyles;
