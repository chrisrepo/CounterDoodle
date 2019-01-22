
const jwt = require('jsonwebtoken');

const SECRET = 'snorlax';

function verifyJWTToken(token)
{
  return new Promise((resolve, reject) =>
  {
    jwt.verify(token, SECRET, (err, decodedToken) =>
    {
      if (err || !decodedToken)
      {
        return reject(err);
      }

      resolve(decodedToken);
    })
  })
}

function createJWToken(details)
{
  if (typeof details !== 'object')
  {
    details = {};
  }

  if (!details.maxAge || typeof details.maxAge !== 'number')
  {
    details.maxAge = 3600;
  }

  let token = jwt.sign({
     data: details.sessionData
    }, SECRET, {
      expiresIn: details.maxAge,
      algorithm: 'HS256'
  });

  return token;
}

function verifyJWT_Middleware(req, res, next)
{
  let token = (req.method === 'POST') ? req.body.token : req.query.token

  verifyJWTToken(token)
    .then((decodedToken) =>
    {
      req.user = decodedToken.data
      next()
    })
    .catch((err) =>
    {
      res.status(400)
        .json({message: "Invalid auth token provided."})
    })
}

module.exports.verifyJWTToken = verifyJWTToken;
module.exports.createJWToken = createJWToken;
module.exports.verifyJWT_Middleware = verifyJWT_Middleware;
