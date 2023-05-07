const {admin} = require('./firebase');
module.exports = async (req, res) =>{
const token = req.headers.authorization.split(' ')[1];
await admin.auth().verifyIdToken(token);
};