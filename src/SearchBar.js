import React, {Component} from 'react';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.handleChange= this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    showRandomArticle() {
        window.location = 'https://en.wikipedia.org/wiki/Special:Random';
    }

    render() {
        return (
            <div className="Search-bar">
                <input type="search" className="Search-input" onChange={this.handleChange}/>
                <button className="Search-button" onClick={this.showRandomArticle}>Random article</button>
            </div>
        )
    }
}

export default SearchBar;