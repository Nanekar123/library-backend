import db from "../config/db.js";

/* GET USER NOTIFICATIONS */

export const getNotifications = (req,res)=>{

const userId = req.params.userId;

db.query(
"SELECT * FROM notifications WHERE userId=? ORDER BY sent_at DESC",
[userId],
(err,result)=>{

if(err){
return res.status(500).json(err);
}

res.json(result);

});

};