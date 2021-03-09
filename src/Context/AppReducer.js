export default (state, action) => {
	switch (action.type) {
		case 'SET_USER':
			return { ...state, user: action.payload };
		case 'SET_LEFT':
			return { ...state, leftTime: action.payload };
		case 'SET_RIGHT':
			return { ...state, rightTime: action.payload };
		default:
			return state;
	}
};
