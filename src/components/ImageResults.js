import React from 'react';
import PropTypes from 'prop-types';

const ImageResults = props => {

        let imageList;

        if(props.images) {
            imageList = (
                <div className='imageList-container'>
                    {props.images.map(img => 
                        <div 
                            className='image-box'
                            key={img.id}
                            subtitle={<span>by <strong>{img.user}</strong></span>}
                        >
                            <img 
                                style={{cursor: 'pointer'}}
                                src={img.urls.small} 
                                alt={img.alt_description} 
                                onClick={e => props.selectImage(e, img.urls.small)}/>
                        </div>
                        )}
                </div>
            )
        } else {
            imageList = null;
        }

    return (
        
    <div>
        <h2>Select Image</h2>
        {imageList}
    </div>
    )
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}

export default ImageResults