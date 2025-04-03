import { Pattern } from "./Pattern";

export class Rule {
    name: string
    patterns: Pattern[]
    constructor(name: string, patterns: Pattern[]) {
        this.name = name
        this.patterns = patterns
    }

    apply(raw: string): string {
      // console.log(raw)
        return this.patterns.reduce(
          (result, pattern) => pattern.apply(result),
          raw
        );
      }
}