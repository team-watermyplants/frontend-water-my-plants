import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageResults extends Component {
    render() {
        let imageList;
        const { images, selectImage } = this.props;

        if(images) {
            imageList = (
                <div className='imageList-container'>
                    {images.map(img => 
                        <div 
                            className='image-box'
                            title={img.tags}
                            key={img.id}
                            subtitle={<span>by <strong>{img.user}</strong></span>}
                        >
                            <img 
                                src={img.webformatURL} 
                                alt={img.tags} 
                                onClick={e => selectImage(img.webformatURL)}/>
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
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}

export default ImageResults