// Aqui basicamente é o formato de cada hábito cadastrado na tela
export interface Habito {
  id: number;
  titulo: string;
  categoria: 'Água' | 'Resíduos' | 'Energia' | 'Mobilidade';
  co2EstimadoKg: number;        // Quanto de CO2 estimamos que esse hábito evita
  concluido: boolean;
}