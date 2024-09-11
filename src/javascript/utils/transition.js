export const triggerTransition = (callback) => {
  document.body.classList.add("is-changing");

  setTimeout(() => {
    document.body.classList.remove("is-changing");
    if (callback) callback();
  }, 40); // Durée totale de la transition
};
