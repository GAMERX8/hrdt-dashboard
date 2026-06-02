// Mock data and API helper functions for HRDT Dashboard
// Simulates database queries and data processing

export const specialties = [
  'Pediatría',
  'Cardiología',
  'Ginecología',
  'Medicina Interna',
  'Cirugía General',
  'UCI (Cuidados Intensivos)',
  'Emergencias'
];

export const contracts = [
  'Nombrado',
  'Contratado CAS',
  'Residente / Externo'
];

export const mockMedicalStaff = [
  // Pediatría
  { id: 1, name: 'Dr. Alejandro Ruiz', gender: 'Male', age: 34, specialty: 'Pediatría', contract: 'Contratado CAS', hours: 160, consultations: 210, performance: 'Excelente', status: 'Activo', saturation: 'Moderada' },
  { id: 2, name: 'Dra. María Mendoza', gender: 'Female', age: 41, specialty: 'Pediatría', contract: 'Nombrado', hours: 180, consultations: 245, performance: 'Excelente', status: 'Activo', saturation: 'Alta' },
  { id: 3, name: 'Dr. Carlos Paz', gender: 'Male', age: 29, specialty: 'Pediatría', contract: 'Residente / Externo', hours: 220, consultations: 180, performance: 'Bueno', status: 'Guardia', saturation: 'Alta' },
  { id: 4, name: 'Dra. Sofía Castro', gender: 'Female', age: 48, specialty: 'Pediatría', contract: 'Nombrado', hours: 120, consultations: 115, performance: 'Satisfactorio', status: 'Vacaciones', saturation: 'Adecuada' },
  { id: 5, name: 'Dr. Jorge Luna', gender: 'Male', age: 31, specialty: 'Pediatría', contract: 'Contratado CAS', hours: 160, consultations: 195, performance: 'Bueno', status: 'Activo', saturation: 'Moderada' },
  
  // Cardiología
  { id: 6, name: 'Dr. Roberto Torres', gender: 'Male', age: 52, specialty: 'Cardiología', contract: 'Nombrado', hours: 140, consultations: 130, performance: 'Excelente', status: 'Activo', saturation: 'Moderada' },
  { id: 7, name: 'Dra. Elena Gómez', gender: 'Female', age: 38, specialty: 'Cardiología', contract: 'Contratado CAS', hours: 160, consultations: 175, performance: 'Excelente', status: 'Activo', saturation: 'Moderada' },
  { id: 8, name: 'Dr. Luis Silva', gender: 'Male', age: 28, specialty: 'Cardiología', contract: 'Residente / Externo', hours: 200, consultations: 140, performance: 'Bueno', status: 'Guardia', saturation: 'Alta' },
  { id: 9, name: 'Dra. Lucía Ferrer', gender: 'Female', age: 61, specialty: 'Cardiología', contract: 'Nombrado', hours: 90, consultations: 75, performance: 'Satisfactorio', status: 'Licencia', saturation: 'Adecuada' },

  // Ginecología
  { id: 10, name: 'Dra. Patricia Ortiz', gender: 'Female', age: 45, specialty: 'Ginecología', contract: 'Nombrado', hours: 170, consultations: 280, performance: 'Excelente', status: 'Activo', saturation: 'Alta' },
  { id: 11, name: 'Dr. Fernando Ríos', gender: 'Male', age: 37, specialty: 'Ginecología', contract: 'Contratado CAS', hours: 160, consultations: 190, performance: 'Bueno', status: 'Activo', saturation: 'Moderada' },
  { id: 12, name: 'Dra. Gabriela Vega', gender: 'Female', age: 30, specialty: 'Ginecología', contract: 'Residente / Externo', hours: 180, consultations: 160, performance: 'Excelente', status: 'Guardia', saturation: 'Moderada' },
  { id: 13, name: 'Dr. Hugo Flores', gender: 'Male', age: 55, specialty: 'Ginecología', contract: 'Nombrado', hours: 130, consultations: 120, performance: 'Bueno', status: 'Vacaciones', saturation: 'Adecuada' },

  // Medicina Interna
  { id: 14, name: 'Dr. Daniel Vargas', gender: 'Male', age: 43, specialty: 'Medicina Interna', contract: 'Nombrado', hours: 160, consultations: 180, performance: 'Bueno', status: 'Activo', saturation: 'Moderada' },
  { id: 15, name: 'Dra. Carmen Salazar', gender: 'Female', age: 49, specialty: 'Medicina Interna', contract: 'Nombrado', hours: 160, consultations: 190, performance: 'Excelente', status: 'Activo', saturation: 'Moderada' },
  { id: 16, name: 'Dr. Pedro Domínguez', gender: 'Male', age: 32, specialty: 'Medicina Interna', contract: 'Contratado CAS', hours: 180, consultations: 210, performance: 'Excelente', status: 'Guardia', saturation: 'Alta' },
  { id: 17, name: 'Dra. Natalia Morales', gender: 'Female', age: 27, specialty: 'Medicina Interna', contract: 'Residente / Externo', hours: 210, consultations: 150, performance: 'Bueno', status: 'Activo', saturation: 'Alta' },

  // Cirugía General
  { id: 18, name: 'Dr. Miguel Benítez', gender: 'Male', age: 50, specialty: 'Cirugía General', contract: 'Nombrado', hours: 180, consultations: 110, performance: 'Excelente', status: 'Activo', saturation: 'Alta' },
  { id: 19, name: 'Dr. Andrés Delgado', gender: 'Male', age: 39, specialty: 'Cirugía General', contract: 'Contratado CAS', hours: 170, consultations: 95, performance: 'Excelente', status: 'Guardia', saturation: 'Moderada' },
  { id: 20, name: 'Dra. Claudia Rivas', gender: 'Female', age: 33, specialty: 'Cirugía General', contract: 'Contratado CAS', hours: 160, consultations: 85, performance: 'Bueno', status: 'Activo', saturation: 'Adecuada' },
  { id: 21, name: 'Dr. Javier Ortega', gender: 'Male', age: 29, specialty: 'Cirugía General', contract: 'Residente / Externo', hours: 230, consultations: 120, performance: 'Por mejorar', status: 'Activo', saturation: 'Alta' },

  // UCI
  { id: 22, name: 'Dr. Gustavo Herrera', gender: 'Male', age: 47, specialty: 'UCI (Cuidados Intensivos)', contract: 'Nombrado', hours: 190, consultations: 80, performance: 'Excelente', status: 'Activo', saturation: 'Alta' },
  { id: 23, name: 'Dra. Isabel Cárdenas', gender: 'Female', age: 42, specialty: 'UCI (Cuidados Intensivos)', contract: 'Nombrado', hours: 170, consultations: 70, performance: 'Excelente', status: 'Guardia', saturation: 'Moderada' },
  { id: 24, name: 'Dr. Marcos Fuentes', gender: 'Male', age: 35, specialty: 'UCI (Cuidados Intensivos)', contract: 'Contratado CAS', hours: 180, consultations: 75, performance: 'Bueno', status: 'Activo', saturation: 'Alta' },
  { id: 25, name: 'Dra. Paola Ramos', gender: 'Female', age: 30, specialty: 'UCI (Cuidados Intensivos)', contract: 'Residente / Externo', hours: 200, consultations: 65, performance: 'Bueno', status: 'Vacaciones', saturation: 'Alta' },

  // Emergencias
  { id: 26, name: 'Dr. Ricardo Marín', gender: 'Male', age: 36, specialty: 'Emergencias', contract: 'Contratado CAS', hours: 180, consultations: 320, performance: 'Excelente', status: 'Activo', saturation: 'Alta' },
  { id: 27, name: 'Dra. Valeria Espinoza', gender: 'Female', age: 33, specialty: 'Emergencias', contract: 'Contratado CAS', hours: 180, consultations: 310, performance: 'Excelente', status: 'Guardia', saturation: 'Alta' },
  { id: 28, name: 'Dr. Emilio Pardo', gender: 'Male', age: 44, specialty: 'Emergencias', contract: 'Nombrado', hours: 160, consultations: 240, performance: 'Bueno', status: 'Activo', saturation: 'Moderada' },
  { id: 29, name: 'Dra. Rosa Prado', gender: 'Female', age: 31, specialty: 'Emergencias', contract: 'Residente / Externo', hours: 210, consultations: 280, performance: 'Excelente', status: 'Guardia', saturation: 'Alta' },
  { id: 30, name: 'Dr. Francisco Valle', gender: 'Male', age: 26, specialty: 'Emergencias', contract: 'Residente / Externo', hours: 220, consultations: 290, performance: 'Bueno', status: 'Activo', saturation: 'Alta' },
];

