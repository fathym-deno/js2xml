/*
 * Copyright 2021, alex at staticlibs.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// adapted from: https://github.com/nashwaan/xml-js

import helper from "./options-helper.ts";
import { Js2XmlOptions } from "./options.ts";

let currentElement: unknown, currentElementName: string;

function validateOptions(userOptions: Record<string, unknown>) {
  const options = helper.copyOptions(userOptions);
  helper.ensureFlagExists("ignoreDeclaration", options);
  helper.ensureFlagExists("ignoreInstruction", options);
  helper.ensureFlagExists("ignoreAttributes", options);
  helper.ensureFlagExists("ignoreText", options);
  helper.ensureFlagExists("ignoreComment", options);
  helper.ensureFlagExists("ignoreCdata", options);
  helper.ensureFlagExists("ignoreDoctype", options);
  helper.ensureFlagExists("compact", options);
  helper.ensureFlagExists("indentText", options);
  helper.ensureFlagExists("indentCdata", options);
  helper.ensureFlagExists("indentAttributes", options);
  helper.ensureFlagExists("indentInstruction", options);
  helper.ensureFlagExists("fullTagEmptyElement", options);
  helper.ensureFlagExists("noQuotesForNativeAttributes", options);
  helper.ensureSpacesExists(options);
  if (typeof options.spaces === "number") {
    options.spaces = Array(options.spaces + 1).join(" ");
  }
  helper.ensureKeyExists("declaration", options);
  helper.ensureKeyExists("instruction", options);
  helper.ensureKeyExists("attributes", options);
  helper.ensureKeyExists("text", options);
  helper.ensureKeyExists("comment", options);
  helper.ensureKeyExists("cdata", options);
  helper.ensureKeyExists("doctype", options);
  helper.ensureKeyExists("type", options);
  helper.ensureKeyExists("name", options);
  helper.ensureKeyExists("elements", options);
  return options;
}

function writeIndentation(
  options: Record<string, unknown>,
  depth: number,
  firstLine: boolean,
) {
  return (!firstLine && options.spaces ? "\n" : "") +
    Array(depth + 1).join(options.spaces as string);
}

function writeAttributes(
  attributes: Record<string, unknown>,
  options: Record<string, unknown>,
  depth: number,
) {
  if (options.ignoreAttributes) {
    return "";
  }
  let key, attr, attrName, quote;
  const result = [];
  for (key in attributes) {
    if (
      attributes.hasOwnProperty(key) && attributes[key] !== null &&
      attributes[key] !== undefined
    ) {
      quote = options.noQuotesForNativeAttributes &&
          typeof attributes[key] !== "string"
        ? ""
        : '"';
      attr = "" + attributes[key]; // ensure number and boolean are converted to String
      attr = attr.replace(/&/g, "&amp;");
      attr = attr.replace(/</g, "&lt;");
      attr = attr.replace(/>/g, "&gt;");
      attr = attr.replace(/"/g, "&quot;");
      attrName = key;
      result.push(
        (options.spaces && options.indentAttributes
          ? writeIndentation(options, depth + 1, false)
          : " "),
      );
      result.push(attrName + "=" + quote + attr + quote);
    }
  }
  if (
    attributes && Object.keys(attributes).length && options.spaces &&
    options.indentAttributes
  ) {
    result.push(writeIndentation(options, depth, false));
  }
  return result.join("");
}

function writeDeclaration(
  declaration: Record<string, unknown>,
  options: Record<string, unknown>,
  depth: number,
) {
  currentElement = declaration;
  currentElementName = "xml";
  return options.ignoreDeclaration ? "" : "<?" + "xml" +
    writeAttributes(
      declaration[options.attributesKey as string] as Record<string, unknown>,
      options,
      depth,
    ) + "?>";
}

function writeInstruction(
  instruction: Record<string, unknown>,
  options: Record<string, unknown>,
  depth: number,
) {
  if (options.ignoreInstruction) {
    return "";
  }
  let key;
  for (key in instruction) {
    if (instruction.hasOwnProperty(key)) {
      break;
    }
  }
  const instructionName = key;
  if (typeof instruction[key as string] === "object") {
    currentElement = instruction;
    currentElementName = instructionName as string;
    return "<?" + instructionName +
      writeAttributes(
        (instruction[key as string] as Record<string, unknown>)[
          options.attributesKey as string
        ] as Record<string, unknown>,
        options,
        depth,
      ) + "?>";
  } else {
    const instructionValue = instruction[key as string]
      ? instruction[key as string]
      : "";
    return "<?" + instructionName + (instructionValue
      ? " " + instructionValue
      : "") +
      "?>";
  }
}

function writeComment(comment: string, options: Record<string, unknown>) {
  return options.ignoreComment ? "" : "<!--" + comment + "-->";
}

function writeCdata(cdata: string, options: Record<string, unknown>) {
  return options.ignoreCdata
    ? ""
    : "<![CDATA[" + cdata.replace("]]>", "]]]]><![CDATA[>") + "]]>";
}

function writeDoctype(doctype: string, options: Record<string, unknown>) {
  return options.ignoreDoctype ? "" : "<!DOCTYPE " + doctype + ">";
}

function writeText(text: string, options: Record<string, unknown>) {
  if (options.ignoreText) return "";
  text = "" + text; // ensure Number and Boolean are converted to String
  text = text.replace(/&amp;/g, "&"); // desanitize to avoid double sanitization
  text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(
    />/g,
    "&gt;",
  );
  return text;
}

function hasContent(
  element: Record<string, unknown>,
  options: Record<string, unknown>,
) {
  let i;
  if (element.elements && (element.elements as unknown[]).length) {
    for (i = 0; i < (element.elements as unknown[]).length; ++i) {
      switch (
        ((element.elements as unknown[])[i] as Record<string, unknown>)[
          options.typeKey as string
        ]
      ) {
        case "text":
          if (options.indentText) {
            return true;
          }
          break; // skip to next key
        case "cdata":
          if (options.indentCdata) {
            return true;
          }
          break; // skip to next key
        case "instruction":
          if (options.indentInstruction) {
            return true;
          }
          break; // skip to next key
        case "doctype":
        case "comment":
        case "element":
          return true;
        default:
          return true;
      }
    }
  }
  return false;
}

function writeElement(
  element: Record<string, unknown>,
  options: Record<string, unknown>,
  depth: number,
) {
  currentElement = element;
  currentElementName = element.name as string;
  const xml = [], elementName = element.name;
  xml.push("<" + elementName);
  if (element[options.attributesKey as string]) {
    xml.push(
      writeAttributes(
        element[options.attributesKey as string] as Record<string, unknown>,
        options,
        depth,
      ),
    );
  }
  let withClosingTag = element[options.elementsKey as string] &&
      (element[options.elementsKey as string] as unknown[]).length ||
    element[options.attributesKey as string] &&
      (element[options.attributesKey as string] as Record<string, unknown>)[
          "xml:space"
        ] === "preserve";
  if (!withClosingTag) {
    withClosingTag = options.fullTagEmptyElement;
  }
  if (withClosingTag) {
    xml.push(">");
    if (
      element[options.elementsKey as string] &&
      (element[options.elementsKey as string] as unknown[]).length
    ) {
      xml.push(
        writeElements(
          element[options.elementsKey as string] as unknown[],
          options,
          depth + 1,
          false,
        ),
      );
      currentElement = element;
      currentElementName = element.name as string;
    }
    xml.push(
      options.spaces && hasContent(element, options)
        ? "\n" + Array(depth + 1).join(options.spaces as string)
        : "",
    );
    xml.push("</" + elementName + ">");
  } else {
    xml.push("/>");
  }
  return xml.join("");
}

function writeElements(
  elements: unknown[],
  options: Record<string, unknown>,
  depth: number,
  firstLine: boolean,
): string {
  return elements.reduce(function (xml: unknown, element: unknown): unknown {
    const indent = writeIndentation(options, depth, firstLine && !xml);
    switch ((element as Record<string, unknown>).type) {
      case "element":
        return xml + indent +
          writeElement((element as Record<string, unknown>), options, depth);
      case "comment":
        return xml + indent +
          writeComment(
            (element as Record<string, unknown>)[
              options.commentKey as string
            ] as string,
            options,
          );
      case "doctype":
        return xml + indent +
          writeDoctype(
            (element as Record<string, unknown>)[
              options.doctypeKey as string
            ] as string,
            options,
          );
      case "cdata":
        return xml + (options.indentCdata ? indent : "") +
          writeCdata(
            (element as Record<string, unknown>)[
              options.cdataKey as string
            ] as string,
            options,
          );
      case "text":
        return xml + (options.indentText ? indent : "") +
          writeText(
            (element as Record<string, unknown>)[
              options.textKey as string
            ] as string,
            options,
          );
      case "instruction": {
        const instruction: Record<string, unknown> = {};
        instruction[
          (element as Record<string, unknown>)[
            options.nameKey as string
          ] as string
        ] =
          (element as Record<string, unknown>)[options.attributesKey as string]
            ? element
            : (element as Record<string, unknown>)[
              options.instructionKey as string
            ];
        return xml + (options.indentInstruction ? indent : "") +
          writeInstruction(instruction, options, depth);
      }
    }
  }, "") as string;
}

function hasContentCompact(
  element: Record<string, unknown>,
  options: Record<string, unknown>,
  anyContent: unknown,
) {
  let key;
  for (key in element) {
    if (element.hasOwnProperty(key)) {
      switch (key) {
        case options.parentKey:
        case options.attributesKey:
          break; // skip to next key
        case options.textKey:
          if (options.indentText || anyContent) {
            return true;
          }
          break; // skip to next key
        case options.cdataKey:
          if (options.indentCdata || anyContent) {
            return true;
          }
          break; // skip to next key
        case options.instructionKey:
          if (options.indentInstruction || anyContent) {
            return true;
          }
          break; // skip to next key
        case options.doctypeKey:
        case options.commentKey:
          return true;
        default:
          return true;
      }
    }
  }
  return false;
}

function writeElementCompact(
  element: Record<string, unknown>,
  name: string,
  options: Record<string, unknown>,
  depth: number,
  indent: boolean,
): string {
  currentElement = element;
  currentElementName = name;
  const elementName = name;
  if (
    typeof element === "undefined" || element === null ||
    element as unknown === ""
  ) {
    return options.fullTagEmptyElement
      ? "<" + elementName + "></" + elementName + ">"
      : "<" + elementName + "/>";
  }
  const xml = [];
  if (name) {
    xml.push("<" + elementName);
    if (typeof element !== "object") {
      xml.push(">" + writeText(element, options) + "</" + elementName + ">");
      return xml.join("");
    }
    if (element[options.attributesKey as string]) {
      xml.push(
        writeAttributes(
          element[options.attributesKey as string] as Record<string, unknown>,
          options,
          depth,
        ),
      );
    }
    let withClosingTag = hasContentCompact(element, options, true) ||
      element[options.attributesKey as string] &&
        (element[options.attributesKey as string] as Record<string, unknown>)[
            "xml:space"
          ] === "preserve";
    if (!withClosingTag) {
      withClosingTag = options.fullTagEmptyElement;
    }
    if (withClosingTag) {
      xml.push(">");
    } else {
      xml.push("/>");
      return xml.join("");
    }
  }
  xml.push(writeElementsCompact(element, options, depth + 1, false));
  currentElement = element;
  currentElementName = name;
  if (name) {
    xml.push(
      (indent ? writeIndentation(options, depth, false) : "") + "</" +
        elementName + ">",
    );
  }
  return xml.join("");
}

function writeElementsCompact(
  element: Record<string, unknown>,
  options: Record<string, unknown>,
  depth: number,
  firstLine: boolean,
) {
  let i, key, nodes: unknown[], xml = [];
  for (key in element) {
    if (element.hasOwnProperty(key)) {
      nodes = (Array.isArray(element[key])
        ? element[key]
        : [element[key]]) as unknown[];
      for (i = 0; i < nodes.length; ++i) {
        switch (key) {
          case options.declarationKey:
            xml.push(
              writeDeclaration(
                nodes[i] as Record<string, unknown>,
                options,
                depth,
              ),
            );
            break;
          case options.instructionKey:
            xml.push(
              (options.indentInstruction
                ? writeIndentation(options, depth, firstLine)
                : "") +
                writeInstruction(
                  nodes[i] as Record<string, unknown>,
                  options,
                  depth,
                ),
            );
            break;
          case options.attributesKey:
          case options.parentKey: // skip
            break;
          case options.textKey:
            xml.push(
              (options.indentText
                ? writeIndentation(options, depth, firstLine)
                : "") + writeText(nodes[i] as string, options),
            );
            break;
          case options.cdataKey:
            xml.push(
              (options.indentCdata
                ? writeIndentation(options, depth, firstLine)
                : "") + writeCdata(nodes[i] as string, options),
            );
            break;
          case options.doctypeKey:
            xml.push(
              writeIndentation(options, depth, firstLine) +
                writeDoctype(nodes[i] as string, options),
            );
            break;
          case options.commentKey:
            xml.push(
              writeIndentation(options, depth, firstLine) +
                writeComment(nodes[i] as string, options),
            );
            break;
          default:
            xml.push(
              writeIndentation(options, depth, firstLine) +
                writeElementCompact(
                  nodes[i] as Record<string, unknown>,
                  key,
                  options,
                  depth,
                  hasContentCompact(
                    nodes[i] as Record<string, unknown>,
                    options,
                    undefined,
                  ),
                ),
            );
        }
        firstLine = firstLine && !xml.length;
      }
    }
  }
  return xml.join("");
}

export default function (
  js: Record<string, unknown>,
  options: Js2XmlOptions,
) {
  options = validateOptions(options);
  const xml = [];
  currentElement = js;
  currentElementName = "_root_";
  if (options.compact) {
    xml.push(writeElementsCompact(js, options, 0, true));
  } else {
    if (js[options.declarationKey as string]) {
      xml.push(
        writeDeclaration(
          js[options.declarationKey as string] as Record<string, unknown>,
          options,
          0,
        ),
      );
    }
    if (
      js[options.elementsKey as string] &&
      (js[options.elementsKey as string] as unknown[]).length
    ) {
      xml.push(
        writeElements(
          js[options.elementsKey as string] as unknown[],
          options,
          0,
          !xml.length,
        ),
      );
    }
  }
  return xml.join("");
}
