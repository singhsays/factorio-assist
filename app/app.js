import 'static/css/main.css!'

import angular from 'angular';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';
 
import { MainController } from './controllers';

angular.module('myApp', [
    'ngMaterial'
]).controller('mainCtrl', MainController);