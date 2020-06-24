import {css} from 'styled-components';

export default css`
    ol, ul {
        margin: 1.5rem auto;         
    }

    ol {
        counter-reset: list;        
    }

    ol > li {
        list-style: none;
        position: relative;
    }

    // Set up custom list item counters
    ol > li:before {
        counter-increment: list;
        content: counter(list, lower-alpha) ") ";
        position: absolute;
        left: -1.4em;
    }

    li {
        color: #626262;
        margin-left: 1.5rem;
        font-size: 1.2rem;
        line-height: 1.8;
    }        
`;