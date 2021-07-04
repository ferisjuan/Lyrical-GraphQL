import React, {Component} from "react";
import {Link} from "react-router";
import {graphql} from "react-apollo";

import fetchSong from "../queries/fetchSong";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component {
    render() {
        if (this.props.data.loading) return <div>Loading...</div>;

        const {song} = this.props.data;

        return (
            <section>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricList />
                <LyricCreate songId={this.props.params.id} />
            </section>
        );
    }
}

export default graphql(fetchSong, {
    options: props => {
        return {
            variables: {
                id: props.params.id
            }
        };
    }
})(SongDetail);
