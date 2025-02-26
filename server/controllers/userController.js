import {Webhook} from 'svix'
import userModel from '../models/userModel.js'


///API Controller function to manage clerk user with database
/// http://localhost:3000/api/user/webhooks   --- endpoint for webhooks

const clerkWebhooks = async(req, res) => {
    try {
        //create a svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body), {
            "svix-id" : req.headers["svix-id"],
            "svix-timestamp" : req.headers["svix-timestamp"],
            "svix-signature" : req.headers["svix-signature"]
        })
 
        ///payload - req.body, header - req.headers

        const {data, type} = req.body;

        switch (type) {
            case "user.created":{
                const userData = {
                    clerkId : data.id,
                    email : data.email_addresses[0].email_address,
                    firstname : data.first_name,
                    lastname : data.last_name,
                    photo : data.image_url
                }
                console.log("user created")
                await userModel.create(userData);
                res.json({});
                break;
            }
            case "user.updated":{ 
                const userData = {
                    email : data.email_addresses[0].email_address,
                    firstname : data.first_name,
                    lastname : data.last_name,
                    photo : data.image_url
                }

                await userModel.findOneAndUpdate({clearkId : data.id}, userData);
                res.json({});
                break;
            }
            case "user.deleted":{
                await userModel.findOneAndDelete({clearkId : data.id});
                res.json({});
                break;
            }
            default:
                break;
        }
    } catch (error) {
        console.log(error.message);
        res.json({success : false, message : error.message});
    }
}



export {clerkWebhooks}