import axios from "axios";

const GOAL_URL = "http://localhost:9000/api/goals/";

const goalService = {
  create: async (goal, token) => {
    const config = {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${GOAL_URL}`, goal, config);
    return response.data;
  },
  get: async (token) => {
    const config = {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${GOAL_URL}`, config);
    return response.data;
  },
  delete: async (id, token) => {
    const config = {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`${GOAL_URL}${id}`, config);
    return response.data;
  },
};

export default goalService;
