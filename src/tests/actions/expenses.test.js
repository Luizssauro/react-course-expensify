import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

describe('Tests on expense actions', () => {
	test('Should setup remove expense action object', () => {
		const obj = removeExpense({ id: 'teste123' });

		expect(obj).toEqual({
			type: 'REMOVE_EXPENSE',
			expense: { id: 'teste123' }
		});
	});

	test('Should generate an expense edit obj', () => {
		const obj = editExpense({ id: 'teste123', updates: { amount: 100 } });

		expect(obj).toEqual({
			type: 'EDIT_EXPENSE',
			id: 'teste123',
			updates: {
				amount: 100
			}
		});
	});

	test('Should create a expense obj', () => {
		const expenseData = {
			description: 'teste expense',
			note: 'some note',
			amount: 500,
			createdAt: 6498451981
		};

		const obj = addExpense(expenseData);

		expect(obj).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				...expenseData,
				id: expect.any(String)
			}
		});
	});

	test('Should create expense with default values', () => {
		const obj = addExpense({});

		expect(obj).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				description: '',
				note: '',
				amount: 0,
				createdAt: 0
			}
		});
	});
});
