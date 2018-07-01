import * as akala from '@akala/server'

export interface Service
{
    type: string;
    name: string;
    // connection?: jsonrpc.Connection;
}

export var meta = new akala.Api()
    .clientToServerOneWay<Service>()({ add: true, delete: true })
    .clientToServerOneWay<Partial<Service>>()({ notify: true })
    .clientToServer<Partial<Service>, { [name: string]: Service }>()({ get: true })
    .serverToClientOneWay<Service>()({ add: true, delete: true });