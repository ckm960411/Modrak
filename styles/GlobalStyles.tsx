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
        '.MuiCardContent-root:last-child': {
          padding: '16px !important',
        },
        // 모달 띄웠을 때 배경 색상
        '.MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, .07) !important'
        },
        // 로그인&회원가입 폼 인풋 스타일링
        'input#hook-form-input': {
          padding: '8px 16px',
        },
        // 사이드바 Drawer 스타일링
        'div#sidebar-drawer': {
          '& > div.MuiPaper-root.MuiDrawer-paper': {
            backgroundColor: `${mainColor} !important`,
            boxShadow: '7px -6px 16px -8px rgba(176,176,176,1) !important',
            border: 'none !important',
          }
        },
        // ListItemIcon 스타일링
        'div#sidebar-listitem-icon.MuiListItemIcon-root': {
          color: '#fff',
          marginLeft: '10px',
        },
        // ListItemText 스타일링
        'div#sidebar-listitem-text': {
          '& > span.MuiListItemText-primary': {
            color: '#fff',
          fontFamily: 'Katuri',
          fontSize: 18,
          }
        },
        // ListItemButton hover 시 스타일링
        'div#sidebar-listitem-button.MuiListItemButton-root': {
          padding: '4px 10px',
          margin: '10px 6px',
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, .6)',
            '& svg': {
              color: mainColor
            },
            '& span': {
              color: mainColor
            }
          },
        },
        // ListItemButton 선택시 스타일링
        'div#sidebar-listitem-button.MuiListItemButton-root.Mui-selected': {
          backgroundColor: '#fff',
          '& svg': {
            color: mainColor
          },
          '& span': {
            color: mainColor
          }
        },
        // 피드 페이지 각 Card 컴포넌트의 raised 그림자 밝기 조절
        '.MuiCard-root': {
          boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 5%), 0px 3px 14px 2px rgb(0 0 0 / 5%) !important'
        },
        // 피드 페이지 검색 필터 선택창 스타일링
        'div#feed-search-select.MuiSelect-select': {
          padding: '10px 16px 8px 14px',
        },
        'input#feed-search-label.MuiOutlinedInput-input': {
          padding: '10px 14px',
        },
        'label#feed-search-label-label': {
          top: '-6px',
        },
        // 게시글 작성시 태그 입력 폼 스타일링
        'label#tags-filled-label.MuiInputLabel-formControl': {
          top: '-2px',
          fontSize: '12px'
        },
        'label#tags-filled-label + div.MuiOutlinedInput-root.MuiAutocomplete-inputRoot': {
          paddingTop: '2px',
          paddingBottom: '2px',
        },
        // 댓글의 프로필 사진을 가운데 정렬
        'div#comment-header': {
          alignItems: 'flex-start',
        },
        // 맛집 태그 필터 색깔 스타일링
        'div#filter-tag.MuiChip-filledDefault': {
          backgroundColor: mainColor,
          color: '#fff',
        },
        'div#filter-tag.MuiChip-outlinedDefault': {
          border: `1px solid ${mainColor}`,
          color: mainColor,
        }
      }}
    />
  );
};

export default GlobalStyles;
