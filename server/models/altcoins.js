// This stores all the altcoins whose rates will be pulled
let Altcoins = function(array) {
	this.altcoins = array;
}

Altcoins.prototype.getAltcoins = function() {
	return this.altcoins;
}

module.exports = Altcoins;
