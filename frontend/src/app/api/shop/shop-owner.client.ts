import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShopOwnerDetailDto} from '../../data/client/model/shopOwnerDetailDto';
import {UpdateShopDto} from '../../data/client/model/updateShopDto';

@Injectable({providedIn: 'root'})
export class ShopOwnerClient {

  constructor(private http: HttpClient) {
  }

  getShopSettings(): Promise<ShopOwnerDetailDto> {
    return new Promise(undefined);
  }

  updateShop(request: UpdateShopDto): Promise<ShopOwnerDetailDto> {
    return new Promise(undefined);
  }

}
