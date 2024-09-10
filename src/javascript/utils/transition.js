export const triggerTransition = (callback) => {
  document.body.classList.add("is-changing");

  setTimeout(() => {
    document.body.classList.remove("is-changing");
    if (callback) callback();
  }, 20); // Durée totale de la transition
};
