import { Heading } from '@chakra-ui/react';
import React from 'react';

const GoodStandingComponent = () => {
  return (
    <>
      <div className="row">
        <Heading as="h1" size="xl" style={{ paddingLeft: '25px' }}>
          Everything Looks <span style={{ color: 'limegreen' }}>Good!</span>
        </Heading>
      </div>
      <div className="row">
        <div className="col-12" style={{ paddingLeft: '25px' }}>
          <p style={{ paddingTop: '3%' }}>We'll let you know if we detect anything suspicious while you're browsing.</p>
        </div>
      </div>
    </>
  );
};

export default GoodStandingComponent;
