"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const akala = require("@akala/server");
var common_1 = require("./common");
exports.meta = common_1.meta;
akala.injectWithName(['$master', '$isModule'], function (master, isModule) {
    if (isModule('@domojs/service-discovery'))
        master(module.filename, './master', './common');
})();
//# sourceMappingURL=index.js.map