import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

describe('<ExpenseForm />', () => {
	test('should render ExpenseForm correctly', () => {
		const wrapper = shallow(<ExpenseForm />);
		expect(wrapper).toMatchSnapshot();
	});

	test('should render ExpenseForm with data', () => {
		const wrapper = shallow(<ExpenseForm expense={expenses[2]} />);
		expect(wrapper).toMatchSnapshot();
	});

	test('should handle error for invalid form submission', () => {
		const wrapper = shallow(<ExpenseForm />);

		expect(wrapper).toMatchSnapshot();

		wrapper.find('form').simulate('submit', {
			preventDefault: () => {}
		});

		expect(wrapper.state('error').length).toBeGreaterThan(0);

		expect(wrapper).toMatchSnapshot();
	});

	test('should set description on input change', () => {
		const value = 'test description';
		const wrapper = shallow(<ExpenseForm />);
		wrapper
			.find('input')
			.at(0)
			.simulate('change', {
				target: { value }
			});
		expect(wrapper.state('description')).toBe(value);
	});

	test('should set note state on textarea change', () => {
		const value = 'this is just a note';
		const wrapper = shallow(<ExpenseForm />);

		wrapper.find('textarea').simulate('change', {
			target: { value }
		});

		expect(wrapper.state('note')).toBe(value);
	});

	test('should set amount to value', () => {
		const value = '23.50';
		const wrapper = shallow(<ExpenseForm />);

		wrapper
			.find('input')
			.at(1)
			.simulate('change', {
				target: { value }
			});

		expect(wrapper.state('amount')).toBe(value);
	});

	test('should NOT set amount to incorrect input', () => {
		const value = '12.122';
		const wrapper = shallow(<ExpenseForm />);

		wrapper
			.find('input')
			.at(1)
			.simulate('change', {
				target: { value }
			});

		expect(wrapper.state('amount')).not.toBe(value);
	});

	test('should call onSubmit prop for valid form submission', () => {
		const onSubmitSpy = jest.fn();

		const wrapper = shallow(
			<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
		);

		wrapper.find('form').simulate('submit', {
			preventDefault: () => {}
		});

		expect(wrapper.state('error')).toBe('');
		expect(onSubmitSpy).toHaveBeenLastCalledWith({
			description: expenses[0].description,
			amount: expenses[0].amount,
			note: expenses[0].note,
			createdAt: expenses[0].createdAt
		});
	});

	test('should set new date on date change', () => {
		const wrapper = shallow(<ExpenseForm />);

		const now = moment();

		wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
		expect(wrapper.state('createdAt')).toEqual(now);
	});

	test('should set focus props', () => {
		const wrapper = shallow(<ExpenseForm />);

		expect(wrapper.state('calendarFocused')).toBeFalsy();

		wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({
			focused: true
		});

		expect(wrapper.state('calendarFocused')).toBeTruthy();
	});
});
