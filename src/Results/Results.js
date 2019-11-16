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

    maleAthletes = (athletes, eventId) => {
        return athletes.filter(athlete => athlete.event === eventId && athlete.gender === 'male')
    }
    femaleAthletes = (athletes, eventId) => {
        return athletes.filter(athlete => athlete.event === eventId && athlete.gender === 'female')
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

    render() {
        const {athletes, lifts} = this.context;
        if(athletes.length === 0 || lifts.length === 0) return null;
        const eventId = this.props.match.params.eventId;
        const maleAthletes = this.maleAthletes(athletes, eventId);
        const femaleAthletes = this.femaleAthletes(athletes, eventId);
        const totalWeight = this.totalWeight(lifts);
        console.log(totalWeight);
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