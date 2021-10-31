

const RouteHandler = require ('express').Router ();
const path = require ('path');
const { getUserStatus } = require (path.resolve (__dirname, '..', 'controllers', 'getUserStatus'));
const { getUserProfile } = require (path.resolve (__dirname, '..', 'controllers', 'getUserProfile'));
const { requiresAuth } = require ('express-openid-connect');

/** public route to get status of user (weather he/she is logged in or logged out) */
RouteHandler.get ('/get-user-status', getUserStatus);


/** private route or authenticated route which will just return all the details of logged in user */
/** one must be authenticated before hitting this route otherwise he/she will be redirected to signup/login page */

RouteHandler.get ('/get-user-profile', requiresAuth (), getUserProfile);

module.exports = {
    RouteHandler
}