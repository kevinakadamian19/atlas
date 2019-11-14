import React, {Component} from 'react'
import {Link} from 'react-router-dom';

class GetStarted extends Component {
    render() {
        return(
            <div className='get-started'>
                <section>
                    <h3>Power Meets Design</h3>
                    <p>Atlas is your online tool for registering powerlifting meets, and providing user friendly displays.</p>
                </section>

                <section>
                    <h3>Register Event</h3>
                    <Link to='/register-event'>
                    <button type='button'>
                        Register
                    </button>
                    </Link>
                </section>
            </div>
        )
    }
}

export default GetStarted;