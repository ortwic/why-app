export type UserDataArray<T> = Array<UserDataRecord<T>>;
export type UserDataRecord<T> = Record<string, UserDataItems<T>>;
export type UserDataItemSet<T> = UserDataItems<T>[] | UserDataItems<T>;
export type UserDataItems<T> = Record<string, T>;