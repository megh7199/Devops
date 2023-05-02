import React from 'react';
import logo from './img/tvm-header-logo.png';
import './App.css';
import EventList from './components/EventList';
import Event from './components/Event';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Link, Routes, Navigate} from 'react-router-dom';
import AttractionList from './components/AttractionList';
import Attraction from './components/Attraction';
import VenueList from './components/VenueList';
import Venue from './components/Venue';
import NotFound from './components/NotFound'

const App = () => {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>
            Welcome to the React.js TV Maze API Example
          </h1>
          <Link className='showlink' to='/'>
            Home
          </Link>
          <Link className='showlink' to='/events'>
            Events
          </Link>
          <Link className='showlink' to='/attractions'>
            Attractions
          </Link>
          <Link className='showlink' to='/venues'>
            Venues
          </Link>
        </header>
        <br />
        <br />
        <div className='App-body'>
          <Routes>
						<Route exact path='/' element={<Home/>} />
						<Route exact path='/events' element={<Navigate replace to={"/events/page/0"}/>} />
						<Route exact path='/events/page/:pagenum' element={<EventList/>} />
						<Route exact path='/events/:id' element={<Event/>} />
            <Route exact path='/attractions' element={<Navigate replace to={"/attractions/page/0"}/>} />
						<Route exact path='/attractions/page/:pagenum' element={<AttractionList/>} />
						<Route exact path='/attractions/:id' element={<Attraction/>} />
            <Route exact path='/venues' element={<Navigate replace to={"/venues/page/0"}/>} />
						<Route exact path='/venues/page/:pagenum' element={<VenueList/>} />
						<Route exact path='/venues/:id' element={<Venue/>} />
            {/* <Route exact path='/notfound' element={<N/>} /> */}
						<Route exact path='/notFound' element={<NotFound/>}/>
						<Route path='*' element={<NotFound/>}/>
					</Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
