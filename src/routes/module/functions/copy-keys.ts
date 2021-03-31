export function copyKeys<From, T extends (keyof From)[]>(obj: From, ...keys: T): Pick<From, T[any]> {
    let resultObj: Pick<From, T[any]> = {} as any;

    keys.forEach((key: keyof From) => {
        if (!!obj[key]) {
            resultObj[key] = obj[key];
        }
    });

    return resultObj;
}
