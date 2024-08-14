import { useRef } from "react";

export const SORT_SPEED = 250;

export default function useBubbleSortSpeed() {
  const speedRef = useRef(1);

  const calculateSpeed = (speed: number) => {
    switch (speed) {
      case 0.5:
        return 0.75;

      case 1:
        return 1.5;

      case 1.5:
        return 2;

      case 2:
        return 3;

      case 3:
        return 4;

      case 4:
        return 0.5;

      default:
        return 1;
    }
  };

  return { speedRef, calculateSpeed };
}
