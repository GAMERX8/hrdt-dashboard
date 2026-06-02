import React, { useState, useEffect } from 'react';
import {
  fetchMedicalStaff,
  calculateKPIs,
  getAgeGenderDistribution,
  getContractDistribution,
  getPerformanceDistribution,
  getStatusDistribution,
  getWorkloadDistribution,
  specialties,
  contracts
} from '../data/mockData';
import {
  Card,
  Metric,
  Text,
  Title,
  BarChart,
  DonutChart,
  AreaChart,
} from '@tremor/react';
import {
  Users,
  Activity,
  Calendar,
  Layers,
  LogOut,
  UserCheck,
  Clock,
  CheckSquare,
  RefreshCw,
  Info,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('demographics');
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedContract, setSelectedContract] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');

  // Fetch data
  const loadData = async () => {
    setLoading(true);
    const data = await fetchMedicalStaff({
      specialty: selectedSpecialty,
      contract: selectedContract,
      gender: selectedGender
    });
    setStaffData(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [selectedSpecialty, selectedContract, selectedGender]);

  const handleResetFilters = () => {
    setSelectedSpecialty('All');
    setSelectedContract('All');
    setSelectedGender('All');
  };

  // KPIs
  const kpis = calculateKPIs(staffData);

  // Chart data
  const ageDistribution = getAgeGenderDistribution(staffData);
  const contractDistribution = getContractDistribution(staffData);
  const performanceDistribution = getPerformanceDistribution(staffData);
  const statusDistribution = getStatusDistribution(staffData);
  const workloadDistribution = getWorkloadDistribution(staffData);

  // Tab items
  const sidebarItems = [
    { id: 'demographics', label: 'Demografía', icon: Users },
    { id: 'shifts', label: 'Guardias y Horas', icon: Clock },
    { id: 'consultations', label: 'Atenciones', icon: Activity },
    { id: 'departments', label: 'Especialidades', icon: Layers },
  ];

  // Custom colors matching pink/blue from bank dashboard screenshot
  // Recharts / Tremor color mapping uses pre-defined colors or theme config.
  // We can use pink and slate/indigo for gender comparison: Femenino (fuchsia/pink), Masculino (blue/indigo)
  const ageChartColors = ['indigo', 'fuchsia'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-slate-950 font-black">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-white leading-tight">HRDT Portal</h2>
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Trujillo, Perú</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 font-semibold shadow-lg shadow-white/5'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer / User Profile & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 space-y-4">
          {/* Decorative graphic overlay inspired by card outline in bank dashboard */}
          <div className="relative p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-900/30 overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
            <Activity className="absolute bottom-2 right-2 w-12 h-12 text-emerald-500/5 stroke-[1]" />
            <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold mb-1">
              Estado del Sistema
            </div>
            <div className="text-xs text-slate-300">
              Conexión lista para base de datos.
            </div>
            <div className="mt-2 text-[10px] text-slate-500">
              Versión 1.0.0-Beta
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">
                AD
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-slate-200 truncate">{user?.username}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              title="Cerrar Sesión"
              className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/10 hover:text-rose-400 text-slate-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950">
        
        {/* TOP BAR / HEADER */}
        <header className="h-16 border-b border-slate-900 px-6 flex items-center justify-between bg-slate-900/30 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white tracking-tight uppercase">
              {activeTab === 'demographics' && 'Dashboard de Demografía'}
              {activeTab === 'shifts' && 'Gestión de Guardias y Horas'}
              {activeTab === 'consultations' && 'Métricas de Atenciones'}
              {activeTab === 'departments' && 'Resumen de Especialidades'}
            </h1>
          </div>

          {/* Quick Info & Help */}
          <div className="flex items-center gap-3">
            <div className="p-2 text-slate-400 hover:text-slate-200 cursor-pointer rounded-lg hover:bg-slate-900 transition-colors">
              <Info className="w-4 h-4" />
            </div>
            
            <button
              onClick={handleResetFilters}
              disabled={selectedSpecialty === 'All' && selectedContract === 'All' && selectedGender === 'All'}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-medium text-slate-300 rounded-lg transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restablecer Filtros</span>
            </button>
          </div>
        </header>

        {/* GLOBAL FILTERS PANEL */}
        <section className="bg-slate-900/20 border-b border-slate-900 p-6 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filtros Operativos:</span>
          </div>

          {/* Specialty Filter */}
          <div className="flex flex-col min-w-[150px]">
            <span className="text-[10px] text-slate-500 font-semibold mb-1">Especialidad</span>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">Todas las especialidades</option>
              {specialties.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {/* Contract Filter */}
          <div className="flex flex-col min-w-[150px]">
            <span className="text-[10px] text-slate-500 font-semibold mb-1">Contrato</span>
            <select
              value={selectedContract}
              onChange={(e) => setSelectedContract(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">Todos los contratos</option>
              {contracts.map(cont => (
                <option key={cont} value={cont}>{cont}</option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div className="flex flex-col min-w-[120px]">
            <span className="text-[10px] text-slate-500 font-semibold mb-1">Género</span>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">Ambos</option>
              <option value="Male">Masculino</option>
              <option value="Female">Femenino</option>
            </select>
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 animate-pulse ml-auto">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Actualizando métricas...</span>
            </div>
          )}
        </section>

        {/* CONTAINER FOR VIEWS */}
        <div className="p-6 flex-1 overflow-y-auto">

          {/* TAB 1: DEMOGRAPHICS VIEW */}
          {activeTab === 'demographics' && (
            <div className="space-y-6">
              
              {/* Top Dashboard Row - Layout identical to mockup */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Evaluating card + Stats Column (Matches Left column of mockup) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  
                  {/* Explanatory intro card */}
                  <Card className="bg-slate-900/40 border-slate-800 text-slate-300">
                    <Title className="text-slate-100 text-sm font-bold">Evaluando Demografía de Personal Médico</Title>
                    <Text className="text-slate-400 text-xs mt-1">
                      Visualización de datos demográficos y operativos del personal del hospital para planificación de turnos y análisis de carga.
                    </Text>
                  </Card>

                  {/* 4 Cards identical to the mockup layout */}
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* Stat 1: Total Doctors */}
                    <Card className="bg-slate-900/40 border-slate-800 flex flex-col justify-between py-4">
                      <div>
                        <Text className="text-[10px] text-slate-400 uppercase font-semibold">Personal</Text>
                        <Metric className="text-2xl font-bold text-white mt-1">{kpis.totalStaff}</Metric>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800 flex flex-col text-[10px] text-slate-400">
                        <span className="flex justify-between"><span>Masc.</span> <span className="font-semibold text-slate-200">{kpis.maleCount}</span></span>
                        <span className="flex justify-between"><span>Fem.</span> <span className="font-semibold text-slate-200">{kpis.femaleCount}</span></span>
                      </div>
                    </Card>

                    {/* Stat 2: Avg Age */}
                    <Card className="bg-slate-900/40 border-slate-800 flex flex-col justify-between py-4">
                      <div>
                        <Text className="text-[10px] text-slate-400 uppercase font-semibold">Edad Promedio</Text>
                        <Metric className="text-2xl font-bold text-white mt-1">{kpis.avgAge}</Metric>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800 flex flex-col text-[10px] text-slate-400">
                        <span className="flex justify-between"><span>Masc.</span> <span className="font-semibold text-slate-200">{kpis.avgAgeMale} años</span></span>
                        <span className="flex justify-between"><span>Fem.</span> <span className="font-semibold text-slate-200">{kpis.avgAgeFemale} años</span></span>
                      </div>
                    </Card>

                    {/* Stat 3: Avg Monthly Hours */}
                    <Card className="bg-slate-900/40 border-slate-800 flex flex-col justify-between py-4">
                      <div>
                        <Text className="text-[10px] text-slate-400 uppercase font-semibold">Horas Promedio</Text>
                        <Metric className="text-2xl font-bold text-white mt-1">{kpis.avgHours} h</Metric>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800 flex flex-col text-[10px] text-slate-400">
                        <span className="flex justify-between text-emerald-400"><span>Máx.</span> <span className="font-semibold">{kpis.maxHours} h</span></span>
                        <span className="flex justify-between text-indigo-400"><span>Mín.</span> <span className="font-semibold">{kpis.minHours} h</span></span>
                      </div>
                    </Card>

                    {/* Stat 4: Avg Consultations */}
                    <Card className="bg-slate-900/40 border-slate-800 flex flex-col justify-between py-4">
                      <div>
                        <Text className="text-[10px] text-slate-400 uppercase font-semibold">Atenciones Prom.</Text>
                        <Metric className="text-2xl font-bold text-white mt-1">{kpis.avgConsultations}</Metric>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800 flex flex-col text-[10px] text-slate-400">
                        <span className="flex justify-between text-emerald-400"><span>Máx.</span> <span className="font-semibold">{kpis.maxConsultations}</span></span>
                        <span className="flex justify-between text-indigo-400"><span>Mín.</span> <span className="font-semibold">{kpis.minConsultations}</span></span>
                      </div>
                    </Card>

                  </div>

                </div>

                {/* Main Age Chart Column (Matches Right column of mockup) */}
                <div className="lg:col-span-7">
                  <Card className="bg-slate-900/40 border-slate-800 h-full flex flex-col justify-between">
                    <div>
                      <Title className="text-slate-100 text-sm font-bold">Distribución del Personal por Edad y Género</Title>
                      <Text className="text-slate-400 text-xs">Total de médicos activos agrupados por rango de edad</Text>
                    </div>
                    
                    <div className="mt-6 flex-1 min-h-[220px]">
                      {staffData.length > 0 ? (
                        <BarChart
                          className="h-64"
                          data={ageDistribution}
                          index="rango"
                          categories={['Masculino', 'Femenino']}
                          colors={ageChartColors}
                          valueFormatter={(number) => `${number} pers.`}
                          yAxisWidth={30}
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center text-xs text-slate-500">
                          Sin datos para los filtros seleccionados
                        </div>
                      )}
                    </div>
                  </Card>
                </div>

              </div>

              {/* Bottom Row - 4 Charts layout matching mockup */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Bottom Chart 1: Donut (Contract distribution) */}
                <Card className="bg-slate-900/40 border-slate-800 flex flex-col justify-between">
                  <div>
                    <Title className="text-slate-100 text-xs font-bold">Distribución de Contratos</Title>
                    <Text className="text-[10px] text-slate-500">Modalidad laboral del personal</Text>
                  </div>
                  <div className="my-6">
                    {staffData.length > 0 ? (
                      <DonutChart
                        className="h-32"
                        data={contractDistribution}
                        category="value"
                        index="name"
                        colors={['emerald', 'cyan', 'indigo']}
                        valueFormatter={(number) => `${number} pers.`}
                      />
                    ) : (
                      <div className="h-32 flex items-center justify-center text-[10px] text-slate-500">Sin datos</div>
                    )}
                  </div>
                </Card>

                {/* Bottom Chart 2: Donut (Performance/Rating) */}
                <Card className="bg-slate-900/40 border-slate-800 flex flex-col justify-between">
                  <div>
                    <Title className="text-slate-100 text-xs font-bold">Calificación de Desempeño</Title>
                    <Text className="text-[10px] text-slate-500">Nivel de desempeño por atenciones</Text>
                  </div>
                  <div className="my-6">
                    {staffData.length > 0 ? (
                      <DonutChart
                        className="h-32"
                        data={performanceDistribution}
                        category="value"
                        index="name"
                        colors={['emerald', 'blue', 'amber', 'rose']}
                        valueFormatter={(number) => `${number} med.`}
                      />
                    ) : (
                      <div className="h-32 flex items-center justify-center text-[10px] text-slate-500">Sin datos</div>
                    )}
                  </div>
                </Card>

                {/* Bottom Chart 3: Bar (Status/Availability) */}
                <Card className="bg-slate-900/40 border-slate-800 flex flex-col justify-between">
                  <div>
                    <Title className="text-slate-100 text-xs font-bold">Estado de Personal</Title>
                    <Text className="text-[10px] text-slate-500">Disponibilidad en tiempo real</Text>
                  </div>
                  <div className="my-6">
                    {staffData.length > 0 ? (
                      <BarChart
                        className="h-32"
                        data={statusDistribution}
                        index="name"
                        categories={['cantidad']}
                        colors={['emerald']}
                        valueFormatter={(number) => `${number}`}
                        showYAxis={false}
                      />
                    ) : (
                      <div className="h-32 flex items-center justify-center text-[10px] text-slate-500">Sin datos</div>
                    )}
                  </div>
                </Card>

                {/* Bottom Chart 4: Bar (Workload/Saturation) */}
                <Card className="bg-slate-900/40 border-slate-800 flex flex-col justify-between">
                  <div>
                    <Title className="text-slate-100 text-xs font-bold">Carga Laboral / Saturación</Title>
                    <Text className="text-[10px] text-slate-500">Horas trabajadas vs promedio</Text>
                  </div>
                  <div className="my-6">
                    {staffData.length > 0 ? (
                      <BarChart
                        className="h-32"
                        data={workloadDistribution}
                        index="name"
                        categories={['cantidad']}
                        colors={['rose', 'amber', 'emerald']}
                        valueFormatter={(number) => `${number}`}
                        showYAxis={false}
                      />
                    ) : (
                      <div className="h-32 flex items-center justify-center text-[10px] text-slate-500">Sin datos</div>
                    )}
                  </div>
                </Card>

              </div>

            </div>
          )}

          {/* TAB 2: SHIFTS / HOURS VIEW */}
          {activeTab === 'shifts' && (
            <div className="space-y-6">
              
              {/* Header card */}
              <Card className="bg-slate-900/40 border-slate-800">
                <div className="flex items-center gap-3 text-emerald-400 mb-2">
                  <Clock className="w-5 h-5" />
                  <Title className="text-slate-100 font-bold">Control de Guardias y Horas Mensuales</Title>
                </div>
                <Text className="text-slate-400 text-xs">
                  Resumen de horas laboradas, guardias nocturnas y asignaciones por especialidad médica. Los datos se actualizan reactivamente al cambiar los filtros generales.
                </Text>
              </Card>

              {/* Detail charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Workload summary */}
                <Card className="bg-slate-900/40 border-slate-800 flex flex-col justify-between">
                  <div>
                    <Title className="text-slate-100 text-sm font-bold">Resumen de Carga Horaria</Title>
                    <Text className="text-slate-500 text-xs">Distribución de horas contra el límite de 160h</Text>
                  </div>
                  
                  <div className="space-y-4 my-6">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Horas Promedio Registradas</span>
                        <span className="text-emerald-400 font-bold">{kpis.avgHours}h</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${Math.min((kpis.avgHours / 200) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div>
                        <div className="text-[10px] text-slate-500 font-semibold uppercase">Límite Mensual</div>
                        <div className="font-bold text-slate-200">160 Horas</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-500 font-semibold uppercase">Estado</div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          Carga Moderada
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 italic">
                    * El reglamento interno exige un descanso obligatorio de 12 horas posterior a guardias nocturnas.
                  </div>
                </Card>

                {/* Right Column: Dynamic area chart representing hours per staff */}
                <Card className="lg:col-span-2 bg-slate-900/40 border-slate-800">
                  <Title className="text-slate-100 text-sm font-bold">Distribución de Horas Mensuales por Médico</Title>
                  <Text className="text-slate-400 text-xs">Comparación de horas asignadas vs. consultas</Text>
                  
                  <div className="mt-6 h-64">
                    {staffData.length > 0 ? (
                      <AreaChart
                        className="h-60"
                        data={staffData.map(doc => ({
                          name: doc.name.split(' ').slice(-1)[0], // last name
                          Horas: doc.hours,
                          Consultas: doc.consultations
                        }))}
                        index="name"
                        categories={['Horas', 'Consultas']}
                        colors={['indigo', 'emerald']}
                        yAxisWidth={30}
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-xs text-slate-500">
                        Sin datos disponibles para graficar
                      </div>
                    )}
                  </div>
                </Card>

              </div>

              {/* Database Integration Table Placeholder */}
              <Card className="bg-slate-900/40 border-slate-800">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <Title className="text-slate-100 text-sm font-bold">Registro Detallado del Personal Filtado</Title>
                    <Text className="text-slate-400 text-xs">Tabla lista para paginación y ordenamiento con base de datos</Text>
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold bg-slate-800 px-2.5 py-1 rounded-lg">
                    {staffData.length} registros cargados
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-[10px] text-slate-400 font-semibold uppercase tracking-wider bg-slate-900/20">
                        <th className="py-3 px-4">Médico</th>
                        <th className="py-3 px-4">Especialidad</th>
                        <th className="py-3 px-4">Contrato</th>
                        <th className="py-3 px-4">Horas</th>
                        <th className="py-3 px-4 text-center">Estado</th>
                        <th className="py-3 px-4 text-right">Integración BD</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-xs text-slate-300">
                      {staffData.slice(0, 5).map(doc => (
                        <tr key={doc.id} className="hover:bg-slate-900/20 transition-colors">
                          <td className="py-3 px-4 font-semibold text-white">{doc.name}</td>
                          <td className="py-3 px-4">{doc.specialty}</td>
                          <td className="py-3 px-4">{doc.contract}</td>
                          <td className="py-3 px-4">{doc.hours} hrs</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              doc.status === 'Activo' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              doc.status === 'Guardia' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                              'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {doc.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="text-[10px] font-mono text-emerald-400/70 bg-emerald-500/5 px-2 py-1 rounded">
                              SELECT * FROM medico WHERE id = {doc.id}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {staffData.length > 5 && (
                        <tr>
                          <td colSpan="6" className="py-3 text-center text-[11px] text-slate-500 italic">
                            ... y {staffData.length - 5} médicos más que cumplen con el filtro.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>

            </div>
          )}

          {/* TAB 3: CONSULTATIONS VIEW */}
          {activeTab === 'consultations' && (
            <div className="space-y-6">
              
              {/* Header card */}
              <Card className="bg-slate-900/40 border-slate-800">
                <div className="flex items-center gap-3 text-emerald-400 mb-2">
                  <Activity className="w-5 h-5" />
                  <Title className="text-slate-100 font-bold">Historial y Métricas de Atenciones</Title>
                </div>
                <Text className="text-slate-400 text-xs">
                  Análisis del volumen de pacientes atendidos. Sirve para evaluar la productividad médica y cuellos de botella en consulta externa y emergencias.
                </Text>
              </Card>

              {/* Consultation charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Left: Top Performers */}
                <Card className="bg-slate-900/40 border-slate-800">
                  <Title className="text-slate-100 text-sm font-bold flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>Médicos con Mayor Volumen de Atenciones</span>
                  </Title>
                  <Text className="text-slate-500 text-xs">Lista filtrada de los médicos más activos este mes</Text>
                  
                  <div className="mt-6 space-y-4">
                    {staffData.length > 0 ? (
                      [...staffData]
                        .sort((a, b) => b.consultations - a.consultations)
                        .slice(0, 4)
                        .map((doc, idx) => (
                          <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-800/80">
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-emerald-400">
                                {idx + 1}
                              </span>
                              <div>
                                <h4 className="text-xs font-bold text-white leading-tight">{doc.name}</h4>
                                <span className="text-[10px] text-slate-500">{doc.specialty} • {doc.contract}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-bold text-emerald-400">{doc.consultations}</span>
                              <p className="text-[9px] text-slate-500">atenciones</p>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="py-12 text-center text-xs text-slate-500">Sin datos</div>
                    )}
                  </div>
                </Card>

                {/* Right: Bar Chart of Consultations per Doc */}
                <Card className="bg-slate-900/40 border-slate-800">
                  <Title className="text-slate-100 text-sm font-bold flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-400" />
                    <span>Productividad: Atenciones Registradas</span>
                  </Title>
                  <Text className="text-slate-500 text-xs">Carga total de consultas externas y hospitalarias</Text>
                  
                  <div className="mt-6 h-60">
                    {staffData.length > 0 ? (
                      <BarChart
                        className="h-56"
                        data={staffData.slice(0, 8).map(doc => ({
                          name: doc.name.split(' ').slice(-1)[0],
                          Atenciones: doc.consultations
                        }))}
                        index="name"
                        categories={['Atenciones']}
                        colors={['emerald']}
                        valueFormatter={(number) => `${number} atenciones`}
                        yAxisWidth={30}
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-xs text-slate-500">Sin datos</div>
                    )}
                  </div>
                </Card>

              </div>

            </div>
          )}

          {/* TAB 4: DEPARTMENTS VIEW */}
          {activeTab === 'departments' && (
            <div className="space-y-6">
              
              {/* Header card */}
              <Card className="bg-slate-900/40 border-slate-800">
                <div className="flex items-center gap-3 text-emerald-400 mb-2">
                  <Layers className="w-5 h-5" />
                  <Title className="text-slate-100 font-bold">Resumen de Especialidades del Hospital</Title>
                </div>
                <Text className="text-slate-400 text-xs">
                  Estadísticas de disponibilidad de camas críticas, médicos asignados y enfermeros por cada departamento del Hospital Regional Docente de Trujillo.
                </Text>
              </Card>

              {/* Grid of Specialties/Departments */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Specialty Card 1 */}
                <Card className="bg-slate-900/40 border-slate-800 p-5 flex flex-col justify-between h-48">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        Pediatría
                      </span>
                      <span className="text-[10px] text-slate-500">Piso 2 - Ala Norte</span>
                    </div>
                    <Title className="text-slate-100 text-sm font-bold mt-3">Departamento de Pediatría y Neonatología</Title>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-xs text-slate-400">
                    <div>
                      <p className="text-[10px] text-slate-500">Camas Libres</p>
                      <span className="font-bold text-emerald-400">12 / 15</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Médicos</p>
                      <span className="font-bold text-slate-200">5</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Nivel de Cuidado</p>
                      <span className="font-bold text-slate-300">Medio</span>
                    </div>
                  </div>
                </Card>

                {/* Specialty Card 2 */}
                <Card className="bg-slate-900/40 border-slate-800 p-5 flex flex-col justify-between h-48">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        UCI
                      </span>
                      <span className="text-[10px] text-slate-500">Piso 1 - Ala Crítica</span>
                    </div>
                    <Title className="text-slate-100 text-sm font-bold mt-3">Unidad de Cuidados Intensivos (Adulto/Pediátrico)</Title>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-xs text-slate-400">
                    <div>
                      <p className="text-[10px] text-slate-500">Camas Libres</p>
                      <span className="font-bold text-rose-400">2 / 8</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Médicos</p>
                      <span className="font-bold text-slate-200">4</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Nivel de Cuidado</p>
                      <span className="font-bold text-red-400">Crítico</span>
                    </div>
                  </div>
                </Card>

                {/* Specialty Card 3 */}
                <Card className="bg-slate-900/40 border-slate-800 p-5 flex flex-col justify-between h-48">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        Ginecología
                      </span>
                      <span className="text-[10px] text-slate-500">Piso 3 - Maternidad</span>
                    </div>
                    <Title className="text-slate-100 text-sm font-bold mt-3">Ginecología y Obstetricia (Maternidad)</Title>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-xs text-slate-400">
                    <div>
                      <p className="text-[10px] text-slate-500">Camas Libres</p>
                      <span className="font-bold text-emerald-400">8 / 10</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Médicos</p>
                      <span className="font-bold text-slate-200">4</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Nivel de Cuidado</p>
                      <span className="font-bold text-slate-300">Medio</span>
                    </div>
                  </div>
                </Card>

                {/* Specialty Card 4 */}
                <Card className="bg-slate-900/40 border-slate-800 p-5 flex flex-col justify-between h-48">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        Emergencias
                      </span>
                      <span className="text-[10px] text-slate-500">Piso 1 - Acceso Ambulancia</span>
                    </div>
                    <Title className="text-slate-100 text-sm font-bold mt-3">Servicios de Emergencia y Triage</Title>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-xs text-slate-400">
                    <div>
                      <p className="text-[10px] text-slate-500">Boxes Activos</p>
                      <span className="font-bold text-amber-400">5 / 6</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Médicos</p>
                      <span className="font-bold text-slate-200">5</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Nivel de Cuidado</p>
                      <span className="font-bold text-orange-400">Agudo</span>
                    </div>
                  </div>
                </Card>

                {/* Specialty Card 5 */}
                <Card className="bg-slate-900/40 border-slate-800 p-5 flex flex-col justify-between h-48">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        Cardiología
                      </span>
                      <span className="text-[10px] text-slate-500">Piso 2 - Ala Oeste</span>
                    </div>
                    <Title className="text-slate-100 text-sm font-bold mt-3">Unidad de Cardiología y Hemodinamia</Title>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-xs text-slate-400">
                    <div>
                      <p className="text-[10px] text-slate-500">Equipos Holter</p>
                      <span className="font-bold text-emerald-400">4 / 4</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Médicos</p>
                      <span className="font-bold text-slate-200">4</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Nivel de Cuidado</p>
                      <span className="font-bold text-slate-300">Especializado</span>
                    </div>
                  </div>
                </Card>

                {/* Specialty Card 6 */}
                <Card className="bg-slate-900/40 border-slate-800 p-5 flex flex-col justify-between h-48">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        Cirugía General
                      </span>
                      <span className="text-[10px] text-slate-500">Piso 1 - Quirófanos</span>
                    </div>
                    <Title className="text-slate-100 text-sm font-bold mt-3">Quirófanos y Centro de Recuperación Quirúrgica</Title>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-xs text-slate-400">
                    <div>
                      <p className="text-[10px] text-slate-500">Quirófanos Libres</p>
                      <span className="font-bold text-amber-400">1 / 4</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Médicos</p>
                      <span className="font-bold text-slate-200">4</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500">Nivel de Cuidado</p>
                      <span className="font-bold text-slate-300">Especializado</span>
                    </div>
                  </div>
                </Card>

              </div>

            </div>
          )}

        </div>

      </main>

    </div>
  );
}
