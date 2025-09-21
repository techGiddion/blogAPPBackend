const ALLOWEDLIST = require('../config/ALLOWEDLIST')

const crdentials = (req,res,next)=>{
    const origin = req.headers.origin;
    if(ALLOWEDLIST.includes(origin)){
        res.header('Access-Control-Allow-crdentials',true)
    }

    next();

}

module.exports=crdentials