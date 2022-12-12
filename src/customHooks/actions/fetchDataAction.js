import { checkDataAgeToCleanLocaleStorage } from "../../cleanStorage/CleanStorage";

// const myHeader = new Headers({
//   "Content-Type": "application/x-www-form-urlencoded",
//   "Access-Control-Allow-Origin": "*",
// });
// const init = {
//   method: "GET",
//   headers: myHeader,
//   // mode: "cors",
// };

const urlMain = process.env.REACT_APP_URL_MAIN;
const urlTextIntro = `${urlMain}/api/text_intros`;
const urlGallery = `${urlMain}/api/blog_posts`;
const imagePath = process.env.REACT_APP_AWS_S3_URL;

const checkStorageDate = () => {
  if (localStorage.getItem("storageDateHome")) {
    const date = localStorage.getItem("storageDateHome");
    checkDataAgeToCleanLocaleStorage(date);
  }
};

export const fetchTextIntro = () => {
  checkStorageDate();
  if (localStorage.getItem("infoIndex")) {
    return Promise.resolve().then(function () {
      return JSON.parse(localStorage.getItem("infoIndex"));
    });
  } else {
    return fetch(urlTextIntro)
      .then((response) => response.json())
      .then((data) => {
        if (data["hydra:member"].length > 0) {
          localStorage.setItem(
            "infoIndex",
            JSON.stringify(data["hydra:member"])
          );
          if (!localStorage.getItem("storageDateHome")) {
            localStorage.setItem("storageDateHome", Date.now());
          }
          return data["hydra:member"];
        } else {
          return Promise.reject(new Error(`Aucun Text Intro trouvé`));
        } // ERROR DU JSON()
      })
      .catch((error) => {
        return Promise.reject(new Error(`Pas de Text Intro trouvé`));
      }); // ERROR APPEL API
  }
};

export const fetchTextIntroImage = (imageId) => {
  checkStorageDate();
  if (localStorage.getItem(`infoIndexImage${imageId}`)) {
    return Promise.resolve().then(function () {
      return JSON.parse(localStorage.getItem(`infoIndexImage${imageId}`));
    });
  } else {
    return fetch(urlMain + imageId)
      .then((response) => response.json())
      .then((data) => {
        if (data.name.length > 0) {
          localStorage.setItem(
            `infoIndexImage${imageId}`,
            JSON.stringify(imagePath + data.name)
          );
          if (!localStorage.getItem("storageDateHome")) {
            localStorage.setItem("storageDateHome", Date.now());
          }
          return imagePath + data.name;
        } else {
          return Promise.reject(new Error(`Aucune Cover image trouvé`));
        } // ERROR DU JSON()
      })
      .catch((error) => {
        return Promise.reject(new Error(`Pas de Cover image trouvé`));
      }); // ERROR APPEL API
  }
};

export const fetchGalleriesData = () => {
  checkStorageDate();
  if (localStorage.getItem("infoGalleries")) {
    return Promise.resolve().then(function () {
      return JSON.parse(localStorage.getItem("infoGalleries"));
    });
  } else {
    return fetch(urlGallery)
      .then((response) => response.json())
      .then((data) => {
        if (data["hydra:member"].length > 0) {
          localStorage.setItem(
            "infoGalleries",
            JSON.stringify(data["hydra:member"])
          );
          if (!localStorage.getItem("storageDateHome")) {
            localStorage.setItem("storageDateHome", Date.now());
          }
          return data["hydra:member"];
        } else {
          return Promise.reject(new Error(`Aucun Text Intro trouvé`));
        } // ERROR DU JSON()
      })
      .catch((error) => {
        return Promise.reject(new Error(`Pas de Text Intro trouvé`));
      }); // ERROR APPEL API
  }
};

export const fetchGallery = (galleryId) => {
  checkStorageDate();
  if (localStorage.getItem(`infoGallery${galleryId}`)) {
    return Promise.resolve().then(function () {
      return JSON.parse(localStorage.getItem(`infoGallery${galleryId}`));
    });
  } else {
    return fetch(urlGallery + "/" + galleryId)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          localStorage.setItem(`infoGallery${galleryId}`, JSON.stringify(data));
          if (!localStorage.getItem("storageDateHome")) {
            localStorage.setItem("storageDateHome", Date.now());
          }
          return data;
        } else {
          return Promise.reject(
            new Error(`Aucune gallerie trouvé avec ${galleryId}`)
          );
        } // ERROR DU JSON()
      })
      .catch((error) => {
        return Promise.reject(
          new Error(`Pas de gallerie trouvé avec ${galleryId}`)
        );
      }); // ERROR APPEL API
  }
};

export const fetchGalleryImages = (galleryId) => {
  checkStorageDate();
  if (localStorage.getItem(`infoGalleryImage${galleryId}`)) {
    return Promise.resolve().then(function () {
      return JSON.parse(localStorage.getItem(`infoGalleryImage${galleryId}`));
    });
  } else {
    return fetch(urlGallery + "/" + galleryId + "/product_images")
      .then((response) => response.json())
      .then((data) => {
        if (data["hydra:member"].length > 0) {
          localStorage.setItem(
            `infoGalleryImage${galleryId}`,
            JSON.stringify(data["hydra:member"])
          );
          if (!localStorage.getItem("storageDateHome")) {
            localStorage.setItem("storageDateHome", Date.now());
          }
          return data["hydra:member"];
        } else {
          return Promise.reject(
            new Error(`Aucune images trouvé pour la gallery ${galleryId}`)
          );
        } // ERROR DU JSON()
      })
      .catch((error) => {
        return Promise.reject(
          new Error(`Pas d'images trouvé pour la gallery ${galleryId}`)
        );
      }); // ERROR APPEL API
  }
};
