// @ts-check
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import * as mod from '../src/lite.js';

const fn = mod.default;

test('exports', () => {
	// 这里的 assert.type 第一个参数和第二个参数其实是内部在比较 typeof mod.default === 'function'
	assert.type(mod.default, 'function', 'exports default function');
	assert.type(mod.clsx, 'function', 'exports named function');
	// 这里的比较是 mod.default === mod.clsx
	assert.is(mod.default, mod.clsx, 'exports are equal');

	assert.type(mod.default(), 'string', '~> returns string output');
	assert.type(mod.clsx(), 'string', '~> returns string output');
});

test('strings', () => {
	assert.is(fn(''), '');
	assert.is(fn('foo'), 'foo');
	assert.is(fn(true && 'foo'), 'foo');
	assert.is(fn(false && 'foo'), '');
});

test('strings (variadic)', () => {
	assert.is(fn(''), '');
	assert.is(fn('foo', 'bar'), 'foo bar');
	assert.is(fn(true && 'foo', false && 'bar', 'baz'), 'foo baz');
	assert.is(fn(false && 'foo', 'bar', 'baz', ''), 'bar baz');
});

test('emptys', () => {
	assert.is(fn(''), '');
	assert.is(fn(undefined), '');
	assert.is(fn(null), '');
	assert.is(fn(0), '');
});

// lite ignores all non-strings
test('non-strings', () => {
	// number
	assert.is(fn(1), '');
	assert.is(fn(1, 2), '');
	assert.is(fn(Infinity), '');
	assert.is(fn(NaN), '');
	assert.is(fn(0), '');

	// objects
	assert.is(fn({}), '');
	assert.is(fn(null), '');
	assert.is(fn({ a:1 }), '');
	assert.is(fn({ a:1 }, { b:2 }), '');

	// arrays
	assert.is(fn([]), '');
	assert.is(fn(['foo']), '');
	assert.is(fn(['foo', 'bar']), '');

	// functions
	assert.is(fn(fn), '');
	assert.is(fn(fn, fn), '');
});

test.run();
