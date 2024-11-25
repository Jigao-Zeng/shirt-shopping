export const fetchClothInfo = async () => {
    try {
      const response = await fetch(
        "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cloth info");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error; // Optional: Rethrow error for further handling
    }
  };
