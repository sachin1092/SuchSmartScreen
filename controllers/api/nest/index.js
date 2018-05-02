import { authorizeNest, nestCallback } from '../../../middleware/thermostat'

import config from 'config'

import passport from 'passport'

export default (router) => {
    router

    .get ('/auth', passport.authenticate('nest'))

    .get ('/auth/callback', passport.authenticate('nest', {}), (req, res) => {
        // token is in req.user.accessToken
        console.log(req.user.accessToken);
        return res.json({ status: 'success', message: req.user.accessToken })
    });

}
