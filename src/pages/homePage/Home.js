import video from '../../assets/earth.mp4';
import React from 'react'
import Footer from '../../components/footer/Footer';
import './Home.css'

const Home = () => {

  return (
   <>
    <div className='home-container'>
    <video src={video} autoPlay loop muted />
    <h1 className='title'>AddVéntures</h1>
    <h2 className='subtitle'>Create your ever-lasting memories</h2>
    <Footer />
    
    </div>
    </>
  );
};

export default Home
