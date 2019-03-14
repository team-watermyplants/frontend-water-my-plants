import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import M from "materialize-css";


const ImageResults = props => {
    


        let imageList;

        if(props.images) {
            imageList = (
                <div className='carousel'>

                    {props.images.map(img => 
                        <a 
                            className='carousel-item'
                            href=''
                            key={img.id}
                            style={{cursor: 'pointer'}}
                            src={img.urls.small} 
                            alt={img.alt_description} 
                            onClick={e => props.selectImage(e, img.urls.small)}
                        ></a>
                        )}
                </div>
            )
        } else {
            imageList = null;
        }

    return (
        
    <div>
        <H2>Select Image</H2>
        {imageList}
    </div>
    )
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}

//styles

const H2 = styled.h2`
    color: #00796b;
`;

export default ImageResults