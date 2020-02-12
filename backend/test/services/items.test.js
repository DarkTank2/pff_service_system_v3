const assert = require('assert');
const app = require('../../src/app');

describe('\'items\' service', () => {
  it('registered the service', () => {
    const service = app.service('backend/items');

    assert.ok(service, 'Registered the service');
  });
});
