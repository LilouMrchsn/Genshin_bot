function getTimestampAbysses() {
	const aujourd_hui = new Date();
	if(aujourd_hui.getDate() > 15){
		if(aujourd_hui.getMonth() === 11){
			var cycleSuivant = new Date(aujourd_hui.getFullYear() + 1, 0, 1, 4, 0, 0, 0);
		} else {
			var cycleSuivant = new Date(aujourd_hui.getFullYear(), aujourd_hui.getMonth() + 1, 1, 4, 0, 0, 0);
		}
	} else {
		var cycleSuivant = new Date(aujourd_hui.getFullYear(), aujourd_hui.getMonth(), 16, 4, 0, 0, 0);
	}

	return cycleSuivant;
}

module.exports = { getTimestampAbysses };