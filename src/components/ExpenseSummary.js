import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpenseSummary = ({ expenseCount = 0, expensesTotal = 0 }) => {
	const expenseWord = expenseCount > 1 ? 'expenses' : 'expense';
	return (
		<div>
			<p>
				{expenseCount === 0
					? 'There is no expenses yet!'
					: `Viewing ${expenseCount} ${expenseWord} totalling ${numeral(
							expensesTotal / 100
					  ).format('$0,0.00')}`}
			</p>
		</div>
	);
};

const mapStateToProps = state => {
	const visibleExpenses = selectExpenses(state.expenses, state.filters);

	return {
		expenseCount: visibleExpenses.length,
		expensesTotal: selectExpensesTotal(visibleExpenses)
	};
};

export default connect(mapStateToProps)(ExpenseSummary);
