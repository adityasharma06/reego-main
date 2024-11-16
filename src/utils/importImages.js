// src/utils/importImages.js
function importAll(r) {
    let images = {};
    r.keys().forEach((item) => {
      images[item.replace('./', '')] = r(item);
    });
    return images;
  }
  
  const images = importAll(require.context('../images', false, /\.(jpg|jpeg|png)$/));
  
  export default images;
  