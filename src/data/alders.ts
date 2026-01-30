// Madison Common Council members (alders) data for frontend

export interface Alder {
  district: number;
  name: string;
  photoUrl: string;
}

export const alders: Alder[] = [
  { district: 1, name: "John W. Duncan", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district1.webp" },
  { district: 2, name: "Will Ochowicz", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district2.webp" },
  { district: 3, name: "Derek Field", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district3.webp" },
  { district: 4, name: "Michael E. Verveer", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district4.webp" },
  { district: 5, name: "Regina M. Vidaver", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district5.webp" },
  { district: 6, name: "Davy Mayer", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district6.webp" },
  { district: 7, name: "Badri Lankella", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district7.webp" },
  { district: 8, name: "MGR Govindarajan", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district8.webp" },
  { district: 9, name: "Joann Pritchett", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district9.webp" },
  { district: 10, name: "Yannette Figueroa Cole", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district10.webp" },
  { district: 11, name: "Bill Tishler", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district11.webp" },
  { district: 12, name: "Julia Matthews", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district12.webp" },
  { district: 13, name: "Tag Evers", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district13.webp" },
  { district: 14, name: "Isadore Knox Jr.", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district14.webp" },
  { district: 15, name: "Dina Nina Martinez-Rutherford", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district15.webp" },
  { district: 16, name: "Sean O'Brien", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district16.webp" },
  { district: 17, name: "Sabrina V. Madison", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district17.webp" },
  { district: 18, name: "Carmella Glenn", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district18.webp" },
  { district: 19, name: "John P. Guequierre", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district19.webp" },
  { district: 20, name: "Barbara Harrington-McKinney", photoUrl: "https://www.cityofmadison.com/sites/default/files/styles/portrait_thumb/public/council/images/alders/district20.webp" },
];

// Helper function to get alder by district
export function getAlderByDistrict(district: number): Alder | undefined {
  return alders.find(a => a.district === district);
}
