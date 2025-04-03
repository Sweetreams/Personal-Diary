export class Pattern {
    regexp: RegExp
    replaceText: string
    constructor(regexp: RegExp, replaceText: string){
        this.regexp = regexp
        this.replaceText = replaceText
    }

    apply(raw:string): string{
        return raw.replace(this.regexp, this.replaceText)
    }
}