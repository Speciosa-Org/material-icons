# Material Icons

A package providing material SVG icons in tree-shakable Typescript.

## Package Contents

### TypeScript

The primary exports are all direct TypeScript files.
No compilation to JavaScript is done for the package.
This is intended to be compiled by the consuming application
in order to minimize the complexity of distribution and
number of steps in between source and production code.

#### Icons

The package exports multiple points for icons. Each provides
a style of the icons as individual exports. As well as an
interface for the definition of the icons.
For example, import the two-tone search icon with the following:
`import {search} from '@garbee/material-icons/icons/two-tone'`

By leveraging these exports you get a tree-shakable import.
Meaning your application (given a proper build tool) will only
send the required icon data to users and not the entire library.

* filled
* outlined
* round
* sharp
* two-tone

##### Model Exports

A type is exported that is a list of all valid strings defined
as icon names. For two tone this is `MaterialTwoTone` for example.
Patterned to all the others, `MaterialFilled` for example of filled.

An interface is exported that defines the structure of the
exported icons. `MaterialTwoToneInterface` for example with
two toned. `data` is the actual SVG content of each icon.
`name` is the string to identify the icon by.

The model data is useful for example when defining
icons in an Angular application's icon registry (for Material.)
It allows you to define the SVGs to the identifier from the
source. Then you can build a subset type to use throughout
your application to make sure all strings asked for are valid
registered icons.

#### Default Export

The following exports are from the default
`@garbee/material-icons` export. In general, DO NOT
use this export for your application. This is meant as a
quick collection to build up things like visual search
tools. It is more difficult to tree-shake unused bits
down. Prefer using the other direct exports.

* `filledIcons`
* `outlinedIcons`
* `roundIcons`
* `sharpIcons`
* `twoToneIcons`

### SVG

The "svg" folder provides all 24px SVGs from the upstream
[material design icons](https://github.com/google/material-design-icons).
They are organized by the upstream grouping with files named
after the folder the SVGs resided in.

These are not exported through NPM. They exist more for
direct reference by other tooling, such as svg-to-ts, in case
a use-case of an organization or project demands another route.

## Known inconsistency

### Missing Icons

Some of the styles do not have all the icons available. This
is because they are missing in the upstream library in the
different styles. So, not every style has every icon. Before
filing an issue about something missing in a style, please
verify it exists upstream.

### Name Changes

There are a few cases where things needed to be renamed.
This is because of two distinct reasons. First, some icons
have names of reserved words in JavaScript/TypeScript. For
these cases, "Icon" was appended to the name. These instances
are `class`, `delete`, `try`, `public`.

Second, some icons had names that started with a number.
This is not allowed in JavaScript to be a variable name.
For these cases, the numbers were replaced with their text
equivalent. For example, `360` became `three_hundred_sixty`.
For a comprehensive list, you can check the `bin/gather-icons.mjs`
file contents and look in the `renameMap` content.
