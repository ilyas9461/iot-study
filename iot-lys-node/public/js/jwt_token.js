const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const dotenv = require('dotenv');

dotenv.config();

exports.verifyToken=verifyToken;  
function verifyToken(req, res, next) {
  try {
    // check header or url parameters or post parameters for token
    let token = (req.headers.token); //['x-access-token'];

    if (!token)
      return res.status(403).send({auth: false, message: 'No token provided.' });
    else {
      //console.log('verifyToken.js : ', token);

      if((typeof token!=='object'))
        token = JSON.parse(token);
     // console.log('verifyToken.js : ', token);

      // verifies secret and checks exp
      jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
        if (err) {
          return res.status(500).send({
            auth: false,
            message: 'Failed to authenticate token.'
          });
          //console.log('ERR :',err); 
        }
        // console.log('decode :', decoded);
        // if everything is good, save to request for use in other routes
        req.user = decoded.user;
        next(); 
      });
    }

  } catch (error) {
    console.log(error);
  }

}

exports.generateAccessToken=generateAccessToken;
function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, {
      expiresIn: '1800s'
  }); //1800s=30 minute
}

