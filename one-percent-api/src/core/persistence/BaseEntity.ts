export interface BaseEntity<T = unknown> {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  props: T;
}
