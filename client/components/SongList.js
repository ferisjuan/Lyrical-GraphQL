import React, {Component} from "react";
import {Link} from "react-router";
import {graphql} from "react-apollo";

import deleteSong from "../queries/deleteSong";
import fetchSongs from "../queries/fetchSongs";

class SongList extends Component {
    onSongDelete(id) {
        this.props
            .mutate({
                variables: {
                    id
                }
            })
            .then(() => this.props.data.refetch());
    }

    renderSongs() {
        return this.props.data.songs.map(({id, title}) => (
            <li key={id} className="collection-item">
                {title}
                <i
                    className="material-icons"
                    onClick={() => this.onSongDelete(id)}
                >
                    delete
                </i>
            </li>
        ));
    }

    render() {
        if (this.props.data.loading) {
            return <div>Loading...</div>;
        }

        return (
            <section>
                <ul className="collection">{this.renderSongs()}</ul>
                <Link
                    to="/songs/new"
                    className="btn-floating btn-large red right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </section>
        );
    }
}

export default graphql(deleteSong)(graphql(fetchSongs)(SongList));
