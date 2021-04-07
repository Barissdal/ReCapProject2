import { Color } from "./color";
import { ResponseModel } from "./responseModel";

export interface ColorResponseModel extends ResponseModel{
  color:Color[];
}
