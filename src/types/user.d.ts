export type User = {
  id: number;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  geolocation: {
    lat: string;
    long: string;
  };
  phone: string;
};

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
  promPa?: string;
  promFc?: string;
  ttoActual?: string;
  primeraCita?: string;
  control?: string;
};