/**
 * Simulates an API call to fetch medical staff data.
 * Ready to be replaced by a fetch('/api/staff') or similar call.
 */
export const fetchMedicalStaff = async (filters = {}) => {
  // Simulate network latency (200ms)
  await new Promise(resolve => setTimeout(resolve, 200));

  let filteredData = [...mockMedicalStaff];

  if (filters.specialty && filters.specialty !== 'All') {
    filteredData = filteredData.filter(doc => doc.specialty === filters.specialty);
  }

  if (filters.contract && filters.contract !== 'All') {
    filteredData = filteredData.filter(doc => doc.contract === filters.contract);
  }

  if (filters.gender && filters.gender !== 'All') {
    filteredData = filteredData.filter(doc => doc.gender === filters.gender);
  }

  return filteredData;
};

/**
 * Computes general metrics based on a medical staff dataset
 */
export const calculateKPIs = (data) => {
  if (data.length === 0) {
    return {
      totalStaff: 0,
      maleCount: 0,
      femaleCount: 0,
      avgAge: 0,
      avgAgeMale: 0,
      avgAgeFemale: 0,
      avgHours: 0,
      maxHours: 0,
      minHours: 0,
      avgConsultations: 0,
      maxConsultations: 0,
      minConsultations: 0
    };
  }

  const totalStaff = data.length;
  const maleCount = data.filter(d => d.gender === 'Male').length;
  const femaleCount = data.filter(d => d.gender === 'Female').length;

  const avgAge = Math.round(data.reduce((sum, d) => sum + d.age, 0) / totalStaff);
  
  const maleDoctors = data.filter(d => d.gender === 'Male');
  const femaleDoctors = data.filter(d => d.gender === 'Female');
  const avgAgeMale = maleDoctors.length > 0 ? Math.round(maleDoctors.reduce((sum, d) => sum + d.age, 0) / maleDoctors.length) : 0;
  const avgAgeFemale = femaleDoctors.length > 0 ? Math.round(femaleDoctors.reduce((sum, d) => sum + d.age, 0) / femaleDoctors.length) : 0;

  const totalHours = data.reduce((sum, d) => sum + d.hours, 0);
  const avgHours = parseFloat((totalHours / totalStaff).toFixed(1));
  const maxHours = Math.max(...data.map(d => d.hours));
  const minHours = Math.min(...data.map(d => d.hours));

  const totalConsultations = data.reduce((sum, d) => sum + d.consultations, 0);
  const avgConsultations = parseFloat((totalConsultations / totalStaff).toFixed(1));
  const maxConsultations = Math.max(...data.map(d => d.consultations));
  const minConsultations = Math.min(...data.map(d => d.consultations));

  return {
    totalStaff,
    maleCount,
    femaleCount,
    avgAge,
    avgAgeMale,
    avgAgeFemale,
    avgHours,
    maxHours,
    minHours,
    avgConsultations,
    maxConsultations,
    minConsultations
  };
};

