// Comprehensive Indian Railway Data Service
class TrainService {
  constructor() {
    this.trains = this.initializeTrains();
    this.stations = this.initializeStations();
    this.fares = this.initializeFares();
  }

  // Initialize comprehensive train data
  initializeTrains() {
    return [
      {
        id: "12951",
        name: "Rajdhani Express",
        number: "12951",
        type: "Rajdhani",
        source: "NDLS",
        destination: "BCT",
        sourceName: "New Delhi",
        destinationName: "Mumbai Central",
        departure: "16:55",
        arrival: "08:35",
        duration: "15h 40m",
        runningDays: ["Mon", "Wed", "Fri", "Sun"],
        classes: ["1A", "2A", "3A", "SL"],
        distance: 1384,
        avgSpeed: 88
      },
      {
        id: "12009",
        name: "Shatabdi Express",
        number: "12009",
        type: "Shatabdi",
        source: "NDLS",
        destination: "BCT",
        sourceName: "New Delhi",
        destinationName: "Mumbai Central",
        departure: "06:00",
        arrival: "23:55",
        duration: "17h 55m",
        runningDays: ["Daily"],
        classes: ["1A", "2A", "3A", "SL"],
        distance: 1384,
        avgSpeed: 77
      },
      {
        id: "12627",
        name: "Karnataka Express",
        number: "12627",
        type: "Express",
        source: "NDLS",
        destination: "SBC",
        sourceName: "New Delhi",
        destinationName: "Bangalore City",
        departure: "20:30",
        arrival: "05:30",
        duration: "33h 00m",
        runningDays: ["Daily"],
        classes: ["1A", "2A", "3A", "SL"],
        distance: 2367,
        avgSpeed: 72
      },
      {
        id: "12636",
        name: "Tamil Nadu Express",
        number: "12636",
        type: "Express",
        source: "NDLS",
        destination: "MAS",
        sourceName: "New Delhi",
        destinationName: "Chennai Central",
        departure: "22:30",
        arrival: "04:00",
        duration: "29h 30m",
        runningDays: ["Daily"],
        classes: ["1A", "2A", "3A", "SL"],
        distance: 2180,
        avgSpeed: 74
      },
      {
        id: "12301",
        name: "Rajdhani Express",
        number: "12301",
        type: "Rajdhani",
        source: "NDLS",
        destination: "HWH",
        sourceName: "New Delhi",
        destinationName: "Howrah",
        departure: "16:55",
        arrival: "10:00",
        duration: "17h 05m",
        runningDays: ["Mon", "Wed", "Fri", "Sun"],
        classes: ["1A", "2A", "3A", "SL"],
        distance: 1448,
        avgSpeed: 85
      },
      {
        id: "12019",
        name: "Shatabdi Express",
        number: "12019",
        type: "Shatabdi",
        source: "MAS",
        destination: "SBC",
        sourceName: "Chennai Central",
        destinationName: "Bangalore City",
        departure: "06:00",
        arrival: "13:00",
        duration: "7h 00m",
        runningDays: ["Daily"],
        classes: ["CC", "EC"],
        distance: 350,
        avgSpeed: 50
      },
      {
        id: "12621",
        name: "Tamil Nadu Express",
        number: "12621",
        type: "Express",
        source: "MAS",
        destination: "NDLS",
        sourceName: "Chennai Central",
        destinationName: "New Delhi",
        departure: "22:30",
        arrival: "04:00",
        duration: "29h 30m",
        runningDays: ["Daily"],
        classes: ["1A", "2A", "3A", "SL"],
        distance: 2180,
        avgSpeed: 74
      },
      {
        id: "12609",
        name: "Karnataka Express",
        number: "12609",
        type: "Express",
        source: "SBC",
        destination: "NDLS",
        sourceName: "Bangalore City",
        destinationName: "New Delhi",
        departure: "20:30",
        arrival: "05:30",
        duration: "33h 00m",
        runningDays: ["Daily"],
        classes: ["1A", "2A", "3A", "SL"],
        distance: 2367,
        avgSpeed: 72
      }
    ];
  }

