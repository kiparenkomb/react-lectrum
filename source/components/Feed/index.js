// Feed.js

// Core
import React, { Component } from 'react';
import moment from 'moment';

// Components
import { withProfile } from 'components/HOC/withProfile';
import Catcher from 'components/Catcher';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from 'instruments';
import { api } from 'config/api';

@withProfile
export default class Feed extends Component {
    state = {
        posts:          [],
        isPostFetching: false,
    };

    componentDidMount () {
        this._fetchPost();
    }

    _setPostFetchingState = (state) => {
        this.setState({
            isPostFetching: state,
        });
    };

    _fetchPost = async () => {
        this._setPostFetchingState(true);

        const reponse = await fetch(api, {
            method: 'Get',
        });

        const { data: posts } = await reponse.json();

        console.log('_____ fetch posts', posts);

        this.setState({
            posts,
            isPostFetching: false,
        });
    };

    _createPost = async (comment) => {
        this._setPostFetchingState(true);

        const post = {
            id:      getUniqueID(),
            created: moment().utc().unix(),
            comment,
            likes:   [],
        };

        await delay(1200);

        this.setState(({ posts }) => ({
            posts:          [post, ...posts],
            isPostFetching: false,
        }));
    }

    _likePost = async (id) => {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._setPostFetchingState(true);

        await delay(1200);

        const newPosts = this.state.posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        }
                    ],
                };
            }

            return post;
        });

        this.setState({
            posts:          newPosts,
            isPostFetching: false,
        });
    }

    _removePost = async (id) => {
        this._setPostFetchingState(true);

        await delay(1200);

        this.setState(({ posts }) => ({
            posts:          posts.filter((post) => post.id !== id),
            isPostFetching: false,
        }));
    }

    render () {
        const { posts, isPostFetching } = this.state;

        console.log('_____ this.state', this.state);

        const postsJSX = posts.map((post) => {
            return (
                <Catcher key = { post.id }>
                    <Post
                        { ...post }
                        _likePost = { this._likePost }
                        _removePost = { this._removePost }
                    />
                </Catcher>
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostFetching } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                {postsJSX}
            </section>
        );
    }
}
