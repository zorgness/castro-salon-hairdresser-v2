import { fetchDataWithMethod } from "../../Api/FetchDataWithMethod";
import {
  DELETE,
  urlBlogPosts,
  urlTextIntros,
  urlMessage,
} from "../../config.js";

export const galleryDestroy = async (idBlogPost) => {
  const url = urlBlogPosts + "/" + idBlogPost;

  const options = {};

  const fetchedData = await fetchDataWithMethod(url, DELETE, options);

  return fetchedData;
};

export const textIntroDestroy = async (idTextIntro) => {
  const url = urlTextIntros + "/" + idTextIntro;

  const options = {};

  const fetchedData = await fetchDataWithMethod(url, DELETE, options);

  return fetchedData;
};

export const messageDestroy = async (idMessage) => {
  const url = urlMessage + "/" + idMessage;

  const options = {};

  const fetchedData = await fetchDataWithMethod(url, DELETE, options);

  return fetchedData;
};
