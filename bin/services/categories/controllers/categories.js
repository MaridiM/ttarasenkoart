"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const filePathCategory = path_1.default.join(__dirname, './../../../db/category.json');
exports.CategoryController = {
    main: (req, res) => {
        try {
            // Write in file
            const categories = JSON.parse(fs_1.default.readFileSync(filePathCategory, 'utf-8'));
            if (!categories)
                return res.status(200).json({ data: [], error: 'Have no any category' });
            return res.status(200).json({
                data: [...categories],
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
};
//# sourceMappingURL=categories.js.map