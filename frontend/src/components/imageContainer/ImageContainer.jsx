import React from 'react'
import sunImage from "/sun.png"
import "./imageContainer.css"
const ImageContainer = () => {
    return (
        <div className="containerLeft">
            <div className="opacityBackgroundGradient"></div>
            <div className="containerImage">
                <img className="imageSun" role="presentation" loading="lazy" aria-hidden="true" src={sunImage} />
            </div>
        </div>
    )
}

export default React.memo(ImageContainer)