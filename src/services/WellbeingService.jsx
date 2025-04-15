/**
 * Service layer for wellbeing data
 * Contains mock data for development - replace with actual API calls in production
 */

// Mock data for wellbeing scores by year
const wellbeingScores = {
  2023: {
    score: 72,
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    scores: [68, 69, 70, 71, 72, 73, 74, 73, 72, 71, 72, 73],
    metrics: {
      health: 75,
      education: 70,
      economy: 65,
      environment: 78
    }
  },
  2022: {
    score: 68,
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    scores: [64, 65, 66, 67, 68, 69, 70, 69, 68, 67, 68, 69],
    metrics: {
      health: 70,
      education: 65,
      economy: 60,
      environment: 75
    }
  },
  2021: {
    score: 65,
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    scores: [61, 62, 63, 64, 65, 66, 67, 66, 65, 64, 65, 66],
    metrics: {
      health: 68,
      education: 63,
      economy: 58,
      environment: 70
    }
  }
};

// Mock GeoJSON data for Hartford neighborhoods
const neighborhoodGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Downtown",
        score: 78,
        population: 12000
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-72.68, 41.76], [-72.67, 41.76], [-72.67, 41.77], [-72.68, 41.77], [-72.68, 41.76]]]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Asylum Hill",
        score: 72,
        population: 9500
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-72.69, 41.76], [-72.68, 41.76], [-72.68, 41.77], [-72.69, 41.77], [-72.69, 41.76]]]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Frog Hollow",
        score: 65,
        population: 11000
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-72.68, 41.75], [-72.67, 41.75], [-72.67, 41.76], [-72.68, 41.76], [-72.68, 41.75]]]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "South Green",
        score: 68,
        population: 8500
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-72.68, 41.74], [-72.67, 41.74], [-72.67, 41.75], [-72.68, 41.75], [-72.68, 41.74]]]
      }
    }
  ]
};

/**
 * Fetches wellbeing score data for a specific year
 * @param {number} year
 * @returns {Promise} Resolves with wellbeing data
 */
export const getWellbeingScore = async (year) => {
  // In a real app, this would be an API call:
  // return fetch(`/api/wellbeing/${year}`).then(res => res.json());

  // Mock implementation:
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(wellbeingScores[year] || wellbeingScores[2023]);
    }, 500); // Simulate network delay
  });
};

/**
 * Fetches neighborhood GeoJSON data with wellbeing metrics
 * @param {number} year
 * @returns {Promise} Resolves with GeoJSON data
 */
export const getNeighborhoodData = async (year) => {
  // In a real app, this would be an API call:
  // return fetch(`/api/neighborhoods/${year}`).then(res => res.json());

  // Mock implementation:
  return new Promise((resolve) => {
    setTimeout(() => {
      // Adjust scores slightly based on year to show variation
      const adjustedData = {
        ...neighborhoodGeoJSON,
        features: neighborhoodGeoJSON.features.map(feature => ({
          ...feature,
          properties: {
            ...feature.properties,
            score: Math.min(100, Math.max(0,
                feature.properties.score + (year - 2023) * 2 // Slightly improve/decrease based on year
            ))
          }
        }))
      };
      resolve(adjustedData);
    }, 800); // Simulate network delay
  });
};

/**
 * Helper function to get available years
 * @returns {Array} Available years
 */
export const getAvailableYears = () => {
  return Object.keys(wellbeingScores).map(Number).sort((a, b) => b - a);
};