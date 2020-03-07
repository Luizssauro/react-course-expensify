import React from 'react';
import { shallow } from 'enzyme';
import numeral from 'numeral';
import { ExpenseSummary } from '../../components/ExpenseSummary';
import expenses from '../fixtures/expenses';

describe('<ExpenseListItem />', () => {
	test('should render ExpenseSummary whithout expenses', () => {
		const wrapper = shallow(<ExpenseSummary />);
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('p').text()).toMatch('There is no expenses yet!');
	});

	test('should render ExpenseSummary whith expenses', () => {
		const wrapper = shallow(
			<ExpenseSummary expenseCount={5} expensesTotal={5142563} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	test('should render ExpenseSummary whith only one expense', () => {
		const wrapper = shallow(
			<ExpenseSummary expenseCount={1} expensesTotal={3333} />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
