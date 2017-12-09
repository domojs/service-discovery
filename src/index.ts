import * as akala from '@akala/server';
import * as jsonrpc from '@akala/json-rpc-ws'
import { Connection } from '@akala/json-rpc-ws'
import { Metadata, Proxy } from '@akala/server'
export { meta, Service } from './common';

akala.injectWithName(['$master', '$isModule'], function (master: akala.worker.MasterRegistration, isModule: (m: string) => boolean)
{
    if (isModule('@domojs/service-discovery'))
        master(module.filename, './master', './common');
})();