import React from 'react';
import '../styles/StatusDisplay.css';
import { ElevatorStatus } from '../api/interfaces';

const StatusDisplay: React.FC<ElevatorStatus> = ({
  currentFloor,
  isMoving,
  doorsOpen,
  direction,
  queue
}) => {
  const getDirectionIcon = () => {
    switch(direction) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '◌';
    }
  };

  return (
    <div className="status-display">
      <h3>Estado Actual</h3>
      
      <div className="status-grid">
        <div className="status-item">
          <span>Piso Actual:</span>
          <span className="value">{currentFloor}</span>
        </div>
        
        <div className="status-item">
          <span>Movimiento:</span>
          <span className={`value ${isMoving ? 'moving' : 'stopped'}`}>
            {isMoving ? 'En Movimiento' : 'Detenido'}
          </span>
        </div>
        
        <div className="status-item">
          <span>Puertas:</span>
          <span className={`value ${doorsOpen ? 'open' : 'closed'}`}>
            {doorsOpen ? 'Abiertas' : 'Cerradas'}
          </span>
        </div>
        
        <div className="status-item">
          <span>Dirección:</span>
          <span className={`value direction-${direction}`}>
            {getDirectionIcon()} {direction === 'up' ? 'Subiendo' : direction === 'down' ? 'Bajando' : 'Inactivo'}
          </span>
        </div>
      </div>
      
      <div className="queue-section">
        <h4>Cola de Solicitudes:</h4>
        {queue.length > 0 ? (
          <div className="queue-items">
            {queue.map((floor, index) => (
              <span key={index} className="queue-item">
                Piso {floor}
              </span>
            ))}
          </div>
        ) : (
          <p className="empty-queue">No hay solicitudes en cola</p>
        )}
      </div>
    </div>
  );
};

export default StatusDisplay;