  // Initialize station data with codes and names
  initializeStations() {
    return [
      { code: "NDLS", name: "New Delhi", city: "Delhi", state: "Delhi", zone: "NR" },
      { code: "BCT", name: "Mumbai Central", city: "Mumbai", state: "Maharashtra", zone: "WR" },
      { code: "MAS", name: "Chennai Central", city: "Chennai", state: "Tamil Nadu", zone: "SR" },
      { code: "SBC", name: "Bangalore City", city: "Bangalore", state: "Karnataka", zone: "SWR" },
      { code: "HWH", name: "Howrah", city: "Kolkata", state: "West Bengal", zone: "ER" },
      { code: "CSTM", name: "Chhatrapati Shivaji Terminus", city: "Mumbai", state: "Maharashtra", zone: "CR" },
      { code: "PNBE", name: "Patna Junction", city: "Patna", state: "Bihar", zone: "ECR" },
      { code: "LKO", name: "Lucknow Junction", city: "Lucknow", state: "Uttar Pradesh", zone: "NER" },
      { code: "JHS", name: "Jhansi Junction", city: "Jhansi", state: "Uttar Pradesh", zone: "NCR" },
      { code: "BPL", name: "Bhopal Junction", city: "Bhopal", state: "Madhya Pradesh", zone: "WCR" },
      { code: "JBP", name: "Jabalpur Junction", city: "Jabalpur", state: "Madhya Pradesh", zone: "WCR" },
      { code: "NGP", name: "Nagpur Junction", city: "Nagpur", state: "Maharashtra", zone: "CR" },
      { code: "PUNE", name: "Pune Junction", city: "Pune", state: "Maharashtra", zone: "CR" }
    ];
  }

  // Initialize fare structure
  initializeFares() {
    return {
      "NDLS-BCT": {
        "SL": 755,
        "3A": 1995,
        "2A": 2995,
        "1A": 5095
      },
      "NDLS-SBC": {
        "SL": 1295,
        "3A": 3495,
        "2A": 5195,
        "1A": 8995
      },
      "NDLS-MAS": {
        "SL": 1195,
        "3A": 3195,
        "2A": 4695,
        "1A": 7995
      },
      "NDLS-HWH": {
        "SL": 1095,
        "3A": 2895,
        "2A": 4295,
        "1A": 7295
      },
      "MAS-SBC": {
        "SL": 295,
        "3A": 795,
        "2A": 1195,
        "1A": 1995,
        "CC": 595,
        "EC": 995
      }
    };
  }

  // Search trains by source and destination
  searchTrains(source, destination, date = null) {
    const sourceCode = this.getStationCode(source);
    const destCode = this.getStationCode(destination);
    
    if (!sourceCode || !destCode) {
      return { error: "Invalid station names" };
    }

    const trains = this.trains.filter(train => 
      train.source === sourceCode && train.destination === destCode
    );

    // Add availability data if date is provided
    if (date) {
      trains.forEach(train => {
        train.availability = this.getAvailability(train.id, date);
      });
    }

    return trains;
  }

  // Get seat availability for a specific train and date
  getAvailability(trainId, date) {
    // Simulate availability data
    const availability = {};
    const classes = ["SL", "3A", "2A", "1A", "CC", "EC"];
    
    classes.forEach(cls => {
      availability[cls] = {
        available: Math.floor(Math.random() * 50) + 10,
        waiting: Math.floor(Math.random() * 20),
        rac: Math.floor(Math.random() * 10)
      };
    });

    return availability;
  }

  // Get fare information
  getFare(source, destination, className) {
    const sourceCode = this.getStationCode(source);
    const destCode = this.getStationCode(destination);
    
    if (!sourceCode || !destCode) {
      return { error: "Invalid station names" };
    }

    const routeKey = `${sourceCode}-${destCode}`;
    const reverseRouteKey = `${destCode}-${sourceCode}`;
    
    const fares = this.fares[routeKey] || this.fares[reverseRouteKey];
    
    if (!fares) {
      return { error: "Fare information not available for this route" };
    }

    if (className && fares[className]) {
      return {
        source: sourceCode,
        destination: destCode,
        className: className,
        fare: fares[className]
      };
    }

    return {
      source: sourceCode,
      destination: destCode,
      allFares: fares
    };
  }

  // Get station information by name or code
  getStationInfo(query) {
    const station = this.stations.find(s => 
      s.code.toLowerCase() === query.toLowerCase() ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.city.toLowerCase().includes(query.toLowerCase())
    );

    return station || null;
  }

  // Get station code by name
  getStationCode(stationName) {
    const station = this.getStationInfo(stationName);
    return station ? station.code : null;
  }

  // Get all trains to a destination
  getTrainsToDestination(destination) {
    const destCode = this.getStationCode(destination);
    
    if (!destCode) {
      return { error: "Invalid destination station" };
    }

    return this.trains.filter(train => train.destination === destCode);
  }

  // Get trains by type
  getTrainsByType(type) {
    return this.trains.filter(train => 
      train.type.toLowerCase() === type.toLowerCase()
    );
  }

  // Get train by number
  getTrainByNumber(trainNumber) {
    return this.trains.find(train => train.number === trainNumber);
  }

  // Get running days for a train
  getRunningDays(trainNumber) {
    const train = this.getTrainByNumber(trainNumber);
    return train ? train.runningDays : null;
  }

  // Check if train runs on a specific day
  checkTrainRunning(trainNumber, day) {
    const runningDays = this.getRunningDays(trainNumber);
    if (!runningDays) return false;
    
    const dayAbbr = day.substring(0, 3);
    return runningDays.includes(dayAbbr);
  }
}

module.exports = new TrainService();
