import React from 'react';
import PropTypes from "prop-types";

const CustomImage = (props) => {
    if (!props.downloadPath && props.isImgDefault) {
        return <img className="iconDetail"
                    src={props.defaultPath}
                    alt={props.alt} />;
    } else if (props.downloadPath) {
        return <img className="iconDetail"
                    src={props.downloadPath}
                    alt={props.alt} />;
    } else {
        return null;
    }
};

CustomImage.propTypes = {
    downloadPath: PropTypes.string.isRequired,
    isImgDefault: PropTypes.bool,
    alt: PropTypes.string,
};

export default CustomImage;