import axios from "axios";

const baseUrl = "https://api.intern.d-tt.nl/api/houses";

export const createListing = (formData, apiKey) => {
  return axios.post(baseUrl, formData, {
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateListing = (id, formData, apiKey) => {
  return axios.post(`${baseUrl}/${id}`, formData, {
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadImage = (id, image, apiKey) => {
  const formData = new FormData();
  formData.append("image", image, image.name);

  return fetch(`${baseUrl}/${id}/upload`, {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
    },
    body: formData,
  });
};
