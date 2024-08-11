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

import { js2xml } from "../mod.ts";

import { describe, expect, it } from "./test-deps.ts";
import testItems from "./test-items.js";

// compat
const convert = { js2xml };

/*global describe,it,expect*/

describe("No options supplied (fallback to defaults):", function () {
  const options = {};
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("Options set to default values explicitly:", function () {
  const options = {
    compact: false,
    spaces: 0,
    ignoreText: false,
    ignoreComment: false,
    ignoreCdata: false,
    fullTagEmptyElement: false,
  };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 4}", function () {
  const options = { spaces: 4, onlyItem: 8 };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 0}", function () {
  const options = { spaces: 0 };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 0, ignoreText: true}", function () {
  const options = { spaces: 0, ignoreText: true };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 0, ignoreComment: true}", function () {
  const options = { spaces: 0, ignoreComment: true };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 0, ignoreCdata: true}", function () {
  const options = { spaces: 0, ignoreCdata: true };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 0, ignoreDoctype: true}", function () {
  const options = { spaces: 0, ignoreDoctype: true };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 0, ignoreDeclaration: true}", function () {
  const options = { spaces: 0, ignoreDeclaration: true };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 0, ignoreInstruction: true}", function () {
  const options = { spaces: 0, ignoreInstruction: true };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 0, fullTagEmptyElement: true}", function () {
  const options = { spaces: 0, fullTagEmptyElement: true };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("Options set to default values explicitly:", function () {
  const options = {
    compact: true,
    spaces: 0,
    ignoreText: false,
    ignoreComment: false,
    ignoreCdata: false,
    fullTagEmptyElement: false,
  };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 4}", function () {
  const options = { compact: true, spaces: 4 };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 0}", function () {
  const options = { compact: true, spaces: 0 };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 0, ignoreText: true}", function () {
  const options = { compact: true, spaces: 0, ignoreText: true };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 0, ignoreComment: true}", function () {
  const options = { compact: true, spaces: 0, ignoreComment: true };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 0, ignoreCdata: true}", function () {
  const options = { compact: true, spaces: 0, ignoreCdata: true };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 0, ignoreDoctype: true}", function () {
  const options = { compact: true, spaces: 0, ignoreDoctype: true };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 0, ignoreDeclaration: true}", function () {
  const options = { compact: true, spaces: 0, ignoreDeclaration: true };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 0, ignoreInstruction: true}", function () {
  const options = { compact: true, spaces: 0, ignoreInstruction: true };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 0, fullTagEmptyElement: true}", function () {
  const options = { compact: true, spaces: 0, fullTagEmptyElement: true };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {}", function () {
  const options = {};
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: true}", function () {
  const options = { spaces: true };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 2}", function () {
  const options = { spaces: 2 };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: 4}", function () {
  const options = { spaces: 4 };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: '  '}", function () {
  const options = { spaces: "  " };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {spaces: \\t}", function () {
  const options = { spaces: "\t" };
  testItems("js2xml", options).forEach(function (test) {
    it(test.desc, function () {
      expect(convert.js2xml(test.js, options)).toEqual(test.xml);
    });
  });
});

describe("options = {instructionHasAttributes: true}", function () {
  it("Write processing instruction attributes, {compact: true}", function () {
    expect(
      convert.js2xml({
        "_instruction": { "go": { "_attributes": { "to": "there" } } },
      }, { compact: true }),
    ).toEqual('<?go to="there"?>');
  });

  it("Write processing instruction attributes, {compact: false}", function () {
    expect(
      convert.js2xml({
        "elements": [{
          "type": "instruction",
          "name": "go",
          "attributes": { "to": "there" },
        }],
      }),
    ).toEqual('<?go to="there"?>');
  });
});
