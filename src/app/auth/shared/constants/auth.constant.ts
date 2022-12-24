const SIGN_OPTIONS: string = 'SIGN_OPTIONS';
const USERNAME_EMAIL_FIELD: string = 'USERNAME_EMAIL_FIELD';
const USERNAME_PHONE_FIELD: string = 'USERNAME_PHONE_FIELD';
const PRESENTATION: string = 'PRESENTATION';
const VALIDATE_OTP: string = 'VALIDATE_OTP';
const PASSWORD_FIELD: string = 'PASSWORD_FIELD';
const TYPE_EMAIL: string = 'email';
const TYPE_PHONE: string = 'phone_number';
const AUTH_STORED_USER: string = 'AUTH_STORED_USER';

export const AUTH_CONSTANTS = {
    AUTH_STORED_USER: AUTH_STORED_USER,
    AUTH_STEPS: {
        SIGNIN: {
            SIGN_OPTIONS,
            USERNAME_EMAIL_FIELD,
            USERNAME_PHONE_FIELD,
            PASSWORD_FIELD,
        },
        SIGNUP: {
            PRESENTATION,
            SIGN_OPTIONS,
            USERNAME_EMAIL_FIELD,
            USERNAME_PHONE_FIELD,
            PASSWORD_FIELD,
        },
    },
    USERNAME_TYPES: {
        TYPE_EMAIL,
        TYPE_PHONE,
    },
};
