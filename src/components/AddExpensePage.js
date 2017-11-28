import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

const AddExpensePage = (props) => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm 
            onSubmit={(expense) => {
                props.dispatch(addExpense(expense));
                props.history.push('/'); // switches us to the dashboard page
                                        // without a full page refresh
                                        // Crucial for EventsPoster
            }}
        />
    </div>
);

export default connect()(AddExpensePage);