import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImageResults = props => {

        return (
                    <>
                    {props.images.map(img => 
                        <ImageCard

                            key={img.id}
                            src={img.urls.small} 
                            alt={img.alt_description} 
                            onClick={e => props.selectImage(e, img.urls.small)}/>
                        )}
                    </>
            )
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}

//styles

const ImageCard = styled.img`
    cursor: pointer;
    border-radius: 50%;
    width: 100px;
    height: 100px;
`;


export default ImageResults