/**
 * Gets age group distribution by gender (for charts)
 */
export const getAgeGenderDistribution = (data) => {
  const bins = {
    '20-29': { Male: 0, Female: 0 },
    '30-39': { Male: 0, Female: 0 },
    '40-49': { Male: 0, Female: 0 },
    '50-59': { Male: 0, Female: 0 },
    '>60': { Male: 0, Female: 0 }
  };

  data.forEach(doc => {
    let group = '>60';
    if (doc.age >= 20 && doc.age <= 29) group = '20-29';
    else if (doc.age >= 30 && doc.age <= 39) group = '30-39';
    else if (doc.age >= 40 && doc.age <= 49) group = '40-49';
    else if (doc.age >= 50 && doc.age <= 59) group = '50-59';

    if (bins[group]) {
      bins[group][doc.gender]++;
    }
  });

  return Object.keys(bins).map(key => ({
    rango: key,
    Masculino: bins[key].Male,
    Femenino: bins[key].Female
  }));
};

/**
 * Gets contract distribution (for donut chart)
 */
export const getContractDistribution = (data) => {
  const counts = {};
  contracts.forEach(c => { counts[c] = 0; });
  
  data.forEach(doc => {
    if (counts[doc.contract] !== undefined) {
      counts[doc.contract]++;
    }
  });

  return Object.keys(counts).map(key => ({
    name: key,
    value: counts[key]
  }));
};

/**
 * Gets performance distribution (for donut/pie chart)
 */
export const getPerformanceDistribution = (data) => {
  const ratings = ['Excelente', 'Bueno', 'Satisfactorio', 'Por mejorar'];
  const counts = {};
  ratings.forEach(r => { counts[r] = 0; });

  data.forEach(doc => {
    if (counts[doc.performance] !== undefined) {
      counts[doc.performance]++;
    }
  });

  return Object.keys(counts).map(key => ({
    name: key,
    value: counts[key]
  }));
};

/**
 * Gets availability/status distribution (for bar chart)
 */
export const getStatusDistribution = (data) => {
  const states = ['Activo', 'Guardia', 'Vacaciones', 'Licencia'];
  const counts = {};
  states.forEach(s => { counts[s] = 0; });

  data.forEach(doc => {
    if (counts[doc.status] !== undefined) {
      counts[doc.status]++;
    }
  });

  return Object.keys(counts).map(key => ({
    name: key,
    cantidad: counts[key]
  }));
};

/**
 * Gets workload/saturation distribution (for bar chart)
 */
export const getWorkloadDistribution = (data) => {
  const workloads = ['Alta', 'Moderada', 'Adecuada'];
  const counts = {};
  workloads.forEach(w => { counts[w] = 0; });

  data.forEach(doc => {
    if (counts[doc.saturation] !== undefined) {
      counts[doc.saturation]++;
    }
  });

  return Object.keys(counts).map(key => ({
    name: key,
    cantidad: counts[key]
  }));
};

/**
 * Simulates submitting login credentials.
 */
export const loginUser = async (username, password) => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Latency
  if (username === 'admin' && password === 'admin') {
    return { success: true, user: { username: 'admin', role: 'Administrador' } };
  }
  return { success: false, message: 'Usuario o contraseña incorrectos.' };
};
