import { TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import { ProductoService } from './producto.service';

describe('ProductoService', () => {
  let service: ProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductoService]
    });
    service = TestBed.get(ProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
