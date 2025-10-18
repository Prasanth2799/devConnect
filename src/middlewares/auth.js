const adminAuth = (req,res,next) => {
    const token = "xyz";
    const isAdminAuth = "xyz" === token
    if(!isAdminAuth){
        res.status(401).send("Unauth admin")
    }
    else {
        next()
    }
}
module.exports = {adminAuth}