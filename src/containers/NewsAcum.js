import React, { Component } from 'react';
import NewsAcumItem from '../components/NewsAcumItem/NewsAcumItem';
import Pagination from '../components/Pagination/Pagination';
import axios from 'axios';

const API_NEWS_URI = 'https://newsapi.org/v2/top-headlines?country=ar&apiKey=91a3bc0b07184b7a8bf352ff162016cd';

class NewsAcum extends Component {
    state = {
        dataAcum: null,
        isFetching: true,
        currentPage: 1,
        itemsPerPage: 3,
        pageOfItems: []
    }

    componentDidMount() {
        axios.get(API_NEWS_URI)
            .then(response => {
                this.setState({
                    dataAcum: response.data.articles,
                    isFetching: false,
                })
            })
            .catch(error => console.log(error))
    }

    numberClickedHandler = (pageOfItems) => {
        this.setState({ pageOfItems: pageOfItems })
    }

    render() {
        const allNews = this.state.dataAcum;
        let articles = null;

        if (!this.state.isFetching) {
            articles = this.state.pageOfItems.map((article, index) => {
                return <NewsAcumItem
                    key={index}
                    {...article} //Como cada article no tiene TANTAS propiedades le mando con el spread.
                />
            });
        }

        const pagination = !this.state.isFetching ? <Pagination items={this.state.dataAcum}
            onChangePage={this.numberClickedHandler}
            pageSize={this.state.itemsPerPage} />
            : null;

        return (
            <div className="container">
                <div className="row">
                    {articles}
                </div>
                {pagination}
            </div>
        );
    }
}

export default NewsAcum;