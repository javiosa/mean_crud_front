import { AttrAst } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {

  productoForm: FormGroup;
  titulo = 'Crear producto';
  id: string|null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private _productoService: ProductoService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.productoForm = this.fb.group(
      {
        producto: ['', Validators.required],
        categoria: ['', Validators.required],
        ubicacion: ['', Validators.required],
        precio: ['', Validators.required],
      }
    )
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar()
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  agregarProducto():void {
    const producto: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }
    if(this.id !== null){
      //editamos
      console.log(producto)
      this._productoService.editarProducto(this.id, producto).subscribe(data =>{
        this.toastr.info('El producto fue actualizado con éxito!', 'Producto actualizado!');
      this.router.navigate(['/']);
      }, error =>{
        console.log(error);
      }); 
    }else{
      //agregamos
      this._productoService.guardarProducto(producto).subscribe(data =>{
        this.toastr.success('El producto fue registrado con éxito!', 'Producto registrado!');
      this.router.navigate(['/']);
      }, error =>{
        console.log(error);
      }); 
    }

    
  };

  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
          this.productoForm.setValue({
            producto: data.nombre,
            categoria: data.categoria,
            ubicacion: data.ubicacion,
            precio: data.precio
          })
      }, error => {
          console.log(error)
      })
    }
  }
  


}
