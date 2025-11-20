const joi = require('joi')

const PurchaseRequestSchema = joi.object({
   warehouseId : joi.number().integer().required(),
   reference : joi.string().required(),
   items : joi.array().items(
        joi.object({
            productId : joi.number().integer().required().messages
            ({
                'any.required' : 'Product ID is required'
            }),
            quantity : joi.number().integer().required().messages
            ({
                'any.required' : 'Quantity is required'
            }),
        })
   ).required()
        
})

const UpdatePurchaseRequestSchema = joi.object({
   warehouseId : joi.number().integer().required(),
   reference : joi.string().required(),
   status : joi.string().valid( "PENDING", "COMPLETED").required(),
   items : joi.array().items(
        joi.object({
            id: joi.number().integer().required().messages({
                'any.required' : 'Item ID is required'
            }),
            productId : joi.number().integer().required().messages
            ({
                'any.required' : 'Product ID is required'
            }),
            quantity : joi.number().integer().required().messages
            ({
                'any.required' : 'Quantity is required'
            }),
        })
   ).required()
        
})

module.exports = { PurchaseRequestSchema,  UpdatePurchaseRequestSchema };