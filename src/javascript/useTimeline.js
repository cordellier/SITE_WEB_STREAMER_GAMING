import { useState, useEffect } from "react";

const useTimeline = (timelineRef) => {
  const [activePeriodIndex, setActivePeriodIndex] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const timelinePoints = timeline.querySelectorAll(".timeline-point");
    const timelineCards = timeline.querySelectorAll(".timeline-card");

    const setActiveStates = () => {
      timelinePoints.forEach((point, index) => {
        point.classList.toggle("active", index === activePeriodIndex);
      });

      timelineCards.forEach((card, index) => {
        card.classList.toggle("active", index === activeCardIndex);
      });
    };

    const handlePointClick = (index) => {
      setActivePeriodIndex(index);
      setActiveCardIndex(index);
    };

    timelinePoints.forEach((point, index) => {
      point.addEventListener("click", () => handlePointClick(index));
    });

    setActiveStates();

    return () => {
      // Cleanup event listeners
      timelinePoints.forEach((point, index) => {
        point.removeEventListener("click", () => handlePointClick(index));
      });
    };
  }, [timelineRef, activePeriodIndex, activeCardIndex]);

  return [
    activePeriodIndex,
    activeCardIndex,
    setActivePeriodIndex,
    setActiveCardIndex,
  ];
};

export default useTimeline;
