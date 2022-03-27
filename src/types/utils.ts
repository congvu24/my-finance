export interface PayloadWithCallback<T> {
  data: T;
  onSuccess?: Function;
  onFailed?: Function;
}
