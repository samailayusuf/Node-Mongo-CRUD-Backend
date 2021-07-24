const jwt = require('jsonwebtoken');
//Defining middleware responsible for user authentication on 
//our application
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //get token from request headers
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // checking if extracted token is same as defined token
    const userId = decodedToken.userId; //extracting user ID from token
    if (req.body.userId && req.body.userId !== userId) { 
      //checking if user ID from request object 
      //differs from the one in the token
      throw 'Invalid user ID'; //error is thrown if condition above true
    } else {
      next(); //execution proceeds if ID from request is same as ID from token 
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
