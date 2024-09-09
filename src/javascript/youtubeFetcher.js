// Cette fonction est une simulation. Dans une vraie implémentation,
// elle ferait un appel à l'API YouTube.
export const fetchLatestVideoId = async () => {
  // Simule un délai de réseau
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Retourne un ID de vidéo fixe pour le moment
  return "_EGLbuy7GzU";
};
