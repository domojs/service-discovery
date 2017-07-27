"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const akala = require("@akala/server");
const server_1 = require("@akala/server");
if (require.main == module)
    akala.injectWithName(['$master'], function (master) {
        master(module.filename, './master', './worker');
    })();
exports.meta = new server_1.Metadata()
    .clientToServerOneWay()({ add: true, delete: true, notify: true })
    .clientToServer()({ get: true })
    .serverToClientOneWay()({ add: true, delete: true });
//# sourceMappingURL=index.js.map