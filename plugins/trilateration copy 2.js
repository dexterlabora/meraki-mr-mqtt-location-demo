/*
 * This file is part of the Trilateration package.
 *
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * @author Matias Gutierrez <soporte@tbmsp.net>
 * @file Trilateration.js
 *
 * Project home:
 *   https://github.com/tbmsp/trilateration
 *
 */
const Compute = function (position1, position2, position3) {
    var xa = position1.x;
    var ya = position1.y;
    var xb = position2.x;
    var yb = position2.y;
    var xc = position3.x;
    var yc = position3.y;
    var ra = position1.r;
    var rb = position2.r;
    var rc = position3.r;

    var S = (Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0;
    var T = (Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0;
    var y = ((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa)));
    var x = ((y * (ya - yb)) - T) / (xb - xa);

    return {
        x: x,
        y: y
    };
}

module.exports = Compute
