const dbErrors = [
    'SequelizeForeignKeyConstraintError', 
    'SequelizeUniqueConstraintError'
]



const handleError = (err, req, res, next) => {
    // console.log(err);    
    if(req) return handleRequestErrors(err, req, res, next)    
    handleServerErrors(err, next)
}

const handleRequestErrors = (err, req, res, next) => {     
    try {
        if(err.operational){    
            res.status(err.statusCode).send({message: err.message, data: err.data})
            return next()
        }
    
        if(dbErrors.includes(err.name)) return handleDatabaseErrors(err, req, res, next)       
    
        return handleServerErrors(err, req, res, next)            

    } catch (error) {
        return handleServerErrors(err, req, res, next)        
    }
}

const handleServerErrors = (err, req, res, next) => {
    if(res) {
        console.log("From error handler - Server Error", err)
        res.status(500).send("Server error. Please contact administrator!!!")
        next()
    }

    console.log("From error handler - Server Error no response", err)
    
}

const handleDatabaseErrors = (err, req, res, next) => {
    if(err.name === 'SequelizeForeignKeyConstraintError') {              
        res.status(400).send({message: "Parent record not found"})
        return next()
    }

    if(err.name === 'SequelizeUniqueConstraintError'){
        let data = err.errors.map(error => {
            let myError = {
                field: error.path,
                message: error.message
            }
            return myError
        })

        res.status(400).send({message: "Duplicate record found", data})
        return next()
    }    
}

export default handleError