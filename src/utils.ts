import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import type { X2jOptions } from 'fast-xml-parser';

export function xmlToJson<T = Record<string, any>>(xmlString: string, options: X2jOptions = {}) {
  const parser = new XMLParser(options);
  return parser.parse(xmlString) as T;
}

export function jsonToXML(json: Record<string, any>) {
  const builder = new XMLBuilder();
  return builder.build(json);
}

export function xmlStringToFile(xmlString: string) {
  if (typeof window !== 'undefined') {
    const blob = new Blob([xmlString]);
    if ('File' in window) {
      return new File([blob], 'submission.xml', { type: 'application/xml' });
    }
  }
  throw new Error('File api not supported in this environment');
}

export function xmlNodeReplaceContent(options: { xml: string; tagname: string; content: string }) {
  const { xml, tagname, content } = options;
  const xmlDoc = parseXmlString(xml);
  const targetEl = xmlDoc.getElementsByTagName(tagname)[0];
  targetEl.innerHTML = content;
  const replacedXmlString = xmlDoc.firstElementChild!.outerHTML.toString();
  return replacedXmlString;
}

function parseXmlString(xmlString: string) {
  return new DOMParser().parseFromString(xmlString, 'application/xml');
}