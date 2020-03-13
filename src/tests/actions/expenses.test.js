import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	addExpense,
	editExpense,
	removeExpense,
	startAddExpense,
	setExpenses,
	startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
	const expensesData = {};
	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expensesData[id] = { description, note, amount, createdAt };
	});
	database
		.ref('expenses')
		.set(expensesData)
		.then(() => {
			done();
		});
});

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
		const obj = addExpense(expenses[2]);

		expect(obj).toEqual({
			type: 'ADD_EXPENSE',
			expense: expenses[2]
		});
	});

	test('should add expense to database and store', done => {
		const store = createMockStore({});

		const expenseData = {
			description: 'Mouse',
			amount: 3000,
			note: '',
			createdAt: 100000
		};

		store.dispatch(startAddExpense(expenseData)).then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: 'ADD_EXPENSE',
				expense: {
					id: expect.any(String),
					...expenseData
				}
			});

			return database
				.ref(`expenses/${actions[0].expense.id}`)
				.once('value')
				.then(snapshot => {
					expect(snapshot.val()).toEqual(expenseData);

					done();
				});
		});
	});

	test('should add expense with defaults to database and store', done => {
		const store = createMockStore({});

		const expenseData = {
			description: '',
			amount: 0,
			note: '',
			createdAt: 0
		};

		store.dispatch(startAddExpense({})).then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: 'ADD_EXPENSE',
				expense: {
					id: expect.any(String),
					...expenseData
				}
			});

			return database
				.ref(`expenses/${actions[0].expense.id}`)
				.once('value')
				.then(snapshot => {
					expect(snapshot.val()).toEqual(expenseData);

					done();
				});
		});
	});
	test('should setup setexpense', () => {
		const action = setExpenses(expenses);

		expect(action).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
	});

	test('should fetch expenses from firebase', done => {
		const store = createMockStore({});

		store.dispatch(startSetExpenses()).then(() => {
			const actions = store.getActions();

			expect(actions[0]).toEqual({
				type: 'SET_EXPENSES',
				expenses
			});
			done();
		});
	});
});
