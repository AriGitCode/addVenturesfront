import video from '../../assets/earth.mp4';
import React, { useState, useEffect } from 'react';
import { useAnimate, stagger, motion} from 'framer-motion';
import Footer from '../../components/footer/Footer';
import './Home.css'

const Home = () => {
  const [open, setOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const items = ['Register', "Discover places", "Add a Pin", "Edit, Delete, Like!"];

   // the stagger effect
   const staggerList = stagger(0.1, { startDelay: 0.25 });

   useEffect(() => {
    animate(
      "ul",
      {
        width: open ? 160 : 0,
        height: open ? 200 : 0,
        opacity: open ? 1 : 0
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.4
      }
    );
    animate(
      "li",
      open
        ? { opacity: 1, scale: 1, x: 0 }
        : { opacity: 0, scale: 0.3, x: -50 },
      {
        duration: 0.2,
        delay: open ? staggerList : 0
      }
    );
  }, [open]);
  return (
    <div className='home-container' ref={scope}>
       
      <video src={video} autoPlay loop muted />
      <h1 className='title'>AddVéntures</h1>
      {/* <h2 className='subtitle'>Create your ever-lasting memories</h2> */}
      <motion.button className='btn' onClick={() => setOpen(!open)} whileTap={{ scale: 0.95 }}>
        Start
       </motion.button><Footer />
       <ul>
        {items.map((item, index) => (
          <motion.li key={index}>{item}</motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Home
