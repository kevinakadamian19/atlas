import React, {Component} from 'react'
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
        return Object.values(athletes).filter(athlete => athlete.event === eventId)
    }

    calculateWilksScore = (obj) => {
        const athletes = Object.values(obj)
        const results = {}
        for(let i = 0; i < athletes.length; i++) {
            if(athletes[i].gender === 'male') {
                const x = athletes[i].weight;
                const a = -216.0475144;
                const b = 16.2606339 * x;
                const c = -0.002388645 * x;
                const d = -0.00113732 * x;
                const e = 0.00000701863 * x;
                const f = -0.00000001291 * x;
                const wilksScore = (athletes[i].lifts[0].total * 500) / (a + b + Math.pow(c,2) + Math.pow(d, 3) + Math.pow(e,4) + Math.pow(f, 5));
                results[athletes[i].name] = wilksScore;
            }
            if(athletes[i].gender === 'female') {
                const x = athletes[i].weight;
                const a = 594.31747775582;
                const b = -27.23842536447 * x;
                const c = 0.82112226871 * x;
                const d = -0.00930733913 * x;
                const e = 0.00004731582 * x;
                const f = -0.00000009054 * x;
                const wilksScore = (athletes[i].lifts[0].total * 500) / (a + b + Math.pow(c,2) + Math.pow(d, 3) + Math.pow(e,4) + Math.pow(f, 5));
                results[`${athletes[i].name}`] = wilksScore;
            }
        }
        return results;
    }

    determineWinner = (obj) => {
            if(obj.length === 0) {
                return ;
            }
            if(obj.length >= 1) {
                Object.keys(obj).reduce((a,b) => obj.a > obj.b ? a : b)
            }
    }
   

    render() {
        const {athletes} = this.context;
        const eventId = this.props.match.params.eventId;
        const filteredAthletes = this.filteredAthletes(athletes, eventId);
        const calculateScore = this.calculateWilksScore(filteredAthletes);
        console.log(calculateScore)
        const winner = this.determineWinner(calculateScore)
        console.log(winner)
        //if lift.athlete matches athletes[i].id => athletes[i].total = lift.total

        return(
            <div className='results'>
                <section>
                    <h3>Congratulations!</h3>
                    <div className='winner'>
                       {winner}
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