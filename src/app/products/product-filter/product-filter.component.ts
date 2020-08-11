import { CategoryService } from './../../services/category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  @Input('category') category;
  category$

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.category$ = this.categoryService.getAll();
  }

}
