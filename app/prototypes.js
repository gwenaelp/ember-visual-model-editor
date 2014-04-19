Array.prototype.contains = function(elem)
{
	for (var i in this)
	{
		if (this[i] == elem) return true;
	}
	return false;
};
