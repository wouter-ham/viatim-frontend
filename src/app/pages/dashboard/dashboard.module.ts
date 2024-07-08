import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ComponentsModule],
})
export class DashboardModule {}
