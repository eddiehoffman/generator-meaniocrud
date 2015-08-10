/* jshint -W079 */
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';

/**
 * Module dependencies.
 */
var expect = require('expect.js'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  <%= crud_name_upper %> = mongoose.model('<%= crud_name_upper %>');

/**
 * Globals
 */
var user;
var <%= crud_name_lower %>;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model <%= crud_name_upper %>:', function() {
    beforeEach(function(done) {
      this.timeout(10000);
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });
      user.save(function() {
        <%= crud_name_lower %> = new <%= crud_name_upper %>({
          title: '<%= crud_name_upper %> Title',
          content: '<%= crud_name_upper %> Content',
          user: user
        });
        done();
      });


    });
    describe('Method Save', function() {

      it('should be able to save without problems', function(done) {
        this.timeout(10000);

        return <%= crud_name_lower %>.save(function(err, data) {
          expect(err).to.be(null);
          expect(data.title).to.equal('<%= crud_name_upper %> Title');
          expect(data.content).to.equal('<%= crud_name_upper %> Content');
          expect(data.user.length).to.not.equal(0);
          expect(data.created.length).to.not.equal(0);
          done();
        });

      });

      it('should be able to show an error when try to save without title', function(done) {
        this.timeout(10000);
        <%= crud_name_lower %>.title = '';

        return <%= crud_name_lower %>.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        this.timeout(10000);
        <%= crud_name_lower %>.content = '';

        return <%= crud_name_lower %>.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        this.timeout(10000);
        <%= crud_name_lower %>.user = {};

        return <%= crud_name_lower %>.save(function(err) {
          expect(err).to.not.be(null);
          done();
        });
      });

    });

    afterEach(function(done) {
      this.timeout(10000);
      <%= crud_name_lower %>.remove(function() {
        user.remove(done);
      });
    });
  });
});
