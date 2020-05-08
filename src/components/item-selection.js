import React, { useState } from "react";
import styled from "styled-components";

import {
    Input,
    Button,
} from "./input-components";

const Row = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 5px;
`

const SubmitButton = styled(Button)`
width: 14em;
border: 1px solid #fd6927;
background-color: #fd6927;
margin-left: auto;
color: #fff;
border-radius: 3px;
`;

const Control = styled.div`
display: flex;
// line-height: 1;
margin: 1em 0;
`

const Label = styled.div`
margin: 0 1em;
display:block;
text-align: left;
font-size: .8em;
line-height: 1.2;
`

const StyledInput = styled(Input)`
width: 14em;
`

// const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
// // Hide checkbox visually but remain accessible to screen readers.
// // Source: https://medium.com/@colebemis/building-a-checkbox-component-with-react-and-styled-components-8d3aa1d826dd
// border: 0;
// clip: rect(0 0 0 0);
// clippath: inset(50%);
// height: 1px;
// margin: -1px;
// overflow: hidden;
// padding: 0;
// position: absolute;
// white-space: nowrap;
// width: 1px;
// `
// const Icon = styled.svg`
// fill: none;
// stroke: white;
// stroke-width: 3px;
// outline: 0;
// `

// const StyledCheckbox = styled.button`
// display: inline-block;
// width: 18px;
// height: 18px;
// background: ${props => props.checked ? '#555' : '#fff'};
// border: ${props => props.checked ? '1px solid #555' : '1px solid #a3a3a3'};
// transition: all 150ms;
// margin: 0;
// padding: 0;

// ${HiddenCheckbox}:focus + & {
//     box-shadow: 0 0 0 3px #eee;   
// }

// ${Icon} {
//     visibility: ${props => props.checked ? 'visible' : 'hidden'}   
// }
// `
// const CheckboxWrapper = styled.div`
// display: inline-block;
// vertical-align: middle;
// line-height: .8;
// `

// const Checkbox = ({ className, ...props}) => {
//     const [checked, setChecked ] = useState(false);

//     const handleClick = (e) => {
//         e.preventDefault();
//         setChecked(!checked);
//     }

//     return (
//     <CheckboxWrapper className={className}>
//         <HiddenCheckbox checked={checked} {...props} />
//         <StyledCheckbox checked={checked} onClick={handleClick}>
//             <Icon viewBox="0 0 24 24">
//                 <polyline points="20 6 9 17 4 12" />
//             </Icon>
//         </StyledCheckbox>
//     </CheckboxWrapper>
// )};

const ItemSelectionForm = (props) => {
    return (
        <form onSubmit={props.submitTotal}>
            <Control>
                <input type="checkbox" value="sys" onChange={props.changeCheckedStatus} />
                <Label>NCD 185 system control fee</Label>
            </Control>
            <Control>
                <input type="checkbox" value="file" onChange={props.changeCheckedStatus} />
                <Label>NCD 55 file management fee</Label>
            </Control>
            <Control>
                <input type="checkbox" value="recert" onChange={props.changeCheckedStatus} />
                <Label>NCD 700 recertification fee</Label>
            </Control>
            <Control>
                <input type="checkbox" value="under2" onChange={props.changeCheckedStatus} />
                <Label>NCD 350 for crops below 2 acres</Label>
            </Control>
            <Control>
                <input type="checkbox" value="over2" onChange={props.changeCheckedStatus} />
                <Label>NCD 550 for crops above 2 acres</Label>
            </Control>
            <hr />
            <Row>
                <Label>Total amount to be paid: </Label>
                <StyledInput type="text" value={'NCD ' + props.totalCost} />
            </Row>
            <Row><SubmitButton>Next-payment information</SubmitButton></Row>
        </form>
    )
};


export default ItemSelectionForm;