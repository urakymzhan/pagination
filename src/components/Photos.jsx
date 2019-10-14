import React from 'react';
import "../App.css"

const Photos = (props) => {

    // might helpful later when image content is below 50 for each active album
    // let indexOfLastImage = props.currentImages.length > props.limit ? props.currentImages.length: props.limit
    return (
        <div className="mainImageDiv">
            <h2 className="albumTitle">Album Title |  {props.activeAlbum.title || "No Album has Selected"}</h2>
      
            <div className="pagination">
                <button> {props.indexOfFirstImage}-{props.indexOfLastImage} of {props.limit}</button> 
                &nbsp;
                <button onClick = {() => props.onNext(-1, props.pageNumbers)}>LEFT</button>
                &nbsp;
                <button onClick = {() => props.onNext(1, props.pageNumbers)}>RIGHT</button>
            </div>
            <div className="images">
                {
                  props.activeAlbumImages.map(image => {
                      const className = props.selectedImage === image.id ? 'selectedImage' : 'image';
                      return <img src={image.thumbnailUrl} alt={image.title} key ={image.id} onClick={()=> props.onPhotoClick(image.id)} className={className}/>
                  })
                }
          </div> 
        </div>
    )
}

export default Photos;