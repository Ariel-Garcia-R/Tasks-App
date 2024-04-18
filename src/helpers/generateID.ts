export const generateID = (): string => {
    return String(Math.floor(Math.random() * 100000000 + 1))
}