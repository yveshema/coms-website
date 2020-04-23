import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { isLoggedIn, handleLogin } from "../services/auth";
import styled from "styled-components";
import { Helmet } from "react-helmet";


const LoginContainer = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
`;


const GuardedRoute = ({children}) => {
    
    // useEffect(() => {
    //     if (!isLoggedIn()){    
    //         navigate("/login");                                 
    //     }
    // }); 
    
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const [done, setDone] = useState(false);

    useEffect(() => {
        if (isLoggedIn()){
            navigate("/");
        }
    }, [done]);
    
    const handleUpdate = event => {
        setCredentials({...credentials, [event.target.name]:event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();
        handleLogin(credentials); 
        setDone(true);       
    }

        
    if (!isLoggedIn()){
        return (
            <LoginContainer>
        <Helmet>
            <title>Login</title>
        </Helmet>
        <div id="login"><h1>Log in</h1>
        <form id="loginForm"
            method="post"
            onSubmit={event => {
                handleSubmit(event);                
            }}
        >   
            <table>         
            <tr><td><label>Username: </label></td>
                <td><input type="text" name="username" onChange={handleUpdate} /></td>
            </tr>
            <tr><td><label>Password: </label></td> 
                <td><input type="password" name="password" onChange={handleUpdate} /></td>
           </tr>
            <tr><td colspan="2"><input type="submit" value="Log in" /></td></tr>                 
           </table> 
        </form>
        
        </div>
        </LoginContainer>
        );
    }

    return <>{children}</>;    
}

export default ({element}) => (
    <GuardedRoute>
        {element}
    </GuardedRoute>
);