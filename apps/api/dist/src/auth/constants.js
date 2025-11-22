"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = void 0;
require("dotenv/config");
exports.jwtConstants = {
    secret: process.env.JWT_SECRET,
};
if (!exports.jwtConstants.secret) {
    throw new Error('JWT_SECRET is not defined in your .env file');
}
//# sourceMappingURL=constants.js.map