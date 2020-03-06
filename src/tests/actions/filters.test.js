import {
	setStartDate,
	setEndDate,
	setTextFilter,
	sortByAmount,
	sortByDate
} from '../../actions/filters';
import moment from 'moment';

describe('Tests on filters actions', () => {
	test('Should set the start date', () => {
		const obj = setStartDate(moment(0));

		expect(obj).toEqual({
			type: 'SET_START_DATE',
			startDate: moment(0)
		});
	});

	test('Should set the end date', () => {
		const obj = setEndDate(moment(0));

		expect(obj).toEqual({
			type: 'SET_END_DATE',
			endDate: moment(0)
		});
	});

	test('Should set text filter with value', () => {
		const text = 'testeFilter';
		const obj = setTextFilter(text);

		expect(obj).toEqual({
			type: 'SET_TEXT_FILTER',
			text
		});
	});

	test('Should set text filter with default value', () => {
		const obj = setTextFilter();

		expect(obj).toEqual({
			type: 'SET_TEXT_FILTER',
			text: ''
		});
	});

	test('Should sort by date', () => {
		expect(sortByDate()).toEqual({
			type: 'SORT_BY_DATE'
		});
	});

	test('Should sort by amount', () => {
		expect(sortByAmount()).toEqual({
			type: 'SORT_BY_AMOUNT'
		});
	});
});
