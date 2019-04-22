import React, { Component } from 'react';

class Book extends Component {
    

    render() {

    console.log(this.props.author)
        let authors = this.props.author.join(', ');

    console.log(this.props.price);
    let price = this.props.price;
    let saleability = this.props.saleability;

        
            if(saleability === 'FREE'){
                return (     
                    <li>
                        <h2>{this.props.title}</h2>
                        
                        <img src={this.props.thumbnail_URL} alt='book should be here?' />
        
                    <div>
                            <h3>Authors: {authors}</h3>
                            <h4>price: Free</h4>
                            {this.props.description}
                            
                    </div>
                    </li>
                );
            }
            else {
                return (     
            <li>
                <h2>{this.props.title}</h2>
                
                <img src={this.props.thumbnail_URL} alt='book should be here?' />

            <div>
                    <h3>Authors: {authors}</h3>
                    <h4>price: { new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'})
                            .format(price.amount) }</h4>
                    {this.props.description}
                    
            </div>
            </li>
        );
    }
    }
}



export default Book;