import jwt from "jsonwebtoken";

const userVerification = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(404).json({ message: "Please send the authorization header" });

    const authorizationHeader = req.headers.authorization.split(" ")[1];

    if (!authorizationHeader)
      return res.status(404).json({ message: "No token found" });


    jwt.verify(
      authorizationHeader,
      process.env.JWT_SCERECT,
      (err, decode) => {
        if (err) {
          console.log(err);
          return res.status(401).json({ message: "Unauthorized user" });
        }

        const isOwner = decode.isOwner;

        // the req object with decode value
        req.user = decode;

      console.log(isOwner);
        // check if the user is an owner or not
        if (!isOwner) {
          return res.status(401).json({ message: "You are not authorized to do this action" });
        }

        // If everything is fine, move to the next middleware
        next();
      }
    );
  } catch (err) {
    // Handle unexpected errors and send a 500 response
    res.status(500).json({ error: err.message });
  }
};

export default userVerification;
