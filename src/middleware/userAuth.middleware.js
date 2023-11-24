import jwt from "jsonwebtoken";
const userVerification = async (req, res, next) => {
  try {
   
    if (!req.headers.authorization)
      res.status(404).json({ message: "Please send the authorization header" });
    else {
      let authorizationHeader =
        req.headers.authorization || req.headers.Authorization;
      authorizationHeader = authorizationHeader.split(" ")[1];

     
      // check if the authorization header is exit or not
      if (!authorizationHeader)
        res.status(404).json({ message: "No token found" });

      // if token exits then check the validatiy of the token
      jwt.verify(
        authorizationHeader,
        process.env.JWT_SCERECT,
        (err, decode) => {
          if (err) {
            res.status(401).json({ message: " unAuthorized user" });
          } else 
          {
          const isOwner = decode.isOwner;

          

          // the req object with decode value
          req.user = decode;

          // check is the user is owner or not
          if (isOwner)
            res
              .status(401)
              .json({ message: "You are not authorized to do this" });
        
          }
         next();
        }
      );
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default userVerification;
