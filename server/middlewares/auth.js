import jwt from 'jsonwebtoken'

//Middleware fn to decode jwt token to get clerkId

export const authUser = async(req, res, next) => {
    try {
        const {token} = req.headers
        if(!token){
            return res.json({sucess : false, message : 'not authorized login again'})
        }

        const token_decode = jwt.decode(token);
        req.body.clerkId = token_decode.clerkId;
        next();

    } catch (error) {
        console.log(error.message);
        res.json({success : false, message : error.message});
    }
}
