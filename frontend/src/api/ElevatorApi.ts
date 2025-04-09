import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  ElevatorStatus, 
  DoorAction, 
  MovementAction, 
  ElevatorLog
} from "./interfaces";

// Configuración de axios
const apiElevator = axios.create({
  baseURL: "http://localhost:3000/",
});

export const useElevatorStatusQuery = () => {
  return useQuery<ElevatorStatus>({
    queryKey: ["elevatorStatus"],
    queryFn: async (): Promise<ElevatorStatus> => {
      const response = await apiElevator.get<ElevatorStatus>("elevator/status");
      return response.data;
    },
    refetchInterval: 2000, // Actualiza cada 2 segundos
  });
};

export const useCallElevatorMutation = () => {
  const queryClient = useQueryClient();  
  return useMutation({
    mutationKey: ["callElevator"],
    mutationFn: async (floor: number) => {
      const response = await apiElevator.post(
        "elevator/call", 
        { floor },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elevatorStatus"] });
    },
  });
};

export const useControlDoorsMutation = () => {
  const queryClient = useQueryClient();  
  return useMutation({
    mutationKey: ["controlDoors"],
    mutationFn: async (action: DoorAction) => {
      const response = await apiElevator.post(
        `elevator/doors/${action}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elevatorStatus"] });
    },
  });
};

export const useControlMovementMutation = () => {
  const queryClient = useQueryClient();  
  return useMutation({
    mutationKey: ["controlMovement"],
    mutationFn: async (action: MovementAction) => {
      const response = await apiElevator.post(
        `elevator/movement/${action}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["elevatorStatus"] });
    },
  });
};

export const useElevatorHistoryQuery = () => {
  return useQuery<ElevatorLog[]>({
    queryKey: ["elevatorHistory"],
    queryFn: async (): Promise<ElevatorLog[]> => {
      const response = await apiElevator.get<ElevatorLog[]>("elevator/logs");
      return response.data;
    },
  });
};