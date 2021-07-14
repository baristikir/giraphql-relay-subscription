/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type HomeMutationVariables = {
    text: string;
};
export type HomeMutationResponse = {
    readonly sayHi: {
        readonly id: string;
        readonly text: string;
    };
};
export type HomeMutation = {
    readonly response: HomeMutationResponse;
    readonly variables: HomeMutationVariables;
};



/*
mutation HomeMutation(
  $text: String!
) {
  sayHi(text: $text) {
    id
    text
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "text"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "text",
        "variableName": "text"
      }
    ],
    "concreteType": "Message",
    "kind": "LinkedField",
    "name": "sayHi",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "text",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HomeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e2b7253ddc71bbd6fc4617270a834b14",
    "id": null,
    "metadata": {},
    "name": "HomeMutation",
    "operationKind": "mutation",
    "text": "mutation HomeMutation(\n  $text: String!\n) {\n  sayHi(text: $text) {\n    id\n    text\n  }\n}\n"
  }
};
})();
(node as any).hash = 'af36406ac1141c889f5d1a70baa7b867';
export default node;
