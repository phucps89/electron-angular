export interface MetaResponse<Model> {
  _type: string;
  _time: string;
  results: Model
}
