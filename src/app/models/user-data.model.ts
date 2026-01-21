export type RecordKey = string | number;
export type SetKey = string;

export type UserStorage<T> = Record<RecordKey, UserDataRecord<T>>;
export type UserDataRecord<T> = Record<SetKey, UserDataItems<T>>;
export type UserDataItemSet<T> = UserDataItems<T>[] | UserDataItems<T>;
export type UserDataItems<T> = Record<string, T>;