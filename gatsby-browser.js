import { Amplify } from "aws-amplify";

// import GuardedRoute from "./src/components/guardedRoute";
import config from "./src/config";

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
});

// export const wrapRootElement = GuardedRoute;