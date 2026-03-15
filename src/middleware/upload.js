import multer from "multer";

const storage = multer.diskStorage({

destination: (req, file, cb) => {

if (req.originalUrl.includes("manuscripts")) {
cb(null, "uploads/manuscripts");
}
else if (file.mimetype === "application/pdf") {
cb(null, "uploads/pdfs");
}
else {
cb(null, "uploads/images");
}

},

filename: (req, file, cb) => {
cb(null, Date.now() + "-" + file.originalname);
}

});

export const upload = multer({ storage });