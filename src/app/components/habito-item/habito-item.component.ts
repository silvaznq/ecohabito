import { Component, input, output } from '@angular/core';
import { Habito } from '../../models/habito.model';

@Component({
  selector: 'app-habito-item',
  standalone: true,
  templateUrl: './habito-item.component.html',
  styleUrl: './habito-item.component.css',
})
export class HabitoItemComponent {
  habito = input.required<Habito>();
  alternar = output<number>();
  remover = output<number>();

  onAlternar(): void {
    this.alternar.emit(this.habito().id);
  }

  onRemover(): void {
    this.remover.emit(this.habito().id);
  }
}