# passport-refresh-token

Refresh token strategy for [Passport](http://passportjs.org/).

This strategy is used to refresh the Oauth 2.0 access tokens issued by the server.

## Install

    $ npm install passport-refresh-token

## Usage

#### Require Strategy

Require the `passport-google-authcode` Strategy along with `passport`

```js
var passport = require('passport');
var RefreshTokenStrategy = require('passport-refresh-token').Strategy;
```

#### Configure Strategy

The Refresh token strategy authenticates the request using the refresh token.
The strategy requires a `verify` callback, which accepts that
credential and calls `done` providing a user.  Optional `info` can be passed,
typically including associated scope, which will be set by Passport at
`req.authInfo` to be used by later middleware for authorization and access
control.

```js
passport.use(new RefreshTokenStrategy(
  function(token, done) {
    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'refresh_token'` strategy, to
authenticate requests. Requests containing refresh tokens do not require session
support, so the `session` option can be set to `false`.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
app.get('/auth/token/refresh', 
  passport.authenticate('refresh_token', { session: false }),
  function(req, res) {
    // generate new tokens for req.user
    res.json(tokens);
  }
);
```

The post request to this route should include a JSON object with the key `refresh_token` set to the refresh token issued earlier by the server.

## Credits

  - [Shobhit Singhal](http://github.com/shobhitsinghal624)
  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2018 [Shobhit Singhal](http://github.com/shobhitsinghal624)
