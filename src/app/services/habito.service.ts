import { Injectable } from '@angular/core';
import { Habito } from '../models/habito.model';

@Injectable({
  providedIn: 'root',
})
export class HabitoService {
  // Nome salvo no navegador ao dar F5
  private readonly STORAGE_KEY = 'ecohabito_lista_v1';
// Exemplos iniciais pra lista não começar vazia
  private habitosIniciais: Habito[] = [
    {
      id: 1,
      titulo: 'Levar ecobag nas compras do mercado',
      categoria: 'Resíduos',
      co2EstimadoKg: 0.4,
      concluido: true,
    },
    {
      id: 2,
      titulo: 'Fechar a torneira ao ensaboar louça ou escovar os dentes',
      categoria: 'Água',
      co2EstimadoKg: 0.2,
      concluido: false,
    },
    {
      id: 3,
      titulo: 'Ir a pé, de bike ou transporte coletivo em trajeto curto',
      categoria: 'Mobilidade',
      co2EstimadoKg: 1.8,
      concluido: false,
    },
  ];
// Lista atual dos hábitos que aparece na tela
  private habitos: Habito[] = [];
// Assim que o serviço sobe, já puxa os hábitos salvos
  constructor() {
    this.carregarDoStorage();
  }
// Puxa os hábitos salvos ou carrega os exemplos se for a primeira vez
  private carregarDoStorage(): void {
    // Evita quebrar no servidor/SSR onde não existe localStorage
    if (typeof localStorage === 'undefined') {
      this.habitos = [...this.habitosIniciais];
      return;
    }

    const dadosSalvos = localStorage.getItem(this.STORAGE_KEY);
    if (dadosSalvos) {
      this.habitos = JSON.parse(dadosSalvos) as Habito[];
    } else {
      this.habitos = [...this.habitosIniciais];
      this.salvarNoStorage();
    }
  }
// Salva a lista toda no navegador pra não perder nada no F5
  private salvarNoStorage(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.habitos));
  }
// Devolve a lista atual de hábitos
  listarHabitos(): Habito[] {
    return this.habitos;
  }
// Monta o hábito novo, coloca no começo da lista e já salva
  adicionarHabito(
    titulo: string,
    categoria: Habito['categoria'],
    co2EstimadoKg: number
  ): void {
    const novoHabito: Habito = {
      id: Date.now(),
      titulo: titulo.trim(),
      categoria,
      // Se não botar número positivo, cai nesse valor padrão de 0.3
      co2EstimadoKg: co2EstimadoKg > 0 ? co2EstimadoKg : 0.3,
      concluido: false,
    };
    this.habitos = [novoHabito, ...this.habitos];
    this.salvarNoStorage();
  }// Marca ou desmarca o hábito como feito e salva a mudança

  alternarConclusao(id: number): void {
    this.habitos = this.habitos.map((item) =>
      item.id === id ? { ...item, concluido: !item.concluido } : item
    );
    this.salvarNoStorage();
  } // Remove o hábito pelo id e atualiza o storage

  removerHabito(id: number): void {
    this.habitos = this.habitos.filter((item) => item.id !== id);
    this.salvarNoStorage();
  } // Soma só o CO2 dos hábitos concluídos, arredondado em 2 casas

  calcularImpactoCo2Concluido(): number {
    const total = this.habitos
      .filter((h) => h.concluido)
      .reduce((acc, h) => acc + h.co2EstimadoKg, 0);
    return Number(total.toFixed(2));
  }
}