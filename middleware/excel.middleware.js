// this middleware is used for handling excel file

const multer = require('multer');

// memory storage
// storage=> aws production
const storage= multer.memoryStorage();

//configuration for excel file

const excelUpload = multer({
    storage,
    limits:{fileSize: 5 * 1024 * 1024},  //5mb file size
    fileFilter: (req, file, cb)=>{
        if(file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
            cb(null, true) // green sign that we can proceed
        }else{
            cb(new Error('Only .xlsx files are allowed'))
            // we are throwing error
        }
    }
})

module.exports = excelUpload;

