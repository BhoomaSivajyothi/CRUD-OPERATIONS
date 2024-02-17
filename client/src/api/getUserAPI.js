import { USER_API } from "../util/constant";

export const getUserAPI = async () => {
  try {
    const res = await fetch(USER_API, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    const resJson = await error.json();
    return resJson;
  }
};
