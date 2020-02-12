const assert = require('assert');
const app = require('../../src/app');

describe('\'orderedItems\' service', () => {
  it('registered the service', () => {
    const service = app.service('backend/ordered-items');

    assert.ok(service, 'Registered the service');
  });
});
