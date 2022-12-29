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

export type Paciente = {
  nombre: string;
  edad: number;
  nacimiento: string;
  direccion: string;
  talla: string;
  pa: string;
  fc: number;
  satO2: number;
  promPa?: string;
  promFc?: string;
  ttoActual?: string;
  primeraCita?: string;
  control?: string;
};
