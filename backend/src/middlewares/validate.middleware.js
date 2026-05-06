export const validate=(schema)=>(req,res,next)=>{

    const {error,value}=schema.validate(req.body,{abortEarly: false});
  
    if(error){
        return res.status(400).json({
        success: false,
        message: error.details.map((item) => item.message).join(", "),
    });
    }
    
    req.body = value;
    next();
}