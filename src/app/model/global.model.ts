export interface NavigationMenu {
  label: string;
  link: string;
  icon: string;
}

export interface Registration {
  no: number;
  name: string;
  family: string;
}

export const DummyData: Registration[] = [
  { no: 1, name: 'John Doe', family: '1234567890' },
  { no: 2, name: 'Jane Smith', family: '9876543210' },
  { no: 3, name: 'Peter Jones', family: '5678901234' },
  { no: 4, name: 'Alice Brown', family: '3210987654' },
  { no: 5, name: 'Mike Davis', family: '8765432109' },
];
