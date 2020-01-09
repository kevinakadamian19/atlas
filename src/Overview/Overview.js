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
        const filteredAthletes = this.filteredAthletes(athletes, eventId)
        const filteredLifts = this.filteredLifts(lifts, eventId);
        const bestSquat = this.calculateBestSquat(filteredLifts);
        const bestBench = this.calculateBestBench(filteredLifts);
        const bestDeadlift = this.calculateBestDeadlift(filteredLifts);
        return (
            <div className='page'>
                <nav className='nav-bar'>
                    <h1>Atlas</h1>
                    <div className='nav-buttons'>
                        <Link to='/'>
                            <button type='button'>
                                Home
                            </button>
                        </Link>
                        <Link to='/event'>
                            <button type='button'>
                                Events
                            </button>
                        </Link>
                    </div>
                </nav>
                <div className='banner2'></div>
                <header>
                    <h2>Best Attempts</h2>
                    <table className= "lift-table">
                        <thead>
                            <tr>
                                 <th>Squat</th>
                                <th>Bench</th>
                                <th>Deadlift </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='squat-icon'></td>
                                <td className='bench-icon'></td>
                                <td className='deadlift-icon'></td>
                            </tr>
                            <tr>
                                <td>{bestSquat} kgs</td>
                                <td>{bestBench} kgs</td>
                                <td>{bestDeadlift} kgs</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to={`/results/${eventId}`}>
                            <button type='button'>
                                Results
                            </button>
                    </Link>
                </header>
                <h2>Athletes</h2>
                    <table className="athlete-list">
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Weight Class</th>
                            <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAthletes.map(athlete =>
                                <tr key={athlete.id}>
                                     <Athletes
                                        key={athlete.id}
                                        id={athlete.id}
                                        name={athlete.name}
                                        weight={athlete.weight}
                                        gender={athlete.gender}
                                    />
                                </tr>
                                )}
                        </tbody>
                        </table>
                    <div className='overview-buttons'>
                        <Link to={`/add-athlete/${eventId}`}>
                            <button type="button">
                                Register Athlete
                            </button>
                        </Link>
                        <Link to={`/add-lifts/${eventId}`}>
                            <button type='submit'>
                                Submit Lifts
                            </button>
                        </Link>
                    </div>
            </div>
        )
    }
}

export default Overview;
