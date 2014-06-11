'use strict';

angular.module('nfolio')
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
  })
  .value('fbURL', 'https://nfolio.firebaseio.com/photos/')
  .value('fbPhotosURL', 'https://nfolio.firebaseio.com/photos/')
  .value('fbMessagesURL', 'https://nfolio.firebaseio.com/messages/')
  .value('fbProfilesURL', 'https://nfolio.firebaseio.com/profiles/');
