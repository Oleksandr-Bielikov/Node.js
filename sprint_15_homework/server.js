import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import archiver from 'archiver';
import connectionToDB from './db/db.js';
import File from './models/Files.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 4300;

// Pug configuration
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Connect to DB
connectionToDB()
// Middleware for static files
app.use(express.static('public'));
app.use("/download", express.static(path.join(__dirname, "storage")));

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {recursive: true});
}

const storageDir = path.join(__dirname, 'storage');
if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, {recursive: true});
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// Filter to check file type
const fileFilter = (req, file, cb) => {
    // Check file extension
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.txt') {
        cb(null, true);
    } else {
        cb(new Error('Only .txt files are allowed!'), false);
    }
};

// Multer setup with limits
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1024 // 100KB in bytes
    },
    fileFilter: fileFilter
});

// Main page route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'File Upload',
        message: null,
        error: null
    });
});

app.get('/files', async (req, res) => {
    try {
        const filesFromDB = await File.find().sort({uploadedAt: -1});
        res.render('files', {files: filesFromDB, title: "Uploaded files"});
    } catch (error) {
        console.error(error);
    };
})

// File upload route
app.post('/upload', upload.single('file'), async (req, res) => {
    console.log('************* File info *************')
    console.log(req.file);
    if (!req.file) {
        return res.render('index', {
            title: 'File Upload',
            message: null,
            error: 'File was not uploaded'
        });
    }
    
    const outputFileName = path.join(__dirname, 'storage', req.file.filename + '.zip');
    const archive = archiver('zip', { zlib: { level: 9 } });
    const input = fs.createReadStream(req.file.path);
    const output = fs.createWriteStream(outputFileName);

    archive.pipe(output);
    archive.append(input, { name: req.file.originalname });
    archive.on('error', (err) => { throw err; });

    output.on('close', async () => {
        const sieInBytes = archive.pointer();
        const formattedSize = (sieInBytes / 1024).toFixed(2) + 'KB';
        try {
            const newFile = new File({
            filename: req.file.filename + '.zip',
            originalname: req.file.originalname,
            size: sieInBytes,
            extension: path.extname(req.file.originalname).toLowerCase()
        });
        await newFile.save()
        
        res.render('index', {
        title: 'File Upload',
        message: `File "${req.file.originalname}" successfully uploaded!`,
        error: null,
        fileInfo: {
            name: req.file.originalname,
            size: formattedSize,
            path: req.file.path
        }
    });
        } catch (error) {
            console.error(error);
        };
    });
    await archive.finalize();
});

// Multer error handling
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.render('index', {
                title: 'File Upload',
                message: null,
                error: 'File size exceeds 100KB!'
            });
        }
        return res.render('index', {
            title: 'File Upload',
            message: null,
            error: 'Error uploading file: ' + err.message
        });
    } else if (err) {
        return res.render('index', {
            title: 'File Upload',
            message: null,
            error: err.message
        });
    }
    next();
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
