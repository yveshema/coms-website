import styled, { css } from "styled-components";
import textStyles from '../styles/text';
import listStyles from '../styles/lists';
import tableStyles from '../styles/table';
import imageStyles from '../styles/images';

/* Wrapper around the main content area. Centers 
 * everything with a width of 768px on large screens
 * and expands to full width when screen size
 * approaches this threshold.
 * */
const Container = styled.main`
    flex: 1;
    margin-top:75px;    

    /* Center everything inside */
    > * {
        max-width: 768px;
        margin: auto;
        
        :last-child {
            margin-bottom: 30px;
        }

        /* As screen size approaches 768px expand to full width
         * with some breathing room: 768px + 20px 
         */
        @media only screen and (max-width: 788px){
                max-width: 100%;
                padding:0 1rem;               
        }
    }   
    
    /* content styles */
    ${textStyles}
    ${listStyles}
    ${tableStyles}
    ${imageStyles}    
`;

export default Container;