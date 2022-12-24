import { Injectable } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';

/**MODELS */
import {
    CognitoUser,
    MFAOption,
    CognitoUserSession,
    CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { SignUpParams } from '@aws-amplify/auth/lib-esm';

/**
 * Amplify DOC's
 * https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/#retrieve-current-authenticated-user
 */

@Injectable({
    providedIn: 'root',
})
export class CognitoService {
    constructor() {}

    initAmplifyConfig(awsconfig: any) {
        Amplify.configure(awsconfig);
    }

    getCurrentAuthenticatedUser(bypassCache?: boolean): Promise<any> {
        return Auth.currentAuthenticatedUser({
            bypassCache: bypassCache as boolean,
        });
        /**
         * Auth.currentAuthenticatedUser({
    bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
}).then(user => console.log(user))
.catch(err => console.log(err));
         */
    }

    getCurrentAuthenticatedUserAttributes() {
        /**
         * const { attributes } = await Auth.currentAuthenticatedUser();
         */
    }

    /**
     * This method will automatically refresh the accessToken and idToken if tokens are expired and a valid refreshToken presented. So you can use this method to refresh the session if needed.
     * @returns Promise<CognitoUserSession>
     */
    getCurrentAuthSession(): Promise<CognitoUserSession> {
        return Auth.currentSession();
    }

    updateUserAttributes() {
        /**
         * let user = await Auth.currentAuthenticatedUser();

let result = await Auth.updateUserAttributes(user, {
    'email': 'me@anotherdomain.com',
    'family_name': 'Lastname'
});
console.log(result); // SUCCESS
         
If you change the email address, the user will receive a confirmation code. In your app, you can confirm the verification code:
*/
    }

    deleteUserAttributes() {
        /**
         * let user = await Auth.currentAuthenticatedUser();

let result = await Auth.deleteUserAttributes(user, [
    'family_name'
]);
console.log(result); // SUCCESS
         */
    }

    signIn(username: string, password: string) {
        return Auth.signIn(username, password);
    }

    signUp(params: string | SignUpParams, ...restOfAttrs: string[]) {
        return Auth.signUp(params);
    }

    confirmSignUpUser() {}

    resendSignUp() {}

    forgotPassword(username: string) {
        return Auth.forgotPassword(username);
        /**
         * // Send confirmation code to user's email
Auth.forgotPassword(username)
    .then(data => console.log(data))
    .catch(err => console.log(err));
         */
    }

    forgotPasswordSubmit() {
        /**
         * // Collect confirmation code and new password, then
Auth.forgotPasswordSubmit(username, code, new_password)
    .then(data => console.log(data))
    .catch(err => console.log(err));
         */
    }

    changePassword() {
        /**
         * Auth.currentAuthenticatedUser()
    .then(user => {
        return Auth.changePassword(user, 'oldPassword', 'newPassword');
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
         */
    }

    completeNewPassword() {
        /**
         * Auth.signIn(username, password)
.then(user => {
    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
        Auth.completeNewPassword(
            user,               // the Cognito User Object
            newPassword,       // the new password
            // OPTIONAL, the required attributes
            {
              email: 'xxxx@example.com',
              phone_number: '1234567890'
            }
        ).then(user => {
            // at this time the user is logged in if no MFA required
            console.log(user);
        }).catch(e => {
          console.log(e);
        });
    } else {
        // other situations
    }
}).catch(e => {
    console.log(e);
});
         */
    }

    verifyCurrentUserAttribute() {
        /**
         * // To initiate the process of verifying the attribute like 'phone_number' or 'email'
Auth.verifyCurrentUserAttribute(attr)
.then(() => {
     console.log('a verification code is sent');
}).catch((e) => {
     console.log('failed with error', e);
});
         */
    }

    verifyCurrentUserAttributeSubmit() {
        /**
         * If you change the email address, the user will receive a confirmation code. In your app, you can confirm the verification code:
         *
         * let result = await Auth.verifyCurrentUserAttributeSubmit('email', 'abc123');
         */
        /** // To verify attribute with the code
Auth.verifyCurrentUserAttributeSubmit(attr, 'the_verification_code')
.then(() => {
     console.log('phone_number verified');
}).catch(e => {
     console.log('failed with error', e);
});
*/
    }

    signOut(global?: boolean): Promise<any> {
        return Auth.signOut({ global: global });
    }
}
