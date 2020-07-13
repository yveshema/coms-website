import {css} from 'styled-components';

/* All styles relating to textual appearance
 * should be added here except special cases 
 * such the contents of lists and tables
 * */
export default css`
    h1{
        font-size: 2.8rem;
        line-height: 50px;
        margin: 4rem auto 3rem auto;
    }

    figure + h1 {
        font-size: 38px;
        line-height: 45px;
    }   

    h2 {
        font-size: 30px;
        font-style: italic;
        margin-top: 50px;
        line-height: 38px;
    }
    
    h4 {
        font-size: 20px;
        line-height: 28px;
    }

    /* Target only paragraphs that are direct 
     * descendants of the main content area
     */
    > p {
        font-size: 20px;
        line-height: 1.8;
        color: #626262;
        margin: 1rem auto;
    } 
    
    b {
        color: #626262;
    }

    strong {    
        font-weight: 500;
    }

    a {   
        color: #626262;    
    }   

    @media screen and (min-width: 601px) and (max-width: 1200px){
        h1{
            line-height: 55px;
        }         
    }

    @media only screen and (max-width: 600px) { 
        h1{
            font-size: 32px;
            line-height: 38px;
            margin-bottom: 10px;
        }
        
        h2{
            font-size: 24px;
            line-height: 28px;
            margin-top: 35px;
        }
        
        h4 {
            font-size: 20px;
            line-height: 28px;
        }

        p{
            font-size: 18px;
            line-height: 30px;        
        }

        br {
            display: none;
        }              
    }    
`;