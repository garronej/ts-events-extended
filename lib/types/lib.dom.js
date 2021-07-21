"use strict";
/*
This is a curated re export of the dom API definitions.

The DOM definitions are available only when "compilerOptions": { "lib": ["DOM"] }}
is present in the tsconfig.json.

We need we re-export those definitions so that we can expose methods that interact with
the DOM ( ex Evt.from ) while not producing type error when
EVT is imported in project that does not use 'lib DOM', typically
projects that targets Node.JS.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.__hack = void 0;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
exports.__hack = "NOT TYPE ONLY";
//# sourceMappingURL=lib.dom.js.map