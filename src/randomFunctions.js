// to do random generator for xCoord and yCoord
export function generateXCoord (gameWidth, objWidth){
   return Math.floor(Math.random() * (gameWidth - objWidth)) + objWidth;
}

export function generateYCoord (objHeight){
    let value = Math.floor(Math.random() * (2 * objHeight));
    value = -value;
    return  value;
}