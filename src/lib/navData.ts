export interface NavItem {
  text: string;
  path: string;
}

export interface NoAuthNavItem {
  text: string;
  id: string;
}

export const navData: NavItem[] = [
  {
    text: "Panel de Control",
    path: "/panel",
  },
  {
    text: "Pacientes",
    path: "/panel/pacientes",
  },
  {
    text: "Calendario",
    path: "/panel/calendario",
  },
];

export const noAuthNavData: NoAuthNavItem[] = [
  {
    text: "Inicio",
    id: "#inicio",
  },
  {
    text: "Producto",
    id: "#producto",
  },
];
