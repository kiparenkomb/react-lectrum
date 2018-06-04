// Feed.js

// Core
import React, { Component } from 'react';

// Components
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';

// Instruments
import Styles from './styles.m.css';

export default class Feed extends Component {
    state = {
        posts: [
            { id: '4rg3', comment: 'Hi there!', created: 1526825076849 },
            { id: '3ek3', comment: 'Hello! 👋', created: 1526825076949 }
        ],
        isPostFetching: false,
    };
    render () {
        const { posts, isPostFetching } = this.state;

        const postsJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } />;
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostFetching } />
                <StatusBar />
                <Composer />
                {postsJSX}
            </section>
        );
    }
}
