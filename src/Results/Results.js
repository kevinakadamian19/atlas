import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AtlasContext from '../AtlasContext'

class Results extends Component {
    static defaultProps = {
        match: {
            params: () => {}
        },
        history: {
            push: () => { }
        }
    }
    static contextType = AtlasContext;

    filteredAthletes = (athletes, eventId) => {
        return athletes.filter(athlete => athlete.event === eventId)
    }

    totalWeight = (lifts) => {
        for(let i = 0; i < lifts.length; i++) {
            const totalWeight = parseInt(lifts[i].squat) + parseInt(lifts[i].bench) + parseInt(lifts[i].deadlift)
            lifts[i].total = totalWeight;
        }
        return lifts;
    }

    matchTotalWithAthlete = () => {
    
    }

   /* calculateWilksScore = (arr) => {
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].gender === 'male') {
                const x = arr[i]
                ((arr[i].total * 500) / (-216.0475144 + 16.2606339 + cx^2 +dx^3 + ex^4 + fx^5))
            }
            if(arr[i].gender === 'female') {

            }
        }
    } */

    render() {
        const {athletes, lifts} = this.context;
        if(athletes.length === 0 || lifts.length === 0) return null;
        const eventId = this.props.match.params.eventId;
        console.log(athletes)
        const filteredAthletes = this.filteredAthletes(athletes, eventId);
        const totalWeight = this.totalWeight(lifts);
        console.log(filteredAthletes);
        console.log(totalWeight);
        //if lift.athlete matches athletes[i].id => athletes[i].total = lift.total

        return(
            <div className='results'>

                <section>
                    <h3>Congratulations!</h3>
                    <div className='male-results'>

                    </div>
                    <div className='female-results'>
                        
                    </div>

                </section>
                <button
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                >
                    Return
                </button>
            </div>
        )
    }
}

export default Results;