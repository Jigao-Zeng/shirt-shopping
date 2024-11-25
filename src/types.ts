export interface SizeOption {
    id: number;
    label: string;
  }
  
  export interface Cloth {
    id: number;
    title: string;
    description: string;
    price: number;
    imageURL: string;
    sizeOptions: SizeOption[];
  }