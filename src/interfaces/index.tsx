export interface ISigninForm {
  email: string;
  password: string;
}

export interface IUserName {
  ar: string;
  en: string;
}

export interface Item {
  id: number;
  name: IUserName;
  image: string;
  status: number;
  sort_order: number;
}

export interface IImage {
  base64Image: string;
  setBase64Image: Function;
}

export interface IAvatar {
  image: any;
}
