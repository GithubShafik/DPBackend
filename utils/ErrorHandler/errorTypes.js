export class OpsError extends Error{
    constructor(message, statusCode = 500, data=null){
        super(message)        
        this.name = 'OpsError'
        this.statusCode = statusCode
        this.data = data
        this.operational = true
        Error.captureStackTrace(this, this.constructor)
    }   
}

export class DbError extends Error{
    constructor(message, statusCode = 500, data=null){
        super(message)        
        this.name = 'DbError'
        this.statusCode = statusCode
        this.data = data
        this.operational = false
        Error.captureStackTrace(this, this.constructor)
    }   
}