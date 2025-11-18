import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

const useActivities = () => {
  
  const [activities, setActivities] = useState([]);
  const [devices, setDevices] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [activityIds, setActivityIds] = useState([]);
  const [totalActivityEmission, setTotalActivityEmission] = useState(0.00);
  const [totalDevicesEmission, setTotalDevicesEmission] = useState(0.00); 
  const [totalVehiclesEmission, setTotalVehiclesEmission] = useState(0.00);

  useEffect(() => {
    (
      async () => {
        try {
          const response = await apiClient.get("/activities/");
          setActivities(response.data);
          const ids = response.data.map(item => item.id);
          setActivityIds(ids);
          
          const response1 = await apiClient.get("/devices/");
          setDevices(response1.data);

          const response2 = await apiClient.get("/vehicles/");
          setVehicles(response2.data);

        } catch (error) {
          console.log("Error From get Activities", error);
        }
      }
    )()
  }, []);

  useEffect(() => {
    if (activityIds.length === 0) return;
    (
      async () => {
        let totalCo2 = 0.0;

        for(const id of activityIds) {
          const response = await apiClient.get(`/activities/${id}/records/`);
          const totalForThisId = response.data.reduce(
            (sum, item) => sum + item.co2_emission,
            0
          );

          totalCo2 += totalForThisId;
        }
        setTotalActivityEmission(totalCo2);
      }
    )()
  }, [activityIds]);

  useEffect(() => {
    const totalCo2 = devices.reduce((deviceCo2, device) => {
      const usageCo2 = device.usages.reduce(
        (s, u) => s + u.co2_emission,
        0
      );
      return deviceCo2 + usageCo2;
    }, 0);

    setTotalDevicesEmission(totalCo2);
  }, [devices])

  useEffect(() => {
    const totalCo2 = vehicles.reduce((vehiclesCo2, vehicle) => {
      const usageCo2 = vehicle.usages.reduce(
        (s, u) => s + u.co2_emission,
        0
      );
      return vehiclesCo2 + usageCo2;
    }, 0);

    setTotalVehiclesEmission(totalCo2);
  }, [vehicles])

  return {
    activities,
    devices,
    totalActivityEmission,
    totalDevicesEmission,
    totalVehiclesEmission,
  }
};

export default useActivities;