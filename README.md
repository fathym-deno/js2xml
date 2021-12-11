Convert JavaScript objects to XML
=================================

`js2xml` utility ported to Deno from [xml-js](https://github.com/nashwaan/xml-js) library.

This library has no dependencies, parsing XML into objects is NOT supported. 

Usage example
-------------

```
import { js2xml } from "https://deno.land/x/js2xml@1.0.1/mod.js";

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