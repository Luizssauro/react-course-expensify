import moment from 'moment';

export default [
	{
		id: '1',
		description: 'Gum',
		note: '',
		amount: 195,
		createdAt: 0
	},
	{
		id: '2',
		description: 'Rent',
		note: '',
		amount: 546000,
		createdAt: moment(0)
			.subtract(4, 'days')
			.valueOf()
	},
	{
		id: '3',
		description: 'water',
		note: '',
		amount: 0,
		createdAt: moment(0)
			.add(4, 'days')
			.valueOf()
	}
];
