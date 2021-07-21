
import { Evt } from "../lib/index.ts";
import * as inDepth from "../tools/inDepth/index.ts";
import { diff } from "../tools/reducers/index.ts";
import { assert } from "https://raw.githubusercontent.com/garronej/tsafe/v0.4.1/deno_dist/assert.ts";

{

    const users = ["Bob", "Alice"];

    const { same } = inDepth.sameFactory({ "takeIntoAccountArraysOrdering": false });

    const sevUser = Evt.create<string[]>([...users]);

    const update = (users: string[]) => {

        if (same(sevUser.state, users)) {
            return;
        }

        sevUser.post(inDepth.copy(users));

    };

    let stdout = "";

    sevUser.evtDiff.attach(
        ({ newState, prevState }) => {

            const { added, removed } = prevState.reduce(...diff(newState))

            stdout += `${added.join(", ")} joined the chat`;
            stdout += `${removed.join(", ")} left the chat`;

        }
    );


    update(users); //Print nothing

    users.splice(0, 1); //Remove Bob from the array.

    users.push("Louis");

    //Prints "Louis joined the chat" "Bob left the chat"
    update(users);

    assert("Louis joined the chatBob left the chat" === stdout);

}

{

    const users = ["Bob", "Alice"];

    const { same } = inDepth.sameFactory({ "takeIntoAccountArraysOrdering": false });

    const sevUser = Evt.create<string[]>([...users]);

    const update = (users: string[]) => {

        if (same(sevUser.state, users)) {
            return;
        }

        sevUser.state = inDepth.copy(users);

    };

    let stdout = "";

    sevUser.evtDiff.attach(
        ({ newState, prevState }) => {

            const { added, removed } = prevState.reduce(...diff(newState))

            stdout += `${added.join(", ")} joined the chat`;
            stdout += `${removed.join(", ")} left the chat`;

        }
    );


    update(users); //Print nothing

    users.splice(0, 1); //Remove Bob from the array.

    users.push("Louis");

    //Prints "Louis joined the chat" "Bob left the chat"
    update(users);

    assert("Louis joined the chatBob left the chat" === stdout);

}

console.log("PASS");
