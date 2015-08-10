'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('meaniocrud:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({ package_name: 'mypkg', crud_name: 'item' })
      .on('end', done);
  });

  it('creates files', function () {
    var package_dir = ''
    assert.file([
      package_dir + 'packages/custom/mypkg/public/controllers/items.js',
      package_dir + 'packages/custom/mypkg/public/routes/items.js',
      package_dir + 'packages/custom/mypkg/public/services/items.js',
      package_dir + 'packages/custom/mypkg/public/tests/items.spec.js',
      package_dir + 'packages/custom/mypkg/public/views/items/create.html',
      package_dir + 'packages/custom/mypkg/public/views/items/edit.html',
      package_dir + 'packages/custom/mypkg/public/views/items/list.html',
      package_dir + 'packages/custom/mypkg/public/views/items/view.html',
      package_dir + 'packages/custom/mypkg/server/controllers/items.js',
      package_dir + 'packages/custom/mypkg/server/models/item.js',
      package_dir + 'packages/custom/mypkg/server/routes/items.js',
      package_dir + 'packages/custom/mypkg/server/tests/items.js'
    ]);
  });
});
