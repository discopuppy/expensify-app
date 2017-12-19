// authReducer

export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid // when dispatch login, must pass uid along
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};