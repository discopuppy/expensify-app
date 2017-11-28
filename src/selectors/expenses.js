import moment from 'moment';

// Get visible expenses

// This is only used when filtering which expenses you want to see

// This is not deleting expenses from a database, only choosing which ones
// to show when user wants to search a range of dates

// Can definitely use in EventPoster

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => { // filters out the ones that return true below
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true ;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true ;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        // match the description
        // .include() matches whatever is passed in
        // using .toLowerCase on description and the text filter makes sure to 
        // de-case-sensitive the search so if something is upper case it will still match

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if (sortBy === 'date') { // if sortBy is set on the 'date' filter
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

export default getVisibleExpenses;