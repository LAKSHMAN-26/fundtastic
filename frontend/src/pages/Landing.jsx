import React from 'react'
import '../styles/Landing.css'
import {PiStudent} from 'react-icons/pi'
import {FaHandHoldingWater} from 'react-icons/fa'
import {MdHealthAndSafety} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'

const Landing = () => {

  const navigate = useNavigate();


  return (
    <div className="landing-page">

        <div className="landing-hero">

            <div className='landing-nav'>
              <h3>SB Funds</h3>
              <button onClick={()=> navigate('/authenticate')} >Sign In</button>
            </div>

            <div className="landing-hero-text">

                <h1>GIVE A HAND <br/> To MAKE THE BETTER WORLD</h1>
                <p className="para">That don't lights. Blessed land spirit creature divide our made two itself upon you'll dominion waters man second good you they're divided upon winged were replenish night</p>
                <button onClick={()=> navigate('/authenticate')}>Donate Now</button>
            </div>

        </div>

        <div className="landing-about">
            <div className="landing-about-title">
                <h3>Our Major Causes</h3>
                <h5>In our unwavering commitment to making a positive impact, we focus our efforts on several major causes that drive our charitable mission. These causes are at the heart of everything we do, guiding our work and inspiring change.</h5>
            </div>
            <div className="landing-about-content">
                <div className="about-card">
                  <h4>Educational Support</h4>
                  <PiStudent className='about-card-icon' />
                  <p>Discover how we empower disadvantaged youth through educational programs, scholarships, and resources, creating opportunities for a brighter future.</p>
                </div>
                <div className="about-card">
                  <h4>Clean Water Initiatives</h4>
                  <FaHandHoldingWater className='about-card-icon' />
                  <p>Learn about our efforts to provide access to clean and safe drinking water in underserved communities, preventing waterborne diseases and improving overall well-being.</p>
                </div>
                <div className="about-card">
                  <h4>Healthcare Access</h4>
                  <MdHealthAndSafety className='about-card-icon' />
                  <p className="para">Explore our work in improving healthcare accessibility for vulnerable populations, ensuring that basic medical needs are met and lives are saved.</p>
                </div>
            </div>
        </div>

        <div className="landing-footer">
          
        </div>
        <div className="social-icon d-flex icon-container " >
          <div>
          <a href="https://www.instagram.com/itz_me_lucky___26/">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcrhQZ8sV81DBWeBNJ0EQNvHagRVLKVd09MQ&s" height="30px" paddinng="20px"/>

          </a>
          <a href="">
          <img src="https://www.shutterstock.com/image-vector/black-square-button-icon-x-260nw-2425411729.jpg" height="40px" padding="20px" gap="10px"/>
          </a>
          <a href="">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFV_OwzztZQ61npDDy2m94TYnmn5bXl0PkXQ&s" height="30px"padding="20px" gap="10px"/>
          </a>
          </div>
        </div>

    </div>
  )
}

export default Landing