import * as jsonrpc from '@akala/json-rpc-ws'
import * as akala from '@akala/server'
import { meta, Service } from './common';

var services: { byTypes: { [type: string]: { [name: string]: Service } }, byNames: { [name: string]: Service } } = { byTypes: {}, byNames: {} };
var rooms: { byTypes: jsonrpc.Connection[], byNames: jsonrpc.Connection[] } = { byTypes: [], byNames: [] };
@akala.server(meta, { jsonrpcws: '/zeroconf' })
class Api
{
    add(service: Service)
    {
        // akala.extend(service, { connection: this });
        services.byTypes[service.type] = services.byTypes[service.type] || {};
        services.byTypes[service.type][service.name] = service;
        services.byNames[service.name] = service;

        rooms.byTypes.forEach(function (socket)
        {
            socket.sendMethod('add', service as any);
        });
        rooms.byNames.forEach(function (socket)
        {
            socket.sendMethod('add', service as any);
        });
    }
    delete(service: Service)
    {
        if (services.byTypes[service.type])
            delete services.byTypes[service.type][service.name];
        delete services.byNames[service.name];

        rooms.byTypes.forEach(function (socket)
        {
            socket.sendMethod('delete', service as any);
        });
        rooms.byNames.forEach(function (socket)
        {
            socket.sendMethod('delete', service as any);
        });
    }
    get(serviceQuery: Partial<Service>)
    {
        var queryable: { [name: string]: any };
        if (serviceQuery.type)
            queryable = services.byTypes;
        else
            queryable = services.byNames;

        if (serviceQuery.name)
            return akala.grep(queryable, function (service: Service, name: string)
            {
                return name.indexOf(serviceQuery.name) >= 0;
            });
        else
            return queryable;
    }
    notify(service, socket)
    {
        if (service.type)
            rooms.byTypes.push(socket);

        if (service.name)
            rooms.byNames.push(socket);
    }
}