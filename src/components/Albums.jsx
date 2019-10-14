import React from 'react';
import "../App.css"

const Albums = (props) => {
    return (    
        <div className="scrollBar">
          <ul>
              {
                props.albums.map(album => { return <li key={album.id} onClick={()=> props.onAlbumClick(album)}> {album.title}</li>})
              } 
          </ul>
        </div>
    )
}

export default Albums;