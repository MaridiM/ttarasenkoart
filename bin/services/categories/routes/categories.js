"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paths_1 = require("../../../paths");
const categories_1 = require("../controllers/categories");
const router = express_1.default.Router();
router.get(paths_1.paths.main, categories_1.CategoryController.main);
exports.default = router;
//# sourceMappingURL=categories.js.map