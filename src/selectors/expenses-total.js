export default (expenses = []) =>
	expenses.reduce((sum, expense) => sum + expense.amount, 0);
