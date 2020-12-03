export abstract class Formatter {
  protected buildTableRow(columns: Array<string | undefined>): string {
    return `| ${columns.join(' | ')} |`
  }
}