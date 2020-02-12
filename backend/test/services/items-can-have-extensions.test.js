const assert = require('assert');
const app = require('../../src/app');

describe('\'itemsCanHaveExtensions\' service', () => {
  it('registered the service', () => {
    const service = app.service('backend/items-can-have-extensions');

    assert.ok(service, 'Registered the service');
  });
});
