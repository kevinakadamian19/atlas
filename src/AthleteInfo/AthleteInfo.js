import React, { Component } from 'react'
import AtlasContext from '../AtlasContext'


class AthleteInfo extends Component {

    static contextType = AtlasContext;

    render() {
        const {name, gender, weight, total} = this.props;
        return(
            <>
                <td>{name}</td>
                <td>{gender}</td>
                <td>{weight} kgs</td>
                <td>{total}</td>
            </>
        )
    }
}

export default AthleteInfo;