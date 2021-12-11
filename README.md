Convert JavaScript objects to XML
=================================

`js2xml` utility ported to Deno from [xml-js](https://github.com/nashwaan/xml-js) library.

This library has no dependencies, parsing XML into objects is NOT supported. 

Usage example
-------------

```
import { js2xml } from "https://deno.land/x/js2xml@1.0.1/mod.ts";

const obj = {
  foo: {
    bar: {
      _text: "41",
    },
    baz: {
      _attributes: {
        boo: "42",
      },
      baa: {
        _cdata: "43",
      },
    },
  },
};

const xml = js2xml(obj, {
  compact: true,
  spaces: 4,
});

console.log(xml);
```

Output:

```
<foo>
    <bar>41</bar>
    <baz boo="42">
        <baa><![CDATA[43]]></baa>
    </baz>
</foo>
```

License information
-------------------

This project is released under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).