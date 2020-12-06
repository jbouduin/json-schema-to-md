import { FormattedAttribute } from "./formatted-attribute";

export abstract class Formatter {
  protected buildTableRow(columns: Array<string | undefined>): string {
    return `| ${columns.join(' | ')} |`
  }

  protected buildListItem(value: FormattedAttribute): string {
    return `- **${value.label}**: ${value.value}`
  }
}