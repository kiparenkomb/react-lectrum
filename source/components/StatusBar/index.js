// StatusBar.js

// Core
import React, { Component } from 'react';

// Instruments
import avatar from 'theme/assets/lisa';
import Styles from './styles.m.css';

export default class StatusBar extends Component {
    render () {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;


        return (
            <section className = { Styles.statusBar }>
                <button>
                    <img src = { avatar } />
                    <span>{`${currentUserFirstName}`}</span>
                    &nbsp;
                    <span>{`${currentUserLastName}`}</span>
                </button>
            </section>
        );
    }
}
