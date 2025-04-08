import React from 'react'

const ImageContainer = () => {
    return (
        <>
            <div className="containerLeft" style={{ width: '50%' }}>
                <div className="containerImage" style={{ background: 'linear-gradient(130deg,#FBEECE, #EAEECA)', height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    <img className="imageSun" src="../../../sun.png" alt="" style={{ height: '50vh', width: '50vh', position: 'absolute', zIndex: 2 }} />
                </div>
            </div>
        </>
    )
}

export default ImageContainer