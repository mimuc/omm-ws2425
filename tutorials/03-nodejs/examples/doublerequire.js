// lib.js 
function double(x) {
	return x * 2;
}

module.exports = {
	double: double,
};


// main.js
const double = require('lib').double;
console.log(double(2));