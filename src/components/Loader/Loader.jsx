
import React from 'react';
import styles from './Loader.module.css';

import { FidgetSpinner } from  'react-loader-spinner';

const Loader = () => (
  <div className={styles.loader}>
    {<FidgetSpinner
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  ballColors={['#ff0000', '#00ff00', '#0000ff']}
  backgroundColor="#F4442E"
/>}
  </div>
);

export default Loader;
