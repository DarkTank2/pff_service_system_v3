const assert = require('assert');
const app = require('../../src/app');

describe('\'extensions\' service', () => {
  it('registered the service', () => {
    const service = app.service('backend/extensions');

    assert.ok(service, 'Registered the service');
  });
});
