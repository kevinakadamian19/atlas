import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import './GetStarted.css'

class GetStarted extends Component {
    render() {
        return(
            <div className='page'>
                    <h1>Atlas</h1>
                    <Link to='/event'>
                        <button type='button'>
                            Get Started
                        </button>
                    </Link>
                <div className='banner'></div>
                <div className='intro'>
                        <h3>Where power meets design.</h3>
                        <p>Say goodbye to excel sheets, and boring tables! Atlas has everything to make competition day run smoothly.                        
                        </p>  
                    </div>
            </div>
        )
    }
}

export default GetStarted;