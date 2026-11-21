import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
// Rotas do app: tela inicial, página Sobre & ODS e fallback pra home
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre', component: SobreComponent },
  // Qualquer rota desconhecida volta pra tela principal
  { path: '**', redirectTo: '' },
];