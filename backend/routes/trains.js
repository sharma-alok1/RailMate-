const express = require('express');
const TrainController = require('../controllers/trainController');

const router = express.Router();

// Get all trains
router.get('/', TrainController.getAllTrains);

// Search trains by source and destination
router.get('/search', TrainController.searchTrains);

// Get train by number
router.get('/number/:trainNumber', TrainController.getTrainByNumber);

// Get trains by type
router.get('/type/:type', TrainController.getTrainsByType);

// Get trains to a specific destination
router.get('/destination/:destination', TrainController.getTrainsToDestination);

// Get seat availability
router.get('/availability', TrainController.getSeatAvailability);

// Get fare information
router.get('/fare', TrainController.getFare);

// Get station information
router.get('/station', TrainController.getStationInfo);

// Get all stations
router.get('/stations', TrainController.getAllStations);

// Get running days for a train
router.get('/running-days/:trainNumber', TrainController.getRunningDays);

// Check if train runs on a specific day
router.get('/running-check', TrainController.checkTrainRunning);

module.exports = router;
