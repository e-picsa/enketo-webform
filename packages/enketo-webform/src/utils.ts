import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import type { X2jOptions } from 'fast-xml-parser';

/**
 * Converts an XML string to a JSON object.
 * @param xmlString - The XML string to parse
 * @param options - Optional fast-xml-parser options
 * @returns Parsed JSON object
 */
export function xmlToJson<T = Record<string, any>>(xmlString: string, options: X2jOptions = {}) {
  const parser = new XMLParser(options);
  return parser.parse(xmlString) as T;
}

/**
 * Converts a JSON object to an XML string.
 * @param json - The JSON object to convert
 * @returns XML string
 */
export function jsonToXML(json: Record<string, any>) {
  const builder = new XMLBuilder();
  return builder.build(json);
}

/**
 * Creates a File object from an XML string (browser only).
 * @param xmlString - The XML string
 * @returns File object
 * @throws Error if File API is not supported
 */
export function xmlStringToFile(xmlString: string) {
  if (typeof window !== 'undefined') {
    const blob = new Blob([xmlString]);
    if ('File' in window) {
      return new File([blob], 'submission.xml', { type: 'application/xml' });
    }
  }
  throw new Error('File api not supported in this environment');
}

/**
 * Replaces the content of a specific XML node.
 * @param options - Configuration object
 * @param options.xml - The XML string
 * @param options.tagname - The tag name to replace content in
 * @param options.content - The new content
 * @returns Updated XML string
 */
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