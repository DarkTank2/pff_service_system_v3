const assert = require('assert');
const app = require('../../src/app');

describe('\'orderedItemsHaveExtensions\' service', () => {
  it('registered the service', () => {
    const service = app.service('backend/ordered-items-have-extensions');

    assert.ok(service, 'Registered the service');
  });
});
