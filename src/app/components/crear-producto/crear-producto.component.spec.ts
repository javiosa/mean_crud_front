import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';

import { CrearProductoComponent } from './crear-producto.component';

const formBuilder: FormBuilder = new FormBuilder();

describe('CrearProductoComponent', () => {
  let component: CrearProductoComponent;
  let fixture: ComponentFixture<CrearProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
      ],
      declarations: [ CrearProductoComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Form invalid when empty', () => {
    expect(component.productoForm.valid).toBeFalsy();
  });
  it('Producto field validity', ()=> {
    let email = component.productoForm.controls['producto'];
    expect(email.valid).toBeFalsy(); 
  })
  it('Detecta que el form está INCOMPLETO', () => {
  component.productoForm.controls['precio'].setValue(3);
  expect(component.productoForm.valid).toBeFalsy()
});
  it('Detecta que el form está OK', () => {
    component.productoForm.controls['producto'].setValue('Producto');
    component.productoForm.controls['categoria'].setValue('Cat1');
    component.productoForm.controls['ubicacion'].setValue('Ubi1');
    component.productoForm.controls['precio'].setValue(3);
    fixture.nativeElement.querySelector('#submitP').click();
    expect(component.productoForm.valid).toBeTruthy()
  })
  it('Es crear', () => {
    let titulo = fixture.nativeElement.querySelector('#titulo').textContent;
    expect(titulo).toBe('CREAR PRODUCTO');
  })
  it('Es editar', () => {
    component.id = '23423'
    component.esEditar()
    fixture.detectChanges();
    let titulo = fixture.nativeElement.querySelector('#titulo').textContent;
    expect(titulo).toBe('EDITAR PRODUCTO');
  })
});
