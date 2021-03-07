export const getDateStamp = (selDate) => {
	//accepts a date in the .toLocaleDateString() format

	let startDate = selDate.split('/');
	let newDate = new Date(startDate[2], startDate[0] - 1, startDate[1]);
	let dateTimestamp = newDate.getTime();

	return dateTimestamp;
};
