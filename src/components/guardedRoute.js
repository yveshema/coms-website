import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Auth } from "aws-amplify";

import SearchProvider from "./search_context";

// This positions the login form in the middle of the page.
const LoginContainer = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
`;

// Wrap the root element in authentication logic so 
// to restricted access to the site to only authorized people.
// Only required during development to allow testing in a live environment.
// Because this wraps the root element, no session management is required to
// persist state. 

const GuardedRoute = ({children, stage}) => {
    
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    // const [done, setDone] = useState(false); 
    
    const [ loggedIn, setLoggedIn ] = useState(false);

        
    const handleUpdate = event => {
        setCredentials({...credentials, [event.target.name]:event.target.value});
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await Auth.signIn(credentials.username, credentials.password);
            setLoggedIn(true);
            // setDone(true);
        } catch (e) {
            alert(e.message);
        }             
    }    
            
    if (stage === "prod" && !loggedIn){
        return (
            <LoginContainer>
                <Helmet>
                    <title>Login</title>
                </Helmet>
                <div id="login">
                    <h1>Log in</h1>
                    <form id="loginForm"
                        method="post"
                        onSubmit={event => {
                            handleSubmit(event);                
                        }}
                    >   
                        <table>         
                            <tr><td><label>Username: </label></td>
                                <td><input type="text" name="username" 
                                        onChange={handleUpdate} /></td>
                            </tr>
                            <tr>
                                <td><label>Password: </label></td> 
                                <td><input type="password" name="password" 
                                    onChange={handleUpdate} /></td>
                            </tr>
                            <tr>
                                <td colspan="2"><input type="submit" value="Log in" /></td>
                            </tr>                 
                        </table> 
                    </form>        
                </div>
            </LoginContainer>
        );
    }

    return <>{children}</>
        
}

export default ({element}) => (
    <SearchProvider>    
    <GuardedRoute stage={process.env.GATSBY_ACTIVE_ENV}>
        {element}
    </GuardedRoute>
    </SearchProvider>    
);