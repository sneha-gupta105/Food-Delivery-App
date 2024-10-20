import React, { Component } from 'react';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
import Carousal from '../Components/Carousal';

export class Home extends Component {
  render() {
    return (
      <div>
        <div><NavBar/></div>
        <div><Carousal/></div>
        <div className='m-3'>
          <Card/>
          <Card/><Card/>
        </div>
        <div><Footer/></div>
      </div>
    );
  }
}

export default Home;
