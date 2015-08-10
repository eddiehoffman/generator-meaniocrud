'use strict';

(function() {
  describe('Test test case', function() {
    it('1 should be equals to 1', function() {
      expect(1).toBe(1);
    });
  });

  // <%= crud_name_upper %>s Controller Spec
  /*describe('MEAN controllers', function() {
    describe('<%= crud_name_upper %>sController', function() {
      // The $resource service augments the response object with methods for updating and deleting the resource.
      // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
      // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
      // When the toEqualData matcher compares two objects, it takes only object properties into
      // account and ignores methods.
      beforeEach(function() {
        jasmine.addMatchers({
          toEqualData: function() {
            return {
              compare: function(actual, expected) {
                return {
                  pass: angular.equals(actual, expected)
                };
              }
            };
          }
        });
      });

      beforeEach(function() {
        module('mean');
        module('mean.system');
        module('mean.<%= crud_name_lower %>s');
      });

      // Initialize the controller and a mock scope
      var <%= crud_name_upper %>sController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        <%= crud_name_upper %>sController = $controller('<%= crud_name_upper %>sController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one <%= crud_name_lower %> object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('api\/<%= crud_name_lower %>s').respond([{
            title: 'An <%= crud_name_upper %> about MEAN',
            content: 'MEAN rocks!'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.<%= crud_name_lower %>s).toEqualData([{
            title: 'An <%= crud_name_upper %> about MEAN',
            content: 'MEAN rocks!'
          }]);

        });

      it('$scope.findOne() should create an array with one <%= crud_name_lower %> object fetched ' +
        'from XHR using a <%= crud_name_lower %>Id URL parameter', function() {
          // fixture URL parament
          $stateParams.<%= crud_name_lower %>Id = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var test<%= crud_name_upper %>Data = function() {
            return {
              title: 'An <%= crud_name_upper %> about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/api\/<%= crud_name_lower %>s\/([0-9a-fA-F]{24})$/).respond(test<%= crud_name_upper %>Data());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.<%= crud_name_lower %>).toEqualData(test<%= crud_name_upper %>Data());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var post<%= crud_name_upper %>Data = function() {
            return {
              title: 'An <%= crud_name_upper %> about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture expected response data
          var response<%= crud_name_upper %>Data = function() {
            return {
              _id: '525cf20451979dea2c000001',
              title: 'An <%= crud_name_upper %> about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture mock form input values
          scope.title = 'An <%= crud_name_upper %> about MEAN';
          scope.content = 'MEAN rocks!';

          // test post request is sent
          $httpBackend.expectPOST('api\/<%= crud_name_lower %>s', post<%= crud_name_upper %>Data()).respond(response<%= crud_name_upper %>Data());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.title).toEqual('');
          expect(scope.content).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/<%= crud_name_lower %>s/' + response<%= crud_name_upper %>Data()._id);
        });

      it('$scope.update(true) should update a valid <%= crud_name_lower %>', inject(function(<%= crud_name_upper %>s) {

        // fixture rideshare
        var put<%= crud_name_upper %>Data = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An <%= crud_name_upper %> about MEAN',
            to: 'MEAN is great!'
          };
        };

        // mock <%= crud_name_lower %> object from form
        var <%= crud_name_lower %> = new <%= crud_name_upper %>s(put<%= crud_name_upper %>Data());

        // mock <%= crud_name_lower %> in scope
        scope.<%= crud_name_lower %> = <%= crud_name_lower %>;

        // test PUT happens correctly
        $httpBackend.expectPUT(/api\/<%= crud_name_lower %>s\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/<%= crud_name_lower %>s\/([0-9a-fA-F]{24})$/, put<%= crud_name_upper %>Data()).respond();
        [>
                Error: Expected PUT /<%= crud_name_lower %>s\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An <%= crud_name_upper %> about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An <%= crud_name_upper %> about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                <]

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/<%= crud_name_lower %>s/' + put<%= crud_name_upper %>Data()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid <%= crud_name_lower %>Id ' +
        'and remove the <%= crud_name_lower %> from the scope', inject(function(<%= crud_name_upper %>s) {

          // fixture rideshare
          var <%= crud_name_lower %> = new <%= crud_name_upper %>s({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.<%= crud_name_lower %>s = [];
          scope.<%= crud_name_lower %>s.push(<%= crud_name_lower %>);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/api\/<%= crud_name_lower %>s\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(<%= crud_name_lower %>);
          $httpBackend.flush();

          // test after successful delete URL location <%= crud_name_lower %>s list
          //expect($location.path()).toBe('/<%= crud_name_lower %>s');
          expect(scope.<%= crud_name_lower %>s.length).toBe(0);

        }));
    });
  });*/
}());
