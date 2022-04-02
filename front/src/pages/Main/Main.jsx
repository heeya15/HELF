import React from 'react';

import Banner from '../../components/Main/Banner';
import Feature from '../../components/Main/Feature';
import Effect from '../../components/Main/Effect';
import Footer from '../../components/Footer/Footer';

export default function Main() {
    return (
        <React.Fragment>
          <Banner/>
          <Effect/>
          <Feature/>
          <Footer/>
        </React.Fragment>
    )
}