import React from 'react';
import Loader from 'react-loader-spinner'
import { Button, Form, FormGroup, Label, Input, FormText, Container,
         Row, Col, ListGroup, ListGroupItem, InputGroup, InputGroupAddon,
         ModalHeader, ModalBody, ModalFooter, Modal } from 'reactstrap';
import ImageSelector from '../image_selection/image_selection.jsx'
import SearchListView from '../../partials/search_list_view.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.displaySearchResults = this.displaySearchResults.bind(this);
    this.searchViaText = this.searchViaText.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.searchText = this.searchText.bind(this);
    this.toggleTextSearch = this.toggleTextSearch.bind(this);
    this.updateInputState = this.updateInputState.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.resetApp = this.resetApp.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);

    this.state = {
      resultsArray : [],
      loading : false,
      textSearchActive : false,
      searchBoxText : "",
      searchDone : false,
      infoModal : false

    };

  }

  searchText (text) {
    let self = this;
    this.setState({loading : true})

    axios.post('/request/search/', {
    'q': text,
     }).then(function (response) {
      console.log(response);
      self.setState({loading : false})

      self.displaySearchResults(response.data)


    }).catch(function (error) {
      console.log(error);
    });

  }

  searchViaText (e) {

    this.searchText(this.state.searchBoxText)


  }

  resetApp () {




    location.reload()
  }

  toggleLoading (){

    this.setState({loading: !this.state.loading})
  }

  toggleTextSearch (){

    this.setState({textSearchActive: !this.state.textSearchActive})
  }

  updateInput (e){


     //this.state.searchBoxText = e.target.value
     this.setState({searchBoxText : e.target.value})

  }

  toggleInfo(e) {
    this.setState({infoModal : !this.state.infoModal})
  }



  updateInputState (text) {

    this.setState({searchBoxText : text})
  }

  displaySearchResults (resultsArray) {
    this.setState({resultsArray : resultsArray, searchDone : true})
  }




  componentWillReceiveProps(newProps) {

  }


  render() {



    return (
      <div >
      <Modal isOpen={this.state.infoModal} toggle={this.toggleInfo} className= 'infomodal'>
          <ModalHeader toggle={this.toggleInfo}>CompSciSearch Info</ModalHeader>
          <ModalBody>
           <p>This app was built as a project for the CS6460 "Educational Technology" OMSCS class at Georgia Tech.</p>
           <p>It aims to provide quick, efficient answers to Computer Science related questions,
           in an attempt to foster metacognition and self-regulated learning</p>

           <h5> Usage: </h5>
           <p>Either input search text manually, or take/upload a photo and
           crop the text you want to OCR.  Hitting the search button below will
           take you to a page of search results for your input text.</p>
           <p>Links on the search page are ranked by user upvotes.  Links can be
           voted on by returning to the search results after clicking a link and
           selecting yes/no on the "Was this link helpful?" prompt.</p>

           <p>NOTE: If you are using a laptop or camera API access is denied, you will only be able to upload an image via file input.</p>

          </ModalBody>
          <ModalFooter>
          <Button color="secondary" onClick={this.toggleInfo}>Close</Button>
          </ModalFooter>
        </Modal>
    {  this.state.loading && <div id = 'loader' style = {{
         position: "absolute",
         top:"25%",
         left : "25%",
         margin:"0 auto",
         zIndex: "3"}} id = "loader"><Loader
           type="Ball-Triangle"
           color="#00BFFF"
           height="200"
           width="200"
        /></div>}


    <div id = "main">
    <FontAwesomeIcon style= {{"position": "absolute", "top" :"5px", "right" : "5px", zIndex: "999"}} icon="info-circle" onClick = {this.toggleInfo} />


    {!this.state.searchDone && <center><ImageSelector resetApp = {this.resetApp} searchText = {this.searchText} updateInputState = {this.updateInputState} toggleLoading = {this.toggleLoading}/></center>}

    {this.state.searchDone && <SearchListView  key = {Math.Random} displayitems = {this.state.resultsArray}/>}
    </div>

   <div id = "tools">


  {this.state.searchDone &&  <div style = {{"marginTop" : "2%", "marginBottom" : "4%"}} > <center><Button  onClick = {this.resetApp} color="warning" size="md" >New Search</Button></center></div>}
  {!this.state.searchDone && <InputGroup style = {{
    width:"98%",
    left:"1%",
    zIndex: '2'}}>


          <Input onChange = {this.updateInput} type = 'textarea' id='searchbox' value = {this.state.searchBoxText} className = 'searchbox'/>
          <InputGroupAddon addonType="append"><Button onClick ={this.searchViaText} >Search!</Button></InputGroupAddon>

    </InputGroup>}

    </div>
    </div>
    );
  }
  }



  export default MainView;
