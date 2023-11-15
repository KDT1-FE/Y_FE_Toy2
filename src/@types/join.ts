export interface JoinForm {
  password: string;
  name: string;
  id: string;
  file: FileList;
}

export interface JoinInfo extends Omit<JoinForm, 'file'> {
  picture?: string;
}
