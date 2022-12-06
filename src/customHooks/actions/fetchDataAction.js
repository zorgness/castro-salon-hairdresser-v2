const myHeader = new Headers({
  "Content-Type": "application/x-www-form-urlencoded",
});
const init = {
  method: "GET",
  headers: myHeader,
  mode: "cors",
};

const urlMain = process.env.REACT_APP_URL_MAIN;
const urlTextIntro = `${urlMain}/api/text_intros`;
const imagePath = process.env.REACT_APP_AWS_S3_URL;

export const fetchTextIntroData = () => {
  return fetch(urlTextIntro, init)
    .then((response) => response.json())
    .then((data) => {
      if (data["hydra:member"].length > 0) {
        return data["hydra:member"];
      } else {
        return Promise.reject(new Error(`Aucun Text Intro trouvé`));
      } // ERROR DU JSON()
    })
    .catch((error) => {
      return Promise.reject(new Error(`Pas de Text Intro trouvé`));
    }); // ERROR APPEL API
};

export const fetchTextIntroImage = (imageId) => {
  return fetch(urlMain + imageId, init)
    .then((response) => response.json())
    .then((data) => {
      if (data.name.length > 0) {
        return imagePath + data.name;
      } else {
        return Promise.reject(new Error(`Aucune Cover image trouvé`));
      } // ERROR DU JSON()
    })
    .catch((error) => {
      return Promise.reject(new Error(`Pas de Cover image trouvé`));
    }); // ERROR APPEL API
};
