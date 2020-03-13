import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

describe('test expense reducer', () => {
	test('should set default state', () => {
		const state = expensesReducer(undefined, { type: '@@INIT' });

		expect(state).toEqual([]);
	});

	test('should remove expense by id', () => {
		const action = {
			type: 'REMOVE_EXPENSE',
			expense: {
				id: expenses[1].id
			}
		};

		const state = expensesReducer(expenses, action);

		expect(state).toEqual([expenses[0], expenses[2]]);
	});

	test('should NOT remove expense with invalid id', () => {
		const action = {
			type: 'REMOVE_EXPENSE',
			expense: {
				id: 'shouldnotremove123'
			}
		};

		const state = expensesReducer(expenses, action);

		expect(state).toEqual(expenses);
	});

	test('should add an expense', () => {
		const action = {
			type: 'ADD_EXPENSE',
			expense: {
				description: 'an description of the expense',
				note: '',
				amount: 15000,
				createdAt: moment()
			}
		};

		const state = expensesReducer(expenses, action);

		expect(state).toEqual([...expenses, action.expense]);
	});

	test('should edit an expense', () => {
		const action = {
			type: 'EDIT_EXPENSE',
			id: expenses[0].id,
			updates: {
				note: 'teste note'
			}
		};

		const state = expensesReducer(expenses, action);

		expect(state[0].note).toEqual(action.updates.note);
	});

	test('should NOT edit expense with invalid id', () => {
		const action = {
			type: 'EDIT_EXPENSE',
			id: 'invalid id',
			updates: {
				note: 'teste note'
			}
		};

		const state = expensesReducer(expenses, action);

		expect(state).toEqual(expenses);
	});

	test('should set expenses', () => {
		const action = {
			type: 'SET_EXPENSES',
			expenses: [expenses[1]]
		};

		const state = expensesReducer(expenses, action);

		expect(state).toEqual([expenses[1]]);
	});
});
