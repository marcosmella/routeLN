import React from 'react';
import classes from './NewsAcumItem.module.css';
import { Link } from 'react-router-dom';

const newsAcumItem = (props) => (
    <div className={"card col-md-4 " + classes.Card}>
        <img src={props.urlToImage} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
            <a href={props.url} className="btn btn-primary">Leer más...</a>
            <Link to={{
                pathname: `/url/${props.title}`,
                state: {                
                    title: props.title
                }
            }}
            >
                    Clickeame Govir
              </Link>
        </div>
    </div>
);

export default newsAcumItem; 