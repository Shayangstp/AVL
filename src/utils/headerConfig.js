const token = localStorage.getItem("token");
export const headerConfig = {
  headers: { Authorization: `Bearer ${token}` },
};
