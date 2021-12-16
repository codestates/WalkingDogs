import { createGlobalStyle } from "styled-components";
import media from 'styled-media-query';
import {normalize} from 'styled-normalize';

const GlobalStyles = createGlobalStyle`
    ${normalize}

    /*HTML Elements*/
    *{
        
    },
        :after,
        :before {
            margin: 0;
            box-sizing: border-box;
            line-height: var(---lineHeight-normal);
            height: 100%;
    }

    html{
        font-size:var(---fontSize-root--big);
        font-family: var(---fontFamily);
        color: var(---color-black);
        background-color: var(--color-darkwhite);

        ${media.lessThan("medium")`
            font-size: var(--fontSize-root--small);   
        `}
        *{
            /*스크롤바 제거*/
            --ms-overflow-style: none;
            scrollbar-width: none;
            ::-webkit-scrollbar{
                display:none;
            }
        }
    }

    button, input, textarea {
        padding: 0;
        border: none;
        outline: none;
        background-color: inherit;
    }

    button{
        cursor: pointer;
        :active,
        :hover,
        :focus{
            outline: none;
        }
    }

    a {
        color:inherit;
        text-decoration: none;
        outline: none;
    }

    ul {
        padding: 0;
        list-style:none;
    }

    @font-face{
        font-family: "BlackHanSans";
        src: url('../fonts/BlackHanSans-Regular.woff') format('woff'),
        font-weight: normal;
        unicode-range: U+0000-U+FFFF;
    }

    @font-face{
        font-family: "Jua-Regular";
        src: url('../fonts/Jua-Regular.woff') format('woff'),
        font-weight: normal;
        unicode-range: U+0000-U+FFFF;
    }

    @font-face{
        font-family: "PoorStory-Regular";
        src: url('../fonts/PoorStory-Regular.woff') format('woff'),
        font-weight: normal;
        unicode-range: U+0000-U+FFFF;
    }


    :root {
        --fontFamily: Jua-Regular, BlackHanSans, PoorStory-Regular, system-ui, -apple-system, BlinkMacSystemFont
        --fontSize-root-big: 16px;
        --fontSize-root-small: 14px;
        --lineHeight-normal: 1;
        --lineHeight-loose: 1.25;
        --lineHeight-relaxed: 1.5;
        --color-mainviolet--100: #646FCB;
        --color-mainviolet--75: #5F6FCB;
        --color-mainviolet--50: #556FCB;
        --color-mainviolet--25: #506FCB;
        --color-red: #FF5252;
        --color-red--25: #FFD4D4;
        --color-red--10: #FFEDED;
        --color-yellow: #F9CD50;
        --color-yellow--10: #FEFAED;
        --color-green: #278400;
        --color-green--10: #E9F2E5;
        --color-blue: #2762F4;
        --color-black: #3A3A42; 
        --color-darkgray: #62626A;
        --color-gray: #919196; 
        --color-lightgray: #DCDCE0; 
        --color-palegray: #EEF2F6;
        --color-darkwhite: #F6F6FA;
        --color-white: #FCFCFF;
        --color-shadow: #1D1D2133;
        --color-modalbg: #1D1D21E5;
    }
`;

export default GlobalStyles;