import {css} from 'styled-components';

export default css`
    figure{
        text-align: center;                
    }
    
    figure img {
        margin: 35px 0px;        
    }

    @media only screen and (max-width: 768px) {    
        figure img{
            width: 100%;
        }        
    }    
    
    /* Hide the termite image on mobile */
    @media only screen and (max-width: 600px) {
       figure img[alt*="termite"] {
         display: none;
       }
    }
`;