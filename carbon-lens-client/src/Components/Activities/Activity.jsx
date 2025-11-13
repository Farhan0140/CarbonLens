import { useForm } from "react-hook-form";
import apiClient from "../../services/apiClient";
import { useState } from "react";

const Activity = ({ styles, categories }) => {

  const {
    register,
    handleSubmit,
    formState:{
      errors,
    }
  } = useForm();

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post("/activities/", {
        name: data.activityName,
        category: data.selectedCategory
      });

      if(response) {
        console.log(response.data);
      } else {
        console.log("error form Activity.jsx");
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
          <label style={styles.label}>Activity Name</label>
          <div style={styles.grid2}>
            <div>
              <input
                type="text"
                placeholder="(e.g., Food West)"
                style={styles.inputField}
                {
                  ...register("activityName", {required:true})
                }
              />
              {
                errors.activityName && <span className="text-red-600">* This field is required</span>
              }
            </div>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Activity Category</label>

          <select 
            style={styles.inputField}
            {
              ...register("selectedCategory", {required:true})
            }
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option value={category.key} key={index}>
                {category.label}
              </option>
            ))}
          </select>
          {
            errors.selectedCategory && <span className="text-red-600">* This field is required</span>
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
            isLoading? <span className="loading loading-dots loading-lg"></span> : "Add Activity"
          }
        </button>
      </div>
    </form>
  );
};

export default Activity;
