// export const BASE_URL ="https://devtinder-backend-m9al.onrender.com" || "http://localhost:3000";
// export const BASE_URL ="https://devtinder-backnd.onrender.com" || "http://localhost:3000";
export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://devtinder-backend-6b8o.onrender.com";


