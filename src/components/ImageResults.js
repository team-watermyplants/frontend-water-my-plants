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
                            title={img.tags}
                            key={img.id}
                            subtitle={<span>by <strong>{img.user}</strong></span>}
                        >
                            <img 
                                style={{cursor: 'pointer'}}
                                src={img.webformatURL} 
                                alt={img.tags} 
                                onClick={e => props.selectImage(e, img.webformatURL)}/>
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