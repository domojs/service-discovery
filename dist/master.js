"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const akala = require("@akala/server");
const common_1 = require("./common");
var services = { byTypes: {}, byNames: {} };
var rooms = { byTypes: [], byNames: [] };
akala.createServerFromMeta(common_1.meta)(akala.resolve('$router'), '/zeroconf', {
    add: function (service) {
        // akala.extend(service, { connection: this });
        services.byTypes[service.type] = services.byTypes[service.type] || {};
        services.byTypes[service.type][service.name] = service;
        services.byNames[service.name] = service;
        rooms.byTypes.forEach(function (socket) {
            socket.sendMethod('add', service);
        });
        rooms.byNames.forEach(function (socket) {
            socket.sendMethod('add', service);
        });
    },
    delete: function (service) {
        if (services.byTypes[service.type])
            delete services.byTypes[service.type][service.name];
        delete services.byNames[service.name];
        rooms.byTypes.forEach(function (socket) {
            socket.sendMethod('delete', service);
        });
        rooms.byNames.forEach(function (socket) {
            socket.sendMethod('delete', service);
        });
    },
    get: function (serviceQuery) {
        var queryable;
        if (serviceQuery.type)
            queryable = services.byTypes;
        else
            queryable = services.byNames;
        if (serviceQuery.name)
            return akala.grep(queryable, function (service, name) {
                return name.indexOf(serviceQuery.name) >= 0;
            });
        else
            return queryable;
    },
    notify: function (service, socket) {
        if (service.type)
            rooms.byTypes.push(socket);
        if (service.name)
            rooms.byNames.push(socket);
    }
});
//# sourceMappingURL=master.js.map