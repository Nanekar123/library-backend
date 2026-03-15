import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

destination: function(req,file,cb){
cb(null,"uploads/manuscripts");
},

filename: function(req,file,cb){

const unique = Date.now()+"-"+file.originalname;
cb(null,unique);

}

});

const uploadManuscript = multer({ storage });

export default uploadManuscript;