/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {BreaksDto} from './breaksDto';
import {SlotConfigDto} from './slotConfigDto';
import {SocialLinks} from './socialLinks';

export interface ShopOwnerDetailDto {
  addressSupplement?: string;
  autoColorEnabled?: boolean;
  breaks?: BreaksDto;
  city?: string;
  contacts?: { [key: string]: string; };
  details?: string;
  id?: string;
  imageUrl?: string;
  name?: string;
  ownerName?: string;
  shareLink?: string;
  slots?: SlotConfigDto;
  socialLinks?: SocialLinks;
  street?: string;
  website?: string;
  zipCode?: string;
}
