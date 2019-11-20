import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Athletes from '../Athletes/Athletes'
import AtlasContext from '../AtlasContext';
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

    calculateBestSquat(obj) {
        if(obj.length === 0) {
           return '0';
       }
       let completed = [];
       for(let i = 0; i < obj.length; i++) {
           completed.push(parseFloat(obj[i].squat))
       }
       return completed.reduce(function(a,b) {
           return Math.max(a,b);
       })
   }

   calculateBestBench(arr) {
      if(arr.length === 0) {
           return '0';
       }
       let completed = [];
       for(let i = 0; i < arr.length; i++) {
           completed.push(arr[i].bench)
       }
       return completed.reduce(function(a,b) {
           return Math.max(a,b);
       })
   }

   calculateBestDeadlift(arr) {
       if(arr.length === 0) {
           return '0';
       }
       let completed = [];
       for(let i = 0; i < arr.length; i++) {
           completed.push(arr[i].deadlift)
       }
       return completed.reduce(function(a,b) {
           return Math.max(a,b);
       })
   }

   filteredAthletes = (athletes, eventId) => {
    return Object.values(athletes).filter(athlete => athlete.event === eventId)
    }

   filteredLifts = (lifts, eventId) => {
        return Object.values(lifts).filter(lift => lift.event === eventId);
    }

    render() {
        const {athletes, lifts} = this.context;
        const eventId = this.props.match.params.eventId;
        const filteredLifts = this.filteredLifts(lifts, eventId)
        const bestSquat = this.calculateBestSquat(filteredLifts);
        const bestBench = this.calculateBestBench(filteredLifts);
        const bestDeadlift = this.calculateBestDeadlift(filteredLifts);
        const filteredAthletes = this.filteredAthletes(athletes, eventId)
        return (
            <div className='overview'>
                <section>
                    <h2>Athletes</h2>
                    <table className="athlete-list">
                        <thead>
                            <tr>
                            <th></th>
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
                <section>
                    <h2> Completed Attempts</h2>
                    <table className= "lift-table">
                        <thead>
                            <tr>
                                <th>Squat</th>
                                <th>Bench Press</th>
                                <th>Deadlift </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{bestSquat} kgs</td>
                                <td>{bestBench} kgs</td>
                                <td>{bestDeadlift} kgs</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to={`/add-lifts/${eventId}`}>
                        <button type='submit'>
                            Submit Lifts
                        </button>
                    </Link>
                </section>
                <footer>
                    <Link to={`/results/${eventId}`}>
                        <button type='button'>
                            View Results
                        </button>
                    </Link>
                </footer>
            </div>
        )
    }
}

export default Overview;
