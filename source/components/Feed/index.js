// Core
import React, { Component } from 'react';

// Instruments
import Composer from 'components/Composer';
import Post from 'components/Post';

export default class Feed extends Component {
    render () {
        return (
            <section>
                <Composer />
                <Post />
            </section>
        );
    }
}