import React, { Component } from 'react';
import Button from '../components/buttons/button';
import styles from '../assets/stylesheets/containers/application_container.module.scss';

class App extends Component {
  render () {
    return (
      <div className={ styles.applicationContainer }>
          <Button
            type='button'
          >
            Praesent quis rhoncus
          </Button>

          <Button
            type='disabled'
          >
            Praesent quis rhoncus
          </Button>

          <Button
            type='info'
          >
            Praesent quis rhoncus
          </Button>
      </div>
    )
  }
}

export default App;