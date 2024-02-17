import { USER_API } from "../util/constant";

export const updateUserAPI = async (payload,activUserid) => {
  try {
    const res = await fetch(USER_API+`${activUserid}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    const resJson = await error.json();
    return resJson;
  }
};
