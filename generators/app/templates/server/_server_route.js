'use strict';

// <%= crud_name_upper %> authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && !req.<%= crud_name_lower %>.user._id.equals(req.user._id)) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

var hasPermissions = function(req, res, next) {

    req.body.permissions = req.body.permissions || ['authenticated'];

    for (var i = 0; i < req.body.permissions.length; i++) {
      var permission = req.body.permissions[i];
      if (req.acl.user.allowed.indexOf(permission) === -1) {
            return res.status(401).send('User not allowed to assign ' + permission + ' permission.');
        };
    };

    next();
};

module.exports = function(<%= crud_name_upper %>s, app, auth) {

  var <%= crud_name_lower %>s = require('../controllers/<%= crud_name_lower %>s')(<%= crud_name_upper %>s);

  app.route('/api/<%= crud_name_lower %>s')
    .get(<%= crud_name_lower %>s.all)
    .post(auth.requiresLogin, hasPermissions, <%= crud_name_lower %>s.create);
  app.route('/api/<%= crud_name_lower %>s/:<%= crud_name_lower %>Id')
    .get(auth.isMongoId, <%= crud_name_lower %>s.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, <%= crud_name_lower %>s.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, <%= crud_name_lower %>s.destroy);

  // Finish with setting up the <%= crud_name_lower %>Id param
  app.param('<%= crud_name_lower %>Id', <%= crud_name_lower %>s.<%= crud_name_lower %>);
};
