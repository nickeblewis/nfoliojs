'use strict';

describe('Routes test', function() {
	beforeEach(module('farnboroughyoApp'));

	var location, route, rootScope;

	beforeEach(inject(function( _$location_, _$route_, _$rootScope_ ) {
		location = _$location_;
		route = _$route_;
		rootScope = _$rootScope_;
	}));


	// Routes

	// No specific route (otherwise)
	describe('Otherwise route', function() {
		beforeEach(inject(function($httpBackend) {
			$httpBackend.expectGET('views/main.html')
				.respond(200);
		}));

		it('should load the main controller on successful load of /', function() {
			location.path('/');
			rootScope.$digest();
			expect(route.current.controller).toBe('MainCtrl');
		});

		it('should load the main controller if passing through a non-matching route', function() {
			location.path('/foobar');
			rootScope.$digest();
			expect(route.current.controller).toBe('MainCtrl');
		});
	});

	describe('show place via id route', function() {
		beforeEach(inject(
			function($httpBackend) {
				$httpBackend.expectGET('views/show.html')
				.respond(200);
			}));

		it('should load the show page on successful load of /show/1', function() {
				location.path('/show/1');
				rootScope.$digest();
				expect(route.current.controller).toBe('EditCtrl');
			});
	});

	describe('edit place via id route', function() {
		beforeEach(inject(
			function($httpBackend) {
				$httpBackend.expectGET('views/show.html')
				.respond(200);
			}));

		it('should load the edit controller on successful load of /edit/1', function() {
				location.path('/edit/1');
				rootScope.$digest();
				expect(route.current.controller).toBe('EditCtrl');
			});
	});

	describe('Create route', function() {
		beforeEach(inject(
			function($httpBackend) {
				$httpBackend.expectGET('views/create.html')
				.respond(200);
			}));

		it('should load the create controller on successful load of /create', function() {
				location.path('/create');
				rootScope.$digest();
				expect(route.current.controller).toBe('CreateCtrl');
			});
	});
});