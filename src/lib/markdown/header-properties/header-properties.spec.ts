import { AllowableHeaderProperty } from './allowable-header-property';
import { BooleanHeaderProperty } from './boolean-header-property';
import { HeaderPropertiesList } from './header-properties-list';
import { StatusHeaderProperty } from './status-header-property';

describe.each([
  [true, 'Yes'],
  [false, 'No'],
  [undefined, 'Undefined']
])('Header property "abstract" header property', (value: boolean | undefined, expected: string) => {
  const header = HeaderPropertiesList.abstract;
  test('instantiated', () => expect(header).toBeInstanceOf(BooleanHeaderProperty));
  test('label', () => expect(header.displayText(value)).toBe(expected));
});

describe.each([
  [true, 'Yes'],
  [false, 'No'],
  [undefined, 'Undefined']
])('Header property "extensible" header property', (value: boolean | undefined, expected: string) => {
  const header = HeaderPropertiesList.extensible;
  test('instantiated', () => expect(header).toBeInstanceOf(BooleanHeaderProperty));
  test('label', () => expect(header.displayText(value)).toBe(expected));
});

describe.each([
  [true, 'Yes'],
  [false, 'No'],
  [undefined, 'Undefined']
])('Header property "identifiable" header property', (value: boolean | undefined, expected: string) => {
  const header = HeaderPropertiesList.identifiable;
  test('instantiated', () => expect(header).toBeInstanceOf(BooleanHeaderProperty));
  test('label', () => expect(header.displayText(value)).toBe(expected));
});

describe.each([
  [true, 'Allowed'],
  [false, 'Forbidden'],
  [undefined, 'Undefined']
])('Header property "custom properties" header property', (value: boolean | undefined, expected: string) => {
  const header = HeaderPropertiesList.custom;
  test('instantiated', () => expect(header).toBeInstanceOf(AllowableHeaderProperty));
  test('label', () => expect(header.displayText(value)).toBe(expected));
});

describe.each([
  [true, 'Allowed'],
  [false, 'Forbidden'],
  [undefined, 'Undefined']
])('Header property "additional properties" header property', (value: boolean | undefined, expected: string) => {
  const header = HeaderPropertiesList.additional;
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
  const header = HeaderPropertiesList.status;
  test('instantiated', () => expect(header).toBeInstanceOf(StatusHeaderProperty));
  test('label', () => expect(header.displayText(value)).toBe(expected));
});