import * as akala from '@akala/server'

export interface Service
{
    type: string;
    name: string;
    // connection?: jsonrpc.Connection;
}

export var meta = new akala.Api()
    .clientToServerOneWay<Service>()({ add: { rest: { method: 'put', url: '/', params: 'body' } }, delete: { rest: { method: 'delete', url: '/', params: 'body' } } })
    .clientToServerOneWay<Partial<Service>>()({ notify: true })
    .clientToServer<Partial<Service>, { [name: string]: Service }>()({ get: { rest: { method: 'get', url: '/', params: 'query' } } })
    .serverToClientOneWay<Service>()({ add: true, delete: true });