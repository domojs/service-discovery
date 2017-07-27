import * as akala from '@akala/server';
import * as jsonrpc from 'json-rpc-ws'
import { Metadata } from '@akala/server'

if (require.main == module)
    akala.injectWithName(['$master'], function (master)
    {
        master(module.filename, './master', './worker');
    })();


export interface Service
{
    type: string;
    name: string;
    connection?: jsonrpc.Connection;
}

export var meta = new Metadata()
    .clientToServerOneWay<Service>()({ add: true, delete: true, notify: true })
    .clientToServer<Partial<Service>, { [name: string]: Service }>()({ get: true })
    .serverToClientOneWay<Service>()({ add: true, delete: true });