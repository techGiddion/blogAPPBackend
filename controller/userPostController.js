const Post = require('../model/Post')

const getAllPost = async (req,res)=>{
    const allPosts = await Post.find();
    if(!allPosts) return res.status(204).json({"message" : 'No records found'})  
    return res.status(200).json({allPosts})
    
}


const createUserPost = async (req,res) =>{
    const {title,date_time,body} = req.body

    if(!title || !date_time ||!body) return res.status(400).json({"message":"required fields are empty"})
    
    try{
        // ✅ get logged-in user id from JWT middleware
        const userId = req.userId; // set this in your auth middleware when verifying token

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized - no userId" });
        }
        const newPost = await Post.create({
            user: userId,
            title,
            date_time,
            body
        })

    return res.status(201).json({ message: "Post successfully created", post: newPost })

    }catch(err){
        return res.status(500).json(err.message)
    }    

}


const updateUserPost = async (req,res) =>{  
    const {id} = req.params
    const {title,date_time,body} = req.body
     if(!id) return res.status(400).json({"message":"User id is required"})
     if(!date_time) return res.status(400).json({"message":"Date and time is required"})
    const findPost = await Post.findOne({_id:id}).exec()
    if(!findPost)  return res.status(400).json({"message":`post id: ${id} not found`})
    
    // Authorization check
    const isAdmin = req.roles?.includes('Admin'); // from JWT payload
    const isOwner = findPost.user.toString() === req.userId; // match post.user with JWT userId    

    if(isAdmin || isOwner){
    if(title) findPost.title= title;      
    if(date_time) findPost.date_time= date_time;
    if(body)  findPost.body = body 
    await findPost.save();
    return res.status(201).json({"message": `Post: ${id} successfully Updated`})  
    }else{
        return res.status(403).json({ message: 'Not authorized to update this post' });
    }
}


const deleteUserPost = async (req,res) =>{
     const {id} = req.params
     if(!id) return res.status(400).json({"message":"Post id is required"})
    const findPost = await Post.findOne({_id:id}).exec()
  // Authorization check
    if(!findPost)  return res.status(400).json({"message":`post id: ${id} not found`})
    const isAdmin = req.roles?.includes('Admin'); // from JWT payload
    const isOwner = findPost.user.toString() === req.userId; // match post.user with JWT userId    
    if(isAdmin || isOwner){
    await findPost.deleteOne({_id:id})
    res.status(201).json({"message":`Post: ${id} deleted succesfully`})
    }else{
        return res.status(403).json({ message: 'Not authorized to delete this post' });
    }
}


const getPostById = async (req,res)=>{
    const {id} = req.params
    if(!id) return res.status(400).json({"message":"Post id is required"})
    const findPost = await Post.findOne({_id:id}).exec()
    if(!findPost){
            return res.status(400).json({"message":`Post id: ${id} not found`})
        }
    res.status(200).json(findPost)
}

module.exports={
getAllPost,
createUserPost,
updateUserPost,
deleteUserPost,
getPostById
}