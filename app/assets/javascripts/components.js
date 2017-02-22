require( 'babel-polyfill' );

global.Invention = require( 'components/_invention.js.jsx' ).default;
console.log(global.Invention)
global.InventionList = require( 'components/_invention_list.js.jsx' ).default;
global.InventionForm = require( 'components/_invention_form.js.jsx' ).default;
global.InventionBox = require( 'components/_invention_box.js.jsx' ).default;
