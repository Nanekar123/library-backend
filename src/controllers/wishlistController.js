import db from "../config/db.js";

/* ================= ADD OR REMOVE WISHLIST ================= */

export const toggleWishlist = (req,res)=>{

const {userId,bookId} = req.body;

db.query(
"SELECT * FROM wishlist WHERE userId=? AND bookId=?",
[userId,bookId],
(err,result)=>{

if(err) return res.status(500).json(err);

if(result.length>0){

/* REMOVE */

db.query(
"DELETE FROM wishlist WHERE userId=? AND bookId=?",
[userId,bookId],
(err)=>{

if(err) return res.status(500).json(err);

res.json({message:"Removed from wishlist"});

}
);

}else{

/* ADD */

db.query(
"INSERT INTO wishlist(userId,bookId) VALUES (?,?)",
[userId,bookId],
(err)=>{

if(err) return res.status(500).json(err);

res.json({message:"Added to wishlist"});

}
);

}

}

);

};


/* ================= GET USER WISHLIST ================= */

export const getWishlist = (req,res)=>{

const userId = req.params.userId;

db.query(

`SELECT books.*
FROM wishlist
JOIN books ON books.id = wishlist.bookId
WHERE wishlist.userId=?`,

[userId],

(err,result)=>{

if(err) return res.status(500).json(err);

res.json(result);

}

);

};