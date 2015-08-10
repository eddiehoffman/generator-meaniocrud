'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the extraordinary ' + chalk.red('Meaniocrud') + ' generator!'
    ));

    var prompts = [{
      type: 'string',
      name: 'package_name',
      message: 'What is the name of the custom package you would like to add the crud model to?',
      default: 'custompkg'
    }, {
      type: 'string',
      name: 'crud_name',
      message: 'What is the name of the crud model you would like to create?',
      default: 'Article'
    }];

    this.prompt(prompts, function(answers) {

      String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
      }

      this.package_name_lower = answers.package_name.toLowerCase();
      this.crud_name_lower = answers.crud_name.toLowerCase();
      this.crud_name_upper = this.crud_name_lower.capitalizeFirstLetter();

      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      var context = {
        package_name_lower: this.package_name_lower,
        crud_name_lower: this.crud_name_lower,
        crud_name_upper: this.crud_name_upper
      };
      var package_dir = 'packages/custom/' + this.package_name_lower
      this.fs.copyTpl(
        this.templatePath('public/_public_controller.js'),
        this.destinationPath(package_dir + '/public/controllers/' + this.crud_name_lower + 's.js'), context
      );
      this.fs.copyTpl(
        this.templatePath('public/_public_route.js'),
        this.destinationPath(package_dir + '/public/routes/' + this.crud_name_lower + 's.js'), context
      );
      this.fs.copyTpl(
        this.templatePath('public/_public_service.js'),
        this.destinationPath(package_dir + '/public/services/' + this.crud_name_lower + 's.js'), context
      );
      this.fs.copyTpl(
        this.templatePath('public/_public_test.js'),
        this.destinationPath(package_dir + '/public/tests/' + this.crud_name_lower + 's.spec.js'), context
      );
      this.fs.copyTpl(
        this.templatePath('public/_public_view_create.html'),
        this.destinationPath(package_dir + '/public/views/' + this.crud_name_lower + 's/create.html'), context
      );
      this.fs.copyTpl(
        this.templatePath('public/_public_view_edit.html'),
        this.destinationPath(package_dir + '/public/views/' + this.crud_name_lower + 's/edit.html'), context
      );
      this.fs.copyTpl(
        this.templatePath('public/_public_view_list.html'),
        this.destinationPath(package_dir + '/public/views/' + this.crud_name_lower + 's/list.html'), context
      );
      this.fs.copyTpl(
        this.templatePath('public/_public_view_view.html'),
        this.destinationPath(package_dir + '/public/views/' + this.crud_name_lower + 's/view.html'), context
      );
      this.fs.copyTpl(
        this.templatePath('server/_server_controller.js'),
        this.destinationPath(package_dir + '/server/controllers/' + this.crud_name_lower + 's.js'), context
      );
      this.fs.copyTpl(
        this.templatePath('server/_server_model.js'),
        this.destinationPath(package_dir + '/server/models/' + this.crud_name_lower + '.js'), context
      );
      this.fs.copyTpl(
        this.templatePath('server/_server_route.js'),
        this.destinationPath(package_dir + '/server/routes/' + this.crud_name_lower + 's.js'), context
      );
      this.fs.copyTpl(
        this.templatePath('server/_server_test.js'),
        this.destinationPath(package_dir + '/server/tests/' + this.crud_name_lower + 's.js'), context
      );
    }
  }
});
