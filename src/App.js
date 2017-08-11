import React, {Component} from 'react';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js'
import './App.css';

const $jsonp = {
    send: function (src, options) {
        const callback_name = options.callbackName || 'callback',
            on_success = options.onSuccess || function () {
                },
            on_timeout = options.onTimeout || function () {
                },
            timeout = options.timeout || 10; // sec

        const timeout_trigger = window.setTimeout(function () {
            window[callback_name] = function () {
            };
            on_timeout();
        }, timeout * 1000);

        window[callback_name] = function (data) {
            window.clearTimeout(timeout_trigger);
            on_success(data);
        };

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = src;

        document.getElementsByTagName('head')[0].appendChild(script);
    }
};

const fetchSearchResults = (query) =>
    new Promise((resolve, reject) => {
        $jsonp.send(
            `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${encodeURIComponent(
                query
            )}&limit=max&callback=test&limit=10`,
            {
                callbackName: "test",
                onSuccess: resolve,
                onTimeout: reject.bind({error: "Unable to connect."}),
                timeout: 5
            }
        );
    });

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            searchResults: [[], [], [], []]
        };
        this.search = this.search.bind(this);
    }

    search(query) {
        this.setState({searchQuery: query});
        console.log(query);
        if (query !== "") {
            fetchSearchResults(query)
                .then(data => {
                    this.setState({searchResults: data});
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>freeCodeCamp Wikipedia Viewer</h2>
                </div>
                <div className="App-intro">
                    <SearchBar onChange={this.search}/>
                    <SearchResults query={this.state.searchQuery} data={this.state.searchResults}/>
                </div>
            </div>
        );
    }
}

export default App;
