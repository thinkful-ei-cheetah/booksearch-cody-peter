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
        const aBooks = data.items.map( book => {
          return {
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors,
            descritption: book.volumeInfo.description,
            thumbnail_URL: book.volumeInfo.imageLinks.thumbnail,
            saleability: book.saleInfo.saleability,
            price: book.saleInfo.retailPrice,
          };
        })

        console.log(aBooks);
        this.setState({
          books: aBooks,
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
  <ul className="books-list">
    <Book />
  </ul>

      </div>
      
    );
  }
}

export default App;
