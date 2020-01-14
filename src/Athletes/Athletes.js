import React, {Component} from 'react'
import config from '../config'
import AtlasContext from '../AtlasContext'


class Athletes extends Component {
    static contextType = AtlasContext;

    filteredLift = (lifts, athleteId) => {
        const id = parseInt(athleteId)
         return Object.values(lifts).filter(lift => lift.athlete_id === id);
    }

    handleClickDelete = e => {
        e.preventDefault();
        const athleteId = this.props.id;
        const { athletes } = this.context;
        const liftId = athletes.athleteId.lifts[0].id;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${config.API_KEY}`
            }
        }
        console.log(liftId)
        Promise.all([
            fetch(`${config.API_ENDPOINT}/api/athletes/${athleteId}`, options),
            fetch(`${config.API_ENDPOINT}/api/lifts/${liftId}`, options)
        ])
        .then(res => {
            if(!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return ;
        })
        .then(() => {
            this.context.deleteAthlete(athleteId);
            this.context.deleteLift(liftId);
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