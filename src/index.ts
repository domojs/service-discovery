import * as akala from '@akala/server';
export { meta, Service } from './common';

akala.injectWithName(['$master', '$isModule'], function (master: akala.worker.MasterRegistration, isModule: akala.worker.IsModule)
{
    if (isModule('@domojs/service-discovery'))
        master(module.filename, './master');
})();