import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', function() {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});