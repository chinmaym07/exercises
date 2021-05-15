const logger = require('./logger');
const jwt = require('jsonwebtoken');

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method);
    logger.info('Path:  ', request.path);
    logger.info('Body:  ', request.body);
    logger.info('---');
    next();
};


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if(error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else if(error.name === 'JsonWebTokenError'){
        return response.status(401).json({ error: 'invalid token' });
    }
    
    next(error);
};

const tokenExtractor = (request,response,next)=> {
    let authorization = request.get('authorization');
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        request.token = authorization.substring(7);
    }
    else
        request.token = null;
    next();
}

const userExtractor = (request , response , next ) => { 
    const token = request.token;
    if(!token) {
        return response.status(401).json({error: 'token missing or invalid'});
      }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token,process.env.SECRET);
    }
    catch(err){
        console.log(err);
        if(err.name === 'JsonWebTokenError')
            return response.status(401).json({error: 'invalid token'});
        else if(err.name === 'TokenExpiredError')
            return response.status(401).json({error: 'token expired'});
        else
            return response.status(401).json(err);
    }
    

    if(!decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'});
    }
    else
        request.user = decodedToken;
    next();
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
};