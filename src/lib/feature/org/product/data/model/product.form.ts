export type ProductFormAction = "create" | "update" | "delete";
export type ProductFormItem = {
  product: any;
  action: ProductFormAction;
  open: boolean;
};