import * as jsonrpc from '@akala/json-rpc-ws'
import * as akala from '@akala/server'
import { meta, Service } from './common';

const logger = akala.logger('domojs:service-discovery');

var services: { byTypes: { [type: string]: { [name: string]: Service } }, byNames: { [name: string]: Service } } = { byTypes: {}, byNames: {} };
var rooms: { byTypes: { [type: string]: jsonrpc.Connection[] }, byNames: { [type: string]: jsonrpc.Connection[] } } = { byTypes: {}, byNames: {} };

export var api = akala.buildServer(meta, { jsonrpcws: '/api/zeroconf', rest: '/api/zeroconf' },
    {
        add(service: Service)
        {
            // akala.extend(service, { connection: this });
            logger.info(service);
            services.byTypes[service.type] = services.byTypes[service.type] || {};
            services.byTypes[service.type][service.name] = service;
            services.byNames[service.name] = service;

            if (rooms.byTypes[service.type])
                rooms.byTypes[service.type].forEach(function (socket)
                {
                    socket.sendMethod('add', service as any);
                });
            if (rooms.byNames[service.name])
                rooms.byNames[service.name].forEach(function (socket)
                {
                    socket.sendMethod('add', service as any);
                });
        },
        delete(service: Service)
        {
            if (services.byTypes[service.type])
                delete services.byTypes[service.type][service.name];
            delete services.byNames[service.name];

            if (rooms.byTypes[service.type])
                rooms.byTypes[service.type].forEach(function (socket)
                {
                    socket.sendMethod('delete', service as any);
                });
            if (rooms.byNames[service.name])
                rooms.byNames[service.name].forEach(function (socket)
                {
                    socket.sendMethod('delete', service as any);
                });
        },
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
        },
        notify(service: Partial<Service>, socket: jsonrpc.Connection)
        {
            if (service.type)
            {
                if (!rooms.byTypes[service.type])
                    rooms.byTypes[service.type] = [];
                rooms.byTypes[service.type].push(socket);
                if (services.byTypes[service.type])
                    akala.each(services.byTypes[service.type], (service) =>
                    {
                        akala.api.jsonrpcws(meta).createClientProxy(socket).add(service);
                    });
            }

            if (service.name)
            {
                if (!rooms.byNames[service.name])
                    rooms.byNames[service.name] = [];
                rooms.byNames[service.name].push(socket);
                if (services.byNames[service.name])
                    akala.api.jsonrpcws(meta).createClientProxy(socket).add(services.byNames[service.name]);
            }
        }
    });