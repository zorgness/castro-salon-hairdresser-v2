const myHeader = new Headers({
  "Content-Type": "application/x-www-form-urlencoded",
  "Access-Control-Allow-Origin": "*",
});
const init = {
  method: "GET",
  headers: myHeader,
  mode: "cors",
};

const urlMain = process.env.REACT_APP_URL_MAIN;
const urlTextIntro = `${urlMain}/api/text_intros`;

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
