"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const akala = require("@akala/server");
const common_1 = require("./common");
var services = { byTypes: {}, byNames: {} };
var rooms = { byTypes: [], byNames: [] };
common_1.meta.createServer(akala.resolve('$router'), '/zeroconf', {
    add: function (service) {
        akala.extend(service, { connection: this });
        services.byTypes[service.type] = services[service.type] || {};
        services.byTypes[service.type][service.name] = service;
        services.byNames[service.name] = service;
        rooms.byTypes.forEach(function (socket) {
            socket.sendMethod('Service-Add', { type: service.type, name: service.name });
        });
        rooms.byNames.forEach(function (socket) {
            socket.sendMethod('Service-Add', { type: service.type, name: service.name });
        });
    },
    delete: function (service) {
        if (services.byTypes[service.type])
            delete services.byTypes[service.type][service.name];
        delete services.byNames[service.name];
        rooms.byTypes.forEach(function (socket) {
            socket.sendMethod('Service-Delete', { type: service.type, name: service.name });
        });
        rooms.byNames.forEach(function (socket) {
            socket.sendMethod('Service-Delete', { type: service.type, name: service.name });
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
    notify: function (service) {
        if (service.type)
            rooms.byTypes.push(this);
        if (service.name)
            rooms.byNames.push(this);
    }
});
//# sourceMappingURL=master.js.map