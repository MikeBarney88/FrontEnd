const API_BASE_URL = "http://localhost:8080/api";

export const treeApi = {
  createTree: async (numbers, balanced = false) => {
    const response = await fetch(`${API_BASE_URL}/trees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        numbers,
        balanced,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create tree");
    }

    return await response.json();
  },

  getAllTrees: async () => {
    const response = await fetch(`${API_BASE_URL}/trees`);

    if (!response.ok) {
      throw new Error("Failed to fetch trees");
    }

    return await response.json();
  },

  getTreeById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/trees/${id}`);

    if (!response.ok) {
      throw new Error(`Tree with ID ${id} not found`);
    }

    return await response.json();
  },

  deleteTree: async (id) => {
    const response = await fetch(`${API_BASE_URL}/trees/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete tree with ID ${id}`);
    }

    return await response.json();
  },
};
