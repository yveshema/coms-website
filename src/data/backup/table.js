import React from 'react';
import styled from "styled-components";

// Styling for table and table elements
const TableStyled = styled.table`
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.161);
    * {
        margin: 0;
    }
    caption {
        text-align: left;
        font-weight: 500;
        color: #3A722E;
        margin-bottom: 2rem;
    }
    td, th {
        border: 1px solid rgba(0, 0, 0, 0.161);
        word-wrap: break-word;
    }
    td:first-of-type, th:first-of-type {
        border-left: none;
    }
    td:last-of-type, th:last-of-type {
        border-right: none;
    }
    th {
        border-top: none;
        background-color: #E8E8E8;
    }
    tr:nth-of-type(even) {
        background-color: #FFFFFF;
    }
    th, td {
        padding: 1rem;
    }
    ul {
        padding: 0 1rem;
    }
`

const Table = (props) => {

    return (
        <TableStyled>
            {// Takes an optional caption and prints it above the table
            props.caption !== undefined ? <caption>{props.caption}</caption> : ''}
            <tr>
                {// Takes an array of table headings and returns table header elements
                props.headings.map(heading => {
                    return ( <th>{heading}</th> )
                })}
            </tr>
            {// Takes an array of arrays representing table rows and fills table
                props.content.map(row => {
                    return (<tr>
                        {row.map(cell => {
                            return (
                                <td>
                                    {cell}
                                </td>
                            )
                        }) }
                    </tr>)
                })
            }
        </TableStyled>
    )
}

export default Table;