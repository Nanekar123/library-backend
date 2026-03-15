import db from "../config/db.js";

export const getDashboardStats = (req,res)=>{

const stats = {};

db.query(
`SELECT COUNT(*) AS users FROM users WHERE role='user'`,
(e,r)=>{

stats.users = r[0].users;

db.query(
`SELECT COUNT(*) AS authors FROM users WHERE role='author'`,
(e2,r2)=>{

stats.authors = r2[0].authors;

db.query(
`SELECT COUNT(*) AS books FROM books`,
(e3,r3)=>{

stats.books = r3[0].books;

db.query(
`SELECT COUNT(*) AS activeRentals FROM issues WHERE status!='completed'`,
(e4,r4)=>{

stats.activeRentals = r4[0].activeRentals;

res.json(stats);

});

});

});

});

};