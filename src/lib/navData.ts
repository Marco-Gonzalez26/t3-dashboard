export interface NavItem {
  text: string;
  path: string;
}

export const navData: NavItem[] = [{
  text: 'Panel de Control',
  path: '/panel'
}, {
  text: 'Pacientes',
  path: '/pacientes'
},
{
  text: 'Calendario',
  path: '/calendario'
}];
