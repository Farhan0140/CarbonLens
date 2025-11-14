import { useForm } from "react-hook-form";
import apiClient from "../../services/apiClient";
import { useEffect, useState } from "react";

const Activity = ({ styles, getDoneActivity }) => {

  const {
    register,
    handleSubmit,
    reset,
    formState:{
      errors,
    }
  } = useForm();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await apiClient.get("/activities/categories/");
        if(response) {
          setCategories(response.data);
        } else {
          console.log("error from activity categories");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addAnotherActivity, setAddAnotherActivity] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post("/activities/", {
        name: data.activityName,
        category: data.selectedCategory
      });

      if(response) {
        reset();
        setAddAnotherActivity(true);
        getDoneActivity();
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
        {
          addAnotherActivity && <span className="text-gray-500 block mt-5">If You Want to add another activity, refill the form again and add it</span>
        }
      </div>
    </form>
  );
};

export default Activity;
