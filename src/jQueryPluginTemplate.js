/*
--------------------------------
jQuery Plugin Template
--------------------------------
+ https://github.com/sendlo/jQueryPluginTemplate
+ version 0.1
+ Copyright 2013 Mike Sendlakowski
+ Licensed under the MIT license

* Adopted jQuery plugin structure from Paul Irish: https://github.com/paulirish/

*/

(function (window, $, undefined) {
	"use strict";

	$.mytemplate = function mytemplate(options, callback, element) {
		this.element = $(element);

		// Flag the object in the event of a failed creation
		if (!this._create(options, callback)) {
			this.failed = true;
		}
	};

	$.mytemplate.defaults = {

	};

	$.mytemplate.prototype = {

		/*	
		----------------------------
		Private methods
		----------------------------
		*/

		_create: function(){
			return true;
		},

		_update: function(){
			return true;
		},


		/*	
		----------------------------
		Public methods
		----------------------------
		*/

		publicMeth: function() {

		}
	};


	/*	
	----------------------------
	Function
	----------------------------
	*/

	$.fn.mytemplate = function init(options, callback) {

		var thisCall = typeof options;

		switch (thisCall) {

		    // allow users to call a specific public method 
			case 'string':
				var args = Array.prototype.slice.call(arguments, 1);
				try{
					this.each(function () {
						var instance = $.data(this, 'mytemplate');
						if (!instance) {
							throw 'Method ' + options + ' cannot be called until mytemplate is setup';
						}
						if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
							throw 'No such public method ' + options + ' for mytemplate';
						}
						// no errors!
						instance[options].apply(instance, args);
					});
				} catch(err){
					if(window.console){
						console.log(err);
					}
					return false;
				}
			break;

			// attempt to create
			case 'undefined':
			case 'object':
				this.each(function () {
					var instance = $.data(this, 'mytemplate');
					if (instance) {
						// update options of current instance
						instance.update(options);
					} else {
						// initialize new instance
						instance = new $.mytemplate(options, callback, this);
						// don't attach if instantiation failed
						if (!instance.failed) {
							$.data(this, 'mytemplate', instance);
						}
					}
				});
			break;
		}
		return this;
	};

})(window, jQuery);
