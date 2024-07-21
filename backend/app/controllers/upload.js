const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
const limits = {
    fieldNameSize: 400,
    fileSize: 100000000
  };
//Cargar Imágemes en el servidor
const uploadImage = multer({ 
    storage: storage,
    limits:limits,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            return cb(new Error('Permitido solo imagénes de tipo .png, .jpg, .jpeg'));
        }
    }
    })
const uploadSingleImage = uploadImage.single('myFile');
exports.uploadFileImage = async (req, res) => {
    uploadSingleImage(req,res,function(err){
        if(err){
            console.log(err);
            return res.status(401).json({message:err.message})
        }
        res.send({data:req.file.filename});
    })
}
//Cargar video en el servidor
const uploadVideo = multer({ 
    storage: storage,
    limits:limits,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'video/gif' || file.mimetype === 'video/mp4' || file.mimetype === 'video/ogg' 
        || file.mimetype === 'video/wmv' || file.mimetype === 'video/x-flv' || file.mimetype === 'video/avi' 
        || file.mimetype === 'video/webm' || file.mimetype === 'video/mkv') {
            cb(null, true);
        } else {
            return cb(new Error('Permitido solo videos de tipo .mp4, .wmv, .gif'));
        }
    }
    })
const uploadSingleVideo = uploadVideo.single('myFile');
exports.uploadFileVideo = async (req, res) => {
    uploadSingleVideo(req,res,function(err){
        if(err){
            console.log(err);
            return res.status(401).json({message:err.message})
        }
        res.send({data:req.file.filename});
    })
}
//Cargar PDF en el servidor
const uploadPdf = multer({ 
    storage: storage,
    limits:limits,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            // req.fileValidationError='consola: Only .png, .jpg and .jpeg format allowed!';
            // cb(null, false);
            return cb(new Error('Permitido solo documentos de tipo .pdf'));
        }
    }
    })
const uploadSinglePdf = uploadPdf.single('myFile');
exports.uploadFilePdf = async (req, res) => {
    uploadSinglePdf(req,res,function(err){
        if(err){
            console.log(err);
            return res.status(401).json({message:err.message})
        }
        res.send({data:req.file.filename});
    })
}
//Cargar archivos de texto en el servidor
const uploadWord = multer({ 
    storage: storage,
    limits:limits,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/msword" || 
        file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            cb(null, true);
        } else {
            return cb(new Error('Permitido solo documentos de tipo .docx'));
        }
    }
    })
const uploadSingleWord = uploadWord.single('myFile');
exports.uploadFileWord = async (req, res) => {
    uploadSingleWord(req,res,function(err){
        if(err){
            console.log(err);
            return res.status(401).json({message:err.message})
        }
        res.send({data:req.file.filename});
    })
}
//Cargar audio en el servidor
const uploadAudio = multer({ 
    storage: storage,
    limits:limits,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "audio/mp4a-latm" || file.mimetype === "audio/mpeg") {
            cb(null, true);
        } else {
            return cb(new Error('Permitido solo archivos de tipo audio'));
        }
    }
    })
const uploadSingleAudio = uploadAudio.single('myFile');
exports.uploadFileAudio = async (req, res) => {
    uploadSingleAudio(req,res,function(err){
        if(err){
            console.log(err);
            return res.status(401).json({message:err.message})
        }
        res.send({data:req.file.filename});
    })
}