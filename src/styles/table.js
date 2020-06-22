import {css} from 'styled-components';

/* All tables share the same styles at the exception
 * of the Fees tables which has only one column 
 */
export default css`
    table {
        box-shadow: 3px 3px 3px #bfbababa;
        margin: 2em auto;
        box-sizing: border-box;        
    }

    table[title*='fee'] td{ /* special case */
        border-bottom: 0;
        border-right: 0;        
    }

    table[title*='fee'] tr:nth-child(odd){
        background-color: #E8E8E8;
    }
    
    table[title*='fee'] tr:nth-child(even){
        background-color: #ffffff;
    }

    table p{ 
        text-align: left;
        margin: auto;
        width: 415px;
    }

    td, th {
        border: 1px solid #C1C1C1;
        padding: .8rem;
        font-size: 1.2rem;
        color: #626262;        
    }

    
    th {        
        font-weight: 500;
        background-color: #E8E8E8;        
    }

    th:first-child, td:first-child {        
        border-right: 1px solid #C1C1C1;
    }

    tr:nth-child(even){
        background-color: #F4F4F4;       
    }

    tr:hover {background-color: #dddddd;}

    caption {
        font-size: 23px;
        text-align: left;
        line-height: 32px;
        color: #3A722E;
        font-weight: 500;
        margin-bottom: 50px;
    }    
    
    @media only screen and (max-width: 600px) {    
        table p{
            width:100%;
        } 

        /* Use fluid font sizing on small screens
        to avoid table overflowing the viewport */
        th, td, table li {
            font-size: 4vw;   
        }
    }

    @media only screen and (max-width: 320px){
        th, td {
            padding-right: 1px;
            padding-left: 8px;
        }
    }
`;