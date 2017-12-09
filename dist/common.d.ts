import { Connection } from '@akala/json-rpc-ws';
import { Metadata, Proxy } from '@akala/server';
export interface Service {
    type: string;
    name: string;
}
export declare var meta: Metadata<Connection, Proxy<{
    add: boolean;
    delete: boolean;
}, (this: {
    $proxy(socket: Connection): Partial<{}>;
}, p: Service, connection?: Connection) => void> & Proxy<{
    notify: boolean;
}, (this: Proxy<{
    add: boolean;
    delete: boolean;
}, any> & {
    $proxy(socket: Connection): Partial<{}>;
}, p: Partial<Service>, connection?: Connection) => void>, Proxy<{
    get: boolean;
}, (this: Proxy<{
    add: boolean;
    delete: boolean;
}, (this: {
    $proxy(socket: Connection): Partial<{}>;
}, p: Service, connection?: Connection) => void> & Proxy<{
    notify: boolean;
}, (this: Proxy<{
    add: boolean;
    delete: boolean;
}, any> & {
    $proxy(socket: Connection): Partial<{}>;
}, p: Partial<Service>, connection?: Connection) => void> & {
    $proxy(socket: Connection): Partial<{}>;
}, p: Partial<Service>, connection?: Connection) => {
    [name: string]: Service;
} | PromiseLike<{
    [name: string]: Service;
}>>, Proxy<{
    add: boolean;
    delete: boolean;
}, (p: Service) => void>, {}, Proxy<{
    add: boolean;
    delete: boolean;
}, (p: Service) => PromiseLike<void>> & Proxy<{
    notify: boolean;
}, (p: Partial<Service>) => PromiseLike<void>>, Proxy<{
    get: boolean;
}, (p: Partial<Service>) => PromiseLike<{
    [name: string]: Service;
}>>, Proxy<{
    add: boolean;
    delete: boolean;
}, (p: Service) => PromiseLike<void>>, {}>;
