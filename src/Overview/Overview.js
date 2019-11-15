import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Lifts from '../Lifts/Lifts'
import Athletes from '../Athletes/Athletes'
import AtlasContext from '../AtlasContext'
import './Overview.css'

class Overview extends Component {
    static defaultProps = {
        match: {
            params: {}
        },
        history: {
            push: () => { }
        }
    }
    static contextType = AtlasContext;

    filteredAthletes = (athletes, eventId) => {
        return athletes.filter(athlete => athlete.event === eventId)
    }

    render() {
        const {athletes} = this.context;
        if(athletes.length === 0) return null;
        const eventId = this.props.match.params.eventId;
        console.log(eventId)
        //athletes is coming over as an array, and eventId is a 1 with typeof 'string'
        //filteredAthletes returns empty array. Next step figure out why; moving on for now.
        const filteredAthletes = this.filteredAthletes(athletes, eventId)
        return (
            <div className='overview'>
                <Lifts event={eventId}/>
                    <section>
                        <h3>Athlete Table</h3>
                        <table className="athlete-list">
                            <thead>
                                <tr>
                                <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAthletes.map(athlete =>
                                    <tr key={athlete.id}>
                                        <Athletes
                                            key={athlete.id}
                                            id={athlete.id}
                                            name={athlete.name}
                                        />
                                    </tr>
                                    )}
                            </tbody>
                            </table>

                            <Link to={`/add-athlete/${eventId}`}>
                            <button type="button">
                                Register Athlete
                            </button>
                            </Link>
                    </section>
            </div>
        )
    }
}

export default Overview;
