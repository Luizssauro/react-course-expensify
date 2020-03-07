import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

describe('ExpensesTotal selector', () => {
	test('should return de sum for all expenses', () => {
		const sum = selectExpensesTotal(expenses);

		expect(sum).toBe(546195);
	});

	test('should return correct value if only 1 expense exist', () => {
		const sum = selectExpensesTotal([expenses[0]]);

		expect(sum).toBe(195);
	});

	test('should return 0 without expenses', () => {
		const sum = selectExpensesTotal();

		expect(sum).toBe(0);
	});
});
