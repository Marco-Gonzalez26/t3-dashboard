export type PacienteFromDB = {
  nombre: string;
  direccion: string;
  telefono: string;
  id?: string;
};
export type Paciente = {
  id?: string;
  nombre: string;
  edad: string;
  nacimiento: string;
  telefono: string;
  direccion: string;
  talla: string;
  peso: string;
  pa: string;
  fc: string;
  satO2: string;
  promPa?: string | null;
  promFc?: string | null;
  ttoActual?: string | null;
  primeraCita?: string |null;
  control?: string | null;
};
