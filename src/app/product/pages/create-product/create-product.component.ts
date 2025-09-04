import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  standalone: false,
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  productForm!: FormGroup;
  productId: string | null = null; 
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  onHome(){
    this.router.navigate(['/products']);
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(1)]]
    });

    
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct(this.productId);
    }
  }

  loadProduct(id: string): void {
    console.log('Cargando producto con id:', id);
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue(product);
      },
      error: (err) => console.error('Error al cargar producto', err)
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      if (this.isEditMode && this.productId) {


        this.productService.updateProduct(productData, this.productId).subscribe({
          next: (res) => this.onHome(),
          error: (err) => console.error('Error al actualizar', err)
        });
      } else {
        this.productService.createProduct(productData).subscribe({
          next: (res) => this.onHome(),
          error: (err) => console.error('Error al crear', err)
        });
      }
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
