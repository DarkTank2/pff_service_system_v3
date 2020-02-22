// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    let promises = []
    context.data.extensions.forEach(extension => {
      promises.push(context.app.service('/backend/ordered-items-have-extensions').create({
        orderedItemId: context.result.id,
        extensionId: extension.id
      }))
    })
    await Promise.all(promises)
    return context
  };
};
