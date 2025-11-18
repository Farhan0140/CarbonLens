import { useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../services/apiClient";

const DeviceActivity = ({styles}) => {

  const {
    register,
    handleSubmit,
    reset,
    formState:{
      errors,
    }
  } = useForm();

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addAnotherActivity, setAddAnotherActivity] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post("/devices/", {
        name: data.deviceName,
        wattage: data.deviceWattage
      });

      if(response) {
        reset();
        setAddAnotherActivity(true);
      } else {
        console.log("error form Device.jsx");
      }
    } catch (error) {
      console.log(error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "2px" }}>
      <div style={styles.stepContent} className="w-full">
        {
          hasError && <div className="text-red-600">* The fields name, category must make a unique set. Try Again..</div>
        }
        <div style={styles.formGroup}>
          <label style={styles.label}>Device Name</label>
          <div style={styles.grid2}>
            <div>
              <input
                type="text"
                placeholder="(e.g., Light, Fan...)"
                style={styles.inputField}
                {
                  ...register("deviceName", {required:true})
                }
              />
              {
                errors.deviceName && <span className="text-red-600">* This field is required</span>
              }
            </div>
          </div>
        </div>


        <div style={styles.formGroup}>
          <label style={styles.label}>Device Wattage</label>
          <div style={styles.grid2}>
            <div>
              <input
                type="number"
                placeholder="(e.g., W = 23; W >= 1)"
                min={1}
                style={styles.inputField}
                {
                  ...register("deviceWattage", {required:true})
                }
              />
              {
                errors.deviceWattage && <span className="text-red-600">* This field is required</span>
              }
            </div>
          </div>
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
            isLoading? <span className="loading loading-dots loading-lg"></span> : "Add Device"
          }
        </button>
        {
          addAnotherActivity && <span className="text-gray-500 block mt-5">If You Want to add another Device, refill the form again and add it</span>
        }
      </div>
    </form>
  );
};

export default DeviceActivity;