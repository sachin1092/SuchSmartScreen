import { authorizeNest, nestCallback } from '../../../middleware/thermostat'

import EventSource from 'eventsource'

import config from 'config'

import passport from 'passport'

// The Nest API will emit events from this URL.
const NEST_API_URL = 'https://developer-api.nest.com';

const startStreaming = (token) => {
  let headers = {
      'Authorization': "Bearer " + token,
  }
  let source = new EventSource(NEST_API_URL, {"headers": headers});

  source.addEventListener('put', (e) => {
    console.log('\n' + e.data);
  });

  source.addEventListener('open', (e) => {
    console.log('Connection opened!');
  });

  source.addEventListener('auth_revoked', (e) => {
    console.log('Authentication token was revoked.');
    // Re-authenticate your user here.
  });

  source.addEventListener('error', (e) => {
    if (e.readyState == EventSource.CLOSED) {
      console.error('Connection was closed! ', e);
    } else {
      console.error('An unknown error occurred: ', e);
    }
  }, false);
}

export default (router) => {
    router

    .get('/', (req, res) => {
        return res.json({status: 'success', data: "test"})
    })

    .get ('/auth', passport.authenticate('nest'))

    .get ('/auth/callback', passport.authenticate('nest', {}), (req, res) => {
        // token is in req.user.accessToken
        console.log(req.user.accessToken);
//        return res.json({ status: 'success', data: req.user.accessToken })
//        res.cookie('nest_token', req.user.accessToken);
        res.redirect('/dashboard');
//        startStreaming(req.user.accessToken);

    });

}
