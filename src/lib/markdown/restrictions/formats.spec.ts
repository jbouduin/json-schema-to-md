import { Format } from './format';
import { FormatsList } from './formats-list';

describe('Test all known FormatsList', () => {
  test('dateTime', () => expect(FormatsList.dateTime).toBeInstanceOf(Format));
  test('date', () => expect(FormatsList.date).toBeInstanceOf(Format));
  test('time', () => expect(FormatsList.time).toBeInstanceOf(Format));
  test('duration', () => expect(FormatsList.duration).toBeInstanceOf(Format));
  test('email', () => expect(FormatsList.email).toBeInstanceOf(Format));
  test('idnEmail', () => expect(FormatsList.idnEmail).toBeInstanceOf(Format));
  test('hostname', () => expect(FormatsList.hostname).toBeInstanceOf(Format));
  test('idnHostname', () => expect(FormatsList.idnHostname).toBeInstanceOf(Format));
  test('ipv4', () => expect(FormatsList.ipv4).toBeInstanceOf(Format));
  test('ipv6', () => expect(FormatsList.ipv6).toBeInstanceOf(Format));
  test('uri', () => expect(FormatsList.uri).toBeInstanceOf(Format));
  test('iri', () => expect(FormatsList.iri).toBeInstanceOf(Format));
  test('uriReference', () => expect(FormatsList.uriReference).toBeInstanceOf(Format));
  test('iriReference', () => expect(FormatsList.iriReference).toBeInstanceOf(Format));
  test('uuid', () => expect(FormatsList.uuid).toBeInstanceOf(Format));
  test('jsonPointer', () => expect(FormatsList.jsonPointer).toBeInstanceOf(Format));
  test('relativeJsonPointer', () => expect(FormatsList.relativeJsonPointer).toBeInstanceOf(Format));
  test('regex', () => expect(FormatsList.regex).toBeInstanceOf(Format));
  test('uriTemplate', () => expect(FormatsList.uriTemplate).toBeInstanceOf(Format));
});

