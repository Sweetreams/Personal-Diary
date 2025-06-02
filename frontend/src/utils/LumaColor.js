export const HEXtoRGB = (hex) => {
  return [parseInt(hex[1] + hex[2], 16), parseInt(hex[3] + hex[4], 16), parseInt(hex[5] + hex[6], 16)]
}

const Csrgb = (color) => {
  return color/255
}

export const Luma = (RGB) => {
  const C = []
  for(let i = 0; i < 3; i++){
    if(Csrgb(RGB[i]) > 0.03928){
      C.push(Math.pow(((Csrgb(RGB[i]) + 0.055)/1.055), 2.4))
    } else {
             C.push(Csrgb(RGB[i])/12.92)
             }
  }
  
  return (0.2126*C[0] + 0.7152*C[1] + 0.0722*C[2])*100
}
