import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HabitoService } from '../../services/habito.service';
import { Habito } from '../../models/habito.model';
import { HabitoItemComponent } from '../../components/habito-item/habito-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, HabitoItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private habitoService = inject(HabitoService);

  novoTitulo = '';
  novaCategoria: Habito['categoria'] = 'Resíduos';
  novoCo2 = 0.5;

  dicaDoDia =
    'Pequenas trocas repetidas diariamente geram mais impacto do que metas difíceis abandonadas no 2º dia.';

  get habitos(): Habito[] {
    return this.habitoService.listarHabitos();
  }

  get totalConcluidos(): number {
    return this.habitos.filter((h) => h.concluido).length;
  }

  get impactoCo2(): number {
    return this.habitoService.calcularImpactoCo2Concluido();
  }

  adicionar(): void {
    if (!this.novoTitulo.trim()) {
      return;
    }
    this.habitoService.adicionarHabito(
      this.novoTitulo,
      this.novaCategoria,
      this.novoCo2
    );
    this.novoTitulo = '';
    this.novoCo2 = 0.5;
  }

  aoAlternarHabito(id: number): void {
    this.habitoService.alternarConclusao(id);
  }

  aoRemoverHabito(id: number): void {
    this.habitoService.removerHabito(id);
  }
}