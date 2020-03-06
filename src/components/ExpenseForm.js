import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';

export default class ExpenseForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			description: props.expense ? props.expense.description : '',
			note: props.expense ? props.expense.note : '',
			amount: props.expense ? (props.expense.amount / 100).toString() : '',
			createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
			calendarFocused: false,
			error: ''
		};
	}
	onDescriptionChange = e => {
		const description = e.target.value;
		this.setState(() => ({
			description
		}));
	};
	onNoteChange = e => {
		const note = e.target.value;
		this.setState(() => ({
			note
		}));
	};
	onAmountChange = e => {
		const amount = e.target.value;
		const regexMatch = /^\d{1,}(\.\d{0,2})?$/; //only numbers with optional decimal with 2 digits

		if (!amount || amount.match(regexMatch)) {
			this.setState(() => ({
				amount
			}));
		}
	};
	onDateChange = createdAt => {
		if (createdAt) {
			this.setState(() => ({
				createdAt
			}));
		}
	};
	onFocusChange = ({ focused }) => {
		this.setState(() => ({
			calendarFocused: focused
		}));
	};
	onSubmit = e => {
		e.preventDefault();

		if (!this.state.description || !this.state.amount) {
			this.setState(() => ({
				error: 'Please provide description and amount.'
			}));
		} else {
			this.setState(() => ({
				error: ''
			}));
			this.props.onSubmit({
				description: this.state.description,
				amount: parseFloat(this.state.amount, 10) * 100,
				createdAt: this.state.createdAt.valueOf(),
				note: this.state.note
			});
		}
	};
	render() {
		return (
			<div>
				{this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.onSubmit}>
					<input
						type='text'
						autoFocus
						placeholder='Description'
						value={this.state.description}
						onChange={this.onDescriptionChange}
					/>
					<input
						type='text'
						placeholder='amount'
						value={this.state.amount}
						onChange={this.onAmountChange}
					/>
					<SingleDatePicker
						date={this.state.createdAt}
						onDateChange={this.onDateChange}
						focused={this.state.calendarFocused}
						onFocusChange={this.onFocusChange}
						id='date-picker'
						numberOfMonths={1}
						isOutsideRange={day => {
							false;
						}}
					/>
					<textarea
						placeholder='Add a note for you expense (optional)'
						value={this.state.note}
						onChange={this.onNoteChange}></textarea>
					<button>{this.props.expense ? 'Edit' : 'Add'} expense</button>
				</form>
			</div>
		);
	}
}
