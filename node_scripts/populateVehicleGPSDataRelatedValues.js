const mongoose = require('mongoose');
require('../DB/DbConnection');
const {
    GPSDataModel
} = require('../model/GpsLocation/GPSDataModel');
const {
    VehicleModel
} = require('../model/GpsLocation/VehicleModel');
const fixLastLocation = async()=> {
    return await VehicleModel.find()
        .select('deviceIMEI')


        // .exec(async (error, vehicles) => {
        //     if (error || !vehicles) {
        //         console.log('An error occurred in retrieving vehicles.');
        //         return;
        //     }
        //     for (let index = 0; index < vehicles.length; index++) {
        //         const vehicle = vehicles[index];
        //         vehicle.gpsDataCount = await GPSDataModel.countDocuments({
        //             IMEI: vehicle.deviceIMEI,
        //         }).exec();
        //         const lastLocation = await GPSDataModel.findOne({
        //             IMEI: vehicle.deviceIMEI,
        //         })
        //             .sort({ date: -1 })
        //             .limit(1)
        //             .exec();
        //         vehicle.lastLocation = lastLocation ? lastLocation._id : null;
        //         await vehicle.save();
        //         console.log(index, vehicle);
        //     }
        // });
}

if (require.main === module) {
    fixLastLocation().then(mongoose.disconnect);
}

module.exports = { fixLastLocation };
