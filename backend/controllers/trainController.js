const trainService = require('../services/trainService');

class TrainController {
  // Get all trains
  static async getAllTrains(req, res) {
    try {
      const trains = trainService.trains;
      
      res.status(200).json({
        success: true,
        count: trains.length,
        trains: trains
      });
    } catch (error) {
      console.error('Error getting all trains:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch trains'
      });
    }
  }

  // Search trains by source and destination
  static async searchTrains(req, res) {
    try {
      const { source, destination, date } = req.query;
      
      if (!source || !destination) {
        return res.status(400).json({
          success: false,
          error: 'Source and destination are required'
        });
      }

      const trains = trainService.searchTrains(source, destination, date);
      
      if (trains.error) {
        return res.status(400).json({
          success: false,
          error: trains.error
        });
      }

      res.status(200).json({
        success: true,
        source,
        destination,
        date: date || 'Not specified',
        count: trains.length,
        trains: trains
      });
    } catch (error) {
      console.error('Error searching trains:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to search trains'
      });
    }
  }

  // Get train by number
  static async getTrainByNumber(req, res) {
    try {
      const { trainNumber } = req.params;
      
      if (!trainNumber) {
        return res.status(400).json({
          success: false,
          error: 'Train number is required'
        });
      }

      const train = trainService.getTrainByNumber(trainNumber);
      
      if (!train) {
        return res.status(404).json({
          success: false,
          error: 'Train not found'
        });
      }

      res.status(200).json({
        success: true,
        train: train
      });
    } catch (error) {
      console.error('Error getting train by number:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch train'
      });
    }
  }

  // Get trains by type
  static async getTrainsByType(req, res) {
    try {
      const { type } = req.params;
      
      if (!type) {
        return res.status(400).json({
          success: false,
          error: 'Train type is required'
        });
      }

      const trains = trainService.getTrainsByType(type);
      
      res.status(200).json({
        success: true,
        type,
        count: trains.length,
        trains: trains
      });
    } catch (error) {
      console.error('Error getting trains by type:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch trains by type'
      });
    }
  }

  // Get trains to a specific destination
  static async getTrainsToDestination(req, res) {
    try {
      const { destination } = req.params;
      
      if (!destination) {
        return res.status(400).json({
          success: false,
          error: 'Destination is required'
        });
      }

      const trains = trainService.getTrainsToDestination(destination);
      
      if (trains.error) {
        return res.status(400).json({
          success: false,
          error: trains.error
        });
      }

      res.status(200).json({
        success: true,
        destination,
        count: trains.length,
        trains: trains
      });
    } catch (error) {
      console.error('Error getting trains to destination:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch trains to destination'
      });
    }
  }

  // Get seat availability
  static async getSeatAvailability(req, res) {
    try {
      const { trainId, date } = req.query;
      
      if (!trainId) {
        return res.status(400).json({
          success: false,
          error: 'Train ID is required'
        });
      }

      const availability = trainService.getAvailability(trainId, date || new Date());
      
      res.status(200).json({
        success: true,
        trainId,
        date: date || new Date().toISOString().split('T')[0],
        availability: availability
      });
    } catch (error) {
      console.error('Error getting seat availability:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch seat availability'
      });
    }
  }

  // Get fare information
  static async getFare(req, res) {
    try {
      const { source, destination, className } = req.query;
      
      if (!source || !destination) {
        return res.status(400).json({
          success: false,
          error: 'Source and destination are required'
        });
      }

      const fare = trainService.getFare(source, destination, className);
      
      if (fare.error) {
        return res.status(400).json({
          success: false,
          error: fare.error
        });
      }

      res.status(200).json({
        success: true,
        ...fare
      });
    } catch (error) {
      console.error('Error getting fare:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch fare information'
      });
    }
  }

  // Get station information
  static async getStationInfo(req, res) {
    try {
      const { query } = req.query;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          error: 'Station query is required'
        });
      }

      const station = trainService.getStationInfo(query);
      
      if (!station) {
        return res.status(404).json({
          success: false,
          error: 'Station not found'
        });
      }

      res.status(200).json({
        success: true,
        station: station
      });
    } catch (error) {
      console.error('Error getting station info:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch station information'
      });
    }
  }

  // Get all stations
  static async getAllStations(req, res) {
    try {
      const stations = trainService.stations;
      
      res.status(200).json({
        success: true,
        count: stations.length,
        stations: stations
      });
    } catch (error) {
      console.error('Error getting all stations:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch stations'
      });
    }
  }

  // Get running days for a train
  static async getRunningDays(req, res) {
    try {
      const { trainNumber } = req.params;
      
      if (!trainNumber) {
        return res.status(400).json({
          success: false,
          error: 'Train number is required'
        });
      }

      const runningDays = trainService.getRunningDays(trainNumber);
      
      if (!runningDays) {
        return res.status(404).json({
          success: false,
          error: 'Train not found'
        });
      }

      res.status(200).json({
        success: true,
        trainNumber,
        runningDays: runningDays
      });
    } catch (error) {
      console.error('Error getting running days:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch running days'
      });
    }
  }

  // Check if train runs on a specific day
  static async checkTrainRunning(req, res) {
    try {
      const { trainNumber, day } = req.query;
      
      if (!trainNumber || !day) {
        return res.status(400).json({
          success: false,
          error: 'Train number and day are required'
        });
      }

      const isRunning = trainService.checkTrainRunning(trainNumber, day);
      
      res.status(200).json({
        success: true,
        trainNumber,
        day,
        isRunning: isRunning
      });
    } catch (error) {
      console.error('Error checking train running:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to check train running status'
      });
    }
  }
}

module.exports = TrainController;
