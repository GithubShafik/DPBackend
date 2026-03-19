import { checkExact, validationResult } from "express-validator"
// import { OpsError } from "#utils/ErrorHandler/errorTypes.js"


const validateSchema = (schema) => {   
    return [
        checkExact(schema, {locations: ['query', 'params' ,'body'], message: fields => fields.map(field => {             
            return {...field, msg: 'Invalid field'}
        })}),
        (req, res, next) => {                          
            let result = validationResult(req)            
            if(!result.isEmpty()) {
                let err = new OpsError("Validation Failed", 400)

                let errorData                 
                if(result.errors?.[0]?.type === 'unknown_fields') {
                    errorData = result.errors[0].msg 
                } else {
                    errorData = result.errors
                }                

                err.data = errorData.map(error => {
                    let newError = {}
                    newError.field = error.path
                    newError.message = error.msg
                    newError.location = error.location
                    return newError
                })              

                next(err)
                
            }    
            next()
        }
    ]
}

export default validateSchema