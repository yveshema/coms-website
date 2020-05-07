import styled, { css } from "styled-components";

/* Any other styles for things like spacing, typography,
   etc can be defined here and interpolated
   within the Container component (e.g see below) */

// const textStyles = css`
//     //some css here
// `;

/*Set content max-width to 768px and center it without
  constraining those parts of the page that by design
  need to occupy the full width of the page. 
  
  To interpolate additional styles (such as the textStyles above,
  use the ${/**} notation */
const Container = styled.article`
    padding: 0 0px;
    margin-top:75px;

    @media only screen and (max-width: 767px){
        padding:0px;
        margin: 35px 0px;
    }

    @media screen and (max-width: 1023px) and (min-width: 768px){
       padding: 0px 70px;
    }

    /* Center everything inside */
    > * {
        max-width: 768px;
        margin: auto;
        padding: 10px;

        :last-child {
            margin-bottom: 30px;
        }

        @media only screen and (max-width: 768px){
            width: 100%;
            
            max-width:100%
        }
    }

    /* Element with the class value of *stretch* expand
       to occupy the full width of the page */
    .stretch {
        max-width: 100%;
        width: 100%;
        background: #fff;
        > * {
            max-width: 768px;
            margin: 10px auto;
            padding: 20px;
        }
    }

    //other styles can be interpolated here    
    
`;

export default Container;