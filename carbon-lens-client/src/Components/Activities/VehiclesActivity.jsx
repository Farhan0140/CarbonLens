import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../services/apiClient";


const VehiclesActivity = ({styles, getDoneVehicles}) => {

  const {
    register,
    handleSubmit,
    reset,
    formState:{
      errors,
    }
  } = useForm();

  const [fuelTypes, setFuelTypes] = useState([]);
  const [vehicleType, setVehicleType] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response1 = await apiClient.get("/vehicles/fuel_type/");
        const response2 = await apiClient.get("/vehicles/vehicle_type/");

        if(response1 && response2) {

          setFuelTypes(response1.data);
          setVehicleType(response2.data);

        } else {
          console.log("error from activity categories");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addAnotherActivity, setAddAnotherActivity] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {

      const response = await apiClient.post("/vehicles/", {
        name: data.vehicleName,
        vehicle_type: data.vehicleType,
        fuel_type: data.fuelType,
        mileage: data.mileage
      });

      if(response) {
        reset();
        setAddAnotherActivity(true);
        getDoneVehicles();
      } else {
        console.log("error form Activity.jsx");
      }

    } catch (error) {
      console.log(error);
      setHasError(true);
      setErrorMsg("* The fields name, category must make a unique set. Try Again..")
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "2px" }}>
      <div style={styles.stepContent} className="w-full">
        {
          hasError && <div className="text-red-600">{errorMsg}</div>
        }

        <div style={styles.formGroup}>
        <label style={styles.label}>
          Vehicle Name
        </label>
        <div style={styles.grid2}>
          <div>
            <input
              type="text"
              placeholder="(e.g., Camry)"
              style={styles.inputField}
              {
                ...register("vehicleName", {required:true})
              }
            />
            {
              errors.vehicleName && <span className="text-red-600">* This field is required</span>
            }
          </div>
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>
          Vehicle Type & Fuel Type
        </label>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <select 
              style={styles.inputField}
              {
                ...register("vehicleType", {required:true})
              }
            >
              <option value="">Vehicle Types</option>
              {
                vehicleType?.map((vehicle, index) => (
                  <option value={vehicle.key} key={index}>{vehicle.label}</option>
                ))
              }
            </select>
            {
              errors.vehicleType && <span className="text-red-600">* This field is required</span>
            }
          </div>
          <div>
            <select 
              style={styles.inputField}
              {
                ...register("fuelType", {required:true})
              }
            >
              <option value="">Fuel Types</option>
              {
                fuelTypes?.map((fuel, index) => (
                  <option value={fuel.key} key={index}>{fuel.label}</option>
                ))
              }
            </select>
            {
              errors.fuelType && <span className="text-red-600">* This field is required</span>
            }
          </div>
        </div>

      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>
          Mileage
        </label>
        <input
          type="number"
          placeholder="(e.g., 30 km/l)"
          style={styles.inputField}
          {
            ...register("mileage", {required:true})
          }
        />
        {
          errors.mileage && <span className="text-red-600">* This field is required</span>
        }
      </div>

        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            ...styles.btn,
            backgroundColor: '#27ae60',
            ':hover': {
              backgroundColor: '#219a52'
            }
          }}
        >
          {
            isLoading? <span className="loading loading-dots loading-lg"></span> : "Add Vehicles"
          }
        </button>
        {
          addAnotherActivity && <span className="text-gray-500 block mt-5">If You Want to add another activity, refill the form again and add it</span>
        }
      </div>
    </form>
  );
};

export default VehiclesActivity;