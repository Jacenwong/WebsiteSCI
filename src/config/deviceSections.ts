// Section type definition
type Section = {
  id: string;
  camPos: [number, number, number];
  lookAt?: [number, number, number];
  labelPos: [number, number, number];
  title: string;
  body: string;
};

export const deviceSections: Section[] = [
  {
    id: "overview",
    camPos: [0, 1.5, 6],
    lookAt: [0, 0, 0],
    labelPos: [0, 1.2, 0],
    title: "Rebo Device",
    body: "Revolutionary stroke rehabilitation device that provides 10-15 lbs of lift capacity with EMG sensor integration for personalized assistance."
  },
  {
    id: "elbow",
    camPos: [1.2, 1.1, 2.8],
    lookAt: [0.2, 0.9, 0.0],
    labelPos: [0.4, 0.9, 0.1],
    title: "Elbow Assist Motor",
    body: "High-torque BLDC motor with smart current-limiting and thermal monitoring. Provides smooth, controlled assistance for elbow flexion and extension."
  },
  {
    id: "sensors",
    camPos: [-1.4, 1.4, 2.2],
    lookAt: [-0.2, 1.0, 0.0],
    labelPos: [-0.3, 1.0, 0.05],
    title: "EMG Sensors",
    body: "Dry electrodes with adaptive filtering (notch + bandpass + SSC) for precise muscle activity detection and machine learning adaptation."
  },
  {
    id: "controller",
    camPos: [0.0, 2.2, 3.0],
    lookAt: [0.0, 1.2, 0.0],
    labelPos: [0.0, 1.6, 0.2],
    title: "Smart Controller",
    body: "Onboard MCU with IMU fusion, failsafes, and quick-release clutch. Ensures safety with 2× safety factor for advertised carrying capacity."
  },
  {
    id: "range",
    camPos: [0.8, 0.8, 3.5],
    lookAt: [0.1, 0.5, 0.0],
    labelPos: [0.2, 0.5, 0.1],
    title: "110° Range of Motion",
    body: "Full range of motion support with automatic disengagement for natural movement patterns and enhanced safety during rehabilitation."
  }
];

