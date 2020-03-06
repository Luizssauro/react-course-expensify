import React from 'react';
import { shallow } from 'enzyme';
import { EditExpense } from '../../components/EditExpense';
import expenses from '../fixtures/expenses';

describe('<EditExpenses />', () => {
	let editExpense, removeExpense, history, wrapper;

	beforeEach(() => {
		editExpense = jest.fn();
		removeExpense = jest.fn();
		history = { push: jest.fn() };
		wrapper = shallow(
			<EditExpense
				editExpense={editExpense}
				removeExpense={removeExpense}
				history={history}
				expense={expenses[1]}
			/>
		);
	});

	test('Should render EditExpense correctly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('Should handle editExpense', () => {
		wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);

		expect(editExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);

		expect(history.push).toHaveBeenLastCalledWith('/');
	});

	test('Should handle removeExpense', () => {
		wrapper.find('button').simulate('click');

		expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[1].id });

		expect(history.push).toHaveBeenLastCalledWith('/');
	});
});
