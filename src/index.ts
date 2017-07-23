import * as akala from '@akala/core';
import * as debug from 'debug';
var log = debug('domojs:service-discovery');

akala.injectWithName(['$master'], function (master)
{
    master(module.filename, './master', './worker');
})();
