import { Schema } from '../schema';
import { AllowableHeaderProperty } from './allowable-header-property';
import { BooleanHeaderProperty } from './boolean-header-property';
import { HeaderPropertiesList } from './header-properties-list';
import { StatusHeaderProperty } from './status-header-property';

let schema: Schema;

beforeAll(() => { schema = new Schema('', '', '{}') });

describe.each([
  [true, 'Yes'],
  [false, 'No'],
  [undefined, 'Undefined']
])('Header property "abstract" header property', (value: boolean | undefined, expected: string) => {
  const header = new HeaderPropertiesList(schema).abstract;
  test('instantiated', () => expect(header).toBeInstanceOf(BooleanHeaderProperty));
  test('label', () => expect(header.displayText(value)).toBe(expected));
});

describe.each([
  [true, 'Yes'],
  [false, 'No'],
  [undefined, 'Undefined']
])('Header property "extensible" header property', (value: boolean | undefined, expected: string) => {
  const header = new HeaderPropertiesList(schema).extensible;
  test('instantiated', () => expect(header).toBeInstanceOf(BooleanHeaderProperty));
  test('label', () => expect(header.displayText(value)).toBe(expected));
});

describe.each([
  [true, 'Yes'],
  [false, 'No'],
  [undefined, 'Undefined']
])('Header property "identifiable" header property', (value: boolean | undefined, expected: string) => {
  const header = new HeaderPropertiesList(schema).identifiable;
  test('instantiated', () => expect(header).toBeInstanceOf(BooleanHeaderProperty));
  test('label', () => expect(header.displayText(value)).toBe(expected));
});

describe.each([
  [true, 'Allowed'],
  [false, 'Forbidden'],
  [undefined, 'Undefined']
])('Header property "custom properties" header property', (value: boolean | undefined, expected: string) => {
  const header = new HeaderPropertiesList(schema).custom;
  test('instantiated', () => expect(header).toBeInstanceOf(AllowableHeaderProperty));
  test('label', () => expect(header.displayText(value)).toBe(expected));
});

describe.each([
  [true, 'Allowed'],
  [false, 'Forbidden'],
  [undefined, 'Undefined']
])('Header property "additional properties" header property', (value: boolean | undefined, expected: string) => {
  const header = new HeaderPropertiesList(schema).additional;
  test('instantiated', () => expect(header).toBeInstanceOf(AllowableHeaderProperty));
  test('label', () => expect(header.displayText(value)).toBe(expected));
});

describe.each([
  ['deprecated', 'Deprecated'],
  ['stable', 'Stable'],
  ['stabilizing', 'Stabilizing'],
  ['experimental', 'Experimental'],
  [undefined, 'Unknown']
])('Header property "status" header property', (value: string | undefined, expected: string) => {
  const header = new HeaderPropertiesList(schema).status;
  test('instantiated', () => expect(header).toBeInstanceOf(StatusHeaderProperty));
  test('label', () => expect(header.displayText(value)).toBe(expected));
});