export function generateXCoord (gameWidth, objWidth){
   return Math.floor(Math.random() * (gameWidth - objWidth)) + objWidth;
}

export function generateYCoord (objHeight){
    // value has to be - so the bottles spawn outside of the view
    let value = Math.floor(Math.random() * (20 * objHeight));
    value = -value;
    return  value;
}