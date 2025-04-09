import React from 'react';
import '../styles/FloorButtons.css';

interface FloorButtonsProps {
  currentFloor: number;
  onCallElevator: (floor: number) => void;
}

const floors = [0, 1, 2, 3, 4, 5];

const FloorButtons: React.FC<FloorButtonsProps> = ({ currentFloor, onCallElevator }) => {
  return (
    <div className="floor-buttons">
      <h3>Selección de Piso</h3>
      <div className="buttons-grid">
        {floors.map(floor => (
          <button
            key={floor}
            onClick={() => onCallElevator(floor)}
            className={`floor-button ${floor === currentFloor ? 'current-floor' : ''}`}
            disabled={floor === currentFloor}
          >
            {floor}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloorButtons;