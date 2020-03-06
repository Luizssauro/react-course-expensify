import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ExpenseDashboard from '../components/Dashboard';
import AddExpensePage from '../components/AddExpensePage';
import EditExpense from '../components/EditExpense';
import Help from '../components/Help';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';

const AppRouter = () => (
	<BrowserRouter>
		<div>
			<Header />
			<Switch>
				<Route path='/' exact={true} component={ExpenseDashboard} />
				<Route path='/create' component={AddExpensePage} />
				<Route path='/edit/:id' component={EditExpense} />
				<Route path='/help' component={Help} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</BrowserRouter>
);

export default AppRouter;
