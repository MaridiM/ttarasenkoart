"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = exports.cookieOptionsSecret = exports.sessionOptions = exports.REACT_APP_CLOUDINARY_CLOUD_NAME = exports.REACT_APP_CLOUDINARY_API_URL = exports.REACT_APP_CLOUDINARY_UPLOAD_PRESET = exports.REACT_APP_CLOUDINARY_API_SECRET = exports.REACT_APP_CLOUDINARY_API_KAY = exports.CLIENT_HOST = exports.SESSION_SECRET = exports.PORT = void 0;
const express_session_1 = __importDefault(require("express-session"));
exports.PORT = process.env.PORT || 8000;
exports.SESSION_SECRET = process.env.SESSION_SECRET || 'SOMEsecREtCoDeFoRSEsSiON';
exports.CLIENT_HOST = process.env.CLIENT_HOST || '*';
// Cloudinary
exports.REACT_APP_CLOUDINARY_API_KAY = process.env.REACT_APP_CLOUDINARY_API_KAY || '821279233882751';
exports.REACT_APP_CLOUDINARY_API_SECRET = process.env.REACT_APP_CLOUDINARY_API_SECRET || 'RXcPZVDEzyS9ynNC-VAmlDK78IQ';
exports.REACT_APP_CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'pxrbylo3_ttarasenkoart.com';
exports.REACT_APP_CLOUDINARY_API_URL = process.env.REACT_APP_CLOUDINARY_API_URL || 'https://api.cloudinary.com/v1_1/dki4lxdki/image/upload';
exports.REACT_APP_CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dki4lxdki';
var MemoryStore = express_session_1.default.MemoryStore;
exports.sessionOptions = {
    key: 'token',
    secret: exports.SESSION_SECRET,
    resave: false,
    rolling: true,
    store: new MemoryStore(),
    saveUninitialized: false,
    cookie: {
        domain: 'localhost',
        httpOnly: true,
        secure: false,
        maxAge: 60 * 1000
    }
};
exports.cookieOptionsSecret = 'SOMEsecREtCoDeFoRCoOkIE';
exports.corsOptions = {
    origin: exports.CLIENT_HOST || '*',
    credentials: true
};
//# sourceMappingURL=config.js.map