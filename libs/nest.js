import axios from 'axios'
import config from 'config'

import passport from 'passport'
import { Strategy } from 'passport-nest'

export const authorize = () => {
    passport.use(new Strategy({
        clientID: config.nest.client_id,
        clientSecret: config.nest.client_secret
    }));
    return passport.authenticate('nest');
}

export const auth_callback = () => {
    passport.use(new Strategy({
        clientID: config.nest.client_id,
        clientSecret: config.nest.client_secret
    }));
    return passport.authenticate('nest', {})
    .then((req, res) => { return req.user.accessToken});
}
