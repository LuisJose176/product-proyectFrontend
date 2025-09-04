import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductDto } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-page',
  standalone: false,
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent  {

  products: ProductDto[] = [];
  totalRecords = 0;
  pageNumber = 1;
  pageSize = 2;

  showConfirm = false;
  productToDelete: string | null = null;

  constructor(private productService: ProductService, private router:Router) { }

  getProducts() {
    this.productService.getProducts(this.pageNumber, this.pageSize).subscribe(data => {  
      this.products = data.items;
      this.totalRecords = data.total;
    });
  }

  ngOnInit() {
    this.getProducts();
  }

  onPageSizeChange(event: any): void {
    this.pageSize = Number(event.target.value);
    this.pageNumber = 1;
    this.getProducts(); 
  }

  nextPage(): void {
    if (this.pageNumber * this.pageSize < this.totalRecords) {
      this.pageNumber++;
      this.getProducts();
    }
  }

  prevPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getProducts();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  onCreate() {
    this.router.navigate(['/products/create']);
  }

  onEdit(id: string): void {
    this.router.navigate(['/products/editar', id]);
  }

  onDelete(id: string): void {
    this.productToDelete = id;
    this.showConfirm = true;
  }

  confirmDelete(): void {
    if (this.productToDelete) {
      this.productService.deleteProduct(this.productToDelete).subscribe({
        next: () => {
          console.log('Producto eliminado');
          this.getProducts();
          this.closeModal();
        },
        error: (err) => console.error('Error al eliminar producto', err)
      });
    }
  }

  cancelDelete(): void {
    this.closeModal();
  }

  private closeModal(): void {
    this.showConfirm = false;
    this.productToDelete = null;
  }

  formatDate(dateInput: string | Date): string {
    const date = new Date(dateInput);
    return date.toLocaleString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }
}
