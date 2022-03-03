import axios from "axios";

const REGISTER_URL = "http://localhost:9000/api/users/register";
const LOGIN_URL = "http://localhost:9000/api/users/login";

const authService = {
  register: async (user) => {
    const response = await axios.post(REGISTER_URL, user);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },
  login: async (user) => {
    const response = await axios.post(LOGIN_URL, user);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },
  logOut: () => {
    localStorage.removeItem("user");
  },
};

// Register user
// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await fetch("http://localhost:9000/api/users/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       const result = await response.json();
//       if (result.error) {
//         return rejectWithValue(result.error);
//       }
//       return result;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// Login  user
// export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
//     try {
//         const response = await fetch("/api/users/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(credentials)
//         });
//         const data = await response.json();
//         if (data.error) {
//             return rejectWithValue(data.error);
//         }
//         return data;
//     } catch (error) {
//         return rejectWithValue(error);
//     }
// });

export default authService;
