import React, {Component} from 'react';
import './Search.css'

class SearchResults extends Component {
    render() {
        const data = this.props.data;

        if (this.props.query === '') {
            return <div className="Search-info">Start typing to get results.</div>;
        }

        if (data[1].length === 0) {
            return <div className="Search-info">No results found.</div>;
        }

        else {
            return (
                <div>
                    <h3>Searching for: {this.props.query}</h3>
                <ul className="Search-list">
                    {data[1].map((e, i) => (
                        <a href={data[3][i]} key={i}>
                            <li className="Search-item">
                                <p className="Search-title">{e}</p>
                                <p className="Search-description">{data[2][i]}</p>
                            </li>
                        </a>
                    ))}
                </ul>
                </div>
            );
        }
    }
}

export default SearchResults;