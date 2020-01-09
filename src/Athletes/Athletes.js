import React, {Component} from 'react'
import config from '../config'
import AtlasContext from '../AtlasContext'


class Athletes extends Component {
    static contextType = AtlasContext;

    handleClickDelete = e => {
        e.preventDefault();
        const athleteId = this.props.id;
        fetch(`${config.API_ENDPOINT}/api/athletes/${athleteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${config.API_KEY}`
            }
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return ;
        })
        .then(() => {
            this.context.deleteAthlete(athleteId);
        })
        .catch(error => {
            console.error({error})
        })
    }

    render() {
        const {name, gender, weight} = this.props;
        return(
            <>  
                <td>{name}</td>
                <td>{gender}</td>
                <td>{weight} kg</td>
                <td>
                    <button
                        className='athlete-delete'
                        type='button'
                        onClick={e => this.handleClickDelete(e)}
                    >
                        X
                    </button>
                </td>
            </>
        )
    }
}

export default Athletes;