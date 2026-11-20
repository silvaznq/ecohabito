export interface Habito {
  id: number;
  titulo: string;
  categoria: 'Água' | 'Resíduos' | 'Energia' | 'Mobilidade';
  co2EstimadoKg: number;
  concluido: boolean;
}