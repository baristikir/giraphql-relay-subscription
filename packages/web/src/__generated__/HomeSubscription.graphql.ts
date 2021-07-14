/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type HomeSubscriptionVariables = {};
export type HomeSubscriptionResponse = {
    readonly hello: ReadonlyArray<{
        readonly id: string;
        readonly text: string;
    }>;
};
export type HomeSubscription = {
    readonly response: HomeSubscriptionResponse;
    readonly variables: HomeSubscriptionVariables;
};



/*
subscription HomeSubscription {
  hello {
    id
    text
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Message",
    "kind": "LinkedField",
    "name": "hello",
    "plural": true,
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5c0d0f2ec45bbe7cedc7a6af1e6c6389",
    "id": null,
    "metadata": {},
    "name": "HomeSubscription",
    "operationKind": "subscription",
    "text": "subscription HomeSubscription {\n  hello {\n    id\n    text\n  }\n}\n"
  }
};
})();
(node as any).hash = '86ca7c43c49c2538208ba2f757fbe75a';
export default node;
