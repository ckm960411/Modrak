import { GlobalStyles as GlobalStyle } from "@mui/styled-engine";

export const mainColor = '#009e5d'

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
        
        // Card 컴포넌트 마지막 CardContent 아래 padding 없애기
        '.css-46bh2p-MuiCardContent-root:last-child': {
          padding: '16px !important',
        },
        // 모달 띄웠을 때 배경 색상
        '.css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop': {
          backgroundColor: 'rgba(0, 0, 0, .07) !important'
        },
        // 로그인&회원가입 폼 인풋 스타일링
        'input.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
          padding: '8px 16px',
        },
        // 사이드바 Drawer 스타일링
        '.css-12i7wg6-MuiPaper-root-MuiDrawer-paper': {
          backgroundColor: `${mainColor} !important`,
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
        // ListItemButton hover 시 스타일링
        '.css-nzzti6-MuiButtonBase-root-MuiListItemButton-root': {
          padding: '4px 10px !important',
          margin: '10px 6px !important',
          borderRadius: '4px !important',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, .6) !important',
            '& svg': {
              color: mainColor
            },
            '& span': {
              color: mainColor
            }
          },
        },
        // ListItemButton 선택시 스타일링
        '.css-nzzti6-MuiButtonBase-root-MuiListItemButton-root.Mui-selected': {
          backgroundColor: '#fff !important',
          '& svg': {
            color: mainColor
          },
          '& span': {
            color: mainColor
          }
        },
        // 피드 페이지 각 Card 컴포넌트의 raised 그림자 밝기 조절
        '.css-fky5tw-MuiPaper-root-MuiCard-root': {
          boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 5%), 0px 3px 14px 2px rgb(0 0 0 / 5%) !important'
        },
        // 피드 페이지 검색 필터 선택창 스타일링
        '.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input#feed-search-select': {
          padding: '10px 16px 8px 14px',
        },
        '.css-1g24dm6-MuiInputBase-input-MuiOutlinedInput-input#feed-search-label': {
          padding: '10px 14px',
        },
        '.css-2c1ffl-MuiFormLabel-root-MuiInputLabel-root#feed-search-select': {
          top: '-6px',
        },
        '.css-2c1ffl-MuiFormLabel-root-MuiInputLabel-root#feed-search-label-label': {
          top: '-6px',
        },
        // 게시글 작성시 태그 입력 폼 스타일링
        'label#tags-filled-label.css-2c1ffl-MuiFormLabel-root-MuiInputLabel-root': {
          top: '-2px',
          fontSize: '12px'
        },
        'div.css-16awh2u-MuiAutocomplete-root .MuiOutlinedInput-root': {
          paddingTop: '2px',
          paddingBottom: '2px',
        },
        // 댓글의 프로필 사진을 가운데 정렬
        'div#comment-header': {
          alignItems: 'flex-start',
        },
      }}
    />
  );
};

export default GlobalStyles;
