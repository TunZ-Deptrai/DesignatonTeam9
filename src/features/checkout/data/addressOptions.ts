// Small fixture set for the prototype dropdowns, not a complete official address directory.
export const addressOptions = [
  { province: 'Metro Manila', region: 'Metro Manila (NCR)', cities: [
    { name: 'Makati City', barangays: ['Poblacion', 'Bel-Air', 'San Lorenzo'] },
    { name: 'Taguig City', barangays: ['Fort Bonifacio', 'Western Bicutan', 'Ususan'] },
    { name: 'Quezon City', barangays: ['Bagumbayan', 'Commonwealth', 'Batasan Hills'] },
  ] },
  { province: 'Cavite', region: 'CALABARZON (Region IV-A)', cities: [
    { name: 'Bacoor City', barangays: ['Molino I', 'Molino II', 'Talaba I'] },
    { name: 'Imus City', barangays: ['Bayan Luma I', 'Anabu I-A', 'Bucandala I'] },
  ] },
  { province: 'Laguna', region: 'CALABARZON (Region IV-A)', cities: [
    { name: 'Santa Rosa City', barangays: ['Balibago', 'Tagapo', 'Dita'] },
    { name: 'Biñan City', barangays: ['San Antonio', 'Santo Tomas', 'San Vicente'] },
  ] },
] as const
