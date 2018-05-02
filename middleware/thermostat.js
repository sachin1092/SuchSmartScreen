import {authorize, auth_callback} from '../libs/nest';

export const authorizeNest = () => {
    return authorize().then(token => {
        return token;
    });
}

export const nestCallback = () => {
    return auth_callback().then(token => token);
}
