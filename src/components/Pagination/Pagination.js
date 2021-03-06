import React, { Component } from 'react';
import classes from './Pagination.module.css'

const defaultProps = {
    initialPage: 1,
    pageSize: 10
}

class Pagination extends Component {
    state = {
        pager: {}
    };

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        const { items, pageSize } = this.props;
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages)
            return;

        // get new pager object for specified page
        pager = this.getPager(items.length, page, pageSize);
        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        // update state
        this.setState({ pager: pager });
        // call change page function in parent component
        this.props.onChangePage(pageOfItems);

    }

    getPager(totalItems, currentPage, pageSize) {
        // default la pagina = 1
        currentPage = currentPage || 1;
        // default pageSize = 10
        pageSize = pageSize || 10;
        // Calculo la cantidad de paginas.
        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <ul className="pagination">
                <li className={pager.currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                    <a className="page-link" onClick={() => this.setPage(1)}>First</a>
                </li>
                <li className={pager.currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                    <a className="page-link" onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'page-item active' : 'page-item'}>
                        <a className="page-link" onClick={() => this.setPage(page)}>{page}</a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'page-item disabled' : 'page-item'}>
                    <a className="page-link" onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'page-item disabled' : 'page-item'}>
                    <a className="page-link" onClick={() => this.setPage(pager.totalPages)}>Last</a>
                </li>
            </ul>
        );
    }
}

Pagination.defaultProps = defaultProps;
export default Pagination;












    //render() {
    // const { items, currentPage, itemsPerPage } = this.props;
    // const pageNumbers = [];
    // console.log("esto esta dentro de la paginacin", currentPage)


    // // Logic for displaying current todos
    // //news= [1,2,3,4,5,6]
    // //currentPage = 2
    // //itemsPerPage = 3
    // const indexOfLastNews = currentPage * itemsPerPage; // 2 * 3 = 6
    // const indexOfFirstNews = indexOfLastNews - itemsPerPage; //
    // const currentNews = items.slice(indexOfFirstNews, indexOfLastNews); //


    // for (let i = 1; i < Math.ceil(items.length / itemsPerPage); i++) {
    //     pageNumbers.push(i);
    // }
    // console.log(pageNumbers)

    // const renderPageNumbers = pageNumbers.map((page) => {
    //     return <li key={page} className="page-item" >
    //         <a className="page-link"
    //             id={page}
    //             href="#"
    //             onClick={this.props.numberClicked}>{page}</a>
    //     </li>
    // });

    // return (
    //     <nav aria-label="Page navigation example">
    //         <ul className="pagination">
    //             <li className="page-item "><a className="page-link" href="#">Previous</a></li>
    //             {renderPageNumbers}
    //             <li className="page-item"><a className="page-link" href="#">Next</a></li>
    //         </ul>
    //     </nav>
    // );

    //}
// }

// export default Pagination;