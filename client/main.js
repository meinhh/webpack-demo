import {AppComponent} from "./src/app/app.component";
import angular from 'angular';

angular.module('app', [])
	.component('app', AppComponent.factory());