import React from 'react';

import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import ImageSelector from '../image_selection/image_selection.jsx'

class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayitems : props.displayitems

    };

  }


  componentWillReceiveProps(newProps) {

  }


  render() {
    return (
      <ImageSelector/>
    );
  }
  }



  export default MainView;
