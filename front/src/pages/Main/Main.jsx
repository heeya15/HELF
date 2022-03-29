import React from 'react';
import {Route, Link} from 'react-router-dom';
import logo from '../../logo.png';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Banner from '../../components/Main/Banner';
import Function from '../../components/Main/Function';
import Effect from '../../components/Main/Effect';
import Footer from '../../components/Footer/Footer';

export default function Main() {
    return (
        <React.Fragment>
          <Banner/>
          <Function/>
          <Effect/>
          <Footer/>
        </React.Fragment>
    )
}