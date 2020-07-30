import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { Button, Input } from 'reactstrap';
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


class ImageSelector extends React.Component {
  constructor(props) {
    super(props);

    this.onCropperChange = this.onCropperChange.bind(this);
    this.onCropReady = this.onCropReady.bind(this);
    this.onTakePhoto = this.onTakePhoto.bind(this);
    this.onFinalizeCrop = this.onFinalizeCrop.bind(this);
    this.searchText = props.searchText;
    this.toggleLoading = props.toggleLoading;
    this.updateInputState = props.updateInputState;
    this.resetApp = props.resetApp;
    this.cameraError = this.cameraError.bind(this);
    this.uploadImage = this.uploadImage.bind(this);


    this.state = {
      imageLocation: URL.createObjectURL,
      Cropping : false,
      showCamera : false,
    };

  }


  componentWillReceiveProps(newProps) {
    if(newProps.isOpen != this.state.modal){
      this.setState({modal:newProps.isOpen})
    }
  }

  componentDidMount(){
    if(( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) && this.state.showCamera == false){
     this.setState({"showCamera" : true})
    }

  }

  getCroppedImg(pixelCrop, imagesrc) {

    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    var image = new Image();
    image.src = imagesrc;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    // As Base64 string
    const base64Image = canvas.toDataURL('image/jpeg');
    return base64Image
  }

  cameraError (e) {

    this.setState({"showCamera" : false})
  }

  uploadImage (e) {
    console.log(e)

    var file =  e.target.files[0];
    var reader  = new FileReader();


    reader.addEventListener("load",  (e) => {
    console.log(e)
    this.setState({imageTaken : true, imageLocation: e.target.result, Cropping : true})}, false);

    if (file) {
      reader.readAsDataURL(file);
    }

    console.log(e)
  }



  onFinalizeCrop () {
    this.toggleLoading()
    let self = this;
    const base64crop = this.getCroppedImg(this.state.pixelCrop, this.state.imageLocation)
    console.log(base64crop)

    var formData = new FormData();

    formData.append("base64image", base64crop);
    formData.append("language", "eng");
    formData.append("apikey", "3c81c6cc1188957");
    formData.append("detectOrientation", "True");
    formData.append("scale", "True");

    axios.post('https://api.ocr.space/parse/image', formData
     ).then(function (response) {
      console.log(response);
      self.toggleLoading()

      if (response.data.IsErroredOnProcessing){

        alert( 'There was an error during processing, please try again.')
      }

      if (!(response.data.IsErroredOnProcessing)){

      const textResults = response.data.ParsedResults[0].ParsedText

      if (textResults == ""){
        alert("No text was returned, try capturing the image again.")
      }

    if (textResults != ""){
      self.updateInputState(textResults)
    }


    }



    }).catch(function (error) {
      console.log(error);
    });

  }








  onTakePhoto (dataUri) {
    this.setState({imageTaken : true, imageLocation: dataUri, Cropping : true})
  }


  onCropperChange = (crop) => {
      this.setState({ crop : crop });
  }

  onCropReady = (crop, pixelCrop) => {
      this.setState({pixelCrop : pixelCrop, Cropping : false})
  }


  render() {



    return (

      <div>

      <div style = {{position: 'absolute',
                 zIndex: '2',
                 left: '25%',
                 top: '15%'}}>
      {this.state.Cropping && <center><h1>Drag to Crop</h1></center>}

      </div>
      {!this.state.showCamera && <center><div><Input style = {{"width" : "20%", "marginTop" : "5%", "marginBottom" : "5%"}} onChange = {this.uploadImage} type = 'file' id='imageupload' className = 'imageupload'/></div></center>}

      {!this.state.imageTaken && this.state.showCamera && <Camera onCameraError = { (error) => { this.cameraError(error); } } isImageMirror = {false} idealFacingMode = {FACING_MODES.ENVIRONMENT}
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
        />}

      {this.state.imageTaken &&
        <ReactCrop crop = {this.state.crop} onChange = {this.onCropperChange} onComplete = {this.onCropReady} src={this.state.imageLocation} /> }
        {this.state.crop &&  <div style = {{"marginTop" : "2%", "marginBottom" : "4%"}} > <center><Button  onClick = {this.resetApp} color="warning" size="md" >Retake Image</Button>{'  '}<Button onClick = {this.onFinalizeCrop} color="primary" size="md" >Extract Text</Button> </center></div>}
      </div>

    );
  }
}



export default ImageSelector;
