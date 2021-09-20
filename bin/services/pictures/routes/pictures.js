"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paths_1 = require("../../../paths");
const pictures_1 = require("../controllers/pictures");
const router = express_1.default.Router();
router.get(paths_1.paths.main, pictures_1.PictureController.main);
router.get(paths_1.paths.picture, pictures_1.PictureController.picture);
router.post(paths_1.paths.add, pictures_1.PictureController.add);
router.post(paths_1.paths.edit, pictures_1.PictureController.edit);
router.post(paths_1.paths.remove, pictures_1.PictureController.remove);
exports.default = router;
//# sourceMappingURL=pictures.js.map