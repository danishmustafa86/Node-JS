const User = require('../models/userSchema');


const createSchemaControler = async (req,res)=>{
    try{
        const {name, email} = req.query;
        const searchQuery = {};
        
        if (name){
            searchQuery.name = {$regex:name, $options:"i"};
        }
        if (email){
            searchQuery.email = {$regex:email, $options:"i"};
        }

        // Check if at least one search parameter is provided
        if (Object.keys(searchQuery).length === 0) {
            return res.status(400).json({
                status: "error",
                message: "Please provide at least one search parameter (username or email)",
                data: []
            });
        }

        const searchResults = await User.find(searchQuery);
        res.status(200).json({
            status: "success",
            message: "search results",
            data: searchResults
        })
    }catch(error){
        return res.status(500).json({
            status: "error in searching",
            message: error.message,
            data: []
        })
    }
}


module.exports = {createSchemaControler}