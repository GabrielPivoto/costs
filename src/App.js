import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contatc';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';

import Container from './components/layouts/Container';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Project from './components/pages/Project';

function App() {
  return (
    <Router>
      <Navbar/>
      <Container customClass="min-height">
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route path='/projects' element={<Projects/>}></Route>
          <Route path='/company' element={<Company/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/newProject' element={<NewProject/>}></Route>
          <Route path='/project/:id' element={<Project/>}></Route>
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
