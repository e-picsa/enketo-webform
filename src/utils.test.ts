import { describe, it, expect } from "vitest";
import {
  jsonToXML,
  xmlToJson,
  xmlStringToFile,
  xmlNodeReplaceContent,
} from "./utils";

describe("utils", () => {
  it("converts json to xml", () => {
    const testJSON = { str: "hello", num: 1 };
    const xml = jsonToXML(testJSON);
    expect(xml).toEqual("<str>hello</str><num>1</num>");
  });

  it("converts xml to json without attributes", () => {
    const xml =
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
      "<root>\n" +
      "  <str>hello</str>\n" +
      "  <num>1</num>\n" +
      "</root>";
    const json = xmlToJson(xml);
    expect(json).toEqual({
      "?xml": "",
      root: { str: "hello", num: 1 },
    });
  });

  it("creates a file from xml string in browser", () => {
    const xmlStr = "<test>data</test>";
    const file = xmlStringToFile(xmlStr);
    expect(file).toBeInstanceOf(File);
    expect(file.name).toBe("submission.xml");
  });

  it("replaces xml node content", () => {
    const result = xmlNodeReplaceContent({
      xml: "<model><instance><old>data</old></instance></model>",
      tagname: "instance",
      content: "<new>data</new>",
    });
    expect(result).toContain("<new>data</new>");
  });
});
