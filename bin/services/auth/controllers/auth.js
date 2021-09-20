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
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_json_1 = __importDefault(require("../../../db/users.json"));
exports.AuthController = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.body) {
                return res.status(400).json({
                    token: null,
                    error: 'Field can\'t be empty!'
                });
            }
            console.log(req.body);
            const { login, password } = req.body;
            if (login !== users_json_1.default.login || password !== users_json_1.default.password)
                return res.status(422).json({
                    token: null,
                    error: 'Login or password error'
                });
            const token = jsonwebtoken_1.default.sign({ user: users_json_1.default.login }, 'SomeSecretkay');
            const sess = req.session;
            sess.token = token;
            sess.save();
            return res.status(200).json({
                token,
                error: null
            });
        }
        catch (error) {
            return res.status(500).json({ token: null, error: 'Server error' });
        }
    }),
    logout: (req, res) => {
        try {
            return res.status(200).json({
                token: null,
                error: null
            });
        }
        catch (error) {
            return res.status(500).json({ token: null, error: 'Server error' });
        }
    },
};
//# sourceMappingURL=auth.js.map