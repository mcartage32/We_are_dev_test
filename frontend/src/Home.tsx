import React from 'react';
import StatusDisplay from './components/StatusDisplay';
import ElevatorPanel from './components/ElevatorPanel';
import FloorButtons from './components/FloorButtons';
import { 
  useElevatorStatusQuery,
  useCallElevatorMutation,
  useControlDoorsMutation,
  useControlMovementMutation
} from './api/ElevatorApi';
import './styles/Home.css';

const Home: React.FC = () => {
  const { 
    data: elevatorStatus, 
    isLoading, 
    error 
  } = useElevatorStatusQuery();
  
  const { mutate: callElevator } = useCallElevatorMutation();
  const { mutate: controlDoors } = useControlDoorsMutation();
  const { mutate: controlMovement } = useControlMovementMutation();

  if (isLoading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">Error al cargar el estado del ascensor</div>;
  if (!elevatorStatus) return <div className="error">No se pudo obtener el estado del ascensor</div>;

  return (
    <div className="home-container">
      <h1>Sistema de Control de Ascensor</h1>
      
      <div className="control-panel">
        <StatusDisplay {...elevatorStatus} />
        
        <div className="control-section">
          <FloorButtons 
            currentFloor={elevatorStatus.currentFloor} 
            onCallElevator={callElevator} 
          />
          <ElevatorPanel 
            onControlDoors={controlDoors}
            onControlMovement={controlMovement}
            doorsOpen={elevatorStatus.doorsOpen}
            isMoving={elevatorStatus.isMoving}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;