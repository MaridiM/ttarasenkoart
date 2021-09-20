"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
const config_1 = require("./config");
const paths_1 = require("./paths");
const routes_1 = require("./services/auth/routes");
const routes_2 = require("./services/pictures/routes");
const routes_3 = require("./services/categories/routes");
const app = express_1.default();
app.use(cors_1.default(config_1.corsOptions));
app.use(express_session_1.default(config_1.sessionOptions));
app.use(cookie_parser_1.default());
app.use(helmet_1.default());
app.use(body_parser_1.default.json({ limit: '5mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '5mb', extended: true }));
app.use(express_1.default.json());
app.use(paths_1.paths.auth, routes_1.authRoutes);
app.use(paths_1.paths.categories, routes_3.categoriesRoutes);
app.use(paths_1.paths.pictures, routes_2.pictureRoutes);
app.listen(config_1.PORT, () => {
    console.log(`Service listening on port ${config_1.PORT}`);
});
//# sourceMappingURL=server.js.map