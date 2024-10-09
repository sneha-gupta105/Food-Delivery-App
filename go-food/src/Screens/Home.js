import React, { Component } from 'react'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'

export class Home extends Component {
  render() {
    return (
      <div>
        <div><NavBar/></div>
        <div>Body</div>
        <div><Footer/></div>
      </div>
    )
  }
}

export default Home
