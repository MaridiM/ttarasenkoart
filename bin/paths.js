"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paths = void 0;
const basePath = '/api';
exports.paths = {
    main: '/',
    auth: `${basePath}/auth`,
    pictures: `${basePath}/picture`,
    categories: `${basePath}/categories`,
    add: `/add`,
    picture: `/:id`,
    edit: `/edit/:id`,
    remove: `/remove/:id`,
    login: `/login`,
    logout: `/logout`,
};
//# sourceMappingURL=paths.js.map