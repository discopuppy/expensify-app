import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import firebase, { displayName } from 'firebase';

const Header = ({ startLogout }) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard">
                    <h1>Expensify</h1>
                </Link>
                <div>
                    <span className="button">{firebase.auth().currentUser.displayName.split(" ")[0]}</span>
                    {/*<span>{user.displayName}</span>
                    {/* <span>{firebase.user && firebase.user(dispayName)}</span> */}
                </div>
                <button className="button button--link"onClick={startLogout}>Logout</button>
            </div>
        </div>
    </header>
    );

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);