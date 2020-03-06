import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import moment from 'moment';

describe('<ExpenseListFilters />', () => {
	let setTextFilter,
		sortByDate,
		sortByAmount,
		setStartDate,
		setEndDate,
		wrapper;

	beforeEach(() => {
		setTextFilter = jest.fn();
		sortByDate = jest.fn();
		sortByAmount = jest.fn();
		setStartDate = jest.fn();
		setEndDate = jest.fn();

		wrapper = shallow(
			<ExpenseListFilters
				filters={filters}
				setTextFilter={setTextFilter}
				sortByAmount={sortByAmount}
				sortByDate={sortByDate}
				setStartDate={setStartDate}
				setEndDate={setEndDate}
			/>
		);
	});

	test('should render component', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('should render component with alt data', () => {
		wrapper.setProps({
			filters: altFilters
		});

		expect(wrapper).toMatchSnapshot();
	});

	test('should handle text change', () => {
		const value = 'new text';
		wrapper.find('input').simulate('change', { target: { value } });

		expect(setTextFilter).toHaveBeenLastCalledWith(value);
	});

	test('should sort by date', () => {
		const value = 'date';

		wrapper.setProps({
			filters: altFilters
		});

		wrapper.find('select').simulate('change', { target: { value } });

		expect(sortByDate).toHaveBeenCalled();
	});

	test('should sort by amount', () => {
		const value = 'amount';
		wrapper.find('select').prop('onChange')({ target: { value } });

		expect(sortByAmount).toHaveBeenCalled();
	});

	test('should handle date changes', () => {
		const startDate = moment();
		const endDate = moment().add(1, 'day');

		wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({
			startDate,
			endDate
		});

		expect(setStartDate).toHaveBeenLastCalledWith(startDate);

		expect(setEndDate).toHaveBeenLastCalledWith(endDate);
	});

	test('should handle date focus changes', () => {
		const calendarFocused = 'startDate';

		wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(
			calendarFocused
		);

		expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
	});
});
