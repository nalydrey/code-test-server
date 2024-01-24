import { extentionRegExp } from "../data/reg-exp"

export const getExtantionFromString = (string: string) => {
    const extantionArr = string.match(extentionRegExp)
    if(extantionArr && extantionArr.length>=1){
        return extantionArr[0].slice(1)
    }
    return null
}