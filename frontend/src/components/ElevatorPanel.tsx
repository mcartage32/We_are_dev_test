import React from 'react';
import { DoorAction, MovementAction } from '../api/interfaces';
import '../styles/ElevatorPanel.css';

interface ElevatorPanelProps {
  onControlDoors: (action: DoorAction) => void;
  onControlMovement: (action: MovementAction) => void;
  doorsOpen: boolean;
  isMoving: boolean;
}

const ElevatorPanel: React.FC<ElevatorPanelProps> = ({
  onControlDoors,
  onControlMovement,
  doorsOpen,
  isMoving
}) => {
  return (
    <div className="elevator-panel">
      <h3>Controles del Ascensor</h3>
      
      <div className="control-group">
        <h4>Puertas</h4>
        <div className="button-group">
          <button
            onClick={() => onControlDoors('open')}
            disabled={doorsOpen || isMoving}
            className={doorsOpen ? 'active' : ''}
          >
            Abrir Puertas
          </button>
          <button
            onClick={() => onControlDoors('close')}
            disabled={!doorsOpen}
            className={!doorsOpen ? 'active' : ''}
          >
            Cerrar Puertas
          </button>
        </div>
      </div>
      
      <div className="control-group">
        <h4>Movimiento</h4>
        <div className="button-group">
          <button
            onClick={() => onControlMovement('start')}
            disabled={isMoving || doorsOpen}
            className={isMoving ? 'active' : ''}
          >
            Iniciar
          </button>
          <button
            onClick={() => onControlMovement('stop')}
            disabled={!isMoving}
            className={!isMoving ? 'active' : ''}
          >
            Detener
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElevatorPanel;