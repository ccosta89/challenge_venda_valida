
function getActiveRemoteMethods(model) {
  var activeRemoteMethods = [];
  
  for(let method of model.sharedClass.methods({ includeDisabled: true})) {
    activeRemoteMethods.push(method.name);
  }

  return activeRemoteMethods;
}

function exposeMethods(context, methodsList) {
  context.disableRemoteMethodByName('updateAttributes'); 
  context.disableRemoteMethodByName('prototype.updateAttributes')
  for(let method of getActiveRemoteMethods(context).filter(x => !methodsList.includes(x))) {
    context.disableRemoteMethodByName(method);
  }
}

module.exports.exposeMethods = exposeMethods;