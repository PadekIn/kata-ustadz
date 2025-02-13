import Hashids from "hashids";

const HASH_SALT = process.env.HASH_SALT || "default_salt";
const hashids = new Hashids(HASH_SALT, 11);

export const hashid = (id: number): string => {
    return hashids.encode(id);
};

export const unhashid = (hashid: string) => {
    return hashids.decode(hashid);
};