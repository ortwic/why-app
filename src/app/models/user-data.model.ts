export type UserData<TValue> = Record<string, UserDataEntry<TValue>>;

export type UserDataEntry<TValue> = Record<string, TValue>;