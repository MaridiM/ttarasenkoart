"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PictureController = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const config_1 = require("./../../../config");
const filePathPicture = path_1.default.join(__dirname, './../../../db/gallery.json');
const filePathCategory = path_1.default.join(__dirname, './../../../db/category.json');
cloudinary_1.default.v2.config({
    cloud_name: config_1.REACT_APP_CLOUDINARY_CLOUD_NAME,
    api_key: config_1.REACT_APP_CLOUDINARY_API_KAY,
    api_secret: config_1.REACT_APP_CLOUDINARY_API_SECRET,
    secure: true
});
exports.PictureController = {
    main: (req, res) => {
        try {
            // Read file
            const pictures = JSON.parse(fs_1.default.readFileSync(filePathPicture, 'utf-8'));
            if (pictures.length) {
                return res.status(200).json({
                    data: pictures,
                    error: null
                });
            }
            return res.status(200).json({
                data: [],
                error: null
            });
        }
        catch (error) {
            return res.status(500).json({
                data: [],
                error: 'Internal Server Error'
            });
        }
    },
    picture: (req, res) => {
        try {
            // Read file
            const pictures = JSON.parse(fs_1.default.readFileSync(filePathPicture, 'utf-8'));
            const picture = pictures.filter(pict => String(pict.id) === req.params.id);
            if (!picture)
                return res.status(200).json({ data: [], error: 'Picture is not found' });
            return res.status(200).json({
                data: [...picture],
                error: null
            });
        }
        catch (error) {
            return res.status(500).json({
                data: [],
                error: 'Internal Server Error'
            });
        }
    },
    add: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Read file
            const pictures = JSON.parse(fs_1.default.readFileSync(filePathPicture, 'utf-8'));
            const categories = JSON.parse(fs_1.default.readFileSync(filePathCategory, 'utf-8'));
            // Validation required inputs
            if (req.body.name === '')
                return res.status(200).json({ data: [...pictures], error: 'Title can not be empty' });
            if (req.body.category === '')
                return res.status(200).json({ data: [...pictures], error: 'Category can not be empty' });
            if (req.body.category.toLowerCase() === 'all')
                return res.status(200).json({ data: [...pictures], error: 'Category can not be all' });
            if (req.body.image === '')
                return res.status(200).json({ data: [...pictures], error: 'Image can not be empty' });
            // Add category if it not existing
            const category = !!categories.filter(c => c.id === String(req.body.category.toLowerCase()));
            if (!category) {
                categories.push({
                    id: String(req.body.category.toLowerCase().replace(' ', '-')),
                    name: req.body.category
                });
                fs_1.default.writeFileSync(filePathCategory, JSON.stringify(categories));
            }
            // Template new picture
            const newPicture = {
                id: pictures.length,
                name: req.body.name,
                category: String(req.body.category.toLowerCase().replace(' ', '-')),
                availability: req.body.availability || "in stock",
                type: req.body.type || "",
                size: req.body.size || "",
                image: ''
            };
            // console.log(req.body)
            yield cloudinary_1.default.v2.uploader.unsigned_upload(req.body.image, config_1.REACT_APP_CLOUDINARY_UPLOAD_PRESET, { resource_type: "image" }, (error, result) => {
                newPicture.image = result.secure_url;
                console.log(result);
            });
            pictures.reverse().push(newPicture);
            pictures.reverse();
            // Write in file
            fs_1.default.writeFileSync(filePathPicture, JSON.stringify(pictures));
            return res.status(201).json({
                data: [...pictures],
                error: null
            });
        }
        catch (error) {
            return res.status(500).json({
                data: [],
                error: 'Internal Server Error'
            });
        }
    }),
    edit: (req, res) => {
        try {
            // Write in file
            const pictures = JSON.parse(fs_1.default.readFileSync(filePathPicture, 'utf-8'));
            const categories = JSON.parse(fs_1.default.readFileSync(filePathCategory, 'utf-8'));
            const picture = pictures.filter(pict => String(pict.id) === req.params.id)[0];
            // Validation required inputs
            if (req.body.name === '')
                return res.status(200).json({ data: [...pictures], error: 'Title can not be empty' });
            if (req.body.category === '')
                return res.status(200).json({ data: [...pictures], error: 'Category can not be empty' });
            if (req.body.category.toLowerCase() === 'all')
                return res.status(200).json({ data: [...pictures], error: 'Category can not be all category, please change other' });
            if (req.body.image === '')
                return res.status(200).json({ data: [...pictures], error: 'Image can not be empty' });
            // Add category if it not existing
            const category = !!categories.filter(c => c.id === String(req.body.category.toLowerCase()));
            if (!category) {
                categories.push({
                    id: String(req.body.category.toLowerCase().replace(' ', '-')),
                    name: req.body.category
                });
                fs_1.default.writeFileSync(filePathCategory, JSON.stringify(categories));
            }
            // Template new picture
            const newPicture = {
                id: picture.id,
                name: req.body.name || picture.name,
                category: String(req.body.category.toLowerCase().replace(' ', '-')) || picture.category,
                availability: req.body.availability || picture.availability,
                type: req.body.type || picture.type,
                size: req.body.size || picture.size,
                image: req.body.image || picture.image,
            };
            const newPictures = pictures.map(pict => {
                if (pict.id === picture.id) {
                    return pict = Object.assign({}, newPicture);
                }
                return pict;
            });
            // Write in file
            fs_1.default.writeFileSync(filePathPicture, JSON.stringify(newPictures));
            return res.status(200).json({
                data: [...newPictures],
                error: null
            });
        }
        catch (error) {
            return res.status(500).json({
                data: [],
                error: 'Internal Server Error'
            });
        }
    },
    remove: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Write in file
            const pictures = JSON.parse(fs_1.default.readFileSync(filePathPicture, 'utf-8'));
            const categories = JSON.parse(fs_1.default.readFileSync(filePathCategory, 'utf-8'));
            // Remove Picture
            const newPictures = pictures.filter(pict => String(pict.id) !== req.params.id);
            // Remove categories if they dont have picture
            const categoryIDs = categories.map(c => c.id);
            const picturesCategory = newPictures.map(pict => pict.category);
            categoryIDs.map(c => {
                if (!picturesCategory.includes(c)) {
                    const newCategories = categories.filter(cat => cat.id !== c);
                    fs_1.default.writeFileSync(filePathCategory, JSON.stringify(newCategories));
                }
                return;
            });
            const imageName = pictures.filter(pict => String(pict.id) === req.params.id)[0].image.split('/');
            yield cloudinary_1.default.v2.uploader.destroy(`ttarasenkoart/${imageName[imageName.length - 1].split('.')[0]}`, { resource_type: "image" }, (error, result) => { console.log(result, error); });
            // Write in file
            yield fs_1.default.writeFileSync(filePathPicture, JSON.stringify(newPictures));
            return res.status(200).json({
                data: [...newPictures],
                error: null
            });
        }
        catch (error) {
            return res.status(500).json({
                data: [],
                error: 'Internal Server Error'
            });
        }
    })
};
//# sourceMappingURL=pictures.js.map