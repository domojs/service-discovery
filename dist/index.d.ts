import * as jsonrpc from 'json-rpc-ws';
import { Metadata } from '@akala/server';
export interface Service {
    type: string;
    name: string;
    connection?: jsonrpc.Connection;
}
export declare var meta: Metadata<{
    add: (p: Service) => void;
    delete: (p: Service) => void;
    notify: (p: Service) => void;
} & {
    get: (p: Partial<Service>) => {
        [name: string]: Service;
    } | PromiseLike<{
        [name: string]: Service;
    }>;
}, {
    add: (p: Service) => void;
    delete: (p: Service) => void;
}>;
