import React from 'react';
import './App.css';
import Photos from './components/Photos';
import Albums from './components/Albums';
import Search from './components/Search';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      albums: [],
      imageContent: [],
      error: null,
      activeAlbum: {},
      selectedImage: null,
      searchInString: "",
      currentPage: 1,
      imagesPerPage: 100,
    }
  }
  componentDidMount =() => { 
    fetch('https://jsonplaceholder.typicode.com/albums')
    .then(res=> res.json())
    // Added "all albums" list and assigned id=0
    .then(result => {result.unshift({"userId": 1, "id": 0, "title": "All Albums"}) 
      this.setState({albums: result})
    },
      (error) => {
        this.setState({
          error,
        });
      }
    )
  }
  
  onAlbumClick =(activeAlbum) => {
    this.setState({activeAlbum})
    fetch('https://jsonplaceholder.typicode.com/photos')
    .then(res => res.json())
    .then(
      (result) => {
          this.setState({
            imageContent: result,
          });
      },
      (error) => {
        this.setState({
          error,
        });
      }
    )
  }

  onPhotoClick = (imageId) => {
    this.setState({selectedImage: imageId});
  }

  handleChange = (e) => {
      this.setState({searchInString: e.target.value})
  }

  onNext = (num, pageNumbers) => {
    // firstpage makes sure prev button doesn't go negative value
    let firstpage = 1;
    if (num < 0 && this.state.currentPage === 1) {
      firstpage--;
    }
    if (firstpage > 0 && this.state.currentPage < pageNumbers.length && pageNumbers.length > 0) {
        // pageNumbers.length > 0 makes sure next/prev button disabled on first load(if no images found)
        this.setState({currentPage: this.state.currentPage + num})
      }
    } 
   
  render() {
    let {imageContent, error, albums, activeAlbum, selectedImage, searchInString, 
      searchedImage, currentPage, imagesPerPage} = this.state;

    // Filter and render only clicked albums content
    let activeAlbumImages = imageContent.filter((image) => image.albumId === activeAlbum.id);

    // Check if All Albums button clicked and id=0
    if (activeAlbum.id === 0) {
      activeAlbumImages = imageContent;
    }  
    // Searching Images
    if (searchInString) {
      const searchedImage = activeAlbumImages.filter(image => image.title.indexOf(searchInString) !== -1);  
      activeAlbumImages = searchedImage;
    } 
    // used in Photos.jsx  
    let limit = activeAlbumImages.length 

    // max page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(activeAlbumImages.length / imagesPerPage); i++) {
      pageNumbers.push(i);
    }

    // logic for displaying pagination 
    let indexOfLastImage = currentPage * imagesPerPage; 
    let indexOfFirstImage = indexOfLastImage - imagesPerPage + 1;
    let currentImages = activeAlbumImages.slice(indexOfFirstImage, indexOfLastImage); 
      activeAlbumImages = currentImages;

    // Check if any error from API 
    if (error) {
      return <div>Error: {error.message}</div>;
    } 
    else {
      return (
        <>
          <Albums getAllAlbums={this.getAllAlbums} albums={albums} onAlbumClick={this.onAlbumClick}/>
          <Search handleChange={this.handleChange} searchedImage={searchedImage}/>
          <Photos onPhotoClick={this.onPhotoClick} activeAlbum={activeAlbum} activeAlbumImages={activeAlbumImages} 
                  selectedImage={selectedImage} onNext={this.onNext} indexOfLastImage={indexOfLastImage} 
                  indexOfFirstImage={indexOfFirstImage} limit={limit} currentImages={currentImages} pageNumbers={pageNumbers}/>
        </>
      );
    }
  }
}
export default App;
