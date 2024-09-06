import { useState, useEffect } from "react";

const useTimeline = (timelineRef) => {
  const [activePeriodIndex, setActivePeriodIndex] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const periods = timeline.querySelectorAll(".periods-container section");
    const cards = timeline.querySelectorAll(".cards-container section");
    const timelineItems = timeline.querySelectorAll(".timeline ol li");

    const setActiveStates = () => {
      periods.forEach((period, index) => {
        period.classList.toggle("active", index === activePeriodIndex);
        period.classList.toggle("prev", index === activePeriodIndex - 1);
        period.classList.toggle("next", index === activePeriodIndex + 1);
      });

      cards.forEach((card, index) => {
        card.classList.toggle("active", index === activeCardIndex);
        card.classList.toggle("prev", index === activeCardIndex - 1);
        card.classList.toggle("next", index === activeCardIndex + 1);
      });

      timelineItems.forEach((item, index) => {
        item.classList.toggle("active", index === activeCardIndex);
      });
    };

    const handlePeriodClick = (index) => {
      setActivePeriodIndex(index);
      setActiveCardIndex(index);
    };

    const handleCardClick = (index) => {
      setActiveCardIndex(index);
      setActivePeriodIndex(index);
    };

    periods.forEach((period, index) => {
      period.addEventListener("click", () => handlePeriodClick(index));
    });

    cards.forEach((card, index) => {
      card.addEventListener("click", () => handleCardClick(index));
    });

    timelineItems.forEach((item, index) => {
      item.addEventListener("click", () => handleCardClick(index));
    });

    setActiveStates();

    return () => {
      // Cleanup event listeners
      periods.forEach((period, index) => {
        period.removeEventListener("click", () => handlePeriodClick(index));
      });
      cards.forEach((card, index) => {
        card.removeEventListener("click", () => handleCardClick(index));
      });
      timelineItems.forEach((item, index) => {
        item.removeEventListener("click", () => handleCardClick(index));
      });
    };
  }, [timelineRef, activePeriodIndex, activeCardIndex]);

  return [activePeriodIndex, activeCardIndex];
};

export default useTimeline;
