
 //import { Circle, Vector, laterate } from "lateration";
 // var math = require("mathjs");
// getLateration: function(beacons) {
    //   console.log("beacons", beacons);
    //   beacons.map(b => {
    //     b.lat = b.mrLat;
    //   });
    //   beacons.map(b => {
    //     b.lng = b.mrLng;
    //   });

    //   if (beacons.length < 3) {
    //     return;
    //   }
    //   if (!beacons[0].lat || !beacons[1].lat || !beacons[2].lat) {
    //     return;
    //   }
    //   if (!beacons[0].lng || !beacons[1].lng || !beacons[2].lng) {
    //     return;
    //   }
    //   // https://gist.github.com/richard-flosi/8c4ade400188d1c91e8964ff3211d091
    //   console.log("lateration time");
    //   // #assuming elevation = 0
    //   var earthR = 6371,
    //     rad = function(deg) {
    //       return deg * (math.pi / 180);
    //     },
    //     deg = function(rad) {
    //       return rad * (180 / math.pi);
    //     };

    //   // #using authalic sphere
    //   // #if using an ellipsoid this step is slightly different
    //   // #Convert geodetic Lat/Long to ECEF xyz
    //   // #   1. Convert Lat/Long to radians
    //   // #   2. Convert Lat/Long(radians) to ECEF
    //   var P1 = [
    //     earthR *
    //       (math.cos(rad(beacons[0].lat)) * math.cos(rad(beacons[0].lng))),
    //     earthR *
    //       (math.cos(rad(beacons[0].lat)) * math.sin(rad(beacons[0].lng))),
    //     earthR * math.sin(rad(beacons[0].lat))
    //   ];

    //   var P2 = [
    //     earthR *
    //       (math.cos(rad(beacons[1].lat)) * math.cos(rad(beacons[1].lng))),
    //     earthR *
    //       (math.cos(rad(beacons[1].lat)) * math.sin(rad(beacons[1].lng))),
    //     earthR * math.sin(rad(beacons[1].lat))
    //   ];

    //   var P3 = [
    //     earthR *
    //       (math.cos(rad(beacons[2].lat)) * math.cos(rad(beacons[2].lng))),
    //     earthR *
    //       (math.cos(rad(beacons[2].lat)) * math.sin(rad(beacons[2].lng))),
    //     earthR * math.sin(rad(beacons[2].lat))
    //   ];

    //   // #from wikipedia
    //   // #transform to get circle 1 at origin
    //   // #transform to get circle 2 on x axis
    //   var ex = math.divide(
    //     math.subtract(P2, P1),
    //     math.norm(math.subtract(P2, P1))
    //   );
    //   var i = math.dot(ex, math.subtract(P3, P1));

    //   var ey = math.divide(
    //     math.subtract(math.subtract(P3, P1), math.multiply(i, ex)),
    //     math.norm(math.subtract(math.subtract(P3, P1), math.multiply(i, ex)))
    //   );

    //   var ez = math.cross(ex, ey);
    //   var d = math.norm(math.subtract(P2, P1));
    //   var j = math.dot(ey, math.subtract(P3, P1));

    //   // #from wikipedia
    //   // #plug and chug using above values
    //   var x =
    //     (math.pow(beacons[0].distance, 2) -
    //       math.pow(beacons[1].distance, 2) +
    //       math.pow(d, 2)) /
    //     (2 * d);
    //   var y =
    //     (math.pow(beacons[0].distance, 2) -
    //       math.pow(beacons[2].distance, 2) +
    //       math.pow(i, 2) +
    //       math.pow(j, 2)) /
    //       (2 * j) -
    //     (i / j) * x;

    //   // # only one case shown here
    //   //
    //   // I was having problems with the number in the radical being negative,
    //   // so I took the absolute value. Not sure if this is always going to work
    //   var z = math.sqrt(
    //     math.abs(
    //       math.pow(beacons[0].distance, 2) - math.pow(x, 2) - math.pow(y, 2)
    //     )
    //   );

    //   // #triPt is an array with ECEF x,y,z of trilateration point
    //   var triPt = math.add(
    //     math.add(math.add(P1, math.multiply(x, ex)), math.multiply(y, ey)),
    //     math.multiply(z, ez)
    //   );

    //   // #convert back to lat/long from ECEF
    //   // #convert to degrees
    //   var lat = deg(math.asin(math.divide(triPt[2], earthR)));
    //   var lng = deg(math.atan2(triPt[1], triPt[0]));
    //   console.log("getLateration lat, lng", lat, lng);
    //   //return [lat, lon];
    //   return {
    //     lat: lat,
    //     lng: lng
    //   };
    // },
    // getLateration: function(records){
    //   let beacons = [];
    //   records.forEach(r => {
    //     if(!typeof r.distance === 'number'){return}

    //     console.log('getLateration records', records)
    //     beacons.push(new Circle(new Vector(r.mrLat, r.mrLng), r.distance))
    //   })

    //   // The beacons
    //   // const beacons = [
    //   //   new Circle(new Vector(0, 1), 5.89),
    //   //   new Circle(new Vector(4, 7), 4.62),
    //   //   new Circle(new Vector(4, 5), 2.73)
    //   // ];

    //   // Laterating
    //   if(records.length < 3){return}
    //   console.log('getLateration beacons', beacons)

    //   return laterate(beacons);
    // },

module.exports = ToDo
