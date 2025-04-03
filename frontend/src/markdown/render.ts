import { Pattern } from "./Pattern";
import { Rule } from "./Rule";

const defaultRules: Rule[] = [
    new Rule("header",
        [
            new Pattern(/^#{1,1}\s([^\n]+)/gm, `<h1>$1</h1>`),
            new Pattern(/^#{2,2}\s([^\n]+)/gm, `<h2>$1</h2>`),
            new Pattern(/^#{3,3}\s([^\n]+)/gm, `<h3>$1</h3>`),
            new Pattern(/^#{4,4}\s([^\n]+)/gm, `<h4>$1</h4>`),
            new Pattern(/^#{5,5}\s([^\n]+)/gm, `<h5>$1</h5>`),
            new Pattern(/^#{6,6}\s([^\n]+)/gm, `<h6>$1</h6>`),
        ]
    ),
    new Rule("transfer",
        [
            new Pattern(/\\/g, '<br/>'),
            new Pattern(/\<br\/\>/g, '<br/>'),
        ]
    ),
    new Rule("styleText",
        [
            new Pattern(/\*\*([^\n]+)\*\*/gm, `<b>$1</b>`),
            new Pattern(/\_\_([^\n]+)\_\_/gm, `<b>$1</b>`),
            new Pattern(/\*([^\n]+?)\*/gm, `<i>$1</i>`),
            new Pattern(/\_\s?([^\n]+)\_/gm, `<i>$1</i>`),
            new Pattern(/\~{2}([^\n]+)\~{2}/gm, `<s>$1</s>`),
            new Pattern(/\_\s?([^\n]+)\_/gm, `<u>$1</u>`),
        ]
    ),
    new Rule("image",
        [
            new Pattern(/^\!\[([^\n]+)\]\(([^\n]+)\)/gm, `<img src="$2" alt="$1"/>`),
        ]
    ),
    new Rule("link",
        [
            new Pattern(/^\[([^\n]+)\]\(([^\n]+)\)/gm, '<a href="$2" target="_blank" rel="noopener">$1</a>'),
        ]
    ),
    new Rule("paragraph",
        [
            new Pattern(/^([^\s1-9\-#\[\]\>\!\|\*][^\n]+)/gm, '<p>$1</p>'),
        ]
    ),
    new Rule("blockquotes",
        [
            new Pattern(/\>\s([^\n]+)/g, '<blockquotes>$1</blockquotes>'),
        ]
    )
]

export class RMark {
    private rules: Rule[] = defaultRules
    
    public render(raw:string) {
        let result = raw
        this.rules.forEach((rule) => {
            result = rule.apply(result)
        })
        console.log(result)
        return result
    }
}