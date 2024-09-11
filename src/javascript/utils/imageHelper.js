const images = import.meta.glob(
  "/src/assets/images/jeuxVidéos/*.(png|jpe?g|svg|webp|jpg)",
  { eager: true }
);

export const getImageUrl = (filename) => {
  const path = `/src/assets/images/jeuxVidéos/${filename}`;
  if (path in images) {
    return images[path].default;
  }
  console.error(`Image not found: ${filename}`);
  return "";
};
