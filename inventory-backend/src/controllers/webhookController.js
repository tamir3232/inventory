const WebhookService = require("../services/WebhookService"); 
const postWebhook = async(req,res,next) =>{
    try {
        const data = await WebhookService.processWebhook(req.body)

        return res.status(200).json({
            message:'Stocks Product',
            data :data,
            })
    } catch (error) {
        next(error)
    }

}

module.exports = {postWebhook}