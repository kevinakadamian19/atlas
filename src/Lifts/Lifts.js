import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AtlasContext from '../AtlasContext'

class Lift extends Component {
    static contextType =  AtlasContext;

    //Note to self: Remove parseFloat once moving to express endpoints.
    calculateBestSquat(arr) {
         if(arr.length === 0) {
            return 'There are no squats currently registered.';
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
            return 'There are no bench presses currently registered';
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
            return 'THere are no deadlifts currently registered.';
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

    filteredLifts = () => {
       const {athletes, lifts} = this.context;
       console.log(athletes, lifts)
       const eventId = this.props.event;
       const filteredAthletes = athletes.filter(athlete => athlete.event === eventId)
       //Filtered lifts returning empty value. May need to move remove lift component, and just move these functions back into Overview.
       return lifts.filter(lifts => lifts.athlete === filteredAthletes.event);
    }

    render() {
        const {lifts} = this.context;
        if(this.context.lifts.length === 0) return null;
        console.log(lifts)
        const filteredLifts = this.filteredLifts(lifts)
        console.log(filteredLifts)
        const bestSquat = this.calculateBestSquat(filteredLifts);
        const bestBench = this.calculateBestBench(filteredLifts);
        const bestDeadlift = this.calculateBestDeadlift(filteredLifts);
        return(
            <div className='lift'>
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
                <Link to='/add-lifts'>
                    <button type='submit'>
                    Submit Lifts
                    </button>
                </Link>
            </div>
        )
    }
}

export default Lift;