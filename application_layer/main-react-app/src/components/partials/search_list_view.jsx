import React from 'react';
import { Button, ButtonGroup, Form, FormGroup, Label, Input, FormText, Container, Row, Col, ListGroup, ListGroupItem, ListGroupItemText, ListGroupItemHeading } from 'reactstrap';
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


class SearchListView extends React.Component {
  constructor(props) {
    super(props);

    this.changeToVote = this.changeToVote.bind(this);
    this.voteOnLink = this.voteOnLink.bind(this);


    this.state = {
      displayitems : props.displayitems

    };

  }

  voteOnLink (e) {

    var voteoption = e.target.innerText
    let self = this;


    axios.post('/request/voteOnLink/', {
    'link': this.state.voteOverlay,
    'vote' : voteoption
     }).then(function (response) {
      console.log(response);

      var i;
      var voteincluded = self.state.displayitems

      for (i = 0; i < voteincluded.length; i++) {
        if (voteincluded[i].link === self.state.voteOverlay){

          if (response.data.vote === 'Yes'){
              voteincluded[i].up +=1;

          }

          if (response.data.vote === 'No'){
             voteincluded[i].down +=1;

          }
          self.setState({displayitems: voteincluded, voteOverlay : ''})
        }

      }




    }).catch(function (error) {
      console.log(error);
    });

  }



  componentWillReceiveProps(newProps) {

  }

  changeToVote(element){

  this.setState({voteOverlay : element.target.href })
  }


  render() {
    return (
<div>
<FormGroup>
    <ListGroup>



      {this.state.displayitems && this.state.displayitems.map(result => (

        <ListGroupItem key = {result.link} >
        <Row style = {{"overflow" : "hidden"}}>
        <Col  xs="2">
        <div><b style = {{"color" : "#7FDBFF"}}>Up: {result.up}</b><br/><b style = {{"color" : "#FF851B"}}>Down: {result.down}</b></div>
        </Col>
        <Col>

        <div>
        <ListGroupItemHeading><a onClick = {this.changeToVote} href = {result.link}  target="_blank"> {result.linktxt}</a></ListGroupItemHeading>
        {!(this.state.voteOverlay == result.link) && <ListGroupItemText>{result.description}</ListGroupItemText>}
        {this.state.voteOverlay == result.link && <div><a style = {{"color" : "red"}}>Was this link helpful?  <ButtonGroup>
        <Button onClick = {this.voteOnLink}>Yes</Button>
        <Button onClick = {this.voteOnLink}>No</Button>
      </ButtonGroup></a></div>}
        </div>
        </Col>
        </Row>
        </ListGroupItem>

      ))}



      </ListGroup>
      </FormGroup>
  </div>

    );
  }
  }



  export default SearchListView;
