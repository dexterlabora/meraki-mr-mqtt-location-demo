
var trilat = require('trilat');
 
// var input = [
//     //      X     Y     R
//         [ 0.0,  0.0, 10.0],
//         [10.0, 10.0, 10.0],
//         [10.0,  0.0, 14.142135]
//     ];
    
    

// const Compute = function (position1, position2, position3) {
//     let input = [
//         [position1.x, position1.y, position1,r],
//         [position2.x, position2.y, position2,r],
//         [position3.x, position3.y, position3,r]
//     ]
//     var output = trilat(input);
//     return output
// }

module.exports = function (position1, position2, position3) {
    let input = [
        [position1.x, position1.y, position1,r],
        [position2.x, position2.y, position2,r],
        [position3.x, position3.y, position3,r]
    ]
    var output = trilat(input);
    return output
}