import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MyItemModule } from './components/item/item.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { FilterItemsPipe } from './pipes/filter-items.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { PageItemComponent } from './components/page-item/page-item.component';
import { PageItemsListComponent } from './components/page-items-list/page-items-list.page';

@NgModule({
  declarations: [
    MyItemModule,
    ItemsListComponent,
    FilterItemsPipe,
    PageItemComponent,
    PageItemsListComponent,
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
    MyItemModule,
    ItemsListComponent,
    PageItemComponent,
    PageItemsListComponent,
  ]
})
export class ItemModule { }
