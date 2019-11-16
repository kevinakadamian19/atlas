import React, {Component} from 'react'
import AtlasContext from '../AtlasContext'


class Athletes extends Component {
    static contextType = AtlasContext;

    handleClickDelete = e => {
        e.preventDefault();
        const athleteId = this.props.id;
        this.context.deleteAthlete(athleteId);
        /*fetch(`${config.API_ENDPOINT}/athletes/${athleteId}`. {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
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

        */
    }

    render() {
        const {name} = this.props;
        return(
            <>  
                
                <td>{name}</td>
            </>
        )
    }
}

export default Athletes;