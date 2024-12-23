export interface NavigationMenu {
  label: string;
  link: string;
  icon: string;
}

export interface Registration {
  no: number;
  name: string;
  cpNo: string;
}

export const DummyData: Registration[] = [
  { no: 1, name: 'John Doe', cpNo: '1234567890' },
  { no: 2, name: 'Jane Smith', cpNo: '9876543210' },
  { no: 3, name: 'Peter Jones', cpNo: '5678901234' },
  { no: 4, name: 'Alice Brown', cpNo: '3210987654' },
  { no: 5, name: 'Mike Davis', cpNo: '8765432109' },
];
