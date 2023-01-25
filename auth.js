const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const dotenv = require("dotenv");

dotenv.config();
passport.serializeUser((user , done) => {
	done(null , user);
})
passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new GoogleStrategy({
	clientID:process.env.GOOGLE_CLIENT_ID, // Your Credentials here.
	clientSecret:process.env.GOOGLE_CLIENT_SECRETE, // Your Credentials here.
	callbackURL:"http://localhost:3000/api/auth/google/callback",
	passReqToCallback:true
},
function(request, accessToken, refreshToken, profile, done) {
	return done(null, profile);
}
));