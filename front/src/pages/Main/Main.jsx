import React from 'react';

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