

const getUserProfile = async (req, res) => {
    
    try {

        return res.status (200).send ({
            status: 'success',
            userDetails: req.oidc.user
        })
        
    } catch (error) {
        return res.status (401).send ({
            status: 'failure',
            message: error.message
        })
    }

}

module.exports = {
    getUserProfile
}