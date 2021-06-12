Convert JavaScript objects to XML
=================================

`js2xml` utility ported to Deno from [xml-js](https://github.com/nashwaan/xml-js) library.

Parsing XML into objects is NOT supported.

Usage example
-------------

```
import js2xml from "https://raw.githubusercontent.com/notranspile-js/deno-js2xml/<VERSION>/js2xml.js";

const obj = {
  foo: "bar",
  baz: 42
};

const xml = js2xml(obj, {
  compact: true,
  spaces: 4
})
```

License information
-------------------

This project is released under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).