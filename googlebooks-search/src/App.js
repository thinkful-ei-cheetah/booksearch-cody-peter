import React, { Component } from 'react';
import './App.css';
import Search from './Search/Search';
import Book from './Book/Book';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
      error:null,
      params: {
        q: 'verne',
        printType: 'all',
        filter: 'ebooks'
      
    }
    }
  }

formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
  }


  componentDidMount() {
    const searchURL = 'https://www.googleapis.com/books/v1/volumes';

    const queryString = this.formatQueryParams(this.state.params);
    const url = searchURL + '?' + queryString;

    console.log(url);

    const options = {
      method: 'GET',
      headers: {
        
        "Content-Type": "application/json"
      }
    };

    fetch(url, options)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          books: data.items,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });

  }


  render() {
    console.log(this.state.books)
    return (


      <div className="App">
  <header>
    <h1>Google Book Search</h1>
    </header> 
  <Search />
  <Book />
      </div>
      
    );
  }
}

export default App;
