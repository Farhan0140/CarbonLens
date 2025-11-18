import { useState } from 'react';
import { ChevronLeft, Car, Smartphone, Activity } from 'lucide-react';
import { useNavigate } from 'react-router';
import TrackDeviceActivity from '../Components/TrackActivities/TrackDeviceActivity';
import TrackOtherActivities from '../Components/TrackActivities/TrackOtherActivities';
import TrackVehiclesActivity from '../Components/TrackActivities/TrackVehiclesActivity';

export default function TrackActivities() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const steps = [
    { id: 0, title: 'Activities', icon: Activity },
    { id: 1, title: 'Devices', icon: Smartphone },
    { id: 2, title: 'Vehicles', icon: Car }
  ];

  const goToPrevious = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentStep(prev => Math.min(steps.length - 1, prev + 1));
  };

  const NavigateDashboard = () => {
    navigate("/user-dashboard");
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <TrackOtherActivities styles={styles} />;
      case 1:
        return <TrackDeviceActivity styles={styles} />
      case 2:
        return <TrackVehiclesActivity styles={styles} />
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidthContainer}>

        {/* Progress Steps */}
        <div style={styles.progressContainer}>
          <div style={styles.progressSteps}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;
              
              const stepCircleStyle = {
                ...styles.stepCircle,
                backgroundColor: isActive 
                  ? '#3498db' 
                  : isCompleted 
                    ? '#27ae60' 
                    : '#bdc3c7',
                color: isActive || isCompleted ? 'white' : '#7f8c8d',
                boxShadow: isActive ? '0 4px 12px rgba(52, 152, 219, 0.4)' : 'none'
              };

              const stepLabelStyle = {
                ...styles.stepLabel,
                color: isActive ? '#3498db' : '#7f8c8d'
              };

              return (
                <div key={step.id} style={styles.step}>
                  <div style={stepCircleStyle}>
                    <Icon size={20} />
                  </div>
                  <span style={stepLabelStyle}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.formContainer}  className=' bg-linear-to-br from-blue-50 to-green-50 '>
          {/* Decorative background elements */}
          <div style={styles.decoration1}></div>
          <div style={styles.decoration2}></div>

          {/* Step Content */}
          <div style={styles.contentWrapper}>
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          
          <div style={styles.navButtons}>
            <button
              onClick={goToPrevious}
              disabled={currentStep === 0}
              style={{
                ...styles.btn,
                ...styles.btnPrev,
                opacity: currentStep === 0 ? 0.5 : 1,
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={20} style={{ marginRight: '8px' }} />
              Previous
            </button>

            <div style={styles.progressDots}>
              {steps.map((_, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.dot,
                    backgroundColor: currentStep === index ? '#3498db' : '#bdc3c7'
                  }}
                />
              ))}
            </div>

            <button
              onClick={currentStep === steps.length - 1 ? NavigateDashboard : goToNext}
              style={{
                ...styles.btn,
                backgroundColor: currentStep === steps.length - 1 ? '#27ae60' : '#3498db',
                ':hover': {
                  backgroundColor: currentStep === steps.length - 1 ? '#219a52' : '#2980b9'
                }
              }}
            >
              {currentStep === steps.length - 1 ? 'Go to Dashboard' : 'Next'}
              {currentStep < steps.length - 1 && (
                <ChevronLeft size={20} style={{ marginLeft: '8px', transform: 'rotate(180deg)' }} />
              )}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e6f3ff, #ffffff, #f5f0ff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  maxWidthContainer: {
    width: '100%',
    maxWidth: '1100px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  headerTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '10px'
  },
  headerSubtitle: {
    color: '#7f8c8d',
    fontSize: '1.1rem'
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '48px'
  },
  progressSteps: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px'
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  stepCircle: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  stepLabel: {
    fontSize: '0.875rem',
    fontWeight: '600',
    transition: 'color 0.3s ease'
  },
  formContainer: {
    // background: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    padding: '48px',
    position: 'relative',
    overflow: 'hidden'
  },
  decoration1: {
    position: 'absolute',
    top: '-40px',
    right: '-40px',
    width: '128px',
    height: '128px',
    background: 'rgba(52, 152, 219, 0.1)',
    borderRadius: '50%'
  },
  decoration2: {
    position: 'absolute',
    bottom: '-32px',
    left: '-32px',
    width: '96px',
    height: '96px',
    background: 'rgba(155, 89, 182, 0.1)',
    borderRadius: '50%'
  },
  contentWrapper: {
    transition: 'opacity 0.5s ease, transform 0.5s ease'
  },
  stepContent: {
    transition: 'opacity 0.5s ease, transform 0.5s ease'
  },
  formGroup: {
    marginBottom: '24px'
  },
  label: {
    display: 'block',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '8px'
  },
  inputField: {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    color: '#000000',
    backgroundColor: '#ffffff'
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px'
  },
  checkboxGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginTop: '8px'
  },
  checkboxItem: {
    display: 'flex',
    alignItems: 'center'
  },
  checkbox: {
    marginRight: '8px',
    width: '18px',
    height: '18px',
    accentColor: '#3498db'
  },
  checkboxLabel: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#34495e',
    margin: 0
  },
  navButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '40px'
  },
  btn: {
    padding: '14px 28px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'white'
  },
  btnPrev: {
    background: 'transparent',
    color: '#7f8c8d',
    padding: '14px 24px'
  },
  progressDots: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    transition: 'background 0.3s ease'
  },
  footer: {
    textAlign: 'center',
    marginTop: '32px'
  },
  footerText: {
    color: '#7f8c8d',
    fontSize: '0.95rem'
  },
  signInButton: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: '600',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '6px'
  }
};
