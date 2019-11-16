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

    calculateBestSquat(arr) {
        if(arr.length === 0) {
           return '0';
       }
       let completed = [];
       for(let i = 0; i < arr.length; i++) {
           completed.push(parseFloat(arr[i].squat))
       }
       const max = completed.reduce(function(a,b) {
           return Math.max(a,b);
       })
       return max;
   }

   calculateBestBench(arr) {
      if(arr.length === 0) {
           return '0';
       }
       let completed = [];
       for(let i = 0; i < arr.length; i++) {
           completed.push(arr[i].bench)
       }
       const max = completed.reduce(function(a,b) {
           return Math.max(a,b);
       })
       return max;
   }

   calculateBestDeadlift(arr) {
       if(arr.length === 0) {
           return '0';
       }
       let completed = [];
       for(let i = 0; i < arr.length; i++) {
           completed.push(arr[i].deadlift)
       }
       const max = completed.reduce(function(a,b) {
           return Math.max(a,b);
       })
       return max;
   }

   filteredAthletes = (athletes, eventId) => {
    return athletes.filter(athlete => athlete.event === eventId)
    }

   filteredLifts = (lifts, eventId) => {
        return lifts.filter(lift => lift.event === eventId);
    }

    render() {
        const {athletes, lifts} = this.context;
        if(athletes.length === 0) return null;
        if(this.context.lifts.length === 0) return null;
        const eventId = this.props.match.params.eventId;
        const filteredLifts = this.filteredLifts(lifts, eventId)
        const bestSquat = this.calculateBestSquat(filteredLifts);
        const bestBench = this.calculateBestBench(filteredLifts);
        const bestDeadlift = this.calculateBestDeadlift(filteredLifts);
        const filteredAthletes = this.filteredAthletes(athletes, eventId)
        return (
            <div className='overview'>
                <h3>
                    Heaviest Completed Lifts
                </h3>
                <table className="athlete-list">
                    <thead>
                        <tr>
                            <th>Squat</th>
                            <th>Bench Press</th>
                            <th>Dead Lift </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{bestSquat} kgs || </td>
                            <td>{bestBench} kgs ||</td>
                            <td>{bestDeadlift} kgs</td>
                        </tr>
                    </tbody>
                </table>
                <Link to={`/add-lifts/${eventId}`}>
                    <button type='submit'>
                    Submit Lifts
                    </button>
                </Link>
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
                    <footer>
                        <Link to={`/results/${eventId}`}>
                            <button type='button'>
                                Results
                            </button>
                        </Link>
                    </footer>
            </div>
        )
    }
}

export default Overview;
