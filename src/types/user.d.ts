export type PacienteFromDB = {
  nombre: string;
  direccion: string;
  telefono: string;
  id?: string;
};
export type Paciente = {
  id?: string;
  nombre: string;
  email: string;
  edad: number;
  nacimiento: string;
  telefono: string;
  direccion: string;
  talla: string;
  peso: number;
  pa: string;
  fc: string;
  satO2: string;
  promPa?: string | null;
  promFc?: string | null;
  ttoActual?: string | null;
  primeraCita?: Date | null;
  control?: Date | null;
};
