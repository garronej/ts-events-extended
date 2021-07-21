"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var assert_1 = require("tsafe/assert");
;
{
    {
        var sevText = lib_1.Evt.create("foo");
        var sevCharCount = sevText.pipe(function (text) { return [text.length]; });
        assert_1.assert(sevCharCount.state === sevText.state.length);
        sevText.post("foo bar");
        assert_1.assert(sevCharCount.state === sevText.state.length);
    }
    {
        var ctx = lib_1.Evt.newCtx();
        var sevText = lib_1.Evt.create("foo");
        var sevCharCount = sevText.pipe(ctx, function (text) { return [text.length]; });
        assert_1.assert(sevCharCount.state === sevText.state.length);
        sevText.post("foo bar");
        assert_1.assert(sevCharCount.state === sevText.state.length);
        var state = sevCharCount.state;
        ctx.done();
        sevText.post("foo bar baz");
        assert_1.assert(state === sevCharCount.state);
    }
    {
        var evtText_1 = lib_1.Evt.create();
        var sevText = evtText_1.toStateful("foo bar");
        assert_1.assert(sevText.state === "foo bar");
        evtText_1.post("foo bar");
        assert_1.assert(sevText.postCount === 1);
        assert_1.assert(sevText.evtChange.postCount === 0);
        assert_1.assert(sevText.evtDiff.postCount === 1);
        assert_1.assert(sevText.evtChangeDiff.postCount === 0);
        evtText_1.post("baz");
        assert_1.assert(sevText.postCount === 2);
        assert_1.assert(sevText.evtChange.postCount === 1);
        assert_1.assert(sevText.evtDiff.postCount === 2);
        assert_1.assert(sevText.evtChangeDiff.postCount === 1);
        assert_1.assert(sevText.state === "baz");
    }
    {
        var ctx = lib_1.Evt.newCtx();
        var evtText_2 = lib_1.Evt.create();
        var sevText = evtText_2.toStateful("foo bar", ctx);
        assert_1.assert(sevText.state === "foo bar");
        evtText_2.post("baz");
        assert_1.assert(sevText.state === "baz");
        ctx.done();
        evtText_2.post("Hello");
        assert_1.assert(sevText.state !== "Hello");
    }
}
{
    {
        var sevText = lib_1.Evt.create("foo");
        var sevCharCount = sevText.pipe(function (text) { return [text.length]; });
        assert_1.assert(sevCharCount.state === sevText.state.length);
        sevText.state = "foo bar";
        assert_1.assert(sevCharCount.state === sevText.state.length);
    }
    {
        var ctx = lib_1.Evt.newCtx();
        var sevText = lib_1.Evt.create("foo");
        var sevCharCount = sevText.pipe(ctx, function (text) { return [text.length]; });
        assert_1.assert(sevCharCount.state === sevText.state.length);
        sevText.state = "foo bar";
        assert_1.assert(sevCharCount.state === sevText.state.length);
        var state = sevCharCount.state;
        ctx.done();
        sevText.state = "foo bar baz";
        assert_1.assert(state === sevCharCount.state);
    }
    {
        var evtText_3 = lib_1.Evt.create();
        var sevText = evtText_3.toStateful("foo bar");
        assert_1.assert(sevText.state === "foo bar");
        evtText_3.post("foo bar");
        assert_1.assert(sevText.postCount === 1);
        assert_1.assert(sevText.evtChange.postCount === 0);
        assert_1.assert(sevText.evtDiff.postCount === 1);
        assert_1.assert(sevText.evtChangeDiff.postCount === 0);
        evtText_3.post("baz");
        assert_1.assert(sevText.postCount === 2);
        assert_1.assert(sevText.evtChange.postCount === 1);
        assert_1.assert(sevText.evtDiff.postCount === 2);
        assert_1.assert(sevText.evtChangeDiff.postCount === 1);
        assert_1.assert(sevText.state === "baz");
    }
    {
        var ctx = lib_1.Evt.newCtx();
        var evtText_4 = new lib_1.Evt();
        var sevText = evtText_4.toStateful("foo bar", ctx);
        assert_1.assert(sevText.state === "foo bar");
        evtText_4.post("baz");
        assert_1.assert(sevText.state === "baz");
        ctx.done();
        evtText_4.post("Hello");
        assert_1.assert(sevText.state !== "Hello");
    }
}
console.log("PASS");
//# sourceMappingURL=test73.js.map