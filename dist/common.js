"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@akala/server");
exports.meta = new server_1.Metadata()
    .connection()
    .clientToServerOneWay()({ add: true, delete: true })
    .clientToServerOneWay()({ notify: true })
    .clientToServer()({ get: true })
    .serverToClientOneWay()({ add: true, delete: true });
//# sourceMappingURL=common.js.map