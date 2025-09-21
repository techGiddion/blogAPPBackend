const User = require('../model/User')
const bcrypt = require('bcrypt')


const handleUserRegistration = async (req,res)=>{
    const {useremail,firstname,lastname,username,password} = req.body;
    // check to see if response has everything we need
    if(!useremail || !firstname || !lastname || !username || !password) return res.status(400).json({"meesage":"required fildes are not present"})
    // check for duplicates for username
    //const duplicate = await User.findOne({username:username || useremail:useremail}).exec();
    const duplicate = await User.findOne({
        $or:[
        {username:username},
        {useremail:useremail}
        ]
        }).exec();
    if(duplicate) return res.sendStatus(409) // conflict
    try{
    const hashPW = await bcrypt.hash(password,10)
    const result = await User.create({
        useremail: useremail,
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: hashPW,
    })
    return res.status(201).json({'message': 'User created successfully'})
    }catch(error){
        return res.status(500).json({'message':error.message})
    }




}

module.exports = {
    handleUserRegistration
}