const merge = (a: string[], b: string[], predicate = (a:string, b:string) => a === b) : string[] => {
    const c:string[] = [...a]; // copy to avoid side effects
    // add all items from B to copy C if they're not already present
    b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
    return c;
}

export default merge
