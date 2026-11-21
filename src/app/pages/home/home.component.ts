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
  // Puxa o serviço central pra gerenciar e salvar os hábitos
  private habitoService = inject(HabitoService);
// Campos ligados ao formulário de novo hábito na tela
  novoTitulo = '';
  novaCategoria: Habito['categoria'] = 'Resíduos';
  novoCo2 = 0.5;
// Mensagem fixa de incentivo que aparece na página
  dicaDoDia =
    'Pequenas trocas repetidas diariamente geram mais impacto do que metas difíceis abandonadas no 2º dia.';
// Pega a lista atualizada de hábitos pra renderizar na tela
  get habitos(): Habito[] {
    return this.habitoService.listarHabitos();
  }
// Conta quantos hábitos já foram marcados como concluídos
  get totalConcluidos(): number {
    return this.habitos.filter((h) => h.concluido).length;
  }
// Pega o total de CO2 evitado nos hábitos concluídos
  get impactoCo2(): number {
    return this.habitoService.calcularImpactoCo2Concluido();
  }
// Valida se tem título, cria o hábito novo e limpa os campos
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
// Repassa pro serviço quando o usuário marca ou desmarca um hábito
  aoAlternarHabito(id: number): void {
    this.habitoService.alternarConclusao(id);
  }
// Repassa pro serviço quando o usuário apaga um hábito
  aoRemoverHabito(id: number): void {
    this.habitoService.removerHabito(id);
  }
}