import React, { Component } from 'react';
import DetalleItem from '../components/NewsAcumItem/DetalleItem';

class Detalle extends Component {
    
    render() {      
        return (
            <div className="container">
               <DetalleItem
                    title={this.props.location.state.title}
                     //Como cada article no tiene TANTAS propiedades le mando con el spread.
                />
            </div>
        );
    }
}

export default Detalle;