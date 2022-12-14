export const checkDataAgeToCleanLocaleStorage = (date) => {
  const today = new Date(Date.now()).getDate();
  const dataDate = new Date(parseInt(date)).getDate();

  if (today - dataDate >= 0.05) {
    localStorage.clear();
    localStorage.setItem("storageDateHome", Date.now());
  }
};
