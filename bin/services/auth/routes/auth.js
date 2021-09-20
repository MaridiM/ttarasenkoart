"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paths_1 = require("../../../paths");
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
router.post(paths_1.paths.login, auth_1.AuthController.login);
router.post(paths_1.paths.logout, auth_1.AuthController.logout);
exports.default = router;
//# sourceMappingURL=auth.js.map