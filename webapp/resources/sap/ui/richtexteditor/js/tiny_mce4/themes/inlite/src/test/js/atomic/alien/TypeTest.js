test('atomic/alien/TypeTest',['tinymce/inlite/alien/Type'],function(T){var t=function(){assert.eq(T.isString('a'),true);assert.eq(T.isString(null),false);assert.eq(T.isString(undefined),false);assert.eq(T.isString(true),false);assert.eq(T.isString(0),false);assert.eq(T.isString([]),false);assert.eq(T.isString({}),false);assert.eq(T.isString(function(){}),false);};var a=function(){assert.eq(T.isNumber('a'),false);assert.eq(T.isNumber(null),false);assert.eq(T.isNumber(undefined),false);assert.eq(T.isNumber(true),false);assert.eq(T.isNumber(0),true);assert.eq(T.isNumber([]),false);assert.eq(T.isNumber({}),false);assert.eq(T.isNumber(function(){}),false);};var b=function(){assert.eq(T.isBoolean('a'),false);assert.eq(T.isBoolean(null),false);assert.eq(T.isBoolean(undefined),false);assert.eq(T.isBoolean(true),true);assert.eq(T.isBoolean(0),false);assert.eq(T.isBoolean([]),false);assert.eq(T.isBoolean({}),false);assert.eq(T.isBoolean(function(){}),false);};var c=function(){assert.eq(T.isObject('a'),false);assert.eq(T.isObject(null),false);assert.eq(T.isObject(undefined),false);assert.eq(T.isObject(true),false);assert.eq(T.isObject(0),false);assert.eq(T.isObject([]),false);assert.eq(T.isObject({}),true);assert.eq(T.isObject(function(){}),false);};var d=function(){assert.eq(T.isNull('a'),false);assert.eq(T.isNull(null),true);assert.eq(T.isNull(undefined),false);assert.eq(T.isNull(true),false);assert.eq(T.isNull(0),false);assert.eq(T.isNull([]),false);assert.eq(T.isNull({}),false);assert.eq(T.isNull(function(){}),false);};var e=function(){assert.eq(T.isArray('a'),false);assert.eq(T.isArray(null),false);assert.eq(T.isArray(undefined),false);assert.eq(T.isArray(true),false);assert.eq(T.isArray(0),false);assert.eq(T.isArray([]),true);assert.eq(T.isArray({}),false);assert.eq(T.isArray(function(){}),false);};var f=function(){assert.eq(T.isFunction('a'),false);assert.eq(T.isFunction(null),false);assert.eq(T.isFunction(undefined),false);assert.eq(T.isFunction(true),false);assert.eq(T.isFunction(0),false);assert.eq(T.isFunction([]),false);assert.eq(T.isFunction({}),false);assert.eq(T.isFunction(function(){}),true);};t();a();b();c();d();e();f();});