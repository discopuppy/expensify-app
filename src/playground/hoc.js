import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => {
    return (
        <div>
            <h1>Info</h1>
            <p>The info is: {props.info}</p>
        </div>
    );
};

const withAdminWarning = (WrappedComponent) => {
    return (props) => { // returning the HOC
        return (
            <div>
                {props.isAdmin && <p>This is private info. Please don't share!</p>}
                <WrappedComponent {...props} />
            </div>
        );
    };
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => { // returning the HOC
        return (
            <div>
            {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Not authenticated</p>}
            </div>
        );
    };
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={false} info="These are the details" />, document.getElementById('app'));