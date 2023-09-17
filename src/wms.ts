import { $query, $update, Record, Result, StableBTreeMap, Vec, match, nat64, ic, Opt } from 'azle';
import { v4 as uuidv4 } from 'uuid';

/**
 * This type represents a stuff we could stock, order, supply
 */
type Stuff = Record<{
    id:             string;
    publicID:       number;
    name:           string;
    description:    string;
    imageURL:       string;
    createdAt:      nat64;
    updatedAt:      Opt<nat64>;
}>

type StuffPayload = Record<{
    publicID:       number;
    name:           string;
    description:    string;
    imageURL:       string;
}>

const stuffStorage = new StableBTreeMap<string, Stuff>(0, 44, 1024);

const stuffIdFromPublicID = [];
let stuffCounter = 0;

$query;
export function getStuffs(): Result<Vec<Stuff>, string> {
    return Result.Ok(stuffStorage.values());
}

$query;
export function getStuff(id: string): Result<Stuff, string> {
    return match(stuffStorage.get(id), {
        Some: (stuff) => Result.Ok<Stuff, string>(stuff),
        None: () => Result.Err<Stuff, string>(`There is no stuff with id={$id}.`)
    });
}

export function getStuffIdFromPublicID(publicID: number): Result<string, string> {
    if (publicID >= 0 && publicID <= stuffCounter && stuffIdFromPublicID[publicID] != "") {
        return Result.Ok<string, string>(stuffIdFromPublicID[publicID]);
    } else {
        return Result.Err<string, string>(`There is no knowned stuffID matching publicID = {$publicID}.`);
    }
}

$update;
export function addStuff(payload: StuffPayload):Result<Stuff, string> {
    const stuff: Stuff = { id: uuidv4(), publicID: stuffCounter, createdAt: ic.time(), updatedAt: Opt.None, ...payload };
    stuffStorage.insert(stuff.id, stuff);
    stuffIdFromPublicID[stuffCounter] = stuff.id;
    stuffCounter++;
    return Result.Ok<Stuff, string>(stuff);
}

$update;
export function updateStuff(id: string, payload: StuffPayload): Result<Stuff, string> {
    return match(stuffStorage.get(id), {
        Some: (stuff) => {
            const updatedStuff = {...stuff, ...payload, updatedAt: Opt.Some(ic.time())};
            stuffStorage.insert(id, updatedStuff);
            return  Result.Ok<Stuff, string>(updatedStuff);
        },
        None: () => {
            return Result.Err<Stuff, string>(`can't update stuff cause no stuff found with id={$id}.`);
        }
    });
}

$update;
export function removeStuff(id: string): Result<Stuff, string> {
    return match(stuffStorage.remove(id), {
        Some: (stuff) => {
            stuffIdFromPublicID[stuff.publicID] = "";
            return Result.Ok<Stuff, string>(stuff)
        },
        None: () => Result.Err<Stuff, string>(`can't delete stuff cause no stuff found with id={$id}.`)
    });
}

//-----------------------------------------//
globalThis.crypto = {
    // ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32)

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256)
        }
        return array;
    }
}