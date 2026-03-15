import db from "../config/db.js";

export const uploadManuscript = (req,res)=>{

const { title, authorId } = req.body;

if(!req.file){
return res.status(400).json({ message: "No file uploaded" });
}

const file = req.file.filename;

const sql = `
INSERT INTO manuscripts (authorId, title, manuscript_file)
VALUES (?,?,?)
`;

db.query(sql,[authorId,title,file],(err,result)=>{

if(err){
console.log("DB ERROR:",err);
return res.status(500).json({error:err.message});
}

res.json({
message:"Manuscript uploaded successfully"
});

});

};