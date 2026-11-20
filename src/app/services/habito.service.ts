import { Injectable } from '@angular/core';
import { Habito } from '../models/habito.model';

@Injectable({
  providedIn: 'root',
})
export class HabitoService {
  private readonly STORAGE_KEY = 'ecohabito_lista_v1';

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

  private habitos: Habito[] = [];

  constructor() {
    this.carregarDoStorage();
  }

  private carregarDoStorage(): void {
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

  private salvarNoStorage(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.habitos));
  }

  listarHabitos(): Habito[] {
    return this.habitos;
  }

  adicionarHabito(
    titulo: string,
    categoria: Habito['categoria'],
    co2EstimadoKg: number
  ): void {
    const novoHabito: Habito = {
      id: Date.now(),
      titulo: titulo.trim(),
      categoria,
      co2EstimadoKg: co2EstimadoKg > 0 ? co2EstimadoKg : 0.3,
      concluido: false,
    };
    this.habitos = [novoHabito, ...this.habitos];
    this.salvarNoStorage();
  }

  alternarConclusao(id: number): void {
    this.habitos = this.habitos.map((item) =>
      item.id === id ? { ...item, concluido: !item.concluido } : item
    );
    this.salvarNoStorage();
  }

  removerHabito(id: number): void {
    this.habitos = this.habitos.filter((item) => item.id !== id);
    this.salvarNoStorage();
  }

  calcularImpactoCo2Concluido(): number {
    const total = this.habitos
      .filter((h) => h.concluido)
      .reduce((acc, h) => acc + h.co2EstimadoKg, 0);
    return Number(total.toFixed(2));
  }
}