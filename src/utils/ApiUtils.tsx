export const fetchRegions = async () => {
    try {
      const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/regions");
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch regions", error);
      return [];
    }
  };
  
  export const fetchCities = async () => {
    try {
      const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/cities");
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch cities", error);
      return [];
    }
};
  
  export const fetchAgents = async () => {
    const token = '9d040684-0d70-417e-8eb3-3ffdfa7dca5c';
    try {
      const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/agents', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching agents:', error);
      return [];
    }
};

export const fetchListings = async () => {
  const token = '9d040684-0d70-417e-8eb3-3ffdfa7dca5c';
    try {
      const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Add token here
          }
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
  } catch (error) {
      console.error('Error fetching listings:', error);
      return [];
  }
}
  