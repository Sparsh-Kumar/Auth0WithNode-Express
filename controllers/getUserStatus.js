

const getUserStatus = async (req, res) => {
    
    try {

        return res.status (200).send ({
            status: 'success',
            userStatus: req.oidc.isAuthenticated () ? 'User is logged in right now': 'User is logged out right now'
        })

    } catch (error) {
        return res.status (401).send ({
            status: 'failure',
            message: error.message
        })
    }

}

module.exports = {
    getUserStatus
}