import { Component, input, output } from '@angular/core';
import { Habito } from '../../models/habito.model';

@Component({
  selector: 'app-habito-item',
  standalone: true,
  templateUrl: './habito-item.component.html',
  styleUrl: './habito-item.component.css',
})
// Componente de cada linha/card de hábito na lista
export class HabitoItemComponent {
  // Recebe os dados do hábito que vem da tela pai
  habito = input.required<Habito>();
  // Eventos enviados pra tela quando marca/desmarca ou exclui o hábito
  alternar = output<number>();
  remover = output<number>();
// Manda o id do hábito pra alternar concluído/não concluído
  onAlternar(): void {
    this.alternar.emit(this.habito().id);
  }
// Manda o id do hábito pra apagar da lista
  onRemover(): void {
    this.remover.emit(this.habito().id);
  }
}