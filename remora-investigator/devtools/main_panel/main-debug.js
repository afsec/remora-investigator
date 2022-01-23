(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.bf.au === region.bx.au)
	{
		return 'on line ' + region.bf.au;
	}
	return 'on lines ' + region.bf.au + ' through ' + region.bx.au;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList === 'function' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.fx,
		impl.h7,
		impl.hy,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_enqueueEffects(managers, result.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		fX: func(record.fX),
		bg: record.bg,
		bb: record.bb
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.fX;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.bg;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.bb) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.fx,
		impl.h7,
		impl.hy,
		function(sendToApp, initialModel) {
			var view = impl.K;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.fx,
		impl.h7,
		impl.hy,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.be && impl.be(sendToApp)
			var view = impl.K;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.P);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.hY) && (_VirtualDom_doc.title = title = doc.hY);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.gd;
	var onUrlRequest = impl.ge;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		be: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.cb === next.cb
							&& curr.bK === next.bK
							&& curr.b7.a === next.b7.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		fx: function(flags)
		{
			return A3(impl.fx, flags, _Browser_getUrl(), key);
		},
		K: impl.K,
		h7: impl.h7,
		hy: impl.hy
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { fn: 'hidden', dK: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { fn: 'mozHidden', dK: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { fn: 'msHidden', dK: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { fn: 'webkitHidden', dK: 'webkitvisibilitychange' }
		: { fn: 'hidden', dK: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		cv: _Browser_getScene(),
		cO: {
			ip: _Browser_window.pageXOffset,
			iq: _Browser_window.pageYOffset,
			L: _Browser_doc.documentElement.clientWidth,
			bG: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		L: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		bG: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			cv: {
				L: node.scrollWidth,
				bG: node.scrollHeight
			},
			cO: {
				ip: node.scrollLeft,
				iq: node.scrollTop,
				L: node.clientWidth,
				bG: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			cv: _Browser_getScene(),
			cO: {
				ip: x,
				iq: y,
				L: _Browser_doc.documentElement.clientWidth,
				bG: _Browser_doc.documentElement.clientHeight
			},
			eT: {
				ip: x + rect.left,
				iq: y + rect.top,
				L: rect.width,
				bG: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.S.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.S.b, xhr)); });
		$elm$core$Maybe$isJust(request.cI) && _Http_track(router, xhr, request.cI.a);

		try {
			xhr.open(request.fZ, request.X, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.X));
		}

		_Http_configureRequest(xhr, request);

		request.P.a && xhr.setRequestHeader('Content-Type', request.P.a);
		xhr.send(request.P.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.bF; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.hX.a || 0;
	xhr.responseType = request.S.d;
	xhr.withCredentials = request.c2;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		X: xhr.responseURL,
		ho: xhr.status,
		hp: xhr.statusText,
		bF: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			g$: event.loaded,
			cA: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			gs: event.loaded,
			cA: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}



// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.f3) { flags += 'm'; }
	if (options.dJ) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.i) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.k),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.k);
		} else {
			var treeLen = builder.i * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.m) : builder.m;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.i);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.k) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.k);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{m: nodeList, i: (len / $elm$core$Array$branchFactor) | 0, k: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {bC: fragment, bK: host, b4: path, b7: port_, cb: protocol, cc: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$element = _Browser_element;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Globaltypes$DataEventNoRequest = {$: 0};
var $author$project$Globaltypes$DataEventReqBodyNoRequest = {$: 0};
var $author$project$Globaltypes$DataEventResBodyNoRequest = {$: 0};
var $author$project$Globaltypes$DataEventsNoRequest = {$: 0};
var $author$project$Globaltypes$DataNoteNoRequest = {$: 0};
var $author$project$Globaltypes$DataSitesNoRequest = {$: 0};
var $author$project$Globaltypes$History = 0;
var $author$project$Globaltypes$StateNoteEditorVoid = {$: 0};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$init = function (flags) {
	return _Utils_Tuple2(
		{eu: $author$project$Globaltypes$DataEventNoRequest, ev: $author$project$Globaltypes$DataEventReqBodyNoRequest, ew: $author$project$Globaltypes$DataEventResBodyNoRequest, ex: $author$project$Globaltypes$DataEventsNoRequest, ey: $author$project$Globaltypes$DataNoteNoRequest, ez: _List_Nil, eA: $author$project$Globaltypes$DataSitesNoRequest, eW: $elm$core$Maybe$Nothing, g4: $elm$core$Maybe$Nothing, g5: $elm$core$Maybe$Nothing, hk: $elm$core$Maybe$Nothing, hl: $author$project$Globaltypes$StateNoteEditorVoid, hm: '', hn: 0, cL: flags.cL, im: flags.ip, $9: flags.iq},
		$elm$core$Platform$Cmd$none);
};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Globaltypes$OnResize = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $author$project$Globaltypes$ReceivedDataFromJS = function (a) {
	return {$: 4, a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $author$project$Main$messageResult = _Platform_incomingPort('messageResult', $elm$json$Json$Decode$string);
var $elm$browser$Browser$Events$Window = 1;
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {b5: pids, cF: subs};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {by: event, bR: key};
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.b5,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.bR;
		var event = _v0.by;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.cF);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		1,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $author$project$Main$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$author$project$Main$messageResult($author$project$Globaltypes$ReceivedDataFromJS),
				$elm$browser$Browser$Events$onResize($author$project$Globaltypes$OnResize)
			]));
};
var $author$project$Globaltypes$ApplicationErrorShow = {$: 0};
var $author$project$Globaltypes$DataEventReqBodyFailure = {$: 2};
var $author$project$Globaltypes$DataEventReqBodyPending = {$: 1};
var $author$project$Globaltypes$DataEventReqBodySuccess = function (a) {
	return {$: 3, a: a};
};
var $author$project$Globaltypes$DataEventRequestFailure = {$: 2};
var $author$project$Globaltypes$DataEventRequestPending = {$: 1};
var $author$project$Globaltypes$DataEventRequestSuccess = function (a) {
	return {$: 3, a: a};
};
var $author$project$Globaltypes$DataEventResBodyFailure = {$: 2};
var $author$project$Globaltypes$DataEventResBodyPending = {$: 1};
var $author$project$Globaltypes$DataEventResBodySuccess = function (a) {
	return {$: 3, a: a};
};
var $author$project$Globaltypes$DataEventsRequestFailure = {$: 2};
var $author$project$Globaltypes$DataEventsRequestPending = {$: 1};
var $author$project$Globaltypes$DataEventsRequestSuccess = function (a) {
	return {$: 3, a: a};
};
var $author$project$Globaltypes$DataNotePending = {$: 1};
var $author$project$Globaltypes$DataNoteSuccess = function (a) {
	return {$: 3, a: a};
};
var $author$project$Globaltypes$DataSitesRequestPending = {$: 1};
var $author$project$Globaltypes$DataSitesRequestSuccess = function (a) {
	return {$: 3, a: a};
};
var $author$project$Globaltypes$GetDataEvent = function (a) {
	return {$: 11, a: a};
};
var $author$project$Globaltypes$GetDataEventReqBody = function (a) {
	return {$: 17, a: a};
};
var $author$project$Globaltypes$GetDataEventResBody = function (a) {
	return {$: 19, a: a};
};
var $author$project$Globaltypes$GetDataEvents = function (a) {
	return {$: 13, a: a};
};
var $author$project$Globaltypes$GetDataNote = function (a) {
	return {$: 15, a: a};
};
var $author$project$Globaltypes$GotDataEvent = function (a) {
	return {$: 12, a: a};
};
var $author$project$Globaltypes$GotDataEventReqBody = function (a) {
	return {$: 18, a: a};
};
var $author$project$Globaltypes$GotDataEventResBody = function (a) {
	return {$: 20, a: a};
};
var $author$project$Globaltypes$GotDataEvents = function (a) {
	return {$: 14, a: a};
};
var $author$project$Globaltypes$GotDataNote = function (a) {
	return {$: 16, a: a};
};
var $author$project$Globaltypes$GotDataSites = function (a) {
	return {$: 22, a: a};
};
var $author$project$Globaltypes$SaveDataNote = function (a) {
	return {$: 5, a: a};
};
var $author$project$Globaltypes$SavedDataNote = function (a) {
	return {$: 6, a: a};
};
var $author$project$Globaltypes$StateNoteEditorEdit = function (a) {
	return {$: 4, a: a};
};
var $author$project$Globaltypes$StateNoteEditorNewEdit = {$: 1};
var $author$project$Globaltypes$StateNoteEditorNewSave = {$: 2};
var $author$project$Globaltypes$StateNoteEditorSaveEdit = function (a) {
	return {$: 5, a: a};
};
var $author$project$Globaltypes$StateNoteEditorShow = function (a) {
	return {$: 3, a: a};
};
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Main$consoleError = _Platform_outgoingPort('consoleError', $elm$json$Json$Encode$string);
var $elm$core$Bitwise$or = _Bitwise_or;
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Bitwise$and = _Bitwise_and;
var $truqu$elm_base64$Base64$Encode$intToBase64 = function (i) {
	switch (i) {
		case 0:
			return 'A';
		case 1:
			return 'B';
		case 2:
			return 'C';
		case 3:
			return 'D';
		case 4:
			return 'E';
		case 5:
			return 'F';
		case 6:
			return 'G';
		case 7:
			return 'H';
		case 8:
			return 'I';
		case 9:
			return 'J';
		case 10:
			return 'K';
		case 11:
			return 'L';
		case 12:
			return 'M';
		case 13:
			return 'N';
		case 14:
			return 'O';
		case 15:
			return 'P';
		case 16:
			return 'Q';
		case 17:
			return 'R';
		case 18:
			return 'S';
		case 19:
			return 'T';
		case 20:
			return 'U';
		case 21:
			return 'V';
		case 22:
			return 'W';
		case 23:
			return 'X';
		case 24:
			return 'Y';
		case 25:
			return 'Z';
		case 26:
			return 'a';
		case 27:
			return 'b';
		case 28:
			return 'c';
		case 29:
			return 'd';
		case 30:
			return 'e';
		case 31:
			return 'f';
		case 32:
			return 'g';
		case 33:
			return 'h';
		case 34:
			return 'i';
		case 35:
			return 'j';
		case 36:
			return 'k';
		case 37:
			return 'l';
		case 38:
			return 'm';
		case 39:
			return 'n';
		case 40:
			return 'o';
		case 41:
			return 'p';
		case 42:
			return 'q';
		case 43:
			return 'r';
		case 44:
			return 's';
		case 45:
			return 't';
		case 46:
			return 'u';
		case 47:
			return 'v';
		case 48:
			return 'w';
		case 49:
			return 'x';
		case 50:
			return 'y';
		case 51:
			return 'z';
		case 52:
			return '0';
		case 53:
			return '1';
		case 54:
			return '2';
		case 55:
			return '3';
		case 56:
			return '4';
		case 57:
			return '5';
		case 58:
			return '6';
		case 59:
			return '7';
		case 60:
			return '8';
		case 61:
			return '9';
		case 62:
			return '+';
		default:
			return '/';
	}
};
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $truqu$elm_base64$Base64$Encode$toBase64 = function (_int) {
	return _Utils_ap(
		$truqu$elm_base64$Base64$Encode$intToBase64(63 & (_int >>> 18)),
		_Utils_ap(
			$truqu$elm_base64$Base64$Encode$intToBase64(63 & (_int >>> 12)),
			_Utils_ap(
				$truqu$elm_base64$Base64$Encode$intToBase64(63 & (_int >>> 6)),
				$truqu$elm_base64$Base64$Encode$intToBase64(63 & (_int >>> 0)))));
};
var $truqu$elm_base64$Base64$Encode$add = F2(
	function (_char, _v0) {
		var res = _v0.a;
		var count = _v0.b;
		var acc = _v0.c;
		var current = (acc << 8) | _char;
		if (count === 2) {
			return _Utils_Tuple3(
				_Utils_ap(
					res,
					$truqu$elm_base64$Base64$Encode$toBase64(current)),
				0,
				0);
		} else {
			return _Utils_Tuple3(res, count + 1, current);
		}
	});
var $elm$core$Basics$ge = _Utils_ge;
var $truqu$elm_base64$Base64$Encode$chomp = F2(
	function (char_, acc) {
		var _char = $elm$core$Char$toCode(char_);
		return (_char < 128) ? A2($truqu$elm_base64$Base64$Encode$add, _char, acc) : ((_char < 2048) ? A2(
			$truqu$elm_base64$Base64$Encode$add,
			128 | (63 & _char),
			A2($truqu$elm_base64$Base64$Encode$add, 192 | (_char >>> 6), acc)) : (((_char < 55296) || ((_char >= 57344) && (_char <= 65535))) ? A2(
			$truqu$elm_base64$Base64$Encode$add,
			128 | (63 & _char),
			A2(
				$truqu$elm_base64$Base64$Encode$add,
				128 | (63 & (_char >>> 6)),
				A2($truqu$elm_base64$Base64$Encode$add, 224 | (_char >>> 12), acc))) : A2(
			$truqu$elm_base64$Base64$Encode$add,
			128 | (63 & _char),
			A2(
				$truqu$elm_base64$Base64$Encode$add,
				128 | (63 & (_char >>> 6)),
				A2(
					$truqu$elm_base64$Base64$Encode$add,
					128 | (63 & (_char >>> 12)),
					A2($truqu$elm_base64$Base64$Encode$add, 240 | (_char >>> 18), acc))))));
	});
var $elm$core$String$foldl = _String_foldl;
var $truqu$elm_base64$Base64$Encode$initial = _Utils_Tuple3('', 0, 0);
var $truqu$elm_base64$Base64$Encode$wrapUp = function (_v0) {
	var res = _v0.a;
	var cnt = _v0.b;
	var acc = _v0.c;
	switch (cnt) {
		case 1:
			return res + ($truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc >>> 2)) + ($truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc << 4)) + '=='));
		case 2:
			return res + ($truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc >>> 10)) + ($truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc >>> 4)) + ($truqu$elm_base64$Base64$Encode$intToBase64(63 & (acc << 2)) + '=')));
		default:
			return res;
	}
};
var $truqu$elm_base64$Base64$Encode$encode = function (input) {
	return $truqu$elm_base64$Base64$Encode$wrapUp(
		A3($elm$core$String$foldl, $truqu$elm_base64$Base64$Encode$chomp, $truqu$elm_base64$Base64$Encode$initial, input));
};
var $truqu$elm_base64$Base64$encode = $truqu$elm_base64$Base64$Encode$encode;
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 2};
var $elm$http$Http$Receiving = function (a) {
	return {$: 1, a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$Timeout_ = {$: 1};
var $elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 4, a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 3, a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$NetworkError = {$: 2};
var $elm$http$Http$Timeout = {$: 1};
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 0:
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 1:
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 2:
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 3:
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.ho));
			default:
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$http$Http$BadBody,
					toResult(body));
		}
	});
var $elm$http$Http$expectString = function (toMsg) {
	return A2(
		$elm$http$Http$expectStringResponse,
		toMsg,
		$elm$http$Http$resolve($elm$core$Result$Ok));
};
var $author$project$Helpers$httpErrorToString = function (httpError) {
	switch (httpError.$) {
		case 0:
			var url = httpError.a;
			return 'Http.BadUrl: [' + (url + ']');
		case 1:
			return 'Http.Timeout';
		case 2:
			return 'Http.NetworkError';
		case 3:
			var statusCode = httpError.a;
			return 'Http.BadStatus: [' + ($elm$core$String$fromInt(statusCode) + ']');
		default:
			var body = httpError.a;
			return 'Http.BadBody: [' + (body + ']');
	}
};
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $author$project$Globaltypes$HttpDataEvent = function (id) {
	return function (security_state) {
		return function (destination_port) {
			return function (server_ip_address) {
				return function (started_datetime) {
					return function (rtt) {
						return function (request_method) {
							return function (request_url) {
								return function (request_http_version) {
									return function (request_query_string) {
										return function (request_headers_size) {
											return function (request_headers) {
												return function (request_cookies) {
													return function (request_body_size) {
														return function (response_http_version) {
															return function (response_status_code) {
																return function (response_headers_size) {
																	return function (response_headers) {
																		return function (response_redirect_url) {
																			return function (response_cookies) {
																				return function (response_content_mimetype) {
																					return function (response_content_size) {
																						return function (response_body_size) {
																							return function (note_id) {
																								return {eG: destination_port, bM: id, bZ: note_id, gz: request_body_size, gA: request_cookies, ci: request_headers, gB: request_headers_size, cj: request_http_version, ck: request_method, gF: request_query_string, gG: request_url, cn: response_body_size, co: response_content_mimetype, gJ: response_content_size, gK: response_cookies, cp: response_headers, gL: response_headers_size, gM: response_http_version, gN: response_redirect_url, cq: response_status_code, cs: rtt, gY: security_state, g0: server_ip_address, cE: started_datetime};
																							};
																						};
																					};
																				};
																			};
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $elm_community$json_extra$Json$Decode$Extra$andMap = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $author$project$Globaltypes$HttpHeader = F2(
	function (name, value) {
		return {f4: name, ie: value};
	});
var $author$project$Data$HttpDataEventHeaders$httpEventHeaderDecoder = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$string),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
		$elm$json$Json$Decode$succeed($author$project$Globaltypes$HttpHeader)));
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Data$HttpDataEventHeaders$httpEventHeaderListDecoder = $elm$json$Json$Decode$list($author$project$Data$HttpDataEventHeaders$httpEventHeaderDecoder);
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$maybe = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder),
				$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
			]));
};
var $author$project$Data$HttpDataEvent$httpDataEventDecoder = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'note_id',
		$elm$json$Json$Decode$maybe($elm$json$Json$Decode$int)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			$elm$json$Json$Decode$field,
			'response_body_size',
			$elm$json$Json$Decode$maybe($elm$json$Json$Decode$int)),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(
				$elm$json$Json$Decode$field,
				'response_content_size',
				$elm$json$Json$Decode$maybe($elm$json$Json$Decode$int)),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(
					$elm$json$Json$Decode$field,
					'response_content_mimetype',
					$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
				A2(
					$elm_community$json_extra$Json$Decode$Extra$andMap,
					A2(
						$elm$json$Json$Decode$field,
						'response_cookies',
						$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
					A2(
						$elm_community$json_extra$Json$Decode$Extra$andMap,
						A2(
							$elm$json$Json$Decode$field,
							'response_redirect_url',
							$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
						A2(
							$elm_community$json_extra$Json$Decode$Extra$andMap,
							A2($elm$json$Json$Decode$field, 'response_headers', $author$project$Data$HttpDataEventHeaders$httpEventHeaderListDecoder),
							A2(
								$elm_community$json_extra$Json$Decode$Extra$andMap,
								A2(
									$elm$json$Json$Decode$field,
									'response_headers_size',
									$elm$json$Json$Decode$maybe($elm$json$Json$Decode$int)),
								A2(
									$elm_community$json_extra$Json$Decode$Extra$andMap,
									A2(
										$elm$json$Json$Decode$field,
										'response_status_code',
										$elm$json$Json$Decode$maybe($elm$json$Json$Decode$int)),
									A2(
										$elm_community$json_extra$Json$Decode$Extra$andMap,
										A2(
											$elm$json$Json$Decode$field,
											'response_http_version',
											$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
										A2(
											$elm_community$json_extra$Json$Decode$Extra$andMap,
											A2(
												$elm$json$Json$Decode$field,
												'request_body_size',
												$elm$json$Json$Decode$maybe($elm$json$Json$Decode$int)),
											A2(
												$elm_community$json_extra$Json$Decode$Extra$andMap,
												A2(
													$elm$json$Json$Decode$field,
													'request_cookies',
													$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
												A2(
													$elm_community$json_extra$Json$Decode$Extra$andMap,
													A2($elm$json$Json$Decode$field, 'request_headers', $author$project$Data$HttpDataEventHeaders$httpEventHeaderListDecoder),
													A2(
														$elm_community$json_extra$Json$Decode$Extra$andMap,
														A2(
															$elm$json$Json$Decode$field,
															'request_headers_size',
															$elm$json$Json$Decode$maybe($elm$json$Json$Decode$int)),
														A2(
															$elm_community$json_extra$Json$Decode$Extra$andMap,
															A2(
																$elm$json$Json$Decode$field,
																'request_query_string',
																$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
															A2(
																$elm_community$json_extra$Json$Decode$Extra$andMap,
																A2(
																	$elm$json$Json$Decode$field,
																	'request_http_version',
																	$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
																A2(
																	$elm_community$json_extra$Json$Decode$Extra$andMap,
																	A2(
																		$elm$json$Json$Decode$field,
																		'request_url',
																		$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
																	A2(
																		$elm_community$json_extra$Json$Decode$Extra$andMap,
																		A2(
																			$elm$json$Json$Decode$field,
																			'request_method',
																			$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
																		A2(
																			$elm_community$json_extra$Json$Decode$Extra$andMap,
																			A2(
																				$elm$json$Json$Decode$field,
																				'rtt',
																				$elm$json$Json$Decode$maybe($elm$json$Json$Decode$int)),
																			A2(
																				$elm_community$json_extra$Json$Decode$Extra$andMap,
																				A2(
																					$elm$json$Json$Decode$field,
																					'started_datetime',
																					$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
																				A2(
																					$elm_community$json_extra$Json$Decode$Extra$andMap,
																					A2(
																						$elm$json$Json$Decode$field,
																						'server_ip_address',
																						$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
																					A2(
																						$elm_community$json_extra$Json$Decode$Extra$andMap,
																						A2(
																							$elm$json$Json$Decode$field,
																							'destination_port',
																							$elm$json$Json$Decode$maybe($elm$json$Json$Decode$int)),
																						A2(
																							$elm_community$json_extra$Json$Decode$Extra$andMap,
																							A2(
																								$elm$json$Json$Decode$field,
																								'security_state',
																								$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
																							A2(
																								$elm_community$json_extra$Json$Decode$Extra$andMap,
																								A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
																								$elm$json$Json$Decode$succeed($author$project$Globaltypes$HttpDataEvent)))))))))))))))))))))))));
var $author$project$Data$HttpDataEvent$jsonDecodeDataEvent = function (jsonData) {
	return A2($elm$json$Json$Decode$decodeString, $author$project$Data$HttpDataEvent$httpDataEventDecoder, jsonData);
};
var $author$project$Globaltypes$EventsResponse = F3(
	function (events_found, offset, events) {
		return {eY: events, eZ: events_found, ga: offset};
	});
var $author$project$Globaltypes$Httpevent = function (id) {
	return function (started_datetime) {
		return function (rtt) {
			return function (request_method) {
				return function (request_url) {
					return function (request_http_version) {
						return function (response_status_code) {
							return function (response_content_mimetype) {
								return function (response_body_size) {
									return function (note_id) {
										return function (row_position) {
											return {bM: id, bZ: note_id, cj: request_http_version, ck: request_method, gG: request_url, cn: response_body_size, co: response_content_mimetype, cq: response_status_code, gR: row_position, cs: rtt, cE: started_datetime};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Data$HttpDataEvents$httpEventDecoder = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'row_position', $elm$json$Json$Decode$int),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			$elm$json$Json$Decode$field,
			'note_id',
			$elm$json$Json$Decode$maybe($elm$json$Json$Decode$int)),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(
				$elm$json$Json$Decode$field,
				'response_body_size',
				$elm$json$Json$Decode$maybe($elm$json$Json$Decode$int)),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2(
					$elm$json$Json$Decode$field,
					'response_content_mimetype',
					$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
				A2(
					$elm_community$json_extra$Json$Decode$Extra$andMap,
					A2(
						$elm$json$Json$Decode$field,
						'response_status_code',
						$elm$json$Json$Decode$maybe($elm$json$Json$Decode$int)),
					A2(
						$elm_community$json_extra$Json$Decode$Extra$andMap,
						A2(
							$elm$json$Json$Decode$field,
							'request_http_version',
							$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
						A2(
							$elm_community$json_extra$Json$Decode$Extra$andMap,
							A2(
								$elm$json$Json$Decode$field,
								'request_url',
								$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
							A2(
								$elm_community$json_extra$Json$Decode$Extra$andMap,
								A2(
									$elm$json$Json$Decode$field,
									'request_method',
									$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
								A2(
									$elm_community$json_extra$Json$Decode$Extra$andMap,
									A2(
										$elm$json$Json$Decode$field,
										'rtt',
										$elm$json$Json$Decode$maybe($elm$json$Json$Decode$int)),
									A2(
										$elm_community$json_extra$Json$Decode$Extra$andMap,
										A2(
											$elm$json$Json$Decode$field,
											'started_datetime',
											$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
										A2(
											$elm_community$json_extra$Json$Decode$Extra$andMap,
											A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
											$elm$json$Json$Decode$succeed($author$project$Globaltypes$Httpevent))))))))))));
var $author$project$Data$HttpDataEvents$httpEventListDecoder = $elm$json$Json$Decode$list($author$project$Data$HttpDataEvents$httpEventDecoder);
var $author$project$Data$HttpDataEvents$httpEventsResponseDecoder = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'events', $author$project$Data$HttpDataEvents$httpEventListDecoder),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'offset', $elm$json$Json$Decode$int),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'events_found', $elm$json$Json$Decode$int),
			$elm$json$Json$Decode$succeed($author$project$Globaltypes$EventsResponse))));
var $author$project$Data$HttpDataEvents$jsonDecodeEventsResponse = function (jsonData) {
	return A2($elm$json$Json$Decode$decodeString, $author$project$Data$HttpDataEvents$httpEventsResponseDecoder, jsonData);
};
var $author$project$Globaltypes$NoteEntry = F5(
	function (id, note_content, event_id, created_at, updated_at) {
		return {en: created_at, eX: event_id, bM: id, f6: note_content, h8: updated_at};
	});
var $author$project$Data$HttpDataNote$requestBodyDecoder = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'updated_at', $elm$json$Json$Decode$int),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'created_at', $elm$json$Json$Decode$int),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'event_id', $elm$json$Json$Decode$int),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'note_content', $elm$json$Json$Decode$string),
				A2(
					$elm_community$json_extra$Json$Decode$Extra$andMap,
					A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
					$elm$json$Json$Decode$succeed($author$project$Globaltypes$NoteEntry))))));
var $author$project$Data$HttpDataNote$jsonDecodeNoteEntry = function (jsonData) {
	return A2($elm$json$Json$Decode$decodeString, $author$project$Data$HttpDataNote$requestBodyDecoder, jsonData);
};
var $author$project$Globaltypes$HttpeventRequestbody = F4(
	function (id, request_postdata_mimetype, request_postdata_params, request_postdata_text) {
		return {bM: id, gC: request_postdata_mimetype, gD: request_postdata_params, gE: request_postdata_text};
	});
var $author$project$Data$HttpDataEventReqBody$requestBodyDecoder = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'request_postdata_text',
		$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			$elm$json$Json$Decode$field,
			'request_postdata_params',
			$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2(
				$elm$json$Json$Decode$field,
				'request_postdata_mimetype',
				$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
			A2(
				$elm_community$json_extra$Json$Decode$Extra$andMap,
				A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
				$elm$json$Json$Decode$succeed($author$project$Globaltypes$HttpeventRequestbody)))));
var $author$project$Data$HttpDataEventReqBody$jsonDecodeRequestBody = function (jsonData) {
	return A2($elm$json$Json$Decode$decodeString, $author$project$Data$HttpDataEventReqBody$requestBodyDecoder, jsonData);
};
var $author$project$Globaltypes$HttpeventResponsebody = F3(
	function (id, response_body_encoding, response_body_content) {
		return {bM: id, gH: response_body_content, gI: response_body_encoding};
	});
var $author$project$Data$HttpDataEventResBody$responseBodyDecoder = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2(
		$elm$json$Json$Decode$field,
		'response_body_content',
		$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2(
			$elm$json$Json$Decode$field,
			'response_body_encoding',
			$elm$json$Json$Decode$maybe($elm$json$Json$Decode$string)),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
			$elm$json$Json$Decode$succeed($author$project$Globaltypes$HttpeventResponsebody))));
var $author$project$Data$HttpDataEventResBody$jsonDecodeResponseBody = function (jsonData) {
	return A2($elm$json$Json$Decode$decodeString, $author$project$Data$HttpDataEventResBody$responseBodyDecoder, jsonData);
};
var $author$project$Globaltypes$SitesReponse = F3(
	function (total_events, total_sites, sites) {
		return {hb: sites, h0: total_events, h1: total_sites};
	});
var $author$project$Globaltypes$SiteEntry = F2(
	function (site, events) {
		return {eY: events, ha: site};
	});
var $author$project$Data$HttpDataSites$siteEntryDecoder = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'events', $elm$json$Json$Decode$int),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'site', $elm$json$Json$Decode$string),
		$elm$json$Json$Decode$succeed($author$project$Globaltypes$SiteEntry)));
var $author$project$Data$HttpDataSites$siteEntryListDecoder = $elm$json$Json$Decode$list($author$project$Data$HttpDataSites$siteEntryDecoder);
var $author$project$Data$HttpDataSites$sitesResponseDecoder = A2(
	$elm_community$json_extra$Json$Decode$Extra$andMap,
	A2($elm$json$Json$Decode$field, 'sites', $author$project$Data$HttpDataSites$siteEntryListDecoder),
	A2(
		$elm_community$json_extra$Json$Decode$Extra$andMap,
		A2($elm$json$Json$Decode$field, 'total_sites', $elm$json$Json$Decode$int),
		A2(
			$elm_community$json_extra$Json$Decode$Extra$andMap,
			A2($elm$json$Json$Decode$field, 'total_events', $elm$json$Json$Decode$int),
			$elm$json$Json$Decode$succeed($author$project$Globaltypes$SitesReponse))));
var $author$project$Data$HttpDataSites$jsonDecodeSites = function (jsonData) {
	return A2($elm$json$Json$Decode$decodeString, $author$project$Data$HttpDataSites$sitesResponseDecoder, jsonData);
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$http$Http$Request = function (a) {
	return {$: 1, a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {cg: reqs, cF: subs};
	});
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (!cmd.$) {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 1) {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.cI;
							if (_v4.$ === 1) {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.cg));
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.cF)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (!cmd.$) {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					c2: r.c2,
					P: r.P,
					S: A2(_Http_mapExpect, func, r.S),
					bF: r.bF,
					fZ: r.fZ,
					hX: r.hX,
					cI: r.cI,
					X: r.X
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{c2: false, P: r.P, S: r.S, bF: r.bF, fZ: r.fZ, hX: r.hX, cI: r.cI, X: r.X}));
};
var $elm$http$Http$post = function (r) {
	return $elm$http$Http$request(
		{P: r.P, S: r.S, bF: _List_Nil, fZ: 'POST', hX: $elm$core$Maybe$Nothing, cI: $elm$core$Maybe$Nothing, X: r.X});
};
var $author$project$Main$sendMessage = _Platform_outgoingPort('sendMessage', $elm$json$Json$Encode$string);
var $author$project$Main$serverUrl = 'http://localhost:65432/api';
var $elm$http$Http$stringBody = _Http_pair;
var $author$project$Main$update = F2(
	function (msg, model) {
		update:
		while (true) {
			switch (msg.$) {
				case 3:
					var windowSizeX = msg.a;
					var windowSizeY = msg.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{im: windowSizeX, $9: windowSizeY}),
						$elm$core$Platform$Cmd$none);
				case 0:
					var _v1 = model.eW;
					if (!_v1.$) {
						var errorString = _v1.a;
						return _Utils_Tuple2(
							model,
							$author$project$Main$consoleError(errorString));
					} else {
						return _Utils_Tuple2(
							model,
							$author$project$Main$consoleError('Error without string. That\'s wierd!'));
					}
				case 10:
					var maybeRowId = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{hk: maybeRowId}),
						$elm$core$Platform$Cmd$none);
				case 21:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{eA: $author$project$Globaltypes$DataSitesRequestPending, g4: $elm$core$Maybe$Nothing}),
						$elm$http$Http$post(
							{
								P: A2($elm$http$Http$stringBody, 'application/json', '{ }'),
								S: $elm$http$Http$expectString($author$project$Globaltypes$GotDataSites),
								X: $author$project$Main$serverUrl + '/show_sites'
							}));
				case 22:
					var result = msg.a;
					if (!result.$) {
						var jsonSites = result.a;
						var _v3 = $author$project$Data$HttpDataSites$jsonDecodeSites(jsonSites);
						if (!_v3.$) {
							var data = _v3.a;
							var $temp$msg = $author$project$Globaltypes$GetDataEvents($elm$core$Maybe$Nothing),
								$temp$model = _Utils_update(
								model,
								{
									eA: $author$project$Globaltypes$DataSitesRequestSuccess(
										$elm$core$Maybe$Just(data))
								});
							msg = $temp$msg;
							model = $temp$model;
							continue update;
						} else {
							var error = _v3.a;
							var $temp$msg = $author$project$Globaltypes$ApplicationErrorShow,
								$temp$model = _Utils_update(
								model,
								{
									eW: $elm$core$Maybe$Just(
										$elm$json$Json$Decode$errorToString(error))
								});
							msg = $temp$msg;
							model = $temp$model;
							continue update;
						}
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{ex: $author$project$Globaltypes$DataEventsRequestFailure}),
							$elm$core$Platform$Cmd$none);
					}
				case 13:
					var maybeTableEventsOffset = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{ex: $author$project$Globaltypes$DataEventsRequestPending}),
						$elm$http$Http$post(
							{
								P: A2(
									$elm$http$Http$stringBody,
									'application/json',
									$elm$core$String$concat(
										_List_fromArray(
											[
												'{',
												function () {
												var _v4 = model.g4;
												if (!_v4.$) {
													var site = _v4.a;
													return $elm$core$String$concat(
														_List_fromArray(
															['\"filter_by_site\": \"', site, '\",']));
												} else {
													return '';
												}
											}(),
												'\"offset\":',
												$elm$core$String$fromInt(
												function () {
													if (!maybeTableEventsOffset.$) {
														var tableEventsOffset = maybeTableEventsOffset.a;
														return tableEventsOffset;
													} else {
														return 0;
													}
												}()),
												'}'
											]))),
								S: $elm$http$Http$expectString($author$project$Globaltypes$GotDataEvents),
								X: $author$project$Main$serverUrl + '/show_events'
							}));
				case 14:
					var result = msg.a;
					if (!result.$) {
						var jsonValue = result.a;
						var _v7 = model.g5;
						if (!_v7.$) {
							var eventId = _v7.a;
							var _v8 = $author$project$Data$HttpDataEvents$jsonDecodeEventsResponse(jsonValue);
							if (!_v8.$) {
								var dataEvents = _v8.a;
								var _v9 = model.eu;
								if (!_v9.$) {
									var $temp$msg = $author$project$Globaltypes$GetDataEvent(eventId),
										$temp$model = _Utils_update(
										model,
										{
											ex: $author$project$Globaltypes$DataEventsRequestSuccess(
												$elm$core$Maybe$Just(dataEvents))
										});
									msg = $temp$msg;
									model = $temp$model;
									continue update;
								} else {
									return _Utils_Tuple2(
										_Utils_update(
											model,
											{
												ex: $author$project$Globaltypes$DataEventsRequestSuccess(
													$elm$core$Maybe$Just(dataEvents))
											}),
										$elm$core$Platform$Cmd$none);
								}
							} else {
								var error = _v8.a;
								var $temp$msg = $author$project$Globaltypes$ApplicationErrorShow,
									$temp$model = _Utils_update(
									model,
									{
										eW: $elm$core$Maybe$Just(
											$elm$json$Json$Decode$errorToString(error))
									});
								msg = $temp$msg;
								model = $temp$model;
								continue update;
							}
						} else {
							return _Utils_Tuple2(
								model,
								$author$project$Main$sendMessage(jsonValue));
						}
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{ex: $author$project$Globaltypes$DataEventsRequestFailure}),
							$elm$core$Platform$Cmd$none);
					}
				case 11:
					var eventId = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{eu: $author$project$Globaltypes$DataEventRequestPending, ev: $author$project$Globaltypes$DataEventReqBodyNoRequest, ew: $author$project$Globaltypes$DataEventResBodyNoRequest, ey: $author$project$Globaltypes$DataNoteNoRequest, hl: $author$project$Globaltypes$StateNoteEditorVoid, hm: ''}),
						$elm$http$Http$post(
							{
								P: A2(
									$elm$http$Http$stringBody,
									'application/json',
									$elm$core$String$concat(
										_List_fromArray(
											[
												'{',
												'\"id\":',
												$elm$core$String$fromInt(eventId),
												'}'
											]))),
								S: $elm$http$Http$expectString($author$project$Globaltypes$GotDataEvent),
								X: $author$project$Main$serverUrl + '/show_full_event'
							}));
				case 12:
					var result = msg.a;
					if (!result.$) {
						var jsonValue = result.a;
						var _v11 = $author$project$Data$HttpDataEvent$jsonDecodeDataEvent(jsonValue);
						if (!_v11.$) {
							var dataEvent = _v11.a;
							var _v12 = dataEvent.bZ;
							if (!_v12.$) {
								var noteId = _v12.a;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											eu: $author$project$Globaltypes$DataEventRequestSuccess(dataEvent),
											hl: $author$project$Globaltypes$StateNoteEditorShow(noteId)
										}),
									$elm$core$Platform$Cmd$batch(
										_List_fromArray(
											[
												A2(
												$elm$core$Task$perform,
												$author$project$Globaltypes$GetDataEventResBody,
												$elm$core$Task$succeed(dataEvent.bM)),
												A2(
												$elm$core$Task$perform,
												$author$project$Globaltypes$GetDataEventReqBody,
												$elm$core$Task$succeed(dataEvent.bM)),
												A2(
												$elm$core$Task$perform,
												$author$project$Globaltypes$GetDataNote,
												$elm$core$Task$succeed(noteId))
											])));
							} else {
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											eu: $author$project$Globaltypes$DataEventRequestSuccess(dataEvent)
										}),
									$elm$core$Platform$Cmd$batch(
										_List_fromArray(
											[
												A2(
												$elm$core$Task$perform,
												$author$project$Globaltypes$GetDataEventResBody,
												$elm$core$Task$succeed(dataEvent.bM)),
												A2(
												$elm$core$Task$perform,
												$author$project$Globaltypes$GetDataEventReqBody,
												$elm$core$Task$succeed(dataEvent.bM))
											])));
							}
						} else {
							var error = _v11.a;
							var $temp$msg = $author$project$Globaltypes$ApplicationErrorShow,
								$temp$model = _Utils_update(
								model,
								{
									eW: $elm$core$Maybe$Just(
										$elm$json$Json$Decode$errorToString(error))
								});
							msg = $temp$msg;
							model = $temp$model;
							continue update;
						}
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{eu: $author$project$Globaltypes$DataEventRequestFailure}),
							$elm$core$Platform$Cmd$none);
					}
				case 15:
					var noteId = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{ey: $author$project$Globaltypes$DataNotePending}),
						$elm$http$Http$post(
							{
								P: A2(
									$elm$http$Http$stringBody,
									'application/json',
									$elm$core$String$concat(
										_List_fromArray(
											[
												'{',
												'\"id\":',
												$elm$core$String$fromInt(noteId),
												'}'
											]))),
								S: $elm$http$Http$expectString($author$project$Globaltypes$GotDataNote),
								X: $author$project$Main$serverUrl + '/get_full_note'
							}));
				case 16:
					var result = msg.a;
					if (!result.$) {
						var jsonValue = result.a;
						var _v14 = $author$project$Data$HttpDataNote$jsonDecodeNoteEntry(jsonValue);
						if (!_v14.$) {
							var data = _v14.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										ey: $author$project$Globaltypes$DataNoteSuccess(data),
										hl: $author$project$Globaltypes$StateNoteEditorShow(data.bM),
										hm: data.f6
									}),
								$elm$core$Platform$Cmd$none);
						} else {
							var error = _v14.a;
							var $temp$msg = $author$project$Globaltypes$ApplicationErrorShow,
								$temp$model = _Utils_update(
								model,
								{
									eW: $elm$core$Maybe$Just(
										$elm$json$Json$Decode$errorToString(error))
								});
							msg = $temp$msg;
							model = $temp$model;
							continue update;
						}
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{eu: $author$project$Globaltypes$DataEventRequestFailure}),
							$elm$core$Platform$Cmd$none);
					}
				case 2:
					var noteContent = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{hm: noteContent}),
						$elm$core$Platform$Cmd$none);
				case 17:
					var eventId = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{ev: $author$project$Globaltypes$DataEventReqBodyPending}),
						$elm$http$Http$post(
							{
								P: A2(
									$elm$http$Http$stringBody,
									'application/json',
									$elm$core$String$concat(
										_List_fromArray(
											[
												'{',
												'\"id\":',
												$elm$core$String$fromInt(eventId),
												'}'
											]))),
								S: $elm$http$Http$expectString($author$project$Globaltypes$GotDataEventReqBody),
								X: $author$project$Main$serverUrl + '/get_event_req_body'
							}));
				case 18:
					var result = msg.a;
					if (!result.$) {
						var jsonValue = result.a;
						var _v16 = $author$project$Data$HttpDataEventReqBody$jsonDecodeRequestBody(jsonValue);
						if (!_v16.$) {
							var data = _v16.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										ev: $author$project$Globaltypes$DataEventReqBodySuccess(data)
									}),
								$elm$core$Platform$Cmd$none);
						} else {
							var error = _v16.a;
							var $temp$msg = $author$project$Globaltypes$ApplicationErrorShow,
								$temp$model = _Utils_update(
								model,
								{
									eW: $elm$core$Maybe$Just(
										$elm$json$Json$Decode$errorToString(error))
								});
							msg = $temp$msg;
							model = $temp$model;
							continue update;
						}
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{ev: $author$project$Globaltypes$DataEventReqBodyFailure}),
							$elm$core$Platform$Cmd$none);
					}
				case 19:
					var eventId = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{ew: $author$project$Globaltypes$DataEventResBodyPending}),
						$elm$http$Http$post(
							{
								P: A2(
									$elm$http$Http$stringBody,
									'application/json',
									$elm$core$String$concat(
										_List_fromArray(
											[
												'{',
												'\"id\":',
												$elm$core$String$fromInt(eventId),
												'}'
											]))),
								S: $elm$http$Http$expectString($author$project$Globaltypes$GotDataEventResBody),
								X: $author$project$Main$serverUrl + '/get_event_res_body'
							}));
				case 20:
					var result = msg.a;
					if (!result.$) {
						var jsonValue = result.a;
						var _v18 = $author$project$Data$HttpDataEventResBody$jsonDecodeResponseBody(jsonValue);
						if (!_v18.$) {
							var data = _v18.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										ew: $author$project$Globaltypes$DataEventResBodySuccess(data)
									}),
								$elm$core$Platform$Cmd$none);
						} else {
							var error = _v18.a;
							var $temp$msg = $author$project$Globaltypes$ApplicationErrorShow,
								$temp$model = _Utils_update(
								model,
								{
									eW: $elm$core$Maybe$Just(
										$elm$json$Json$Decode$errorToString(error))
								});
							msg = $temp$msg;
							model = $temp$model;
							continue update;
						}
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{ew: $author$project$Globaltypes$DataEventResBodyFailure}),
							$elm$core$Platform$Cmd$none);
					}
				case 1:
					var site = msg.a;
					var $temp$msg = $author$project$Globaltypes$GetDataEvents($elm$core$Maybe$Nothing),
						$temp$model = _Utils_update(
						model,
						{
							g4: $elm$core$Maybe$Just(site)
						});
					msg = $temp$msg;
					model = $temp$model;
					continue update;
				case 8:
					var noteEditorStatus = msg.a;
					switch (noteEditorStatus.$) {
						case 3:
							var noteId = noteEditorStatus.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										hl: $author$project$Globaltypes$StateNoteEditorShow(noteId)
									}),
								$elm$core$Platform$Cmd$none);
						case 2:
							var $temp$msg = $author$project$Globaltypes$SaveDataNote($elm$core$Maybe$Nothing),
								$temp$model = _Utils_update(
								model,
								{hl: $author$project$Globaltypes$StateNoteEditorNewSave});
							msg = $temp$msg;
							model = $temp$model;
							continue update;
						case 1:
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{hl: $author$project$Globaltypes$StateNoteEditorNewEdit}),
								$elm$core$Platform$Cmd$none);
						case 4:
							var noteId = noteEditorStatus.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										hl: $author$project$Globaltypes$StateNoteEditorEdit(noteId)
									}),
								$elm$core$Platform$Cmd$none);
						case 5:
							var noteId = noteEditorStatus.a;
							var $temp$msg = $author$project$Globaltypes$SaveDataNote(
								$elm$core$Maybe$Just(noteId)),
								$temp$model = _Utils_update(
								model,
								{
									hl: $author$project$Globaltypes$StateNoteEditorSaveEdit(noteId)
								});
							msg = $temp$msg;
							model = $temp$model;
							continue update;
						default:
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{hl: $author$project$Globaltypes$StateNoteEditorVoid}),
								$elm$core$Platform$Cmd$none);
					}
				case 5:
					var maybeNoteId = msg.a;
					if (!maybeNoteId.$) {
						var noteId = maybeNoteId.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{hl: $author$project$Globaltypes$StateNoteEditorVoid, hm: ''}),
							$elm$http$Http$post(
								{
									P: A2(
										$elm$http$Http$stringBody,
										'application/json',
										$elm$core$String$concat(
											_List_fromArray(
												[
													'{',
													'\"id\":',
													$elm$core$String$fromInt(noteId),
													',\"note_content\":',
													'\"',
													$truqu$elm_base64$Base64$encode(model.hm),
													'\"',
													'}'
												]))),
									S: $elm$http$Http$expectString($author$project$Globaltypes$SavedDataNote),
									X: $author$project$Main$serverUrl + '/update_note'
								}));
					} else {
						var maybeEventId = function () {
							var _v22 = model.eu;
							if (_v22.$ === 3) {
								var dataEvent = _v22.a;
								return $elm$core$Maybe$Just(dataEvent.bM);
							} else {
								return $elm$core$Maybe$Nothing;
							}
						}();
						if (!maybeEventId.$) {
							var eventId = maybeEventId.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{hl: $author$project$Globaltypes$StateNoteEditorVoid, hm: ''}),
								$elm$http$Http$post(
									{
										P: A2(
											$elm$http$Http$stringBody,
											'application/json',
											$elm$core$String$concat(
												_List_fromArray(
													[
														'{',
														'\"note_content\":',
														'\"',
														$truqu$elm_base64$Base64$encode(model.hm),
														'\",',
														'\"event_id\":',
														$elm$core$String$fromInt(eventId),
														'}'
													]))),
										S: $elm$http$Http$expectString($author$project$Globaltypes$SavedDataNote),
										X: $author$project$Main$serverUrl + '/create_note'
									}));
						} else {
							var $temp$msg = $author$project$Globaltypes$ApplicationErrorShow,
								$temp$model = _Utils_update(
								model,
								{
									eW: $elm$core$Maybe$Just('Error on saving new Note')
								});
							msg = $temp$msg;
							model = $temp$model;
							continue update;
						}
					}
				case 6:
					var result = msg.a;
					if (!result.$) {
						var _v24 = model.eu;
						if (_v24.$ === 3) {
							var eventData = _v24.a;
							var eventsOffset = function () {
								var _v25 = model.ex;
								if (_v25.$ === 3) {
									var maybeDataEvents = _v25.a;
									return A2(
										$elm$core$Maybe$map,
										function (dataEvents) {
											return dataEvents.ga;
										},
										maybeDataEvents);
								} else {
									return $elm$core$Maybe$Nothing;
								}
							}();
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{hm: ''}),
								$elm$core$Platform$Cmd$batch(
									_List_fromArray(
										[
											A2(
											$elm$core$Task$perform,
											$author$project$Globaltypes$GetDataEvents,
											$elm$core$Task$succeed(eventsOffset)),
											A2(
											$elm$core$Task$perform,
											$author$project$Globaltypes$GetDataEvent,
											$elm$core$Task$succeed(eventData.bM))
										])));
						} else {
							var $temp$msg = $author$project$Globaltypes$GetDataEvents($elm$core$Maybe$Nothing),
								$temp$model = _Utils_update(
								model,
								{hm: ''});
							msg = $temp$msg;
							model = $temp$model;
							continue update;
						}
					} else {
						var error = result.a;
						var $temp$msg = $author$project$Globaltypes$ApplicationErrorShow,
							$temp$model = _Utils_update(
							model,
							{
								eW: $elm$core$Maybe$Just(
									$author$project$Helpers$httpErrorToString(error))
							});
						msg = $temp$msg;
						model = $temp$model;
						continue update;
					}
				case 7:
					var maybeEventId = msg.a;
					if (!maybeEventId.$) {
						var eventId = maybeEventId.a;
						var $temp$msg = $author$project$Globaltypes$GetDataEvent(eventId),
							$temp$model = _Utils_update(
							model,
							{g5: maybeEventId});
						msg = $temp$msg;
						model = $temp$model;
						continue update;
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{eu: $author$project$Globaltypes$DataEventNoRequest, ev: $author$project$Globaltypes$DataEventReqBodyNoRequest, ew: $author$project$Globaltypes$DataEventResBodyNoRequest, ey: $author$project$Globaltypes$DataNoteNoRequest, g5: maybeEventId, hl: $author$project$Globaltypes$StateNoteEditorVoid}),
							$elm$core$Platform$Cmd$none);
					}
				case 9:
					var tabType = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{hn: tabType}),
						$elm$core$Platform$Cmd$none);
				default:
					var jsonEvents = msg.a;
					var _v27 = $author$project$Data$HttpDataEvents$jsonDecodeEventsResponse(jsonEvents);
					if (!_v27.$) {
						var data = _v27.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									ex: $author$project$Globaltypes$DataEventsRequestSuccess(
										$elm$core$Maybe$Just(data))
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						var error = _v27.a;
						var $temp$msg = $author$project$Globaltypes$ApplicationErrorShow,
							$temp$model = _Utils_update(
							model,
							{
								eW: $elm$core$Maybe$Just(
									$elm$json$Json$Decode$errorToString(error))
							});
						msg = $temp$msg;
						model = $temp$model;
						continue update;
					}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Class = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$classes = {cS: 'a', aV: 'atv', cW: 'ab', cX: 'cx', cY: 'cy', cZ: 'acb', c_: 'accx', c$: 'accy', c0: 'acr', bl: 'al', bm: 'ar', c1: 'at', aW: 'ah', aX: 'av', c4: 's', dm: 'bh', dn: 'b', dr: 'w7', dv: 'bd', dw: 'bdt', aE: 'bn', dx: 'bs', aF: 'cpe', d4: 'cp', d5: 'cpx', d6: 'cpy', Q: 'c', aI: 'ctr', aJ: 'cb', aK: 'ccx', R: 'ccy', as: 'cl', aL: 'cr', ek: 'ct', ep: 'cptr', eq: 'ctxt', fc: 'fcs', bB: 'focus-within', fj: 'fs', fl: 'g', a1: 'hbh', a2: 'hc', bH: 'he', a3: 'hf', bI: 'hfp', fp: 'hv', fs: 'ic', fu: 'fr', aO: 'lbl', fy: 'iml', fz: 'imlf', fA: 'imlp', fB: 'implw', fC: 'it', fE: 'i', fL: 'lnk', am: 'nb', bY: 'notxt', gb: 'ol', gc: 'or', ad: 'oq', gi: 'oh', b2: 'pg', b3: 'p', gj: 'ppe', gQ: 'ui', cr: 'r', gT: 'sb', gU: 'sbx', gV: 'sby', gW: 'sbt', g9: 'e', hc: 'cap', hg: 'sev', hu: 'sk', cH: 't', hI: 'tc', hJ: 'w8', hK: 'w2', hL: 'w9', hM: 'tj', aT: 'tja', hN: 'tl', hO: 'w3', hP: 'w5', hQ: 'w4', hR: 'tr', hS: 'w6', hT: 'w1', hU: 'tun', cK: 'ts', ag: 'clr', h4: 'u', bh: 'wc', cP: 'we', bi: 'wf', cQ: 'wfp', bj: 'wrp'};
var $mdgriffith$elm_ui$Internal$Flag$Flag = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Second = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$flag = function (i) {
	return (i > 31) ? $mdgriffith$elm_ui$Internal$Flag$Second(1 << (i - 32)) : $mdgriffith$elm_ui$Internal$Flag$Flag(1 << i);
};
var $mdgriffith$elm_ui$Internal$Flag$overflow = $mdgriffith$elm_ui$Internal$Flag$flag(20);
var $mdgriffith$elm_ui$Element$clip = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.d4);
var $mdgriffith$elm_ui$Internal$Model$Colored = F3(
	function (a, b, c) {
		return {$: 4, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$StyleClass = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$bgColor = $mdgriffith$elm_ui$Internal$Flag$flag(8);
var $elm$core$Basics$round = _Basics_round;
var $mdgriffith$elm_ui$Internal$Model$floatClass = function (x) {
	return $elm$core$String$fromInt(
		$elm$core$Basics$round(x * 255));
};
var $mdgriffith$elm_ui$Internal$Model$formatColorClass = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return $mdgriffith$elm_ui$Internal$Model$floatClass(red) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(green) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(blue) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(alpha))))));
};
var $mdgriffith$elm_ui$Element$Background$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$bgColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'background-color',
			clr));
};
var $mdgriffith$elm_ui$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Element$rgb255 = F3(
	function (red, green, blue) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, red / 255, green / 255, blue / 255, 1);
	});
var $author$project$Ui$Colors$color = {
	ai: A3($mdgriffith$elm_ui$Element$rgb255, 0, 0, 0),
	$7: A3($mdgriffith$elm_ui$Element$rgb255, 26, 13, 171),
	dp: A3($mdgriffith$elm_ui$Element$rgb255, 114, 159, 207),
	bq: A3($mdgriffith$elm_ui$Element$rgb255, 32, 57, 183),
	er: A3($mdgriffith$elm_ui$Element$rgb255, 197, 232, 247),
	es: A3($mdgriffith$elm_ui$Element$rgb255, 46, 52, 54),
	aM: A3($mdgriffith$elm_ui$Element$rgb255, 106, 104, 100),
	fk: A3($mdgriffith$elm_ui$Element$rgb255, 212, 208, 200),
	fJ: A3($mdgriffith$elm_ui$Element$rgb255, 175, 183, 242),
	fK: A3($mdgriffith$elm_ui$Element$rgb255, 224, 224, 224),
	bU: A3($mdgriffith$elm_ui$Element$rgb255, 255, 255, 166),
	gt: A3($mdgriffith$elm_ui$Element$rgb255, 255, 0, 0),
	gu: A3($mdgriffith$elm_ui$Element$rgb255, 232, 69, 60),
	ij: A3($mdgriffith$elm_ui$Element$rgb255, 255, 255, 255)
};
var $mdgriffith$elm_ui$Internal$Model$Unkeyed = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AsColumn = 1;
var $mdgriffith$elm_ui$Internal$Model$asColumn = 1;
var $mdgriffith$elm_ui$Internal$Model$Generic = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$div = $mdgriffith$elm_ui$Internal$Model$Generic;
var $mdgriffith$elm_ui$Internal$Model$NoNearbyChildren = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$columnClass = $mdgriffith$elm_ui$Internal$Style$classes.c4 + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.Q);
var $mdgriffith$elm_ui$Internal$Model$gridClass = $mdgriffith$elm_ui$Internal$Style$classes.c4 + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.fl);
var $mdgriffith$elm_ui$Internal$Model$pageClass = $mdgriffith$elm_ui$Internal$Style$classes.c4 + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.b2);
var $mdgriffith$elm_ui$Internal$Model$paragraphClass = $mdgriffith$elm_ui$Internal$Style$classes.c4 + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.b3);
var $mdgriffith$elm_ui$Internal$Model$rowClass = $mdgriffith$elm_ui$Internal$Style$classes.c4 + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.cr);
var $mdgriffith$elm_ui$Internal$Model$singleClass = $mdgriffith$elm_ui$Internal$Style$classes.c4 + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.g9);
var $mdgriffith$elm_ui$Internal$Model$contextClasses = function (context) {
	switch (context) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Model$rowClass;
		case 1:
			return $mdgriffith$elm_ui$Internal$Model$columnClass;
		case 2:
			return $mdgriffith$elm_ui$Internal$Model$singleClass;
		case 3:
			return $mdgriffith$elm_ui$Internal$Model$gridClass;
		case 4:
			return $mdgriffith$elm_ui$Internal$Model$paragraphClass;
		default:
			return $mdgriffith$elm_ui$Internal$Model$pageClass;
	}
};
var $mdgriffith$elm_ui$Internal$Model$Keyed = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$NoStyleSheet = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$Styled = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Unstyled = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addChildren = F2(
	function (existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 0:
				return existing;
			case 1:
				var behind = nearbyChildren.a;
				return _Utils_ap(behind, existing);
			case 2:
				var inFront = nearbyChildren.a;
				return _Utils_ap(existing, inFront);
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					behind,
					_Utils_ap(existing, inFront));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$addKeyedChildren = F3(
	function (key, existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 0:
				return existing;
			case 1:
				var behind = nearbyChildren.a;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					existing);
			case 2:
				var inFront = nearbyChildren.a;
				return _Utils_ap(
					existing,
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						inFront));
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					_Utils_ap(
						existing,
						A2(
							$elm$core$List$map,
							function (x) {
								return _Utils_Tuple2(key, x);
							},
							inFront)));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$AsEl = 2;
var $mdgriffith$elm_ui$Internal$Model$asEl = 2;
var $mdgriffith$elm_ui$Internal$Model$AsParagraph = 4;
var $mdgriffith$elm_ui$Internal$Model$asParagraph = 4;
var $mdgriffith$elm_ui$Internal$Flag$alignBottom = $mdgriffith$elm_ui$Internal$Flag$flag(41);
var $mdgriffith$elm_ui$Internal$Flag$alignRight = $mdgriffith$elm_ui$Internal$Flag$flag(40);
var $mdgriffith$elm_ui$Internal$Flag$centerX = $mdgriffith$elm_ui$Internal$Flag$flag(42);
var $mdgriffith$elm_ui$Internal$Flag$centerY = $mdgriffith$elm_ui$Internal$Flag$flag(43);
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$core$Set$Set_elm_builtin = $elm$core$Basics$identity;
var $elm$core$Set$empty = $elm$core$Dict$empty;
var $mdgriffith$elm_ui$Internal$Model$lengthClassName = function (x) {
	switch (x.$) {
		case 0:
			var px = x.a;
			return $elm$core$String$fromInt(px) + 'px';
		case 1:
			return 'auto';
		case 2:
			var i = x.a;
			return $elm$core$String$fromInt(i) + 'fr';
		case 3:
			var min = x.a;
			var len = x.b;
			return 'min' + ($elm$core$String$fromInt(min) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
		default:
			var max = x.a;
			var len = x.b;
			return 'max' + ($elm$core$String$fromInt(max) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
	}
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $mdgriffith$elm_ui$Internal$Model$transformClass = function (transform) {
	switch (transform.$) {
		case 0:
			return $elm$core$Maybe$Nothing;
		case 1:
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'mv-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(x) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(y) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(z))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			return $elm$core$Maybe$Just(
				'tfrm-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ty) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ox) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oz) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(angle))))))))))))))))))));
	}
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $mdgriffith$elm_ui$Internal$Model$getStyleName = function (style) {
	switch (style.$) {
		case 13:
			var name = style.a;
			return name;
		case 12:
			var name = style.a;
			var o = style.b;
			return name;
		case 0:
			var _class = style.a;
			return _class;
		case 1:
			var name = style.a;
			return name;
		case 2:
			var i = style.a;
			return 'font-size-' + $elm$core$String$fromInt(i);
		case 3:
			var _class = style.a;
			return _class;
		case 4:
			var _class = style.a;
			return _class;
		case 5:
			var cls = style.a;
			var x = style.b;
			var y = style.c;
			return cls;
		case 7:
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 6:
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 8:
			var template = style.a;
			return 'grid-rows-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.gS)) + ('-cols-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.eg)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.hh.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.hh.b)))))));
		case 9:
			var pos = style.a;
			return 'gp grid-pos-' + ($elm$core$String$fromInt(pos.cr) + ('-' + ($elm$core$String$fromInt(pos.bu) + ('-' + ($elm$core$String$fromInt(pos.L) + ('-' + $elm$core$String$fromInt(pos.bG)))))));
		case 11:
			var selector = style.a;
			var subStyle = style.b;
			var name = function () {
				switch (selector) {
					case 0:
						return 'fs';
					case 1:
						return 'hv';
					default:
						return 'act';
				}
			}();
			return A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$map,
					function (sty) {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$getStyleName(sty);
						if (_v1 === '') {
							return '';
						} else {
							var styleName = _v1;
							return styleName + ('-' + name);
						}
					},
					subStyle));
		default:
			var x = style.a;
			return A2(
				$elm$core$Maybe$withDefault,
				'',
				$mdgriffith$elm_ui$Internal$Model$transformClass(x));
	}
};
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0;
		return A3($elm$core$Dict$insert, key, 0, dict);
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (!_v0.$) {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$member, key, dict);
	});
var $mdgriffith$elm_ui$Internal$Model$reduceStyles = F2(
	function (style, nevermind) {
		var cache = nevermind.a;
		var existing = nevermind.b;
		var styleName = $mdgriffith$elm_ui$Internal$Model$getStyleName(style);
		return A2($elm$core$Set$member, styleName, cache) ? nevermind : _Utils_Tuple2(
			A2($elm$core$Set$insert, styleName, cache),
			A2($elm$core$List$cons, style, existing));
	});
var $mdgriffith$elm_ui$Internal$Model$Property = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Style = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$dot = function (c) {
	return '.' + c;
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $mdgriffith$elm_ui$Internal$Model$formatColor = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return 'rgba(' + ($elm$core$String$fromInt(
		$elm$core$Basics$round(red * 255)) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(green * 255))) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(blue * 255))) + (',' + ($elm$core$String$fromFloat(alpha) + ')')))));
};
var $mdgriffith$elm_ui$Internal$Model$formatBoxShadow = function (shadow) {
	return A2(
		$elm$core$String$join,
		' ',
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					shadow.bO ? $elm$core$Maybe$Just('inset') : $elm$core$Maybe$Nothing,
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.ga.a) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.ga.b) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.aj) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.cA) + 'px'),
					$elm$core$Maybe$Just(
					$mdgriffith$elm_ui$Internal$Model$formatColor(shadow.ak))
				])));
};
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $mdgriffith$elm_ui$Internal$Model$renderFocusStyle = function (focus) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bB) + ':focus-within',
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.du),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.dg),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										aj: shadow.aj,
										ak: shadow.ak,
										bO: false,
										ga: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.ga)),
										cA: shadow.cA
									}));
						},
						focus.g2),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					]))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4) + ':focus .focusable, ') + (($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4) + '.focusable:focus, ') + ('.ui-slide-bar:focus + ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4) + ' .focusable-thumb'))),
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.du),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.dg),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										aj: shadow.aj,
										ak: shadow.ak,
										bO: false,
										ga: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.ga)),
										cA: shadow.cA
									}));
						},
						focus.g2),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					])))
		]);
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Style$AllChildren = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Batch = function (a) {
	return {$: 6, a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Child = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Class = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Descriptor = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Left = 3;
var $mdgriffith$elm_ui$Internal$Style$Prop = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Right = 2;
var $mdgriffith$elm_ui$Internal$Style$Self = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Content = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$Bottom = 1;
var $mdgriffith$elm_ui$Internal$Style$CenterX = 4;
var $mdgriffith$elm_ui$Internal$Style$CenterY = 5;
var $mdgriffith$elm_ui$Internal$Style$Top = 0;
var $mdgriffith$elm_ui$Internal$Style$alignments = _List_fromArray(
	[0, 1, 2, 3, 4, 5]);
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $mdgriffith$elm_ui$Internal$Style$contentName = function (desc) {
	switch (desc) {
		case 0:
			var _v1 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ek);
		case 1:
			var _v2 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aJ);
		case 2:
			var _v3 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aL);
		case 3:
			var _v4 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.as);
		case 4:
			var _v5 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aK);
		default:
			var _v6 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.R);
	}
};
var $mdgriffith$elm_ui$Internal$Style$selfName = function (desc) {
	switch (desc) {
		case 0:
			var _v1 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c1);
		case 1:
			var _v2 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cW);
		case 2:
			var _v3 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bm);
		case 3:
			var _v4 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bl);
		case 4:
			var _v5 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cX);
		default:
			var _v6 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cY);
	}
};
var $mdgriffith$elm_ui$Internal$Style$describeAlignment = function (values) {
	var createDescription = function (alignment) {
		var _v0 = values(alignment);
		var content = _v0.a;
		var indiv = _v0.b;
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$contentName(alignment),
				content),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(alignment),
						indiv)
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$elDescription = _List_fromArray(
	[
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a1),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dm),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gW),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cH),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a3),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bi),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'auto !important')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a2),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a3),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bi),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cQ),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bh),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
			])),
		$mdgriffith$elm_ui$Internal$Style$describeAlignment(
		function (alignment) {
			switch (alignment) {
				case 0:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
							]));
				case 1:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
							]));
				case 2:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
							]));
				case 3:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							]));
				case 4:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
							]));
				default:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
									]))
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
							]));
			}
		})
	]);
var $mdgriffith$elm_ui$Internal$Style$gridAlignments = function (values) {
	var createDescription = function (alignment) {
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(alignment),
						values(alignment))
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$Above = 0;
var $mdgriffith$elm_ui$Internal$Style$Behind = 5;
var $mdgriffith$elm_ui$Internal$Style$Below = 1;
var $mdgriffith$elm_ui$Internal$Style$OnLeft = 3;
var $mdgriffith$elm_ui$Internal$Style$OnRight = 2;
var $mdgriffith$elm_ui$Internal$Style$Within = 4;
var $mdgriffith$elm_ui$Internal$Style$locations = function () {
	var loc = 0;
	var _v0 = function () {
		switch (loc) {
			case 0:
				return 0;
			case 1:
				return 0;
			case 2:
				return 0;
			case 3:
				return 0;
			case 4:
				return 0;
			default:
				return 0;
		}
	}();
	return _List_fromArray(
		[0, 1, 2, 3, 4, 5]);
}();
var $mdgriffith$elm_ui$Internal$Style$baseSheet = _List_fromArray(
	[
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		'html,body',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		_Utils_ap(
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4),
			_Utils_ap(
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.g9),
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fs))),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a3),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'img',
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'max-height', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'object-fit', 'cover')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bi),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'img',
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'max-width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'object-fit', 'cover')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4) + ':focus',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'outline', 'none')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gQ),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a3)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a3),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fu),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.am),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.am),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.g9),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				$mdgriffith$elm_ui$Internal$Style$Batch(
				function (fn) {
					return A2($elm$core$List$map, fn, $mdgriffith$elm_ui$Internal$Style$locations);
				}(
					function (loc) {
						switch (loc) {
							case 0:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cS),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a3),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bi),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
												])),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 1:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dn),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a3),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												]))
										]));
							case 2:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gc),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 3:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gb),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'right', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 4:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fu),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							default:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dm),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
						}
					}))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'resize', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'box-sizing', 'border-box'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-size', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-family', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'inherit'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bj),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-wrap', 'wrap')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bY),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-moz-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-webkit-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-ms-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'user-select', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ep),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'pointer')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eq),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gj),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aF),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ag),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ad),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.fp, $mdgriffith$elm_ui$Internal$Style$classes.ag)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.fp, $mdgriffith$elm_ui$Internal$Style$classes.ad)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.fc, $mdgriffith$elm_ui$Internal$Style$classes.ag)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.fc, $mdgriffith$elm_ui$Internal$Style$classes.ad)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.aV, $mdgriffith$elm_ui$Internal$Style$classes.ag)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.aV, $mdgriffith$elm_ui$Internal$Style$classes.ad)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cK),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Prop,
						'transition',
						A2(
							$elm$core$String$join,
							', ',
							A2(
								$elm$core$List$map,
								function (x) {
									return x + ' 160ms';
								},
								_List_fromArray(
									['transform', 'opacity', 'filter', 'background-color', 'color', 'font-size']))))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gT),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gU),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cr),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gV),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.Q),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.g9),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d5),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d6),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bh),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', 'auto')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aE),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dv),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dashed')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dw),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dotted')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dx),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cH),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fC),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1.05'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background', 'transparent'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'inherit')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.g9),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cr),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0%'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cP),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fL),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a3),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bI),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bi),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aI),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.c0,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.c_,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cX),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-left', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.c_,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cX),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-right', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.c_,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.c_ + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.c0 + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.c_)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 1:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 2:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_Nil);
								case 3:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_Nil);
								case 4:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hg),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aO),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'baseline')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.Q),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0px'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', 'min-content'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bH),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a3),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bi),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cQ),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bh),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.cZ,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.c$,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.c$,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.c$,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.c$ + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.cZ + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.c$)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
											]));
								case 1:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto')
											]));
								case 2:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 3:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 4:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aI),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hg),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fl),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', '-ms-grid'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'.gp',
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Supports,
						_Utils_Tuple2('display', 'grid'),
						_List_fromArray(
							[
								_Utils_Tuple2('display', 'grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$gridAlignments(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
										]);
								case 1:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
										]);
								case 2:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
										]);
								case 3:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
										]);
								case 4:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
										]);
								default:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
										]);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b2),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4 + ':first-child'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.c4 + ($mdgriffith$elm_ui$Internal$Style$selfName(3) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.c4))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.c4 + ($mdgriffith$elm_ui$Internal$Style$selfName(2) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.c4))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 1:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 2:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 3:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 4:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fy),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background-color', 'transparent')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fB),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.g9),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fA),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fz),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'transparent')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b3),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-wrap', 'break-word'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a1),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dm),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cH),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b3),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								'::after',
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', 'none')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								'::before',
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', 'none')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.g9),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cP),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fu),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dm),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cS),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dn),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gc),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gb),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cH),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cr),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.Q),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-flex')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fl),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 1:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 2:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right')
											]));
								case 3:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left')
											]));
								case 4:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.hidden',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hT),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '100')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hK),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '200')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hO),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '300')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hQ),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '400')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hP),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '500')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hS),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '600')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dr),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '700')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hJ),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '800')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hL),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '900')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fE),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'italic')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hu),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.h4),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.h4),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hu)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hU),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'normal')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hM),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aT),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify-all')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hI),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'center')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hR),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'right')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hN),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'left')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.modal',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none')
					]))
			]))
	]);
var $mdgriffith$elm_ui$Internal$Style$fontVariant = function (_var) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + _var,
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\"'))
				])),
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + (_var + '-off'),
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\" 0'))
				]))
		]);
};
var $mdgriffith$elm_ui$Internal$Style$commonValues = $elm$core$List$concat(
	_List_fromArray(
		[
			A2(
			$elm$core$List$map,
			function (x) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.border-' + $elm$core$String$fromInt(x),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'border-width',
							$elm$core$String$fromInt(x) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 6)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 8, 32)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.p-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'padding',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 24)),
			_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'small-caps')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp-off',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'normal')
					]))
			]),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('zero'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('onum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('liga'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('dlig'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('ordn'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('tnum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('afrc'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('frac')
		]));
var $mdgriffith$elm_ui$Internal$Style$explainer = '\n.explain {\n    border: 6px solid rgb(174, 121, 15) !important;\n}\n.explain > .' + ($mdgriffith$elm_ui$Internal$Style$classes.c4 + (' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n.ctr {\n    border: none !important;\n}\n.explain > .ctr > .' + ($mdgriffith$elm_ui$Internal$Style$classes.c4 + ' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n')));
var $mdgriffith$elm_ui$Internal$Style$inputTextReset = '\ninput[type="search"],\ninput[type="search"]::-webkit-search-decoration,\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-results-button,\ninput[type="search"]::-webkit-search-results-decoration {\n  -webkit-appearance:none;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$sliderReset = '\ninput[type=range] {\n  -webkit-appearance: none; \n  background: transparent;\n  position:absolute;\n  left:0;\n  top:0;\n  z-index:10;\n  width: 100%;\n  outline: dashed 1px;\n  height: 100%;\n  opacity: 0;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$thumbReset = '\ninput[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-moz-range-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-ms-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range][orient=vertical]{\n    writing-mode: bt-lr; /* IE */\n    -webkit-appearance: slider-vertical;  /* WebKit */\n}\n';
var $mdgriffith$elm_ui$Internal$Style$trackReset = '\ninput[type=range]::-moz-range-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-ms-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n    background: transparent;\n    cursor: pointer;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$overrides = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cr) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4) + (' { flex-basis: auto !important; } ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cr) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aI) + (' { flex-basis: auto !important; }}' + ($mdgriffith$elm_ui$Internal$Style$inputTextReset + ($mdgriffith$elm_ui$Internal$Style$sliderReset + ($mdgriffith$elm_ui$Internal$Style$trackReset + ($mdgriffith$elm_ui$Internal$Style$thumbReset + $mdgriffith$elm_ui$Internal$Style$explainer)))))))))))))));
var $mdgriffith$elm_ui$Internal$Style$Intermediate = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return {aH: closing, q: _List_Nil, V: _List_Nil, H: selector};
	});
var $mdgriffith$elm_ui$Internal$Style$renderRules = F2(
	function (_v0, rulesToRender) {
		var parent = _v0;
		var generateIntermediates = F2(
			function (rule, rendered) {
				switch (rule.$) {
					case 0:
						var name = rule.a;
						var val = rule.b;
						return _Utils_update(
							rendered,
							{
								V: A2(
									$elm$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.V)
							});
					case 3:
						var _v2 = rule.a;
						var prop = _v2.a;
						var value = _v2.b;
						var props = rule.b;
						return _Utils_update(
							rendered,
							{
								q: A2(
									$elm$core$List$cons,
									{aH: '\n}', q: _List_Nil, V: props, H: '@supports (' + (prop + (':' + (value + (') {' + parent.H))))},
									rendered.q)
							});
					case 5:
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								q: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.H + (' + ' + selector), ''),
										adjRules),
									rendered.q)
							});
					case 1:
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								q: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.H + (' > ' + child), ''),
										childRules),
									rendered.q)
							});
					case 2:
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								q: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.H + (' ' + child), ''),
										childRules),
									rendered.q)
							});
					case 4:
						var descriptor = rule.a;
						var descriptorRules = rule.b;
						return _Utils_update(
							rendered,
							{
								q: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2(
											$mdgriffith$elm_ui$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.H, descriptor),
											''),
										descriptorRules),
									rendered.q)
							});
					default:
						var batched = rule.a;
						return _Utils_update(
							rendered,
							{
								q: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.H, ''),
										batched),
									rendered.q)
							});
				}
			});
		return A3($elm$core$List$foldr, generateIntermediates, parent, rulesToRender);
	});
var $mdgriffith$elm_ui$Internal$Style$renderCompact = function (styleClasses) {
	var renderValues = function (values) {
		return $elm$core$String$concat(
			A2(
				$elm$core$List$map,
				function (_v3) {
					var x = _v3.a;
					var y = _v3.b;
					return x + (':' + (y + ';'));
				},
				values));
	};
	var renderClass = function (rule) {
		var _v2 = rule.V;
		if (!_v2.b) {
			return '';
		} else {
			return rule.H + ('{' + (renderValues(rule.V) + (rule.aH + '}')));
		}
	};
	var renderIntermediate = function (_v0) {
		var rule = _v0;
		return _Utils_ap(
			renderClass(rule),
			$elm$core$String$concat(
				A2($elm$core$List$map, renderIntermediate, rule.q)));
	};
	return $elm$core$String$concat(
		A2(
			$elm$core$List$map,
			renderIntermediate,
			A3(
				$elm$core$List$foldr,
				F2(
					function (_v1, existing) {
						var name = _v1.a;
						var styleRules = _v1.b;
						return A2(
							$elm$core$List$cons,
							A2(
								$mdgriffith$elm_ui$Internal$Style$renderRules,
								A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, name, ''),
								styleRules),
							existing);
					}),
				_List_Nil,
				styleClasses)));
};
var $mdgriffith$elm_ui$Internal$Style$rules = _Utils_ap(
	$mdgriffith$elm_ui$Internal$Style$overrides,
	$mdgriffith$elm_ui$Internal$Style$renderCompact(
		_Utils_ap($mdgriffith$elm_ui$Internal$Style$baseSheet, $mdgriffith$elm_ui$Internal$Style$commonValues)));
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $mdgriffith$elm_ui$Internal$Model$staticRoot = function (opts) {
	var _v0 = opts.f1;
	switch (_v0) {
		case 0:
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'div',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$virtual_dom$VirtualDom$node,
						'style',
						_List_Nil,
						_List_fromArray(
							[
								$elm$virtual_dom$VirtualDom$text($mdgriffith$elm_ui$Internal$Style$rules)
							]))
					]));
		case 1:
			return $elm$virtual_dom$VirtualDom$text('');
		default:
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'elm-ui-static-rules',
				_List_fromArray(
					[
						A2(
						$elm$virtual_dom$VirtualDom$property,
						'rules',
						$elm$json$Json$Encode$string($mdgriffith$elm_ui$Internal$Style$rules))
					]),
				_List_Nil);
	}
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$fontName = function (font) {
	switch (font.$) {
		case 0:
			return 'serif';
		case 1:
			return 'sans-serif';
		case 2:
			return 'monospace';
		case 3:
			var name = font.a;
			return '\"' + (name + '\"');
		case 4:
			var name = font.a;
			var url = font.b;
			return '\"' + (name + '\"');
		default:
			var name = font.a.f4;
			return '\"' + (name + '\"');
	}
};
var $mdgriffith$elm_ui$Internal$Model$isSmallCaps = function (_var) {
	switch (_var.$) {
		case 0:
			var name = _var.a;
			return name === 'smcp';
		case 1:
			var name = _var.a;
			return false;
		default:
			var name = _var.a;
			var index = _var.b;
			return (name === 'smcp') && (index === 1);
	}
};
var $mdgriffith$elm_ui$Internal$Model$hasSmallCaps = function (typeface) {
	if (typeface.$ === 5) {
		var font = typeface.a;
		return A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$isSmallCaps, font.cM);
	} else {
		return false;
	}
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $mdgriffith$elm_ui$Internal$Model$renderProps = F3(
	function (force, _v0, existing) {
		var key = _v0.a;
		var val = _v0.b;
		return force ? (existing + ('\n  ' + (key + (': ' + (val + ' !important;'))))) : (existing + ('\n  ' + (key + (': ' + (val + ';')))));
	});
var $mdgriffith$elm_ui$Internal$Model$renderStyle = F4(
	function (options, maybePseudo, selector, props) {
		if (maybePseudo.$ === 1) {
			return _List_fromArray(
				[
					selector + ('{' + (A3(
					$elm$core$List$foldl,
					$mdgriffith$elm_ui$Internal$Model$renderProps(false),
					'',
					props) + '\n}'))
				]);
		} else {
			var pseudo = maybePseudo.a;
			switch (pseudo) {
				case 1:
					var _v2 = options.fp;
					switch (_v2) {
						case 0:
							return _List_Nil;
						case 2:
							return _List_fromArray(
								[
									selector + ('-hv {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(true),
									'',
									props) + '\n}'))
								]);
						default:
							return _List_fromArray(
								[
									selector + ('-hv:hover {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(false),
									'',
									props) + '\n}'))
								]);
					}
				case 0:
					var renderedProps = A3(
						$elm$core$List$foldl,
						$mdgriffith$elm_ui$Internal$Model$renderProps(false),
						'',
						props);
					return _List_fromArray(
						[
							selector + ('-fs:focus {' + (renderedProps + '\n}')),
							('.' + ($mdgriffith$elm_ui$Internal$Style$classes.c4 + (':focus ' + (selector + '-fs  {')))) + (renderedProps + '\n}'),
							(selector + '-fs:focus-within {') + (renderedProps + '\n}'),
							('.ui-slide-bar:focus + ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4) + (' .focusable-thumb' + (selector + '-fs {')))) + (renderedProps + '\n}')
						]);
				default:
					return _List_fromArray(
						[
							selector + ('-act:active {' + (A3(
							$elm$core$List$foldl,
							$mdgriffith$elm_ui$Internal$Model$renderProps(false),
							'',
							props) + '\n}'))
						]);
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderVariant = function (_var) {
	switch (_var.$) {
		case 0:
			var name = _var.a;
			return '\"' + (name + '\"');
		case 1:
			var name = _var.a;
			return '\"' + (name + '\" 0');
		default:
			var name = _var.a;
			var index = _var.b;
			return '\"' + (name + ('\" ' + $elm$core$String$fromInt(index)));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderVariants = function (typeface) {
	if (typeface.$ === 5) {
		var font = typeface.a;
		return $elm$core$Maybe$Just(
			A2(
				$elm$core$String$join,
				', ',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$renderVariant, font.cM)));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$transformValue = function (transform) {
	switch (transform.$) {
		case 0:
			return $elm$core$Maybe$Nothing;
		case 1:
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'translate3d(' + ($elm$core$String$fromFloat(x) + ('px, ' + ($elm$core$String$fromFloat(y) + ('px, ' + ($elm$core$String$fromFloat(z) + 'px)'))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			var translate = 'translate3d(' + ($elm$core$String$fromFloat(tx) + ('px, ' + ($elm$core$String$fromFloat(ty) + ('px, ' + ($elm$core$String$fromFloat(tz) + 'px)')))));
			var scale = 'scale3d(' + ($elm$core$String$fromFloat(sx) + (', ' + ($elm$core$String$fromFloat(sy) + (', ' + ($elm$core$String$fromFloat(sz) + ')')))));
			var rotate = 'rotate3d(' + ($elm$core$String$fromFloat(ox) + (', ' + ($elm$core$String$fromFloat(oy) + (', ' + ($elm$core$String$fromFloat(oz) + (', ' + ($elm$core$String$fromFloat(angle) + 'rad)')))))));
			return $elm$core$Maybe$Just(translate + (' ' + (scale + (' ' + rotate))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderStyleRule = F3(
	function (options, rule, maybePseudo) {
		switch (rule.$) {
			case 0:
				var selector = rule.a;
				var props = rule.b;
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, selector, props);
			case 13:
				var name = rule.a;
				var prop = rule.b;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, 'box-shadow', prop)
						]));
			case 12:
				var name = rule.a;
				var transparency = rule.b;
				var opacity = A2(
					$elm$core$Basics$max,
					0,
					A2($elm$core$Basics$min, 1, 1 - transparency));
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'opacity',
							$elm$core$String$fromFloat(opacity))
						]));
			case 2:
				var i = rule.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			case 1:
				var name = rule.a;
				var typefaces = rule.b;
				var features = A2(
					$elm$core$String$join,
					', ',
					A2($elm$core$List$filterMap, $mdgriffith$elm_ui$Internal$Model$renderVariants, typefaces));
				var families = _List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-family',
						A2(
							$elm$core$String$join,
							', ',
							A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$fontName, typefaces))),
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'font-feature-settings', features),
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-variant',
						A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$hasSmallCaps, typefaces) ? 'small-caps' : 'normal')
					]);
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, '.' + name, families);
			case 3:
				var _class = rule.a;
				var prop = rule.b;
				var val = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, prop, val)
						]));
			case 4:
				var _class = rule.a;
				var prop = rule.b;
				var color = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							prop,
							$mdgriffith$elm_ui$Internal$Model$formatColor(color))
						]));
			case 5:
				var cls = rule.a;
				var x = rule.b;
				var y = rule.c;
				var yPx = $elm$core$String$fromInt(y) + 'px';
				var xPx = $elm$core$String$fromInt(x) + 'px';
				var single = '.' + $mdgriffith$elm_ui$Internal$Style$classes.g9;
				var row = '.' + $mdgriffith$elm_ui$Internal$Style$classes.cr;
				var wrappedRow = '.' + ($mdgriffith$elm_ui$Internal$Style$classes.bj + row);
				var right = '.' + $mdgriffith$elm_ui$Internal$Style$classes.bm;
				var paragraph = '.' + $mdgriffith$elm_ui$Internal$Style$classes.b3;
				var page = '.' + $mdgriffith$elm_ui$Internal$Style$classes.b2;
				var left = '.' + $mdgriffith$elm_ui$Internal$Style$classes.bl;
				var halfY = $elm$core$String$fromFloat(y / 2) + 'px';
				var halfX = $elm$core$String$fromFloat(x / 2) + 'px';
				var column = '.' + $mdgriffith$elm_ui$Internal$Style$classes.Q;
				var _class = '.' + cls;
				var any = '.' + $mdgriffith$elm_ui$Internal$Style$classes.c4;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (row + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (wrappedRow + (' > ' + any)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin', halfY + (' ' + halfX))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (column + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_Utils_ap(_class, paragraph),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							'textarea' + (any + _class),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)')),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'height',
									'calc(100% + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::after'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-top',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::before'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-bottom',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								]))
						]));
			case 7:
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'padding',
							$elm$core$String$fromFloat(top) + ('px ' + ($elm$core$String$fromFloat(right) + ('px ' + ($elm$core$String$fromFloat(bottom) + ('px ' + ($elm$core$String$fromFloat(left) + 'px')))))))
						]));
			case 6:
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'border-width',
							$elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px')))))))
						]));
			case 8:
				var template = rule.a;
				var toGridLengthHelper = F3(
					function (minimum, maximum, x) {
						toGridLengthHelper:
						while (true) {
							switch (x.$) {
								case 0:
									var px = x.a;
									return $elm$core$String$fromInt(px) + 'px';
								case 1:
									var _v2 = _Utils_Tuple2(minimum, maximum);
									if (_v2.a.$ === 1) {
										if (_v2.b.$ === 1) {
											var _v3 = _v2.a;
											var _v4 = _v2.b;
											return 'max-content';
										} else {
											var _v6 = _v2.a;
											var maxSize = _v2.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v2.b.$ === 1) {
											var minSize = _v2.a.a;
											var _v5 = _v2.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
										} else {
											var minSize = _v2.a.a;
											var maxSize = _v2.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 2:
									var i = x.a;
									var _v7 = _Utils_Tuple2(minimum, maximum);
									if (_v7.a.$ === 1) {
										if (_v7.b.$ === 1) {
											var _v8 = _v7.a;
											var _v9 = _v7.b;
											return $elm$core$String$fromInt(i) + 'fr';
										} else {
											var _v11 = _v7.a;
											var maxSize = _v7.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v7.b.$ === 1) {
											var minSize = _v7.a.a;
											var _v10 = _v7.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(i) + ('fr' + 'fr)'))));
										} else {
											var minSize = _v7.a.a;
											var maxSize = _v7.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 3:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = $elm$core$Maybe$Just(m),
										$temp$maximum = maximum,
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
								default:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = minimum,
										$temp$maximum = $elm$core$Maybe$Just(m),
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
							}
						}
					});
				var toGridLength = function (x) {
					return A3(toGridLengthHelper, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing, x);
				};
				var xSpacing = toGridLength(template.hh.a);
				var ySpacing = toGridLength(template.hh.b);
				var rows = function (x) {
					return 'grid-template-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.gS)));
				var msRows = function (x) {
					return '-ms-grid-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.eg)));
				var msColumns = function (x) {
					return '-ms-grid-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.eg)));
				var gapY = 'grid-row-gap:' + (toGridLength(template.hh.b) + ';');
				var gapX = 'grid-column-gap:' + (toGridLength(template.hh.a) + ';');
				var columns = function (x) {
					return 'grid-template-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.eg)));
				var _class = '.grid-rows-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.gS)) + ('-cols-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.eg)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.hh.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.hh.b)))))));
				var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msColumns + (msRows + '}')));
				return _List_fromArray(
					[base, supports]);
			case 9:
				var position = rule.a;
				var msPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'-ms-grid-row: ' + ($elm$core$String$fromInt(position.cr) + ';'),
							'-ms-grid-row-span: ' + ($elm$core$String$fromInt(position.bG) + ';'),
							'-ms-grid-column: ' + ($elm$core$String$fromInt(position.bu) + ';'),
							'-ms-grid-column-span: ' + ($elm$core$String$fromInt(position.L) + ';')
						]));
				var modernPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'grid-row: ' + ($elm$core$String$fromInt(position.cr) + (' / ' + ($elm$core$String$fromInt(position.cr + position.bG) + ';'))),
							'grid-column: ' + ($elm$core$String$fromInt(position.bu) + (' / ' + ($elm$core$String$fromInt(position.bu + position.L) + ';')))
						]));
				var _class = '.grid-pos-' + ($elm$core$String$fromInt(position.cr) + ('-' + ($elm$core$String$fromInt(position.bu) + ('-' + ($elm$core$String$fromInt(position.L) + ('-' + $elm$core$String$fromInt(position.bG)))))));
				var modernGrid = _class + ('{' + (modernPosition + '}'));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msPosition + '}'));
				return _List_fromArray(
					[base, supports]);
			case 11:
				var _class = rule.a;
				var styles = rule.b;
				var renderPseudoRule = function (style) {
					return A3(
						$mdgriffith$elm_ui$Internal$Model$renderStyleRule,
						options,
						style,
						$elm$core$Maybe$Just(_class));
				};
				return A2($elm$core$List$concatMap, renderPseudoRule, styles);
			default:
				var transform = rule.a;
				var val = $mdgriffith$elm_ui$Internal$Model$transformValue(transform);
				var _class = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				var _v12 = _Utils_Tuple2(_class, val);
				if ((!_v12.a.$) && (!_v12.b.$)) {
					var cls = _v12.a.a;
					var v = _v12.b.a;
					return A4(
						$mdgriffith$elm_ui$Internal$Model$renderStyle,
						options,
						maybePseudo,
						'.' + cls,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Model$Property, 'transform', v)
							]));
				} else {
					return _List_Nil;
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$encodeStyles = F2(
	function (options, stylesheet) {
		return $elm$json$Json$Encode$object(
			A2(
				$elm$core$List$map,
				function (style) {
					var styled = A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing);
					return _Utils_Tuple2(
						$mdgriffith$elm_ui$Internal$Model$getStyleName(style),
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, styled));
				},
				stylesheet));
	});
var $mdgriffith$elm_ui$Internal$Model$bracket = F2(
	function (selector, rules) {
		var renderPair = function (_v0) {
			var name = _v0.a;
			var val = _v0.b;
			return name + (': ' + (val + ';'));
		};
		return selector + (' {' + (A2(
			$elm$core$String$join,
			'',
			A2($elm$core$List$map, renderPair, rules)) + '}'));
	});
var $mdgriffith$elm_ui$Internal$Model$fontRule = F3(
	function (name, modifier, _v0) {
		var parentAdj = _v0.a;
		var textAdjustment = _v0.b;
		return _List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + (', ' + ('.' + (name + (' .' + modifier))))))), parentAdj),
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.cH + (', .' + (name + (' .' + (modifier + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.cH)))))))))), textAdjustment)
			]);
	});
var $mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule = F3(
	function (fontToAdjust, _v0, otherFontName) {
		var full = _v0.a;
		var capital = _v0.b;
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_Utils_ap(
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.hc, capital),
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.fj, full)));
	});
var $mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule = F2(
	function (fontToAdjust, otherFontName) {
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.hc + (', ' + ('.' + (name + (' .' + $mdgriffith$elm_ui$Internal$Style$classes.hc))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('line-height', '1')
						])),
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.hc + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.cH + (', .' + (name + (' .' + ($mdgriffith$elm_ui$Internal$Style$classes.hc + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.cH)))))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('vertical-align', '0'),
							_Utils_Tuple2('line-height', '1')
						]))
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$adjust = F3(
	function (size, height, vertical) {
		return {bG: height / size, cA: size, cN: vertical};
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $mdgriffith$elm_ui$Internal$Model$convertAdjustment = function (adjustment) {
	var lines = _List_fromArray(
		[adjustment.dE, adjustment.dl, adjustment.eE, adjustment.fS]);
	var lineHeight = 1.5;
	var normalDescender = (lineHeight - 1) / 2;
	var oldMiddle = lineHeight / 2;
	var descender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.eE,
		$elm$core$List$minimum(lines));
	var newBaseline = A2(
		$elm$core$Maybe$withDefault,
		adjustment.dl,
		$elm$core$List$minimum(
			A2(
				$elm$core$List$filter,
				function (x) {
					return !_Utils_eq(x, descender);
				},
				lines)));
	var base = lineHeight;
	var ascender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.dE,
		$elm$core$List$maximum(lines));
	var capitalSize = 1 / (ascender - newBaseline);
	var capitalVertical = 1 - ascender;
	var fullSize = 1 / (ascender - descender);
	var fullVertical = 1 - ascender;
	var newCapitalMiddle = ((ascender - newBaseline) / 2) + newBaseline;
	var newFullMiddle = ((ascender - descender) / 2) + descender;
	return {
		dE: A3($mdgriffith$elm_ui$Internal$Model$adjust, capitalSize, ascender - newBaseline, capitalVertical),
		bD: A3($mdgriffith$elm_ui$Internal$Model$adjust, fullSize, ascender - descender, fullVertical)
	};
};
var $mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules = function (converted) {
	return _Utils_Tuple2(
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'block')
			]),
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'inline-block'),
				_Utils_Tuple2(
				'line-height',
				$elm$core$String$fromFloat(converted.bG)),
				_Utils_Tuple2(
				'vertical-align',
				$elm$core$String$fromFloat(converted.cN) + 'em'),
				_Utils_Tuple2(
				'font-size',
				$elm$core$String$fromFloat(converted.cA) + 'em')
			]));
};
var $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment = function (typefaces) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (face, found) {
				if (found.$ === 1) {
					if (face.$ === 5) {
						var _with = face.a;
						var _v2 = _with.cV;
						if (_v2.$ === 1) {
							return found;
						} else {
							var adjustment = _v2.a;
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.bD;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment))),
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.dE;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment)))));
						}
					} else {
						return found;
					}
				} else {
					return found;
				}
			}),
		$elm$core$Maybe$Nothing,
		typefaces);
};
var $mdgriffith$elm_ui$Internal$Model$renderTopLevelValues = function (rules) {
	var withImport = function (font) {
		if (font.$ === 4) {
			var url = font.b;
			return $elm$core$Maybe$Just('@import url(\'' + (url + '\');'));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	var fontImports = function (_v2) {
		var name = _v2.a;
		var typefaces = _v2.b;
		var imports = A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$filterMap, withImport, typefaces));
		return imports;
	};
	var allNames = A2($elm$core$List$map, $elm$core$Tuple$first, rules);
	var fontAdjustments = function (_v1) {
		var name = _v1.a;
		var typefaces = _v1.b;
		var _v0 = $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment(typefaces);
		if (_v0.$ === 1) {
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					$mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule(name),
					allNames));
		} else {
			var adjustment = _v0.a;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					A2($mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule, name, adjustment),
					allNames));
		}
	};
	return _Utils_ap(
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontImports, rules)),
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontAdjustments, rules)));
};
var $mdgriffith$elm_ui$Internal$Model$topLevelValue = function (rule) {
	if (rule.$ === 1) {
		var name = rule.a;
		var typefaces = rule.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(name, typefaces));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$toStyleSheetString = F2(
	function (options, stylesheet) {
		var combine = F2(
			function (style, rendered) {
				return {
					aR: _Utils_ap(
						rendered.aR,
						A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing)),
					aA: function () {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$topLevelValue(style);
						if (_v1.$ === 1) {
							return rendered.aA;
						} else {
							var topLevel = _v1.a;
							return A2($elm$core$List$cons, topLevel, rendered.aA);
						}
					}()
				};
			});
		var _v0 = A3(
			$elm$core$List$foldl,
			combine,
			{aR: _List_Nil, aA: _List_Nil},
			stylesheet);
		var topLevel = _v0.aA;
		var rules = _v0.aR;
		return _Utils_ap(
			$mdgriffith$elm_ui$Internal$Model$renderTopLevelValues(topLevel),
			$elm$core$String$concat(rules));
	});
var $mdgriffith$elm_ui$Internal$Model$toStyleSheet = F2(
	function (options, styleSheet) {
		var _v0 = options.f1;
		switch (_v0) {
			case 0:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			case 1:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			default:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'elm-ui-rules',
					_List_fromArray(
						[
							A2(
							$elm$virtual_dom$VirtualDom$property,
							'rules',
							A2($mdgriffith$elm_ui$Internal$Model$encodeStyles, options, styleSheet))
						]),
					_List_Nil);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$embedKeyed = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.fc)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			_Utils_Tuple2(
				'static-stylesheet',
				$mdgriffith$elm_ui$Internal$Model$staticRoot(opts)),
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
				children)) : A2(
			$elm$core$List$cons,
			_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
			children);
	});
var $mdgriffith$elm_ui$Internal$Model$embedWith = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.fc)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			$mdgriffith$elm_ui$Internal$Model$staticRoot(opts),
			A2($elm$core$List$cons, dynamicStyleSheet, children)) : A2($elm$core$List$cons, dynamicStyleSheet, children);
	});
var $mdgriffith$elm_ui$Internal$Flag$heightBetween = $mdgriffith$elm_ui$Internal$Flag$flag(45);
var $mdgriffith$elm_ui$Internal$Flag$heightFill = $mdgriffith$elm_ui$Internal$Flag$flag(37);
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$core$Basics$not = _Basics_not;
var $elm$html$Html$p = _VirtualDom_node('p');
var $mdgriffith$elm_ui$Internal$Flag$present = F2(
	function (myFlag, _v0) {
		var fieldOne = _v0.a;
		var fieldTwo = _v0.b;
		if (!myFlag.$) {
			var first = myFlag.a;
			return _Utils_eq(first & fieldOne, first);
		} else {
			var second = myFlag.a;
			return _Utils_eq(second & fieldTwo, second);
		}
	});
var $elm$html$Html$s = _VirtualDom_node('s');
var $elm$html$Html$u = _VirtualDom_node('u');
var $mdgriffith$elm_ui$Internal$Flag$widthBetween = $mdgriffith$elm_ui$Internal$Flag$flag(44);
var $mdgriffith$elm_ui$Internal$Flag$widthFill = $mdgriffith$elm_ui$Internal$Flag$flag(39);
var $mdgriffith$elm_ui$Internal$Model$finalizeNode = F6(
	function (has, node, attributes, children, embedMode, parentContext) {
		var createNode = F2(
			function (nodeName, attrs) {
				if (children.$ === 1) {
					var keyed = children.a;
					return A3(
						$elm$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							switch (embedMode.$) {
								case 0:
									return keyed;
								case 2:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, false, opts, styles, keyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, true, opts, styles, keyed);
							}
						}());
				} else {
					var unkeyed = children.a;
					return A2(
						function () {
							switch (nodeName) {
								case 'div':
									return $elm$html$Html$div;
								case 'p':
									return $elm$html$Html$p;
								default:
									return $elm$virtual_dom$VirtualDom$node(nodeName);
							}
						}(),
						attrs,
						function () {
							switch (embedMode.$) {
								case 0:
									return unkeyed;
								case 2:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, false, opts, styles, unkeyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, true, opts, styles, unkeyed);
							}
						}());
				}
			});
		var html = function () {
			switch (node.$) {
				case 0:
					return A2(createNode, 'div', attributes);
				case 1:
					var nodeName = node.a;
					return A2(createNode, nodeName, attributes);
				default:
					var nodeName = node.a;
					var internal = node.b;
					return A3(
						$elm$virtual_dom$VirtualDom$node,
						nodeName,
						attributes,
						_List_fromArray(
							[
								A2(
								createNode,
								internal,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Style$classes.c4 + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.g9))
									]))
							]));
			}
		}();
		switch (parentContext) {
			case 0:
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignRight, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.c4, $mdgriffith$elm_ui$Internal$Style$classes.g9, $mdgriffith$elm_ui$Internal$Style$classes.aI, $mdgriffith$elm_ui$Internal$Style$classes.R, $mdgriffith$elm_ui$Internal$Style$classes.c0])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerX, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.c4, $mdgriffith$elm_ui$Internal$Style$classes.g9, $mdgriffith$elm_ui$Internal$Style$classes.aI, $mdgriffith$elm_ui$Internal$Style$classes.R, $mdgriffith$elm_ui$Internal$Style$classes.c_])))
						]),
					_List_fromArray(
						[html])) : html));
			case 1:
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerY, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.c4, $mdgriffith$elm_ui$Internal$Style$classes.g9, $mdgriffith$elm_ui$Internal$Style$classes.aI, $mdgriffith$elm_ui$Internal$Style$classes.c$])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignBottom, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.c4, $mdgriffith$elm_ui$Internal$Style$classes.g9, $mdgriffith$elm_ui$Internal$Style$classes.aI, $mdgriffith$elm_ui$Internal$Style$classes.cZ])))
						]),
					_List_fromArray(
						[html])) : html));
			default:
				return html;
		}
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $mdgriffith$elm_ui$Internal$Model$textElementClasses = $mdgriffith$elm_ui$Internal$Style$classes.c4 + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.cH + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.bh + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.a2)))));
var $mdgriffith$elm_ui$Internal$Model$textElement = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$textElementFillClasses = $mdgriffith$elm_ui$Internal$Style$classes.c4 + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.cH + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.bi + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.a3)))));
var $mdgriffith$elm_ui$Internal$Model$textElementFill = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementFillClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$createElement = F3(
	function (context, children, rendered) {
		var gatherKeyed = F2(
			function (_v8, _v9) {
				var key = _v8.a;
				var child = _v8.b;
				var htmls = _v9.a;
				var existingStyles = _v9.b;
				switch (child.$) {
					case 0:
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.fq, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.hw : _Utils_ap(styled.hw, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.fq, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.hw : _Utils_ap(styled.hw, existingStyles));
					case 2:
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str)),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var gather = F2(
			function (child, _v6) {
				var htmls = _v6.a;
				var existingStyles = _v6.b;
				switch (child.$) {
					case 0:
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.fq, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.hw : _Utils_ap(styled.hw, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.fq, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.hw : _Utils_ap(styled.hw, existingStyles));
					case 2:
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		if (children.$ === 1) {
			var keyedChildren = children.a;
			var _v1 = A3(
				$elm$core$List$foldr,
				gatherKeyed,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				keyedChildren);
			var keyed = _v1.a;
			var styles = _v1.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.hw : _Utils_ap(rendered.hw, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.aa,
						rendered.ac,
						rendered.Y,
						$mdgriffith$elm_ui$Internal$Model$Keyed(
							A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.Z)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						fq: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.aa,
							rendered.ac,
							rendered.Y,
							$mdgriffith$elm_ui$Internal$Model$Keyed(
								A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.Z))),
						hw: allStyles
					});
			}
		} else {
			var unkeyedChildren = children.a;
			var _v3 = A3(
				$elm$core$List$foldr,
				gather,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				unkeyedChildren);
			var unkeyed = _v3.a;
			var styles = _v3.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.hw : _Utils_ap(rendered.hw, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.aa,
						rendered.ac,
						rendered.Y,
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.Z)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						fq: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.aa,
							rendered.ac,
							rendered.Y,
							$mdgriffith$elm_ui$Internal$Model$Unkeyed(
								A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.Z))),
						hw: allStyles
					});
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$Transform = function (a) {
	return {$: 10, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$add = F2(
	function (myFlag, _v0) {
		var one = _v0.a;
		var two = _v0.b;
		if (!myFlag.$) {
			var first = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, first | one, two);
		} else {
			var second = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, one, second | two);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehind = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenInFront = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$nearbyElement = F2(
	function (location, elem) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					function () {
						switch (location) {
							case 0:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.am, $mdgriffith$elm_ui$Internal$Style$classes.g9, $mdgriffith$elm_ui$Internal$Style$classes.cS]));
							case 1:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.am, $mdgriffith$elm_ui$Internal$Style$classes.g9, $mdgriffith$elm_ui$Internal$Style$classes.dn]));
							case 2:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.am, $mdgriffith$elm_ui$Internal$Style$classes.g9, $mdgriffith$elm_ui$Internal$Style$classes.gc]));
							case 3:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.am, $mdgriffith$elm_ui$Internal$Style$classes.g9, $mdgriffith$elm_ui$Internal$Style$classes.gb]));
							case 4:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.am, $mdgriffith$elm_ui$Internal$Style$classes.g9, $mdgriffith$elm_ui$Internal$Style$classes.fu]));
							default:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.am, $mdgriffith$elm_ui$Internal$Style$classes.g9, $mdgriffith$elm_ui$Internal$Style$classes.dm]));
						}
					}())
				]),
			_List_fromArray(
				[
					function () {
					switch (elem.$) {
						case 3:
							return $elm$virtual_dom$VirtualDom$text('');
						case 2:
							var str = elem.a;
							return $mdgriffith$elm_ui$Internal$Model$textElement(str);
						case 0:
							var html = elem.a;
							return html($mdgriffith$elm_ui$Internal$Model$asEl);
						default:
							var styled = elem.a;
							return A2(styled.fq, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, $mdgriffith$elm_ui$Internal$Model$asEl);
					}
				}()
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$addNearbyElement = F3(
	function (location, elem, existing) {
		var nearby = A2($mdgriffith$elm_ui$Internal$Model$nearbyElement, location, elem);
		switch (existing.$) {
			case 0:
				if (location === 5) {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						_List_fromArray(
							[nearby]));
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						_List_fromArray(
							[nearby]));
				}
			case 1:
				var existingBehind = existing.a;
				if (location === 5) {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						A2($elm$core$List$cons, nearby, existingBehind));
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						_List_fromArray(
							[nearby]));
				}
			case 2:
				var existingInFront = existing.a;
				if (location === 5) {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						_List_fromArray(
							[nearby]),
						existingInFront);
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						A2($elm$core$List$cons, nearby, existingInFront));
				}
			default:
				var existingBehind = existing.a;
				var existingInFront = existing.b;
				if (location === 5) {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						A2($elm$core$List$cons, nearby, existingBehind),
						existingInFront);
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						A2($elm$core$List$cons, nearby, existingInFront));
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Embedded = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$NodeName = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addNodeName = F2(
	function (newNode, old) {
		switch (old.$) {
			case 0:
				return $mdgriffith$elm_ui$Internal$Model$NodeName(newNode);
			case 1:
				var name = old.a;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, name, newNode);
			default:
				var x = old.a;
				var y = old.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, x, y);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$alignXName = function (align) {
	switch (align) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Style$classes.aW + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.bl);
		case 2:
			return $mdgriffith$elm_ui$Internal$Style$classes.aW + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.bm);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.aW + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.cX);
	}
};
var $mdgriffith$elm_ui$Internal$Model$alignYName = function (align) {
	switch (align) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Style$classes.aX + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.c1);
		case 2:
			return $mdgriffith$elm_ui$Internal$Style$classes.aX + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.cW);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.aX + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.cY);
	}
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Model$FullTransform = F4(
	function (a, b, c, d) {
		return {$: 2, a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$Moved = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$composeTransformation = F2(
	function (transform, component) {
		switch (transform.$) {
			case 0:
				switch (component.$) {
					case 0:
						var x = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, 0, 0));
					case 1:
						var y = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, y, 0));
					case 2:
						var z = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, 0, z));
					case 3:
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 4:
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var xyz = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							xyz,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			case 1:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				switch (component.$) {
					case 0:
						var newX = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(newX, y, z));
					case 1:
						var newY = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, newY, z));
					case 2:
						var newZ = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, y, newZ));
					case 3:
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 4:
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var scale = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							scale,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			default:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				var scaled = transform.b;
				var origin = transform.c;
				var angle = transform.d;
				switch (component.$) {
					case 0:
						var newX = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(newX, y, z),
							scaled,
							origin,
							angle);
					case 1:
						var newY = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, newY, z),
							scaled,
							origin,
							angle);
					case 2:
						var newZ = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, y, newZ),
							scaled,
							origin,
							angle);
					case 3:
						var newMove = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, newMove, scaled, origin, angle);
					case 4:
						var newOrigin = component.a;
						var newAngle = component.b;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, scaled, newOrigin, newAngle);
					default:
						var newScale = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, newScale, origin, angle);
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$height = $mdgriffith$elm_ui$Internal$Flag$flag(7);
var $mdgriffith$elm_ui$Internal$Flag$heightContent = $mdgriffith$elm_ui$Internal$Flag$flag(36);
var $mdgriffith$elm_ui$Internal$Flag$merge = F2(
	function (_v0, _v1) {
		var one = _v0.a;
		var two = _v0.b;
		var three = _v1.a;
		var four = _v1.b;
		return A2($mdgriffith$elm_ui$Internal$Flag$Field, one | three, two | four);
	});
var $mdgriffith$elm_ui$Internal$Flag$none = A2($mdgriffith$elm_ui$Internal$Flag$Field, 0, 0);
var $mdgriffith$elm_ui$Internal$Model$renderHeight = function (h) {
	switch (h.$) {
		case 0:
			var px = h.a;
			var val = $elm$core$String$fromInt(px);
			var name = 'height-px-' + val;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.bH + (' ' + name),
				_List_fromArray(
					[
						A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height', val + 'px')
					]));
		case 1:
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.a2,
				_List_Nil);
		case 2:
			var portion = h.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.a3,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.bI + (' height-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.c4 + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.Q + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'height-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 3:
			var minSize = h.a;
			var len = h.b;
			var cls = 'min-height-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-height',
				$elm$core$String$fromInt(minSize) + 'px !important');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = h.a;
			var len = h.b;
			var cls = 'max-height-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-height',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$widthContent = $mdgriffith$elm_ui$Internal$Flag$flag(38);
var $mdgriffith$elm_ui$Internal$Model$renderWidth = function (w) {
	switch (w.$) {
		case 0:
			var px = w.a;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.cP + (' width-px-' + $elm$core$String$fromInt(px)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						'width-px-' + $elm$core$String$fromInt(px),
						'width',
						$elm$core$String$fromInt(px) + 'px')
					]));
		case 1:
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.bh,
				_List_Nil);
		case 2:
			var portion = w.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.bi,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.cQ + (' width-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.c4 + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.cr + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'width-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 3:
			var minSize = w.a;
			var len = w.b;
			var cls = 'min-width-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-width',
				$elm$core$String$fromInt(minSize) + 'px');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = w.a;
			var len = w.b;
			var cls = 'max-width-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-width',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$borderWidth = $mdgriffith$elm_ui$Internal$Flag$flag(27);
var $mdgriffith$elm_ui$Internal$Model$skippable = F2(
	function (flag, style) {
		if (_Utils_eq(flag, $mdgriffith$elm_ui$Internal$Flag$borderWidth)) {
			if (style.$ === 3) {
				var val = style.c;
				switch (val) {
					case '0px':
						return true;
					case '1px':
						return true;
					case '2px':
						return true;
					case '3px':
						return true;
					case '4px':
						return true;
					case '5px':
						return true;
					case '6px':
						return true;
					default:
						return false;
				}
			} else {
				return false;
			}
		} else {
			switch (style.$) {
				case 2:
					var i = style.a;
					return (i >= 8) && (i <= 32);
				case 7:
					var name = style.a;
					var t = style.b;
					var r = style.c;
					var b = style.d;
					var l = style.e;
					return _Utils_eq(t, b) && (_Utils_eq(t, r) && (_Utils_eq(t, l) && ((t >= 0) && (t <= 24))));
				default:
					return false;
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$width = $mdgriffith$elm_ui$Internal$Flag$flag(6);
var $mdgriffith$elm_ui$Internal$Flag$xAlign = $mdgriffith$elm_ui$Internal$Flag$flag(30);
var $mdgriffith$elm_ui$Internal$Flag$yAlign = $mdgriffith$elm_ui$Internal$Flag$flag(29);
var $mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive = F8(
	function (classes, node, has, transform, styles, attrs, children, elementAttrs) {
		gatherAttrRecursive:
		while (true) {
			if (!elementAttrs.b) {
				var _v1 = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				if (_v1.$ === 1) {
					return {
						Y: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes),
							attrs),
						Z: children,
						aa: has,
						ac: node,
						hw: styles
					};
				} else {
					var _class = _v1.a;
					return {
						Y: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes + (' ' + _class)),
							attrs),
						Z: children,
						aa: has,
						ac: node,
						hw: A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$Transform(transform),
							styles)
					};
				}
			} else {
				var attribute = elementAttrs.a;
				var remaining = elementAttrs.b;
				switch (attribute.$) {
					case 0:
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 3:
						var flag = attribute.a;
						var exactClassName = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = exactClassName + (' ' + classes),
								$temp$node = node,
								$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					case 1:
						var actualAttribute = attribute.a;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = A2($elm$core$List$cons, actualAttribute, attrs),
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 4:
						var flag = attribute.a;
						var style = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							if (A2($mdgriffith$elm_ui$Internal$Model$skippable, flag, style)) {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							} else {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = A2($elm$core$List$cons, style, styles),
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							}
						}
					case 10:
						var flag = attribute.a;
						var component = attribute.b;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
							$temp$transform = A2($mdgriffith$elm_ui$Internal$Model$composeTransformation, transform, component),
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 7:
						var width = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$width, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (width.$) {
								case 0:
									var px = width.a;
									var $temp$classes = ($mdgriffith$elm_ui$Internal$Style$classes.cP + (' width-px-' + $elm$core$String$fromInt(px))) + (' ' + classes),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3(
											$mdgriffith$elm_ui$Internal$Model$Single,
											'width-px-' + $elm$core$String$fromInt(px),
											'width',
											$elm$core$String$fromInt(px) + 'px'),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 1:
									var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.bh),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$widthContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 2:
									var portion = width.a;
									if (portion === 1) {
										var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.bi),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.cQ + (' width-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.c4 + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.cr + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'width-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v4 = $mdgriffith$elm_ui$Internal$Model$renderWidth(width);
									var addToFlags = _v4.a;
									var newClass = _v4.b;
									var newStyles = _v4.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 8:
						var height = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$height, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (height.$) {
								case 0:
									var px = height.a;
									var val = $elm$core$String$fromInt(px) + 'px';
									var name = 'height-px-' + val;
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.bH + (' ' + (name + (' ' + classes))),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height ', val),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 1:
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.a2 + (' ' + classes),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$heightContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 2:
									var portion = height.a;
									if (portion === 1) {
										var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.a3 + (' ' + classes),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.bI + (' height-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.c4 + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.Q + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'height-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v6 = $mdgriffith$elm_ui$Internal$Model$renderHeight(height);
									var addToFlags = _v6.a;
									var newClass = _v6.b;
									var newStyles = _v6.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 2:
						var description = attribute.a;
						switch (description.$) {
							case 0:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'main', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 1:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'nav', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 2:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'footer', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 3:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'aside', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 4:
								var i = description.a;
								if (i <= 1) {
									var $temp$classes = classes,
										$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h1', node),
										$temp$has = has,
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								} else {
									if (i < 7) {
										var $temp$classes = classes,
											$temp$node = A2(
											$mdgriffith$elm_ui$Internal$Model$addNodeName,
											'h' + $elm$core$String$fromInt(i),
											node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes,
											$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h6', node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								}
							case 9:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 8:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'role', 'button'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 5:
								var label = description.a;
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-label', label),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 6:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'polite'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							default:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'assertive'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
						}
					case 9:
						var location = attribute.a;
						var elem = attribute.b;
						var newStyles = function () {
							switch (elem.$) {
								case 3:
									return styles;
								case 2:
									var str = elem.a;
									return styles;
								case 0:
									var html = elem.a;
									return styles;
								default:
									var styled = elem.a;
									return _Utils_ap(styles, styled.hw);
							}
						}();
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = newStyles,
							$temp$attrs = attrs,
							$temp$children = A3($mdgriffith$elm_ui$Internal$Model$addNearbyElement, location, elem, children),
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 6:
						var x = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignXName(x) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (x) {
									case 1:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerX, flags);
									case 2:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignRight, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					default:
						var y = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignYName(y) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (y) {
									case 1:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerY, flags);
									case 2:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignBottom, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
				}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Untransformed = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$untransformed = $mdgriffith$elm_ui$Internal$Model$Untransformed;
var $mdgriffith$elm_ui$Internal$Model$element = F4(
	function (context, node, attributes, children) {
		return A3(
			$mdgriffith$elm_ui$Internal$Model$createElement,
			context,
			children,
			A8(
				$mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive,
				$mdgriffith$elm_ui$Internal$Model$contextClasses(context),
				node,
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Model$untransformed,
				_List_Nil,
				_List_Nil,
				$mdgriffith$elm_ui$Internal$Model$NoNearbyChildren,
				$elm$core$List$reverse(attributes)));
	});
var $mdgriffith$elm_ui$Internal$Model$Height = function (a) {
	return {$: 8, a: a};
};
var $mdgriffith$elm_ui$Element$height = $mdgriffith$elm_ui$Internal$Model$Height;
var $mdgriffith$elm_ui$Internal$Model$Attr = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$htmlClass = function (cls) {
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		$elm$html$Html$Attributes$class(cls));
};
var $mdgriffith$elm_ui$Internal$Model$Content = {$: 1};
var $mdgriffith$elm_ui$Element$shrink = $mdgriffith$elm_ui$Internal$Model$Content;
var $mdgriffith$elm_ui$Internal$Model$Width = function (a) {
	return {$: 7, a: a};
};
var $mdgriffith$elm_ui$Element$width = $mdgriffith$elm_ui$Internal$Model$Width;
var $mdgriffith$elm_ui$Element$column = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asColumn,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.ek + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.as)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $mdgriffith$elm_ui$Internal$Model$FontFamily = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$fontFamily = $mdgriffith$elm_ui$Internal$Flag$flag(5);
var $elm$core$String$toLower = _String_toLower;
var $elm$core$String$words = _String_words;
var $mdgriffith$elm_ui$Internal$Model$renderFontClassName = F2(
	function (font, current) {
		return _Utils_ap(
			current,
			function () {
				switch (font.$) {
					case 0:
						return 'serif';
					case 1:
						return 'sans-serif';
					case 2:
						return 'monospace';
					case 3:
						var name = font.a;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					case 4:
						var name = font.a;
						var url = font.b;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					default:
						var name = font.a.f4;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
				}
			}());
	});
var $mdgriffith$elm_ui$Element$Font$family = function (families) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontFamily,
		A2(
			$mdgriffith$elm_ui$Internal$Model$FontFamily,
			A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'ff-', families),
			families));
};
var $mdgriffith$elm_ui$Internal$Model$Fill = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Element$fill = $mdgriffith$elm_ui$Internal$Model$Fill(1);
var $mdgriffith$elm_ui$Internal$Model$OnlyDynamic = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$AllowHover = 1;
var $mdgriffith$elm_ui$Internal$Model$Layout = 0;
var $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle = {
	dg: $elm$core$Maybe$Nothing,
	du: $elm$core$Maybe$Nothing,
	g2: $elm$core$Maybe$Just(
		{
			aj: 0,
			ak: A4($mdgriffith$elm_ui$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			ga: _Utils_Tuple2(0, 0),
			cA: 3
		})
};
var $mdgriffith$elm_ui$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 0:
					var hoverable = opt.a;
					var _v4 = record.fp;
					if (_v4.$ === 1) {
						return _Utils_update(
							record,
							{
								fp: $elm$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 1:
					var focusStyle = opt.a;
					var _v5 = record.fc;
					if (_v5.$ === 1) {
						return _Utils_update(
							record,
							{
								fc: $elm$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _v6 = record.f1;
					if (_v6.$ === 1) {
						return _Utils_update(
							record,
							{
								f1: $elm$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			fc: function () {
				var _v0 = record.fc;
				if (_v0.$ === 1) {
					return $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _v0.a;
					return focusable;
				}
			}(),
			fp: function () {
				var _v1 = record.fp;
				if (_v1.$ === 1) {
					return 1;
				} else {
					var hoverable = _v1.a;
					return hoverable;
				}
			}(),
			f1: function () {
				var _v2 = record.f1;
				if (_v2.$ === 1) {
					return 0;
				} else {
					var actualMode = _v2.a;
					return actualMode;
				}
			}()
		};
	};
	return andFinally(
		A3(
			$elm$core$List$foldr,
			combine,
			{fc: $elm$core$Maybe$Nothing, fp: $elm$core$Maybe$Nothing, f1: $elm$core$Maybe$Nothing},
			options));
};
var $mdgriffith$elm_ui$Internal$Model$toHtml = F2(
	function (mode, el) {
		switch (el.$) {
			case 0:
				var html = el.a;
				return html($mdgriffith$elm_ui$Internal$Model$asEl);
			case 1:
				var styles = el.a.hw;
				var html = el.a.fq;
				return A2(
					html,
					mode(styles),
					$mdgriffith$elm_ui$Internal$Model$asEl);
			case 2:
				var text = el.a;
				return $mdgriffith$elm_ui$Internal$Model$textElement(text);
			default:
				return $mdgriffith$elm_ui$Internal$Model$textElement('');
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderRoot = F3(
	function (optionList, attributes, child) {
		var options = $mdgriffith$elm_ui$Internal$Model$optionsToRecord(optionList);
		var embedStyle = function () {
			var _v0 = options.f1;
			if (_v0 === 1) {
				return $mdgriffith$elm_ui$Internal$Model$OnlyDynamic(options);
			} else {
				return $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic(options);
			}
		}();
		return A2(
			$mdgriffith$elm_ui$Internal$Model$toHtml,
			embedStyle,
			A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				attributes,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[child]))));
	});
var $mdgriffith$elm_ui$Internal$Model$FontSize = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$SansSerif = {$: 1};
var $mdgriffith$elm_ui$Internal$Model$Typeface = function (a) {
	return {$: 3, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$fontColor = $mdgriffith$elm_ui$Internal$Flag$flag(14);
var $mdgriffith$elm_ui$Internal$Flag$fontSize = $mdgriffith$elm_ui$Internal$Flag$flag(4);
var $mdgriffith$elm_ui$Internal$Model$rootStyle = function () {
	var families = _List_fromArray(
		[
			$mdgriffith$elm_ui$Internal$Model$Typeface('Open Sans'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Helvetica'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Verdana'),
			$mdgriffith$elm_ui$Internal$Model$SansSerif
		]);
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$bgColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0)),
				'background-color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1)),
				'color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontSize,
			$mdgriffith$elm_ui$Internal$Model$FontSize(20)),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontFamily,
			A2(
				$mdgriffith$elm_ui$Internal$Model$FontFamily,
				A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'font-', families),
				families))
		]);
}();
var $mdgriffith$elm_ui$Element$layoutWith = F3(
	function (_v0, attrs, child) {
		var options = _v0.b0;
		return A3(
			$mdgriffith$elm_ui$Internal$Model$renderRoot,
			options,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass(
					A2(
						$elm$core$String$join,
						' ',
						_List_fromArray(
							[$mdgriffith$elm_ui$Internal$Style$classes.gQ, $mdgriffith$elm_ui$Internal$Style$classes.c4, $mdgriffith$elm_ui$Internal$Style$classes.g9]))),
				_Utils_ap($mdgriffith$elm_ui$Internal$Model$rootStyle, attrs)),
			child);
	});
var $mdgriffith$elm_ui$Element$layout = $mdgriffith$elm_ui$Element$layoutWith(
	{b0: _List_Nil});
var $mdgriffith$elm_ui$Internal$Flag$borderColor = $mdgriffith$elm_ui$Internal$Flag$flag(28);
var $mdgriffith$elm_ui$Element$Border$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'border-color',
			clr));
};
var $mdgriffith$elm_ui$Internal$Model$Px = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Element$px = $mdgriffith$elm_ui$Internal$Model$Px;
var $mdgriffith$elm_ui$Internal$Model$AsRow = 0;
var $mdgriffith$elm_ui$Internal$Model$asRow = 0;
var $mdgriffith$elm_ui$Element$row = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asRow,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.as + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.R)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $mdgriffith$elm_ui$Element$el = F2(
	function (attrs, child) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					attrs)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[child])));
	});
var $author$project$Globaltypes$tabtypeToString = function (tabType) {
	switch (tabType) {
		case 0:
			return 'History';
		case 1:
			return 'Notes';
		case 3:
			return 'Logbook';
		default:
			return 'Alerts';
	}
};
var $mdgriffith$elm_ui$Internal$Model$Text = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Element$text = function (content) {
	return $mdgriffith$elm_ui$Internal$Model$Text(content);
};
var $author$project$Layout$Maincontent$Bottompanel$Tab$Alerts$Base$alertsTab = function (model) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Element$el,
			_List_Nil,
			$mdgriffith$elm_ui$Element$text(
				'' + ($author$project$Globaltypes$tabtypeToString(model.hn) + 'Tab')))
		]);
};
var $elm$parser$Parser$ExpectingFloat = {$: 5};
var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
var $elm$parser$Parser$Advanced$consumeBase = _Parser_consumeBase;
var $elm$parser$Parser$Advanced$consumeBase16 = _Parser_consumeBase16;
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$bumpOffset = F2(
	function (newOffset, s) {
		return {bu: s.bu + (newOffset - s.ga), d: s.d, f: s.f, ga: newOffset, cr: s.cr, hj: s.hj};
	});
var $elm$parser$Parser$Advanced$chompBase10 = _Parser_chompBase10;
var $elm$parser$Parser$Advanced$isAsciiCode = _Parser_isAsciiCode;
var $elm$parser$Parser$Advanced$consumeExp = F2(
	function (offset, src) {
		if (A3($elm$parser$Parser$Advanced$isAsciiCode, 101, offset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 69, offset, src)) {
			var eOffset = offset + 1;
			var expOffset = (A3($elm$parser$Parser$Advanced$isAsciiCode, 43, eOffset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 45, eOffset, src)) ? (eOffset + 1) : eOffset;
			var newOffset = A2($elm$parser$Parser$Advanced$chompBase10, expOffset, src);
			return _Utils_eq(expOffset, newOffset) ? (-newOffset) : newOffset;
		} else {
			return offset;
		}
	});
var $elm$parser$Parser$Advanced$consumeDotAndExp = F2(
	function (offset, src) {
		return A3($elm$parser$Parser$Advanced$isAsciiCode, 46, offset, src) ? A2(
			$elm$parser$Parser$Advanced$consumeExp,
			A2($elm$parser$Parser$Advanced$chompBase10, offset + 1, src),
			src) : A2($elm$parser$Parser$Advanced$consumeExp, offset, src);
	});
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {bu: col, el: contextStack, b8: problem, cr: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 0};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.cr, s.bu, x, s.d));
	});
var $elm$parser$Parser$Advanced$finalizeInt = F5(
	function (invalid, handler, startOffset, _v0, s) {
		var endOffset = _v0.a;
		var n = _v0.b;
		if (handler.$ === 1) {
			var x = handler.a;
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		} else {
			var toValue = handler.a;
			return _Utils_eq(startOffset, endOffset) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				_Utils_cmp(s.ga, startOffset) < 0,
				A2($elm$parser$Parser$Advanced$fromState, s, invalid)) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				toValue(n),
				A2($elm$parser$Parser$Advanced$bumpOffset, endOffset, s));
		}
	});
var $elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, row, col, x, context));
	});
var $elm$core$String$toFloat = _String_toFloat;
var $elm$parser$Parser$Advanced$finalizeFloat = F6(
	function (invalid, expecting, intSettings, floatSettings, intPair, s) {
		var intOffset = intPair.a;
		var floatOffset = A2($elm$parser$Parser$Advanced$consumeDotAndExp, intOffset, s.hj);
		if (floatOffset < 0) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A4($elm$parser$Parser$Advanced$fromInfo, s.cr, s.bu - (floatOffset + s.ga), invalid, s.d));
		} else {
			if (_Utils_eq(s.ga, floatOffset)) {
				return A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting));
			} else {
				if (_Utils_eq(intOffset, floatOffset)) {
					return A5($elm$parser$Parser$Advanced$finalizeInt, invalid, intSettings, s.ga, intPair, s);
				} else {
					if (floatSettings.$ === 1) {
						var x = floatSettings.a;
						return A2(
							$elm$parser$Parser$Advanced$Bad,
							true,
							A2($elm$parser$Parser$Advanced$fromState, s, invalid));
					} else {
						var toValue = floatSettings.a;
						var _v1 = $elm$core$String$toFloat(
							A3($elm$core$String$slice, s.ga, floatOffset, s.hj));
						if (_v1.$ === 1) {
							return A2(
								$elm$parser$Parser$Advanced$Bad,
								true,
								A2($elm$parser$Parser$Advanced$fromState, s, invalid));
						} else {
							var n = _v1.a;
							return A3(
								$elm$parser$Parser$Advanced$Good,
								true,
								toValue(n),
								A2($elm$parser$Parser$Advanced$bumpOffset, floatOffset, s));
						}
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$number = function (c) {
	return function (s) {
		if (A3($elm$parser$Parser$Advanced$isAsciiCode, 48, s.ga, s.hj)) {
			var zeroOffset = s.ga + 1;
			var baseOffset = zeroOffset + 1;
			return A3($elm$parser$Parser$Advanced$isAsciiCode, 120, zeroOffset, s.hj) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.fD,
				c.bJ,
				baseOffset,
				A2($elm$parser$Parser$Advanced$consumeBase16, baseOffset, s.hj),
				s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 111, zeroOffset, s.hj) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.fD,
				c.b_,
				baseOffset,
				A3($elm$parser$Parser$Advanced$consumeBase, 8, baseOffset, s.hj),
				s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 98, zeroOffset, s.hj) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.fD,
				c.bp,
				baseOffset,
				A3($elm$parser$Parser$Advanced$consumeBase, 2, baseOffset, s.hj),
				s) : A6(
				$elm$parser$Parser$Advanced$finalizeFloat,
				c.fD,
				c.bz,
				c.bP,
				c.bA,
				_Utils_Tuple2(zeroOffset, 0),
				s)));
		} else {
			return A6(
				$elm$parser$Parser$Advanced$finalizeFloat,
				c.fD,
				c.bz,
				c.bP,
				c.bA,
				A3($elm$parser$Parser$Advanced$consumeBase, 10, s.ga, s.hj),
				s);
		}
	};
};
var $elm$parser$Parser$Advanced$float = F2(
	function (expecting, invalid) {
		return $elm$parser$Parser$Advanced$number(
			{
				bp: $elm$core$Result$Err(invalid),
				bz: expecting,
				bA: $elm$core$Result$Ok($elm$core$Basics$identity),
				bJ: $elm$core$Result$Err(invalid),
				bP: $elm$core$Result$Ok($elm$core$Basics$toFloat),
				fD: invalid,
				b_: $elm$core$Result$Err(invalid)
			});
	});
var $elm$parser$Parser$float = A2($elm$parser$Parser$Advanced$float, $elm$parser$Parser$ExpectingFloat, $elm$parser$Parser$ExpectingFloat);
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {bu: col, b8: problem, cr: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.cr, p.bu, p.b8);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0;
		var _v1 = parse(
			{bu: 1, d: _List_Nil, f: 1, ga: 0, cr: 1, hj: src});
		if (!_v1.$) {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (!_v0.$) {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $elm$core$Result$toMaybe = function (result) {
	if (!result.$) {
		var v = result.a;
		return $elm$core$Maybe$Just(v);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Basics$truncate = _Basics_truncate;
var $author$project$Layout$Maincontent$Bottompanel$Tab$History$Base$isHigherThanFloor = function (divResFloat) {
	var maybeFloatFloor = $elm$core$Result$toMaybe(
		A2(
			$elm$parser$Parser$run,
			$elm$parser$Parser$float,
			$elm$core$String$concat(
				_List_fromArray(
					[
						$elm$core$String$fromInt(divResFloat | 0),
						'.0'
					]))));
	if (!maybeFloatFloor.$) {
		var floatFloor = maybeFloatFloor.a;
		return _Utils_cmp(divResFloat, floatFloor) > 0;
	} else {
		return false;
	}
};
var $author$project$Layout$Maincontent$Bottompanel$Tab$History$Base$calculatePages = function (responseEvents) {
	var itemsPerPage = 20;
	var divResFloat = responseEvents.eZ / itemsPerPage;
	var divResInt = divResFloat | 0;
	return $author$project$Layout$Maincontent$Bottompanel$Tab$History$Base$isHigherThanFloor(divResFloat) ? (divResInt + 1) : divResInt;
};
var $mdgriffith$elm_ui$Internal$Flag$fontAlignment = $mdgriffith$elm_ui$Internal$Flag$flag(12);
var $mdgriffith$elm_ui$Element$Font$center = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$fontAlignment, $mdgriffith$elm_ui$Internal$Style$classes.hI);
var $mdgriffith$elm_ui$Internal$Model$AlignX = function (a) {
	return {$: 6, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$CenterX = 1;
var $mdgriffith$elm_ui$Element$centerX = $mdgriffith$elm_ui$Internal$Model$AlignX(1);
var $mdgriffith$elm_ui$Internal$Model$AlignY = function (a) {
	return {$: 5, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$CenterY = 1;
var $mdgriffith$elm_ui$Element$centerY = $mdgriffith$elm_ui$Internal$Model$AlignY(1);
var $mdgriffith$elm_ui$Element$Font$color = function (fontColor) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(fontColor),
			'color',
			fontColor));
};
var $author$project$Monoicons$Png$monoIcons = {cU: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADpSURBVFiF7ZY7agNBDIYleWGLSP95fIEEX8AXSWVwaeN0PoIPknSpcoycQWsXC0HjxoGAZ4oMxg+Yr9IIPX5GzIOo0XhgJgDWAFZENLl6dwAzM0tmlgDMautIbWJEWM6+moBL0QQ0ATcX0JX8AF4i4qmUyMzTv7aqFpuIyMHd34no56xOLsHM3ohoUaxYx2YYhuWZuEJwunBzYubI+gvxHYDniCju62kEr6flNqX0VYoVkb27f1BmBNWo6vz3LVDVeW2dm5+CJqAJeFwBIrLP2f+l+jM5juN33/cdM3+6+46Isjddo3H3HAGo7jeuX1YsiwAAAABJRU5ErkJggg==', c5: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAF8SURBVFiF7Za9SsRAFIXPyVrtZAYVy21EtBIULXQbaytt3IcQQfBJBB9De/cBLKz8w1K0slSWMJvFxhybjUQNu1FGFN3T5Cb35n6HuTMkwEj/XSzexHG8RvIAwDyAWmDWM8lrSbve+5MPBpxzk5JuAYwHBr9XJ4qimSRJOgAwVkisFOCnJO9DUiU1ADQBTEhaBdB+YyDLsphkXrzvvT8KaSCO4xbJZs7Kn0chIV/R6wqQfCrEe865VkhQfwQfWXlgrZ0CcAfAhgSXyAOY9t4/AoUReO8fJG0C0DfCJWkjh5fKWitrrZxzh6GozrnDvO/73O/ZhFVkjFkkOTuoplar3SZJch7cgDFmIYqiMwxZtSzLVK/Xl3u93kWVvt8yApKVN3LlFUjT9MoYs0RyblCdpJs0TS+DG8hNALj6zDvD9OOnYGRgZODHDZQdwxSAkdQM9UGS1OyH3SoG2gC2ADQkBf0pIXlcxcB2/7oOIC7Jf0VdkseSdgL1G+kP6QVWr4BI+nDgEAAAAABJRU5ErkJggg==', c7: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFDSURBVFiF7Za/SsNQFIe//KFC6Tmr2M3BCt30AZy7KDqoL+OmPow4KB0Ul4iDD+FDOCRnstjUwRRjSUIStSrcHwRucu8933dzCARcXP5xAlU9U9VTIFg6XVVHIjITkZmqjtrW8dtuTNNUisZLE/iuOAEn4AR+XSAsm+h2u2tBEDwCr8CumT01KSwim8A4279jZs9F60rfQBiGW8A6sAFEWcEm8AgYAEPf97fL1pYKJElyx/sJAPp1JXLwfvZoHMdx1FgAmJrZIXCdk3jo9XrDCvhgAX5rZkfAtI0AwMTMjnMSq57nRUUSGfx+AX4AvFQB6nwFhRJAXqIVHMCrITBPR0Qugb3sPuXjAPnxOGvdpE7RJgJziQtgv2S+9sm/ko6IXM3/hnLXDbDyk+Aqidbwpi34JKGqJ8AsSZJzavbcxeXP5Q2js2bb0+FS3AAAAABJRU5ErkJggg==', c8: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADgSURBVFiF7ZQxDoIwGEb/QmDiK4O38B46OulpNHEw8TA6KI56D4030LWVhRh+FwYSgUBpQqJ9Gw30vbS0RA7Hv+ObfielnAZBoLMsS60WtSAEkABgANe+k3kG8j0RzfqKTQJCALuS/MnMc1shbeTHYtkZwCOKorGT/4RcNMjLf3vOzGsiuptIPM9LlVJnInq3CpBSbph5ZSJrYKu1Xn7FWZbUIoTIK8dr3re9BS+l1IUqtqCJEMBhqBPgIlxEU0RSirj1nbDrPZBprRdEdCqeOx0rm/hxHE8AjIYKcDh+hw8GSGNMy81g/QAAAABJRU5ErkJggg==', c9: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEHSURBVFiF7ZQ9TsNAEEbfOtBYGpcIejgLXCMIpQkdB6DiDIi/HISWE9AGDpAqkrXbYbM0ayUN7Di7iIJ9jV18nveNLS8UCoXCLyAiUxFpReT+L+QXItKLiBeRdSxfxQJ1XR81TXMG7GvkwF2Y+wlcKTpHh76FbW5i8q3N+1Amyp4icwxgjDn5QX7OZnPvvb90zj1qCkQ/QYwgf9iSz51zt9rnkwqkypMK5JDvXCCXfKcCOeWjC+SWAxiF1IfbFXDA5pCZWWufUuSgOwcGDsN1+M+T5TDuDQysjDEv3+W99+/W2mvgI1eBDphohg1UVXXatu2zKqvILIB+hH/Zdd3riHyhUPjnfAFU1XWHDxn/1wAAAABJRU5ErkJggg==', da: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAD+SURBVFiF7dRBboJAGMXx91l2zAtLPYB7L+C656ipTaPXUeOiTY9SF96i9gC6sgRYOrgZE4NRP5Bims5/M5sH/AIJgM/n++/JtQHJdwBPAB6U9/y21vazLNtoxi3FpszDAaAbBEFPOw4Um+LD1yKyPDfO83wVx/FnnYBibWvtIk3TeYVrT9J8gkNrABaAiMiU5HOjAPfaXxyiBeDNGDNqDAAASZJ8HCFERGa3IkoBfgNRGnABMW4McAYxrYKoDKgLcROgDoQGsHLn1xXE6xFiQnKoRVwsDMNOFEWPUPw1SQ5J7kjm7hzUgihTAbFtHOAQA5I/xpjJXQA+n+9PtQeKRVe+PDAa+wAAAABJRU5ErkJggg==', db: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADkSURBVFiF7ZY9CsJAEIXfqGhh3qQQvIF6kmiXzrtYCWLhYWzUwrNoby6QdCIbm4BBjJgfXMT9moWB3ffB7MAADoejJp7nDVV1BqBtRYDkiWRKcg+gW/Z+qwGHNDtDktuyErUFRCQEEOUkdgB6dd8thaqOSF6yVqQkj7YkIqsSJMc/JyEF9Y6qTo0x/YoeExFZ4fHJD0mSzAFcPxIguQGwqBj+EhFZx3G8fK4XjWFaUK/DyzfftSAwxngVwz5uQeNYnQQX/n/hmcA5F156J2hiH7hl5/dGLQ/Jge/7AWytZA7Hz3MHNLpUxSORoiEAAAAASUVORK5CYII=', dc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEhSURBVFiF7ZQxTsNAEEXfGkdu/F2nR5wFCjgEIhRwDBouAE1IuAa3QNTQI0EVaVPFcpaCDQpCiXdjIwr2VVvMzL6ZkQYSiUSiBUkTSTNJp38lMJPkJDWSRn3X32sLKIriDTgBMuC4KIrXxWLx2JI2qKrqMM/zeV3X886WkkZ+AkGTkHTtY5/bamchAtbaCXAOLH3OuCzLy03xxph9/zzoRcBL3K9JGGPMTVmWF6H5nQU2SNx2lYgS+A2JaIG+JXYS6FMi31VgJSEJ4A7IvERUDdNFYIWkM2DM50SXwDsw9JJb/9h5BetYa6d8vxPD0NyYFQwkXa0dmR845746DyV4BVVVHTnnHmKKA421dmuTwStomuYJeIn5HJhGxCcSiX/KB+8KYLX96PPPAAAAAElFTkSuQmCC', dd: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEISURBVFiF7ZMxTsMwFIY/Y5AiJc8jsDBWsPUEzJyjUIQE3IFjIEpV7lJugTgAM/ZaHkskqkpN7NSw4H9JFP3P35cXBUpKSv57TGyxaZpDY8wSOI0cWQEv3vvrrtJerIC1dpwAB7DApK8UvQHAOucegLNtBVU9B47Xn3nvOxkpAp0RkUvgmY2t9glEf4Ie+NUa/Av4iJ3dWaB981l7lqrqvTHm9U8ENtauqnoXQnhMOWOwQA74YIFc8EECOeHJArnhSQK/AQfYj4RPgSd+/vObEMJ8W19V39vbt10FEZGJiKxERNvrNGLswDl3Udf1UQ6Bz0R4UmxfoaqqE2AE3HrvF7kFSkpKSr4Bel9pTvj6ZLUAAAAASUVORK5CYII=', de: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAE4SURBVFiF7ZaxTsMwEIa/pFUz2X0OJN4BEVi6FPFALPQ9eIAy0Al2dpigUFhYqFSJKc6SJceSiDRKUhsEKJJ/KdJFd/L/5S6yDV5ePdZIaz3TWs+A0Z+bK6UWSikpnmsg+i/zH0EE3zCfAyct+RtjzCmQ2S4YOppfVszzSq6MJwWg9T9hC1B++bR434jIeSV/BqyLeKqUWmA5DhuAets3IhIDy7JARF6BwwrERCl1ZQOxC6DRPE3TZb3QGPNSQLy7QHQBDGozXwMHTeY1iCO2OzEHBs4AWutjvma+BmJjzKoDuIRYAXEFYjoej2NnABG5Ax6BJ1vzBohn4CHP8/u22mHHIh/Avq1pC8TerjqXfeBX5AE8gAfoL0AYhmlT7KrWQ2KXsix7i6JoGATBbZIkF2xfULy8+qNP8xl2age7GHAAAAAASUVORK5CYII=', df: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALGSURBVFiF7ZY9aBRREMf/czn0uMx/3IQjhTapRAgoFmIpCIZEUAgkFqKNikGw8RNEK42FEMFOg5ZqI1YiFoZUWhg/UQu1EistNLh3GD9u91n4Vl+WHFzuEqsMLMybN29+/7fv7bDAsi1bG2Zme0m+MrM9YVxVt5C8Q3KG5HeSL8zsMIDiosFJHiCZkHQkXwTwMyRTH88/9wCsDOsUWoUDmPDrUxEZBwAzGxORcwAEAJxzz51z9wHM+qUDqjreCnMOPNh54sXAzMaCnc6q6q5gzTqSn/zcr3K5vHpJ4WY2kF+rqoeynPDONH0E+dcOYLRarV4zszHn3Gmf9l1EhuI4niRZyZV4E/h/55oSsBB4mqbPSD4B8JHkUFZDRAYz3zn3vmkBC4WLyBSADQA6RGQjAKjqCICjPvdzqVSabGbjCzpzVe0h+TqIT3d1da1S1RGSv3wszfeMJYNHURTl4I7ksWbh+wJ4qqqHPPxsUOwHyR0e/iqLq+pTM+tW1WGSP4P8U03BzWz3/9y5hIPOzs71hULhEYASggtH8iSACz4tf+H6fPxxR0dHf71e3yYiN/Gv7x+vVqsXmxJA8i6A7QAgIkfiOL4URVFvkiRvAaxYbDgQfIaq2gMg62AP4zi+BAD1en2zh0NETi4mfI4AEdmcjZ1z14OcT5njnBsVkUfzwPtbgc8RgLA9FgofMr9Wqz0AMO2HfQB654HfaAWeF/Alc5xza4J4PU3TnSJyyzn3DUAsIpdLpdLWduFzrFwurw5+JKYapBXhL66q7sp9asdbAodmZpNBwf2N8pYE7gVsCrpXYmbnKpUKs/lKpUKS54NG1TZc8gGSBwFcCeZmAbz0/gb8aVIA4ACcaPnMGwkAAFUdFpEJAN0N1n12zo3WarXb7cAbCgCAKIqiJEkOABgEsNaH3wG4VywWr87MzHxtF75sywYAvwF7imvm5fMiOwAAAABJRU5ErkJggg==', dh: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKZSURBVFiF7ZY/aBRBFMa/tzEHevNmzogJWMVKFASLNFaBkEMkYBByCipYCGqjdbAQFYLW2kRBxMYi8W+IEAiIqWwCCoIhlZ0YG9mZO5SLN89m1qxH7s9eAmnug2Pm7b5332+HN7MLdNXVDouyJGutL4jIKBHt2YLnqrX2FoBaJgBmngZwZQvG/0REJ621CwAQtWk+uV3mAOC952S+q1WyUmoCwFQIfwMYcc59yGqqlCoR0Uz99aYrYIwZAvA05AkRXerEvJkaAhQKhUHv/Xyq4W5Ya5+Fea/Wekwp1d+gvEdrfaLJ/eYAfX19ularzQEYCJeeOOfuJfeZeUpE5onoIzMfqivPMfNLEVkgovedAPRWq9XnAI6GeMk5d7UuZz2MBwC8S0HkmHkWwKlWxg0BtNb3iagYwpUoik4DqKZznHO3AbxOQSzl8/ljzDyTMl8TkYlMAMx8WUSSp/0RRdFYHMc/N6mrOufOApgL8UAURcsAxkP8DcBwuVz+kgkAwLUw/iKi8TiOvzaprTrnSthYiZ4wrolI0Tm32sp8M4BOlOk4bwXwIIy7ReSNMeZgk9qk4ZJlr4VxgIgWN9kdrQGcc4+IaDqE/d77t8aYvQ3M/2s47/0Q6hpTKXUkEwAAWGuvi8hiCA97718ByKVztNY3UddwlUrlU31jEtGLzAAA1nO53ASAzyEeDm/CtP6kzEdSDZc05lxdXnYVCoVBZv7OzBJ+k2nwfD4/qpTa36C8xxhTZOZ9yQWlVCn5L6VUqS0IY8yQUqoSCr3W+lynD9QIoOk2jON4GcBFAB4AichjZj7eKcRmamsPh+W/u12mInKmXC7PAm0eROFN+HC7AKIocsk860fpeREpbvGjdMVaewcbB1dXXe2s/gIxCOSvKjTsLQAAAABJRU5ErkJggg==', di: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOwSURBVFiF5ZfPj1RFEMe/9VrfezvT1S+7AVeH1ShyIGqihkgCF6MHD7oJyeoaMVkuIPwTwkVPesUYjF7kICeTvYAXEhONeGEhwXgSMGEZDAo408u4r9d+7WF62N75vQ88Uclk+nVXVX+mpqu6HvCwC5UxYuYtRVHUhBAzAJy1djmKorrW+tb/BqCU2gFgwTm3D8CLfZ0RXQSwSEQnG43G5QcCUK1Wp4UQx5xzHwB4dEzeNefcCQAfrays3CwNwMx7AXwLYDqY/pOIzjrnzgP4m4juOueeds49T0RvApgMdP8AMKe1Pjcm+LpIKd9l5lVmdv7zm1JqP4BkiFkspXyPmS8HdqtSyvlNbc7Me7s2/6FWq1U24SJWSh0PIZh5Tz9F0T1RrVanieh7AFkwPWOM+d0Yc2FMAJvn+ekkSVYAvAHgEQBvxXH8tTGmNRRgYmLiEwCv+ccfAcwAiADMJklyfRMQMMacS9N0K4DdACSA1BhzZqCBUmoHM5vOf16r1SrMfJCZrZ+zzHxwXAAvSXAm8izLtoeLUZfyAnyqEdHRer3e0lp/BeAwgMLrf7FJiJyIPvTj2Fq7MFCTmS960pvoOu33GYmEme8ws5NSLoUL9yLAzFvgKxwRnQWQh4o+EkdQLhK5c+6M9/2SUmqqB6Aoim2dsS8yPaK1/rIsBBH90hlaa2d6AIQQTwT6fw1yVBaCiK4Fe9V6ALqU/x3mrAyEc67vPXIPwFp7I1B+cpizkhCPBXvVewCiKFoOAF4YBVACYlfHvRBiua+GUuqCT7PbAOJxIACAmQ+NSNGUmW/5NNxwwLvPwKL/nlRKvT0uwKhIKKXmAXRSbzG03dAPZFn2bFEUv6L9669orZ9DVz0YJsx8CMAJD1EAOFypVE61Wq1LAJ4BYKIo2tloNK52bDZcRnme34njeJqIdgOYTNN0Ks/z0+MCGGOWkiSpA5j1ELNra2uvwhc459xxrfWp0KbnNozj+DwRLaB9e72SJMldY8xP9wHxlF+6QUT7u6/jnjrge7g5rIf+U6XUZxjeCW2QSqXyDYCwDVslojmt9cAC1yNSyvmuruiKUur9ESCpUuoAM18N7P6RUr4zyGBUU7oH7ab08WC6QUTfFUVxKYqia865FO0TvgvA61g/7UA77HPNZvPnUgAAIKXcCuAoER3B+LXBOOc+J6KPR4V97BeTLMu2+2ZiHxG93E/HObcEYFEIcTJMtQcCEIpSaspau82/msFauyyEuN5sNm+X8fdwy3/eAX4pBNcHsAAAAABJRU5ErkJggg==', dj: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAF0SURBVFiF7ZY9TsNAEIXfc+jiGVdQpYcr5ACgdBQERAdtxBFokPgRN6DhBDlAAkpFgbgIJQVaOx3yUMRGwfmRcRYiIF8zo93ZeU/rlTzAiv8OiwthGK6TvAHQAlD3pDME0AfQieP4ZXxjbcLRSHzPk3BOHUCbpAE4+KRXrBSRJDvwTPLJh7qZNQE0ACRxHMvcYhExETFV7foQBwBV7eZ9i3uBL5GqLGKgpqoXqnoOoFa1ycQjLIuqbpvZaZY/OufuqvSpfANpmsq0/McMzEJEbkXkVUR2l2IAwDGAiOShTwO1KIp2wjDcKFNbiIsbUNWzNE3vST6Uqf8KZW9gM4tbyzLwbawM/A4DZjbM0uTjYBBMzTEaPmBm42szKfUvIHlpZm9m1s/XnHMDEbkiac65wZjZI5KtIAiuy/Se4N/NA9M+wRBA3cyavm4hG8mAsTc0z0AfQBtAw8z2fRjIIdkrY6CTxRaA0JN2QrJnZiee+q34Q7wD8qBuoSiY3rgAAAAASUVORK5CYII=', dk: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADkSURBVFiF7ZMxCsJAEEX/bCQJkpl0XkFPIna2lh5FULDwCuI9LPUOInbeQAmm2BS7NkmhBCKiWZR9zXxmd3Zes4DH88MEIrIQkTmAoPXtIjJiZsvMVkRG776j3h00xnBdbk3gU/ytQJCm6TBJkp4TARGZGWO2RLRzIgCgX9aBK4GX8QKNAsy8ZuYrM4+dCACYAkiJaOJKIHiqrQt8FS/gBX5CIAcAa+3tYVCpW10u7+ZlfOjX0fi3wzA8EVGmlFpqrS9VX2t9jqKoQ0T7LMs2AEx1FsfxAUDXWrsqiuLYtMPjccodE2A3b5TQfbIAAAAASUVORK5CYII=', dq: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADhSURBVFiF7ZYxTsNAFETf/6HcXSXUdFDSAw1XSJVrIHEVLsMBKCgpaKFLnch2WmtobMsxDRIODX+qXc3fnbfaZiD032XjTUrp3syegGtgMXNWa2bvkh6apnn5BlBKOZf0CSxnDp5q7+6XVVXtAc5Gxs0o/NXMtuNTki6Auxn8laRb4PkIK6W0yTkr56yU0maKfSrfp4N/rQAIgAAIgAAIgAAIgKGSuftBEgBm9lhKOWo1XaWaxXf3wzDbL7pS+gGsfvOiH2jn7ld9KR2+oK7rHbCW9Aa0Jwhuu7vXfXgoBPAFTXRfN0YVJMkAAAAASUVORK5CYII=', dr: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHBSURBVFiF7ZY9ixRBEIaf6pVD2O4NFjYR/QEGfiCaiRgKwh0GiiAGYiqisWaCYCLoxf6BMxb8AXegcpEYGCmHiJnszLSMckOXSS8sh8vUwu6cwb4wTHXP29UP0zXFwEorHbKkzRBCuCYiN4DewWeq+kdEvgBvyrL8sCyACvCGXG9F5FZZlj/nAXAGj2VzgCuquj0ajax+MwAAIvK6qio5cK055y4A77PtZF3XT5cCMEP7RVHsVlV1GfiaQe8AR7sCmOi3qr7KsQ8hnO8aABH5MRWb62CRAOcmcUppr1OAfr9/VlXv5uFejPGzde0Rq1FVT3jvr0/POefWVPUMcI9ceCLyGFBrXksjMifL2nbOPSyKYtdiXlgNTOliSmknhLBuMc/zBt6p6vOZiUQCsA5s5Kmq1+udGo/H5oKcCRBC0MFgsGXxe+8fTdZ471+2+Rd+BDHGZ8B3ABG52jkA0AAfc3z8MAAAjuV72TmA9/4ScDoPd9r85kbUpuFwOGiaZkNVX5C/rpTSZtu6ZTQiAFR1M8Z4v81nOYJqzr33ReRJjPGBxWw5gtsicpN//JROS1V/AZ+aptmq6/qbZfOVVvov9Bd2OpZ6p55GhwAAAABJRU5ErkJggg==', ds: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAF6SURBVFiF7ZbPahNBHIC/30yhxMyQECqRXATB0h6i1JOUvoF4kryAb+BVPHv15NU36Kn0DUp7EITSniy0R+NlySYDoeDOz0uC0TTZJvbPZT5Y2Jn9dueb0w4kEveMXDXZarUe9Pv9lyLyAngErAGiqpmIdFX1KITwFRgu488M8N5vA++A18BqSfwlsD+6f3VNfw/4NBgMDqcCqtVq2xjzDVgp+dD/8ktVt0IIp0wuJiIbE+NjVd0FDoqi+D4cDjOASqXSsNauAzsi8gZ4voS/AmwCp39lOec63nv13qtzrlO2jZvyTdmLt00KSAEpIAWkgHsPmPfrlXq9/jjG2ATWVFWAzBjzI8/zixvwZweIyAfv/eeiKB7++yzGiPf+J9Bd1i8NAJ7NKh7RHF3L+tMB1tpejHE8VOBERA6AMyAbzTeAp6q6A7T5c6JayLfW9sYLTZ4JrXPuvTFmVUS+5Hl+Pm9LtVrtiaq+BVjEjzFehhA+AsU8P5G4M34DOaa0MQD+KhcAAAAASUVORK5CYII=', dt: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHuSURBVFiF7ZaxaxRREMa/2Rzeyb553sFWimJjlwQLRVAMogHBNiSFypWWprJIlZQpVbAX7PR/iAEloFjoXWdjIyFwF8Ix7zju9nbHZldi2Mtd3EQC7te8YWbefD9e8d4D/nfRIbUSM99Q1fO5DIi2ReQTgOHEAEEQcL/f3wBwLY/5Pn0ul8vz7XZbDhamsro9z3tGRI+PyRwALkRR5AaDwYeDhdIIgBlVBQCo6lIeZyJ6m6wzWfVMAABeGjjn3uUBYOY0zD7tPMOPQwVAAVAAFAAFQAHw1wDGmDlmbjJz0xgz9y8BStbaNSLaADANYJqINo0xLwCcOVGAarV6mZk3VXUVf77vRERPmfmjtfbKiQBYa+tRFDUA3EpSHSJ6qKoLAHaT3HVV/WatXZ507qgf0W/VarVzYRi+UtVH+9Lvh8Nhvdfr/QQA3/e3iOg1Ed0HcFZVnzPzbSJ6kn7tRmnsCYRh2CCi1DwEsCIi86k5AHS73R3n3AMAK0kPACwA+Dpu/lgAIrqUhD8A3BGRdQBxRmssIuue590E8B0AVPViboBEbyqVyqyIbI1r7HQ6X0Tkqqq+nGRwJkAcx80k3FPVRRGpt1otNyEsAPScc8uqughgL5nZOMJ+TPm+f4+Zg6NsyhIzB8aYuzgFt+7p1C9+m6iex3Y1kQAAAABJRU5ErkJggg==', dB: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGASURBVFiF7ZZPTsJQEMa/rxpCKFOWBsNO4xb/rDiBHkCJVzDeANfqWYQ9mnAALkIkbt8rC4Jl3JQE4oO2UmKi/ZKmr/NNZ37Ne5kU+O/ay5Ls+/5pqVQ6mM1mHy6/VqtdlMvl+nQ6HeeDt9q8KSKRiES+7zcdzc9FZC4i80qlcpa2rpc2keRJnO/F6xVFUXQEgADoed5x6rquYLVavSV5SdJfxFS1AaAVPw5Jjpbf2eSr6kRV38IwfEkEEJEOgMe0X5BRHWvtcxLAO4D6jgDG1trD5YDrDNQBgGTPWsvFpartRYKqtpe9JJ9kb7l2EoBTnueFrnVaf5320yYaYwYi8kRSjTGDrP7WAAA+rbUPW/hOuQ6hZi2SRdbalZ6pz8CutGkLRiSHeTRR1RaARiYAkkNjTHudn0VBEHRV9cbl/foWFAAFQAFQALgm4QSAr6qtIAi6eTSJRzEAfPtPcAG8ArgG0Fg3Pn8qkv00AHfx/QpANafeIcm+qt7nVK/QH9IXvbShTYWfCDoAAAAASUVORK5CYII=', dC: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOdSURBVFiF5ZZdaFxFFMf//9lUm86cG6sGJAWhUFEbMailCKli0yp9sT4kEVGkFBS0iAo++SKIz0WCiGApFoofpSqKIn5V0FhEq6BgRAn0SX1ruztzNxt3l3t8cO56s9l837ceWO45d/5n5nfPzhdwuRu7YiMio6p6XS9xpVKp1mq1bwD8UzrA0NDQlhDCZwD2rJAz22639zYajb/KAKgU/EMAnlpFzjXGmKubzeaHZQD05Y6qDpOdgjymqr5bTPIlADcCeChJkue89xdLAwAwmDshhJMAmt3iJEm2qerLADYDeBTA1EYBTMG/Nj7TXoMDgDHmhKrOAYCqPoHFk3j9ACSviG5jKXG1Wq2SfC+GN4nIaGkAAObjc8sKOa/njqpOlgagqpcKAP1L6Dep6lgekBwoDcAYcz7v11q7o1torb3VOfc9yRdzZmPMW6UBAJjNHZLDRZGIHDTGnCN5W3xVJflIrVb7vEyA7woAe7t0kwDySfpJu92+xXv/9kYHXwDgvZ8F8GcM70VhianqHwX/aFnb8AKAaJ/G53bn3D0dkTGdUpN8uqzBFwGQPFYY9Mnc997/AOBsDA865ybKAli0kznnfiJ5O4B2lmW76vX6LwBgrd0fK0EAXlVH0zT9tZhrrR0xxtxHcp7k761Wa2Zubu7vtQJMkDwdw29DCHcD0Ng2VfgLPIBDIYQPAEBEHgDwLhaeLwBwCcBvAGZITnvvTwFoLQkAAEmSfKGq+wFAVY+kafpabKqIyCkA4zFWAB9lWfYKyeMkr1/ua6N9HEK4f1kA59zNJH/Gf0uvpaoH0jT9Kodwzh2NleiVfzzLsncqlcqwqu4EMAxgJ4CtnUHJ3d77c8tiJknyjIho/F10zi3YnKy1+0RkuqBREWn09/dv69WfiBzOdcVJ3L0MO+a9nwLwRgy3kpy21u7L2+v1+pkQwl0kd6vqCwBOkhxfao9Q1bQQrvoY7xOR9wtf2HTOHVlLB7k55yYLFeicoktWIFo7hPAggBMx3kTyVRGZttaOrBWil60EkEMcJvks/r8pjRpjfhSR0865MWzgZrQaAACdOTFC8sv4qg/ABMkzInJeRI4lSfKwtXZkcHDQdaVvJim9+l0XuXNunOTzAO5YRjYPoKGqV5LsvmXtCSGcXTdAbgMDA7uyLHtcVQ+schMCgK9DCGMAsg0DFC1Jkh0A7gRwg6puB3AVyX5VbQK4oKoXSM6EEN7EMhffy8/+BfYUQ663HuMNAAAAAElFTkSuQmCC', dD: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKASURBVFiF7ZW9a1RBFMV/d102L+TNrMZGl4iCRQoNYqUiCCraioVgI4iNoCgIoihYKSaVn4WF2AiC6B9g5wcKMUZSqE1Au7BpQiTvrruJ7O61eZu8JLuap7vY5MDAzL1n7jnc92YGVrGK/wxJwc15768B/X/gjUdRdB342U4DOefcM+DICvkvVPUoMNcOA2nFU5lYZCAMw30icg/YDqxpwi8CB1R1vFkx51w/8BIoNEnXROSzmZ1X1bfLDHjve83sG7C2hdlJYH8r8SUmXgEbW1C+ZzKZrTMzM98BsonEroT4sIhMNBJmVhKRm1EUff2dOICqjnvv95nZVREJEzX6gD3AOjPbDbxYZKBer4ci0iDfVtXnrUS6u7s3ZbPZ48C2OPSlWq0+rVQqEwCx0VPJPWEYHhORPQ2tRjzZgRXBe3/BzIaAXDKezWZveO8vR1F0N029TBqyc+6kmd1aKh6jy8zueO9PdMrAGmAwnteBK7VarVCr1QrA1ThG3J1mJ+jfDOTz+Z3Ahnj5WFWHyuXyZLlcnlTVQeBJnCvk8/kdbTdQr9eTZ/tNE8rrBLev7QbMLErMNy/Ni8iWRH6m7QZyudwY8QMjIufCMNzeyPX09AyY2dl4ORcEwVjbDUxPT0ci8iherheRj865d865d5lMZhToBTCzh1NTU9p2AwBhGF5k4Vt3AXvj0RXHXpZKpUtpaqYyUCwWy6p6yMzOAO+BH/EYBk6r6mGgkqZm6psQqJZKpQfAg7/YuwypOtAJzHdARIqJ+TPnXMdEky/tfAdUdQT40DHVBYyo6mhjkfwHqkEQHJydnT0vIgOkuM9XiJqZfQqC4L6qVttcexWr+Hv8AtMk9MBtWfxvAAAAAElFTkSuQmCC', dF: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADjSURBVFiF7dAxasMwFMbxv2QPxuh505KD9AA9QEOnQqYshZ6kvUKukKXZOnbtkCy9QodCJ2Nk3CyxsmTI0BA5hATK+4EW6eN74oFSSil1ZSYl5Jy7tdY+DSnu+37Wtu37WT4AWBF5BcaJ+bcQwh2wOVqcWNiLyARYJWQ/i6J4SBkO6RsAoCzLUZZlS2B0IPKT5/lNXddfqZ2pGwCg67pva+0Y+P3jeQ3cDxk++AMATdOsYoxTIO7fG2MeQwgfQ/tOJiIvIhJ35/lig/eYqqrmIrLghE2ehffeee/dVYYrpdS/sQUDzDSK1ohTWgAAAABJRU5ErkJggg==', dG: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADVSURBVFiF7ZUxCsJAEEXfiE3ism0Er2FhJ3gDsRBvo2exECtvINjZeAzBtJu4aQJjo52Nu2JA9vUz/zEzMJBIJBJ/Qs8YMwsp7McmF0Ux8N5vRaQFjp/W92LCsywbee9PwDy0R/AErLUTVT0Aw9AeEDgBY8xSVY+x4SECYq1di8gOyGLD4YMVvI5NVYP3/Y6oI/ypQFmW96qqFiKyAfTnAk/UObdW1RXQdCEAQF3XexGZAbdOBACcc+e2bcfApRMBgKZprnmeT4FDTJ9vEPyMEolEonMeAn49vCN1MvgAAAAASUVORK5CYII=', dH: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADMSURBVFiF7dWxjcIwGIbh1wkRzW8URQzAApR0pysoaRmAkqtOYhSYAGZAuuJKdB0lC9wAFCn+BkXBNCwQx8JC8tP781tYMiRJkrwjEZkDWYgtr5Esy76stceqqkZRAp4WTdP8lWU5iRUAMG3b9iwin7ECAMbGmF9r7SpWAMAQ2IvItutmqAAAjDHfXR9n0AAfg5Bjzrmdqm6A+6sDbsBaVQ9dD4YIuDrnlqp68jnc9w1c8jyf+V7eN+CnKIqPuq7/e2z4CfkZJUmSRPcAck8tUJ311VsAAAAASUVORK5CYII=', dI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADcSURBVFiF7dM/CsIwFAbwL6YIlrx2CkIu4SKuilcQnDyPnsJVECc9gIOLg7dwc+qQDq2UxMVBBCW1qMv7QaZ878/yAMYYYw1orZXWWjXpETWoFWVZLr33bQATAK7JIrUR0YKI/P3NfzpcKTUlIvewgE+SZPZJL1G3IE3TvnPuAKDz9FUAGFtrj19bII5jI6U8ATAvIpcoigZZlp1De7ZCg8aYWEq5fTMcALpVVe3qXEboAi1r7QpAPyDbK4piDUCGNA46Q6XUSAhxBbAJyd9rhnme70PzjDHG2N/cAKcxM3W7GxUBAAAAAElFTkSuQmCC', dL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFpSURBVFiF7ZQ/S8NAGIffizRNufu9ObI6+AEcdHTrYsFFcKqTn6L6MYqT4KxTxY/gUCdXwT84C66CBKEe2HM5S0xFkqO9xTyQ4cjlfd57yf2IGhr+OyuhPGma9lqtVm6MeQ/knBEx8wiABfA493LZdqXU0Frbd0uxbN8PABy6k1sAb1LKjWBypdQ+gE8n/0jTtBdS3gUwcfIpMx+ElK8DeC2MfhBM3ul0Vpn5+VvOzCe1izBzJqXcppoZobXWAO4L8gvyuWUAbl2BUY0CbQDjwtiviSip8uFvgjYRkbW2r5QaVqnBzGdE1HXrhyiK9ohoUqWBOer+REqp48LeF631mpe4VLTSNVpq0JSCxJSDJEjQABiUTrjp5AsLmj+vmjHmJo5jLYTYIqK2EGI3SZInIrokIum2HeV5furbQBUEgPPCJGaPV9B4EjPzVUnuFzS+uKS7cw2MqWLQLJQsy5iZd8iFVUNDwyL4AkWRcmKkxDyTAAAAAElFTkSuQmCC', dM: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFBSURBVFiF7ZS9SsRAFIW/SUJscqe0sBTcwDaKtVj4AP4Uvo2Nwj6MWMhG0C6Cb+ED+FfYZCDgsktsJuKGzW4STSHOgSHcyeR+h1zmgJOT03+XqnsRRdG6UurBlkfGmMc2jUUkBm4Afzab7eV5/rLonFfXwPf9HSC2K7UN28BTYAvYDIJgu435Lw8iMhaRwq6nJiZEJLZny+/GgN/FAEAoItffmr1GUTRcAh9U4LfAWld4KxN9wRuZ+Am89hbUmLgEjm39VhTFgVJqCtwDG3b/zhhzAnz8toHSxBVwaOtn+yzhiTHmFJg0bdglB6omSs3B7Y1JgCmwb4x5X8TpkgMTC0pWwFNgAAw9z9ut4yzTqhwItdYXWutzICw3XQ64HOCv5UAXVcfRy8zbmugMbzuCORNa6zOgyLJsRM+/3cmpN30CgJeuJ756epUAAAAASUVORK5CYII=', dN: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACySURBVFiF7ZQxCgIxEEUHl021L1t4CMF7aGmlJ/I2Wuh6GD2BoHWwCUJsFlkRlMmKhc7rwiPzPwmMiGH8O0XuPe/9tCzLEGO8ZPheOKABErDP8A8MMsLXIjLL9L0KOGDVGX5OKc0VvhcO2LbPmoBTVVVjhbdwC9fhvV92hh+BkcZr0O6Br+GAzZsveOWthJX47RJNJ+Sg9E9o90AMISxEZNeer0r/MYq6rifAMNMbhnHnBkX0n0AaM99mAAAAAElFTkSuQmCC', dO: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADQSURBVFiF7ZWxCsIwFEVvFWyH3nQQ/IP6J+LWQfArXVTQ1d/QXVeXThEhLhkCWl/auAjvLBlOyH284QZQFEWgLMuZMWYJYDzEJ0PyTNKR3AGY9PUSo4g7zp8Nyc2HEMmnDZBlWQPgFoRsAeSx/icYY2qSV79qR/IYhkheh9Ahvg0xqDystfc8zw8AVgAIoC6KwllrTzE+JKYHYnGJPh6Sc5K3rhVLXsM1/H/CfcAlePztz5e8REwPPP25b9t2DeDR06dBclpV1QIdrSl5RVEkXniWn3jv5xphAAAAAElFTkSuQmCC', dP: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEnSURBVFiF7ZS9TsMwFIW/UClZcm92dlSJp4BKFWIpEw+E4GnI0jD0DRhhAgE7RTB7ChIxA46IIhLSpqEMPpJlOf75juLrA15eW9aox95QVc+iKDrM8/wa+NiUqU5wEZmLiHVtAUTbgvcysbMGPAVO3PjFNYBjEbkEwqEMhA4wc+M3a+00CIIDYOm+zURkzgDXUf/tr3Ec75eTqronIs9D1UQrfGgTneBDmRiJSFY5bCki46o5Vb1Q1XMqhSciY7e23JexTt6o6lEbvGYuazORJMm0idP4Cqy1N8A98ABMjDFPFXjK92uAr+pPSxNu7QR4BO6Korht4gRNEw2qw8sM2HX9lTHmFHjveqDPgd7woU386xz4UX+VAyuZ2HQO/KpVcsDLy8vrE8jysKUwkTuoAAAAAElFTkSuQmCC', dQ: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAECSURBVFiF7ZO9SsVAEEbPukGbnZQWloIGbPQBrHwAfwrfxtaHEQu5CtpdwbfwAfxrMxBQDGszkasYuZtrKvfAEia7me+wQyCTyWQy/x3XtxFCWHXO3Vl5oKr3KY1FpAKuAN+27W7TNE8/nVvqa+C93wEqW1NrmBI+BTaA9aIotlPkPx1EZCIi0dbDPBIiUtnZ7rsJ4IcIACyLyMVMs+cQwtYv4Zvfwq+BlaHhSRJjhc8lsUh471/QI3EGHFr9EmPcc869A7fAmr2/UdUj4PWvBTqJc2Df6kd7duGXqnoMvCX2TZaYHccoM0+VGByeOoIvEmVZngCxrutTRr72TCaTGY0PyCtXuInsdKAAAAAASUVORK5CYII=', dR: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACtSURBVFiF7ZSxDcIwEEVPRE6V5xQMgcQeUFLBRGwDBYRhYAIkqC0aK5JpUrgksSEg7nUu7v2vs3QiivLvFLk81tqlMcZ57x+ZnC9TAg0QgHPf4UmG8L2IrIYKUgqUwC4Kv4cQ1gm+3uHHbu0BuFVVNddwDX8b1tptFH4FZrncqXfgY5TAYbQv0BJa4ttLNFGJS19B6h3wzrmNiJy6d5voG0xR1/UCmI5VQFF+lydieE+mtxsS1wAAAABJRU5ErkJggg==', dS: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADCSURBVFiF7ZYxCgIxEEX/KpgU+UmlN1hvIlZaCJ7SRgVtvYV4ALe12So2sVFYK02iBmRePzMPkvkMIAhCJMaYobV2CqBfRIDkkWQguQEwyO3Xy6iZk1zlSkQLVFU1A9B0JNYAVI5ENNbamuT5/hSB5F4kRCJV4iNh4r2/KKV2ABYACKDWWgfv/eFVbUoOvEv4Yu9nSI5JNkX+gQyX4T8PHpKnzvDsmyAlBx77vW3bdgngmiMQjTFm5JyboNRJJgh/xw0KCU7D7fb9DAAAAABJRU5ErkJggg==', dT: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADoSURBVFiF7ZQ9TsNAEIU/E8lu/ManQJE4BUSKIppwJq4DTdJwA0qoiCB9EpHalYt4aTYSQjKYhFUK5pOmmN2ZfU/7B47jOCdmcERvbma3RVFcNU3zCOz+ylQvcUkzSSHGA1CcSvwoE2cHiN8DNzHfxAC4lnQH5KkM5FFgGvNtCGGcZdklsI5jU0kzEhzH121/L8vyYj9pZueSVqnuxLfiqU30Ek9lYiBp/mmxtaThT02ShrF23zfnkP/GzCa/Fe8yUVXVuKu28xWEEJ6ABfAKjOq6XvY1EGtHwBvw0rbtc99ex3Ec5//xAZ1/Ww7LtghKAAAAAElFTkSuQmCC', dU: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALmSURBVFiF5ZfLThRBFIb/0xUZkqlzOiEoCmgUWeJtJzyBOxIiuFDcGR/AhLiBjb6ARgR1yd4EN+IT6MLgJbpENBkuMWrsaRIupvq4sGcoBoa50K44ySQ93f85/1dVXTVngMMe1EwSM7cnSdJpjOkGoM65QhAEy3Ec//xvACLSC2BUVQcBXNizGNF7ALNENBNF0UImAPl8vsMYM6GqtwAcqZP3j6o+AXBvbW3te9MAzDwA4DmADu92REQvkyT5TEQFAFDV7iAI+lT1CoDQ064CGIrj+HWd4NthrR1h5g1m1vTzRUSuA2jZJ61FRG4w86KXt2GtHW7InJkHfHMRmaxhXBk5Zp72IZi5v67MfD7fwcyrXvKdhui9YOYxr86KtfZozSQRmfRG/qhZc6/eVKmetfZhLXEvM2+V1hyNTXu1yHnvxGYYhj3+w6BCPIp0qxHROICtDAA2iWgivW5xzo1WVTLzh5T0N7IZfSlyzBylyzDvPyjPADO3AzgPAEQ0h2xGX4pNInqV1r4oIm27AJIk6S5dq+rHDM1L9Us1yTlX9ioDGGNOePqVrAGIaNnz6twFAEB9fdYAFTXLXmUA51x51Krqz0Ymoapdnld5NsoAQRAUvOtzWQMEQdBXYjHGLO0pEpF36TaMkP02LKa13+4AqxDObrPISFbuInINAAOAqr6oKgzD8Cwzb6akiwByGfi3Wmu/eUfxGf/hjhmIomhBVZ+mX08z89RB3Zn5ARGdAgBVfRxF0eK+CdbaY8y84v2Mjh3A/K5XZzk9betK7K/ohqbR2HK0MvMzL39dRC43RG+tHa6A+CoiozVAciJy01tzZeZ1a+3Vagm1mtJ+/GtKj3u3i0Q0lyTJJ68pPek1pexpV4hoqFgsvmkKAADSNmqciG6j/rNhS1WniOh+HMc/9hPWfeaHYdiTNhODRHRpL42qzgOYNcbM1HzbGwXwQ0TanHNd6V8zOOcKxpilYrH4q5l6hzv+AgyoDLipCxvZAAAAAElFTkSuQmCC', dV: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOjSURBVFiF7VdNiBxFFP5e1TodmHpvJCSubtZLyFGjXiSbowdZTyvBjQddb+I9QghI9jLBowcxGhG87EUUhBUhUW96cE9Boh41EdbdICYy1SNmxlQ9D+me1E56enqXeNIPhnld9d73vvrpqtfAfx20lyBmPhBjnLPWzgPQEMKmMWYrz/Mb/5oAETkCYEVVlwA8UUlG9B2AdSJa6/V6P90XAe12e9Zau6qqrwJ4oKHev1X1fQDdfr//254FMPNxAJ8CmE2ae0R0Mcb4IxFtAoCqzhtjHlPVRQCdxPc6gBN5nn/bUPhdOOdOMvMtZtbi97OIvASgVRPWEpGXmflqEnfLObe8q+TMfDxNLiLnpyQeR8bMF1IRzLzQKLLdbs8y8/Uk+PVdqU/AzKcTnm3n3MGpQSJyfmzkk2BF5JyIdAHYGhGjmXDOvT0t+RFmHpZrjpppF5HFROhiDW2W7IlBp9M5nHaaMecVFK8aEZ0FMJzEGmPkKrsCAyJaLexWCGFlogBVfb4we977T2pIdwXv/ccAfPG4VCmAmQ8AOAoARHQJNaPfAwZE9EXB/aSI7C87ZkojxnjIGFPa348RzIjIszHGdtlARMdS2zk3cjbG/Om9/xLA7YT/ChEtA6AQwjyAmzsEWGsfUdWScCvNzsxdVT1DNPHgPJX2qSqY+c08z99IRI44rbVzAK4A927CSdCGfiMQUWziN5qBEMJ2uQSqOpc65Xm+KiLfxBhH81wswani8S1V3Sj7jDF97/1XO0agOlfOUghhNBszSdBmYj8+JvS29/5i2uCcQ0moqhv9fr/2rTHGHC2WWK21d3Mlo7xR3OdQ1eewu7N/GrLipgSAy977m/cIKLBe/IuInLxf2UXkRQAMAKr6Wdq3QwARraF4/1W1CyCbRGqM6VfZFdgXY+wW9tBau5Z27rhEBoPBH61Wa5aIngbwYJZlB4fD4edVrIPB4FqWZTNE9LX3/kMAlbuemd8lomeKQb2T5/lHNWIB59xDzLydXKOnawNqwMxnEp6t4rRtFLgwVg1dQM1yVGAfM3+QxP8lIsemhyVwzi2PibgmIitThGQi8opz7pc0uXPuhUkB04rSBdwpSh9Omj0RXYox/pAUpY8mRWl6NW8T0Qnv/QYmYGpZXpRRZ4noNTQ/G4aq+h4Rncvz/Pc6x8YfJp1O53BRTCwR0VNVPqp6GcC6tXat1+tdbcK7p08zEdkfQjhUfJohhLBprf01PeH+R1P8A77obudSd+P3AAAAAElFTkSuQmCC', dW: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOuSURBVFiF5ZdNiBxFFMf/rwtng1PvDYQkm6yrSAjsxcSIFzfkYA4BRchKMKui601yFBFCLruX1UvAgwfzeVxQcCGwp8STRz1FET+SQ9wIm5n4Cd01YrKh+nlIzWylp3tmdhlPeTDwuua99/9VV3XXa+BRN9pKEjPvyPN8whgzCUC992tJkjSdc3/9bwAisg/AnKrOAHi2tBjRdwBWiGgpTdObIwGo1+vjxpgFVX0XwGND8t5X1QsAFtvt9u9bBmDmQwAuAxiPhlMiupLn+Y9EtAYAqjqZJMkzqvoSgEYUewfAcefc10OCb5i1dpaZ7zKzht8vIvIWgFqftJqIvM3Mq1HeXWvtiU2JM/OhWFxEPh0gXLQxZj4fQzDz9FCZ9Xp9nJnvRMkflMVZa3cx83Vmvm6t3VUxkVNRnZa1dmcxJikOGGMWENaciM465z6uYD0MYCr8DpcFOOfOALgQLncDmO8LICL7wm4HgNUsy96vEAcAU+EXId4DcAsAiOhko9HYWwkAYA7hUSOieQDrfQCGtXtEtBD8mvd+rhJAVV8Nbppl2fIIxAEAWZZ9ASALlzOlAMy8A8ABACCiqxjN7Dt2j4i+DLUPisj2HoA8zyc7vqp+P0LxTv1OTfLed7W6AMaYPVF8a9QARNSMtCZ6AABoVbK1dtZa+4+IfI4Bb0Jr7WfMnIrIK8OAdQG8991Zq+pEHERELxPR46r6BjMvV0DUmHmZiN4EIOHU7Fpc03vfvRtdgCRJ1iJ/fwHgI2wsyzFmXk6SpBbF1wLYsTDUIqIzD800SQ50WIwxXa2HTkMR+VZVDwLInHM7ET0JzDwF4CsAnb3SBDBR4rcAHHHO3YhKjzHzHwBYVa+12+3ne+5AsJUNFpmN/wgFj0R3Il6mfuIQkdcBcEGjF4CIlhBmraqLAMYqIJrotWaZOIBteZ4vBn/dGLNUCZCm6U1VvRgun2bmc0UV59wNInoRwO1o+DdVPVoiDmb+hIieCpM6m6bpagn8hoVjthUdo6fK4ph5ipl/Zuafwv4oizkd1WmGt+1gY+bpQjd0HoXlGGDbmPlSlP+viLywiXzAWnuiAHFLROYGgIyJyDvW2l9jcWvta1UJg5rSaTxoSndHwxkRXc3z/IeoKX0yako5im0R0fEsy77ZEgAAhDZqnohOYvi+cF1VzxHRh865P/sFDv1h0mg09oZmYoaIniuLUdVrAFaMMUsDd/tmAWITke3e+yfCpxm892vGmNtZlv29lXqPtv0HgJhkvMAD4nEAAAAASUVORK5CYII=', dX: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAO1SURBVFiF7VcxbxxVEP5mH9zaujezUhQwvpiCYEIDASQKnI5UQOMowqYA0yF+AJKVgqSBKhUSAkwoKEJFgeQUJDRQBShQgAASKAKDdLmzEETs7lnJLXo7FNk7P29ufesDKhjppKf3vpn5Zmbn3Tzgvy40iRIz78/zvGWMmQOgzrl2EASdNE1//9cIiMg8gBVVXQTw0EhjRF8BWCeis3Ec//iPEGg2mzPGmFOq+gKA22vy/VNV3wbwSq/X+3ViAsx8BMAHAGa87ZiIzud5/h0RtQFAVeeCIHhAVZ8AEHnYTQDH0zT9rCbxbbHWLjPzDWbW4veTiDwLoLGLWkNEnmPmDU/vhrV2aU/OmfmI71xE3hjjuCwhM6/5JJh5oZZms9mcYeZNT/mlPbH3hJlXPTtda+0dZYwpb0xPT58G8DgAENGbaZq+XMaIyHyj0TgdhmGQZdn3VQSyLLsYhuEsgEcBWABTWZadr2QsIvPMnA1qjhFpZ+b7mblTYK5VGtuW0Psm+lEUHfQPgxJ4BUWrEdFJAFnZOYBPAMwCgKpWR7MtfSI6VawbzrmVSiQzf10w/QOl6Jn5EDNf9Wr6IYCwBgHgZhZiZlZr7SX/YJgBZt4P4DAAENEFeNF7kbeKrXNpmh4D0K9JoE9EHxW2HxaRfYOD2waLPM8PBEEwWH9Tcv6x57xDRO9baxfHOHWq+unW1tZmYfMyES0BIOfcHIBrOwgYY2ZVFQXLjmdo3XMOAC1VfY9o/N8IEV0BcKhs0xjTAnAZuPUjHCVaAzOx7jADzrnuoASq6kd8DLeWYDXP8x0dMkKcql4cMlFtDbLmnBtmY0ggCIK2t35wsE7T9AdmPuqRaKnqcq/XW0KpTXeTIAgOFyVWY0x7JEhEvixaLEapDUXkvr/Zhkmh98UOYiXg+rY/WfYPkiS5AuAogG6x9aS19t063kXkGQAMAKp6rhIYRdG9zNwvmG5gRIQTXMVT1tpfvKv4nl3R1trXvTSvVUQ0z8xnROSpcd6Z+czAnrX2tbF0rbV3MnPXI7E6Vqna+QnPTqe4bWspLpSmoTXU/+AAYIqZ3/H0r4vIY3tib61dKpH4WURWxhAJReR5r+bKzNettU9XKYwbShdwcyi9y9tOiOhCnuffekPp3d5Qyh62S0THkyT5fCICAFCMUSeJ6EXUnwszVX2LiF5N0/S33YC1HyZRFB0sholFInpkFEZVLwFYN8acjeN4o47diZ5mIrLPOXegeJrBOdc2xlxNkqTOvfC/7JC/ABU6YYBFriVqAAAAAElFTkSuQmCC', dY: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOxSURBVFiF5VfPixxFFP5eV5xZduq9lpA47mQ9GANC0Kgg4i6IkJO3JcFNDrqeFP8AIeSSXPTkUYxG9CK5iIJxg2hE0IugB4maqCCiqzDOLKIxMzVLMiPdz8NWT2rbTk/voKd80PC63q+v3quqrgZudtA0Tsy8K03TljFmHoAmSdKOoqjjnPvzfyMgIvsArKjqEoD7CoMRfQ1glYjO9Hq9n/4TAo1Go2mMOamqzwC4pSLfv1X1NQDPDwaD36cmwMyLAN4F0AyGe0T0YZqm3xFRGwBUdT6KontU9TEAcWC7DuCwc+7zisSvw1p7hJmvMbP652cReQJArcStJiJPMvNa4HfNWru8reTMvBgmF5FTExLnUWfm0yEJZl6o5NloNJrMvB44P7ct9gGY+VgQp2ut3T3RSURO5WY+KckhZn7D75Ii/bgS1tqXJiXfx8yjrOeoUHZmvuLtO8x8d4FJPVgTwziO94bKKGe8Ar/ViOgEgNEkAqr6gRfnAHxaQGJIRCe9XEuSZKVsNt94pldQfdHVmPls0Ot1a+3+nE2dmXu+DRdCxbgCzLwLwAEAIKLzqDB7j5Fz7iiAc/69SUQf5yoxJKKPfOz7RWRnptiRCWma7omiKJMvZeOzs7NzURQtADBlLIjobVV9EEDLP58w80Hn3A8+5kUiWgZASZLMA7i8hYAxZk5Vs2CdYPwzAFsWThEy3wAtAGcB7C+I2QJwEfj3IixCWsFmaowrkCRJN2uBqrbG2dP0ESJaxIQWRFFUU9UXsTlzAOgAOJTpVbVFRFmucTV2BAHagXxvJm9sbKxj84NUhhozv5NLPu6/j3nAt0mNMe2CGICIfOW3Ug/b24bvVdiGfa//MlTk18DqdS5ypEp2EXkTwJJ/7QJ4dDAYfJ+zOQqAAUBVz+FGiOP4LmYeeqZrAOqTCGQHTMlRPGOt/TU4iu8MlVsW1nA4/KtWqzWJ6CEAt9br9d2j0ej9MgIzMzOXAGwQ0dPOuR8LCL5CRAcBQFVfds69VToja+1tzNwNenqs1KEEzHw8iNPxp20lx4Xcbeg0KrQjwAwzvx74XxWRh7fF3lq7nCPxi4isTCBSF5Gngp4rM1+11j5+I4dJl9IFbJ4BtwfDfSI6n6bpt8Gl9I7gUsqBbZeIDvf7/S+mIgAA/hp1goieRfWzYaSqrxLRC865P8oMK/+YxHG8118mlojogSIbVb0AYNUYc6bX661ViTvVr5mI7EySZI//NUOSJG1jzG/9fv/yNPFubvwDGqNdMYyQxqAAAAAASUVORK5CYII=', dZ: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOeSURBVFiF7ZfPixxVEMe/1U93Av2qFkN0s8kqQYIxElFvbo6e9LQQnHiI6038A4RFD8ll/QcMCRv1uJCDQnAXxHgxRz0F8RcJkqzC/kKM2v0GTEbeqxzyZnzTO70zs4wnLWim+tWvT3e/qa4G/utCewli5gMhhEPGmBkA6r1fz7Js0zl3518DEJGjAOZVdQ7Ac32TEX0DYIWIlouiuDUWgDzPp4wx51T1TQAPD8n7t6p+AGCx1Wr9umcAZj4J4AqAqWS5IKLPQwg/ENE6AKjqTJZlJ1T1ZQCTie82gFPOua+GBP9HrLWnmfkuM2s8bovIGQATu4RNiMjrzLyWxN211jZHKs7MJ9PiInJxQOGqNJj5UgrBzLNDReZ5PsXM20nw2zWQx5j5RjyO1fgsJHm2rLWPDgQQkYvJlV+oSfwUM28kybettc/U5Fvq+Flrz1ftVHE+qqo/4sFuX3POPQ2gXb1yAF8COFTJtQngJefczcp6g5lvADgCoJ1l2fGiKG53jFnFeT4WBxGdrSl+rU9xxLVrfR7HPSI6F/UJ7/18auwBiE0GAIqyLD+pKT4dlzYTc0ef7gdRluXHAMp4OpfaugDMfACxwxHRVSRXH7tgWnyViBY69qivphAxpiP3iOiL6Pu8iOzfARBCOJzo36WUqvpuWtw51wwhtBP/tnOumUKo6kKaI4TwbYfXez+zA8AY0ykAIkpvL4joCoA/VfVyLNSzN6K0nXNNVb0M4A8i+rSSo5vTGNPdQw/1SQRU/h1lWX4G4JEa3x6IVqt1Zoic2lG6d8B7v9W1qk5jzKKq3Ufsve/ejS5AlmXrif7suAGyLDvRYTHGbOwAcM7die9zqOorGK33D5JGfFMCwPWyLH/fARBlJf6KiJweV3UReQ0AA4Cqrqa2HgAiWkbc4aq6CKAxhvr7QgiLUW8bY5ZrAYqiuKWqH8bTI8z8/i6JfY3eI8x8noieAABVXSqKYm1XXGvtY8y8lbzpFvr55Xl+kJl/YuabeZ5P9fNh5neSPJux2w4WZp6tTEOXMNrj2MfMHyXxf4nIiyPEA9baZgXiZxGZHwDSEJE3rLW/pMWtta/WBQwaSmfxYCg9mCyXRHQ1hPB9MpQ+ngylnPhuEdGpsiy/3hMAAMQx6iwRvYXhe0NbVZeI6D3n3G+7OQ79YTI5OflkHCbmiOiFfj6qeh3AijFmeeBuHxUgFRHZ770/HD/N4L1fN8ZspB3ufxlW7gNCHXReB5RxcAAAAABJRU5ErkJggg==', d_: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOkSURBVFiF5VfPax1VFP7OTNrX5N3vTCjR6GuEWuvOnzvTvaIL6Q9sRTTuRMSNIBQ36UZdC2ptQ8FNoQu1YgJq1T/ALqQW0Y2iUYgvtaj4ZgabRO8cF70vvX1J3i911QMDw53vO9935849cy5wo4cMQyI5UVVVI03TKQDmvV9KkqRZFMVv/5sBVd0LYMbM9gO4d9NkIhcBzIvI6Var9f1/YqBer0+maXrMzJ4BsK1Pv3+Z2RyAl8uyvDy0AZL7ALwPYDIabonIx1VVfSMiSwBgZlNJktxlZg8DyCLsJQCHiqL4vE/j18I5d4TkCkkL1w+q+iSA7V1o21X1KZKLEW/FOXd4IHGS+2JxVT3eQ7gzaiRPxiZITvfFrNfrkyQvReQXB3IfBcmjUZ5l59xNPUmqejya+ZvDikf5TrTzOede7wXeS3KtveYY7LVvFbXom1jNsmxP/DDpAM8gbDURmQWwNqgayYMkT42Pj+8OQ6sicizcb/fez3QjXwxO/8AQsyd5gOTfIcdc9KhGshWW4ULMSSLyBEKFE5FzGHD2oWacAZACMDP7NHq8KiKfhNz3qerODQaqqppq35vZV4OIhzL9AYDRwJ8ty/JsjKmqqp1TvPfrWusG0jS9JcIvx+TR0dFdqvoWyYOd4mNjY7ea2WcA2ltsrizLVztxItKMtBobDHSLkZGRWTN7DsC7JA+0xycmJpgkyYcAdoehhaIonu8n5wYD3vv1WZtZIwaFGRquru+ZsN7bVlZW3hOR+wPsPMknAPjNhOKc3vv1t7FuIEmSpej+7phcluVZM2tvpVEACyTfEZGHwti3AB5tNpt/bjnTJLmn7SVN06VNQar6ZdhCLWyyDZ1zb0SltX1dVtU7txIOUSOZB/wX1xnrAM5f86JHOrOUZfkCgIV4KEmSR/I8/66buqo+DoAAYGYLWwKzLLuD5Gpwugig1olpNBpjJD8i+UuWZQ92Ew6xwzn3U1SKb++K7njNb/ch0DVIzkU/o9d6EpxzN5Ncjkwc/RfiL0V5mqHa9kWc7uiGTmKT5egSO0ieivhXVPWBgdw75w53mPhRVWd6GKmp6tPRmhvJK865x7Yi9GpKp3G1KY3LdC4i56qq+jpqSm+LmlJG2GUROZTn+fmhDABAaKNmReRZ9P+LXjOzEyLySlEUv3YD9n0wybJsT2gm9kfl97owswsA5tM0Pd1qtRb7yTvU0UxVd3rvd4WjGbz3S2ma/pzn+e/D5Lux4x8+81Q4Cnb8ggAAAABJRU5ErkJggg==', d$: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAN6SURBVFiF7VdNbxxFEH01LbyRtl+PhAwOiTkQcuRD3HB+ATdHURyQwIhIiXzhAEKKuCQXOIPAhMSKFSnKiSAh+QT/AC58iI8jGKTFjvjM9FhKbNTTHNK7Lg87u+MFTlDSSr1d9V697umuqQH+6yaTgEhOV1V1yBgzCyCGEHpZlm2UZfnrvybAOXcUwGKMcR7A40PJRL4AsCYi14ui+PYfEdDtdmeMMRdijGcB3NNS7x8xxhUAr21tbf00sQCSxwB8AGBGTRci8mFVVd+ISA8AYoyzWZY9EmN8CkCuYm8COFGW5ccthe+atfYUyTskY/p955x7FsDUCNiUc+45kusKd8dau7Cv5CSP6eTOuYtjEtetQ/KyFkFyrhWy2+3OkLypwK/sS70ykucUz6a19r6xIOfcRbXydyZNrvgu9fmstW+PCz5Kcqf/zKG2neQqyVskTzfhSZ4muUXympruqDOxnef5EY3JahyLSFdNRM4D2FG+k7h7wldJnhmS/AyAVQBdAMeVa1tELqTxVAhhsVFAKjIAUHjv36/leBlAlTArWkQaryRfBeAlDfTe3wDg09957RvUAZLTAH4GABF5z3v/TMMqdaKl5NozV5blah3rnLsRY1wAEEVk2nv/254dqKrqsBp/VScAgES8pHeiTfLE+WV/0SGE2f78QIAx5lB/LCIbw0iUiLNKRAYgxhhfbEpe59S59BmIOr6JaISNw2j/INdAQAhhc+CN8YEmlnQOrmB32ysAIiLLw27HME6dayAgy7KeGj86Inn9EO45E00isix7rK/FGNMbFgPn3OepYBSo1f5UZELyh/o1rPnqxapD0qdq+OkeYbXAtV0t7lTN9xYaTvuQ2/FGbWFPA2Atx18tz/OHSW6nlawD6CiSd0n+TvKFJnzapVvW2mU1fcBa+4MqxQ81CgAAa+2yeoNdHRncwkiuqJfRm2MB1tr7SW4qEef+RvJXFc9GqratgHO1bugy1ONoYQdIXlH42865J/el3lq7UBPxvXNucYyQjnPuefXMI8nb1tqTTYBxTekc7jalB9W0F5GPqqr6WjWlD6qmlCp2U0ROeO8/mUgAAKQ26ryILKF9X7gTY7wkIq+XZfnLqMDWNT/P8yOpmZgXkSeGxcQYPwOwZoy5XhTFehveiT7NnHP3hhAOp08zhBB6xpgf++/4/20/9iffgF9UjvZqLwAAAABJRU5ErkJggg==', d0: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQgSURBVFiF5VdNaFxVFP7OezpTmHvOhFKNTaMtGqRCrXYjJhLEnRuNtCaiNa4qCupKUBe2C+vWhdaaasVNBUFBiC6s6NKi4C9BQy20iZBmimj1vTs0zZP3jovcmdy5TmYmUVc98OCee36+79y5c955wJUutJEgZt5SFMVAHMeDADTP84Uoihattb//bwREZAjApKqOAbitbTKiHwBME9GJJEnO/icEKpVKfxzHh1T1cQBX98j3L1V9E8Dher3+64YJMPMIgA8B9HvbCRF9UhTFT0S0AACqOhhF0S5VvRdA1fO9AGCvtfbLHomvijFmgpkvM7O655yI7AdQ6hBWEpFHmXnOi7tsjBlfFzgzj/jgInK0DXDc19e3XUTuEJHNga3MzMd8Esw83BN4pVLpZ+YLXvCzgQsZY55i5kXPR5n5a2a+KyjkOc9eM8Zc05WAiBz1Kn89tBtjjgTA/rNsjLknyDfVsBtjXgvzUeA8pKqzWLntc9banQAyr6IRAKcAQFUvAXiHiOYB3A3gPud2xsWp08vMfBrADgBZFEW3JElyrpEzCghNOnAQ0UEf3IFONJkTPVyv15+x1r5irb1fVd9zppsrlcpuL2yZiA65dSnP80k/ZwsBVX3ALZM0TT8IyCGKoj/dctZa+7FvI6LPPb/tvi1N0/cBpE4da0uAmbcA2O2SnURQvUv0EoBRIhrF6hE3ZMhb/xHYlonoU5f7dv9fc1VjURTFYBSt8FHVmRC84Wat/aKhuL4wBOBaVT3Q4Gmt/eYfgUUxQ0TjACjP80EAF1sIxHG8VbVZVG0NAk0Rkf2q+m64T0QvAlhqs7/oYQ0AmAFa74B/pF3fEaq6LdiqATiQpumRNUL8nE2s5gnkeV7zfoKt3QgQ0UxRFCAiqOqT9Xr9OICiE2EiamA1T6NJIIqiBW99azcCaZp+JiKHAai19u1O4C7nLvcTaxzH59s6icj3rmsl6PzSWa+UmTl1uVsuaNiIple5yAQ6iDFmHzPXXI/f18lXRB4CwACgqh/5tpbLVq1WbyqKYhYr1c+7lrrcLikznwcw4NRFa214KRuyyRjzMxHdgJVWvDNJkrmGseUEkiQ5q6pvOXUHM091qqwXYeZXHThU9Q0fHADiMKBUKn1LRJMADIA95XJ5KcuyU6FfuVyeAzAKwAJ4Osuy023AXwDwvFNrRPRIlmWXemE9HExDxwCUuwauyiZmPu7FL4nIneuIB4wx4wGJeRGZ7EKkLCKPGWN+8cGNMQ+uFdBtKB3GylB6nbedEtHJoih+9IbS672hlD3fGhHtTdP0qw0RAAA3Rh0koifQe2/IVHWKiF621v7WybHnD5NqtXqjGybGiGhPOx9V/Q7AdBzHJ8Lb/q8J+CIim/M83+Y+zZDn+UIcx+fTNL24kXxXtvwNkiWnLZoYDaEAAAAASUVORK5CYII=', d1: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANZSURBVFiF7VfPixxFFP5eF+4Eur63EKIbk1WC5KCQ+OPm5h7QUyAx8aDrTbzkJgRBk8vmH1CMG/W4d2G9GP8CPS0qKookq7A7E8SIPb1gslL9PKSmrZ1MT88s40k/aOZ11/fe+6q6+tUb4L8O2Y8TyUNVVR1xzi0CsBDCVpZl3bIs7/xrAlT1OIBlMzsD4JmRwUS+ArAuImtFUdyciYA8zxecc1fM7HUAD02o9y8z+xDAys7Ozq/7FkDyFIBPACwkjwsR+ayqqu9EZAsAzGwxy7ITZvYCgPmEexvA2bIsv5hQ+D/w3l8geZekxeuWqr4CYG6M25yqvkpyM/G7670/P1VykqfS5Kp6rSXxMDokr6ciSC5N5Jnn+QLJ24nzm6N43vtzJHske977cw0TuZTE6XnvH24VoKrXkpm/38QjuZ0E3x4Tb3XA896/NzwuQ+TjZvY97u/2zbIsnwSw2yQAwJF42y3L8miDhg7JHwAcA7CbZdlTRVHcGgxmQ+TlmBwicrkpecRFAN14XRzDuyciV6I9F0JYbmSS/Dou1x+YbtO1oUOyiK9hIx2oV4DkIQBPA4CI3MD42QOAU9WrqroCwLVw74nI5zH2s6p68AEBVVUtDmwz+6YlIFT1tJm9bWbvqOrpNn5VVYOYEkKoc9UCnHOPJvzeBAE5ym6CiHSTXIPNu2cTWspvC7gPpDHrXLWAEEI9azNLV2MmMLP6Mw0h1KtRC8iybCuxT85aQJZlJwZanHN14aoFlGV5J57nMLMXMePPMJ6UALDR7/d/f0BAxHr8VVW9MKvsqvoyAAKAmX2aju0RICJriN+/ma0A6Mwg/4GqqlaiveucW2sUUBTFTTP7KN4eI7k6JnBosPeA5Lsi8jgAmNkHRVFsjpXrvX8kHrODk+7SKF6e54dJ/kTyxzzPF0ZxSL6VxOnGatsOkktD3dB1TPc6DpD8OPH/U1Wfn8If8N6fHxLxs6outwjpqOpr3vtf0uTe+5eaHNqa0iXcb0oPJ4/7InKjqqpvk6b0saQpTctyT0TO9vv9L/clAABiG3VZRN7A5LVh18xWReRqWZa/jSNOXPPn5+efiM3EGRF5bhTHzDYArDvn1lp3+7QCUqjqwRDC0fjXDCGELefcdlrh/sek+BtCYUOTKTJhqQAAAABJRU5ErkJggg==', d2: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAM3SURBVFiF5VdNbxRHEH01bbyWtqtGQgSDcaIEOCZ83LB/AMoNCWE4EOcW8QMiWUhghESUe1CMITn6jmQuGHKOwgEBcZIjmEgbG0WAmB5Hxobu4sCMaS+2d3a9OVHSSr3dr169rpruqQE+dKNOnJh5RwhhwBgzCEC9940kSebzPH/2vwkQkf0ARlX1GICD65IRPQAwTURTWZY97IqAer3eb4y5oKrfANhWUe8rVb0G4NLi4uK/HQtg5mEA1wH0R9MZEd0MIfxFRA0AUNXBJEk+V9UvAaQR9gmA43me/1ZR+Duz1p5k5pfMrMXvkYicBtC7iVuviHzFzHOR30tr7UhbwZl5OA4uIhMtAjdbjZmvxiKYeaiSZ71e72fmJ5Hzt22pj4yZxyKeBWvtRy2dRGQi2vmPnQaP+CZLPmvt5Vbg/cy8UtYc7aV9I6tFz8RymqZ748WkCTyK4qgR0TiAlS4IWCaiC8W413s/uiGSmX8vlL5Ad3ZfWo2Zs6IM9+KF1Qww8w4ABwCAiGbQnd2XtkxEtwruQyKyvVzoKQchhD1JkpTjP5oIjIgcDSHYKtGSJPnPOXcbwOuIf5aIRgCQ934QwPM1Aowxu1UVhcr5mFBELqrqeaJqrw5VBTN/n+f5uXIu5jTGDACYBd5/CLtmRBSq4FYz4L1fKEugqgMxyDl3UUR+DSFwFdIkSRadc7/Ec6o6UGbQe7+ajZ7IqRGNv2ji9M65mSrBNxF1oCixGmMa64JE5H5xDDN0/xi6gvvuGmFNwOl3WuRkt6KLyCkADACqemNDYJqm+5h5uVA6B6DWhfh91tq/o6v4s3hxTQayLHuoqj8Vfz9l5smtRmfmH4joEwBQ1StZls1t6mCt3cnMC9FrdGwLwc9GPPPFbVvJcaipG7qK9srRx8w/R/5LInKkLfXW2pEmEY9FZLSFkJqIfB3VXJl5yVp7YiOHVk3pEN42pbuiaUdEMyGEP6Om9OOoKY0vqwUiOu6cu9ORAAAo2qhxIjqD6nfDiqpOEtF3eZ4/3QxY+cMkTdO9RTNxjIgOr4dR1XsApo0xUy2f9nYFxCYi2733e4pPM3jvG8aYf5xzzzvh+7DtDRyMOGgkliQXAAAAAElFTkSuQmCC', d3: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOESURBVFiF5Vc9bBxFGH3fDtxG3vm+laIgJ7FByLhIEQLpsCV6OqOEBAk4OpSGAoEEaewmVEgpKEIMlOlAQjINQakRFPwJAQIhYyPZvggB0s5YJF60+1Fk7zze7P3YHFWedNLM7vvee7M3O/cdcK+DDlLEzEfKsjxujJkGoEVRbERRtOW9//N/CyAiswDaqroA4LFGMaJvAawQ0bUsy1bHEiBJkkljzJKqvgTg/hHz/qOq7wK4tL29/fuBAzDzPICPAEwGlzMi+qQsyx+IaAMAVHU6iqKTqvoUgDTg3gRwxnv/+YjBd2GtPc/Mt5lZq8+vIvI8gNaAspaIvMDMa0HdbWvtuX2ZM/N8aC4iV4YY1xEz83IYgpnnRqpMkmSSmW8Gxa818SYmJo4x8yoz/5IkydE+C3k90OlYax+oc6L6BWPMEqrvnIiueO8vN4lHUTQHYAbALBHNN3G8928R0XI1PQpgcWAAEZmtdjsArDnnXm0S7mbtM94D59wrANYBgIgupGk60zcAgDaqV42IFgHkAwKMih0iWqrGraIo2n0DqOrT1TBzzn04BnMAgHPuAwCumi40BmDmIwBOAQARXcd4Vt/FDhF9Wmk/LiKH7wpQluV0d6yq343RvKvf1aSiKHpevQDGmGMBvzPuAES0FXgdvysAAA354w5Q0+x59QIURdFbtaqGT6MRURT5pnE/qOpU4NV7GvcFIhvB+NFhgs65GyJyCYA6526MEPikqgKAGmM2G0ki8k11bGbY39k/DDEzu0r7yz3BasSV3SxyfpCitfYsM3eqM/7sIK6IPAuAAUBVPw7v7dlsaZo+Upblj7iz+nXv/QkAO02izLwJoLubt7z3U008AIestT8T0UMA8iiKTmRZtta9uecJZFm2qqrvVdOHmfnqoJWNAmZ+uzKHqr4TmgMNPyKtVusrImoDsABOx3F8K8/zz+q8OI7XADwJwAN4Oc/znxrMLwJ4o5p2iOi5PM//HiX1XK0bWgYQDy3cxSFmfj+ovyUiT+yjHrDWnquFWBeR9pAgsYi8aK39LTS31j7Tr2BYUzqHO01p2PE4IrpeluX3QVP6YNCUcsDtENEZ59wXBwoAAFUbtUhEFzD62ZCr6lUietN7/8cg4shnfpqmM1UzsUBEp5s4qvo1gBVjzLX6bv/PAUKIyOGiKKaqv2YoimLDGLPpnPvrIHr3Nv4F8KFFFd48BCoAAAAASUVORK5CYII=', d7: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFUSURBVFiF7ZcxTsMwGIXfiyo1kp0DgFhhBXUBToA4QCl3YOvKAdhg6CGQ6EGADkjtRmcQe51skMeSokKT1NCwgN8U2c/v/xTb0m/gv4vfMRtj9khu13kkTbMsGzcOYIzZjaLoAUC0wprned7xhagEsNaekzwDsOELWaEXAAPn3IU3gLX2lOR1TeilpLtPQeQBgH7VAkm9NE1vvo63SqnIo4XvYRGwBeCwBmpRtySfinXdIucYgDeAkQQAmM1mJwBgre2SnAP0yerjI+nKOTcEgCRJNM8s8646UIuhUwC5hzWX9OibW/oHypRl2dgY0yG5U+crruGkcYA5BADvO+4j7y34LQWAABAAAkAACAABoKof+Oh8rLXdhmq9eQNImgDoAQDJpUbyJyoyl1S6Be12ewBg1EThQvdxHA/KJupeRq0kSfYlba5TmeSzc24E4HWdnL+rd5G/bv8ElDA0AAAAAElFTkSuQmCC', d8: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIMSURBVFiF7Zexb9NAFMZ/L66UKj5np7BC2SiVKmBhRWwwpOUPKCxsXVnY2GDIxEI3kOgES7eu0AqB2o3OIAYWkmdHAgU/BhxkqO2cgxES9Jus87vv++nu3cmG/11SpzgMwyUROV1VY2aHSZLsNw4QhuG5Vqv1GmhNKU3TNF32hSgFcM7dEZHbwAlfyBJ9APqqes8bwDl3Q0SeVJjeN7OXPxmJXAQ2yiaY2Vocx09/HZ8rpBK5knveygxOAZcqoPJ6ISLvsnm9zOcq4A0QmhkAw+FwFcA51xORCcCGSHn7mNkDVd0CiKLIJp5FtdMaKm96CKQepamZvfX1LVyBIiVJsh+G4bKInKmqy47hQeMAEwjA+4z7yHsL/pSOAWr1QJWiKFoEngFmZpfjOP7oM6+RFcjCd4BF4GwQBEu+c2sBdLvdlU6nc74kfCEbej4YDHYaB+h2uytmthsEwasoitbLwlW1B3z19fXugfF4PA6CwDLoh865k8CtgvAvvp5QYwVGo9Eb4Cbfr+OWiNzNhW+r6mrd8FoAAKr6KAcx0baqXgc+1w2vDZCDWAc+mdljVb02azjMeA+o6iawOWtoXn/9JjwGKOuBH13unOs1lFV4ORUCmNkBsAYgIkc+JGdR5nlEhVvQbrf7wF4TwZl25+fn+0Uvqv6M5qIoumBmCxU1UyUi71V1Dxj/js+/q2+x0btSEii+JwAAAABJRU5ErkJggg==', d9: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIRSURBVFiF5VcxjtNAFH1vYiuRPZZrECXQguICOAHiAGH3DnTbcgA6KHIIJPYgwK7IstuxiA5E7Th2EzKfxkbeZOyMWScgeJU98/3m+f83f2zgfwe7BIdheJ/knbYYEbnM8/y8dwFhGN5TSs0AqC2hxhgzdhXRKEBr/ZzkMwA3XEU24DuAaZZlL5wFaK0PSb5uIX0pIu+uEJEPARw1PSAiB4vF4s36uGdVRT6uXR+XBLcAPGoRVcdbkl/L5yYlzxMAzgJCEQEAzOfzpwCgtZ6QrAQckc32EZFXWZYdA0AURVJx2mK3GapOegnAOIQaEfnkymvNgA15np+HYTgmebctrtyGF70LqEQAcN7jLnAuwa7QKQNxHI8BIE3TGWDvjIPB4Es136uAOI4TY8wpAARBkJA0SqkPWMuiMUaCIEiKojhz4e1SAqkuSEpb4Lb5OpwzkKbprHxzyfP8IwDYdoWIfK7mexUAAL7vK9Qy4XneYLVaXSX0vE7G7uKBcd0Dvu8rY8wp11rizjywXC6rN5eyxo113okHiqI4W/dAEASJUup2PW7XHiBqR7jv+9ynB5I/6gFs9oH9esDWB/bugfW0lvdOqW7CX3sa/vry0VpPelprZRu0ChCRCwAHAEBy40Pyd1BybsBaguFwOAVw0sfCJd6PRqOpbaLtz8iLouiBiNy8zsokv2VZdgLgx3V4/l38BKnK92H9CFNsAAAAAElFTkSuQmCC', ea: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANeSURBVFiF5ZfPax1VFMe/Zy4mhTnnDJTalBgX1qKbaHVnSv8Ad5Fi60LjptTiSkQobpJFdSWULvzVUOymOwUhK+tfoBt/olAETYX8KKLCzE1oU7lzXHjfy3Xyfsx7xlUPDNyZ9z3f87kzb+6cC9zvQeMkicihuq6nnXMzACyEsJZl2Yb3/o//DUBVjwFYMLN5AMd7mhF9C2CFiK6XZfnzvgDkeT7lnFsys3MAHmjJ+5eZLQN4a2tr67exAUTkBIBPAUwll0si+qyu6x+JaA0AzGwmy7JZM3sWQJFobwM45b3/oiX4bjDzGRG5KyIWj19U9UUAEwPSJlT1JRFZTfLuMvPpkYqLyIm0uKq+P6RwMyZF5EoKISJzrTLzPJ8SkdtJ8hu9dMx8WERuishNZj7cZyIXEp9NZn6wqcmaF5xzS4jPnIg+8N5f6sN6EsDj8TjZS+C9fwfAcjw9AmBxIICqHov/dgBYrarq9T7FAcD1GTchXgNwCwCI6HxRFEf7AgBYQHzViGgRwL0BAG1jh4iW4ngihLDQF8DMnovDsqqqT/ahOACgqqqPAVTxdL4ngIgcAvAkABDRDezP7DuxQ0SfR++nVPXgHoC6rmc6YzP7fh+Ld/w7nhRC6NbqAjjnjiT6zRH9HxsmIKKNpNb0HoBRw8x+AlBH84sicnYcny5ACKE7azOb7i3fje3t7e8AnIsQGYCrzPzqAODubQ8hrO8ByLJsLRk/0Ybee38NwCsRgojovX53Isuy2Q6Lc269lwaq+k1cNkuMsPaLyFkRCTE35Hne7BcmRaQSEWPmr/4F1hCu7LLombYA3vuPsHsnaiIK6e+q+gIAadTYG0VRPCoiO3EmqwAm20IAQJ7nx5l5tnH5ADP/Gj13iqJ4ZKAJM7+bfMGujQLQK0RkuePHzJeHJsTP7GYCceE/FH8z8dmIq22rxLlGN3QFoz2OAyJyNcm/o6rPjETPzKcbELdUdWEIyKSqvpw8cxORO8z8fL+EYU3pHP5pStNluiKiG3Vd/5A0pQ8nTakk2k0iOlVV1ZdjAQBAbKMWieg82q8N98zsQyJ623v/+yBh641JURRHYzMxT0RP99KY2dcAVpxz18uyXG3jO9bWTFUPhhAeilszhBDWnHPrVVX9OY7f/R1/Azn0LWeuNTeDAAAAAElFTkSuQmCC', eb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEzSURBVFiF7VZLTsMwFByHRRbPT74I0ApxCa7RhiKg90GEnoljcIFkUUWpzaIvUgiqlZcoYUFGihJZnjcTf8YGFixYEAERrYloPZTvnLtzzt0PFmfmkzxbLZ+Zt8L1MRNJpEZo9cmZOVOIZwBy4Ya6ruu+3G6hjfxFYGZvrX2egqMt+DKbuMbEZOJ9TIwRN1oTAD4giyuEsDfGHDttr2VZvk1iQExkAN5F0Etz8/1UFMVBW1ONzpCPmvNYDmihHk0AuNISOiHjcQ6sxBjzkKbpV1VVn5p6qhGQRdjMfwgh7AE8ipEEQB7LiVGIbbW/yIBfAnOm4MXCc5wD8x1GrftAkLfqOG5ziWh1qW9sFzRbzAPYaRJO+u6E640xp77cHyCiGyK6HUQ+81fW2uuh/AUL/ge+ASzDm8Gewy44AAAAAElFTkSuQmCC', ec: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKySURBVFiF7VVLaxNRFP5OJnbG5JwxRi2lKzdSaldFFyKCqKDgqihUCv4BEVQq4qYguhJF0Y07d0URuhCqYAuCSx/gi1oQnzsLltjkJqkd0zkunJRL05hJjbrJBwPn8c0535175l6gjTb+M6gZcjab9YMgOAhgB4BOIjJENE1E9/L5/Ie/KSDJzGeJ6AyAdSvkQyIaq1Qqp8rl8peWCuju7k4ZY8YB7I1R72sYhvtLpdLLuAISjQjGmFGreUFVRwD0GGPcMAy7VHUIwOsovymRSEyk0+muuAJ+C2YeFBGNno+ZTGZzHeoaZh6tcn3fv9MSASLyLCr6I5VK9Tegd4jIq4hf8X3/AIC1jXrU3YJUKtUNYFvkjpfL5RcNagVEdDGyHVV9ICJzzHyLmbc2LYCIehENqao+bNAcAJBMJu8DmLNCHUQ0RETPmflYswKyS6REYq4ez0Yulys4jtNPREdV9RyA6SjlEtGNeiJq4Pv+SRHJWwM4HOvFWiREZFhEKlGd78u3o+YLMPN1Vb0GwI9CCwCerlJAaIy5CmAk8l3LrgUzH7ZWXRSR08zcucrmNpIi8j6qu4A6fweJyFRECtLp9L4WNF6CiFy2FrezGk9YhC0A+gCAiO6WSqVYkx8XqvrJcjfUCADQUzXCMHzUyuYR1lv151cSoJbd1DUdB0RU3VJV1Tc1AojorWXHuflig5l3A9gTuU/sK3tJQKFQeAdgKnIHWjWEzNxHRLet0CU779iO67ozAI4AICIadF03dBznc6VSKTTZ12XmXs/zTgC4CaB6qo4ZYy7YxJq9FpErAFZ78tWFqk4Wi8UBAPN23FlODIJg0vO8HIBd+HVy/Sm+AThfLBaPAwiWJ+tOeyaTySwuLh4iou0ANjbTMQzDgIhmVPWx53kTs7OzpmnZbbTxr/ATBDDaS+w3r2EAAAAASUVORK5CYII=', ed: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANlSURBVFiF5VZNiBxVEP7qTTub3ldVs4asEzAg+AtGVCSL3gR/DiohRsnFgAeNPzEQiXpSSAQVwUNQ/DlKMF4kQSUno4goKh5ySPwBCR6CellFMe/NhN1xp8tDupfO7Mz0zGSJoHWqrqr3fV/3e6+qgf+71cZd0Gw2vXNurl6v35Km6Qbn3MLS0lKcVACNWsjMG51z+8xsM4A1PeljZvZKq9U6DMBWXQAz7yKi/QDqFaXvT09PPzg/P99eNQHM/AQRvbm8gOi4mR0iop/NbD2AWwHcU2CZ2SetVusuAN1RRQwj3ygiHRExEekw82P9RDcajU0i8mteZ8z8qqrONZtNf14CVPW9AlREHq2ovZKZ26V6Y+Y2M7/baDSuGLRu4BbMzs7ywsLC7wDWENHxEMJNqDhgqrrHzPb3SS0CeDzGeKA3MfAa1mq1mwE8AgBm9kan0/liGDkALC4uflOv1z93zn1sZieIaC2A9QASAFumpqZOdTqdE1U4pKpPisjp4lOq6gNViwZhMfNOEfk7xzrTaDQuH7qCmV8r76OIhDRNL51QQIG5q4T39rDC+0uFUUSeEZF150OeG4nItznuaQAX9a0Ske+KK+e9v70CtKaqL6rqCxihpTPz3uLlvPc3FvGkcFT1KjO7DgCI6MN2u/3pMEBVvdPMnsv9r0IIHw2rd86dMjt7iZIkuWQ5Xjhmdk3hZ1n2WdUbZVkm/fwhtrZUvzy8XP/a0YfUqGZmxZZ2AZxcIYCIfiz5t60muarOAbg7f/wyxvjHCgEhhJ8AfJ8/bvXe37Ea5CJytZkdKriI6OVyvncL9hZx59wREXk2TdMNE/DWmflaVX0ewDEAl+Xxd0IIRwcKiDF+AKDo5SmAl5Ik+SW/PksicqCKWUQOisgZIvrBzPYBKA7okRjjioG24hDGGJ8mot0AQk+qBuDeKgEAtuDcvvAnEe2JMW7F2aF0jiW9AQAIIbw+MzNzsNvt3kdEmwCsA9DNsuxwFbuZPUxEmwH8ZmZfe++PjvOHNLIx87bS3N82Kc6gPjDQ8j1uEdH2IkZE20UkqOpb4+KN23BIRAIAHpD/K8Z48TiA434BA7AbQNYnlwF4aky8yUxEHhKRbml0Z8y884KQl0TsyEV0RWTHBSUvzHt/g/f++n+F/D9j/wCgRB0t1uX7UgAAAABJRU5ErkJggg==', ee: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVFiF7VZNaFRXFP7OnenEl3fOfSEYR6wg9E8wLkQMutJii6UtYn9w04Wb0mobUIyuXKibblyIom4lVDel0kp2tjSlpUoXLrSlIKWL0KqQFgt5d0aScWaOC98LLzPvZ5JKQfSDYe7c853vfDP3vHMHeNpRWmxCtVr1jTEjlUpli+d5q40xs81m0y3VAPVKZOZhY8wxVd0JYFlH+LqqnqjVapcA6GM3wMyjRHQSQKWA+lV/f/+e6enp+mMzwMyfEtG5+QSiG6r6JRH9qaorAWwD8Hasparf1mq1NwG0ejWRV3xYRBoioiLSYOa9aaaDINgkIrcjnjLzKWvtSLVa9f+TAWvtF7GoiHxcwH2JmesJvjJznZkvBkHwYlZe5hEMDQ3x7OzsPwCWEdGNMAw3oqDBrLUHVfVkSmgOwD7n3HhnIPMxLJVKmwF8BACqerbRaPyYVxwA5ubmfq5UKj8YY75R1ZtENAhgJYAygF19fX1TjUbjZpEOWWsPiMhM/FNaaz8oSsrSYuZPRORBpHU/CIIXcjOY+XTyHEUk9Dzv+SUaiDVHE3rn84jvJ4hORA6LyPI0roisFZFb0WttgQcSkV8i3RkAz6WyROTX+JHzff+1LLWo+J2E2TtFJpj5aMz3fX9DvG/ihbX2ZQDrAYCILtfr9e+yigOYBLAqsb0KwGSeCWPMVLwul8srugyo6nxyu93+PufLTHQUT5q4nJM3mNCfv7xMOjd3RDej97uJvbsdsS6oanykLQC/dxkgoluJ9fYcA1uNMTtUdSwhPmaM2QHg1bQEa+0IgLeijz855+6lKieasOX7/us5JsDMuxMjd3cWT0ReEZGpxEx5IxnvPIKj8b4xZkJEjnietzrPSAYqzLzOWnscwHUAa6L9z8MwvJJpwDn3NYB4lnsAPiuXy39F7psiMl5UWUQuiMh9IvpNVY8BkCg04ZzrutC6mtA5d4iI9gMIO0IlAO8UGQCwCwvvmH+J6KBz7l08upQWoJymEIbhmYGBgQutVus9ItoEYDmAVrvdvlRUXVU/JKKdAP5W1Wu+719ZzD+kntFrExYhaw78b3iiDbQy1otCahP2AlW9RkR/AGir6tWl6jzDMzwEHOsUL38RbDQAAAAASUVORK5CYII=', ef: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANOSURBVFiF7ZZNaB1VFMd/52reR3LPvJYmkSKWIhgoorRa0YUiriyCKEitikgLBRd1LQE3LhWsuHCliAqKYNU+jKuiIghFWrWKXahoIqiRIiLz3ryQzOub42Jm6vA+kol9XZmzuh//c/7/c++5H7Bl/3eTMcW5KgiCR4HDZnYbEADLwKfOuZfCMPzqigmYmpq6xjl3ArhrBMSA59vt9jNAMqD8P3DWG43G3kqlcuvExMQu59zrwB3ZXA84D3wJTADbSZO8s1qtVuM4/qQ/WOkV8N7vEZF54BBQHQK5kCTJgU6n800e23t/SEReBTxgzrn9YRh+XXQqtQKqelREmsB+4OpRGkVkOo7jj4CLAHEcn6/Var8ADwFiZvU4jptFpw1XQFWPAK8VsF8ATTNbEpEG6d4/TLYqZnYqiqL7SLcDQFR1EdgtIr+2Wq1dZZIGIAiCG1Q1VlVT1ch7f3AYrtFoXK+q32Y4U9Wn+5JYyMa7/b5uPQFJkjxLWkyY2RNRFJ0YhgvDcLHX6x0A/syG5mdmZnwBMptDNyOgKiIPZO3Poyj6YD2xKysrfwAvZt3tq6urP6rqSe/9MdLaAThTWoCq3gJMZd2F9cgvBXPuXdJzD7ATeFBEXs55zOyN0gJEZFuhvVxGQBiGi8CTQJP0LugVphMz+6FMHFR1znt/Ki+qIAieKuXYZ5OTkztV9c1CcS711cbgPRAEwb3AxyKypzD8fhzH5zYroNvtRnEcNyuVyg4RuR3Y1uv1umtra58NdVDVOVWNCopPq+pRNjgtJayqqr9lMZcZdf+o6skC+XOXSdof+3ge23t/Yz7uCoAdwP1Z90y73Z4fpwDSRyoldW73gIAkSfaR1YSIvDNm8pF2SYBzTvO2mf19BbhuyhtJkiwNCBCR3wvgm8dMXgMeydrLURR9PyCg1WqdA/LMH/fezzImC4LgBdKbETN7hcLPqHi8utm1CTArIguqOnc5xPV6/Vrv/dtmdiwb+rlerx8vYvrPY817f1pE9uWigLN927OhmVnFzK4Tkb38m+RfSZLc0+l0vltPAKo6DbwH3L0Z0g3srIg81mq1fuqfGPUjct77gyJymPQpnd4k4UXgAunv6a12u/0hQ37EW7ZlAP8Av84KQfLtkqwAAAAASUVORK5CYII=', eh: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEgSURBVFiF7ZaxTsMwEIa/QyhLc97YWHgHFlYkpE5loIJnqHgg3iHd4RFYOndlQUiVOsVmPgYSKaRVVFI3lcD/EsU++/scRdZByn+PtAfyPD8TkSdgDIwicT6BF2DmvV83J043jL7hd5HAdUbAVEQMuP/Ba1eqaqgWvIvIawy6mV0B50Dw3mtnsaqaqppzrogBB3DOFfW+7bmTWJC+SQJJIAkMIZCZ2cWxBDJVLYDLYwjU8NuuokMJ7AQ/lECmqvMG/ANYDCVQn3xSva/M7EZE3oYQaH/2lZldhxCWXYtiCfSCxxLoDY8hsBcc9mzJqhuueckstv1wXS3ZNoE5MN1J/5cRkaIsy4fm2EZXDMyq5xjII7GDiDyb2WOk/VL+UL4A81dna0TsWeYAAAAASUVORK5CYII=', ei: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAN7SURBVFiF5VfLjxRFGP991eMO2anf1wkBV2A18jgqinJwOXswJoZk4+JBl5vh5ImEGA1c9B/wsSzITe6a5SLGq4keCL6PuGqGXeKD2N1jYJd0fx7oGWonM9M9g574kk6qq77fo6q6Hg086CGTgEjuKIpidxRFswAsz/O2c24ty7K//jcDqnoAwKKZHQXw1EAykW8BrIjIxSRJrv0nBlqt1kwURWfM7HUAD9X0e8fMzgN4p9Pp/D6xAZJHAHwCYCaoTkTks6IofhKRNgCY2axz7gkzewFAHOTeADCfZdlXNY3fC+/9MZK3SVr5/KyqrwKYGgGbUtXXSK4GuNve+4WxxEkeCcVVdalCuD+aJM+FJkjO1UK2Wq0ZkjcC8Mmx3AdB8lTAs+6931kJUtWloOcfTioe8C13+bz371clHyC52Z1zjDfsw6IZfBMbcRzvCxtdX/IiyqUmIqcBbI6jFMfxM6r6Yl/1hoicKctTeZ4vDiUg+V3p9G/U770j+ZKqfkHS4jg+PCCnSTIpp+HqFnAgvgPAQQAQkcuo6L33fifJt0j+BuCSmT0P4MskSa4MSN8Qkc9L7qdVdXu3odEtFEWxxznXLf9QJS4iqwBaYb2ZfTAMUxTF9yKyAEDyPJ8FcBMIRiCKot3dsoisjTIA4ES/OIC1Tqfz6TBAyBlqhR+hhfkjxBsicmJA/RKAOyNwIWdPq2cgz/P1XqvZrmEs3vt5ALN91f+Y2YUR4ls4Q62eAedcOyg/OYxIRN4IXq8DeNvM9nY6nT9GGXDOHex6iaKoPTBJVb8pl2GCActwenr6UNl+RVWPo/7x3CSZdrFbjPUlrtzzosf6WRqNxi7n3LNZlh1O0/RjjJ7zXqjqKwAIAGZ2aWhiHMf7SW6UTlcBNOsIVMQ27/2vwVa8N2zcMgJJklwzs4/K18dJLt+vOsn3ROQxADCzs0mSrI4EeO8fJrkeHKOn7kP8zYBnrdxtawHn+m5D5zDedGwjeSHA31LV58Zy771f6DPxi6ouVhhpqurxYM6N5C3v/cvDAFWX0jncvZQ+ElSnInK5KIofg0vpo8GllEHuuojMp2n69UQGgLsHD4DT5fZb94jeNLNlEXk3y7I/RyXW/jGJ43hfeZk4KiKHBuWY2VUAK1EUXaz82sc1EIaqbs/zfE/5a4Y8z9tRFF1P0/TmJHwPdvwLAkhAMp2kMjMAAAAASUVORK5CYII=', ej: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFFSURBVFiF7ZahTgNBFEXPG+qYmVA0DounNTiwVf0NEhwJHiQJv9EPIAGJABQCjUO36UxxdB+ms1lowi5lm5AwV83M3rx7kreTeZD13yXVjbX2QESugD1go+WsuYg8q+pxjPFuCcB7v62qL8BWy8FfNTHG7E6n0wlAp/JhvxJ+LyKvbaaq6g7QB7qq2gOuPwEURWFFJJkvY4yjNgGstUMR6aesdG7aDFlFGSADZIAMkAEyQPkaGmNmqgqAiJx474dtBi2e4zJrCQB4BCZAF+gnmDVoLCIPJUxahBDGwEBVn4D5GoLni9qDNA39StbaoXNOnXNqrV25XX/nJ6zzee+PiqLYTAci0quurS2nLIwxbyGEG+C9rrDUGQCccxfAaUPYpPMY41mdqWkLfnwlRKRo5GtYr+O9P6xOs9/JGDMLIdzSoAVZH/DgaJRHogfrAAAAAElFTkSuQmCC', em: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFqSURBVFiF7ZcxbsJAEEX/XygovHMLSEN6qhyKNhEFoc4lUkbKOeihiOAMadauLJlJEZssYCe7Rg5Swq+s0XrnyTvzdwz8d/E4YK0dqeoYQC9yr4LkOk3TTWsAEXlU1fs6sEApyYVzbhYNYK0dAXg7I7kPceOc24Ys7u/fUh2TrJI/qeoyJivJCYApAO52u1sAcQDwzlxVl1mWvcQAJEmCL/7w+jExSbrQFaD/85J4kZwkSXIcrvWJTgAATL2C9KUicuATv30EVNUHERlWga6+wImPNPlEJwB1PtLkExfvgiuAXwNF9dDQx9+qLLKTvYIBSK4BKD6v46Y+DpEaY1ahi/dHkKbphuSihGidnOQ8dBYAjtrQOTcTkeeyTw+uVK+Pgfp5oTDGrGKSnwCUEFvUDBN+H7eZF5p08S64AsTcBZ34RDBAVz4RPL3mef4+GAx6AO5w3o/L3Dn3WgWiNxKRYZ1PBKiVT/x9fQCgEJOBL3Xb0gAAAABJRU5ErkJggg==', eo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEOSURBVFiF7ZYxTsNAEEX/N5a8xU7nBsERoEORESVngGOk4CIUuUU4SJSkgysgKnfjYgujoWGDBYkUoXXc7KtmRtr5Xzva0QKZzMRwmNR1LSGEeVEUVwDOEmt9mtlbVVWLtm11n4FSRFYAbhIL/2ajqncAegAoYlVEmhOIA8BMRGYxKWNgZuckY/zYdd1LSlXv/QPJ5Xf/i1gvDh85DeW+IsnGe59UiGRztAEAT3EcYzP5CCY3cGgEK5LvKYXM7BLA7VEGzOxZVcd4hn8MTD6CbCAbyAYmN7BbRCQ/BvFSREYTHW7Z3Q2o6hrAZjTVH9aquo3JcBX3zrn7EMKc5DXG+ZS+OucWqton7p3J/J8vEdhKDS0N2tYAAAAASUVORK5CYII=', eB: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANTSURBVFiF7ZfBixxVEMZ/1T0Q0+nqMQkuGzQbRdTAHCQTCJIlCZ6iBwUF8WT+Bc9uzoLmpufdS3JKBA+yEDx5yQZZySQHc1BxwawmIUbW7rfbKkx3eUhP7HS6Z3o25qQfDA3vfVX1Pd43RT34r0Om5HtBEMz6vn8gz/NdItIFMLPY87ytLMt+StP0NpD/WwI8VZ0H3gTmzexlEQnGBZhZKiLXgMvAF865lXGCmgSIqp4CFoAXJ4ichO9F5MMkSc62FdBR1QvAW5X1GLhiZtdFZB2Izex3ABF5Euia2ZyI9IA+0K3Ef+6cexcYjpWrqmdU1Yrfn6q6GIbhccCfdNQS/DAMj6vqkqr+Vcr30cRIVf2tIN8Mw7A3RdFahGHYU9WbRc671X2vJmbPoxatweiq97YRMMI+ERmo6lIYhieY/gpOqOqSiAyA2UnK7kNVrYGbAAMz+1ZEfgY2zCwGKPrBbhHZb2Y94DCgdUmccw/UHCfgh+L7QpP6lnggT1VA4xWIyDXn3EHgGHAGuARstSi4VXA/Bo455w4WjakWnaYNM3sW8Jxzl4qEABIEwWyn05nLskxFJCq4ie/7bjgc3ihacfkaO2b2XAvh91D6z5qqrkZRdJLxZm2CF0XRa6r6TTlnldTWhLeBL81sFbju+/46sBHHcQLQ7XYjYHeWZfuBnogcAU5S4/5pTPgHsHPSMVvifq5pTLicZVnfzD4F1rZRdM3MPsmyrC8iy02kcSbckabpVeAq8H4QBPs6nU4feN7MDgBheR4AnIjcAH4cDoeDNE1vjXKp6o7WskuGGarqB8ATrYMfxk5VXShybduEd0TkM+Binuerm5ubv46rGIbhU57nHQFeN7N3gJny/jQmbMIdYF1ENswsARCRKM/zPSLyTLVgFVUBjR4AvgK+Bk4BT5fWZ4AZs390mhkitcPVL8BZ4BXg1TpCowARuZskyQJwutvt9s1s3sxGJpwTEQWigp6Y2ciEayJyRURW4jgeABZF0YWy4LF4TAPJrSLnQ/6p6wOLxfdxzAOLVWLTUHoeeLuy/qjzQO1Q2vguiKLoPTM7DbzUeM52+K4Yy8/VbbZ5mBwF3gCOAoeAXRNitrjXPVeAZefcZbbxMGnkb2Me+B9j8TcvtHdWkaQn0AAAAABJRU5ErkJggg==', eC: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJ6SURBVFiF5ZaxaxRBFMZ/s3fhMMzbQxMCmkpNIIJBQcHG0tJCLVLZiH+DnaAo/gcSEK3ESi2tbVKpCBYWQmxsBCGJcLuH5MjNs8juOS67e7OLsckHx76Z+WbeN2/evRk47DANuF0RuaSqJ2oXNOZ7kiTvgL1/JmB+fl52d3ffAhdD+MD7Xq93ZWtrK5lG7ISsFkXRHWPMzUDnAIvj8TgdjUYb04jdQAGrqgqAqq7VcY0xL7PvasjaQQKAKDfSNH1VRxSR3AyLbqCAA8MkCWdnZ493Op0N4PQB+/zqnLs8HA5/gBeBbrd77j84B1jKfAF//w1nROS+MWZZVc8Dy1n/G2PMrzaeVPUIcDVrbhpjPqnqZpIk96irE3EcPxQRzX4rbZwDWGvP5OvEcfygjFOahKr602seayvAGOPP3QkWAGx79pw/ICLXReRpv98/mff1+/1TIvJMRK4V1jmaG4VNTVBVB3y1xQg8B6xzLgJuAzjn7gK3gDUgrhDfKAITciGMADbrF49jM1MKXF/ANiWoyoG6CASjID5cQIHcWoA/t7CpegFpmu4AmjXnyjgNBWiapqVJWBWBPSABcM61joA3d0BF4am7jHagNAmbII9e6fnXCvDOrPUReOJLz79WQBRF+aRiBMaFL4Ar6YOsEFUVoVoB/FEtwIzX/wIYOOdeT7zv2wP2i1SOLllR8jYTjjiO1/OLxFq70HS+tXbBu4geV/FCItA2EaeWYah/E/qZe8Nau9nEuzFmyWtW5kClAOfcR2Mm75VHnt0Yqvqhaqzy5Toajb71er1F4EJrz/t4kiTJetXg1G1Za88CKyHcAhT4kqbp54bzDhl+A3U6vxOGz8WRAAAAAElFTkSuQmCC', eD: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIVSURBVFiF5ZYxaxRBFMd/b2/D4jGzYLxGU5pABIOCgk1KSysLK7+GtaL4FQS/grbWNqlUBAsL4WxsBCG5gDuH3JLbZ+FuMh67e7N7SZo8OG7m9v/e+92btzMDF92kgza21t5T1WutAUV+Zln2ATg6NYDRaGRns9l74G6IHviYJMn9/f39bJlwEBItiqInIvI4MDnAxnw+d3me7y0TxoEAO6oKgKo+atOKyJvyeyckdhAAEFUD59zbNqG1thqGVTcQ4MzsuAmHw+HVwWCwB1w/45zfi6LYnU6nv8CrQBzHt84hOcBmmQv4/zVcs9Y+E5EtVb0NbJW/vxORP30yqeol4EE5HYvIF1UdZ1n2lLZ9Ik3TF9ZaLT/bfZIDGGNuVHHSNH1ep6ltQlU99KbrfQFExPedBAMAB974Sl+ABd9OAL64dwV8X1XtB7BQxt4AdKnAAu1p9cBBnSakB85/CZxzE0DL6SpNWAGoc+6wTtBUgSMgAyiKoncFPN/fNGw8bYfRBFZuwqp6tevfCuCtWe8l8OBr178VgBPqlZuwqQFbAaIoqpxSYK1H8hiwC7HCAfDKZoy53DW7MWadk9O2ew+w+m649ByA9juhT/3QGDPukl1ENr1p7R7QClAUxWeR4/vKS2/c2VT1U9Ozxptrnuc/kiTZAO70zvzPXmdZ9qrp4dK/ZYy5CWyHaBdMgW/Oua8d/S6Y/QWhsKDT54dyKgAAAABJRU5ErkJggg==', eH: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAH8SURBVFiF5ZfNitRAEMd/PQnMHDqZy6C44G3xC2QvC3pYENYX8KJ79wF8AAVFfIR9ixVE9CYyqHhxT+pB/Nirgt4ynYEZnaQ8bAIBe7OVTUb8+J86qap//1NVXU3gf4epsYVRFF0QkRUlVwa8TNP0W2sBo9Eoms/nY2C9CRnwBdh0zn3QBvR8L2ez2Y0jbA6wAoyjKDqtDQi9qnq98yICgIhcqyMwxuwUy5z9DypFqDLhFUAlM2ma3q8jiKKoXD4GBLhSiHhurd1M0/RdXby3BEeBMea7c24LeFi8Om6MGVtrz/0WAQUai+haQFXEo4qIp3Ecr/qcD+qBxhCRk9baq+WzMWZHRNbZ74cTInITuL40AcDFyomgPEUVQdYX1EUJ3rcJbp0BEbkEbACBz17NylIEFLP/wUH2ypzwYhmnoBHUGbDWHjPGvAAOm/N7eZ5vTKfTrxpedQaCIFhTbA6wGobhmpZXnYEkScZxHN8DztT5icinJEnGnQsAsslkcruBvwp/TxMCQRzHd4FTdU4isuecuwP86FTAcDi8nOf5LaXvsyRJnmh81SXIsuw1urH7cbFYvNHyqjNQTLyzWn8t/tgmzMtF9Y5viUwtQETeAltw+G2mRcH5C7wl6Pf728BuFxsXeDUYDLZ9hi5/zbwwxnx2zu0CizY8/y5+Ap4DqTypRk4nAAAAAElFTkSuQmCC', eI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIASURBVFiF5ZdNa9RQFIafkynMMNzMqigtuBG1ILgrqHSs0F8gFO3eH+Bilv6IbvovKhTRrQwobcEuXYhFt4q4zR2YEZvXRRMJmon5GhF9YSBzT86bJ+fcDwL/u6wgthSG4U1JqyW9zoBD7/2XxgDLy8vhbDYbA+tVzIBPwFYURadlE4K8wel0+qjGwwFWgXEYhmtlE5ZyqYLghiQAJD0oMjCz/eQy5vyFUohSlcgFIFMZ7/2TIoMwDNPL54CAewnES+fclvf+bVF+bgvqyMy+RlG0AzxNhi6a2dg5d/2PACSqDNE2QBbiWQbixWAwuJJ387w5UFmSLjnn7qf/zWxf0jrn82FF0mPg4cIAgFuZFUG6ijJALi+pjRa8a5LcuAKS7gJDoJMXz1ZlIQDJ3n8wL57ZJ3K1iFVQSbUr4Jy7YGavACRtVj0FUzWpwBBYS37DuiaVK9Dv91eCILhtZhvpmJltOOeQdDyZTD4vFKDT6RwCl38aHpnZyMzeA9eq+NVpQVwQU0GsHYA4ju9I2gZ2M8O7krbjON6s6le5BUmPD5xzmNkIQNKR937uXtAqQCpJx2b2AYglHdX1qQ2QVOJq3fxUf+1O+GOmZ8/4hjorDSDpDbADvz/Nyirx/EW5Leh2u3vASRsPTvS61+vt5QXa/DTLlZl9jKLoBPjWxOff1Xf5ua7ihnsyEQAAAABJRU5ErkJggg==', eJ: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIbSURBVFiF5ZcxaxRBFMd/cxu445jZ6kCM2AkRQVBI0EIU8glikaSXaOkHsPI7pLIxnUUE0VikkQPBJkEQLEQ/gBbaeLzhuAunz+JmZcC5c/duT0T/1d7Ovff/7ZuZN7vwv8tMGVtyzl1R1eWSub4Br7z3n+cG6HQ6bjgcdoHVKsmAT8C6iHwoG9BI3RwMBndnMAdYBrrOuZWyAUtJqkbjoqoCoKpb0xIYY/bD5XfGD1RAlKpEEoCoMt77x9MSOOeKy+eAAhsB4qW1dt17/25afHIKZpEx5kREtoGn4dYpY0zXWnvhjwAEVYaoGyCGOIggXuR5fi7150lroLJU9ay1drP4bYzZV9VVxuvhtKreA24tDAC4Gu0Iil0UAdlUUB1T8H6e4LkroKo3gGtAlhqPq7IQgND7n0waj/pEUovYBZVU2yIM/f8ZoKp63Xv/pUxcLRUI5l1gBTifZdmlsrGVAPI8X2u325cnmBfvDQe9Xq9bO0Ce52uqepRl2Wvn3M4kcxHZZPxyUkql18BoNBplWaYB+oG19gxwJ2F+UjYnVKhAv99/A9wmnPvGmPuR+aGIbFU1rwQAICIPI4hChyJyExhWNa8MEEHsAF9V9ZGIbMxqDjP2ARHZA/ZmNY3113bCn3Mcn/FzKrk1kwCq+hbYht+fZmUVcv6i5BQ0m81d4LgO46CjVqu1mxqo89MsKWPMRxE5Bkbz5Pl39QMNh70ZDdU5qgAAAABJRU5ErkJggg==', eK: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAISSURBVFiF5Ze/axRBFMc/bxO4Q2YGhAMxYBcQBLuAFoIQsLNQIV4p+Af4B6jYGP+C1KJ1BBEFYyEHghZJaSH6B2hhOTPF3WHuWdxeXLi5c38lhX6r2Z193/3Mm9n3WPjfJUvmVq21l1R1raTXIfAxxvizMUCv17Oj0WgAbFQxA34AmyGEb2UDstTN4XB4r8bLAdaAgbX2fNmA1SRVll1UVQBU9fYyAxHZzYcTpguaQZTKRBKAQmZijC+WGVhrZ8M3gAI3cogPxpjNGOOXZfHJLagjERmHEPrAq/zWGREZGGMunAhArsoQbQMUIV4XIN4759ZTDy86A5WlqueMMVuzaxHZVdUNpufhrKreB+4eGwBwufBFMPuKCkAmFdTGFnxtEtw4A6p6FbgCrKTmi1k5FoC89r9cNF+oE0k12YIV59y2c+4xC1ZfRrUz4Jy7pqoP8vEn7/27Oj61MzCZTGxqfGIAbakygDFmy1r7TESOKpuIrFtrn1prr1f1q3oGBHgOnGLafmfaZrqYW8DpKoZVM6BZls1qfDE2A1DVtxX9qm+B9/4Of7pdUXsxxrla3zoA8y0XYC+EcBMYVTWrWwfGIYS+c+4hoN77J8C4jlGTUjz23j9qEL8U4OiEF3t8Qx2WBlDVz0Af/t7Nyir3nFPyEHY6nR3goI0X59rvdrs7qYk2f82SEpHvIYQD4FcTn39XvwG/xqtlrTIddAAAAABJRU5ErkJggg==', eL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFySURBVFiF7ZexSgNBEIa/iYGk2E0VEAN2giDYBbQQhDyBjab3AXwAXyNvEUFEWwkINqa0EH0ALWx3i0RMxiJ3cODmvMslFnp/tbdzM/vdzM4uB/9dkmKrWmv3VLWVMdYEuPfevxcGaDabdjweD4B2nmDAG9Bxzr1kdaiEJkej0dkCiwO0gIG1djurQzVIVansqioAqnqSFkBE+tFwyuyDYohMmQgCkMiM9/4iLYC1Nh7eAAocRRB3xpiO9/4pzT9YgkUkIh/OuS5wFU2ti8jAGLPzKwCRckMsGyAJcZ2AuG00Gluhl+ftgdxS1U1jzHH8LCJ9VW0z2w8bqnoOnK4MANhPdARxFyWATMhpGSV4LuJcOAOqeggcAGshezIrKwGIzv7LefbEORHUKrogl0qAEqAEKAFKgHl3wTQeJO/4gppkBlDVR6ALP99mWRXF/KZgCWq1Wg8YLmPhSA/1er0XMizz1ywoEXl1zg2BzyJx/q6+AN2PcMbJScEeAAAAAElFTkSuQmCC', eM: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGkSURBVFiF7ZexSgNBEIa/iUJS7KYKioKdKAh2ghaC4BPYqL0P4AP4Gr6Fgoi2ElBU0NJCFGtFbHcDiZiMhXdw4Oa8y+UU1L/a27mZ/W52ZpeDvy5JsY1aaxdVdTJjrC5w7r1/KQzQaDRsp9NpAgt5ggFPwKpz7j6rQyU02W63twdYHGASaFprZ7M6jAapKpV5VQVAVTfSAojIXjTs8fFBMUSmTAQBSGTGe7+fFsBaGw+PAQXWIohTY8yq9/42zT+4BYNIRF6dc5vAYTQ1LiJNY8zctwBEyg0xbIAkxFEC4qRer0+HXu5XA7mlqlPGmPX4WUT2VHWBj3qYUNUdYKs0AGAp0RHEXZQAMiGnYWzBXRHnwhlQ1RVgGRgJ2ZNZKQUgOvsP+tkT50RQZXRBLv0D5K4BY8wY4aLrquplq9V6LhVARM6A4HUrIg/ATJ54g2yBDmgLKncGUvq+q6oXpQN81fd59eNd8A/QrwZ68SB5xxdUNzOAqt4Am/D1bZZVUcxPCm5BtVrdBa6HsXCkq1qtthsyDPPXLCgReXTOXQNvReL8Xr0DjLOKaqibnOUAAAAASUVORK5CYII=', eO: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGUSURBVFiF7ZSxTgJBFEXvW2Ah7LxHh5Fawdhg5x+oiYnRgvg1FmjwB/gKtdAYI1YkltKQ2FhYW9gylSKMzRCJLssCI4Vyk82+nbnz7pndzAL/XYlZFgdBsOH7/lK32311BTRJeJmZe8zcC4KgPG0fb9qFRFS06z1bzxfAlRYAC4AFwAIgLkBKRHaVUvlxRqVUXkS24/aOZWLmmjHmhojazFyK8JWIqG2MuVNKHTkDANC19wKAZhiEHWtaDzzPc/cGtNZVAFdDEPcA1ocsxeFwAI1Op3MapzfFMVn5zHwBYM8+9/G1geH6WmtdAfDuGmAAcQZgf8R8Q2t9AOBtwr4TQ1wys/l23QJI/2ZwFITz8EQul9sac+59ETkWkSoAf5Qpm80ui8gOgFTsdBE5sTt7is8cLmZ+tr1qYfOjjuHgnK/NCgBgBQCIaHUSgLkpOWK8PyiUUhVHWb3YAMaYRwCHAEBE5y7Sbc8fCv0E6XS6DqDlItjqIZPJ1MMmov6ESWbeNMYUIjxjRUQvWusWgI9Z+vxdfQJPeVnnQXq+GQAAAABJRU5ErkJggg==', eP: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADtSURBVFiF7ZYxTgNBDEW/nXSw3jvkLiBExwkQBYdApIsScQ56SoQEV+EU3tku8qdCQsuMROEqzCu/R/Mt+Vsy0On8d6Shr8zsMiLOM0xUdXb3dwDHPzVgZjuS2wzzHxymaXr81VyySRMRiareeL8ys4uIGDLMVbW4+wcqI+hURzAMww2AZwApWwBgJnlbSnlZFlohvE40B4AzEbmqFdY1UVUPEaEikhJCkkVVnzL+Oj2qIRzHcRMRWxFJyQHJWUT27v65rFUzEBEPAO5IZvh/N3EEcL/UW1vwCmBKcwcKybfE/06Ifg/0e6DT6XwBCd5lXZndpl0AAAAASUVORK5CYII=', eQ: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMxSURBVFiF7VZBixRXEP6qBx2dru/1miwShkBUBHNIjBtITrkkshIvi4mH3KOCIApKDp5y1IMRUYw5xCTXHJackkDYQ3AhgeSyPyAYCISJEYIzO+1knaVfedjXayPTO92zBg+moKGq31dffdR7/bqA/20T1mq1Zlqt1sxTKe6cO0PSk8ycc6cn5WlMkkTyPIBPAEh4DjebzfvD4fDn/1yAqp4UkSshXAXgA8+hZrP573A4/KkOn9QBkzwCYD4UXAXwgZmJiHwNYAsAA3C83+9/WYe3kiVJMkvyAUkjuUryvXxNVY+Gd0Zy6Jx794kWd87tJdkNBUxVTz2OIXk8XyfZJ7nvSdXf5pxbKpBfKAOSvJjjnHNLALZturqqXiuQLgCINoBHzrmFQqeujuPf8BAmSfK69/5XrB26jpnNpGl6d4zgnSKyBKANIMuy7I3BYLBUqngDrsh7/2koDjM7Pa44AKRpetfMzoSw0Wg0boypM9pU9f1CK3+om0/yu8K5OVKGK1UmIudy38w+qivAe3++EJ6tlZwkye5wzxvJxbrFcyO5GDj81NTUS6MwIzvgvT+IcEBF5PNJBYjIzdzNsuxgZQFmtn8dEEUTd6CYa2avVRYA4Lnc6Xa7fwFAu91uOecOT09Ps6qAbrfbKYTPVxYQRVEv91U1AYA0Tb8ws+9XVlbmqwqI43hHIbxXWYD3fl25iLwMAGa2JcSHVPWdKgLy3OB3RmFGChCR4r7PBQHXC+vfkDwBYOsYAXOFsNZZapD8O3xCXZLTAKCqVwqXi5EsHT5UdSfJXsDdQdl2l+RnAC4HPxGRGwAkTdNzZvYxgGFY212SLyLyGQAX4ktYm5xq2XaStx/7szUAII7jF1T1lKq+MiKv4Zy7XujSb5j0txzH8athuMjJfozjeOT3HPAHSN4q4JdLRK7b2JlQVd8WkXk8uhs8gF9EZMHM/gAAEdllZrMA3sSjbf3HzI6maXprUwKAtZHMzL4C8FYVPIDFKIo+7PV6t8cB607FcwCOAZgFsL24ZmYDEVkAcLPf739blbOWgNza7XZreXl5TxRFLwKA9/5P59zvnU5nMAnfs20PARXVDsPlnJZ7AAAAAElFTkSuQmCC', eR: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAG/SURBVFiF7Zc9bxNBEIaf9cl24X3dIT5EnUhISEGipYCCEkQBKfgr/B4koCB2QZCQjBAFv4EeHCitdQpO8W4K9uKVc+eQu3MaPNJJt1/zzM7OztzB/y7ZpvQOh8PH3W7X5Xl+vCFGpfQkjSQFST8l7a6b3NkA/C3wJLZvAV+stXeqFpiW4e8S+ILlEU+BR86576uL2vLA6s5/e+/vAwexfaEnmsIP4pkHSb8SUE/S+4oxoLkHCrc/TfoWxphFfM+dc/vAOLavG2M+WWuvtWFA2ZnDX3dPkujPvfev0vEsy/aaGrAKP/Le32O50zMjJO12Op2PLANyPJvNJoWiOrfgHBx4GCN8dWyaGAQwds49B/Ia3DN4VcClc9LAK54PQL8uuFA8ShROq7LcYDC4K+kkmTsCek3hF+0cAEk7MQW3uvMtfAu/MjjW2tf/ctVilpu2edUKxcX9PboKeFktyACMMV/LPiAk7QAT4GbsOnTOvaBmer1UMYrwzyxz+6Fz7hnwpw78UgZsAg4l1VBSiK8/jDHfiv4QwgPgRmw2rmrrDDhh/f9Ca3DKQP1+/zawx/njWYQQ3szn85dtwbeyFYBTlqfZ5m3S9vAAAAAASUVORK5CYII=', eS: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIISURBVFiF7VY9ixRBEH1Vp25wXYNodoiB+BsEEwPB1EQvlvtAA/0BgoFfcGYGJiIumBn4EWigoIGBiampiZmhx3T3JbLbZeCsjrPdsz2zewayDwZ6uqrrvZ55/QEsscQ+QEQ2RKQ0xjwFcOhfk2+KyFhEtHreABik8ilR5CgRnQohmFicmfeste8AjBrjtgE8AsCNIa+dc+sAfswUYIw5Q0SvABxOqa6w45y7kSAPqnqHiC4DWGsT0VQKInqQQQ4iCilyAFe897cBnAXwrUo7b4x5MlWn2SEiIwArAD6p6v0YOTN7a+17AKMYuXNuOMk1xtwkolvV665z7kjrzCbmKYriWWvir9ztmuHGlZi2+EazxoFZJC3km/gzc1XVa9774Yz41C+Y8kAH8se14le99w9z43MJWCR5ZwGLJu8kYD/IgUwTGmMu1IpP1nndcLF9YBir1UTWF2Dm9VruX+u8ZR84KCL3RGQHLRPNXYa/hWaSoyiKc6p6vWp/tNa+bS3cFbF1XhcXQlittaOHGtBjIxIRbXRlG663AFX1iVAnw/UWwMx3QwhKRFLrHocQXnjvX/YlzxZQluVXAFvzEKXQ24SLQuwL7AFYVdXTOUdyCqp6bNJm5pSHoheS5wAu9iWO4DsznyzLcjcWXGl2DAaDDwBOADiO+a7UY1X9TESXrLVf5qizxH+On8KhILLy/iibAAAAAElFTkSuQmCC', eU: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJHSURBVFiF7ZY9axRRFIafc3ckS3bv2KRR8xNiQJCgEZtERLEULERIJVZGrFKIoIVgbRoFwc4iwSYIYmkgxMROLQQFQUUILCy5Z8UJTDw2M8sQ87Gz5qPZF4Y558yd87xz595hoKeeDlhSTAYGBnySJJPOuSGgssusdTP70NfXN91oNHQzA5H3fhE4ucvgjVpW1TNACuDyqvf+1D7AAUa89yN5EuWBmR0RkY2DP0ZRdKnZbH7rhtTf33/UOfdSRE4U62Z2LI/dv7cBsJadh9I0XajVasNl4bVabbhSqSwV4GubjdvKwCQwn8WDzrmFOI4vloCPO+fmgcGs9NbMbndswMyaqnrezJ5npbqZzdXr9Rs7wb33E865V8DhrPRCVceARscGMq21Wq1rInI/yyMReey9f8iG7VuATwHPgEPZgzxS1SvA760g2xkAsBDCPeA62bYBprz3bUhuznv/BMjNrYvIzVardQv4sx0g2u5iLlV9GsfxdzObBTwwEcfxYKVSuRxF0XqSJDNAvkZ+AVdDCHOd9N5pBtoKIbwWkXPACoCZjadpOp8kyUIBviIiY6raEbyUgczEsnPuNPApKw1nB8AXETkbQlgu07OUAYDV1dWvzrlR4E2hvGhmoyGEz2X7dbQGNjHRBC7EcXwHIITwAEi66dWVgUxJCOHuf9wPdPEKdls9AwduoL0IReRnIZ7x3u8ZVER+5HF7BlR1CSj1EelSS6r6Lk+K2zCtVqvjSZJMishx9uan9H21Wp1W1XTn4T31tE/6CxL1xn9nKGU5AAAAAElFTkSuQmCC', eV: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFKSURBVFiF7ZSxSkNBEEXvmmeat3dra4ONku8QP8DC0qCFaOUPCLGwFkEQBD9BtM4vWApioZVgbaZKTMYiA4nxmWQTfQF9p5qd2d17h10GKCj475Ry0lkMIawnSSLtdlty0uxD8oSkknwcri3kYcA5V7FwZS4GRlEYmMgAyW2SbyGE89wNkNwBcAmAqro1jYiqli1sRRkw8Qvb1wVwOIW+A1C1+GW4mIwQrw2Iq6oeiMhVrLo1sWzLxqSHaiQ7Njy63vu9WGEAjuQuSbF73r33a182DSe892fOuX2rKYA759xzjLK9eRX9zqGqRyJSH2uAZDcrPwMdVa2LyDF6DX0i6w88Aahk5GNooffhGqp6KiL3MYfLJK/t3ZTkq/d+dUZD0RQmBk3cDJh4+GmBcaO41Ww2NwHc2vrbwfXblEIIG2maLs3LQEHB3+UDE41kfwXTtSgAAAAASUVORK5CYII=', e_: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGZSURBVFiF7Ve7TsNAEJw1Ic0yV/IJdDzERyARpaakIBE0fAAVEhKQT0C8GkpqIgq+gjZ/gERlO1XCLUWcyERxCMIXhGCas7WrnfGdbnYN/HVIoLoV59yW917HA2bW6Xa7z0EFkGwBOCoIe+/95lBEFEIAAJsSi0RkZfQSgj1JkmMRqZnZDoCHabmhdqAfx/GjiBBA7ScEgGQTwHXG4VGwE0EEkNwDcJnVNzM7NLO7uQgg2cDHL99P0/QiiqJ0RJp7Lp2c5BtJy9ZmLlwheeacOwVQKZ1cVTemkBeiTCUeg/vvAewnSXJbYu3ZoKqrqro2d+J//GosfCVZVTeq1epyr9d7CSWoEDmT6avqall1Z7LizFSusnxBoEFmkWSL5DlyBkWyOeZwjRDkcM7VMhJzzm3Pi3x0BPkB0nu/NKmlhrDXib1ARHYxmGSGLfUgTdObsskLBQCoZ6uZ2WEocuDzW9AG8OqcqyFED59BQF1E7s2sTfIkqAAz62Bw3hMhIoWx7+CDoajqev6nYYgoitI4jp8A9EOI+Nt4B7P6jbjHgiIKAAAAAElFTkSuQmCC', e0: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGzSURBVFiF7Zaxb9NAGMXfcx07ie9LZphBMHZjYUUVSEwosLdI/TtQ4S/IhKj4AxiYurCyUZhYGFhgYKESErl08Mnh69BLFSV2uNoEJOSfZNm6+/zes8/yfUBLA7Is286ybPufmIvInojM/LFXV2erpvkugBcAIgAEcD9Jku/OuQ8bD7BkPock7yVJcuKce7+xABXmjUKUCVWZP14w/wXgaGH6yI+R5NjXBsGQImPMA5KvFsz3VfWnH4OqPiQ5BPB8XqOqo+l0+vp32kFvgOTdRXNr7eFyjR/b9zURyZ0Q7TikqCiKJ3Ecz1T1zbqnstYeGmN+kNwpiuJpiHZtjDEjEVERUWPMqK5O8Ee4KdoAbYA2QBugdoAoiqZl15elqh/YGg6HdzqdjnXOnZYV5Hn+JU3TmOTbyWTyEueb0Ar9fv9Kr9e7nef516qaFQaDwYH/z38KumENIvLZaz0rm69aghv+fLNpAADXAIDk9csE+GtU9QMXa9Vkq11iFhxAVT8CeAQA87arKV5zhdIlSNN0DOD4Txh73nW73XHZxLqmNBaRW6p6tYkzyW/W2mMARROd/5czgLKD8+CEljMAAAAASUVORK5CYII=', e2: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAH9SURBVFiF7Zaxb9QwFMa/5wI3xC9CYmGoGFBHBrogMcBaYKZzRasiVfAfMNNuHViQQKfudGJCgoGVlbKxsjCBLna2nj+WRMolzl1ylwXot8Syn/377GfHBi70v0uGGMRauy0iJwCSOWFTACfOuf1qpRnCgIg8WAAHgDUAT+qVl2KRqnpNRO6EEGys3RiTZ1n2EcB5YeCIpBGRGRMk7wG4XjMxa75eYa29LyLvAVydMxsAOHTOvWhrVNU9AG9QW2Xn3AyzkQIRedUBDhEJHeEBwM+22FgKbhXfLySPY52MMT7Lsk8d4U9FZIvkdlcDawAgIj+cc6dtzlvguxU4ST733o/TNN1q6zPIKajA31bgz7z3rxf1G8TAsnCg5Rj2hDdy7r0fV2NI5kXRD2ogBnfOjetxIvKS5DnJD10GpaoyTdN3C+J2VXVaxAdr7cEyk1hqD6yS85UNFMtewgOA/Rb4ZVU9UtVD9En1vBSo6l5l2aeFmajSNH1UGethW1znFUiS5DY6bLhSIYSkUo5ear0MFFB2gfdR59zkeX6WJMkmAMnz/GwIeC8DhYlvQ4FLDXYX/LUGYinIASQk7y76G84TyfWybIxp3AGlGk8yVT0F8HhZcES/jDEbk8nkd6yx8UgcjUafAdwEcAPAlRXAU5JfRWQny7LvK4xzoX9cfwA/5cbE0DVGGAAAAABJRU5ErkJggg==', e4: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALxSURBVFiF7VZLaxNRFP7OJLFK7ndTsbpxoS58QF20Cu5E8IGoiA98gYjuxD8gxboSrf4CXbhQUSgqYtGFqCsRN4K2Kgg+wMdK6qPJnQmakM5xkalOp0lNoq7aD+5iznznnG/mfvfMANOYxlSHtJJEsgPAUgCzo9AIgFe+73/5bwKMMZ0ichDAdgCL69DeABhQ1YtBELz8JwJyudwiVT2tqnuaEKwiclVEjhUKhXctC7DWHlDVswBMLDwM4J6IPAXwBQBUda6qrhCRDQDmxbiBiBxxzl1pUPhvkDxDUseWtXaQ5DYAqUnS0iS3kxyK55Lsa7Z5Xyy5RPIoAK+JEimSPSTLsTqnGso0xuyNJQXW2o01OJ0kB0gOR2vAGNNZg7eWpIu9xQNJzjgPtLe3LxwdHX2B6p6PisgW59zdOMdau0pVHwCYmaj1Q0TWOOceJ/ibVPU2qlsXpFKp5fl8/sPY/XH7mclkzgPoii57fd+/lFScyWQuiMjSZBxAWlUXlsvly/FgqVR629bWVgGwDsAMAPNLpdL1CW8gm812eZ43CACqOhgEwSoAlWQXkj7Gn4o4At/3WUucMeaxiHQDQBiG3cVicQhozlh/Bc/zah75XwKKxeKQiFwHABHpjpw/Aar6qF6TeveMMT2q2hXVvjb29MBEEy6ITEhUTbjVOXcnzsnlcivDMHwIYFaiz3fP81YXCoUn8aC1drOq3kLVb346nV4+MjLysd5DIBokIUk1xhSttZtqcJaRvEHyU7RukFyW5GWz2fUk/egYhsaY3XUbJ1SfjM2CMskeTD4Bk0gZY3rjg8hae6KJ/AkilOQzY8xOAJlJ0jLGmF0knyfGeN3mf/oY7VfVc6h6YgyfVfW+iDwVkc8AoKrzYh+jjhjXF5HDzrn+lgQA1elYqVT6RGRfI/wIoar2p9Pp4/l8/v1kxIZ/SCKTHQKwA8CSGhQF8BrATQAXfN9/3UjdVn/J5kQi5kShryLyyjn3rZV605jG1MZPkGsaaYsDqdIAAAAASUVORK5CYII=', e5: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANcSURBVFiF7ZbLixxVFMZ/p+2pU0PXqW4JiWIWUYOaRaIZt0FdxAfCBAZFERQkZkDwDwjBtQquXcigEnQhmCguFYWAKLgQx+CgBjIuzCJIYuixejrpe+2e62Kqpbqmel6gcTEf1KLueX333O+eKtjBDkowszkzy8zs+M0ikJlZMLOBmc3+2/VuKS+o6u/AMaAGTKvqZe/9fNEnSZI9qvqgqk6p6j2qultVb3jvr2+VgFQt5jufy0msAC93Op13C/YZ4AwwUQq9CHwaQnh/eXn5580QWNMBAO/9vKpeBqap6IT3/oKqLgBPl3LsAo6IyCtxHB+I43jeObe0ZQJDElEUHRCRQ6x2ag2JOI4/F5GvgW9CCH+IyO1AI/c/GEJ4KY7jS865hc10owgxszdzMRafjYRZN7OZNE1/KMW9vqUO5AGn8tc+8CFwkHWEmWPFe3/BOfeOqt4AHslrPBTH8YRz7tyGW0/T9IUh8yRJuo1G42hOajbvwKavaJqmT5jZciHfs+sGNJvNuwtz4K9ms/l40b5NEk+aWT+P6bRarX1F+8gRRFH0HvBA/vpqlmUfFO25MI+IyH4qhFkF59yiqvaBo0AE7HXOnV3j2Gg0Dhda9X2ZXKELmW1NmAD1JEnmhzGNRuPw0FAbEyCMGVIV6zVgbrtj+x8C3W73vIicBRCRKTM7OSbmizF5xpIws5MiMpXnPtPtds8PbSO7abVa+waDwQJgwEBEjmVZ9lnRp9ls7l9ZWfkOuLWi1pqxnSTJbhH5DZgEsnq9fqjdbl8a2kfOudfr/RlF0a8i8ky+q5l8nC4OfZxz7cnJyY9DCHcAtwH9EMJXInIX1WP7uqr+BDwVQngxy7Jvq7o0gjRNXyuIzJvZqTLZMja6omZ2X1VcZVLn3Lk4jieAh3OfR1V1JoqiK977RVZbPYL8il4RkWmqvx3XqmqNUzoAaZo+H0J4m1VNDHE1hPCliMyLyNUQQi2EsLdWq90fQniMUW2s0cSWCAC0Wq07+/3+GyLy3Gb8c4RC/nVJrHuuAL1eb8l7/4mqfgR0gT2sfvercBE4DZwAfmTM/0QRm93RCMxsF3BvTkSANvBLp9O5VvIr/1nNdjqd09upuW2Ubkf7Py1eIHHczJaSJHnrphDYwf8afwPVpGlWbfNSSgAAAABJRU5ErkJggg==', e6: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAN1SURBVFiF7VfPixxVEP5qunsy3Vv1mtmDoMmGMOyCOxFEAiF48Oaf4EEPYTVqjpJTvOQggiBCiCcxESJ7kYTVg5iDQg6CHjx48AfrjySjRJeErGayr4edsbeny0N6TDsZe6Y7Qi6pS/erV99X36t+1HsNPLD7bM49YGvMfKJerz8Vx/EXAPT/EjWTMfNREVERUWY+WpWHKuI8EfkZwD4AIKLfrLVLAP4qS1Srkp2ZXxwlBwBVXWDm56twValAnZkvEdFeAIPM11DVq71ebwlAXIasdAWY+UiWHKp6WlXPAAAR7WXmF8ryla1A/tsPkiRZJKLUcZwrAPwqe6FUBZj5pSw5VPVMv9/f2N7evqaq72W+BWY+UoZzUgV2MfMigDYRtQC0iKilqi0ArSxmkCTJYr/f3wCAIAgeHlUhm+8C6BBRR1U7ADoA1l3X/a7b7W5NFGCMmVfVzwAcmKZaVU/1er1jeR8znyKiV2ZY9Ne1Wu3pra2tLpDrhK7rPklEr/4HaBPANwAuEtH7URS9CSDJB8Rx/Hmj0fgDwHUA2wAaAOYmcD2SpumncRz/Oj7hiMiFUXcTkcQYc7jZbIYzrGqiNZvN0BhzWESSHO8FFBwBdRH5KBd8Y25u7vGqApi5LSLXcnyf4HZlCs0TkbUc6KYx5mDZ5EEQPCEimzmejwHsmhXviMhqDnzLGHNoVnAYhgdE5M8R3hhzDoBXdhF3ifB9f880kO/7CyJyK4dbRcE3L2pEwyiKVgCsZePQ87zHpgnwPG8/gNHGXcs4hlUEAECqqhu58eVpAgBcGb2o6u8A0qLgWVrxcvYcWGt/mRZsre0A6I9hqwsgonb2/BG5UjLzsoicFZGzzJxPNCSinzLM/nsSMD8/bwDsBoA0TdcBwPf9PSLyLhF9C2AFwAoRfW+MOR+GYSuL/SGj2D2tkRUKSJJkGXfOi00ROem67mUALwNw8zyq+kyapusichLAjcxPw+Hw0aIcbtGkqv5T2gkHzSVVPZHNvQ5gCbcbzTEiGuf4qpIAAO0Jvg0iesta+w7uXL8+NMY8p6qvIXdXzKxwI07bhA/l3m8COB5F0ZK19m38++6XWGtXoyhqAziexU7iuMsKf0x837+apum+Wq32geM4z1prL2LsGB6zJI7jL4MgOA1gR1UHaZq+sbOzc70ozwO7r/Y37/I+nJLTQioAAAAASUVORK5CYII=', e8: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAE+SURBVFiF7ZYxSgRBEACrx4MN3N5AA8EHqKEKBj7gfIWpfxDM9RN+QQMDgzPX6PQB+gTPYEYRDpkxWUT37uyVPQ1kCjaYnmG6oWeLhkymBaq6oarnqvpUf2equj6Pu6VF8jXgBlhqbI1EZNd7f/8bBfSqqtqLMS4CByLSB0gp3QKIyHa9HgCnVhLn3Iv3fgC8tSpAVU+Aw0Z4GELYASjLcigiW1biBschhKOJ4mYcThOBlD6Kdc6ZrWsiInFqfMb5XlVV/RhjydcW3DnnJKW0Wa/btuDZe39F2xZ8pn6E18ByY+uxfoQP1h3fsWAdGI/Ho6IoLoBVYAV4BS6B/RBCpz9gbnTxxI8f05TknTzRxgMWpifm5QELyxPdPGBheaKLByxMT3TygEVXT5gesPgTT+R5IM8DkOeBPA9k/jHvD1zzLv9k5JYAAAAASUVORK5CYII=', e9: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADxSURBVFiF7ZMxbsJAEEX/DHR47Y4jwCWQ0gVExwk4SpQmyjnoOUBSIoU6dAhygLSW7Qp7J1UkC63tNVrRMK+c+TN/tDsDKIry6JAraIxZAdgAiAL5FCKyzvN8e53ghoJlQHMAGBHRwpUYuoLM/GatZSIyIdxFJGfm9xC9lOA4r6BOFEVjADMAg569KxHZF0Xx2yZyLmEdItoBmPY0/689A5i0aZrOsI7cYu5b2/kCIvKE27/gq2eNcn86z7DGII7jV3RstYj8ZFn2AuASdIAkSZ6ttR8+Wmaep2n66aX1HaCqqm8ARw/pqSzLg29fRVGUPzmxQUC0fBYJAAAAAElFTkSuQmCC', fa: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADxSURBVFiF7ZMxbsJAEEX/DHR47Y4jwCWQ0gVExwk4SpQmyjnoOUBSIoU6dAhygLSW7Qp7J1UkC63tNVrRMK+c+TN/tDsDKIry6JAraIxZAdgAiAL5FCKyzvN8e53ghoJlQHMAGBHRwpUYuoLM/GatZSIyIdxFJGfm9xC9lOA4r6BOFEVjADMAg569KxHZF0Xx2yZyLmEdItoBmPY0/689A5i0aZrOsI7cYu5b2/kCIvKE27/gq2eNcn86z7DGII7jV3RstYj8ZFn2AuASdIAkSZ6ttR8+Wmaep2n66aX1HaCqqm8ARw/pqSzLg29fRVGUPzmxQUC0fBYJAAAAAElFTkSuQmCC', fb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIcSURBVFiF7ZU9axRRFIafdyIRyd79wIgBgx8BwaQREfwgjTaibQgKgoU/wMof4N+wsdUioKBdGoMkxI9KiQQiBBEViYHBPZMtZGaOhausZmfNmtU0+8JwmXvvOee5cDgv9LXDUrvNarVadfdT7j6R5/lhSXuAQSAGXrv7syRJloGs5wAhhDvA9SK4Fq1LmnH3u2a2AHivADIg6iaJu78D7gMLkl65ezwwMJBKqqRpOibpBHAMeGhmj/4E8OMlLyTdcvfVKIrWmoX25nl+XNIkMAUc6gYUqJtZZUsAkmbq9frlDskUQpiUdNXdp4F9WyEws19q7tpKUIHczOaBeeBGqVQal3QaOArUmnfW3f2DpGvAmXZJtgPQqixJkiVgqd1huVw+5+5tAbpqtn+hPkAfoA+w4wCFg8jdz4YQHgOjwDDf3S4GViQ9z7LsycbGxhzbtOROk3C0+bWqBoy5+8UoigghfHL3GUn3zOwpf2HJndwQIAFWJa01/4fdfRzY3SbXe0mLeZ6/lPQZwN33SzoCXAJGYLMZdQJ4YGZTbQoNhhBOAtPAFeBApxf+JjOzcutGYRNKSguOvprZopndNLOD7n5e0m1gGcgLYmJ3n5W0yd6364Z5kiRzwBxArVarpGk6EUVRKU1Tj6KokWXZ20aj8bEoQa/sGIA4jr8Ai93E7Pgc6AO0A3jTXFf+J8hPDQ0NjVQqlQv0uEH7KtI3797VBBWSPSYAAAAASUVORK5CYII=', fd: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHMSURBVFiF7Za9btRAFIXPvU61Y487XgAS6ALkGQKUNNQgngIpSCkiEV4C0dBBaJGCRIEEDVKAlkAP5XhmtsnOvRR4kdldO7HTBX/V/Ojcc6Q7njEwMvK/Qy3ra9baWyJiFjeyLPvhnDsCAGPMdSJa72PY1LcGKIpiH8CjlhqaUtoiImHmIwDcJ8BcP51OP6NDrF0ViKhz/zSa+q4WbItIvpRM9TjG+AUAjDGbRLTRx7ypHwEaLcjz/BIRvQdwdWCtBOCF9/5Bnuf3iOg5gPlXFFX1fgjhYFH09xBmWbZ5DnMAyADcBQAiutMwBwBTry2xNh84595Za/cAXBsYIInIqzrAvqoyERkAUNXAzE8H1r3grLwHrLXrqrpDRJMetZKIvA4hvOzSq+p37/0ugJPWAEVRPAPwsIf5nMp7X56mZ+bbzrlDoOUqVtU3AEJP8wTg4Az6b7PZ7GvP2heYf85AWZY3U0qX62lS1Y8xxp8Asvr/YOlxOgvMHKuqOgQwaw1QluWWiHxaCHXsvd+w1u6p6uMh5g2eeO93lsI1xqve+HO9+02ISFauNyeTyeQGM1+pp0lVP8QYf+FPC7ZFpBhizsyhqqq3WNGCkZGR3ymZvy7TGtEQAAAAAElFTkSuQmCC', fe: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFDSURBVFiF7ZahTsNQFIa/0y2homfLkhkIHgMJArEZBCgMbjwAD7AHwPIIvAUYwOAwCDJwoJYgCfieiYaMHQwdy5It69gycz/135v+PV9uxS0EAitGRhf1el2zLGtHUbQNlCZ0ummangNfixYoq+ojsDdD79bMWouQiPKgqo0ZhwMcq+o1sPZfgXIe3H1dRPJ80uv1rsYfVtUt4B7YAI5UNSsw61tEXt29bWYP+WY0rTGOmXWBA+CzSO+XkrvvAjfVarWWb5anFCZKVCqVfXc/E5Fk1p67bwJNoObuDeBuLgGANE3fgNMinSRJWiLSBBgMBkPxQp9gGQSBIBAEgkAQWLnA8DISkY+RfKmqSxsqIu95Hp6AmXWAp6VN/aNjZs/5YvQ67sdxfJhlWVtEdpj8Uzov3+7+EsfxhZn1F/zuQGB+fgCRul+wceMJYAAAAABJRU5ErkJggg==', ff: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHfSURBVFiF7ZU9ixNRFIafMwk4hJwbFtIogqWNgqDFbmOhWNioCOsP0D4/QMu1t/APCHZZC7XRykZkWS0UrRa3EUT7OUkYJDvHwkwM62Y3M8moRZ7qvZd5z325H2dgyZJ/jEwO2u22pmnaiaLoDFCb4tlJkmQD+LHoAHVV3QIuzOB7bmbriwgR5UJVV2dcHOCaqj4Fjs0boJ4Ldz8uIrm+1ev1Nvd/rKqngVfACeCqqqYF1toTkU/u3jGz1/lkdJhjP2a2A1wCvhfxjai5+zngWavVWskn64cYpoYIIVx097si0pzV5+4ngTVgxd1XgRelAgAkSbIL3C7iaTab6yKyBpBl2Th4oSOognkC1EII90MIG0zvGUdS6ggAQghX3P3eSL9JkuRlmTqldyDLMj1IVx5AVR+r6lBEuvmciHRVdaiqjyoPAFzn4DOvATeKFit8B9z9ThRFN939FL/eNcCWiHzJsuxJ5QFGLXpz8l27+wMz+6N1z8I8l3AXcCBz989l65R+hoPB4H2j0TgvIt7v9z/89QB5iHn88B+04vEOiMi3Cd1VLd1bjkREvuZ6vANmtg28rWzV32yb2bt8MHkHhnEcX07TtCMiZ5njBzOFPXf/GMfxQzMbLrj2kiXl+Ql9AqPHGZ7ygwAAAABJRU5ErkJggg==', fg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAH6SURBVFiF7ZXBahNRFIa/ezPUIcmZUMgm4saVG4UKLtqNQkXFhVkI1b0PkAdw276Bb2E2tRsRQUERaV0oCkLBpUTEVebOYiiZHDczaUhNnZlO6Cbf6pxh/vn/OXfmXliy5Jwx00273ZY4jnvW2qtAbY7mMAzDbeCo6gCeiHwEbuTQ7TnntqoIYbNCRNZzmgN0RWQXuHDWAF5WqGrHGJPVj6Io6s/eLCJXgDfAReC+iMQFvBJjzDdV7Tnn3mcX7WmKWZxzh8Am8KuILqWmqmvAi1artZpd9E4RzA0RBMFNVX1qjGnm1anqJWADWFXVdeBlqQAAYRj+AJ4U0TSbzS1jzAbAeDyeBC+0BIugygArQRDsBEGwzfw95ASlluBf5iLSV9UuQKvVejccDl/nEVYxgRUR6QPdtB8kSfIlrzj3BOr1eqdWq30ARsCD9Jc8YQ5sRlH0p/IAnuddV9XLafu20Wjcs9buzJqnwXKTewnCMHwF7KVtx1r7+azmhQIASXoA7aZ99qX/VtU7ZcyLBgA4cs495ngSA+BWFEXfy5iXCZCFeGitvauqa2XfPKPsPpDk/c//x7lvxZMJGGMGU/VzEVmYqTHmZ1ZPJuCc2wcOFuZ6zL5z7lPWTH8DI9/3b8dx3DPGXKPAgZKTRFW/+r7/zDk3qvjZS5aU5y/vXrZ45ouVJAAAAABJRU5ErkJggg==', fh: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHgSURBVFiF7ZY9bxNBEIaf2bPEyec5K5KbWDQ0IKSgpKBIGhBJEQESFeEH8AP8A2ipqfgX0AANHQ1CKCAogviIQsmH0t5ecUKOh8ZrjIWD72wnjd/mZuf2nXm0e7d3sNBCpywZHrRaLS2KouOcWwGiMZ79LMvuA79mDVBT1dfA5Ql8z7z3O7OAcCFQ1fUJmwPcUtUnwJlpAWohMLNlEQnxnTzPH49OVtULwAugDVxX1aJEryMR+WBmHe/9y5B0xzlG5b3fBzaBn2V8fUVmtgY8bTabSyFZO8YwFiJN0ytmdk9EGpP6zOwssAEsmdk68LwSAECWZV+Bu2U8jUZjR0Q2AHq93gC81BaMKkmStSRJVqepURkgSZJV59w759z7aSAqA4jI+b7f9eOTBZiVSgPU6/XlNE1v8PdRHaVpuq2qrbL1Sr8FURS9MrNzIvIj5ETkgZm1gY/ASpl6Vbag27+2h3IhLl2vtEFEbgLf/3Hr0Mxuzx0gy7IDEbk2AnFoZpt5nn+aO0CAALaAL8Bn4GqV5lDxKIbBh+liVX/QqZ8DgxUYea0eqercmorItxAPVsB7vwu8mVvXP9r13r8Ng+FnoBvH8VZRFB0RucT4n9KqOjKzvTiOH3rvu/+fvtBCJ6Tf7s6OjhyB7XoAAAAASUVORK5CYII=', fi: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAF7SURBVFiF7ZaxLgRRFIa/MzYxxZ7dSLYheg2JQkGjoNKIAtERD7APoPUIWqUKhdXoNApBRyVRCv2cLSZi52jM2mBlZ+xmm/mqc2/mv+fLnXsnAwUFQ0Y6B7VaTeM4rgdBMA2MdMk8RlG0D7z1W6CkqtfAXA+5czPb6IdEkBaqOt9jc4BVVT0DRv8rUEoLdx8XkbTebDabJ98fVtUp4BKYAFZUNc7QqyUiD+5eN7OrdDL4K/EdM3sEloDXLLlPRtx9FmhUq9WxdLL0R6CrRKVSWXT3PREp95pz90lgARhz93ngIpcAQBRFT8Bulky5XN4QkQWAJEna4plewSAoBIYukPkQquohsMPPT3ULODKznSzr5dmB9V+a8zm3lnWxPNdwW0S2fpFoJUlyOnABM2sAjay5bgz9EBYCQxdoH0IReemoj1V1YE1F5Dmt2ztgZjfA7cC6fnFjZnfpoPMavodhuBzHcV1EZuj+U5qXlrvfh2F4YGbvfV67oCA/H3COb/vQdtmQAAAAAElFTkSuQmCC', fl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIgSURBVFiF7Za/bhNBEMZ/syAf0v3pkDBCSNCBSEnhmiJxDY5SUpgCBV4g1BEPEAkKU9FhN1QxHWUkaixegMQNlW8N8RU3FL5Dp729OBUu4mludr77dj/tzM4ubOyqm7iBKIpuish7YAcIPZwpcJSm6VuH90ZE9oG2hzMHxsDLNE1/VYFr7p9BEHwEngKtBtEx8KTVav3IsmxSLL4nIu8KzGct4KGI3FssFqMqcN3z807x/SkiJy6oqj0AEekCw8LfLnERGXk4HeCOqnZdzCcgLCY6mc1muy4Yx7EW+L/0iEioqgD4OEmSDAvhkYsZj4D/ahsBaxfgK8Ip0FbVXllwPsvz/LTiT0WWLcXHKQsUOHUx3w4cXawZgD/Ah8p4AJxfglebu9YJAaIo2hWRbvWolZbn+RkwsNZOHM4joG+Mue1yVNWq6thaW+sRG2tKwZ6IbDekYMoyBd+r8TAMt0Skb4ypXUaqOlfVL9baTysFxHF8AByuEH6uqo9LEWEYbhljvgE3VvAO3FvUdwperZiEYqF+ORCRF5dYHOC1G/D1gXYx6eiiy6ha7caYW+VZT9O0tquVy6iWnrV3wo2AtQvwFeEcCFW1kyTJ0AXLYlNVW4nNS7+B0ylc62I+AWPgGcs3XK9JuaoeV/yxiDwv/EaOiBy7Md+r+CtwH7iL/2V8BhxaawdlIMuySRAEGfAA/8vYishnVd3Psux3k8CNXU37Cwpxzpn/F18gAAAAAElFTkSuQmCC', fm: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKNSURBVFiF7ZbNaxNRFMXPfaloMu++SWPSlohdurCKUFtc6E78WLhR3NSli/4TLhT8A1yKlRQUpCtX7hRBEASpCiJu/FgItrZoSDJ0WmmcuS46qc+mM8006ao9MMww79x7frw383jAnna7KGFMaa2vEtEEgDEAZQB1AB8BPOnr65uq1WoNAMjn8/kgCCYBXAIwAiAPYB7ArIjMLC0tPQYQdgzAzEdEZIaIRhMAayIyCQBEdD8KjdNbIprwPO/zlgCO45xQSj0HcNB6/QHAJwA5AKcBmJigOoCXAH4R0bCInAGwPxqrhmF41vf997GY/f39LjN/ZWaJrjeu647ZnlKppI0xt5k5sHx/tNY3ABywvVrrAWZ+YPm+FAqFOHjAGHPLMr8ol8u5OK/W+goz/46uy7FN17x3Wn211jfjfIqZFyNjw3GcoaSmAJDNZg/lcrnyVj4A+6yZ/QFr6VXrwXGc4wAGAICIHvm+v7BV15WVlbnl5eX5DgCaIvIweh7SWh9tA1BKHbYKXnXQNJWIaP3jU0oNtwHYCsOw2WsAEcnYPG0AYRh+Wx8lOtlrACIa3yzrPw8zz0Ufys/E3yWlisUiM/NC1Ps7NpsBACIiU62aZrM5jZglSim1urpaATAYhdwDIEmk9kZU6RJCMXPF3ohKpZJOrNBaH2PmWg8gNobXtNYjHVW6rjvKzFWrOO1ykDHmrlVfN8acSoXfBUT34V1A9C58GxC9D08BsXPhHUB0FZ50JmyTMWZcRJ7i3/FrOrpfj+51Ijrved7sjgAAazMRhuEzAIUNQw0iuuB53us0/VJvMI1G4x0RXQRQtV5Xiehc2nBgGzPQkuM4g5lM5hoACYJgxvf9xe322tPu1l9ksP6CzrH0UAAAAABJRU5ErkJggg==', fo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIdSURBVFiF7VWxitRQFD03Ewlm3rvMlgrai43abaNuZSEIojug4DdY7A/YWFgt1nYKys6K7i+IyFbqNvsDW0wlDOTFkQlkj4UTeT5mdpKZ0QWZAyHJvTfnnJfk3gessADSNL3abrevnIq4qj621pbW2mNVffIvtcVa+8xaS/8wxjwHEDUma1ifqOorkpvj+1EVBwAR2c2y7JEXX56BTqfTKctyD8CNcchFUXS/LMtCRN4D6Izj+wDuOOe+1eWeiTRNz1trD7xX3vd/PmPMZVU98vKHa2trF5ciXpd8lslpOPGnMcZsiMgnkhfGoX0A1weDwVFYOxwO+61W6yaAD+PQuSiKPqrqrZmrnCJ+z1r7w1vROwBnazyaqOob77mRqj5sJO71+LwtFrZq7VkRGWO2gx7fauTeg7V2K5gV2wgW4rdhS1Vfk+z6Bc65prMiNME/BEV6WZY9AHAM30273d4Ixf8GSHaNMdUsQfz7Io4/kzwgeYbkSESuLVn4i4gkJIs4jr+eWKyqveq7LSpc8ahqb1I+nhScQXhXRLoAWkGqJLnjnNtrwtfYAICXJM2U3G0A2oSs8fYJYJo4ANimZPMYAPBr63XOiXNORGR3Xp65DSwLKwOnbmBiG5L8Xl2HA4RkdV6vciTXa9Tnk7QmbjTGmK6I7NRZQV2Q3Mzz/G0YD6cZAKAoisMkSQoAlzBHbwfoA3ia5/mLBXlW+E/xEwkBzqR/80NDAAAAAElFTkSuQmCC', fr: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJ6SURBVFiF7Za9axRRFMV/dxjEZee+YZGgRToLCxuFCKYwhUQMgo1GsVQISrDJH2ChYG0QAgENErBQItgEEkRsRLCIdRrBFIZUkjj7VhTNzrXILO5OsskmGVNoDgyPuV/nzNyZdx/s43+H5A1RFHWJyDgwAJQL4vkGzALD3vsvzY5wnaI18ssFETdQBgZFxICrLXz5SFWtZQmLIvK+CHYz6wW6gZr3XjcNVlVTVXPOTRVBDuCcm2rUzfuCokh2inXfwG7gnBswsyvAvPf+IbC6ZwLiOD6apul0o6aqmvf+wVZ5hbXAzI7R+kDHO8krTEAYhu+Ahez2VxAEzzvK2wZHSVXvAHjv7wPfm53Ly8vVSqVysl6vnxaRj0mSfCpMQKlU6g7D8CVwCsA5d0FELiVJstAct7KykgCvOqnZwJYtiKKoLwzDDw1yADM7kabpXLlc7t8O2bYFOOdGROQNcDgzvc0ugENBEMw650aaUg44556p6ldVvbErAWZ20cxGydpkZmPe+37vfb+ZjWVhoZmNqurTSqUSq+oLM7sGxMCEqg5tJWCjWZDfLn+wNsUmc3HXgXHgYGbyQH6fT4GbInI+26Dw3rdwbtoCEfksIn158qzQpIj0AYsNTdm6ZGZ3M/IAeGRmZ9pxbCZgPk3Tnmq1OtcuoFqtzqVp2sOf72IJOFur1e4Bt5pEHNmEpxU7nIZhHMfnoijqytUaUtV6o+ZG07CoWbCaJMnrvNF7P6GqKfCYNm/7r49j7/0TYLqdf0/OAyLys51voxZ8A8pm1lvUqSg7kgHUOhEwCwwC3Y1/tyiIyEwnAoazdQCICuKuiciMmd0uqN4+/iH8BlZ93uWVxSAmAAAAAElFTkSuQmCC', fv: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGiSURBVFiF7ZYxbxNBEIW/uaPJ+XYLi2tQykSio6FxSUXaiCQVfyCi4kekoqDMXwC7txENJQUU6dKkRKJwZMnZzdF5KHJn2efjckErWYJ7zUk7b+Y9zWpnDjr875DqQZqmmYicAwdAL5DOLTABTp1z16uBRxuO7sRfBRIu0QOORESBkzW9KtMY44uEHyLyNYS6qg6AXcA750wj2Rijxhi11g5DiANYa4dl3WosCiXyt+gMdAY6A1s3UDcJN4YFoMBlFEVv5/P556aC1tqXqvoeeFpX3zm3dtbWwJ0L1XyxWOzlef6zLp4kyZM4jq+AnT/VqBrYWEYrWO4CVX0MvBCRJI7j18C7uoQiVop/EZHrIr/cBfejbhdkWZYaY/Ii9q0h93vB+dXv92153rQLmjqwxHQ69caYT8Ah8LzpmgqMZ7PZTZvarV+Bqn54APdjW26rDgB470dpmu5HUfTsHvEL7/0ouAFAvfdnD+C3wtYHUV0HboGeqg5C/RUVzxDAtzEwAY6AXVU9DmGghIiM2xg4Lb4HQBpI24vIWFXfBKrX4R/CbziRhrCn4RNqAAAAAElFTkSuQmCC', fE: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFDSURBVFiF7Za9ToRAFIXPWbDBGWJrra2xNyYW2+j2PoLvYG2iPsY+htHCVktju9taWPIXCoFrA7rZrIb5CdtwEgIzzL334w6HAIwatWXRYO2O1vqG5IFpEREpSN6mabpcvxf2TRLH8VRErkXEtH4HUQG4Wp+f9E1Q1/UbgIVVdSAXkQfL2P+llDrTWkt73JnG9+7AXyJ5sTI0fkpnAAAdQJpl2eugAFEU7QM4aodPAL4GBQiCYIZfK1u9ZK5b0LVfqqp6HBogBDBtr9/LsvwYFEApdQJgrx1ae9waYNV+Lh8Zly2Ytec0z/OXQQF82M8JwIf9nADgwX4uAF7sZw3gy37WAL7s95Nv06RS6pLkHMCuRc5l0zSnRVF89lm8sQMkzy2LA8BhGIbHfRdv/CckeS8iE5LGECKySJLk2TRu1Kit6RuuEGTFTZ+2pAAAAABJRU5ErkJggg==', fF: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEZSURBVFiF7Za9SsRAFEbPN2o3Ca613bb2msZS7Lba1xB8A/EFBF/DB9jC0kKtFCxExM56QxLb7LXJhNHtJBHB+ar5Y85hGLgXUv57FE+894eSLoE9YGNgVivpycxOmqa5WRPI83zHzN6A7YHB31M656ZVVZUAm9HGfgS/lfQ+JNXMdoECmJjZAbD4IrBarbykcPiiaZqrIQW893NJRWCFdTck5CdJAkkgCSSBJJAE+mronPswMwAkneZ5Ph8S1JXjnrUmANwDJTABiiAzQpaS7nqZMKjregnMzOwBaEcAt93ds9AN/YnETelWlmXnkqYjM1/quj6je+W4KT02s8XIcACcc0dVVV1D9Afatn0EXn+B/9yxUlIA+ASd/WL2NAX8zgAAAABJRU5ErkJggg==', fG: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALzSURBVFiF7VdNSFRRFP7OM/+495y3kAjatclNoKT0s5AEI6JNELnJdW5TMHKV/S0UQtwa0bJFQeiqwogKWjkStTOhTRFUG+e9p5XmvS282p03M/lmJg2iDx5vuO+e3/ude84A/1EDlFLtSqn2HTfMzPtF5B4zW2a2IjKjtT5QjS6q0HALgIsABgE0pD7/AHDHGHN5aWnpU1addRn3NTHzEID7AHo8uRyAjwD2AggAdBDR+cbGRqysrOScUzWBtNa9zPxuI93uec/M/c5olj2VQ0SOMPPLlNJYRK4AaC4h0iAiF5h5MSWT01p3ZzacJph7Vpl5Uim1J4N8CzOPMvN3X0cWotYx87gz5hufZubWzBH8cqTVyaYDGYfHvc0qUEodD4JgxtPxlYjORFH0qFLjPkTkpLX2Abxjs9b2JEnyFPAIQkSvASx4ss3GmEkR6UOF5bqhUkT6jDGTKOTMAhG9KSf0R4hUBYELUS2RaiUwlFLtYRgerFRhVofDMOwQkUO+TZ+E7UEQ5LDO0GkAl+I4ngcArXU3Ed0E0OHJ5gGMut/DAELv25y1dihJkmfOwVYAYwBOAzBra2udy8vLr37nAACsEtEtY8zVJEm+YP3GO0tEYwD2lUniBwDX4zi+DcBorXcHQTBire0HUO/2rAVBcDifz88VSTNzFzPPplK+yMzDAJrctlJETROsiZmHS5B5lpm7Sh6Bv1Ym0qLoiGgAAKy1E1tkqUC2TPaKUFFJVlt6mxlwEb0AUE9EI1EU3QVgy80ARPTEGDNIRCtEdMNa2+vpTc8GJCLnrLXXXMaOJknyucCBMAxPGGMee0pyjsnPgSImb2DVveu9tXQFHXMV1Ok5fyqKoofpbOzSWk+UaEZTfjMqk+qio3HNaCp9h2itJ1IOFyLj5UMi0sfMb5l53u8XtbTjAvy1gSSFbR/JsrbZJmYeQPGVm3PvTm8tD2A0juMJAN+2jDCjAwC2ZyyvCmmi1vLHpCYopdqUUm07bvifwk9j+o43Mi/3ewAAAABJRU5ErkJggg==', fH: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEYSURBVFiF7ZYxTgMxEEXfH1I6FqGmg5Ie0nCFVLkGEidB4hhwAA5AQUkkWuioEyWbNjs02ZUJCxGrhSDhX+16PP5PtvxlyPrvUvoTQjiXdA2cAHsde60kPbn7RVEU9x8AYowH7v4C7HdsvKmZmR3N5/MZQC8pnCbmD5Jeu3R190NgCAzc/Qy4ewdQlmWQVE2+KoritkuAEMJY0rDyqsatS5M2ygA7B+g1DUq66ff7vwLwN3eAhhxI7nFjfZs2+r8GaMqB9B63yYm0P9XOjyADZIAMkAHqJDSzpbsDIOkyxjhOJ66j9NP6NqX9Zras16o+1o/SZ2DwnYVbaGpmx9WjtD6CxWIxBUaSJsDqB4xX7v4IjCrzrCyAN3/FaXZ4SYDKAAAAAElFTkSuQmCC', fL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKRSURBVFiF7VXLalRBED3Vo1mMXX2dkGFQVEQMSBZJfOAHuHDvIkFXgujaD4iLIBr8AwUNiC4iJG5ECShkJ+IqRghEcKGT+BhnI317whBNlwv7hnYycxkfO+fAhdtV1edUdfUD6KGHHv53UI5Paa3HiGgcwEkAFQA7g68hIuedcw8BgJnPALgHQAf/NwA1AC9FZNY5NwvAd50AMx8B8ADASE6Cd9I0vRTibwO4mBO7BOBsmqYrrY4drYYkSY557xcAJMEkIvKKiKpEtBEMTil1I5ujlJry3isi4uDvE5EDRDQaihwB8KJYLJ5aX19f7JhmqVRKmHmVmSV8j5IkOZRTWS6MMYeZ+XHGZ4yp9vf3m7wJ1yLxu8jfI91CMfP9KImreYEfQ+CnSqWy6x+IAwDK5bJm5lrg/oCosK09oLUeArAnDGdqtVoj4igYY0577zW6gFKqYa19CuA7ANTrdae1niGiywD2aq2HnHPLvySglNonItnwdUxojJkUkStE3XVERMDMU2maTmQ2IlqKtPYDWAYA1YHjr3tPRK3nvi3n1gp479eyCkVkOA6y1k4aY55777kbcaWUs9Y+i20iMpLxe++rbedFm/BzuVzuqt/dYGBggJn5S+BeQ7QacQs8EU2H/0qz2byJzi36Hahms3kLQBkAgoa0jSyVSokxphrdBU+MMYN/qmyMGWTm+YxPa/2+9SLatjGKxeLRQqGwAGB3MAl+nop30VXcIKLr1tq3mZCITBBRMfj7ABwEMBxpfN3c3Nx2FXd8jIhoRkRGcwqMH6NpABc6BYrIIhGdS9P0TauvbY/TNF2x1h4XkXEAc0S0CmAjCnEiMh8JzANwkX8jzJkTkTHn3Il24j300EMPAPADUKEDzMsE8qQAAAAASUVORK5CYII=', fM: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAO9SURBVFiF7VZNiBxVEP6qu+3u3Xn1ZnJYkAWRRYloEL1sREhcEy9Bk8gmSBDRkwdJBMGoKF71oAG9JOjJn5MGXZTgQfxDg0EJeggkEtaQxM2PRGRn+4edv+1XHrZ78rbpmWwUD+IWDLzq+t73VVVXz3vAmq3Z/93cf4tYa70xCII7HcdpLy0txYNwdL3E9Xp9whgzDWADlguYFZEjaZqeLDBKqSki+tba9oOIvJim6dF/koCvlDpARHsBeKWYiMiHvu8/NT8/Hyul7iOi70qYTESeSdP00HUnMD4+Ppqm6REReeAa0BOe5001m81Iaz0pIpsBbAHwUK4lAHYnSfLJanT74sz8DTNL/ruktX5iZGTkprGxMcXMO5n5tBX/uMyhtX6cmTNmFq31HIDw74qfbTQaN5dx9Xp9HTOfKnBa68kyRin1psWzo3juDBNPkuQzLLcQAM56nnf/wsLCbwBIKbWPmV8C4EVR1CSiZ4u9IrKrzEdEM9b6nmJdHqZh4luazeYcANJaHxSRvXlls2mazgRBcKzdbmdY/jJuK3O6rnshyzIAgDFGD+uAlyTJ4QHiYOYDhTiAxHGcE1VFlC3LsrusDlwamAAzvwVge+6eL4lPA9hfiAN4MI7jMwDQ6XQ24eof2+lyUQCe64s6zleVWebTWgzKH8y8vpTcyTzWU0oVHUKj0Wgw8y8DhpCY+R0rVi2eC/yaA9ta642l2HqL5AMrNMLMR63EPyrte82KXanX6xN2vP8KlFJ3ALg1dw/HcXzcBhJREYMx5nura+8B2Jy7pzzPe9KKvQLghdxNiWhHFEXnbN7+V+A4zoSIAABE5MeKBhkrmVaxNMZsJyKIyFyWZduSJIkKcRF5Oce1HcfZHUXR8TKpY5F2rbWqSOCMtS7evxDRYwDedV13a6vVulglTkTTURR9UcF51UZHR8eZ2TCzKKUqwfYQ1mq1ynOBmV+13nlLa71tmG7/PtDr9ZIgCKYATBDRLWEYznc6nRUtC4LgdwB7ADhE9EgYhpHruhd7vd6iUmqD7/tvENE+u/I4jj8flsCK0zA/wY4BuCF/9D6AmSzLfl5cXLycV/g6gOdLPF0AvuW3iGjXtcRXdAAAOp3O5TAMzwHYieX5uBvAo47j7Pd9/0q32/2p2+1+GYZhDGCTJWrzzBLRw3Ecl+8DlVZ5H1BKbSWigwBu7wOJDsVx/HTh12q1G13X3WOMmSSidQAuiMjXaZp+CqC3GvGBCeTmMvO9RDRpjKkR0dtJkvy5WuI1W7P/jP0Fb1B3ZmSHXQEAAAAASUVORK5CYII=', fN: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAF3SURBVFiF7ZW9SsRAFIXPnaQzmXQ+gAiWFrbbKmIniNitFj6EuGAhLj6EIFgKliKsID6BP5246wNYziSzjcm9FmYhrIkkFlpsvipzz9w5B2YmA7S0tMw6VFYMw3ATwAWAAMCImTvOufdcOwOwC8Br4ONEpJskydW0oCoaNnJzAFj0fX+5oG01NAeAOSJaLxP8sqJSqs/MiohCERkaY+4KcpeIdpqEEJFEKXXaLHPLH1F6CwB4Wus1Zg48z3szxjxMhCAI5gF00OAMKKWctXYAIK0VQGt9LCK9fChZlq2Mx+NHAAjD8AXAUl3zAv04jg+/havTSURSGErlxJ/X4NJ6xXxPa73KzKGIDJ1zTxPhl1uQWGtvUbIFLf9O6RmIomiBmXtEFIjIKI7jIwAfwNdDRUTbaPYrdkR0Yq0dTWulbwEzHwDYE5FJoHtjzCCXz0UkqmteCJEC2J+uV13DawBx/v2apulzQbsEkDX0T0TkpmFPS0vLjPAJV0WLn3+VYcsAAAAASUVORK5CYII=', fO: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAPJSURBVFiF5ZZfaBxVFMZ/Z8Y4aeaeSaHQYKwoVgQxaF8CtsbigwYfROofqimKoOJbfNAWi0++CH0RSgMKGqmgL9UiCkKVoiWKClaxhZaWlEQUE6hUdPfObmDc3etD77bXOJtsU6OgBy57zrnnfN93Z+/cufB/N1lJ08DAQJrn+fVxHG8AaDabP/X398/Mz8/XV1WAqt4HPAXcBaxZNL0AHAZet9Z++LcK6O/v39hqtfYDd3SJOxVF0ROVSmX2sgUYY7aKyHvAOp9qAV855w6LyA8AInKdc+5u4DYg8nXnnHMP5nn+WZeiS8mHVLWqqs6PT9M0vaVTfZqmt6rqkaC+Yoy5eaX8vao60wYzxuwD4i76YmPMRCBiGkgumV1Vd7VBsix7h4t/l2RZtkNVp1Q192Mqy7KxsEZVDwYinuvE02kPxKo6D6wHKsAN1tpzfnVvichYh763rbWPAy1jzHoROQNkwFlr7SDn98+fLFqc8Kvf4skBJj05xpgXAvIG8IUfDZ97VFV3A+R5/jPwhs8PqOrmMq5SAc65rUH4gf9dIyK7vG9FZIu1dsRaOyIitwO5n3se6PU47wc4IebSAqIoGgzEnAYwxgwDCiAi+6rV6tF2TbVa/RqY8GGmqsPeP92uEZGruxbQarXWtv08z3MPcCHnnPu+pG0m8Nf6XluGuawA4Je2o6rXeIALpCIyWtJzTyBw1vdeW4YZ2hVlSRE5HoSbgelarXZCVU8BNznntqvqbLPZnACI4/gZ4CFffzLP85PeHwkwj5VxlT6BRqPxEdD04SPthbVarfEgvzuO47k4juc4v/EAGs658QBqRzvfbDY/7lrAwsLCHHDIh6PGmCGAWq32iXPuYeC3krZfge15nh8ByLJsGLjTzx2q1+vzZVwdj9YkSWrAGCAiMlgUxQGAoihOJUky6Zz7UUTOAsecc5NRFD1trf2u3d/T0/OmiGz04c6iKKY7cXUyUdXPg+N0W7eNWZaNBX1fssRXt9NbAOBE5FkuHp8TqrpuiXoA+vr6rnLO7fVhK4qiccCtRADVavWoiLzmww0icoAOb463K+M4fhd/jIvIq5VK5dvlRC9nvap6PHikL3cqzLLslaDuBH+9tq3MjDFDxpha8Hl+bHGNqj4ZkOeXcxEpNVW9V1UbnqDwF9T23DZV/d3PNVX1/m5xu7nhAFAUxXSSJHVg1Pc90Nvb+02SJDcCB4EeX7rTWru/W9xLNlXdEzzquh/t+KVVIw7NGLM3IF12c66KZVn2YkC+5x8lb1uappvSNN30r5D/Z+wPGWNb04Yd6IMAAAAASUVORK5CYII=', fP: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHgSURBVFiF7ZU/ixNRFMXPeQmZyMxlXBBWxUoLQdhKRRa2tbDxT7GI/Vr5OQS3E9LpFxDtLGzUWgw2u1hYaaGLYBMfkxCZuPda7ESW+BJfdkcEzYGB++beOfc38y7zgP9dPOiDeZ6fMbOzAEDynff+fX1YMyQi10RkW0Rs4toSkavz+jXmbL4JoANgOZBeBnArSZIjZVm+qB0gy7I7JO9Wy10ze0TyPoCnJIcAzmFvS9dardaXsizfxPhGzUCe50uq+gFADmCkqlcGg8HLiZrLqvoMQBPAV+fcae9973feLgZAVW9UzUHy3mRzAPDePye5WS2Pqur1GO8oAJLnx/FoNHowra7RaPzMkbxQGwCAY+NgOBzuTCvq9XofQ8/UAbB/VmxG3f5c1HzFAvwx/XWAqZ8pTdMVkhvOuRNmtgrgFACQfDLL0MzWq/ATyVeq+hnAw36//zYaIE3TFedcF0A75i0i9M3MLoYggltA8naNzVF5bYQSzdBN59xxs72BLoriwCcmAIiIVZ4ng70OY16HFgALgAXAAiD4JwSg4yDLsvUpNfNqNxrAzLYB3AQAko/r6F55/qLgFiRJ0gHQraNxpdftdrsTSsw6aJoicsnMgodIrEjuFEXRBfD9MD7/rn4AHZ+OmlAxl7oAAAAASUVORK5CYII=', fQ: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHGSURBVFiF7ZZNbtRAEIXfs1jNdLUvwA5yAbLiBgRYJiyDFPGjKBwACZaRuEAQIvyJJRGsEOQQIKKw5ghsZro9C6TxYxEncmCI7LbDSJC3s8pV7+tuu7qAM/3vYh9FnHMrJF8BGP7hlQLALoD1EML3euBcHwAkr5xgjiq2TFIAbpwGwCNJGcmZEJIuAzgvaakPv9by3u+YmcxMv8ayeQB1BvDeL5jZa+fc8lwAJD0EsEryjZndmgfAewBllf+0C0QSQIzxLYDbNYht59z6XwMAgBDCyxoEST5OgTjWB/I8vzSdTi80TZYUSH4EcL2C2DKzHyGEF60B8jxfLMvyE8ku7TkDsD0cDj8XRbHfNOFQvzWJDmpc62gHRqPRl8FgsJhl2cU2TiRXcXAEwMH3cKcoiq+tAQBgMpnsAdhrmmxmawCuVo+SdC/G2Pj8gQ5/QWX+rKohSRsxxidt6yTdhs65lZp5CeBujPF5Sq2kHSB5rW4eQkgyBxJ3gOSmpFLShxjju1TzZIDxePwNwFoX40PNfR7oZSTz3i9IekByMCtejWQAEE8FQNJ9ADelkxtgdW8cUy9HIGkXM1ZXUyS5I2mjD78z/Vv6CX6knFtAnGuWAAAAAElFTkSuQmCC', fR: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHQSURBVFiF7ZY/bhNBFMZ/b+XKO+Ot6OiACySXMIgugTJICBIhOAINouEAoIhAkCiRgAYE4gQpQEThAhTkAut5a0vI3kdhW7LiXbMrs3GBv25H35vvpzd/dmCt/11ydsA5d0FE9oEuEJfUZWZ2S1XfLQsQzRGNw7cWhAPEItJdNhygVTA2nfhURI6KisxMoyh60hRADCAiR71e7+a/CFmkuSU4bzUC0Ol0rnjvXzvntlcCYGYPgR0ReeO9v7MKgA9APpn/+SKIRgBU9S1wdwbiwDl379wAAEIIr2YgRESeFUEUHcNSJUmyMRqNLlX1m1kQkU/A9QnEU+/97xDCYW2AJEk28zz/KiJz13cNRcBBHMffsiw7mQ5UlS0RXDpX5Q6kafq93W5vRlF0uU6SiOwwXgIY74fdLMt+1AYA6Pf7x8BxVb/3/jZwbfJpZvZAVQ9nPY2dgkn4i0mGmdl9Vd0/66vVgapyzm3NhOfAnqq+LPI20gERuTobHkIoDIeGOjAcDh+1Wq2RmX1R1feLvI0ADAaDX8BeFe/K3wNzt5r3Xhm/iv72JHucpunPZQGKluAzsA1cNLMbZYV5ng+B3SYApn+sLuBK6gLwcdnwtdYC+ANeZpfcLk5IKAAAAABJRU5ErkJggg==', fT: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGMSURBVFiF7Za/ThRRFMZ/Z4OV905jbDbhCbSi2Masna0NkljII4CWPIG2Jr4BCQnhT2NnDZKgCSYWPsJU0sw5tnw0uziZ3dkdQkHBfNXk3vPl+507zQe9Hrqsw8wg5/xC0oaZvQaQ9NXMDt39O3DVxQ+MzOxPVVXf6p42gHroOjBsmSslHc+BafVL2ouITUAzACmlp2a2A7xdENqmUtIxwBJozGxUVdXPJsCjnPMF8Lxly3/AzuTsk6THZvamA+iMX9JGRBwBDKZTKaVxLbyU9AV46e6rEbEt6WI6K+lXRLx391VgPJktG6Gt/vriK7XDJ7WADxFxuGQzgCt3PwVOU0onZnZwS///F7gv9QA9QA/QA/QAPcDKkvtmswHAzD6nlMZmduDuZ7TXsrl+4O88ANUC1iYB68DQbKa5Dc1sC9jKOZeSjiaFo4v/d0Sc3MxOP4qiGEk6X/AanStXmx/YBz66++UMAGA5513gXTP0NqVzHvSiBt1820FRFK8kPQN+LPm/N5471vZeD1zXUobsU/Lkfh0AAAAASUVORK5CYII=', fV: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALaSURBVFiF7VY9aBRBFP7enUFhdyYxWNpoE8V0EoiFivgDotglYCWIVcRGBINFbBSioKIogo2gCHqHhSiCWliIP6BBIxYmAQsxVoLZfXNc4bqfxd2em0sue7n8VPmqmffevO9j5s2bAVawNGjzPG+3MWbdsjMbYw4aY74aY2iM+ZwVL4tI3AXgEoADabuqzsmxaqHE1trOOI7PAhhoJd9CBLRZa4+THBKRtSn7awBrAGxtJkmuFWbP8/YYYz6SvAIgIf8hIkdUdbuIfGs217Qd8H1/h4hcA9ANIN9kjhLJYefcJQDlZolnCLDWdpJ8BKCjybUEcDeKojPlcnmyUZAx5raIjJC8r6q/6v21CrXW7if5tDp9KyI/GjKTgYjcCsPw/Wx+a22BZF+deYrkMefcw7SxtgNxHPsikhBcUdViIwEtokNECu3t7fuDIHieGFsqwvkgiqL1AC6gcmS5OI6vIrXzSy6gXC5PquqgiDyomjZ5nte9bAISkHxRI83lNiy7ABHZmJr+XlYB1tpekieq01BVPyS+Bb8FWTDGvCHZk3CRvIhUw0oL+JsMRKTX9/2GSfP5fBAEwUsAf5rQsC0ZkLznnBtOO2sCROQLKldFAJxMesJsiOMYxpgxAKdU9UmGAAUwQvKmc65Y5aihVgOqOi4i5+oD5kAXgMe+7z/zfX9LQ3ZVq6q7nHOF2XJPK8IwDIdEpAuVJxUAQLKfZD+Ay6nQ0SSZiOwTkU/W2hutfMFm3IIwDCdE5Gcyd84VnXNFku9Sos7ncrkeAK+qplUkBwBMGGNOk1zdsoBmEQTBiKruJHmY5PequQPAMIBDSy6gCjrn7jvnNgEYRKXg5oXFakRlVb0QRdFmAHfwv9imshZmNiLf9/uASm/IVFH5mByx1l4HcBRA1hXNFiAihayYelQ/KrN+VurR6AjG5lgTk5zLPy80and5a+3eOI5NvYPkeKlUGl0sASv4Bwj7KI5EIGMsAAAAAElFTkSuQmCC', fW: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADtSURBVFiF7ZVBSgNBEEV/Vdzp1NzBuxjEnSeQLHKIYHZi8BzuXYqgV/EUNT27UD+rQBh7IIsCQfstf3XXL+j6NNBoNP47UhO7rrsH8ArgKslnJPlQSnmbFnTmwl2iOQBcishtrXBRE1V1FxEqIl2GO8miqi8ZvRrpVFMAYGFmy4hIWURVHd39E8D+rAHM7InkNsP8hN0wDI8/hks2mUVEoqrPnF+Y2U1EpMRQVYu7f6HyBI1fp7oDfd9fR8RWRFJiSHIUkWd3/57Wqn9BRGwArEhm+B+H2ANYT/W5GL4DGNLcgULyI7Ffo9H4QxwAzflKVwRps7kAAAAASUVORK5CYII=', fX: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAH3SURBVFiF7ZY9ixNRFIafMxuYwMyJTRDE2k2jbiNLQNFebCzcH+BKxMY/YCFa+AesFMR+xf0B2tkIFoJss2pvIbG5dwIhOHNsZpaQnc1MQj4W2RcGzj33433nfFwunOEMa4aMD9rttg6Hw8dBEFwGNhbMlZrZQRiGL/v9vi8T0FDVz8C1BRNP4ov3/jrwFyAovKraXQE5wLaqbheDRmGY2QURKeydJEneLZI1juN7IrKXn3+x8Acnb1kN1i6gUbVAVe+KyA6zd0WaZdl+VSorBQBvzezcjOQAiMhtYKqAOinYA9I5+FPgfdWiygh473tAbw4BtXD6izCO4/PADaYUYRAEA+fcB/LbbaECROQT0Jm2xsxQ1Rfe+yezCqiTAqtzkIhks5JDjQiY2S2qU5A45z4uRUCSJL+B/XkOr4NT1QVHl42IdOM4Lt1gZj8Gg8G3srkoirZEZLNsTkS6pVyFoaqbwCETr6QSZEDPe/9m3Kmqu8BrqqNqItJxzv2EscIajUZ/ms3mBnCzQoQAd8Iw/DUajb7m5A9mIH/unDuqqWNErVbrUpZlVyiv+o6IPMuJMuBh7n9V+MzsKfC9ZG8aBMFB8ecnCqjCRKiL3i/sY6lZClT1vqqmqmr5l8Vx/GjpxBMidnMRaR6V1SOKoq0oiq6uhfy/wT/BxZsxCBs1wwAAAABJRU5ErkJggg==', fY: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJUSURBVFiF7ZY/aBRBFMZ/b3PHBnbfLYGkEMFCSE7xTxqJB4qtja0i2BlRtIiNvWirFmKlkDIgEWxs1NoQsBAkCEYhAQubxITduUByt7djMwvnuckp+SdyHyz75pv33vfNzC4M9NDDPkPaB4ODg7q+vj7hed5xoG+HtVrW2jnf958sLy+bIgMlVZ0FTu2wcCfeG2POACmAl7OqWtsDcYAxVR3LB6U8sNYeEJE8vlSv11/spGoYhhdFZNr1P5jz3uYle4OegX03UOqeApVK5by19jLwyRjzGGgODAwcajabdwDK5fLD1dXVb0BZVW8Dx0TkeZIkb7ZtIIqiw1mWvQLKAKpqjTGP0jSdFpHTAGmajgE1VZ0AHgBYa69EUXQkjuOFrfp3PQJr7XAu7nC0470ZV3a1W6KrgVKpNAvkq2h6njcNICJTeU4eu7mmoxdc7db9uyWsrKwkQ0NDoxsbG2dFZD6O40WAJEluqeqUi2cA4jh+G0VR1Vpb9X3/3dLSUn3bBgBco9edvDFmppNzBhf/pC/8A79hz0D7N9DKAxGphWFYWGCt/bK2tvaxaC4IglERGSmaE5FaoVYeqOoI8JmOW1IBMuC6MWaynVTVceAZ3XfVikg1SZKv0HbtajQaP/r7+/uAc11MCHDB9/3vjUbjgxO/9hfi95Mkedne7BdUKpXhLMtOUHwnrIrIPSeUATcc/zTnrLV3gfmC2pbneXP5yjc10A0dW505Oo9/O5pdgapeVdWWqlr3ZGEY3tx14Q4T485Ey+3K3iMIgtEgCE7ui/h/g5+DgdMiE4DQEQAAAABJRU5ErkJggg==', f_: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGVSURBVFiF7Za/TsMwEMa/C6XLcR55BDZoxUMgEXVmZKBVWfoATEhIQB8B8W9hZKZi4ClY+wZITEk6tfgY6kBUJVUHOwPlkyJbdk6/7+LYPmDdtVEnjJnbzWZzezqdftTJBQCISFdEvkRkxsy7+XhUE7wH4M7xyD3etSkiQxG5BtAowl3m6tpuCDiMMbGDqDHmcFW4tyWw1nKhvyUiJwBuHUNVdZCm6eNiXGNxwIeI6BhA7OAWwGmWZQ9l7wYxAKDjWlXVQRUcCL8LRgA+jTExKpINbaBDRM+qOhKRi6AGVHWM+XqXiohK57weCMzcIqKdxfEoirIkSd4AzHzy/vU3VPUTNowxB8XjNZeqjieTyXtQAyIyBHBWEWOttfu+TFSdA7ospmyreTWQpuk5EcWqegTgxRdsZQMAZkmSvBKRYH6r1W4gL6Pu8XulBvkSpQbKiglVfarFgCubipn3syy7iaIo+wkq9L2qUDrnNVyvMN0QkStjzCVCFDLM3F4CD6ZiJvnetwD6ZQVkcDFzi5n3agevtb4BcmaMvM5zguoAAAAASUVORK5CYII=', f0: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEFSURBVFiF7ZYtUsNQFEbPzYBK7ovC1bKIWlQ9hT102AArgCWwhy6gnUHh0PVIBAKTeXku4SJIJMkjzWD6PnPN93PkhaRTl4wZiqK4EJEnYAXkkb0B2AMb7/3nkPFslPBn/DpyuFcOrEXEgNvB/rEmVa27wncReY1ZN7MlsABq773GZIYATFXNObeNzTjntn1uzJsdRTeDEkACSAAJIAEkgGMAzlX1UVUfiPgrftPkoHPuyszuAcqyfKmq6vlfAdq2PWRZ9gZ8NU1zmNozGSCE8AFcTs3/BSAAuZktY7+i7iUDqOcA2ANrYGFmNzEAvURkNwfAprsroIjcrkVkZ2Z3kf6kE9Y3iOFFb63ANEsAAAAASUVORK5CYII=', f2: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAL9SURBVFiF7ZbPixxFFMc/rzu7tZvuV+OE2RyCGQmuBMGIIERIxIugoAgBRYheFFQUPHj14M2TXvTiMS4Sc8hNjRA9BDz4IyF/gIhmIdENA6txprLubE8nz8PWrO3szLDBmZP7YOhX7/uq3oea11UNu/Z/t3QnSXme73fOfeCc+9g5VxZF8f20wbYsy7LHVbWlqhZ/Fye5/p5xYp7nz4rIGWC2HzOzLycJIKMEVT0GXABcNV6WZXN9ff3apACSYcGFhYUcOFMpbvG5PMniIwG63e7bwD0AInIWCNH/ZZLFhwI0Gg0F3ozDVRF5HdgLYGZh6gBFUZwAPICIfNRut28AN6O8b+oAZvZE3xeRpRi7EkP3M6ZxJwIAPByLXm2328sASZJcitr+LMuOTBvgIGxruHN9R0RenTZA/9Xr/+90Op3zZnY1ArzivV+cJsBafDYqsVsi8m7058xsiYEDamIAZrYc3UUqDRdCOAV8G4fHVfX0JCC2ASRJ8kN0F7z3RyvSrTRNXwSux/FzqnrBe3/ffwHYdh075wBeABCRcmNjY+vy6Xa77ZmZma9F5ASgbDbsa3NzcwfSNF3p9XqtwfVqtdoh59xbs7Oz7zvnakVRfFfVh73Te1R1Gbgb6AEPhBB+qibU6/VmWZafAo8OzF0FfgRuALmILJrZwYoeQgh+7A4At51za8AzUT/WaDROhxB61Z0oiuIT59w1M3tIRGpR2gs0gcPAIaA2sPZSURTnqoFRp1qqqt8Ax+P4c1U9ubKy8tewXO/9k8DTZna0UvgmcFcl7zrwYAhhdUTNf1u9Xm+q6m+VL6HLqnp4J3O99/u892crc7t5nj82LHfsuZ5l2ZEkSc4DB2KoBE4BSyGEi8DtgcKLwEtm9gb/XFxd4PkQwhd3DABjG+534GfgDyAH7q2A9u2KiJzsdDqXGGE7vdlSVX3ZzN4RkeYO8v8UkQ/zPH9vRN/cMcAWSGy4p8zsETa/mmpsbvOvwGUR+Wp+fv6zVqu1Nm6hXdu1vv0N/ffxULO1W6kAAAAASUVORK5CYII=', f5: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIBSURBVFiF7ZK/ixNBFMe/bycnu8m8KS/INRYSvWAhgl1AvOYQ/AMiyP0HWt2JnVYn/iitLbRI/gCLs7gDi7OwOlDujmh7SAoh7EwSoxufzUb2iuxuxESE/cDA4ztv3vsUAxQUFPxjVFYDM1/0ff+q7/tfR6PRt0VIJZc/YmaJT8jMWwCW8rzVWi8z8zEzH2utl6f1eSkD6gDuJ30APGHmA631Wg6HBoAL8WnMLABgNVG/BuDiuk5Eu8aYVhAEKynv1ZQ6t8DvOxF5OR6PawBeAZA4ayqlOsaYhwDOpMxJJU3gFIPB4Iu1dkNErgP4CABEVBaRB8z8wRizPleBCc65t9baKwC2ANg4ronIjjGmlfbh/opAzA9r7bMoilaJqD0JRaRJRPvVarUybwEAwHA4PAnD8JaIrAE4jOPz/X7/xkIEUpCFCARBsGKMaRHRHoB6HH+qVCo78xZYYubNUql0JCLNSUhEbRFpdLvdft5BpVk3a62vEdFzAJcScYeI7oZh+GbWebkFyuXyWaXUYwC3ARAAiMjA87ynYRhuA/g+6/IsgZ+Tgog2lFIvAOhE1o6iaNM5d/Ini/MIHCbqm8lcRO5Ya/cyZo+n1KeY+gmdc0cAthORBXDPWnvZOZe1HCLyDsBnAB0R2Z/WR1mDmLnmed45Inrf6/V6Wf0FBQX/Hb8A0PmpuvkwSs0AAAAASUVORK5CYII=', f7: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKoSURBVFiF7Vc9aBRBFP7e3qlH9mZ3cyJoE8KlUEQDggarkCZGDGghFoKFpdj615lWiYUQERTBxsZGgyAh2KiIjRoICIdFYqM2YnK3uwGze9nPIhNYk9vN7iUEwTxYmPfe9973MTs7Mwv87yYbqN1hmmY/ACwsLLwB0NwyAbZtd0ZR9BpArw5NFwqFgXq9Xs/bq5ATbyilhkneBXA8Ft9Lsq9UKv1aXFycAcCsDTPPgGVZx6IoeiAiR9JwJKcMw7jkuu6HTRNgWdZ5ko8B7IqFZwB80eP9AHpiud8kL/q+/zRL/1SzbfuEUipQSlE/z8rl8qHVONM0DyulxmO4wLbtwQ2RO47jKKW+x5peWa9GKXUthv9WqVSsNHzqIiwWi1dF5AwAkBzzff/megKCIHhfKpX2AOgDYEVR5AVB8C4Jn7oGlFJfAXQDmCsWi9X5+fnGegKA5ZlbWlqaBdAJYNbzvJ4krJGUsG27qskB4HlWcgDQ+8G4dquO43QnYRMFNJvN6sqY5Mes5LGaTyvjMAzzz4CIODF3Lq8AAD8TemUTgL/XR+adLaEmkSdNwJbYtoB/V4CIqM0iSevVUkClUrFIjmiXAGpt8NZ0LUiOJJ0JLQWEYXhHRLq0+9D3/c952XXNIwAQka4wDEdb4dacBbZtD0ZRNKlzAYDLJN28AjSxBeA+gJ0AaBjGUKPReJUqQClVA3CgHcIMVvM872A80OoVtHW7zWjh6kCxBWgAQD/JNTkRuQDgtHZvkZzS8aMAruv4C5JPWtQ2AbxdE88qHQAsyzpF8qV2f4jIbQBC8gaAfZropOu6k1l75v0vkHK5PCEiQwn5Cc/zhpHj8Mq7E9I0zbMk72H5C1mxgORYR0fHuTzkwAZ+zZRSu0n2AoBhGNOu67ZzZ9g2/AEhKOw6rFdI5AAAAABJRU5ErkJggg==', f8: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMZSURBVFiF5ZdNiBxFFIC/1+tuCV2ve2dxWRUhoogeVNRAQJHoJQcxCuYsAWV1IVdB8egtOWcRdonJIV69BIl/F4XcIusPuRhyiBhWD7IMVe7B2rXKQ2qkndnp7ZkYL3kwTL+qeu999V5VVzXc6SK3YDtbluVhgO3t7W+A3f8NoK7rXozxa+DJ3PTDzMzMi/1+vz+pr5nhBlU9b4w5b4z5NYTw/XC/tfYFEVkFnm0035tSOmSM2QohXANSV4DhDIiqOsACEVjx3p9pBD8sIl8Bc+McppS+K4pixTl3uQvASAaMMb8BrwAFcNQYsxlC2AAIIfxsjLkCHAN+EZFvgZ9E5G6gBhCR+4Djc3Nz10IIV7pAjIiqLqvqX6qa8v9ys99auzhsU5blU6p6IdskVQ11XR+ZCqALRIvd+w2IG71er24bP1KCgYQQNowxB4CnublW/lWOFrtLxpgHgGeAKsboQgiXxo0vWqcDzw2NXeuSidnZ2XeAP7LaOn4swPz8/IPAY1m9ys1d0Qlia2vLAZ9k9aHsazKA3d3dAw11HXirAbFurT3RBiEi/7xDdnZ2Hp4YALhn8JBSuuG9Pwu8nSFERE63ZSLGuNmAmZ8GoNkXAbz3H9E9E8234dg4+y3CEcmZGECIiKzuV442mRigAbFCSzmKorgOhNsCkCHO0FIO59xlEXkN+PO2AGSI1nI45y6KyDERGQtx17gOEdGuEKpaAGtAkcsRBqeoc+4ik050YWGhUtXr+X0erbWP72cz7dkxztl640BZm8DuzQZE7LI7Rq5kdV0fiTF+kfsCcCKl5LpCiMhx4GhWRy41+wKo6lXgka4BO0grxF6LI/6HwQcxxh5gIxkoy3JJRJ7fC05EXgdezerJlNJGbj8IvJfbL6SUPs7Pj4rIB9lXBJa99+daAdqkqqqXU0qfZnVTRE4BklJ6F7g/w7zknPt8YJNnvpYh+t773iQxh6Ww1n7Z2CHDv8/2mpSqvqGqfWvt6VsJDsDi4qKtqupDVQ3NC2hVVatLS0vlpP6m/jTLN+MnAETkR+/979P6urPlb7WUJRa/azcHAAAAAElFTkSuQmCC', gg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACSSURBVFiF7dExCkIxEATQya62exsVvIqC3kxBr2Kll0nakI2NRRT//8UPaDGvnCFkSAAiIqIfC0OFmW3cfQegisg1pXTv2Y8OMLN1rfUGYPGKsohsY4yPHn1LBh7g2BwGgGUp5dCxnxxQJ7K5/fiAEMIJQG6irKrnXv3bXd9CADCzlbvvAUBVL5//N7cnIiL6G09xgGkEqS/TRgAAAABJRU5ErkJggg==', gh: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACXSURBVFiF7ZQxDsJADATXZ2h9j4kQBV+hycvSwE/ogviLrz3JpkmRkliCFHjKlW69xWmAJNkZij4UkROAEYAT0aSqz58NEJGzuz8AHJaoE9GltTZv7SqRAWZ2XR0HgOOSbSY0AIB9mH1nQCnlBqCvos7M90hX+BPWWgd3H83MmXlS1Ve0679JD6QH0gNJeiA9kB5Ikt15A78cdRmxlO4HAAAAAElFTkSuQmCC', gk: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABwSURBVFiF7c4xCoAwEETRWbVM7RW8RPDwgp7CE1in1bGxdGGjWDkPAoHZ4gMi8ncWPUwp9WY2AQDJsZSy1eyepiI2Axiulx/srwNa5x/dXwd8QgEKUIACFFATsDv/6H6rix6SXMxsBXCQnGt3ERHPCYCjKHKvs+foAAAAAElFTkSuQmCC', gl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAI9SURBVFiF7Ze9bhNBEMd/e8bek3zjChAY6lhCQsoDQJEU0BFAIhR5DFpK3oQPCVGAI0FEYyQoeIBISFQ0YENprS35rPiWwnvkcrk7n7+gICOd7Nudnd9/d3ZnbfjfrbKuuI1G41a1WjXj8Xi4Jkau1USkLSJWRH6ISKvIWS1KcYHb7nXHGPPVwV8BdxKuXWDb9a9GgIN3gKZr6kVRdNvzvCcJ+ITjFOeKmFtABjy2JDBLUKYIb0n4vnvg5Gy3hsPhoTHmQaK/CXTSe6K0gCy47/t7Kbf0LMdZIoIguDCXgDz4aDR6zowlBsZRFD1mmiKAZqVS2Yw7z60ZHo9/z3GK9vv9fifuL9yEIrIBfEjAD7TWD8MwfArsuLZf1trtwWDwpcx4Y8w9IIx9clMQBMHF1OB93/d3wzB8loADTJRSk/R4N/MT440xd5PwQgEuT0XL/ienpHZ3VtrcZhyf4uQJCMPwW61Ws57nffR9/1EK3oui6IZS6grQAgS4r7V+q7U+XxYO5QpRurz2gK2c0tt1n6XgZawmIm/cxWJF5GcQBNcyfF4nfOLnHaAXBceB24mA3bybrV6vXxeRo4RvG6gtC581c2B61Ny1u9KZ/zM4QRC8KLPsItJy/Stb9jhwnMve34BnFaIKgFLqU05t32B6zi+7pgNjzC4LHrV5fw/MrO1rE7AOOGRUQhGx7ut3pdTnuN1aexO45F6XrnBFAo4o/r+wMjhZIK31VWCT0+mZWGtfDgaDvVXBz+zMAH4DDHIgU7/zlNMAAAAASUVORK5CYII=', gm: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFLSURBVFiF7ZXBSsNAEIZnN6Q0mflzK4iCDyCKVR/Aa5/DglDw5mt4ELwJvoTQuw/gSQW96smrbHJJ6a6XCKEmabfe7P6wLPmZne+HwAxRUNCmK1pWICJ7/X7/OI5jU5Zl4dOcmYe9Xm9rNpt9rpVORG4AuOqYLMtGq74FMAYwBzBn5sO2Ot0B31dKXdQt59zVqnAiuq31d94BtNa7DXaT1wW3RHReFMWTdwBr7SMR5Qv2gy/cGHO3LHSrsiwbAXgG8AXgPk3T7S549c9ddY/XBvsKwFkNbkVkEuABHuD/Dr7ykEmSZAfAtBpeLz4L7M/wqn5a26AOgBGRQVt96y74gZP/bD9d+Bat9Yl3AGYergEnInpfNKy1v7ylASqo84STUuqSalvUOXed5/lra31XM2Y+ICLVtc+bJCKDKIqOrLUfxpg3n7dBQZunby7UlQaBIuYbAAAAAElFTkSuQmCC', gn: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGKSURBVFiF7Zc9TsNAEIXf2pBid2e3BKWloSREoFwA6JAoKHOJHCSCjpJQRuIEXCBSEFBBAXRwgAQlUgrPUmBblnAc20GAwK8b77w3n/9WWuC/S2QtWmu3gyDYWGaA7/vPo9HopjCAtbbJzMOsnpxyQRA0p9Ppbdqil2VccnAsIcTcrMy7k1I2fN+PHt/AOdfNObADoAUAzNyYTCZ3eWE/iYgcETljTD+vxxjTj3yLerNewbeoAqgAKoBMAGPMQaLkArlxr7V2vxSAUmrdOdeLE5kvc09P9DLzhVJqLa83FhH1ot1Ma31S1K+1Po38RHReyCylrBPRLDTfA1gpCgBglYgewoyZlLKe1pQa7HneIYBaWF5rrY9KAADAEMAmgFqYeZYLQAixmyjbQoh2SYBk5k4aQOpHKIR4XXZgSuZL6vU5/b4xZo+ZKSOwBaATll3n3GBer+d5b+Px+ApAkBd4obTWx4m/5Lhszu/eCSuACiBLzPyEj7MDO+cevw6pgKSUDaXU1o8M/zN6B0PHbHcrp3AZAAAAAElFTkSuQmCC', go: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIZSURBVFiF7ZY9axRhEMf/s3c5jnPnWe4sRL+AsRAbhYiFFsaUfoKgomgX4nUqomBnoUaEoASLfAOxidooCEG0iY2HmjoIeuc+s3dw3u2OzS5ZMDH3tin0frDFzuuf2d3ZBxgz5n+Heolh5vOqOu04znoYho+azea3zJUlGGPuMLOmrp/MXAUwMYr6O06AmX8AqGzhqhHRvLX2xTACnB5ikubPiGgegI3vJ1V1xRjzynXdQ1kKAAAQ0S9r7UIYhpMAngCIAEBVTxPRmuu6C5VKxWQmIKHVam2IyBUimgKwGpsniGiu0+nUmPlyP3X7FpBgrX0vIieI6ByA5KvYD+AxM79j5uOZCohRa+1yPp8/COA+gE5sPwrgLTMveZ5XzlIAAKDRaPgiUlXVI6r6MlX7YhRFbwAUMhWQEATBpyAIZgCcBbAemw97nndyVwQMQn6UxeJ98ADAmZT5o+/7r7fLGckEyuWyx8z3iGiNiJLmEYCnjuOcwubL+QfDToCMMbPdbvcugH0p+wcAcyKyuk3e8AKMMcdU9aGqTqXMGwBui8gS4k05cgGlUulALpe7paqXsPkIO6q6WCgUbtbrdfu3/IEFqGqRma8BuA7ATbmeE1FVRL720zihl9/xdwB7t3DViOiqtXZlkMYJuZ0CisXiHgDpReIDuCEiF9rt9udhmgM9HsmMMbNRFM04jvMlDMPFXT2SjRnzz/Mbkgi4VupcrTsAAAAASUVORK5CYII=', gp: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIJSURBVFiF7ZQ/axRBGMaf193csey+w0W4WAQsLFROC220MGDQQpB8gNj4CUQtooWlaKONAT+BTdIbRAsjFqa2SM4YBasUJ9jMrOxxt+GxyB5sxPuzG0+be2Bg9pl53+c3zLDARBNN9J/ljaOpMeZotVqdr1QqXqfT+VGqSRRFM6q6rarbURTNjFg2par3VNWqKrPxeFDBkQFrcwBOZWNuBOArqvoRwBMAmlt6oKqnywB4feYHFATBrDFmRUTeAmhkdgxgrbeHZOOPxUMAhsk3xtzxfb9JcjHnr/m+f4bki5zX9wB+meQoii6LyHOSZ3P2jojctta+yfZcHKVXIYAwDI95nvfstxM7AA+dc8sAukX6FQKo1+tRu93eIHmi54nIarfbXUqSZLdocGGAJEmui0gvvEnylnPuXdngnoo8Qh427FAAYRi+AvA1+2yIyLoxZiUIgtl/AtBqtX6SvCQiqz2P5KLv+59UdQnA1FgBACCO4+/W2hsk5wFsZrYCeKqqm8aYa2MFyIG8d86dF5G7AGxmnyT5WlVfTk9PHx8rQKbUWrucpmkjfy0AFtI03RKRmzlvrwzAXp/5ASVJsptdy1UAzcyOACxkc4rIVmEAkhvYf/U7JD8MAAUAxHG87pw7B+A+9v+OAAAReeSc+9yvToY1LqNarVYjeYHkN2vtl3FkTDTRRH9NvwB/p7VxzieUWgAAAABJRU5ErkJggg==', gq: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAG/SURBVFiF7Va7TsNAEJw5IqW5uypCQkANSNChKAgkviJ8BkU+gAJR0/AJdPAXgASiDRIISqhQKp+LFMRLgS9yQhKfDeEhmOpsj3fm9nZXB/x1MI+gtZ4FsAVgpmDsHoCLOI6fJ5EqeVFIngFYKijucQdgZRJBBQQpKw4Ay3mE3AxkcCUihyFEki0AjRBusAGSj8650xCutbYpIkEGQo5gqvh2AwNtWKvVTLfb3VVKrSJtOxFppp+fSF6GBBWRDQALAEDSH1tPRNrVavWo0+m4UQYqxphLAOvl9hKMa+fcJoAXIHMExpjGF4gDQN0YU/cP/S4QkTmSfr0Tx3FQxYdCa90keZLGn39nYBjW2gaAVsbglXMuaA4UwVgDSZIskvQFCJ+dz8a3t+HYDKQ1MJ1tZ/BzM+Dxfx/4gDjw2+4DvUyAhtZ6OGip+4DWuuljjtLqGyB5A0Dw1nqtzxo8fvxmIEqptn/o14Bz7p7kQWpiWhCS+1EUPfgXAzUQRdGetfY4SZI1pG03YgfFFEV20mVPKdXOigMBk84Y4zNSqgidcxM1ihgohTwDIXPg7gP6t3mE3DkgItsoP4rPC/7zB/EKWAacXXMbV1kAAAAASUVORK5CYII=', gr: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAPmSURBVFiF7VZNjBRFFP5eN85f1+uejb1RNpGsmqhBjYkLB3FjNHIRBTFBjkuCfzEeTfDsyYPEi4kKasSgMXHB5cSBeOUgohww/oQseyCsGSMhQ/fMzvR21/MwVWMzw8zOsrsn/S5T9eqrel999aqmgf863NVOmJiYqBDRVKFQmCqXy1tc111aXl6Ob1cAjUpk5geI6F2t9R4iqvQM/ygi78dxPLshApj5VQAfAbhjBep3lUplplarNdZNADO/BuBoLnQJwCkRWSAiX0SeJaKddi0RORPH8fMA0lFFDIRSaiszLzGzMHPKzIdwi7ph5h3MfMXwhJnfWXNyI+Cr3KJvD+My80PMfMNwr4+Pj6tRcgy7BaVisfglgE0Afo2iaAaADCInSfJ3qVQqAngaQClN04PFYnG6UChkSZL8PmiuM2RHjwMoAQARnQCgV9oNER3PJbobwF4immXmc8z84KoEENFYrju/UnIAqNfr8wDeADAnIhdyoqcAnPU877FR1kG1Wp1k5tP2/JVSb400sQdKqUeUUmdydTQfhiHnOX0OKKWeyrLsIoDnbIyImrcjII7jX+I43gXglAndlyTJTcV80ztQrVYnTXIFACLyMxEdiaLoM4xQA4PAzHcCuAzAB7AYRdEWAFkf0ff9b3N2HcaQGlktfN//OHekD9t4N0EYhiwiL5ruT1EUHcIadt0LU5SdpI4z2Seg1WpNASiY7jfrmdwIuKWb3aDjOJ5tE1Gtl6iU2sfMnwdBcP+wRMy8l5k/DYLg3p6hrbahtV6w7U22kWXZVcdxrNpH8zPDMOR2u30MgKe1BoBXAMD3/e1pmqbNZvOC5bVara+JqKK1FgCvA8DY2FiQpukBs9yfcRz/1udAo9G4COCa6R6sVCqb7ViSJC8AsA79AQBBEGwTkR9c1z0fBME2w9ud+1a4ZH7dLMuOonMDICJHkHuW8+eSAfjAbtp13TnrkIi83J3gOCeMYzPoXGNHRCxvn6GJ5SmljovIfhNf8DzvcN7d3u+BMjN/D2AHANFaby6Xy812u10DUAZwPoqi7QAcZr4CYAKde31PGIZeu93+C53/D8sjZo6Me9e01s8Yp7vorcwlAHuI6BMRebPRaNSM/WUzPgsAzPykSQ4ROQlAG14pz+sMywyAY0T0RG/ykcDMc/YBsTdAKfVh7sGaHsRbM8IwZGZumoXPmbDDzFdNbBGAM4A3EoY+tUmS7EaP/Uqpafxr/yw69vfx1kWAiOzsEh3npGnaSrcfKoN46yLgNIAbAL6o1+uXTdKXzPBiFEVnB/E2DMw8b876vQ1NNAie593l+/4u5J7x/7EW/APTIpCPKfRQ+gAAAABJRU5ErkJggg==', ce: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALKSURBVFiF7ZexaxNRHMe/vzu9S/Lu92LjkBoF0YqoaCl1EBzdKq1IcFSXgosO6iAddHFzcRadrPgHWKHqIIKLS0EUqi52qtXWak2uCeXS3M+hL3iUpHdpIl36hYPfu/u+9/285N7LC7CtLkgpNaCUGtiycGaum2u03f5WFxgkMtbDdiHsTtNrtdq867qzAEYMxIjjOAtBEEz9VwClVG86nT7uOM5JEakTUQbAYQBEREOu634LguB93DjUTigz7xaRa0RUBNAfYw/DMBysVCofNjLtSJhNzHwTwG0i2pWwD/Dv/dg8QD6fV9VqdRxAMXL7j4hMWpY1BWAhDMOAiC4DGDbPQwBXKpXKxzZgmwN6nveKmcVcJWa+BSAVNTHzqFmGstnl2FTMfD8S/tXzvGPrPZF9oLvhSqn+yMAL2Wz2wAa+1a6GAwAzT0Rmfz4G9oRSKm5VJJfWOsfMNRP+rmsDN1GrrXgIZoWIyJOtADgSqd90IWen1npIKdWbCEBECo06lUrNdprOzHfNvvE2EUC3JSKDpswnAiCiuUa9srKyr1MAItpryrn1z1p9Al8i9ZlOwjOZzB4AR03zcyIAIpoEUDP1pU4AbNu+GMl5lgigVCotAXhhmqc8zys288VJa50DMGaaPhE9TwQAACIyBmAVAIjokdb6UJv5loiMA8iZ8e6Vy+Xf600tT0RBECy6rpsFcBpAGsCw4zivgyD4GZdcKBQyAJ4CaGzh01rrUd/3a21OArbneS8jvwllZh4zQE2ltT7LzJ8ifRaz2ezBVv7YI1mhUMj4vv8YwIXI7ZKITBLRFBHNA+gJw7CPiEYA9EV8MyJybnl5eXrTAA2f1vq6iNwB0JPAH2LtK7jh+/6vDQdOCABg7a0Ow/CqZVlFEWn2T+gHgIl6vf6gWq3GnojbBohKKZW3bXu/iPQCWCKi7+VyeQZrs99WYv0FOVblbmn68tAAAAAASUVORK5CYII=', gv: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABqSURBVFiF7dGxCoAwDATQNF31/kp/SjfBj9K/SnWT1FWwBYdu3huPwB1EhIiI6O9CJY8ARnfvWpSo6mlmm4hcnwYAWHLOc4vyhzWlNL3GNS6pCiF4Ma/cRwCDu/ctylX1MLNdCi8gIiKiG6OeGweMzSsoAAAAAElFTkSuQmCC', gw: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADtSURBVFiF7ZYxTgNBDEW/nXSw3jvkLiBExwkQBYdApIsScQ56SoQEV+EU3tku8qdCQsuMROEqzCu/R/Mt+Vsy0On8d6Shr8zsMiLOM0xUdXb3dwDHPzVgZjuS2wzzHxymaXr81VyySRMRiareeL8ys4uIGDLMVbW4+wcqI+hURzAMww2AZwApWwBgJnlbSnlZFlohvE40B4AzEbmqFdY1UVUPEaEikhJCkkVVnzL+Oj2qIRzHcRMRWxFJyQHJWUT27v65rFUzEBEPAO5IZvh/N3EEcL/UW1vwCmBKcwcKybfE/06Ifg/0e6DT6XwBCd5lXZndpl0AAAAASUVORK5CYII=', gx: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAI4SURBVFiF7Za9axRRFMXPu8Oat+6704gfENbCQojGIiSdQuz8AP8FsVAQwSp/g9gaU1oIVpYWSWGXCHYSi82ugkSMrYhk3lPZWWauzS5M3s7mzRJBizkwxT385sxl5s7lAbVqVVAcxzeYucvM+8y83mw2Z32m2WzOMvPGkNmJ4/h6lWwVAlqt1mki2gXQKtjr1tpbRY6ZNwDcLFhORM45574dlk+hBqIoWvQeDgBXS9BlrzZEtBjKDzaQ5/leif2lxBvjJtw7XQPOua6IPC1YlohWfE4ptQLAjWoReeKc+xDKD87ASMaYuSiK2lmWvZ/0XY0xJ6MoWsjz/Ku19mPV7Fr/VJVmgJlPKKUeikgbwBtr7QsA4mHEzLcBLCul9kRkzVr7/W80eYyZe8wshetRSZOPPaYDYCYUHvwNjTGXAcx59r0S9I5XzzPz0pEbwPirBoC8IlfmTdeAc+4tgF7RU0o9K0Gfe3XHWvsulB+FAAC51vqliPxWSu0qpVaTJFn1oTRNN7XWnwH8EJFXRPSg3++7krxa/5eqzAAAwBgzr7VeajQa+2ma/pzAnNJaX2k0GjNpmh56EJlKxpi1woKxcRxf85nhsc2NOGPM2KCWKbiKjTEXlFJdz96x1l4qGszcg7ewROSic+7AL+wruAeIqF1in63iEVEZN10DeZ5vo3DSGWqrBN30aisiR19EaZr+0lpvA1gAcBzA6yzL7g8GA3sgKIq2iOg8gDMAPhHR3SRJOqH8WrX+AOKvxBB1ixZMAAAAAElFTkSuQmCC', gy: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKDSURBVFiF5Ve/b9NQEP7u5Vcbv3sDKCAiNlRVgAABnRmqMMCEmPgDGJlhB6ayMTAjVpAQCApCECTWIioQSPxYaVWJCmE7lkhKfAx9AeO8JM4vln7Ls33n932+O9/ZwE5Hbkr7FowxZwqFgt9qtaIpcfQGMy8xszDzGjPP9/NVU9KwZdcqgPogEdNAkZnv2ygIM29orQ+5HCnDZnljzAkR2ScixawKlFJFEVnCdhQAYB3AYhiGnzIJqFar5UajcUVELgHYlZV4AD6GYXgweSHv8tJaV8IwfALg5ISIe8IlQBHR3QT5DwC3iOhDHMdbDn8neqTg3MAbtdYXEsXzbnZ2dn9W0gSKzPwgsc/A1zEp4Km9acvzvGMjkMMYcz0reVcfIKJO6FeiKHo7igAAv+zqrPy+YObYKr83IjkAKM/zalrryiBHVxESABBRPIaAOIqi54nzgjGm1m63V6Mo2vhH6RgkmcHMV0VkWSn1Km1zCfhi18+TEkBEB+zhXNrWlYI4jk/l8/mjvu/XJyWgH7oE2Bz9yZPneXtzudxCEATP8HfKDQUR6URa0ra+NcDM80qpNyLyiJmvjUJu0Wlm3zILsM2jDttKiWikpy+Xy8cBLNjT12m7cxilyQE8DIJg6AhorfcQ0R3YTz8RuZ326RrHDvJ1Irocx3ErK7EdREcAXASwGwCI6EUQBKeRqgOXgPcADmcly4gVAGfDMNxMG1wpGKcDprEpIjcbjcYNAD9dDlNJARG1lFJrvu+vAmgPLdsYM8fMXxMjdRlAaeiNMsD5Y9JsNr+XSqXHAM4DYABzMzMz0mw2X05aQM8+YGf4IrZnOob5HJsotNYVz/Nq+E+Tc+fhN7b62NV77z2BAAAAAElFTkSuQmCC', cu: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAG5SURBVFiF7ZYxTxRREMd/cxCvYOdVZ2KMX4GOYGiJBZWNgomVrTFSG/0AfARb6oUGC+yMiYVRPwGVjV511c0zuTUmQ8Fu3OwtywOOkMD9m3k7+c/M/83se7swx22HNB1Zlt0VkffABrB0idwjYNfM3gF/kwWo6j7w5BKFm/hgZpuniWgTEDnZ+S8R+Qrg7mvAAwAR2euq5u6b5xXRFOCq6iGEvPKFEPLKnxqvqj9U9Xft+QC40+T3zlR0QYjIT2AdGJaux1mW7TZ5iynJ3P1Pta535hRuZaOZHanqOvAZuCciW8Dziwj4KCIvynXbjNtiDgHM7CiE8KWMW2jykkYQY8yBt/xvZxeGwJsY435K7qQOAJjZDrCTyk/Flb2EqUjuALCoqg/d/X4XSUSGZvYN+DczAYPBQIui+ASsiEzdXVNQ1e/9fv/RaDSys7hJI5hMJtvASgq3xGpRFK9TiEkd6PV6y7XzvdXFFZG8tMszE0CtUzHGzm+BqlbLqTPfmfi6MBcwF3DtAq7yl6wtPpqZ1vltAvaAp+feSgJEJB+Px8/qvraL6GVpN4BsRrWjiBy6+6sZ5ZvjBuEYnFShTjXpbeEAAAAASUVORK5CYII=', gX: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMMSURBVFiF5Za/axRREMe/sxt3k7yZzRXRi1gYBVEwEoONYiUWBlGxSSzsNCgKFoKNjRFBUP8CBbFQRLCRmMLKIqX4q4pBo6RQogThTG4vIat7Y5G3uon5sXtnbPzCcW/fzffN52bn7VvgfxflCW5padkcx/FGVXWJ6Hu1Wh2dnp4eX1UAZt5OROcAHADQvkjIGwB3GxoabpZKpcm/CdDEzDeI6CwAJ8NaXwH0lcvlgboBmHktET0BsCs1PaaqjwGMOo5TUtU2Itqtqt0AxMZUVbU/DMOrADQPSFqeiDwXEbWfj8x8bCnYQqFQEJHrIvIj8QRBcL7W5AiC4EqyEDO/bG5uXp/R183MFeuNgiDYnTu5iGwTke/JPzfGtOXxM3NvqgqvkaHJFzbXSQANAKCqFyqVypc8AGEYPgQwYP07jTH78wC4AI7b8ZhdLLeI6NqvxR2nJzOAiGwBsB4AVHUQNXbx1NTUMwBJ5fZkBiCiTan5t7Ukt9KUvz0zgKr6vyYdZ6oOAABI/HEegFJqvK5OgGT3lJaNwvwmHEkGRJR/D1sVi0UDoMNejmUGCMNwAsAwAKhqd6FQKNQCMDMzcxRAEwAQ0WBmAKt79lviOL5YQ35fVS/bcdVxnEe53K2trSIiE/Zp9iMIgu48fhG5kzpD7q3sWETMfCx1FlSYuTeDzV+QvGSMKWbJ5y6ciKJo2Pf9ZgB7iWgNEfX4vt/V2Ng4Njs7O+/tp1gsGtd1ez3Pewgg/dj1iOhdFEWvVgJY8rBg5ktE1I/5ffIZwHvMba82ADtgG87qG4DAeqoATpfL5dvLAfxRgURRFA15njdERF34va8FwEYAWwFsALDGzscA7qvqESIaBXDIQhzyfX98uUpkeSklZt7nOE6Pqu61AI2Yq8KIqj51XffB5OTkh8QgIn0AbiFHJf66ROSEiMS2KavMfGaxuCVvQb2Koui17/ufABwG4BDRQc/zJqIoevFPAPJArLpEpC91O2JjTGfyW5b3/bplG/AU5hqySkQrHtOrImNMJzN3rBz5P+kn0ZYHxHQI7f0AAAAASUVORK5CYII=', gZ: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFlSURBVFiF7VaxSgNBFJw94SzuzeuSwl4DfoWESLCJWvg3gmD0YzRFgoV28TvsTTBttlJD1mYPL4Ekt3pnEG5gOd7u8GZu397bAypU+MeIVbWrql0A8Z+LkxyQdH48AtjdlvivTEQ/EO8BOPXx2A8AOCF5j8ByhBiIvUDHxxPn3LEx5gjAyM91SA5QQjmWt/1NRA7TRVXdJ/la2plQ1ZtM8hHJxjKHZMOvOZJOVa/z5M5bgpl/jgE0rbUvywQ/1/QczOfzz5y5cyFKkqQlIrVNRBGpJUnSQvgBr1BhLXZUtS0i9U1EEamrahtFHkJV7a7rASmyvUBErvLkDnW5B2C4qhEBGHoOoigq9DOMSfZXtWKSB9kuGNKKTaCJOwBnPp4455rGmBmAZ/g3B/BkrT0H8F60gdRED983YnoVp+IP1toLAB+BeYNNZMuxtb+ifhHioSVYMKGqlwDcdDq9RcnbXqFCafgC8Etvm64mXykAAAAASUVORK5CYII=', g_: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJNSURBVFiF7ZZNaxNBHMaf/7RkEzKTgLAgiIgHLxKpoIJNfaP5Fh6KfhEV9SN48OBB/B4pIm3JQaGoCOJB8BrxkN28sG727yEz7TTZZHcnKSL4wMC+PvM8v5nDAP+1hKSUDSll469MrpTaVEr91mPT1UcskeE5gHUA60T0zNWEXH5SSm0B2LOfMfPdMAzfFfVyJfB0xkiIRy5GhQmktTdyoeBCYKb9kZkDhUIBlFK3AWzr25H1agQAzNzS35xOAABPzAUzv7KuX5prInp8KgH02m/rSdoA7LU+ALCrw7SklHdWHgDW2idJkrYPjta/yF7IFWC6fdpOD4JgHw4U8hLIam9UmEJmgDztjVwo5CGQt71RIQoLAxRpb1SUQhaBou2NclOYG8ClvVERCosIuLY3ykUhNcAy7Y3yUphHYNn2RpkUZgKsor1RHgpr0w88z3sN4KK+fRBF0Q/zzvd9KYRoep53n4h2AJzXQc95nne2VCqt1ev1n4PBILL8vgN4qL+7EEXRG3u+Eyci+7RDRO04jneEEFsAbhHRNQA3AJQyio8BfAXwAcAeM+8T0QsA9zSJE6em6QBtHB84YkxOvXMnIqJP2vQKUmhasr12gyBozQSoVqsbQojDBSZdAB0AHWY+qFQq77vdbghMlmY4HF4noiaAm3r484ySJNno9/sfYTckorGVNCaiz5gcNDoAOr1e75ttEobhcbJJkLd6AABqtdolK0yTmRuW93iGAABIKS8T0ZlyuXxo2q1Kvu/L0Wh0lZl/hWH4ZZXe/7b+AO3aCaAfmf/1AAAAAElFTkSuQmCC', g1: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAToSURBVFiF7ZddiFVVFMd/657jjGfm7HM/lBLHj7JSSCwNsywiAvukIHqpHgYqo5dIH/owpLSQoF4iNYhKK7UHn4KgoJ7UHkQzmDIrk+xDTSbI69y778zDnXPO6uHug9c7546O9FYLDuy99lrrv/Zee+21DvzXSS5VMYqiSpIky0REPc8bqtVqZ/9NxyYlY8w6Y0zDGKPuaxhjXrgUW94lgD8FbAZ62tg9wJ29vb2nms3m0FTsTRqCYrG4IE3TR0RkiaoOAduBPcASIFHVjYCIyCu0NvMdsApYrarXi8hhz/N2j4yM/D5lB8IwfEhEdgL9bey/gBmAD3xurb0fwBjzOXAfEANngMvbdCwwaK39NA+n0G3nOeA4wz6Aqh7ImG1jvwMcwAC7SqXS/It2IEmSRzNwVX0pSZIBVd0KpE5kz/Tp0zdn8j09PZuBvW6aqurWOI7nAq9nTiRJ8nAeVi4ZY3ZlN7yvr292xu/v758VRdE1k+gt7O/vn5XNS6XS/LZM+SBPx+9i6/tsUCgUXgTWAIyOjg4DwwDOkRuBQpIkh0dHRw9ba4+1G0nT9Pm26Q95QLmX0BgzAzgCzGrZSQccOEEQDHiet11E7u5QO6CqqxuNxo8AfX19sz3PO+UwhkVkcb1er3ZiTbgDLs/3ADMzGd/3+6EVAs/z9ueAA9wsIvvDMLwWwOlkG5ypqnuNMU9O6oAxZh3wLq08z8Kzp1arHQcoFArvicg8xz8oImtEZC1wyPGKIrINoF6v/wLsc3zf2XzfGNMelnMhiKKooqonaN3+GPhCVQ/29PRsqVar9WKxeGWapr868a+ttbc6OYBpxpj9wHIAVV3SaDSOVCqVqNlsrhWRFcA9zpGG53lzR0ZGRjLPAEjTdKmIZHn/srU2SyEAXOHBAexoAwcYF5EdqrrcndR1wJFqtVoHNrnTXQ+8BoRxHC+jFeb8d4Ccyyki411kJ+ikaRp3LqpqO5ZOUHIh+AMI3e6+dCHYXK1W62EYXiYif9I6tW+stbcAmVPTwjA8ICI3uBNYUKvVfiuXy8Xx8fG1InITcJfTtZ7nzctCcN5OXUl9o8P5vdbaO9z6NmC14x8SkY/d7gZx8Qc+s9Y+AIgxZh9wW4e9Z621b044gTYnVgPPAIudxxQKhatrtdrxSqUSxXG8T1WXduo5R06kabpybGzstDFmIfCzW4pF5IiqvmWt3dGuM+EOWGu30yqpZxwrjeO4AVCtVuu+798ObOPc8UMrpp+o6oqxsbHTAEmSNDgX679VdVUneFdyHY8aYzQMwy1dZGZGUXSvMebBIAjm5smEYbi1rRY8d1HgzvjOTDEIgjkZPwiCAWPMokn0FgVBMNAmP+dCxahbGv6UDXzff7pcLs+Louht3/dPAkeNMfsqlUqUyZTL5aIx5ivgqO/7J8Mw3BoEwRzP855os3k0Dyi3GJVKpSuSJDlMq5nIJVXd0Gg0NgGEYbhBRF7tJgvUfd9fcvbs2ROdC7kn4Hq4QVrtVDsN415Al9u48Qo3jJ3MeeDAYB44XKApLZVK810ncxVwTEQ+VNW9tApLDGxU1awp9UXkW1VdBTwGLASO+76/uxv4BR3II/dObOuy/Li19qOp2Jvyf0Gz2Rzq7e0dA1Zy7t+gAay31r4zVXuX/GtWKpVKrqrh+/5Q9rb/T1OlfwCM3+MKZP7dkAAAAABJRU5ErkJggg==', g3: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHGSURBVFiF7Za9ThtBFIXPNci2PPc8ADwDCUgUPAIiUhSE5JA6LngGRBvlBUhHg6ALlLxEUKTwUyYtFCltrwsLz6WZkUwYY3bX/ARxpNWO9s6c82n37s4Cryoh59yCc27hScJJtkgOwtEq6jNVMPwzgB0AFQAC4H21Wv3b7/d/PjjAP+FRIiLvikDkAhgRXgoiZZRUaLYY7gEcDZWPwjURkW/OufmJA4QAC+cNM9uLhTDeCDUvIoMcvveXc+6Nc+4tAKhqk6SRNFVthvq8qs7l8ZzOMznLsvMx9dM8fkC+R/AgGgmgqlskL+NtJnlFcnecIcn9MDeuuyS5mQtAVT+JyBcAM0OXpwCsjgMA8AE3X+8ZAF9V9WNqcrIHRGR5aHwQhgPv/eG4dDNrVSqVtQhhZs3gswLg+30BnJkBANrtdpJ8lLrd7gGACA2SFj1T859vE74CPHsA7/0fhL3BzH4X9cn1KR5Wr9f71Wg0FkXEsiw7eXSACFFmPfA/98CLARjVAz4O4s/GBJT8S0oCmNkZgHUAEJFbG0gRBc9bSj6CWq22DeB4EsFBP+r1+naqIHcsmia5ZGazZZJF5KLT6RwDuCrj83J1DWoNisHgdNRGAAAAAElFTkSuQmCC', g6: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAItSURBVFiF5ZWxb9NAFMa/dw5D5DunKapAYqOqiroAFRvdq6JWbLDAH8DOH8KEmJiYEVIIAxOCgQEhFQbaABIINipK4jtLiMB7DDlLVuokjuMgpL7F99179vfz+c4POO5BWRGG4QUiWvGSAbxwzn2bJ0AtY35eKfUagMrkOwDOzRNATcivhmF4+p8AJEnyhpnXReQagPvpPBGtzhOA8iaNMdsAWh7gLjM/q8pQRDpJkrwdCxBF0YqIvK/KdCj+MPN6CpG7B+I4/gTg15wAAqVUmIraiKLfAD4CWAPwXURuzepKRPcALAI4tNa+mgQADI7gGoAF51wLwM+y5o1GY5mZF718gsELAhh/DDv+Gmitl8uaAwAzX03HItLK5ooAAMCsR3HHX/u1Wu3p1ACz/AuazWYDwGX/nOfdbrdbCEAptZ+RpQH6/f4WgBNePj7iM+rGXq/3A8CBl7P0g53MuF0YwEe6CmVXICCiTT/ei+P4w7QA6T5YCMPw1LTuWusNACe9bOXVFAUotRGJaDsjj3z/aQHK7IP0+x9aa1/mFeQ2ozQqbEoPrLU38xJjV8A3pWRWdxF5NCo3rhcAg3/2DSK6DiAoab7rnHtY5t7/I+r1+hljTFtrnRhj3kVRtFll/dhNCADGmDaAK5kpJyJnnXMHVdRPOoYAsDGkdRAEF6uqLwLwdXiCmb9UVT8RgIhuA3CpFpE71tr9yuonAQCA1npJKXWJmT875/aqrj/e8Rfmm9IahVSc5wAAAABJRU5ErkJggg==', g7: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKuSURBVFiF5VfPa9RAFP5esoQtmZcsiD/Am6JVerHqRei9RezRCqII3uzZv8BT8SCePAjevAkitUUQCiJiLx70Yn+I+KsgUixsMnvYJTvPwyYlxGQ3m92D4AfLzpv3vXkfMy9vEuB/B6UN3/fPdrvd47FpRORNq9X6NUoCpdQh27bPNJvNNQDdQqLv++eY2TCzpH6boyQHAGbeZGbxPO9Ont9KjSXHP+m67pERNUzG/6fynHYyaLfbP2u12jIRrRGRBjAdu1Y6nc63YTJ6nnfCcZx79Xr9KoCpeNqv1+sXHMeZ7nQ6rwEYIFMDCZh5HsAyABDRA2PMq0FJiWgnDMP1OP4RgJtFXMuyZpvN5ksAqBUstinSOxERWSSixRICngBYj2NeENECAJVD3Y6i6MN+XMF6NWZuAXAGJU4LCIJgITvPzNLPn7sDACIAnwGcBvBbRG6V0LBTMN8C4IqIznMWCQCArVhAQ2u9DKBdQsRfEJEbRDRnWdbSUIHMvJT0A6XU1OCIarD6+LZS48lC1ojodwT7XZCIcptIGTQajYYx5iEAiMi7MAzvlhJARFvJowjgZFUBURTNEdHleM23WX/hEQRBsAdgNzYr7wCA+dR4tbSAGEkdVK0Bm4hm4/FGEASfhhWQ1EHDdd3Dw2ZXSs0AOBCbz/M4ZXcARDT0LhDRpZS5MqqAKnWQnP9eclFlUXQXAOhdqyKyXSFxFo/DMLye5+i7A0EQfEGvl48EEXlW5OvXiIDepXSNiK4g9fIyZPL3WuunVWL/DUxMTBxl5lWlVIuZP3qeNztOft8iBABmXgVwMTWlReSY1np3HPxBjyEAzGRsZdv2dC6zAr+MgB/ZCWPM93HxBwogotsA9l+nROR+GIaFHyxD8wcJAACl1EHLss4bY75qrTfGzf+/8QfR6ftBkpJoKQAAAABJRU5ErkJggg==', g8: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALGSURBVFiF7ZZNiI1hFMd/57nXnY/7nmck5auU0JTUEFlYKCUfYZTYTUrN0saSkiIhlI2FJZYWmIVRPhakRtFQY5CEhSFs5n1eo2vc97G470zPjLnj+rjNwvzr1j2nc57zP/d/7nMemMb/DqnXwc3NzfNyudx94Duw3Tn3YqI4Uy8C+Xx+JbAIWArcUdXWetWqhpyqXlNVn33eTQWJgqpeCUh8iKJoWRgwOgOZZveAxZmrBLwRkdtpmp5LkqS/ShFR1R1AJ7ACmMfk0g5471ckSfJpDAFr7WbvfXeVpGHgoHPudOi01s7y3l8Etk5S8CcYYzYODg7eBMiNOEul0tuGhoaciHwQkX7gFdAAzMziNjY2NsalUqknS5lRKBS6gQ2ZnQIPgR4ReSoi/dk5X4H5Qf2uOI5PAL4WsmKt7Yii6Eum4XBLS8uqrPujgbZPxmsLoKqtqjoQxF0DCmMK1MLCWtvhvb+UmT3AXuAxlV/oc7lcbhsaGhoIc4rF4hxjTC+VmQDocs7tBr7VUvMnqOr1oJO+4HtnFdKbJut8BDXfhNbaJd77Pipdj+CBc24tFf3Hw0RRdMgYY+I4Psafdh5CVU8GXaXW2jV/e2bdruJaUVcJrLWHARPH8VH+VoJwCKMo+mdDWJME1toOYEtm9ojILipXNcDxpqamBeNz0jTtBd5nZruqXp6IxK8IGGvtnjRNz2f2d2PMPufccxE5lflm5/P5G1EULQ8TkyT5CKz/FYlwBmao6hERWQzgvW/03reJyMLRYJH9cRyfDeJvAesy2wOPgLciMjoT3vtFwOqgTpdzbidQHkOghmV0wDl3JnRmy+gCsK1K3oQIl9EogWKxONcYc5fKCwYqGr8O1vGzKueJqrYDnSLS5r1fwG+s43qjoKpXJ3uQ1BNT+ySz1m6tpXi+XgTK5fJDY8xLKv+O9mrP8mlM4wcWwBWolfJyUwAAAABJRU5ErkJggg==', hd: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOlSURBVFiF7VZNaFxVFP7OjJnf+903k05Ao4QYUWurCAZdlCKCYv3BVCiIq1iKomDRhVDXgrhpUVxoaXEjFZRWbEEQ7V6FilaoWqWkWUgTAi0yue+ZZGbeOy7yXnyZ/L1p0pV+8OCce86957v3nnfuAf7ryPc6YXBwsCIio4VCYbRcLg/l8/m5drvtXy8ByepI8i4ReSuKojERqXSZf1DVw77vn7ohBEi+COBDAH0buH5RqVTGZ2Zmgi0jQPIlAMdTQ5cAnFHVSRGxqvqoiDyWrKWqZ33ffxpAJyuJNWGM2UFyjqSS7JA8hFXyhuQukn/GfkryzU0Hjwl8klr0jfV8SW4nORv7/jUwMGCyxFjvLygVi8WPAdwE4Dfn3DgAXcu51WpdLZVKRQCPACh1Op0DxWJxd6FQCFut1u9rzc2ts6MHAJQAQEQ+BxBttBsROZEKdDOAZ0XkFMlzJO/uiYCI1FPqxEbBAaDZbE4AeBnAaVU9nyI9CuDbarV6f5Z1UKvVhkl+ldy/MebVTBO7YIy51xhzNpVHE41Gg2mfFSdgjHk4DMMLAJ5MxkTk7+sh4Pv+L77vPwXgTDw00mq1liXzsjpQq9WG4+AGAFT1JxE55pz7CBlyYC2Q3AbgMgALYMo5NwQgXOForT2ZOq4jWCdHeoW19mjqSncm40sBGo0GVXVvrP7onDuETey6G3FSLgbN5YZXEJifnx8FUIjVT7cyeExg1dNcGszlctVEFpGZrQweY0ciRFE0uYJAGIZXEllV7+t1dc/z7rDW7unv77fdtnq97onIC7E67fv+xRUEgiC4AOBarB6oVCq3ZA1urd0TRdFFVf263W6f73oH8mEYHsfiHwBVPYZUWU7fSwjg3Vhu5PP501h8BxKItfaoMSYgea5erw8lBlV9Hv/2CiMLCwu7E5sx5oSqPherk9Vq9Uia/LLEcM69B+C7WH2oWq1uS2wkd6nqK3E39GC73U4XlF9TcltE/khIi8hYLF+Lomhvd7OS3iEAzAEYE5G3oyj6OQiCdDJ2v2ZLunPufZIAsD2Xy51sNptJkqmqjovIMyLyThAEl7AJiLX2A5KO5Pflcvm2zSy2ZTDG7CM5TXLaGLOv1/lZu+I+kq8D2Ckin83Ozn6TGEheATAYq1POuVt7IZCp1pN8DcBhAPtV9UvP80Z6CbJpAgDuScl9qnpnSj8IYCr+Dm4VsWXwPO9xkq2kqVit2t1weJ53u7X2iazd7v/Iin8A8Kg49w8T5TcAAAAASUVORK5CYII=', he: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMXSURBVFiF7Ve/TxRBFP5muKzJsm+WuwL5UfIrsRJo7BSsbE4bNPwLJCZqwR9BYWX0P7CQhlBoI6CdiYnaSHKgiYXcQYIJ7AAF7O2zuFm43ZvlNvwIifEll8zMvnnfNzNv3jcH/LdzmO/7477vj10V+BgRRUQUua47etY4Mq+jUmpaKfUUgAMA9Xp9AIAAIKSUg8bNUUo9IaIHeeMW8jgR0QgzvzbtO1rrKYubQ0TzzFwGEHV1dQ3s7Oz8ahc71w4UCoVNABumWyaieSmlcxxESoeI5gGUzVC1UCj8yRNb5HECGrsAYAVAbwwCoM/SrgGY0FpXLpSAITEMYBlAf4bLFjNP7u3treaNaT0CIhoulUoqPa61XgNwF40Vp60K4LYNvFgs+kqpoVwElFLTACpHR0erZtvTJCoAJlMkqgAmbdtORCNhGH5n5jXP8x61JcDM8Rn3A1jJIiGEmI37QojZLHA08qYfAKSUvWmfFgJa6xcAFk23F8CyjUQURYe2dgp8GSdJuxgEwcu2BAAcmnu+YPp9AD56nnfD4mu1pmSNb8Y7rfVDAC1EE7fA9/0xU+EgpXSYea4pSFUIMRuvVghxC8Az8+05M3/KM6+jo+Pn7u7ulxYCvu+PR1H0OU3qEozr9fr4wcHBVyB5BHzJwMcmhDjGSqzWdd3RWFgu6wiYeX1/f/9bO5IOES0QEZvfZjoJPc+bir97npcQJ6XUEBH9bpr/FsA1G5DtFsTCcj9eATIqXJYFQbCOZMW8R0RvYKT8VAJE9BgnqlZDRoVLq2H6e1PFrJmhslJqpi0BZt5AIyE3kKFq5n0w1zRn7pSyPWFicRRFtbSP9coppQYdx9na3t7WNnAki0xsmXpQKpVUGIbdQRD8yEUgy0yFW7GAx3YxcpwBPgLgA5KPEKTa14UQ723HcS4CxWLRB7CEJmFJqyGSArZke0+cmUAYhj04Wfmi1noqrYZGwGISfWEYdueJnetVrLWueJ43LaXsCYLgFSyqBqOiSqmZKIpqWuuWhLtQc1131PwxqXd2dt68VLDTSFwZ+D9jfwG5rFz1Y7VO4gAAAABJRU5ErkJggg==', hf: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAH4SURBVFiF7ZXPahRBEMa/aqV3pLtmT7LEuwiCEt9A40FE9BAU7xq86MmXyMEHEP+AJ0+iRL0IASEPYA4RAtGz8aSyWzOHGcyWlx5pk8nOJDuYy34w0HR/VfXrbroGmGmmI9axJoP3/mav13uYJMlmURQ/2yRN0/S0tfaRtdaWZbl5aDpmXmLmHWZWZt5m5jMt416EGGnymglJ7gB4EnnmAKx57882JSUiF4b+UACh+LOa9QERfWwD0VZ7AJh5KSo+jpaq8YCIVttex4EAdh27quqDaPk9gJUwPoWW19EawDk3j393fi/LssfVOhGVInIbwLswNSCi150BhKJaFReR5zX+UkRuRRC/pwU4Xg3yPN9wzl0AQHmeb0yIKUVksd/vL4zH4/XOAALE55ZxO8PhcHXa4sCEPvC/NAOYGsB7fzJN0yto8WNzzs075853CkBEa6r6gZnfALD7+Zj5rjHmkzFm3Tl3rjOAKMcNZn5VBxHa+9PgpfB1A0BE1wF8iyBWVDWJiu9p73GfmRpgNBp9BXAZwHaYugrgWmTZt713AgAAIrJFRBcjiDjv353XtffOnmE4iUsRRCVV1fu7d34QgDxkyZqMIvIFwAKA72Gq9thjNb5da+0WEY2MMctFUfxq8pdl+SNJkrcATqjqcpZlL5tiZprpSPUH4ZKyWrPTX28AAAAASUVORK5CYII=', hi: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJMSURBVFiF7ZdNaxNBGMd/s12yKZ3ZgPZQoqJ3LSIIHryqX6D4clDwJmg9CL6gZ6E9idpDD+JFEEQP/QZFsaCt0oP4ETS5lIKZdUNCNo8HJzSmG22y23jQPwz77Pxnn+fH7M7uLPzrUr/xfGPMCREpZyqgVMVauwq0dgwwOTlpGo3GMnA8S/EurQVBcGpjY8P2GmNpoz3Pu6WUuphTcYB9SZJEzWbzba/h9wGYFhEARORclspKqZfuOJ3mpwIAXieIouhVFgBjTCdMn+0syfPQ0ABa6xljTNUYU9Vaz4wcQCn1GJgCplw8WoC8lAVgFqi4Njtskn6r4I+y1i4BS8NenwlgfHz8gO/7F4DDrutzq9V6Ua/Xv+w6QBiGN0RkHij8ksj374dheKdWqz0aJN9Az4Ax5rKIPOgt7hSIyMMwDC/tFsAYMOfiNnA3SZJykiRl4J7rw81O6lsvE0CpVDrGz3UP8MxaOx/HcTWO46q1dg547rxyqVQ6mjtAu93u3he8SRnyumvs/twBRKTWFR/s9ZVSh7r8b7kDFAqFdaDpil3XWh/peBMTE9Mics2dNorF4nruAJubmzWl1FN3ulcp9dEYs2KMWfE87wOwB0BEnqTtfDIDAGitb7J1rwPgpGuB61uOouj2IDkHAqhUKrG19rSIXAXeA99dewdcsdaeAeqD5BzmVdyKomgRWBzi2m3665/jfjPQ7gRa67M51Up2DCAin4DzsLWrzSqXc5tSb0EQBAvAWh6FnVaLxeJCmjGKX7Ov1to1+vya/dcPlTvHEfXYbToAAAAASUVORK5CYII=', hs: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAD3SURBVFiF7ZYxTsNAEEX/31C42N1bJDShT8Wh0iJRQGougsQ50icFgjPQjF1ZiidFYsVS2JghomJetdLOzjzJlv4AjvPf4VhBSmmmqnMAE2PvHcltXdcfvxbIOT+r6sNY3QWU5EpEHs0CKaUZgPcrhg8lbkXk87vLm+Ir1TnJfviLqq4tU0kuACwBsOu6OwA2AQy+uaqum6Z5tQjEGHHyL/8/wdL0L3ABF3ABF3CBS1mw6w8kFzFGU+NjGJ31+rEAyS0AxSGOl4NgsaIhhE3psphSbdt+VVU1AXCP6xaSJxF5KxWMNs45T495bl7JQgib0iLiOE7PHkzWRMwLJp08AAAAAElFTkSuQmCC', ht: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOkSURBVFiF5VZNaB1VFP7OvM57b97cc5NCQjSBtpsGqXRRW0VUVIjiQilCdaGLotLiQroqtSC4sC5c6MpF8GcliijRGnChlMalqKWtCv6ALTEVKpGYJu/e5PFeXua4yJ1w+37mTZIWQb/V3HPPOd83d845d4D/OwobDRgeHq4Q0f5isbg/iqIdhUKhtrKyYjcrgPI6MvMoEb2SJMlBIqq0bJ8TkdettRM3RQAzHwEwDiDs4Xq6Uqkcnp2dXbphApj5KIB3PNNvACZFZJqItIiMEdFDaS4ROWOtfRRAM6+IrlBK7WHmGjMLMzeZ+UV0qBtmvoeZ/3B+wswnt0zuBHzgJT2e5cvMtzFz1fleGxwcVHk4srqgXCqV3gOwDcDPxpjDAKSbc6PRmCuXyyUADwIoN5vNZ0ul0n3FYnG10Wj82i02yHijOwCUAYCIPgGQ9HobInrfI7oVwONENMHM32qtd29IABFt95aXe5EDwOLi4mUAzwP4DMB5AKtu64CIfBPH8d48ecDMo0qpM+n3V0q9kCuwBf39/TuZ+VOvjqaHhoZi36ftBLTWjwA4T0QPpzYiqm1GwMLCwowx5gkAk860q1arnfB9rpsDzDwK4AKAVOWPIjJurX0XOWqgGwYGBrher18B0A/gT2PMCDoVJTNPesf1RqvArYCZ3/I+6Z7UHngOAwAeAwARuWCMOdFRZTtyiRSRH9ZJg2Bnm4AgCPbBzQUi+qgXeRzHtzDztFLq9yiKRnqqJKp3sq8LSJLEn1x/5Uj4EoBdRLQjDMM87XWXxzXTJoCIrnrOt2dliqJohIiOAoCIXKlWq19l+bvWO+iWV621v7QJqFarFwFcc8vnXE10RKFQOAk3JQG8BqCRwR8sLy+PY20yQkTeRrfPq7V+1euC7ztNriiKRtIbUik1A6DYjVlrvVsp9aWX81LrIGqt4LJS6msi2ufWAuCLMAyfmp+frwKAUupNIjrm9i8R0UX3vCoiHxpjPgeAOI73BkFwDkDJ7f8tIg9Ya3/KEpC24wTWbrU1FSKHrLWn3f48gO2tcQ5zxphBJ2AsCIKzzv5dEARPu7viOmxrNRhj5gCMKaWeJKJnANTDMJxaV0z0sYgc6RQrIulpYGlpaUopdYiImu5U8syUjYOZp7wJd/9NIckgvzcl11qf7R3Rjq7/AzlxKn1IkuRUluMNR19f3wGvvaZ6R3RGWyHlhYgUsFZYAuDlzebZErTWd2ut7/xXyP8z+AesvDCRM+abnAAAAABJRU5ErkJggg==', hv: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAI3SURBVFiF7ZYxaBRREIa/2Quuydt5EUTUQisRFSEIGkWwMZiA2ol2qWxtBcFeQYKFdjZpFSzUKIjBwipRCSgooqBgIQRjtbeHeugbi+xxh+aye7JR0PywvOXtzz8fvN3ZgVX975Ie/ZGqHgVOAQfNbLOICDBvZjMicqNer98DvlcOMDAwsKdWq00CQ8sGijwLIYxnWfaiMoAkSQ6LyB3AdWy/At4BBmwDdrQemNl0lmWjZbIL5ZzbpKqfVNXy66aqbv/ZNzg4uFdVb6tq03t/ppLiAKp6qVU8SZIrlQX3APA6B5gH4qrzoxKerfn6FPj6NwAa+bqh6uJlAWbzddh7P1Y1QK3I0N/fv2Bm4yx+sifjOF4Xx/Fcs9n8XAVAtz7Q570fDSE4ABE5C+zreN4EZs3sIYv9YFlFUdRI0/QB8K0UgKpeBM4VBfeoC/V6/fwvcF3MVnFxRCQsud/F3+e9PxJCSEpk7xSREeAAsKZj/4mZTQBEUZSlaTrNEkdQmVR1vapOqOqXVud0zo2sWMFu8t6PqWrIIab+OACAqj7OARaKvGUa0e+oVbjwHeoFYG0PvuH8/n0lAEmSXFXVRt4flh1ivPeXaf83bpXJL5SqvuwYSKaSJNm9BOSufCBp+T465zYWZZcayVT1EHAX8B3bb4E3tEeyzikpM7PjWZY9qgQAwDk3FEXRNdrn201zIYTTjUbjeZncXsdyUdVjwAlgP7DFzCIR+QDMiMj1NE3vswKtfFX/rn4AK/+ec83FSQAAAAAASUVORK5CYII=', hz: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOVSURBVFiF5VbPixxFFP5eT+gepuq9mTnlFN3LRsy67EYvIia4JErMxau7ih7iQfIneIqI4ElEN4mHNQdBArkbIa6KcYMXFTWzBkmiSTyIIOxudc+hZzP9PEz12k52fu4SQR80/arre9/7UV2vCvi/S2knxsaY2TAM925ubv6xWwGN4nyGmdvM3DbGzIzLE4xrSET7vX3g9fsbQBAEyXb6qNLzH2Dm56IoOlcul9M0Ta92z6dpeiuKoj1EdNk5dw5A1o0RkRfDMDwbRdGfrVbr55EiY+YrzKzM3BaR+ZGMO84X/D+izPxVL9yeXhNEdEZVH0dnmU4AOA8AxphpInqFiI4AmPDwW6q6DGApSZIGAKjqq942I6L3R00gz2JeRJattYcBRCJyppDVds9dEVkEEIrIcWb+UkQW+vmgIWOJmPkTAHOFb78CuOb1A/i7GgDweRzHzwJoDcnfX0TkbCHLH5n5iW4MMz/JzFdznLX2vV1xboyZLpR9tV6vV3tha7VajZmv5cthrZ0axD+wDxDRiRynqifX1tY2emHX19fXVfWkH5a8bX/+4sAYM0tEk0EQNJ1zlwDcZeZVdNb4dhzHE4MIAUBE7qjqPgCNOI6nAZRE5Jksy2ypVLq5sbHxXY7dqoAxZiYIgm+J6IKqfszMr/upff69OoxzAFDVhlcf9AGdUtWLRHQhy7JvKpXKwXsC6BYiuqez7ZYQkeb6ViNqNps/GGMeJaL9QRAkzrlP/dRvAA6o6iMj+Jj279sA4Jw7JSJXsixjVb3ebDa/H5rJWvtOYWvNDcIbY44Wtuzbg/DDnIZLANoAQESna7VarRewWq3WgyBY9MO2qi7tOIAkSRqFXv5wu91eYeZD3Thr7eEsy1YAPAQAqno6SZKfBvEP24pDEbmoqkfyD6p6h4hWvT5FRA9skRItO+eOA9gcRNz3TigiC2EYvhuG4S9xHL8VhmGdiB5D5xZUBTAJYNLrQKfsi3Ecv2ytPeTvE600TRu9fPSsgIi8oKofemefOeeOAoC1dsp3uKdROI4BXFLVD/KyM/MXAJ5C5zh+yTn30aBq/EOY+ev8QmKtfX4k404C84UzZKUXrucSlMvl3wFMENFrcRyf385WRN6IomguTdPLALQ4maZpo1wu3wSwl4jeTNP0xqhJ9BUROZbvdxE5Ni7P2LfiLMt4O/1+BnADnbJnqnp9XJ4dSaVSOWiMmf1XnP9n5C9+mkyUFp6Z+gAAAABJRU5ErkJggg==', hA: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMTSURBVFiF7VVNiBxFGH2vZmfG7a6vYM2usOIPmrgiCMlRCZJDDq5KLsrqQS9qbl7MOYjgIeYS1BU8+HPzoCQEc5CAkIAXUYyQeFE0RknIyTjMVI+H7Zmez4PfLJO4s5WZrBEhD5qqru9973tVXV0F3MINIM/zXXme7/pPiovIfhGp7Nk/rU5tyuIvAXgfgANAAPsajcbvZVl++68bEJEXAXxoxYcgySeazealsizPTqLHKQxEADImXBRFESbRc2nK1SD5MYA2gM9Ghk8AKAAcn1RvanjvV0RERUS99yvT6ky8AluNGzGgY/pbYyDLssUQwoHZ2dm7N4pXVfUNgAsAfqmq6uuNOHNzc/eEEA5kWbY4sTMROWnf+LKILE2Rv2S5KiKfj+PNjAuQ/FVVAeBOAEcA7BvGQgiPqOoeAPfb0AWSX8YYR1fibcsFyd8mnQAANETkmO3ygzar3d7774a7/9rHYrsBwHv/mo0fA9AYO9GUixDC7THGlvf+FZJvAagnUnqq+mq3231vmLsZOfkXxBhbIYSnSK5acSX5qaruKYoiq9Vqc6q6l+RRS6mTfDeE8GSq+HVhfn5eROSKLWc/hPD8OG4I4QUR6Rv3ysLCgk/pJy8j59zLJFcAgOShGOM747hra2vfN5vN2wA8BiDr9XqXyrI8s6l+ygDJ56z7p3PuSIpfr9cPA1iz3GdT/HUDWZYtish5W76u9/4ZC+2w9ly73W6nBFutVgRwxgzsANbvja5p/+i9v+MfBmZmZnYC2G6vOcll62+z9o9U8RF0AGAwGGwzI8sAcos9WKvVdq7XHXZijKdE5BDJB1S165w7bKGLAJYA3DuBgfus8EVr31RVRzIH8EOn0zl93UoictSWbuC9fyjF994/LCIDEdEQwicpfnITOuc+sC6dc6vY5PjG32fAKuyAI/lRSn/0JKyLyBskt48SVJUAnh4x+xXJyxuJqepdAB611wGA4yT1Gs75oiheB9C7ykAIYVlVT6YcbwWcc493Op0vgJFPUFXVWQA/34T6P/X7/XM3oc4t/E/wF1qa6+bSnaEbAAAAAElFTkSuQmCC', hB: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALKSURBVFiF7VTPS1RRFP7Oe6Pom3fuHUuhIhMaJYig1D8hXFQrwVYtWoQU1KIWidAmgmoTtKhNtA/SEFoJRUWBq8CCfqtFUAQSJTPMOJLz7mnhffJGnfeGIYNivs09793vfN+59557gQYa+IfRxMxXmfkKgNRfd1dKHWZmYWZRSh2qV8epN9EYk47E/mYU4GitswCoSgFzAASAEZHZKhqUyWS6qmnEgplv2y2eANC8EcfzvN50On2gikQzM0/YI7pZzSduB7rtOOj7/rU1c67WOktEWwG0251yowSl1HUAg/ZzTzWTuO49CeAJgB1EtB0AOjo6/KWlpTMAThljuhxnpX5jDJj5M4BbnufdmJ+fL4pIl9X5JiKnq5nEnk1ra+tO13WPOI4zbozZRkTjAPbG5QB4KyJDIrLguu7Q8vLy/VKp9KWuAiKFdKZSqWkA7fbXAhHdMca8BgDHcfaJyDEAGTv/vVwu95VKpa+16CeBmHkqcufHMplMZi1Ja93GzPdCHjNPoZ7u30B4IBT1ff8B4vsmxcyPQr7WeiBJP/EhEpHhMARwDkA5hl42xpy1XIjIiST96GqamPkSEWVFpEhEl/P5/JyIhPf8faFQeJMkWCwWXzHzHIAeEdkPAEqpHhG5QEQegA/5fP4igKCiAKXUQREZFZFw5WUAwwA6LWUmyTyCGVvALqs1CuB4qK21fpbL5R4CkSMIguAlgPBJLYjIpI1/2nFd48VAA4DjOD9sAZMACnbunfWqDcz81DZVSWvdlsRXSm1h5pLNeZzEr6UJ79qwxRhzvgb+CIAWG48l8SuulNa6LwiCbPQfES1hpasJwCgz50Tk00ZiRLQbwEhYCxH98n3/aJTjuu7HXC43vZoTMe83xjzHn3g84iFBEPQvLi6+ACqPQDbZeBVEtOpVsVrP83odx+len/LnICKzxWKx9lvQQAP/PX4DOEwML5Si3L8AAAAASUVORK5CYII=', hC: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMRSURBVFiF7VZLjAxRFD33Vbcx3e/enmaaGEIYM5NJJIINEREsTIgFggU7SwsSSxGJBTbil9iIPRmxlUgIG7EgMRZDxmdBRiKhM11VFj39uRZej0L3lGqMSNykUq/ePefc8z71qoD/8QuRy+XW5HK51X+r+GpmrjNzPZPJrGpXx7RLrNVqvQAIABljls+4gd8ViQ1YawsishWAF+n2RGRbNpudn1SPkhKYeRTAIIB3AHpcd6M9FgTBQBK9dpagwemJ9PU0A/4RA0S0A8B4k9R7Vd2ZWC8pAQBEpE9V7+HryN+r6uYwDEfb0WsaXV1dS5j5aD6fX9wsz8wDzPzMXU3XPZ/PLxaRw52dnQsTG2Dmu8yszDzOzP1t8PsdV5n5VitcahqNMQCb8GWazwLY0UiIyFpV3Qhgmet6TUT3fd9/GOGfd1wQ0aukAwCAWcx8g5nVWnvMjWq9tfaxG9UPl8utBwBr7XHXfwPArFZFYjehiMzxfb9orT1EROcApGMoFVU9Eobh5QZ3OnDsa+j7flFEthPRRVdciei6qm4MgiDjeV5eVbcQ0bCjpInokohsiyv+U9Hd3c3M/MFNZ1VE9rfCisgBZq467IdCoWDj9L04gDHmIBHtAQAiOuX7/oVW2HK5/LSjo2M2gA0AMpVK5e3k5OSjafXjDBDRPtf8ZIw5G4dPp9NnAJQdd28cfspAJpNZwMwv3fSF1trdLtX41o9MTExMxAkWi0UfwCNnYDkAWGv3MHPotJ9ba+f9YCCVSq0E0Oses0Q05Npz3f1jXPFIlACgXq/PdUaGAGRdbsDzvJVTdRsN3/fvMPMpIupT1dAYc8al3gDoB7AkgYGlrvAbdz+tqoaIsgCelUqluz+txMzDburq1trBOLy1doX7V1QRuRaHj92ExpgrrknGmIuY/vhOu/OCAICIrsbpR0/CNDOfJKLeKEBVCcCuiNkHRNTsfwCqugjAOvdYB3CTiPQ7zMsgCE4AqHxjQESGVLXlV+t3hjFma6lUug1ElqBWqz0B8GIG6o9Vq9WRGajzP/6R+AxgbOSEJVkmfwAAAABJRU5ErkJggg==', hD: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAG7SURBVFiF7Za7SsRAFIb/s5FsMXPS24srIqxPYKsIIha+gLfCJ/AFRPARRPANxEXQzsJWxcpCsFS8dZvYzLp7LDJqCLMYw5gF9Ydp5mTO/03mzAX4l0cppSaVUpMDM2fmrm3LRcfVPDJIJucOM68UGRT4cu90Oo/1ev0WwJyFmAvD8NkYc1YJAAAYYy6zEEQ0+xWEV4AyEOTq1FovEtEeAOWJqycii0mS7OcDziIkohmP5kD6J2ZcgaE+AFsiUiOiUhAiEuKzGAHgnoi2y+Qqo5CZD5hZbHvQWo//CfOAmVsZ8ztmblRljiiKpsuYO4uwjETkAsAV0sJbiOP4usg45zngkp1RK/WSqSRJnkuR5lToMrLmJwAaAMaCIKjuymXmhl3T9/Vt4QeO8H7moznzIwD1X2XuLMIoikZE5BTAsO3qATgkIlPGREReiGiz3W7f5GPObSgiGxlzIC3WeRFxfV4U4hXAar7fuQtE5BjprH0psTmLi5mX7ANTmLmntV73CPShvtupz8vmyRhzXglAlRBfiplXMsvRVUo1feUudBTHcbwLYA1pYfaIqOsL4FtSSjW11hMDMf+1egMDQLCix12YkwAAAABJRU5ErkJggg==', hE: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFFSURBVFiF7ZYxTsNAEEX/d1Kk8O4JaAlN6OOGW4R7QItEAdRwjyDlGqSHAkFLS7N2FSn5NNloQ5IlMQ6OhH+1Gv2Zed6xrQEa/Xfxe8AY05XUA9CquNeU5Eue528bAay1t5Ku1oFVJJG8c85drwAYY7oAXvfYPIQ4cc69A0B7EZV6JH3ze0njWBWSfQCXJfyczWanAJYBEMxc0rgoisdYwTRN4Xl39Ye9kljSX6h2gPa6IMkLa+0glijpqKz/RwAAmaRYvd/6FzrMEUg63+KtHpAclvGHqv0GGoBNn+HQGLN1kV39oQ7zBgA8kfyIJc5/LFlJfxxA0kOe59t8VlkZf6jaR1A7QDiCqT+Q7KdpGk2cLxil/Eu9/KGulWyxmUwmk89Op9MCcLZHCJG8cc6NfGClkbX2eL6zVb6WJ0ny7J+8USOvL4osjXylNfdCAAAAAElFTkSuQmCC', hF: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEoSURBVFiF7ZcxTsQwEEX/hJW8imy5SQU15RbsInEBrgA0XIOT7C3gDjRbbUACcQeo0jmJlIR4aBKBliQbydFS4N94pD+a/2S5GAP/XTTgzZRSF8x87BRA9GGM2QL4HA0QRZEqiuIRwLlL+A/FQojLJEnMrnHU1R0EwR0R3U4UDgAndV2nZVludo1ZD8CCmQEAzHztkkxE98256PI7AQAEbZGm6YMLgFKqLbtv22X4FPIAHsADeAAP4AE8gBOA1nqltV7+CYDWemmtfbLWPodheHZwgKqquCmZiHiweUB9K9le5Xn+Eobhiog4y7LXqQFsW0gpr/YNkVKejsiqRwMw8xuAG+B7q3VVM/OXOt+AEGINIJ4iuNF2Pp+vu4xDfM3ejTExer5mXl9wPFTGw/+62gAAAABJRU5ErkJggg==', hG: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHSSURBVFiF7ZUxb9NgEIafc1AZfG8yQaswt5VY6G+oxFYhoSpi4xews/AbGPgbDNAOFKlSEIKBiZ2dpojVWagUm8FOY6I08Wd/TPBOn53cvY/vfGf412X1izRND8xst2HsDPg8nU5/RgFI0/RBkiRfgSQgfgIcZln2rS3AtZmZ7QWaAwyBj+5+vy3ArRvuvyyK4su6QDN7ChwB22Z2LqlTJXD3kaRCUuHuowYhW5LezGMk/WhTidCS13WVZdkT4G11vW1m41CIjQDufizpUtKlux/HhtgIYGavgB1gpzovqxNElxZEgWgC8Ixy3ifVOToE0GoKblLQdMRqQV1BlagDzOaHaslsRYA4rUGcS9pfB/CJss8AR5JeR4AY1SCGwHgVxLUk7Uu6qPXvpCMElO/ESS3nhbvfmf/4xztQ7fJDFpV4FKMSeZ6/YNHiYa/XO1gbEbMSVa7JUq7exsB+v78r6Xst8B1wO9B8b+lBwnJ0gehs3gUimnkbiOjmIRB/zbwJRFtz2/SHVRBFUXwA7lW3zvI8f54kyXvKbQdwlmXZY+BXdAAoZxsY1wxnLGb7tFrBV01ytQKAlZWAgCePoqWNGeO7ES53vzsYDB7SZL3+1wr9BqEB2FgkTTmqAAAAAElFTkSuQmCC', hH: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHdSURBVFiF7Vc9axRRFD33DTtbvLlvZ6skWFpY2NiElH5sIGCbOrWIWomk0doUgUDESv+AkNqFlGm1UBHDBvIHbMLszK4yzOy1mVmeC5PMW2dtsgcGztx73uHwZngfwHUHzTuw0+l08zy/AwCe532JouiiuVhXgJl3mTlhZimehJl35/HyXAcEQfCYiA4A+FbZB7Dp+/7PNE0/u/gp1wBE9KSguYi8FJFXAPKZ3uLAzGkx7X2r1i9qqauf8wwAaAEAEcVlweKt/xGgUSwDLAMsAywDOAUIguB+Dc29hQQwxmwQ0UerNLD4WUmIqG+MWXcJUQceM/+w9v93+HvdbzHze6v/HXNs9ZUwxjwszY0xH6p0zHxk6bbqeNf6BCLSK3mWZXuVZkq9tsY8aDLAWsnH4/FplU5rPe2JyI3GAhDRsORhGK5W6Uaj0bSnlBpW6ZwDAPhUkizLdqpEeZ5PeyLidDa8FGEYhsw8LH6wX1rr3qxGa73JzL8LTdTtdjt1vGvfC4wxz0TksHidENHRZDI5AQCl1F0R2UYxoyLyNEmSt40GAABm3gfw/ArZfhzHL+p6Oi0WaZoet9vtrwBuA1iZaX8D8CiO4zcunv9yNbspIrcAgIgGURSdz+t1vfEHdkeSVsjGHR0AAAAASUVORK5CYII=', cH: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAD6SURBVFiF7ZYxSkNBEIb/HQOv2R8sXhO8QsoQBG8hJGAn2OcYXsAjaJkb5AABW6/xGncsXmHe2AZ9G7Mx5jXzwcLCz8x87DYDOM7AhH1hXdds23YpIhMAF4W9t2b2VlXVU9M0eozAiOQGwLRw8HdeVfUGwGdfKLkqktcnGA4AM5KzXJgVMLPxzn2hqmH3mNmiIL8qFhCRj777oRxaP8oFKaU1yccQgqWU1qUCf63/lRjjnKSRtBjj/Ng+2S84Fy7gAi7gAi4wuMDelawPks8A7vBzRdsCeFHV+/8WSACYid9V9bKkX3YfyGFmDyJyi54X6LpuVdrPcQbnC4euasHCiIryAAAAAElFTkSuQmCC', hV: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHdSURBVFiF7Ze9bhNBFIW/a6fzzogfUYCcd0AUkDS0hIqCJOIVIgQFZXpEhwQUPAOhoonpKQhVHoKfNCjIvuOO+FCwltbeIU4xBiE4zUp37txzdu7smR3412G5YAjhopldn0wmVQmSTqeTgA+j0eh4oYCqqm6a2RvgXAnyBr4Bd9z93Yy4liKz50sgBzgv6VmLbz4QQvgOdIEDSU9LMJvZI2ANOHH3lebYSia/W0/66O6vSwiIMW5JWpvWbqLVgt+NXAu+AJeXxPfZ3fvNQG4FXiyJPFs76wNVVW2b2W0z65VglZQkDVJKRfZUUeSM6JKZvQQ2gCIrAIyBAbDj7l+bA63PsCa/W4h4ih6waWYCtmf45jNDCKme8MnM3pdgl7QO9IHk7uHU5BCCQgiKMe6VIAeIMe5N686P/XEjylnxGOhJWi+1CnULANJZBAyATaAvaauEgCnMbP8sAnbq5wZQ5IcESGa2L+l+oXrl8Csrvmdmtwpa8VjS25TSq4UCQgi7wOMSxBnsuvuTRQKWeRwfufuVUzP+GxFwAnQlrVZVVcQHJK02as+gtQdijIeSrpYgzgg5TClda8ZaLZD0kJ+XiNI4NrMH88GsD8QYLwA3Sl7NzOxgOBwu48X+cvwAmhmkfc6w5v0AAAAASUVORK5CYII=', h2: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFHSURBVFiF7ZahTgNBFEXPBbIrtl2HICEk4OAPqhG0GkqQWNJPQBM+gAQEDtkaVCuR/YKGHyBgUN0tScc8BFPSTGYthrlmXt6du3uSMReS/rsULlqt1rakB6ALFJHMB3BXVdVtkLuWNAB2IpkFMAGuqqr6XDc2w5t5nj8Bp0DWAN0GjrMse3XOzfzPLyTdey+mDDiStL9cLkfrxlbkctefb5KmoWlmfQBJPWDo55OVL2kUyXSAXTPrhV4MoPAfms7n8/PQbLfb5v3f55FUmBkAsUxZlkMP3gq9jQjAnyoBJIAEkAASQAJIAAkg1ogWQGFmnbIsh6G5aj5mVq/tFqu5IdPxYx16MYAJcMZPh+s3kZvZeG2eSLr0c2NG0jjcxVrxC3AA7BFvxu/ATV3Xj6uFc26W57kDDok341rSs5kNnHNfTYBJ/1PfEXlu69dxkrUAAAAASUVORK5CYII=', h3: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEqSURBVFiF7ZZLTgJBEIa/Mu7omp0LDRfhBOJaJF6BeAP2xgO48AzinvEGXsTHxl0163IBJDgzAjGFJjD/ppPu6vr+9LOg1aFLqh0ppRMReQD6QCeIMwNKYGRmn6sDxzVHc/hlEHipDjAQEQeG33jVSFXNiwmvIvISQXf3HtAFspnp2mBVdVX1oigmEXCAoigmy7zVsaMoyG/VGvh3A0234B043RHvzcy6qx1NK3C/I3hj7toKAKSUhiJyISIhL6G7Z3cvc85PEfn2Sz9twbWInAduwczdn3POjxsNqOoYuI0AN2hsZnebDOzyGn6Y2dnaiPYzag38tWo1IfMCsuPuvaiDuCjJAPI2BkpgAHTd/SrCwFIiMt3GwGjR9oEUxM4iMnX3m6B8rfZIXw4fXKxdZFn0AAAAAElFTkSuQmCC', h4: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAF+SURBVFiF7ZaxSgNBFEXvm0Ak8O6GRMHSPxC0shTBD1A0RbAQgrX+iJ2djaQSJBa2llbpBAstrTVVZg0E3DyLrBCCZidhrdzTvObO3cPssLNAQUEGJNskvaoehK5R1QZJT/IqK+sC+poA1DkXLOCc2wegAI7yECjNkZ3uLc1MzVn6JxQChUAhECJgAGBmwbITWctDoJfO5VABACvpfM9D4CWdmwDKAfmlNAsAz3kI3KUzUtVWVjiKohMAnFq7OLVarUqyR9JU9UNVt3/LquoOyQFJI/lWr9ejrH4JkVDVhohcp/lPEbkE0K5UKk8AMBgM1gEcA2hhfAGZmR3GcdzJRQAAoig6NbNzZN9wiYic9fv9i5DezOvym+Fw2C2Xyw8isgFg9aeMiDyaWdN7fxPaG7wDEziSW2a2KyJrAGBmryJy773vAhgt0PmPyXwFqtpwzu1hjvOSkoxGo9s4jmeeh0wBkh7jH8xF6Hvvq7MCIV/CDoBkgYcn6dqCgpl8AUQJYOAV15ZsAAAAAElFTkSuQmCC', h5: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAL8SURBVFiF7Za9bxRXFMV/d1Z4zc68t7JlvGaIFIENVlKlQ6K0UCKjYJBFg5RUoUE0QIHc0NDxFyRSqkRyk86OZGgSIRqKREmk4NgUOE1YG+IE7Yx35Z1l36PwWB4NXu/sLHQcaaX3cd49533MvQvvkROe541qrT8DCv3EybVYKTUpIo+Aq4ODgzSbzQd5DTh5xIGfAT+vaG4opU4ppZ4ppWz8WwKK/cSUHsTTO6+KyC1jTAQ8F5GNMAyfAu13ZWAVmOxCewEsOo7zda1W+y1L3F7egM3AGQWuGGN+8TxvXik10m3BW7kCx3Eq1trjwAwwkVj2tzHmQr1e/zOrTlcTqUe4AAwkOVrraaXU4wRnU2s90SFk/ya01nfSHN/3S1rrHxImliuVirtfvJ7zQBiGT4ApoApgjGmlOdVqtREEwWXgXjz0cb1ev9mr1oHwPO+I67pnOWAT5XJ5SCm1GZ9CoLUeTnNy5/EoihqtVmuNA76OZrO5XSwWDfApOwlrNYqiP5Kcnq+gV7Tb7XnAxN2Z9HwnA4e01tOu6471a6DRaKwDK3H3o0wGlFJ3rLVLjuM87NcAgLX2n7h5LJMBdjIawMmRkRH1FjzsJrw33su+BkSkutve3t7+oG91kd2dV9NznU5gNdGe6ke8VCodZe/uV9LznU5gCWjF7S/7MVAoFL5I6CxkMlCr1V6yl8VOe543m0c8TjxzcTcUkR8zGQCw1s4BrwBE5NscBcWx1n4PDMfx7gZB8H+a1DETRlG0WSwWy8AZ4DDw+cDAwE9RFP3bTdn3/RIwD1yMh5a11l+FYfhG3eiGgud59xNVLVBKzcWG9oXW+pxS6q9kOS6Xyyc68bv+IfF9vxSG4XfApcRwzVq7JCK/ishzYMgYMy4i54HxBG/NWjuztbW1nNvALk9rfd1aexsYysA37FzBjTAM/zswcEYDwM6rNsZccxxn1lr7yT6UDWCx3W5/02g0fs8SsycDSbiuWykUCh9aa8eAlyKyHgTBGnuV7z0y4TUk9gCzMmGUegAAAABJRU5ErkJggg==', h6: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHnSURBVFiF7ZU9ixNRFIafcxMykZnLKAirYqWFIGylIoKtoI0fhYiVzVr5O4TdTkinf0CUbSxs1B9gsHGxsNJCFsEmDjMhMnHPsdiJSJzEm92x0bwwcIdz5n0fOGe48L9L9vphmqYnzewUgIi8z7LsQ3NYc+S9v+a93/Le29Tz1nt/dVG/1oLhG0APWKkprwC3oyg6UJbly8YBkiS5JyL3q9cdM3ssIg+AZyIyAk6zO9KLnU7nS1mWb0J8g3YgTdNDqvoRSIGxql4ZDoevpnouqepzoA18dc6dyLJs8CdvFwKgqjeqcERkfTocIMuyFyKyUb0eVNXrId5BACJyZnIej8cPZ/W1Wq2fNRE52xgAcHhyGI1G27OaBoPBJ2AIYGbdEON2IMCvu2Jz+szM7ojIZefcepMAwSqKYhPYDO0PHcFf08zfMI7jVRFZc84dNbMLwHEAEXm6SICqfgYeFUXxLhggjuNV51wfCFqkAH0zs3N1ELUjEJG7DYZTea3VFWqX0Dl3xGx32fM83/ONCeC9t8rzWG3Wfsyb0BJgCbAEWALMuo51ckiS5GZDWTvBAGa2BdwCEJEnTaRXnr+pdgRRFPWAfhPBlV53u91eXWHeRdP23p83s9pLJFQisp3neR/4vh+ff1c/AFvVle42qK6NAAAAAElFTkSuQmCC', h9: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALUSURBVFiF5Va/axRBGH3f3O16P2bmfsCRoEUUYhG0iWK0U5EoViKKiBYiCGJlCgsV8R8QxcJOMCDYxC6FFrERGw8iBAnEKkYNionJZfdWL4fJfRZOyHK5ZNbNWeXBMjM773vzmJ8fsNVBceOklD1CiC4AaDQan4IgmADA/9VAqVSS9Xr9BjNfAbCjqXuamR+n0+kHs7OzQdsNSCn3EtEwgF0W6iQznwqCYLxtBrTW3cxcBlA0vz4CGALwwbR7AJwDsNO054QQfZ7nTUbRt5pUSo0qpdh89wC4LXiuUup+iPcW8ffYKqSUZ0KiTyPwn4X4p218YSMQ0XlTXV5aWrpt4zuOcwvAclNsfAPM3GeqY7VabdrGr1Qqn5n5vYk9uGkDRNRhqtbBQzFfTLVz0wYA+KbMRTUQ4nrtMLBy1PYDSEXgpw0XACbaYWDYlEprfdVGVkpdAyCbYuOjUCjklFI/lFIspfwppTy8HldKeVQp9cscwZlisaht+gkbYXFxse667hQRnSUil4guuq5bSqVSc/l8fkFK6SYSiX2O49wkoocAtgFgZr7ked6YTT/yTaW1vs7M9yOYXiaiAd/3H0XRtc7ACur1etl13TdE1AugoxWHiMaY+UK1Wn0eVTfOXS2UUoeYuZ+IugCAmaeIaKRarZYBNGJobmHYliChte5n5mPMvF0I4UQRbTQav4noKxG98n1/BBssy7oGtNYHmHkQwJ4og26AcSHEZc/zRiMbkFIeIaIX+HuttgM1Zj4ZBMFrKzOfz+eVUjOhpOJlJpPpBRBp+g3cTCbTq7UeCul8LxQK9gdNSnk3FPQEm0yrlFKDK3pSyjvN/WseIyHEShq14DjOAGLk+mEkk8kBrD7La1K0NQaYuduU5fn5eb+5/19RqVQ8k1GDiHZbDQD4BgBCiJa7Ng6I6F1Ye0Nks9nOXC53HECyXQYAOFrrE9lstuUbsrXxB4NO6oHu5YSmAAAAAElFTkSuQmCC', ia: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAN6SURBVFiF5VZBiBxFFH2/drare6Z+9a4MEaPiSkwUQsAVQSUSBA8romCiBgw5iXhQ0OgpF0E8iCdvHhQXT4HEnCSroCgBhQQWBfdoQBAJunEP2Z6aWenu2foe0h3acWanh3FPedDwu/q9/9+vGao+cKuDJiE3m829Sqn7iGieiK51Op01AH/vtgEyxhwlotMAHq5qRGQLwBdE9K5z7spuGAiNMctEdGIMry8ip7rd7kf/p4GGMWaFiJaAG90S0XkRWVVKbYrInQCeBvBERfOKc255UhNDwcynmVmKZzWKortG8J5h5k7BS621+6cu3m63mZk3i6RXrbW3jTH7XGnWGHNmagPGmONlQmvtG3U0zHyp0HQBRHVrqWGLRPRIJV6pmavktay1h6YyAGBPGSRJcrVOIiL6vYxF5PapDBBRp4yZ2dbMNVcxkExlAMAvlfjxmrlKnheR2ofSqB24AECK17cx5sCK43ifiBwtXld7vd56XQMzwxbTNN0MguB+IjoE4B6tdZRl2XfDuMzc9t5fIKLynHgty7KbO2CM2RNF0eE0TX+rNLWzAQBoNBqXlVIvAWAAh7XWR7TW12dnZzfzPM/jOF7QWp8EcIaIDgAAEZ11zr1fzaO1/klEToVhSGmaXhyss+PWNpvNxZmZmRUAe3fiFfjSOfciBm5HZpbC3PlOp3N8UDRyBwAgz/P1RqNxlojuIKKDIwxfB/COc+5NADkAWGv3B0HwYRiGJwAcLHhxGIaPBUGwmGXZ9wA8RiQcirm5uQXv/bPe+wMA5oloXUQuR1H09cbGRneg62UAL4/KpZRaSpLkm4kMTAJjzAtE9BkAM+TzFe/9kV6vd203av8HlTvl82HfG6OEcRw/JCLHvPcLSqlgXCERcUS0tr29fW6gux6Aloh0h+mG/QQRM38C4OS4oiPgALxVDibGmOeJ6Cml1AdJkvw6zoAyxnxVTkFTQAC86pz7dCKVMeb1yhT0pzHmWLvd5jraKIrutta+x8zbxWDSGzVFVfGvc0BrfQ7APIAMwKPdbveHra2trI6Bfr/fSdP0otY6B/AkEc0qpfIsy76towczP1Dp/uNaouHQzPxXkefnceSbtyER3VtZvzSFgRTAj0W8r7aBfr+/jht/Hu+9X5vCAACUnf8xkarZbC62Wq0HpywOALPW2qVWq1V7NLt18Q+kViil7WFw+gAAAABJRU5ErkJggg==', ib: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANsSURBVFiF7ZbBixxVEMa/6jXT6e6qmtllcGFVjKwaL8GsKIp4iHgIBBPMgiLi0VNEMSISEEHyF3jxoJCjSvQgsisixEQQIiwSXfWiR0l01z24O909Mj09r3LYbmnDTKbHSU5a0FD9+Krq916/rveA/7rRJOIwDBc8z7ubiGaJaLPT6awD+OtmAxAzHyeiUwAerMaYWRfAp0T0VhzHv9wMgL3MfIaInhujy83slSRJ3rmRALcw8yoRHQZ2Z0tEH5vZmud522Z2G4AjAA5VYl6I4/jMpBBDTUROiYgVz1oQBLeP0D0pIp1C11PVe6Yu3m63RUS2i6SXVXVuDOxTJSwzvz81ADM/UyZU1ZfrxIjIxSImARDUreUNGySihyv+as1cpS5S1QNTAQC4tXR2dnYu10lERL+WvpnNTwVARJ3SFxGtmatVAdiZCgDAzxX/sZq5Sp0zs9pNadQKrACw4vVVjGlYzWZz0cyOF69raZpu1AWYGTbY6/W2G43GfiI6AOBO3/eDLMu+HKYVkbZzboWIyj5xIsuyoSsQRdHBRqMx3+/3N8eShWG4ICJXKs3ovIgci6JoHkCj2WwuqupLVY2qfjgqHzM/KyIDERlEUXR/OX7dpQ3DcGlmZmYVwMJYYuCzOI6fxu7pSMx8CMBPSZJsMfPjRPQ5AB+Ac84tpWn6AzB6EwIAut3ud4PB4CEz+wCAGyH7E8BrcRwfK4qDmd8govNEdElVjxDRJ0VxAHi9LA5McB9otVr7nHNHnXP3Apglog0z+yYIgi+2traSqlZVT5vZm9fmMLO3kyQ5WbfmNNZQ1XOV/WOq+hHGrPgNtVar1RKRHwuArwDsHaYb+QmazeYDZrbsnNvneV5jXEEzi4lofTAYnE3TdBMA5ubmNM/zRzudzgUAvboAgYi8B+D5cUVHWAzgZN2LybWNyGPmFSJa/pfFgd3dftT3/StZll2aKJKZX6xsnN+Zebndbkud2CAI7lDV00WzMWZOR92iqvaPFfB9/yyAWQAZgEeSJPm62+1mdQDyPO/0er0Lvu/3ATxBRHs8z+tnWXauTjxE5L7K7N+tFTTcfBH5o8jz/Tjx3/8lEd1VGb84BUAPwLeFv1gbIM/zDewewc45tz4FAACUM/9toqgwDJeiKDo4ZXEA2KOqh4uT83+7rl0FeGkwS90cB7oAAAAASUVORK5CYII=', ic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMoSURBVFiF5ZZPiBRHFMa/V6Pb6Z561bthMLAq/otJLkIMgh4kBDwsSARdMETx6ElBTE57ECKBnHJILjkkwUsgoHiSXQ+KwYNgyCYE9xjJSfyzZg/udE2vTO9svRzslnbtcaoz2ZMfNLyu/t57vyqaqgJed1EdcxRF40qpt4lojIgeJ0kyB+DpWgOQ1voIEU0B2FPOEZElAFeI6Ly19u5aALyhtb5ARMcH+HoicrbT6Xz3fwKs01rPENEE8Gy2RHRZRGaVUosishHAQQAflXJOWmsv1IWoFDNPMbPkz2wYhpv6+D5m5iT3dY0xO4du3mq1mJkX86L3jTFvDoA9XMBqrX8eGkBr/UlR0BhzxieHmW/nOR0AoW8vVTVIRHtL8YxnrcLXNMbsGgoAwIYiaLfb930KEdG9IhaRt4YCIKKkiJnZeNYaLQG0hwIA8Fcp3u9Zq/A5EfHelPqtwDQAyV8/x4ANK47jHSJyJH+dTdN03hegUTXY7XYXR0ZG3iWiXQC2BEEQZln2S5WXmVvOuWkiKvaJU1mWea9A35lFUTTeaDR+BzCeD90E8K1z7rc0TZ/EcbxZRA6KyFThIaKLSZIc823+SoAcYnej0ZgpQbxKV621R1HzdBx4GuZH8NdE9Cmq/5knAL6y1n4DwAFAHMfbnXPniEivNovI39baLwAsewEUGh0d3eqcO+ScewfAGBHNi8ivYRheW1hY6JS9zPwjgJP9aimlJtrt9vVaAHXEzIcB/ASAKz7fdc59mKbp47XoXVt9VyCO4w9EZNI5t1UpNTKokIhYIppbWVm5VGd2VQAhM/8A4IRvkVWyAD7zvZis3oiU1nqaiCb/Y3MACAAcCoLgQZZlf9bK1FqfLt2CHmmtJ1utVtWP9JLCMNxsjPmSmVfyi0na7xZV1gsrEATBJQBjADIA+zqdzq2lpaXMB6DX6yXdbvdmEATLAA4Q0Xql1HKWZTd88sHM75Vm/71XUrUCZv4nr3NnkPn5zkZE20rjt4cA6AL4I493eAP0er15PDuCnXNubggAAChm/rBWVhRFu5vN5vtDNgeA9caYiWaz6X01e331L3PfEqV4E7mjAAAAAElFTkSuQmCC', id: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAO1SURBVFiF7ZZNaFxVFMd/501MeR/3ThIGg7GFaqtUpGKloIiC4KJaLNpWwYJLddOVLiS6koJSFGrXYrEFxUpcKEbFlbsWo4umLtQoVmxpUiJm5t15k2nJu9dF78NXO5OZaexG/cMw5545H78z7/Luhf+6ZJDgKIomgiDYLCKjInIhTdNZYPl6A0iSJLtFZBLYXs5xzrWAT0TkVWPM3D8OMD4+HrdarWPA3h51LgH7jTHvFA7/b93fbDangfa1AAwlSTItIjvg8rQiMuWcmwmCoO6cuxnYCTxUynnWGHMEQCl1GtgKfGGM2QXkPYa4UkqpSaWU85+ZMAzXd4l7TCmV+riLWuvbvP9EKf+lgZrXajWllKr75HNa67EesE8UzZIkeR9Aa725VGOpVqupTrlBJ2e73X4UqAKIyBtpmv6xGoAx5mPgpI9/HAjTNP3ZOXfIh4y02+1H+gYQkXtL9vRqzUsq4mKt9VZvT5Xq3Nc3AHBjYTQajXP9dBeR3wrbOTcO0Gw2z3Sq2RNARNLCVkrpfgCAkRJAAyCKotFONXsCAD+W7Af6BCjirHNuDmBoaOjh0u/f9w0gIp8Czi9fpMcLq1qtbnLO7fbLmSzLFoB1zrnJAioIgo57qSNAo9E445w77pcPKqUOdoNQStXyPJ8Chr3rdQCt9WHgTgDn3Af1ev3XTvldJ4uiaKJSqXwDTHjXV8Bha+3XWZYtVavVDc65nX7KCQAROZ6m6T4PtgjUgPN5nm9vtVrzAwF4iG2VSmW6BLGaPjPGPIU/HZMk2Ssi+6y1B7IsO90tqedp6A+VN0XkaTo/siXgNWPMW4DtA3QwgEIjIyMbrbW7rLW3A6MisuCcOxmG4ZeLi4vNQRv/r0JdH0G1Wr3HObfHWrsxCILhbnGFnHNGRGbzPP8wy7ILvsat1tpXROS7IAiO1ev1ej8AoVLqbeCZQSYpyQAvGGOO+DrPef888KQx5sRqAEGSJJ8Xt6A1yAHPA78D7wGx99dXVlbuWl5ePtsxK0mS/aVbzHySJHu6XST+rjAMN2itDyilcn8xycIwXD82NqaVUkdLdd/tWkQp9UtxtVJKbRlo5r9qvFxqdtC7h5VScwUYsK6ID0qJW4Bb/PKoMeaHawEwxhwCFv2yuAVdAj4CEJEojuM7rgIQkaI5wBUbZUBdBL719qaS/6fCqFQqN10FsLKyssDlzWOttbNrAAA45b/PF448z08V9fM873gwEUXRtjiO715jc4AbtNY74jgev071/0X6Ex1jWZirRa4zAAAAAElFTkSuQmCC', $8: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALFSURBVFiF7Zc9iFVHGIafb7JmyZ755kJcAlpFiBFSqLFxLQSjaWRBxcSFiI1oY5WQTrGPaQQrq+3EYsWQWEREhBQBN0UEG4tVSRXywwZ2Z84VNibzpZlzcxNd9v7sD4S8cODe937nvM+ZM/PNPfC/hlQI4XXv/UHAbUT4hKr+oqrmvb84yDUGpvbef5Bzvge8AeCc27luACGEj0VkRkTGBjm/WyN91m9S1atmdqZ8N0CGAeh5BMbHx1VVvwKa8CUROTVMeM8ArVZr29LS0ixwuFi/Ae/HGK+vOUAIYW/O+T7wTrEei8i+lNK3w4bDv+ZAVVW7RWR7h865rWb2GfAagIjcc859uLCwsLAa4f8AqKpql3Pue7pGxcy6a6djjOeA56sVTneYiLzNyx+JAedTSmd7DVfVY6q66L2/DrxavB2qOqeqT8fGxrY0tcstw8tmNgtgZnPtdvthb/fT0SQQROQjVa1yzheBO8AWgJGRkV3AT8sCmNlsXdc3+gztSEQ+N7PJEnjEOTcJvFJ+vhVjvNvUrskGEmN8AhwAfixWE347pTQF/LmmAF1asUuuCUAI4S3gG2BrsZo7PqyqM/w9Ii8HEJEJ7/0J7/2Jqqp29wtgZucpEw64lXN+lzLpgCOtVutgU7vcKvhURBoYU9ULKaVLvQKIyBdmdtzMvq7r+jTwu6q+B3wJ/JFzftCpbT6URvSA5R/LdErphUakqlZCb8QYp3qFbNQZgXa7/bCqqj2lIQEvtOIzIYQ3V7sVr6gQwl5V/VlVrRxzIYTOftH4IYSZQa6/4iqIMX7nnNsHPCrWdjO7r6r7BwnsGwBgcXHxh9HR0QngdrE2A3dDCCfXBQBgfn4+pZSOAtPFGjWza+sGUPQ8pXRWRD4BMkP+HxwEAIAY4xUzmzKzZxsCAFDX9U3n3CHgV4Ccc79b9upoQ1/N/hP6C33M5Slqgym1AAAAAElFTkSuQmCC', ig: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANVSURBVFiF7VdNiBRHFP5etYub6XrVYwgbGBH1kEQUdOMPjMSTUfAo+HcJOUQRPRmCBxWPggpG8CAaMAaSmz/XIJrNQVAGZP05KKKHEAILuoFsV3fvHmTq5TA1S9vO9M7OmhWCHwxd9ep99b6qV/W6B3iPOcIY86HWejMA9S6C15n5BTOL1vp4P3P0rVprvcM5NwJgCACUUqvnTYAx5hARXSGiSj/8PBbM0n+AmS+IyF7fFwDUzTkMw2EAkmXZo24+Pe9AtVqtGmN+BdAOPiUie8qCK6VGlVL3mXn7nAREUbS82WzeEZEt3vSSiDanaXq1B7oCcLFarVb7EmCMqTvnGgBWetMTpVTdWtso42VZ9hDA9777cbPZ7HhLXstfGIbDRPTJtDqlaiJyEsAHAEBEI0qpnRMTExNtH2YWP3bVWrtbaz0UBMFwHMcjtVptYZIkzwHUANjBwcHF4+PjaT7m9CEMw3CNUmoUuV0Rkbzvj9bagwBela2ciG475z5j5h/GxsYOMPPPAI4AMFNTU9sAXMv7qxzxU3ROiQA4miTJvpmCF7DfGLNBRH7JxdhadOp2Dc+KSAMARORZ2TUqgogOicgNtNL7TZqmB5n5bwAfAVjTkwARafR4wt+AtfamMeYvEVkiIhu9+SmATQCWFv3/ixeIOOee+nY74D/+uWg+BORBhaebDwGklFrh23/6Z7sIxUXnjmeAiOpaawCAiDz3RaUnRFG01Tm3xM9z15uLgsoFAPiOiNpihJmPJUlyqhcBzrnzvikALmutV6F1AwDgjYXki84zdMgRWvk7ycyXAAzMED9fWX+y1t4joq9yMW4VCdM7kGXZozAM1/qC1FL3einea4xZVizFBYhzblMQBGuttTdrtVolSZKv/ZgNw/BGmqZdqF2Q/+zyv8dRFC1vj7ftxpgrRS4zn87xznSaf8ZbYK1tKKXqAJ5400rnXMMYUy/jRVG0HsBh330RBMGJvgQAQBzHfwRB8AUR/eZNQyLyu9Z6Vw90B+BASdpmhQFmvpTbVleWgiiK1lUqlc/LJpxtIXqVJMk+IvoWrZV1/R4EgDiORycnJx+8TQEAAGvtORHZLSKT/fDnLAAA0jS9rpT6EsBLAHDO9fzKfqt4p3/N/hf4FyGyOVbmGmCTAAAAAElFTkSuQmCC', ih: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANWSURBVFiF7VbPixxFFP7e9JjR7fqqZ/fgGjwENwFBkOQQIQFR1JxFEnLUP0ATFPxB4kaTiQnJJfEgqBcviv4DIuhJRBSUHDwEQdxJFLKuMKuZ7cnMzs5O9csh1UNnmR/dm+whkA8a6tV773tfva7qLuA+7gDW2hlr7cydcJQ2mVcm+YWqNlS1QfJzAOXNEAWbSSL5FoA3AYh/dlcqlXav1/upKJcUTahWq1Xn3BUA0wBW/HQE4HoQBHPNZrNZhK/wK3DOveOLQ1UvqOpF75p2zr1dlK9QB4wxD4vIAgACWK5UKnMiot1udwHALIB2kiS72u32v3k5i3bgPV8cInJmeXm51Wg0bojIee8PReTdgpz5UK1Wd5DsklRjzN8AKhn3NpJXSCrJtSiK5vLy5u6Ac+50WlREagDWMu4egLOpmCRJ3s/LmwskHye57lf4B4af+YDk7z6mb4x5Ig933g6cS4uq6jyA/tTU1HaSdZJ/hmH4CACnqidTMSLyQU7u8YiiaC/JxK/sEvzJMcYc9HNqjDnow4XkL+m8tXbfJP6JHVDV82lREZkHoN6V/YqmYxWRk5n5iV0YK8AY84yqvuDNH+M4/m4SYRzH3wL43os/YIx5ftMCMucbAI5NKp7JOwbfKc8x8oM3UgDJlwDs9+bXrVbr59sSS6XWsDEAxHH8K4BvvPkUyRfzih9wkvzNbyYXhuGeITGBtfa0tbaGIX/VMAyfJOk8x+VhMSNhrX0ls8O/LKo+hTHmq8yJeDlv3gMkF3xiz1q7awT5IZJLJJeMMYeGxURR9BjJNc91FcC2PKpfy6j+ZFQcycU0juTimLhPM918daN/4yZ8SESO+3F3fX397MaEonDO1VS1AwAicmJ2djYcKYDkGwAe9eZHq6ur18ZwHwHwj3+OjArqdDpLIvKxN7d3Op2jWf/gfPqrVh3ADG5dtXa2Wq3/xq0uL6Iomk6SpI5bN6mmiOyM4/h/INOBfr//ui8OVb1wt4oDwMrKynVV/dCb1SRJBl0Y/FZF5ECqRUQWjTGH75YAz78IoA+gLCLPAajdJgBAHcDTfu4zkcIX5iKop4PBKwiC4BSAv7ayqsfVcrlcS42Ny3zQWvtskiR2KyqXSqU4juMfAHS3gv/exE0eVBOWq5a8zAAAAABJRU5ErkJggg==', ii: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAH0SURBVFiF7ZY9aBRRFIXPnRkQh7kPXJEF25CtYiqLRe0tgq2xsBCxTGUbLRa7FAoiCtqICoIpbKxSBotAKkVUMJXdBmXZmbeNY96xyIyZ3Yw/4zJJ4ZzmMfcd3vnmXoY3QKNG/7tksqCqHZJzAPyKZ5Hkp9Fo9OafAYwxt0gul4FV0JMkSa4AYMmel61uH4CqdgB8nDJ8N8Xzzg+Hw7ViTVUvALgPICXZtdZuA0CQG0jOiUgefpvkRpVQEekCuA4Azrl5AGsA0Gq1TJqmdwBcLXjPAng5BoDCzEluWGtXqwBEUYQ9/t2zVPVcmqaPAcwUvSR/5nqoQSJyNIqiuwDWC+FJmTcoK04rkjdEJO/odwArIvKe5LNJby0dwN44P4jImSRJlp1z38qMdQE4AA9V9XQcx5u/M9Y1giVr7YMkKR37mOrqwIm/Ndb1FfRU9VUYhicPBSDTgu/774wxlw8DYCdbj5F8aox5DuD4gQGQXBKRF4XnSyJy78AAAHyN43iR5EUAX7Ja6fVe/AzztkFEulEUVUrMLqOxs6y1q2EYvvZ9/xGAhcJ+rdcxRaQTx/FWsaiq1wCsAPCCIJgfDAafxwAAwBjTI3lzCgiS7Flre7/YP9Jut4N+vz/KC/uCjDGzzrlTqP5LtuN53tvJN2/UqNGf9APAqK3VSV0JqAAAAABJRU5ErkJggg==', ik: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJdSURBVFiF7ZY9bxNBEIaf3TMmnG9zRZBCLAFF0lAmQZGIUoECLYqSlJRICEqQaGiQED+Aj44/QADRISFElUQgSE9FQWEnFAh7vSaSvbsU2JE5fPYZnAo/5dzsvO/u7M0djBjxvxMMuqBYLIZCiPNjY2PTExMTZa11o1teoVA4EYbhYj6fP5PL5XSj0ah1yxODiCulFoEXwGQrtAusaq232jlhGE4FQfAIuNxR3wEvnXPXjTG7/2LgPbCQCJe11tPAD6XUceAjcLrbeu/9F+/9gjFmrx2TgxgANoB97/1DIcTTVmwqiqJzAFLK2Q7xT8BV7/0NYAdACHEqCIIHnQXTTiA3Pj5+0TlXSHMipVzz3q+1dnahVqu9BWQURXeEEHml1L1SqVRvpR9VSm0CZwFrrT1Zr9fLqQaUUveB272OooODFvRKiqLomhDiccv8pUql8hrSW+CzigshVvqJt+jUOqjfqwXLzrkorZr3/psxZgvYzyB+JIqid0KIOcB674u1Wu3rHwbiOJ6z1k5nKJgZKeWU9/4KMA8ghNioVqvr7ecHBuI4nnfOfUiaGjKfrbVL7QsIKX05BCzwLCkOid2GYTgrpZwZprKU0lhrdzqHT6qBHvSdC0mCIPheqVQ26fOGZDIw4FzoZA9Y0VpvpyVkHcV/ez8mgefFYjFMSxikBT3nQhIp5ar3fh3AObdsjHnTtXDGes1qtfqqX5JS6hZwVwjxhN83l3qCQ33nlVJbwGIiXNJaz5ByGQf9HPfjJr9+UtqUgdU0cTicqXcsjuOlZrPpjDHbvcRHjBgB8BOrjN1A+2lObAAAAABJRU5ErkJggg==', il: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFQSURBVFiF7ZatTgNBFEbPnV3V7GwojgRFLQEJTYBXqOprkKDxWBIeAx4ABaYkgEKgcQhUm92hinQugk6ztBTMLgjmU3Pn75xkkpuBmP8eqRZZlh2IyBmwCSQ1syYi8qiqh865wYJAnuerqvoErNQMns/IGNMpimIEkFYWdirwWxF5rpOqqutAF2ir6i5w+UnAe5+JSNh86py7qFMgy7K+iHQDK8ynyw60Wq21JEkGgHrv91TVJEly83He74/H45c6xJYKpGm6raqdylhUdWNabwHNCpRleWWtPQEoiuIawFp7IiIa6kYFgDfn3HF1Yr5uTEBEzq21dbO+jPkVyjdZ9gRN9oGfBZruA9X8+RNEgSgQBaLArBMaY15VFQAROcrzvF8naNqKZ6wFAeAeGAFtoBtkGshQRO5mMmFQluUQ6KnqAzBpADyZ3t0LP+KYGIB3lcmJ6lIPsmkAAAAASUVORK5CYII=', ir: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOGSURBVFiF5ZbPixxFFMe/r3vSvdl6r2cOq7PBQ6IoCkZiyGUlIIiHDBJFD7M5q4tiwIPgxYsRQUT/goSoB4MIuUjMwZNCTkH8kVMMZqJ7MKyyCOP09MyynXQ/D1s99nR6Mj1uNpd8YeieV+9VferVq64C7nXRLM71ev2hJEn2qqpLRDfSNO0Mh8O1HQVg5seJ6E0ARwDsK3H5BcDntVrtZLfb7d1JgN3M/DERHQfgVOjrbwAr/X7/3LYBmPk+IvoGwKGceVVVvwbQcRynq6qLRLSkqi0AYn1SVT0RRdEHAHQWkLw8EflBRNT+/mDmY5NgG41GQ0Q+EpGbWUwQBG/938ERBMH7WUfM/NP8/PyeinEtZh7Y2DgIgqWZBxeRx0TkRjZzY8ziLPHMvJzLwiVUKPJicb0KoAYAqvr2YDD4qwTyJRE5Xa/XHyy2RVF0FsA5G/+kMebZWSbgisiancHvk+hFpG99Pi1rD4JgKVc/p6YNOsqAiDwCYI+lP4/JVcwAQERS1hiG4fcAssw9VRmAiPIp/XVsROa2iEQiMoJS1badZccY08y5ay5+X2UAVfVHRscJ805E1AJgJvTxcK1WO1CwZfHJNIBaDqBLRNn7/QWAD1XVISKjqm1rvk5EF1W10+v1viv0m+2ebmUAAFdyA47t4TAMrwF4GQCyZSCii2EYLhc7bDabZjgc7rd/V6cBjJYgiqJ1AJcBQFVbjUajMSGmY59Xyxo3NjZeBLDbQp6vDGB1xj4lSZJ3ygLSNH3acZwjYRi+V9Lsq2pmTx3H+WoawJgWFhZERNZtdd8MgqA1S7yIfJb7BpyZHlEiZj6WOwsGzHzLOpfILwzeLWzNiXKLhjiOL/u+Pw/gMBHtIqK27/sH5+bmVjc3N8duP81m07iuu+x53lkA+c+uR0RX4zj+eRrAxMOCmd8lohMYr5M/AVzD1vZaBPAEbMFZ/QMgsDEpgNf7/f4ntwO4JQOZ4ji+4HneBSI6iP/2tQDYC+BRAA8A2GXtCYAvVPUFIuoAOGohjvq+v3a7TFS5lBIzP+M4TltVD1uAOWxl4Yqqfuu67pe9Xu+3LEBEVgCcwgyZuOMSkVdEJLFFmTLzG2V+E5dgu4rj+JLv+9cBPA/AIaLnPM9bj+P4x7sCMAvEjktEVnLLkRhjRqdnlfv+tmUL8DVsFWRKRFOP6R2RMeYAM++f7nkv6V9alTs02PJnTgAAAABJRU5ErkJggg==', is: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAATrwAAE68BY+aOwwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANcSURBVFiF5VbPjxRVEP7q9Wz3sq+qdw6Ls4TDqtFoAgQJFwxcjAc3BIwedjl4041GEg8kXLgIMZEgf4EmhAOEkHAhyMGTJhyNPzitBHbNHDSoG5Oxd3pmsw3dxWFfDzPjLNO9y3LhSzr9ulLfq6/rVb33gOcdVMZ5fHz85TRNp1TVI6IHWZYttNvt+1sqgJl3EdFnAN4B8OIAl98AXKpUKl83Go3oaQrYxsznieg4AFNgrn8BzDWbzRubFsDM24noOwD7u8x1Vf0WwIIxpqGqk0R0QFWnAYjzyVT1dBzHXwLQMkK64YvITyKi7vmDmY+tJ7ZarVZF5CsReZhzwjA8sdHgCMPwi3wiZv5lbGxsR0HeNDO3HDcJw/BA6eAi8rqIPMj/3Fo7WYbPzLNdWbiNAkXeX1wfAagAgKqebLVaf5cREMfxNQA3HP8Na+3bZQR4AD5w47qbrDSI6FxncmNmCgsQkVcB7AAAVb2JDVbx8vLyjwDyzL05zL+SD4joJdVOzLvdTiLyPoBLAHjAHItZlh1qtVr/uG91/EkM3rh60MmAqgYdozHLfX6H1wkOAK9UKpW9fbacnw4T0MmAqjaIKB+/0KPSmLNZlhkikj4+VHUhiqIf+sx59zQKCwBwJx8QUU8PR1FUx1qHDEWtVrPtdnu3+6wP8+8sQRzHSwDmAUBVp6vVarVIwH6srKy8B2AbABDRzcICHC67t6RpemoD8QNVPePGmTHmein2xMSEiMiS280ehmE4XYYvIhe7zpDLwxkDwMzHus6CFjPPFqAFfcEb1tpakXhevyFJkvkgCMYAHCSiESKaCYJg3+joaH11dbXn9lOr1aznebO+718D0L3t+kR0L0mSX4cJWPewYObPieg0euvkLwCLWGuvSQB74ArO4T8AoeNkAD5pNpsXniTgfxnIkSTJLd/3bxHRPjzuawEwBeA1ADsBjDh7CuCKqr5LRAsAjjgRR4IguP+kTBS5lBIzv2WMmVHVg07AKNaycEdVv/c872oURb/nBBGZA/ANSmTiqUNEPhSR1BVlxsyfDvJbdwk2iyRJbgdB8CeAowAMER32fX8pSZKfn4mAMiK2HCIy17UcqbW2c3oWue9vGq4AP8ZaQWZENPSY3hJYa/cy8+7hns8THgFOWCaPM8DMwgAAAABJRU5ErkJggg=='};
var $mdgriffith$elm_ui$Internal$Model$Monospace = {$: 2};
var $mdgriffith$elm_ui$Element$Font$monospace = $mdgriffith$elm_ui$Internal$Model$Monospace;
var $mdgriffith$elm_ui$Internal$Model$Empty = {$: 3};
var $mdgriffith$elm_ui$Element$none = $mdgriffith$elm_ui$Internal$Model$Empty;
var $mdgriffith$elm_ui$Internal$Model$PaddingStyle = F5(
	function (a, b, c, d, e) {
		return {$: 7, a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Internal$Flag$padding = $mdgriffith$elm_ui$Internal$Flag$flag(2);
var $mdgriffith$elm_ui$Internal$Model$paddingName = F4(
	function (top, right, bottom, left) {
		return 'pad-' + ($elm$core$String$fromInt(top) + ('-' + ($elm$core$String$fromInt(right) + ('-' + ($elm$core$String$fromInt(bottom) + ('-' + $elm$core$String$fromInt(left)))))));
	});
var $mdgriffith$elm_ui$Element$paddingEach = function (_v0) {
	var top = _v0.hZ;
	var right = _v0.gP;
	var bottom = _v0.dy;
	var left = _v0.fI;
	if (_Utils_eq(top, right) && (_Utils_eq(top, bottom) && _Utils_eq(top, left))) {
		var topFloat = top;
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$padding,
			A5(
				$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
				'p-' + $elm$core$String$fromInt(top),
				topFloat,
				topFloat,
				topFloat,
				topFloat));
	} else {
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$padding,
			A5(
				$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
				A4($mdgriffith$elm_ui$Internal$Model$paddingName, top, right, bottom, left),
				top,
				right,
				bottom,
				left));
	}
};
var $mdgriffith$elm_ui$Element$paddingXY = F2(
	function (x, y) {
		if (_Utils_eq(x, y)) {
			var f = x;
			return A2(
				$mdgriffith$elm_ui$Internal$Model$StyleClass,
				$mdgriffith$elm_ui$Internal$Flag$padding,
				A5(
					$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
					'p-' + $elm$core$String$fromInt(x),
					f,
					f,
					f,
					f));
		} else {
			var yFloat = y;
			var xFloat = x;
			return A2(
				$mdgriffith$elm_ui$Internal$Model$StyleClass,
				$mdgriffith$elm_ui$Internal$Flag$padding,
				A5(
					$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
					'p-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y))),
					yFloat,
					xFloat,
					yFloat,
					xFloat));
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$borderRound = $mdgriffith$elm_ui$Internal$Flag$flag(17);
var $mdgriffith$elm_ui$Element$Border$rounded = function (radius) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderRound,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Single,
			'br-' + $elm$core$String$fromInt(radius),
			'border-radius',
			$elm$core$String$fromInt(radius) + 'px'));
};
var $mdgriffith$elm_ui$Internal$Model$SpacingStyle = F3(
	function (a, b, c) {
		return {$: 5, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Flag$spacing = $mdgriffith$elm_ui$Internal$Flag$flag(3);
var $mdgriffith$elm_ui$Internal$Model$spacingName = F2(
	function (x, y) {
		return 'spacing-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y)));
	});
var $mdgriffith$elm_ui$Element$spacingXY = F2(
	function (x, y) {
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$spacing,
			A3(
				$mdgriffith$elm_ui$Internal$Model$SpacingStyle,
				A2($mdgriffith$elm_ui$Internal$Model$spacingName, x, y),
				x,
				y));
	});
var $mdgriffith$elm_ui$Internal$Model$Transparency = F2(
	function (a, b) {
		return {$: 12, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$transparency = $mdgriffith$elm_ui$Internal$Flag$flag(0);
var $mdgriffith$elm_ui$Element$alpha = function (o) {
	var transparency = function (x) {
		return 1 - x;
	}(
		A2(
			$elm$core$Basics$min,
			1.0,
			A2($elm$core$Basics$max, 0.0, o)));
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$transparency,
		A2(
			$mdgriffith$elm_ui$Internal$Model$Transparency,
			'transparency-' + $mdgriffith$elm_ui$Internal$Model$floatClass(transparency),
			transparency));
};
var $mdgriffith$elm_ui$Internal$Model$Button = {$: 8};
var $mdgriffith$elm_ui$Internal$Model$Describe = function (a) {
	return {$: 2, a: a};
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $mdgriffith$elm_ui$Element$Input$enter = 'Enter';
var $mdgriffith$elm_ui$Internal$Model$NoAttribute = {$: 0};
var $mdgriffith$elm_ui$Element$Input$hasFocusStyle = function (attr) {
	if (((attr.$ === 4) && (attr.b.$ === 11)) && (!attr.b.a)) {
		var _v1 = attr.b;
		var _v2 = _v1.a;
		return true;
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Element$Input$focusDefault = function (attrs) {
	return A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, attrs) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass('focusable');
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $mdgriffith$elm_ui$Element$Events$onClick = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Events$onClick);
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 2, a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $mdgriffith$elm_ui$Element$Input$onKeyLookup = function (lookup) {
	var decode = function (code) {
		var _v0 = lookup(code);
		if (_v0.$ === 1) {
			return $elm$json$Json$Decode$fail('No key matched');
		} else {
			var msg = _v0.a;
			return $elm$json$Json$Decode$succeed(msg);
		}
	};
	var isKey = A2(
		$elm$json$Json$Decode$andThen,
		decode,
		A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		A2(
			$elm$html$Html$Events$preventDefaultOn,
			'keydown',
			A2(
				$elm$json$Json$Decode$map,
				function (fired) {
					return _Utils_Tuple2(fired, true);
				},
				isKey)));
};
var $mdgriffith$elm_ui$Internal$Flag$cursor = $mdgriffith$elm_ui$Internal$Flag$flag(21);
var $mdgriffith$elm_ui$Element$pointer = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.ep);
var $mdgriffith$elm_ui$Element$Input$space = ' ';
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $mdgriffith$elm_ui$Element$Input$button = F2(
	function (attrs, _v0) {
		var onPress = _v0.ba;
		var label = _v0.bS;
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aK + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.R + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.gW + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.bY)))))),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$pointer,
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Element$Input$focusDefault(attrs),
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Button),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Internal$Model$Attr(
											$elm$html$Html$Attributes$tabindex(0)),
										function () {
											if (onPress.$ === 1) {
												return A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Internal$Model$Attr(
														$elm$html$Html$Attributes$disabled(true)),
													attrs);
											} else {
												var msg = onPress.a;
												return A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Element$Events$onClick(msg),
													A2(
														$elm$core$List$cons,
														$mdgriffith$elm_ui$Element$Input$onKeyLookup(
															function (code) {
																return _Utils_eq(code, $mdgriffith$elm_ui$Element$Input$enter) ? $elm$core$Maybe$Just(msg) : (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$space) ? $elm$core$Maybe$Just(msg) : $elm$core$Maybe$Nothing);
															}),
														attrs));
											}
										}()))))))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var $mdgriffith$elm_ui$Internal$Model$Focus = 0;
var $mdgriffith$elm_ui$Internal$Model$PseudoSelector = F2(
	function (a, b) {
		return {$: 11, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$focus = $mdgriffith$elm_ui$Internal$Flag$flag(31);
var $mdgriffith$elm_ui$Internal$Model$Nearby = F2(
	function (a, b) {
		return {$: 9, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$TransformComponent = F2(
	function (a, b) {
		return {$: 10, a: a, b: b};
	});
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $mdgriffith$elm_ui$Internal$Model$map = F2(
	function (fn, el) {
		switch (el.$) {
			case 1:
				var styled = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						fq: F2(
							function (add, context) {
								return A2(
									$elm$virtual_dom$VirtualDom$map,
									fn,
									A2(styled.fq, add, context));
							}),
						hw: styled.hw
					});
			case 0:
				var html = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A2(
						$elm$core$Basics$composeL,
						$elm$virtual_dom$VirtualDom$map(fn),
						html));
			case 2:
				var str = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Text(str);
			default:
				return $mdgriffith$elm_ui$Internal$Model$Empty;
		}
	});
var $elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var $mdgriffith$elm_ui$Internal$Model$mapAttrFromStyle = F2(
	function (fn, attr) {
		switch (attr.$) {
			case 0:
				return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
			case 2:
				var description = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Describe(description);
			case 6:
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$AlignX(x);
			case 5:
				var y = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$AlignY(y);
			case 7:
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Width(x);
			case 8:
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Height(x);
			case 3:
				var x = attr.a;
				var y = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Class, x, y);
			case 4:
				var flag = attr.a;
				var style = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$StyleClass, flag, style);
			case 9:
				var location = attr.a;
				var elem = attr.b;
				return A2(
					$mdgriffith$elm_ui$Internal$Model$Nearby,
					location,
					A2($mdgriffith$elm_ui$Internal$Model$map, fn, elem));
			case 1:
				var htmlAttr = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Attr(
					A2($elm$virtual_dom$VirtualDom$mapAttribute, fn, htmlAttr));
			default:
				var fl = attr.a;
				var trans = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$TransformComponent, fl, trans);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$removeNever = function (style) {
	return A2($mdgriffith$elm_ui$Internal$Model$mapAttrFromStyle, $elm$core$Basics$never, style);
};
var $mdgriffith$elm_ui$Internal$Model$unwrapDecsHelper = F2(
	function (attr, _v0) {
		var styles = _v0.a;
		var trans = _v0.b;
		var _v1 = $mdgriffith$elm_ui$Internal$Model$removeNever(attr);
		switch (_v1.$) {
			case 4:
				var style = _v1.b;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, style, styles),
					trans);
			case 10:
				var flag = _v1.a;
				var component = _v1.b;
				return _Utils_Tuple2(
					styles,
					A2($mdgriffith$elm_ui$Internal$Model$composeTransformation, trans, component));
			default:
				return _Utils_Tuple2(styles, trans);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$unwrapDecorations = function (attrs) {
	var _v0 = A3(
		$elm$core$List$foldl,
		$mdgriffith$elm_ui$Internal$Model$unwrapDecsHelper,
		_Utils_Tuple2(_List_Nil, $mdgriffith$elm_ui$Internal$Model$Untransformed),
		attrs);
	var styles = _v0.a;
	var transform = _v0.b;
	return A2(
		$elm$core$List$cons,
		$mdgriffith$elm_ui$Internal$Model$Transform(transform),
		styles);
};
var $mdgriffith$elm_ui$Element$focused = function (decs) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$focus,
		A2(
			$mdgriffith$elm_ui$Internal$Model$PseudoSelector,
			0,
			$mdgriffith$elm_ui$Internal$Model$unwrapDecorations(decs)));
};
var $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty('alt');
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $mdgriffith$elm_ui$Element$image = F2(
	function (attrs, _v0) {
		var src = _v0.hj;
		var description = _v0.eF;
		var imageAttributes = A2(
			$elm$core$List$filter,
			function (a) {
				switch (a.$) {
					case 7:
						return true;
					case 8:
						return true;
					default:
						return false;
				}
			},
			attrs);
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.fs),
				attrs),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[
						A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asEl,
						$mdgriffith$elm_ui$Internal$Model$NodeName('img'),
						_Utils_ap(
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Internal$Model$Attr(
									$elm$html$Html$Attributes$src(src)),
									$mdgriffith$elm_ui$Internal$Model$Attr(
									$elm$html$Html$Attributes$alt(description))
								]),
							imageAttributes),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_Nil))
					])));
	});
var $mdgriffith$elm_ui$Internal$Model$Active = 2;
var $mdgriffith$elm_ui$Internal$Flag$active = $mdgriffith$elm_ui$Internal$Flag$flag(32);
var $mdgriffith$elm_ui$Element$mouseDown = function (decs) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$active,
		A2(
			$mdgriffith$elm_ui$Internal$Model$PseudoSelector,
			2,
			$mdgriffith$elm_ui$Internal$Model$unwrapDecorations(decs)));
};
var $mdgriffith$elm_ui$Internal$Model$Hover = 1;
var $mdgriffith$elm_ui$Internal$Flag$hover = $mdgriffith$elm_ui$Internal$Flag$flag(33);
var $mdgriffith$elm_ui$Element$mouseOver = function (decs) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$hover,
		A2(
			$mdgriffith$elm_ui$Internal$Model$PseudoSelector,
			1,
			$mdgriffith$elm_ui$Internal$Model$unwrapDecorations(decs)));
};
var $mdgriffith$elm_ui$Element$padding = function (x) {
	var f = x;
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$padding,
		A5(
			$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
			'p-' + $elm$core$String$fromInt(x),
			f,
			f,
			f,
			f));
};
var $mdgriffith$elm_ui$Internal$Model$BorderWidth = F5(
	function (a, b, c, d, e) {
		return {$: 6, a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Element$Border$width = function (v) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderWidth,
		A5(
			$mdgriffith$elm_ui$Internal$Model$BorderWidth,
			'b-' + $elm$core$String$fromInt(v),
			v,
			v,
			v,
			v));
};
var $author$project$Ui$Widgets$toolbarButton = F2(
	function (recordName, maybeMsg) {
		return A2(
			$mdgriffith$elm_ui$Element$Input$button,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$padding(3),
					$mdgriffith$elm_ui$Element$Border$width(0),
					$mdgriffith$elm_ui$Element$focused(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.fk)
						]))
				]),
			{
				bS: A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$clip,
							$mdgriffith$elm_ui$Element$Border$rounded(6)
						]),
					A2(
						$mdgriffith$elm_ui$Element$image,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$width(
								$mdgriffith$elm_ui$Element$px(24)),
								$mdgriffith$elm_ui$Element$height(
								$mdgriffith$elm_ui$Element$px(24)),
								$mdgriffith$elm_ui$Element$alpha(0.7),
								$mdgriffith$elm_ui$Element$mouseOver(
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$alpha(1)
									])),
								$mdgriffith$elm_ui$Element$mouseDown(
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fK)
									]))
							]),
						{eF: 'Image button', hj: recordName})),
				ba: maybeMsg
			});
	});
var $mdgriffith$elm_ui$Element$Border$widthXY = F2(
	function (x, y) {
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$borderWidth,
			A5(
				$mdgriffith$elm_ui$Internal$Model$BorderWidth,
				'b-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y))),
				y,
				x,
				y,
				x));
	});
var $mdgriffith$elm_ui$Element$Border$widthEach = function (_v0) {
	var bottom = _v0.dy;
	var top = _v0.hZ;
	var left = _v0.fI;
	var right = _v0.gP;
	return (_Utils_eq(top, bottom) && _Utils_eq(left, right)) ? (_Utils_eq(top, right) ? $mdgriffith$elm_ui$Element$Border$width(top) : A2($mdgriffith$elm_ui$Element$Border$widthXY, left, top)) : A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderWidth,
		A5(
			$mdgriffith$elm_ui$Internal$Model$BorderWidth,
			'b-' + ($elm$core$String$fromInt(top) + ('-' + ($elm$core$String$fromInt(right) + ('-' + ($elm$core$String$fromInt(bottom) + ('-' + $elm$core$String$fromInt(left))))))),
			top,
			right,
			bottom,
			left));
};
var $author$project$Layout$Maincontent$Bottompanel$Tab$History$Base$historyPaginator = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width(
				$mdgriffith$elm_ui$Element$px(100)),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$paddingEach(
				{dy: 10, fI: 10, gP: 0, hZ: 10})
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$column,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$Border$width(1),
						$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM),
						$mdgriffith$elm_ui$Element$Border$rounded(5),
						$mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fk)
					]),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$column,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
								$mdgriffith$elm_ui$Element$centerX,
								$mdgriffith$elm_ui$Element$centerY,
								A2($mdgriffith$elm_ui$Element$paddingXY, 0, 5),
								A2($mdgriffith$elm_ui$Element$spacingXY, 0, 2)
							]),
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$column,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
										$mdgriffith$elm_ui$Element$height(
										$mdgriffith$elm_ui$Element$px(35)),
										$mdgriffith$elm_ui$Element$centerX
									]),
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
												$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
											]),
										A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[$mdgriffith$elm_ui$Element$centerX]),
											$mdgriffith$elm_ui$Element$text('Events'))),
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
												$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
											]),
										A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[$mdgriffith$elm_ui$Element$centerX]),
											$mdgriffith$elm_ui$Element$text(
												function () {
													var _v0 = model.ex;
													if (_v0.$ === 3) {
														var maybeResponseEvents = _v0.a;
														if (!maybeResponseEvents.$) {
															var responseEvents = maybeResponseEvents.a;
															return $elm$core$String$fromInt(responseEvents.eZ);
														} else {
															return ' ';
														}
													} else {
														return ' ';
													}
												}())))
									])),
								A2(
								$mdgriffith$elm_ui$Element$column,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$height(
										$mdgriffith$elm_ui$Element$px(10)),
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
										$mdgriffith$elm_ui$Element$Font$family(
										_List_fromArray(
											[$mdgriffith$elm_ui$Element$Font$monospace]))
									]),
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$width(
												$mdgriffith$elm_ui$Element$px(75)),
												$mdgriffith$elm_ui$Element$height(
												$mdgriffith$elm_ui$Element$px(5)),
												$mdgriffith$elm_ui$Element$centerX,
												$mdgriffith$elm_ui$Element$Border$widthEach(
												{dy: 1, fI: 0, gP: 0, hZ: 0}),
												$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM)
											]),
										$mdgriffith$elm_ui$Element$none),
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$width(
												$mdgriffith$elm_ui$Element$px(75)),
												$mdgriffith$elm_ui$Element$height(
												$mdgriffith$elm_ui$Element$px(5)),
												$mdgriffith$elm_ui$Element$centerX,
												$mdgriffith$elm_ui$Element$Border$widthEach(
												{dy: 0, fI: 0, gP: 0, hZ: 1}),
												$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.ij)
											]),
										$mdgriffith$elm_ui$Element$none)
									])),
								A2(
								$mdgriffith$elm_ui$Element$row,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$height(
										$mdgriffith$elm_ui$Element$px(24)),
										$mdgriffith$elm_ui$Element$Font$family(
										_List_fromArray(
											[$mdgriffith$elm_ui$Element$Font$monospace])),
										$mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.aM),
										$mdgriffith$elm_ui$Element$centerX
									]),
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_Nil,
										$mdgriffith$elm_ui$Element$text('Page'))
									])),
								A2(
								$mdgriffith$elm_ui$Element$row,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$height(
										$mdgriffith$elm_ui$Element$px(24)),
										$mdgriffith$elm_ui$Element$Font$family(
										_List_fromArray(
											[$mdgriffith$elm_ui$Element$Font$monospace])),
										$mdgriffith$elm_ui$Element$centerX
									]),
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$Font$center,
												$mdgriffith$elm_ui$Element$width(
												$mdgriffith$elm_ui$Element$px(30)),
												$mdgriffith$elm_ui$Element$height(
												$mdgriffith$elm_ui$Element$px(25))
											]),
										A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY]),
											$mdgriffith$elm_ui$Element$text(
												function () {
													var _v2 = model.ex;
													if (_v2.$ === 3) {
														var maybeResponseEvents = _v2.a;
														if (!maybeResponseEvents.$) {
															var responseEvents = maybeResponseEvents.a;
															return $elm$core$String$fromInt(
																(responseEvents.ga > 0) ? (((responseEvents.ga + 20) / 20) | 0) : ((!responseEvents.eZ) ? 0 : 1));
														} else {
															return ' ';
														}
													} else {
														return ' ';
													}
												}()))),
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$Font$center,
												$mdgriffith$elm_ui$Element$width(
												$mdgriffith$elm_ui$Element$px(20)),
												$mdgriffith$elm_ui$Element$height(
												$mdgriffith$elm_ui$Element$px(25))
											]),
										A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY]),
											$mdgriffith$elm_ui$Element$text(
												function () {
													var _v4 = model.ex;
													if (_v4.$ === 3) {
														return 'of';
													} else {
														return '  ';
													}
												}()))),
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$Font$center,
												$mdgriffith$elm_ui$Element$width(
												$mdgriffith$elm_ui$Element$px(30)),
												$mdgriffith$elm_ui$Element$height(
												$mdgriffith$elm_ui$Element$px(25))
											]),
										A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY]),
											$mdgriffith$elm_ui$Element$text(
												function () {
													var _v5 = model.ex;
													if (_v5.$ === 3) {
														var maybeResponseEvents = _v5.a;
														if (!maybeResponseEvents.$) {
															var responseEvents = maybeResponseEvents.a;
															return $elm$core$String$fromInt(
																$author$project$Layout$Maincontent$Bottompanel$Tab$History$Base$calculatePages(responseEvents));
														} else {
															return ' ';
														}
													} else {
														return ' ';
													}
												}())))
									])),
								A2(
								$mdgriffith$elm_ui$Element$row,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$height(
										$mdgriffith$elm_ui$Element$px(24)),
										$mdgriffith$elm_ui$Element$Font$family(
										_List_fromArray(
											[$mdgriffith$elm_ui$Element$Font$monospace])),
										$mdgriffith$elm_ui$Element$centerX
									]),
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_Nil,
										function () {
											var _v7 = model.ex;
											if (_v7.$ === 3) {
												var maybeResponseEvents = _v7.a;
												if (!maybeResponseEvents.$) {
													var responseEvents = maybeResponseEvents.a;
													return (responseEvents.ga < 20) ? A2(
														$mdgriffith$elm_ui$Element$el,
														_List_fromArray(
															[
																$mdgriffith$elm_ui$Element$width(
																$mdgriffith$elm_ui$Element$px(30)),
																$mdgriffith$elm_ui$Element$height(
																$mdgriffith$elm_ui$Element$px(24))
															]),
														$mdgriffith$elm_ui$Element$none) : A2(
														$author$project$Ui$Widgets$toolbarButton,
														$author$project$Monoicons$Png$monoIcons.dR,
														$elm$core$Maybe$Just(
															$author$project$Globaltypes$GetDataEvents(
																(responseEvents.ga > 20) ? $elm$core$Maybe$Just(responseEvents.ga - 20) : $elm$core$Maybe$Just(0))));
												} else {
													return A2(
														$mdgriffith$elm_ui$Element$el,
														_List_fromArray(
															[
																$mdgriffith$elm_ui$Element$width(
																$mdgriffith$elm_ui$Element$px(30)),
																$mdgriffith$elm_ui$Element$height(
																$mdgriffith$elm_ui$Element$px(24))
															]),
														$mdgriffith$elm_ui$Element$none);
												}
											} else {
												return A2(
													$mdgriffith$elm_ui$Element$el,
													_List_fromArray(
														[
															$mdgriffith$elm_ui$Element$width(
															$mdgriffith$elm_ui$Element$px(30)),
															$mdgriffith$elm_ui$Element$height(
															$mdgriffith$elm_ui$Element$px(24))
														]),
													$mdgriffith$elm_ui$Element$none);
											}
										}()),
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$centerX,
												$mdgriffith$elm_ui$Element$centerY,
												A2($mdgriffith$elm_ui$Element$paddingXY, 5, 10),
												$mdgriffith$elm_ui$Element$Border$widthEach(
												{dy: 0, fI: 0, gP: 1, hZ: 0}),
												$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM)
											]),
										$mdgriffith$elm_ui$Element$none),
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$centerX,
												$mdgriffith$elm_ui$Element$centerY,
												A2($mdgriffith$elm_ui$Element$paddingXY, 5, 10),
												$mdgriffith$elm_ui$Element$Border$widthEach(
												{dy: 0, fI: 1, gP: 0, hZ: 0}),
												$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.ij)
											]),
										$mdgriffith$elm_ui$Element$none),
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_Nil,
										function () {
											var _v9 = model.ex;
											if (_v9.$ === 3) {
												var maybeResponseEvents = _v9.a;
												if (!maybeResponseEvents.$) {
													var responseEvents = maybeResponseEvents.a;
													return (_Utils_cmp(responseEvents.ga, responseEvents.eZ - 21) > 0) ? A2(
														$mdgriffith$elm_ui$Element$el,
														_List_fromArray(
															[
																$mdgriffith$elm_ui$Element$width(
																$mdgriffith$elm_ui$Element$px(30)),
																$mdgriffith$elm_ui$Element$height(
																$mdgriffith$elm_ui$Element$px(24))
															]),
														$mdgriffith$elm_ui$Element$none) : A2(
														$author$project$Ui$Widgets$toolbarButton,
														$author$project$Monoicons$Png$monoIcons.dS,
														$elm$core$Maybe$Just(
															$author$project$Globaltypes$GetDataEvents(
																(responseEvents.ga > 0) ? $elm$core$Maybe$Just(responseEvents.ga + 20) : $elm$core$Maybe$Just(20))));
												} else {
													return A2(
														$mdgriffith$elm_ui$Element$el,
														_List_fromArray(
															[
																$mdgriffith$elm_ui$Element$width(
																$mdgriffith$elm_ui$Element$px(30)),
																$mdgriffith$elm_ui$Element$height(
																$mdgriffith$elm_ui$Element$px(24))
															]),
														$mdgriffith$elm_ui$Element$none);
												}
											} else {
												return A2(
													$mdgriffith$elm_ui$Element$el,
													_List_fromArray(
														[
															$mdgriffith$elm_ui$Element$width(
															$mdgriffith$elm_ui$Element$px(30)),
															$mdgriffith$elm_ui$Element$height(
															$mdgriffith$elm_ui$Element$px(24))
														]),
													$mdgriffith$elm_ui$Element$none);
											}
										}())
									])),
								A2(
								$mdgriffith$elm_ui$Element$row,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$height(
										$mdgriffith$elm_ui$Element$px(24)),
										$mdgriffith$elm_ui$Element$Font$family(
										_List_fromArray(
											[$mdgriffith$elm_ui$Element$Font$monospace])),
										$mdgriffith$elm_ui$Element$centerX
									]),
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_Nil,
										function () {
											var _v11 = model.ex;
											if (_v11.$ === 3) {
												var maybeResponseEvents = _v11.a;
												if (!maybeResponseEvents.$) {
													var responseEvents = maybeResponseEvents.a;
													return (responseEvents.ga < 20) ? A2(
														$mdgriffith$elm_ui$Element$el,
														_List_fromArray(
															[
																$mdgriffith$elm_ui$Element$width(
																$mdgriffith$elm_ui$Element$px(30)),
																$mdgriffith$elm_ui$Element$height(
																$mdgriffith$elm_ui$Element$px(24))
															]),
														$mdgriffith$elm_ui$Element$none) : A2(
														$author$project$Ui$Widgets$toolbarButton,
														$author$project$Monoicons$Png$monoIcons.dN,
														$elm$core$Maybe$Just(
															$author$project$Globaltypes$GetDataEvents(
																$elm$core$Maybe$Just(0))));
												} else {
													return A2(
														$mdgriffith$elm_ui$Element$el,
														_List_fromArray(
															[
																$mdgriffith$elm_ui$Element$width(
																$mdgriffith$elm_ui$Element$px(30)),
																$mdgriffith$elm_ui$Element$height(
																$mdgriffith$elm_ui$Element$px(24))
															]),
														$mdgriffith$elm_ui$Element$none);
												}
											} else {
												return A2(
													$mdgriffith$elm_ui$Element$el,
													_List_fromArray(
														[
															$mdgriffith$elm_ui$Element$width(
															$mdgriffith$elm_ui$Element$px(30)),
															$mdgriffith$elm_ui$Element$height(
															$mdgriffith$elm_ui$Element$px(24))
														]),
													$mdgriffith$elm_ui$Element$none);
											}
										}()),
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$centerX,
												$mdgriffith$elm_ui$Element$centerY,
												A2($mdgriffith$elm_ui$Element$paddingXY, 5, 10),
												$mdgriffith$elm_ui$Element$Border$widthEach(
												{dy: 0, fI: 0, gP: 1, hZ: 0}),
												$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM)
											]),
										$mdgriffith$elm_ui$Element$none),
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$centerX,
												$mdgriffith$elm_ui$Element$centerY,
												A2($mdgriffith$elm_ui$Element$paddingXY, 5, 10),
												$mdgriffith$elm_ui$Element$Border$widthEach(
												{dy: 0, fI: 1, gP: 0, hZ: 0}),
												$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.ij)
											]),
										$mdgriffith$elm_ui$Element$none),
										A2(
										$mdgriffith$elm_ui$Element$el,
										_List_Nil,
										function () {
											var _v13 = model.ex;
											if (_v13.$ === 3) {
												var maybeResponseEvents = _v13.a;
												if (!maybeResponseEvents.$) {
													var responseEvents = maybeResponseEvents.a;
													return (_Utils_cmp(responseEvents.ga, responseEvents.eZ - 21) > 0) ? A2(
														$mdgriffith$elm_ui$Element$el,
														_List_fromArray(
															[
																$mdgriffith$elm_ui$Element$width(
																$mdgriffith$elm_ui$Element$px(30)),
																$mdgriffith$elm_ui$Element$height(
																$mdgriffith$elm_ui$Element$px(24))
															]),
														$mdgriffith$elm_ui$Element$none) : A2(
														$author$project$Ui$Widgets$toolbarButton,
														$author$project$Monoicons$Png$monoIcons.dO,
														$elm$core$Maybe$Just(
															$author$project$Globaltypes$GetDataEvents(
																$elm$core$Maybe$Just(
																	($author$project$Layout$Maincontent$Bottompanel$Tab$History$Base$calculatePages(responseEvents) - 1) * 20))));
												} else {
													return A2(
														$mdgriffith$elm_ui$Element$el,
														_List_fromArray(
															[
																$mdgriffith$elm_ui$Element$width(
																$mdgriffith$elm_ui$Element$px(30)),
																$mdgriffith$elm_ui$Element$height(
																$mdgriffith$elm_ui$Element$px(24))
															]),
														$mdgriffith$elm_ui$Element$none);
												}
											} else {
												return A2(
													$mdgriffith$elm_ui$Element$el,
													_List_fromArray(
														[
															$mdgriffith$elm_ui$Element$width(
															$mdgriffith$elm_ui$Element$px(30)),
															$mdgriffith$elm_ui$Element$height(
															$mdgriffith$elm_ui$Element$px(24))
														]),
													$mdgriffith$elm_ui$Element$none);
											}
										}())
									]))
							]))
					]))
			]));
};
var $author$project$Globaltypes$ShowHttpEvent = function (a) {
	return {$: 7, a: a};
};
var $author$project$Globaltypes$TableLineHighLighted = function (a) {
	return {$: 10, a: a};
};
var $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$colorFromRowPosition = function (currentRowPosition) {
	return $mdgriffith$elm_ui$Element$Background$color(
		(!(currentRowPosition % 2)) ? $author$project$Ui$Colors$color.fK : $author$project$Ui$Colors$color.ij);
};
var $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$dynamicTDBackground = F4(
	function (currentRowId, maybeLastRenderedEventId, maybeHighlightRowId, currentRowPosition) {
		if (!maybeLastRenderedEventId.$) {
			var lastRenderedEventId = maybeLastRenderedEventId.a;
			if (_Utils_eq(currentRowId, lastRenderedEventId)) {
				return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fJ);
			} else {
				if (!maybeHighlightRowId.$) {
					var rowIdToHighlight = maybeHighlightRowId.a;
					return _Utils_eq(currentRowId, rowIdToHighlight) ? $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.bU) : $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$colorFromRowPosition(currentRowPosition);
				} else {
					return $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$colorFromRowPosition(currentRowPosition);
				}
			}
		} else {
			if (!maybeHighlightRowId.$) {
				var rowIdToHighlight = maybeHighlightRowId.a;
				return _Utils_eq(currentRowId, rowIdToHighlight) ? $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.bU) : $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$colorFromRowPosition(currentRowPosition);
			} else {
				return $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$colorFromRowPosition(currentRowPosition);
			}
		}
	});
var $elm$html$Html$Events$onMouseEnter = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseenter',
		$elm$json$Json$Decode$succeed(msg));
};
var $mdgriffith$elm_ui$Element$Events$onMouseEnter = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Events$onMouseEnter);
var $elm$html$Html$Events$onMouseLeave = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseleave',
		$elm$json$Json$Decode$succeed(msg));
};
var $mdgriffith$elm_ui$Element$Events$onMouseLeave = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Events$onMouseLeave);
var $mdgriffith$elm_ui$Element$Font$size = function (i) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontSize,
		$mdgriffith$elm_ui$Internal$Model$FontSize(i));
};
var $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTD = F3(
	function (currentEvent, model, maybeContent) {
		var resStatusCode = function () {
			var _v1 = currentEvent.cq;
			if (!_v1.$) {
				var code = _v1.a;
				return code;
			} else {
				return 0;
			}
		}();
		var maybeLastRenderedEventId = model.g5;
		var maybeHighlightRowId = model.hk;
		var currentRowPosition = currentEvent.gR;
		var currentRowId = currentEvent.bM;
		var content = function () {
			if (!maybeContent.$) {
				var data = maybeContent.a;
				return data;
			} else {
				return '';
			}
		}();
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Border$widthEach(
					{dy: 0, fI: 0, gP: 0, hZ: 0}),
					$mdgriffith$elm_ui$Element$height(
					$mdgriffith$elm_ui$Element$px(14)),
					$mdgriffith$elm_ui$Element$pointer,
					$mdgriffith$elm_ui$Element$Events$onMouseEnter(
					$author$project$Globaltypes$TableLineHighLighted(
						$elm$core$Maybe$Just(currentRowId))),
					$mdgriffith$elm_ui$Element$Events$onMouseLeave(
					$author$project$Globaltypes$TableLineHighLighted($elm$core$Maybe$Nothing)),
					$mdgriffith$elm_ui$Element$Events$onClick(
					$author$project$Globaltypes$ShowHttpEvent(
						$elm$core$Maybe$Just(currentRowId))),
					A4($author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$dynamicTDBackground, currentRowId, maybeLastRenderedEventId, maybeHighlightRowId, currentRowPosition)
				]),
			A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$centerX,
						$mdgriffith$elm_ui$Element$Font$family(
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$Font$monospace])),
						$mdgriffith$elm_ui$Element$Font$size(12),
						(!resStatusCode) ? $mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.aM) : $mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.ai)
					]),
				$mdgriffith$elm_ui$Element$text(content)));
	});
var $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTDNotes = F2(
	function (currentEvent, model) {
		var resStatusCode = function () {
			var _v1 = currentEvent.cq;
			if (!_v1.$) {
				var code = _v1.a;
				return code;
			} else {
				return 0;
			}
		}();
		var maybeLastRenderedEventId = model.g5;
		var maybeHighlightRowId = model.hk;
		var currentRowPosition = currentEvent.gR;
		var currentRowId = currentEvent.bM;
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Border$widthEach(
					{dy: 0, fI: 0, gP: 0, hZ: 0}),
					$mdgriffith$elm_ui$Element$height(
					$mdgriffith$elm_ui$Element$px(14)),
					$mdgriffith$elm_ui$Element$pointer,
					$mdgriffith$elm_ui$Element$Events$onMouseEnter(
					$author$project$Globaltypes$TableLineHighLighted(
						$elm$core$Maybe$Just(currentRowId))),
					$mdgriffith$elm_ui$Element$Events$onMouseLeave(
					$author$project$Globaltypes$TableLineHighLighted($elm$core$Maybe$Nothing)),
					$mdgriffith$elm_ui$Element$Events$onClick(
					$author$project$Globaltypes$ShowHttpEvent(
						$elm$core$Maybe$Just(currentRowId))),
					A4($author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$dynamicTDBackground, currentRowId, maybeLastRenderedEventId, maybeHighlightRowId, currentRowPosition)
				]),
			A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$family(
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$Font$monospace])),
						$mdgriffith$elm_ui$Element$Font$size(12),
						$mdgriffith$elm_ui$Element$centerX,
						(!resStatusCode) ? $mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.aM) : $mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.ai)
					]),
				$mdgriffith$elm_ui$Element$text(
					function () {
						var _v0 = currentEvent.bZ;
						if (!_v0.$) {
							return 'X';
						} else {
							return '';
						}
					}())));
	});
var $mdgriffith$elm_ui$Internal$Model$Left = 0;
var $mdgriffith$elm_ui$Element$alignLeft = $mdgriffith$elm_ui$Internal$Model$AlignX(0);
var $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTDUrlLimitString = function (content) {
	return ($elm$core$String$length(content) > 51) ? $elm$core$String$concat(
		_List_fromArray(
			[
				A3($elm$core$String$slice, 0, 47, content),
				'...'
			])) : content;
};
var $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTDProtocol = F2(
	function (currentEvent, model) {
		var resStatusCode = function () {
			var _v1 = currentEvent.cq;
			if (!_v1.$) {
				var code = _v1.a;
				return code;
			} else {
				return 0;
			}
		}();
		var maybeLastRenderedEventId = model.g5;
		var maybeHighlightRowId = model.hk;
		var currentRowPosition = currentEvent.gR;
		var currentRowId = currentEvent.bM;
		var content = function () {
			var _v0 = currentEvent.cj;
			if (!_v0.$) {
				var httpVersion = _v0.a;
				return httpVersion;
			} else {
				return '';
			}
		}();
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Border$widthEach(
					{dy: 0, fI: 0, gP: 0, hZ: 0}),
					$mdgriffith$elm_ui$Element$height(
					$mdgriffith$elm_ui$Element$px(14)),
					$mdgriffith$elm_ui$Element$pointer,
					$mdgriffith$elm_ui$Element$Events$onMouseEnter(
					$author$project$Globaltypes$TableLineHighLighted(
						$elm$core$Maybe$Just(currentRowId))),
					$mdgriffith$elm_ui$Element$Events$onMouseLeave(
					$author$project$Globaltypes$TableLineHighLighted($elm$core$Maybe$Nothing)),
					$mdgriffith$elm_ui$Element$Events$onClick(
					$author$project$Globaltypes$ShowHttpEvent(
						$elm$core$Maybe$Just(currentRowId))),
					A4($author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$dynamicTDBackground, currentRowId, maybeLastRenderedEventId, maybeHighlightRowId, currentRowPosition)
				]),
			A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$alignLeft,
						$mdgriffith$elm_ui$Element$Font$family(
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$Font$monospace])),
						$mdgriffith$elm_ui$Element$Font$size(12),
						(!resStatusCode) ? $mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.aM) : $mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.ai)
					]),
				$mdgriffith$elm_ui$Element$text(
					$elm$core$String$concat(
						_List_fromArray(
							[
								' ',
								$author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTDUrlLimitString(content)
							])))));
	});
var $mdgriffith$elm_ui$Internal$Model$Right = 2;
var $mdgriffith$elm_ui$Element$alignRight = $mdgriffith$elm_ui$Internal$Model$AlignX(2);
var $basti1302$elm_human_readable_filesize$Filesize$Base2 = 1;
var $basti1302$elm_human_readable_filesize$Filesize$Base10 = 0;
var $basti1302$elm_human_readable_filesize$Filesize$defaultSettings = {aZ: 2, aN: '.', aD: 0};
var $basti1302$elm_human_readable_filesize$Filesize$base10UnitList = _List_fromArray(
	[
		{n: 'B', l: 1},
		{n: 'kB', l: 1000},
		{n: 'MB', l: 1000000},
		{n: 'GB', l: 1000000000},
		{n: 'TB', l: 1000000000000},
		{n: 'PB', l: 1000000000000000},
		{n: 'EB', l: 1000000000000000000}
	]);
var $basti1302$elm_human_readable_filesize$Filesize$base2UnitList = _List_fromArray(
	[
		{n: 'B', l: 1},
		{n: 'KiB', l: 1024},
		{n: 'MiB', l: 1048576},
		{n: 'GiB', l: 1073741824},
		{n: 'TiB', l: 1099511627776},
		{n: 'PiB', l: 1125899906842624}
	]);
var $basti1302$elm_human_readable_filesize$Filesize$getUnitDefinitionList = function (units) {
	if (!units) {
		return $basti1302$elm_human_readable_filesize$Filesize$base10UnitList;
	} else {
		return $basti1302$elm_human_readable_filesize$Filesize$base2UnitList;
	}
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {fw: index, fU: match, f9: number, hx: submatches};
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{dJ: false, f3: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $basti1302$elm_human_readable_filesize$Filesize$decimalSeparatorRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('\\.'));
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $elm$core$String$endsWith = _String_endsWith;
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $myrho$elm_round$Round$addSign = F2(
	function (signed, str) {
		var isNotZero = A2(
			$elm$core$List$any,
			function (c) {
				return (c !== '0') && (c !== '.');
			},
			$elm$core$String$toList(str));
		return _Utils_ap(
			(signed && isNotZero) ? '-' : '',
			str);
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$Char$fromCode = _Char_fromCode;
var $myrho$elm_round$Round$increaseNum = function (_v0) {
	var head = _v0.a;
	var tail = _v0.b;
	if (head === '9') {
		var _v1 = $elm$core$String$uncons(tail);
		if (_v1.$ === 1) {
			return '01';
		} else {
			var headtail = _v1.a;
			return A2(
				$elm$core$String$cons,
				'0',
				$myrho$elm_round$Round$increaseNum(headtail));
		}
	} else {
		var c = $elm$core$Char$toCode(head);
		return ((c >= 48) && (c < 57)) ? A2(
			$elm$core$String$cons,
			$elm$core$Char$fromCode(c + 1),
			tail) : '0';
	}
};
var $elm$core$Basics$isInfinite = _Basics_isInfinite;
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)));
	});
var $elm$core$String$reverse = _String_reverse;
var $myrho$elm_round$Round$splitComma = function (str) {
	var _v0 = A2($elm$core$String$split, '.', str);
	if (_v0.b) {
		if (_v0.b.b) {
			var before = _v0.a;
			var _v1 = _v0.b;
			var after = _v1.a;
			return _Utils_Tuple2(before, after);
		} else {
			var before = _v0.a;
			return _Utils_Tuple2(before, '0');
		}
	} else {
		return _Utils_Tuple2('0', '0');
	}
};
var $myrho$elm_round$Round$toDecimal = function (fl) {
	var _v0 = A2(
		$elm$core$String$split,
		'e',
		$elm$core$String$fromFloat(
			$elm$core$Basics$abs(fl)));
	if (_v0.b) {
		if (_v0.b.b) {
			var num = _v0.a;
			var _v1 = _v0.b;
			var exp = _v1.a;
			var e = A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(
					A2($elm$core$String$startsWith, '+', exp) ? A2($elm$core$String$dropLeft, 1, exp) : exp));
			var _v2 = $myrho$elm_round$Round$splitComma(num);
			var before = _v2.a;
			var after = _v2.b;
			var total = _Utils_ap(before, after);
			var zeroed = (e < 0) ? A2(
				$elm$core$Maybe$withDefault,
				'0',
				A2(
					$elm$core$Maybe$map,
					function (_v3) {
						var a = _v3.a;
						var b = _v3.b;
						return a + ('.' + b);
					},
					A2(
						$elm$core$Maybe$map,
						$elm$core$Tuple$mapFirst($elm$core$String$fromChar),
						$elm$core$String$uncons(
							_Utils_ap(
								A2(
									$elm$core$String$repeat,
									$elm$core$Basics$abs(e),
									'0'),
								total))))) : A3($elm$core$String$padRight, e + 1, '0', total);
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				zeroed);
		} else {
			var num = _v0.a;
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				num);
		}
	} else {
		return '';
	}
};
var $myrho$elm_round$Round$roundFun = F3(
	function (functor, s, fl) {
		if ($elm$core$Basics$isInfinite(fl) || $elm$core$Basics$isNaN(fl)) {
			return $elm$core$String$fromFloat(fl);
		} else {
			var signed = fl < 0;
			var _v0 = $myrho$elm_round$Round$splitComma(
				$myrho$elm_round$Round$toDecimal(
					$elm$core$Basics$abs(fl)));
			var before = _v0.a;
			var after = _v0.b;
			var r = $elm$core$String$length(before) + s;
			var normalized = _Utils_ap(
				A2($elm$core$String$repeat, (-r) + 1, '0'),
				A3(
					$elm$core$String$padRight,
					r,
					'0',
					_Utils_ap(before, after)));
			var totalLen = $elm$core$String$length(normalized);
			var roundDigitIndex = A2($elm$core$Basics$max, 1, r);
			var increase = A2(
				functor,
				signed,
				A3($elm$core$String$slice, roundDigitIndex, totalLen, normalized));
			var remains = A3($elm$core$String$slice, 0, roundDigitIndex, normalized);
			var num = increase ? $elm$core$String$reverse(
				A2(
					$elm$core$Maybe$withDefault,
					'1',
					A2(
						$elm$core$Maybe$map,
						$myrho$elm_round$Round$increaseNum,
						$elm$core$String$uncons(
							$elm$core$String$reverse(remains))))) : remains;
			var numLen = $elm$core$String$length(num);
			var numZeroed = (num === '0') ? num : ((s <= 0) ? _Utils_ap(
				num,
				A2(
					$elm$core$String$repeat,
					$elm$core$Basics$abs(s),
					'0')) : ((_Utils_cmp(
				s,
				$elm$core$String$length(after)) < 0) ? (A3($elm$core$String$slice, 0, numLen - s, num) + ('.' + A3($elm$core$String$slice, numLen - s, numLen, num))) : _Utils_ap(
				before + '.',
				A3($elm$core$String$padRight, s, '0', after))));
			return A2($myrho$elm_round$Round$addSign, signed, numZeroed);
		}
	});
var $myrho$elm_round$Round$floor = $myrho$elm_round$Round$roundFun(
	F2(
		function (signed, str) {
			var _v0 = $elm$core$String$uncons(str);
			if (_v0.$ === 1) {
				return false;
			} else {
				if ('0' === _v0.a.a) {
					var _v1 = _v0.a;
					var rest = _v1.b;
					return signed && A2(
						$elm$core$List$any,
						$elm$core$Basics$neq('0'),
						$elm$core$String$toList(rest));
				} else {
					return signed;
				}
			}
		}));
var $basti1302$elm_human_readable_filesize$Filesize$removeTrailingZeroesRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^(\\d+\\.[^0]*)(0+)$'));
var $elm$regex$Regex$replaceAtMost = _Regex_replaceAtMost;
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $basti1302$elm_human_readable_filesize$Filesize$roundToDecimalPlaces = F2(
	function (settings, num) {
		var rounded = A2($myrho$elm_round$Round$floor, settings.aZ, num);
		var withoutTrailingZeroes = A4(
			$elm$regex$Regex$replaceAtMost,
			1,
			$basti1302$elm_human_readable_filesize$Filesize$removeTrailingZeroesRegex,
			function (_v1) {
				var submatches = _v1.hx;
				return A2(
					$elm$core$String$join,
					'',
					A2(
						$elm$core$List$map,
						$elm$core$Maybe$withDefault(''),
						A2($elm$core$List$take, 1, submatches)));
			},
			rounded);
		var withoutTrailingDot = A2($elm$core$String$endsWith, '.', withoutTrailingZeroes) ? A2($elm$core$String$dropRight, 1, withoutTrailingZeroes) : withoutTrailingZeroes;
		return (settings.aN === '.') ? withoutTrailingDot : A4(
			$elm$regex$Regex$replaceAtMost,
			1,
			$basti1302$elm_human_readable_filesize$Filesize$decimalSeparatorRegex,
			function (_v0) {
				return settings.aN;
			},
			withoutTrailingDot);
	});
var $basti1302$elm_human_readable_filesize$Filesize$unknownUnit = {n: '?', l: 1};
var $basti1302$elm_human_readable_filesize$Filesize$formatWithSplit = F2(
	function (settings, num) {
		if (!num) {
			return _Utils_Tuple2('0', 'B');
		} else {
			var unitDefinitionList = $basti1302$elm_human_readable_filesize$Filesize$getUnitDefinitionList(settings.aD);
			var _v0 = (num < 0) ? _Utils_Tuple2(-num, '-') : _Utils_Tuple2(num, '');
			var num2 = _v0.a;
			var negativePrefix = _v0.b;
			var unitDefinition = A2(
				$elm$core$Maybe$withDefault,
				$basti1302$elm_human_readable_filesize$Filesize$unknownUnit,
				$elm$core$List$head(
					$elm$core$List$reverse(
						A2(
							$elm$core$List$filter,
							function (unitDef) {
								return _Utils_cmp(num2, unitDef.l) > -1;
							},
							unitDefinitionList))));
			var formattedNumber = A2($basti1302$elm_human_readable_filesize$Filesize$roundToDecimalPlaces, settings, num2 / unitDefinition.l);
			return _Utils_Tuple2(
				_Utils_ap(negativePrefix, formattedNumber),
				unitDefinition.n);
		}
	});
var $basti1302$elm_human_readable_filesize$Filesize$formatWith = F2(
	function (settings, num) {
		var _v0 = A2($basti1302$elm_human_readable_filesize$Filesize$formatWithSplit, settings, num);
		var size = _v0.a;
		var unit = _v0.b;
		return size + (' ' + unit);
	});
var $basti1302$elm_human_readable_filesize$Filesize$formatBase2 = $basti1302$elm_human_readable_filesize$Filesize$formatWith(
	_Utils_update(
		$basti1302$elm_human_readable_filesize$Filesize$defaultSettings,
		{aD: 1}));
var $author$project$Helpers$humanReadableBytes = function (maybeBytes) {
	if (!maybeBytes.$) {
		var bytes = maybeBytes.a;
		return $basti1302$elm_human_readable_filesize$Filesize$formatBase2(bytes);
	} else {
		return $basti1302$elm_human_readable_filesize$Filesize$formatBase2(0);
	}
};
var $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTDRespSizeBody = F2(
	function (currentEvent, model) {
		var resStatusCode = function () {
			var _v0 = currentEvent.cq;
			if (!_v0.$) {
				var code = _v0.a;
				return code;
			} else {
				return 0;
			}
		}();
		var maybeLastRenderedEventId = model.g5;
		var maybeHighlightRowId = model.hk;
		var currentRowPosition = currentEvent.gR;
		var currentRowId = currentEvent.bM;
		var content = currentEvent.cn;
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Border$widthEach(
					{dy: 0, fI: 0, gP: 0, hZ: 0}),
					$mdgriffith$elm_ui$Element$height(
					$mdgriffith$elm_ui$Element$px(14)),
					$mdgriffith$elm_ui$Element$pointer,
					$mdgriffith$elm_ui$Element$Events$onMouseEnter(
					$author$project$Globaltypes$TableLineHighLighted(
						$elm$core$Maybe$Just(currentRowId))),
					$mdgriffith$elm_ui$Element$Events$onMouseLeave(
					$author$project$Globaltypes$TableLineHighLighted($elm$core$Maybe$Nothing)),
					$mdgriffith$elm_ui$Element$Events$onClick(
					$author$project$Globaltypes$ShowHttpEvent(
						$elm$core$Maybe$Just(currentRowId))),
					A4($author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$dynamicTDBackground, currentRowId, maybeLastRenderedEventId, maybeHighlightRowId, currentRowPosition)
				]),
			A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$alignRight,
						$mdgriffith$elm_ui$Element$Font$family(
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$Font$monospace])),
						$mdgriffith$elm_ui$Element$Font$size(12),
						(!resStatusCode) ? $mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.aM) : $mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.ai)
					]),
				$mdgriffith$elm_ui$Element$text(
					$elm$core$String$concat(
						_List_fromArray(
							[
								$author$project$Helpers$humanReadableBytes(content),
								' '
							])))));
	});
var $ianmackenzie$elm_units$Duration$inSeconds = function (_v0) {
	var numSeconds = _v0;
	return numSeconds;
};
var $ianmackenzie$elm_units$Quantity$Quantity = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Duration$seconds = function (numSeconds) {
	return numSeconds;
};
var $ianmackenzie$elm_units$Duration$milliseconds = function (numMilliseconds) {
	return $ianmackenzie$elm_units$Duration$seconds(0.001 * numMilliseconds);
};
var $myrho$elm_round$Round$round = $myrho$elm_round$Round$roundFun(
	F2(
		function (signed, str) {
			var _v0 = $elm$core$String$uncons(str);
			if (_v0.$ === 1) {
				return false;
			} else {
				if ('5' === _v0.a.a) {
					if (_v0.a.b === '') {
						var _v1 = _v0.a;
						return !signed;
					} else {
						var _v2 = _v0.a;
						return true;
					}
				} else {
					var _v3 = _v0.a;
					var _int = _v3.a;
					return function (i) {
						return ((i > 53) && signed) || ((i >= 53) && (!signed));
					}(
						$elm$core$Char$toCode(_int));
				}
			}
		}));
var $author$project$Helpers$humanReadableMillis = function (maybeMillis) {
	if (!maybeMillis.$) {
		var millis = maybeMillis.a;
		return (millis > 1000) ? $elm$core$String$concat(
			_List_fromArray(
				[
					A2(
					$myrho$elm_round$Round$round,
					2,
					$ianmackenzie$elm_units$Duration$inSeconds(
						$ianmackenzie$elm_units$Duration$milliseconds(millis))),
					' s '
				])) : $elm$core$String$concat(
			_List_fromArray(
				[
					$elm$core$String$fromInt(millis),
					' ms '
				]));
	} else {
		return $elm$core$String$concat(
			_List_fromArray(
				[
					$elm$core$String$fromInt(0),
					' ms '
				]));
	}
};
var $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTDRtt = F2(
	function (currentEvent, model) {
		var resStatusCode = function () {
			var _v0 = currentEvent.cq;
			if (!_v0.$) {
				var code = _v0.a;
				return code;
			} else {
				return 0;
			}
		}();
		var maybeLastRenderedEventId = model.g5;
		var maybeHighlightRowId = model.hk;
		var currentRowPosition = currentEvent.gR;
		var currentRowId = currentEvent.bM;
		var content = currentEvent.cs;
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Border$widthEach(
					{dy: 0, fI: 0, gP: 0, hZ: 0}),
					$mdgriffith$elm_ui$Element$height(
					$mdgriffith$elm_ui$Element$px(14)),
					$mdgriffith$elm_ui$Element$pointer,
					$mdgriffith$elm_ui$Element$Events$onMouseEnter(
					$author$project$Globaltypes$TableLineHighLighted(
						$elm$core$Maybe$Just(currentRowId))),
					$mdgriffith$elm_ui$Element$Events$onMouseLeave(
					$author$project$Globaltypes$TableLineHighLighted($elm$core$Maybe$Nothing)),
					$mdgriffith$elm_ui$Element$Events$onClick(
					$author$project$Globaltypes$ShowHttpEvent(
						$elm$core$Maybe$Just(currentRowId))),
					A4($author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$dynamicTDBackground, currentRowId, maybeLastRenderedEventId, maybeHighlightRowId, currentRowPosition)
				]),
			A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$alignRight,
						$mdgriffith$elm_ui$Element$Font$family(
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$Font$monospace])),
						$mdgriffith$elm_ui$Element$Font$size(12),
						(!resStatusCode) ? $mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.aM) : $mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.ai)
					]),
				$mdgriffith$elm_ui$Element$text(
					$elm$core$String$concat(
						_List_fromArray(
							[
								$author$project$Helpers$humanReadableMillis(content)
							])))));
	});
var $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTDUrl = F2(
	function (currentEvent, model) {
		var resStatusCode = function () {
			var _v1 = currentEvent.cq;
			if (!_v1.$) {
				var code = _v1.a;
				return code;
			} else {
				return 0;
			}
		}();
		var maybeLastRenderedEventId = model.g5;
		var maybeHighlightRowId = model.hk;
		var currentRowPosition = currentEvent.gR;
		var currentRowId = currentEvent.bM;
		var content = function () {
			var _v0 = currentEvent.gG;
			if (!_v0.$) {
				var requestUrl = _v0.a;
				return requestUrl;
			} else {
				return '';
			}
		}();
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Border$widthEach(
					{dy: 0, fI: 0, gP: 0, hZ: 0}),
					$mdgriffith$elm_ui$Element$height(
					$mdgriffith$elm_ui$Element$px(14)),
					$mdgriffith$elm_ui$Element$pointer,
					$mdgriffith$elm_ui$Element$Events$onMouseEnter(
					$author$project$Globaltypes$TableLineHighLighted(
						$elm$core$Maybe$Just(currentRowId))),
					$mdgriffith$elm_ui$Element$Events$onMouseLeave(
					$author$project$Globaltypes$TableLineHighLighted($elm$core$Maybe$Nothing)),
					$mdgriffith$elm_ui$Element$Events$onClick(
					$author$project$Globaltypes$ShowHttpEvent(
						$elm$core$Maybe$Just(currentRowId))),
					A4($author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$dynamicTDBackground, currentRowId, maybeLastRenderedEventId, maybeHighlightRowId, currentRowPosition)
				]),
			A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$alignLeft,
						$mdgriffith$elm_ui$Element$Font$family(
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$Font$monospace])),
						$mdgriffith$elm_ui$Element$Font$size(12),
						(!resStatusCode) ? $mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.aM) : $mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.ai)
					]),
				$mdgriffith$elm_ui$Element$text(
					$elm$core$String$concat(
						_List_fromArray(
							[
								' ',
								$author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTDUrlLimitString(content)
							])))));
	});
var $mdgriffith$elm_ui$Internal$Flag$fontWeight = $mdgriffith$elm_ui$Internal$Flag$flag(13);
var $mdgriffith$elm_ui$Element$Font$regular = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$fontWeight, $mdgriffith$elm_ui$Internal$Style$classes.hQ);
var $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTH = function (labelText) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Border$widthEach(
				{dy: 1, fI: 1, gP: 1, hZ: 1}),
				$mdgriffith$elm_ui$Element$Border$rounded(1),
				$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM),
				$mdgriffith$elm_ui$Element$mouseOver(
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.dp)
					])),
				$mdgriffith$elm_ui$Element$pointer,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height(
				$mdgriffith$elm_ui$Element$px(20)),
				$mdgriffith$elm_ui$Element$Font$size(14)
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$row,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$centerX,
						$mdgriffith$elm_ui$Element$height(
						$mdgriffith$elm_ui$Element$px(20)),
						function () {
						if (labelText === 'Notes') {
							return $mdgriffith$elm_ui$Element$Font$size(12);
						} else {
							return $mdgriffith$elm_ui$Element$Font$regular;
						}
					}()
					]),
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text(labelText),
						function () {
						if (labelText === 'id') {
							return A2(
								$mdgriffith$elm_ui$Element$el,
								_List_Nil,
								A2(
									$mdgriffith$elm_ui$Element$image,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$width(
											$mdgriffith$elm_ui$Element$px(20)),
											$mdgriffith$elm_ui$Element$height(
											$mdgriffith$elm_ui$Element$px(20))
										]),
									{eF: 'caret up', hj: $author$project$Monoicons$Png$monoIcons.dI}));
						} else {
							return $mdgriffith$elm_ui$Element$none;
						}
					}()
					]))
			]));
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$contentFormatLimitString = function (content) {
	var maxLength = 10;
	return (_Utils_cmp(
		$elm$core$String$length(content),
		maxLength) > 0) ? A3($elm$core$String$slice, 0, maxLength, content) : content;
};
var $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$getContentType = function (maybeRespContMime) {
	return A2(
		$elm$core$Maybe$andThen,
		function (mimeType) {
			return function (maybeMimeFormat) {
				return A2(
					$elm$core$Maybe$andThen,
					function (mimeFormat) {
						return A2(
							$elm$core$Maybe$map,
							function (content) {
								return $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$contentFormatLimitString(content);
							},
							$elm$core$List$head(
								$elm$core$List$reverse(
									A2($elm$core$String$split, '/', mimeFormat))));
					},
					maybeMimeFormat);
			}(
				$elm$core$List$head(
					A2($elm$core$String$split, ';', mimeType)));
		},
		maybeRespContMime);
};
var $mdgriffith$elm_ui$Element$scrollbars = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.gT);
var $mdgriffith$elm_ui$Element$spacing = function (x) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$spacing,
		A3(
			$mdgriffith$elm_ui$Internal$Model$SpacingStyle,
			A2($mdgriffith$elm_ui$Internal$Model$spacingName, x, x),
			x,
			x));
};
var $mdgriffith$elm_ui$Element$InternalColumn = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$GridPosition = function (a) {
	return {$: 9, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$GridTemplateStyle = function (a) {
	return {$: 8, a: a};
};
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $mdgriffith$elm_ui$Internal$Model$AsGrid = 3;
var $mdgriffith$elm_ui$Internal$Model$asGrid = 3;
var $mdgriffith$elm_ui$Internal$Model$getSpacing = F2(
	function (attrs, _default) {
		return A2(
			$elm$core$Maybe$withDefault,
			_default,
			A3(
				$elm$core$List$foldr,
				F2(
					function (attr, acc) {
						if (!acc.$) {
							var x = acc.a;
							return $elm$core$Maybe$Just(x);
						} else {
							if ((attr.$ === 4) && (attr.b.$ === 5)) {
								var _v2 = attr.b;
								var x = _v2.b;
								var y = _v2.c;
								return $elm$core$Maybe$Just(
									_Utils_Tuple2(x, y));
							} else {
								return $elm$core$Maybe$Nothing;
							}
						}
					}),
				$elm$core$Maybe$Nothing,
				attrs));
	});
var $mdgriffith$elm_ui$Internal$Flag$gridPosition = $mdgriffith$elm_ui$Internal$Flag$flag(35);
var $mdgriffith$elm_ui$Internal$Flag$gridTemplate = $mdgriffith$elm_ui$Internal$Flag$flag(34);
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $mdgriffith$elm_ui$Element$tableHelper = F2(
	function (attrs, config) {
		var onGrid = F3(
			function (rowLevel, columnLevel, elem) {
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$StyleClass,
							$mdgriffith$elm_ui$Internal$Flag$gridPosition,
							$mdgriffith$elm_ui$Internal$Model$GridPosition(
								{bu: columnLevel, bG: 1, cr: rowLevel, L: 1}))
						]),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[elem])));
			});
		var columnWidth = function (col) {
			if (!col.$) {
				var colConfig = col.a;
				return colConfig.L;
			} else {
				var colConfig = col.a;
				return colConfig.L;
			}
		};
		var columnHeader = function (col) {
			if (!col.$) {
				var colConfig = col.a;
				return colConfig.E;
			} else {
				var colConfig = col.a;
				return colConfig.E;
			}
		};
		var maybeHeaders = function (headers) {
			return A2(
				$elm$core$List$all,
				$elm$core$Basics$eq($mdgriffith$elm_ui$Internal$Model$Empty),
				headers) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
				A2(
					$elm$core$List$indexedMap,
					F2(
						function (col, header) {
							return A3(onGrid, 1, col + 1, header);
						}),
					headers));
		}(
			A2($elm$core$List$map, columnHeader, config.eg));
		var add = F3(
			function (cell, columnConfig, cursor) {
				if (!columnConfig.$) {
					var col = columnConfig.a;
					return _Utils_update(
						cursor,
						{
							Q: cursor.Q + 1,
							M: A2(
								$elm$core$List$cons,
								A3(
									onGrid,
									cursor.cr,
									cursor.Q,
									A2(
										col.K,
										_Utils_eq(maybeHeaders, $elm$core$Maybe$Nothing) ? (cursor.cr - 1) : (cursor.cr - 2),
										cell)),
								cursor.M)
						});
				} else {
					var col = columnConfig.a;
					return {
						Q: cursor.Q + 1,
						M: A2(
							$elm$core$List$cons,
							A3(
								onGrid,
								cursor.cr,
								cursor.Q,
								col.K(cell)),
							cursor.M),
						cr: cursor.cr
					};
				}
			});
		var build = F3(
			function (columns, rowData, cursor) {
				var newCursor = A3(
					$elm$core$List$foldl,
					add(rowData),
					cursor,
					columns);
				return {Q: 1, M: newCursor.M, cr: cursor.cr + 1};
			});
		var children = A3(
			$elm$core$List$foldl,
			build(config.eg),
			{
				Q: 1,
				M: _List_Nil,
				cr: _Utils_eq(maybeHeaders, $elm$core$Maybe$Nothing) ? 1 : 2
			},
			config.et);
		var _v0 = A2(
			$mdgriffith$elm_ui$Internal$Model$getSpacing,
			attrs,
			_Utils_Tuple2(0, 0));
		var sX = _v0.a;
		var sY = _v0.b;
		var template = A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$gridTemplate,
			$mdgriffith$elm_ui$Internal$Model$GridTemplateStyle(
				{
					eg: A2($elm$core$List$map, columnWidth, config.eg),
					gS: A2(
						$elm$core$List$repeat,
						$elm$core$List$length(config.et),
						$mdgriffith$elm_ui$Internal$Model$Content),
					hh: _Utils_Tuple2(
						$mdgriffith$elm_ui$Element$px(sX),
						$mdgriffith$elm_ui$Element$px(sY))
				}));
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asGrid,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				A2($elm$core$List$cons, template, attrs)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				function () {
					if (maybeHeaders.$ === 1) {
						return children.M;
					} else {
						var renderedHeaders = maybeHeaders.a;
						return _Utils_ap(
							renderedHeaders,
							$elm$core$List$reverse(children.M));
					}
				}()));
	});
var $mdgriffith$elm_ui$Element$table = F2(
	function (attrs, config) {
		return A2(
			$mdgriffith$elm_ui$Element$tableHelper,
			attrs,
			{
				eg: A2($elm$core$List$map, $mdgriffith$elm_ui$Element$InternalColumn, config.eg),
				et: config.et
			});
	});
var $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$historyTable = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$scrollbars
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$table,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$scrollbars,
						$mdgriffith$elm_ui$Element$padding(10),
						$mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.ij),
						$mdgriffith$elm_ui$Element$spacing(1),
						$mdgriffith$elm_ui$Element$Font$size(12)
					]),
				{
					eg: _List_fromArray(
						[
							{
							E: $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTH('id'),
							K: function (httpEvent) {
								return A3(
									$author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTD,
									httpEvent,
									model,
									A2(
										$elm$core$Maybe$map,
										function (id) {
											return $elm$core$String$fromInt(id);
										},
										$elm$core$Maybe$Just(httpEvent.bM)));
							},
							L: $mdgriffith$elm_ui$Element$px(40)
						},
							{
							E: $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTH('Protocol'),
							K: function (httpEvent) {
								return A2($author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTDProtocol, httpEvent, model);
							},
							L: $mdgriffith$elm_ui$Element$px(80)
						},
							{
							E: $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTH('Req. Timestamp'),
							K: function (httpEvent) {
								return A3($author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTD, httpEvent, model, httpEvent.cE);
							},
							L: $mdgriffith$elm_ui$Element$px(230)
						},
							{
							E: $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTH('Method'),
							K: function (httpEvent) {
								return A3($author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTD, httpEvent, model, httpEvent.ck);
							},
							L: $mdgriffith$elm_ui$Element$px(70)
						},
							{
							E: $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTH('URL'),
							K: function (httpEvent) {
								return A2($author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTDUrl, httpEvent, model);
							},
							L: $mdgriffith$elm_ui$Element$px(370)
						},
							{
							E: $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTH('Status'),
							K: function (httpEvent) {
								return A3(
									$author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTD,
									httpEvent,
									model,
									A2(
										$elm$core$Maybe$map,
										function (statusCode) {
											return $elm$core$String$fromInt(statusCode);
										},
										httpEvent.cq));
							},
							L: $mdgriffith$elm_ui$Element$px(55)
						},
							{
							E: $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTH('Format'),
							K: function (httpEvent) {
								return A3(
									$author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTD,
									httpEvent,
									model,
									$author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$getContentType(httpEvent.co));
							},
							L: $mdgriffith$elm_ui$Element$px(75)
						},
							{
							E: $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTH('RTT'),
							K: function (httpEvent) {
								return A2($author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTDRtt, httpEvent, model);
							},
							L: $mdgriffith$elm_ui$Element$px(60)
						},
							{
							E: $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTH('Resp. Body'),
							K: function (httpEvent) {
								return A2($author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTDRespSizeBody, httpEvent, model);
							},
							L: $mdgriffith$elm_ui$Element$px(90)
						},
							{
							E: $author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTH('Notes'),
							K: function (httpEvent) {
								return A2($author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$cellTDNotes, httpEvent, model);
							},
							L: $mdgriffith$elm_ui$Element$fill
						}
						]),
					et: function () {
						var _v0 = model.ex;
						if (_v0.$ === 3) {
							var maybeEventResponse = _v0.a;
							if (!maybeEventResponse.$) {
								var eventResponse = maybeEventResponse.a;
								return eventResponse.eY;
							} else {
								return _List_Nil;
							}
						} else {
							return _List_Nil;
						}
					}()
				})
			]));
};
var $author$project$Layout$Maincontent$Bottompanel$Tab$History$Base$historyTab = function (model) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Element$row,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
				]),
			_List_fromArray(
				[
					$author$project$Layout$Maincontent$Bottompanel$Tab$History$Base$historyPaginator(model),
					$author$project$Layout$Maincontent$Bottompanel$Tab$History$Table$historyTable(model)
				]))
		]);
};
var $author$project$Layout$Maincontent$Bottompanel$Tab$Logbook$Base$logbookTab = function (model) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Element$el,
			_List_Nil,
			$mdgriffith$elm_ui$Element$text(
				'' + ($author$project$Globaltypes$tabtypeToString(model.hn) + 'Tab')))
		]);
};
var $author$project$Layout$Maincontent$Bottompanel$Tab$Notes$Base$notesTab = function (model) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Element$el,
			_List_Nil,
			$mdgriffith$elm_ui$Element$text(
				'' + ($author$project$Globaltypes$tabtypeToString(model.hn) + 'Tab')))
		]);
};
var $author$project$Layout$Maincontent$Bottompanel$Base$showTabContent = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.ij),
				$mdgriffith$elm_ui$Element$Border$widthEach(
				{dy: 0, fI: 0, gP: 1, hZ: 1}),
				$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM)
			]),
		function () {
			var _v0 = model.hn;
			switch (_v0) {
				case 0:
					return $author$project$Layout$Maincontent$Bottompanel$Tab$History$Base$historyTab(model);
				case 1:
					return $author$project$Layout$Maincontent$Bottompanel$Tab$Notes$Base$notesTab(model);
				case 3:
					return $author$project$Layout$Maincontent$Bottompanel$Tab$Logbook$Base$logbookTab(model);
				default:
					return $author$project$Layout$Maincontent$Bottompanel$Tab$Alerts$Base$alertsTab(model);
			}
		}());
};
var $author$project$Globaltypes$Alerts = 2;
var $author$project$Globaltypes$Logbook = 3;
var $author$project$Globaltypes$Notes = 1;
var $author$project$Globaltypes$ShowTab = function (a) {
	return {$: 9, a: a};
};
var $author$project$Globaltypes$tabtypeGet2ndLine = function (tabType) {
	switch (tabType) {
		case 0:
			return '(Browser)';
		case 1:
			return '(Events)';
		case 3:
			return '(Analysis)';
		default:
			return '(Risks)';
	}
};
var $author$project$Layout$Maincontent$Bottompanel$Base$tabItem = F2(
	function (tabType, model) {
		var renderedTabName2ndLine = $author$project$Globaltypes$tabtypeGet2ndLine(tabType);
		var renderedTabName = $author$project$Globaltypes$tabtypeToString(tabType);
		var dynamicRightBorder = _Utils_eq(tabType, model.hn) ? $mdgriffith$elm_ui$Element$Border$widthEach(
			{dy: 1, fI: 0, gP: 0, hZ: 1}) : $mdgriffith$elm_ui$Element$Border$widthEach(
			{dy: 1, fI: 0, gP: 1, hZ: 1});
		var dynamicPointer = _Utils_eq(tabType, model.hn) ? $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.ij) : $mdgriffith$elm_ui$Element$pointer;
		var dynamicBackground = _Utils_eq(tabType, model.hn) ? $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.ij) : $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fk);
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width(
					$mdgriffith$elm_ui$Element$px(80)),
					$mdgriffith$elm_ui$Element$height(
					$mdgriffith$elm_ui$Element$px(30)),
					$mdgriffith$elm_ui$Element$Font$size(12),
					$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM),
					$mdgriffith$elm_ui$Element$mouseOver(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.ij)
						])),
					$mdgriffith$elm_ui$Element$Events$onClick(
					$author$project$Globaltypes$ShowTab(tabType)),
					dynamicBackground,
					dynamicPointer,
					dynamicRightBorder
				]),
			A2(
				$mdgriffith$elm_ui$Element$column,
				_List_fromArray(
					[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY, $mdgriffith$elm_ui$Element$Font$center]),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$centerX]),
						$mdgriffith$elm_ui$Element$text(renderedTabName)),
						A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$centerX]),
						$mdgriffith$elm_ui$Element$text(renderedTabName2ndLine))
					])));
	});
var $author$project$Layout$Maincontent$Bottompanel$Base$tabsBar = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$width(
				$mdgriffith$elm_ui$Element$px(80)),
				$mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fk),
				$mdgriffith$elm_ui$Element$Border$widthEach(
				{dy: 0, fI: 0, gP: 1, hZ: 1}),
				$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM)
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$column,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$centerY,
						A2($mdgriffith$elm_ui$Element$spacingXY, 0, 10)
					]),
				_List_fromArray(
					[
						A2($author$project$Layout$Maincontent$Bottompanel$Base$tabItem, 0, model),
						A2($author$project$Layout$Maincontent$Bottompanel$Base$tabItem, 1, model),
						A2($author$project$Layout$Maincontent$Bottompanel$Base$tabItem, 2, model),
						A2($author$project$Layout$Maincontent$Bottompanel$Base$tabItem, 3, model)
					]))
			]));
};
var $author$project$Layout$Maincontent$Bottompanel$Base$bottomPanel = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$height(
				$mdgriffith$elm_ui$Element$px(200)),
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$Border$widthEach(
				{dy: 1, fI: 0, gP: 0, hZ: 0}),
				$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM)
			]),
		_List_fromArray(
			[
				$author$project$Layout$Maincontent$Bottompanel$Base$tabsBar(model),
				$author$project$Layout$Maincontent$Bottompanel$Base$showTabContent(model)
			]));
};
var $author$project$Ui$Cursor$RowResize = 26;
var $author$project$Ui$Cursor$cursorName = function (cursor_) {
	switch (cursor_) {
		case 0:
			return 'alias';
		case 1:
			return 'all-scroll';
		case 2:
			return 'auto';
		case 3:
			return 'cell';
		case 4:
			return 'context-menu';
		case 5:
			return 'col-resize';
		case 6:
			return 'copy';
		case 7:
			return 'crosshair';
		case 8:
			return 'default';
		case 9:
			return 'e-resize';
		case 10:
			return 'ew-resize';
		case 11:
			return 'grab';
		case 12:
			return 'grabbing';
		case 13:
			return 'help';
		case 14:
			return 'move';
		case 15:
			return 'n-resize';
		case 16:
			return 'ne-resize';
		case 17:
			return 'nesw-resize';
		case 18:
			return 'ns-resize';
		case 19:
			return 'nw-resize';
		case 20:
			return 'nwse-resize';
		case 21:
			return 'no-drop';
		case 22:
			return 'none';
		case 23:
			return 'not-allowed';
		case 24:
			return 'pointer';
		case 25:
			return 'progress';
		case 26:
			return 'row-resize';
		case 27:
			return 's-resize';
		case 28:
			return 'se-resize';
		case 29:
			return 'sw-resize';
		case 30:
			return 'text';
		case 31:
			return 'url';
		case 32:
			return 'w-resize';
		case 33:
			return 'wait';
		case 34:
			return 'zoom-in';
		default:
			return 'zoom-out';
	}
};
var $mdgriffith$elm_ui$Element$htmlAttribute = $mdgriffith$elm_ui$Internal$Model$Attr;
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$Ui$Cursor$cursor = function (cursor_) {
	return $mdgriffith$elm_ui$Element$htmlAttribute(
		A2(
			$elm$html$Html$Attributes$style,
			'cursor',
			$author$project$Ui$Cursor$cursorName(cursor_)));
};
var $mdgriffith$elm_ui$Element$Background$image = function (src) {
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		A2($elm$virtual_dom$VirtualDom$style, 'background', 'url(\"' + (src + '\") center / cover no-repeat')));
};
var $author$project$Ui$Widgets$horizontalSplitter = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$height(
			$mdgriffith$elm_ui$Element$px(6))
		]),
	A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$height(
				$mdgriffith$elm_ui$Element$px(6)),
				$mdgriffith$elm_ui$Element$centerX,
				$author$project$Ui$Cursor$cursor(26),
				$mdgriffith$elm_ui$Element$Background$image($author$project$Monoicons$Png$monoIcons.gg)
			]),
		A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Element$paddingXY, 10, 6)
				]),
			$mdgriffith$elm_ui$Element$none)));
var $author$project$Globaltypes$NoteEditorUserTypedContent = function (a) {
	return {$: 2, a: a};
};
var $elm$html$Html$Attributes$autofocus = $elm$html$Html$Attributes$boolProperty('autofocus');
var $mdgriffith$elm_ui$Element$Input$focusedOnLoad = $mdgriffith$elm_ui$Internal$Model$Attr(
	$elm$html$Html$Attributes$autofocus(true));
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $mdgriffith$elm_ui$Internal$Model$unstyled = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Unstyled, $elm$core$Basics$always);
var $mdgriffith$elm_ui$Element$html = $mdgriffith$elm_ui$Internal$Model$unstyled;
var $mdgriffith$elm_ui$Element$Input$HiddenLabel = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Element$Input$labelHidden = $mdgriffith$elm_ui$Element$Input$HiddenLabel;
var $mdgriffith$elm_ui$Element$Input$TextArea = {$: 1};
var $mdgriffith$elm_ui$Internal$Model$LivePolite = {$: 6};
var $mdgriffith$elm_ui$Element$Region$announce = $mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$LivePolite);
var $mdgriffith$elm_ui$Element$Input$applyLabel = F3(
	function (attrs, label, input) {
		if (label.$ === 1) {
			var labelText = label.a;
			return A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asColumn,
				$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
				attrs,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[input])));
		} else {
			var position = label.a;
			var labelAttrs = label.b;
			var labelChild = label.c;
			var labelElement = A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				labelAttrs,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[labelChild])));
			switch (position) {
				case 2:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asColumn,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aO),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[labelElement, input])));
				case 3:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asColumn,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aO),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[input, labelElement])));
				case 0:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asRow,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aO),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[input, labelElement])));
				default:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asRow,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aO),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[labelElement, input])));
			}
		}
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $mdgriffith$elm_ui$Element$Input$autofill = A2(
	$elm$core$Basics$composeL,
	$mdgriffith$elm_ui$Internal$Model$Attr,
	$elm$html$Html$Attributes$attribute('autocomplete'));
var $mdgriffith$elm_ui$Internal$Model$Behind = 5;
var $mdgriffith$elm_ui$Element$createNearby = F2(
	function (loc, element) {
		if (element.$ === 3) {
			return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
		} else {
			return A2($mdgriffith$elm_ui$Internal$Model$Nearby, loc, element);
		}
	});
var $mdgriffith$elm_ui$Element$behindContent = function (element) {
	return A2($mdgriffith$elm_ui$Element$createNearby, 5, element);
};
var $mdgriffith$elm_ui$Internal$Model$MoveY = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$moveY = $mdgriffith$elm_ui$Internal$Flag$flag(26);
var $mdgriffith$elm_ui$Element$moveUp = function (y) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$TransformComponent,
		$mdgriffith$elm_ui$Internal$Flag$moveY,
		$mdgriffith$elm_ui$Internal$Model$MoveY(-y));
};
var $mdgriffith$elm_ui$Element$Input$calcMoveToCompensateForPadding = function (attrs) {
	var gatherSpacing = F2(
		function (attr, found) {
			if ((attr.$ === 4) && (attr.b.$ === 5)) {
				var _v2 = attr.b;
				var x = _v2.b;
				var y = _v2.c;
				if (found.$ === 1) {
					return $elm$core$Maybe$Just(y);
				} else {
					return found;
				}
			} else {
				return found;
			}
		});
	var _v0 = A3($elm$core$List$foldr, gatherSpacing, $elm$core$Maybe$Nothing, attrs);
	if (_v0.$ === 1) {
		return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
	} else {
		var vSpace = _v0.a;
		return $mdgriffith$elm_ui$Element$moveUp(
			$elm$core$Basics$floor(vSpace / 2));
	}
};
var $mdgriffith$elm_ui$Element$rgb = F3(
	function (r, g, b) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, r, g, b, 1);
	});
var $mdgriffith$elm_ui$Element$Input$darkGrey = A3($mdgriffith$elm_ui$Element$rgb, 186 / 255, 189 / 255, 182 / 255);
var $mdgriffith$elm_ui$Element$Input$defaultTextPadding = A2($mdgriffith$elm_ui$Element$paddingXY, 12, 12);
var $mdgriffith$elm_ui$Element$Input$white = A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1);
var $mdgriffith$elm_ui$Element$Input$defaultTextBoxStyle = _List_fromArray(
	[
		$mdgriffith$elm_ui$Element$Input$defaultTextPadding,
		$mdgriffith$elm_ui$Element$Border$rounded(3),
		$mdgriffith$elm_ui$Element$Border$color($mdgriffith$elm_ui$Element$Input$darkGrey),
		$mdgriffith$elm_ui$Element$Background$color($mdgriffith$elm_ui$Element$Input$white),
		$mdgriffith$elm_ui$Element$Border$width(1),
		$mdgriffith$elm_ui$Element$spacing(5),
		$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
		$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink)
	]);
var $mdgriffith$elm_ui$Element$Input$getHeight = function (attr) {
	if (attr.$ === 8) {
		var h = attr.a;
		return $elm$core$Maybe$Just(h);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$Label = function (a) {
	return {$: 5, a: a};
};
var $mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute = function (label) {
	if (label.$ === 1) {
		var textLabel = label.a;
		return $mdgriffith$elm_ui$Internal$Model$Describe(
			$mdgriffith$elm_ui$Internal$Model$Label(textLabel));
	} else {
		return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
	}
};
var $mdgriffith$elm_ui$Internal$Model$InFront = 4;
var $mdgriffith$elm_ui$Element$inFront = function (element) {
	return A2($mdgriffith$elm_ui$Element$createNearby, 4, element);
};
var $mdgriffith$elm_ui$Element$Input$isConstrained = function (len) {
	isConstrained:
	while (true) {
		switch (len.$) {
			case 1:
				return false;
			case 0:
				return true;
			case 2:
				return true;
			case 3:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isConstrained;
			default:
				var l = len.b;
				return true;
		}
	}
};
var $mdgriffith$elm_ui$Element$Input$isHiddenLabel = function (label) {
	if (label.$ === 1) {
		return true;
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Element$Input$isStacked = function (label) {
	if (!label.$) {
		var loc = label.a;
		switch (loc) {
			case 0:
				return false;
			case 1:
				return false;
			case 2:
				return true;
			default:
				return true;
		}
	} else {
		return true;
	}
};
var $mdgriffith$elm_ui$Element$Input$negateBox = function (box) {
	return {dy: -box.dy, fI: -box.fI, gP: -box.gP, hZ: -box.hZ};
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $mdgriffith$elm_ui$Element$Input$isFill = function (len) {
	isFill:
	while (true) {
		switch (len.$) {
			case 2:
				return true;
			case 1:
				return false;
			case 0:
				return false;
			case 3:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isFill;
			default:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isFill;
		}
	}
};
var $mdgriffith$elm_ui$Element$Input$isPixel = function (len) {
	isPixel:
	while (true) {
		switch (len.$) {
			case 1:
				return false;
			case 0:
				return true;
			case 2:
				return false;
			case 3:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isPixel;
			default:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isPixel;
		}
	}
};
var $mdgriffith$elm_ui$Internal$Model$paddingNameFloat = F4(
	function (top, right, bottom, left) {
		return 'pad-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(top) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(right) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(bottom) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(left)))))));
	});
var $mdgriffith$elm_ui$Element$Input$redistributeOver = F4(
	function (isMultiline, stacked, attr, els) {
		switch (attr.$) {
			case 9:
				return _Utils_update(
					els,
					{
						c: A2($elm$core$List$cons, attr, els.c)
					});
			case 7:
				var width = attr.a;
				return $mdgriffith$elm_ui$Element$Input$isFill(width) ? _Utils_update(
					els,
					{
						h: A2($elm$core$List$cons, attr, els.h),
						p: A2($elm$core$List$cons, attr, els.p),
						c: A2($elm$core$List$cons, attr, els.c)
					}) : (stacked ? _Utils_update(
					els,
					{
						h: A2($elm$core$List$cons, attr, els.h)
					}) : _Utils_update(
					els,
					{
						c: A2($elm$core$List$cons, attr, els.c)
					}));
			case 8:
				var height = attr.a;
				return (!stacked) ? _Utils_update(
					els,
					{
						h: A2($elm$core$List$cons, attr, els.h),
						c: A2($elm$core$List$cons, attr, els.c)
					}) : ($mdgriffith$elm_ui$Element$Input$isFill(height) ? _Utils_update(
					els,
					{
						h: A2($elm$core$List$cons, attr, els.h),
						c: A2($elm$core$List$cons, attr, els.c)
					}) : ($mdgriffith$elm_ui$Element$Input$isPixel(height) ? _Utils_update(
					els,
					{
						c: A2($elm$core$List$cons, attr, els.c)
					}) : _Utils_update(
					els,
					{
						c: A2($elm$core$List$cons, attr, els.c)
					})));
			case 6:
				return _Utils_update(
					els,
					{
						h: A2($elm$core$List$cons, attr, els.h)
					});
			case 5:
				return _Utils_update(
					els,
					{
						h: A2($elm$core$List$cons, attr, els.h)
					});
			case 4:
				switch (attr.b.$) {
					case 5:
						var _v1 = attr.b;
						return _Utils_update(
							els,
							{
								h: A2($elm$core$List$cons, attr, els.h),
								p: A2($elm$core$List$cons, attr, els.p),
								c: A2($elm$core$List$cons, attr, els.c),
								aq: A2($elm$core$List$cons, attr, els.aq)
							});
					case 7:
						var cls = attr.a;
						var _v2 = attr.b;
						var pad = _v2.a;
						var t = _v2.b;
						var r = _v2.c;
						var b = _v2.d;
						var l = _v2.e;
						if (isMultiline) {
							return _Utils_update(
								els,
								{
									x: A2($elm$core$List$cons, attr, els.x),
									c: A2($elm$core$List$cons, attr, els.c)
								});
						} else {
							var newTop = t - A2($elm$core$Basics$min, t, b);
							var newLineHeight = $mdgriffith$elm_ui$Element$htmlAttribute(
								A2(
									$elm$html$Html$Attributes$style,
									'line-height',
									'calc(1.0em + ' + ($elm$core$String$fromFloat(
										2 * A2($elm$core$Basics$min, t, b)) + 'px)')));
							var newHeight = $mdgriffith$elm_ui$Element$htmlAttribute(
								A2(
									$elm$html$Html$Attributes$style,
									'height',
									'calc(1.0em + ' + ($elm$core$String$fromFloat(
										2 * A2($elm$core$Basics$min, t, b)) + 'px)')));
							var newBottom = b - A2($elm$core$Basics$min, t, b);
							var reducedVerticalPadding = A2(
								$mdgriffith$elm_ui$Internal$Model$StyleClass,
								$mdgriffith$elm_ui$Internal$Flag$padding,
								A5(
									$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
									A4($mdgriffith$elm_ui$Internal$Model$paddingNameFloat, newTop, r, newBottom, l),
									newTop,
									r,
									newBottom,
									l));
							return _Utils_update(
								els,
								{
									x: A2($elm$core$List$cons, attr, els.x),
									p: A2(
										$elm$core$List$cons,
										newHeight,
										A2($elm$core$List$cons, newLineHeight, els.p)),
									c: A2($elm$core$List$cons, reducedVerticalPadding, els.c)
								});
						}
					case 6:
						var _v3 = attr.b;
						return _Utils_update(
							els,
							{
								x: A2($elm$core$List$cons, attr, els.x),
								c: A2($elm$core$List$cons, attr, els.c)
							});
					case 10:
						return _Utils_update(
							els,
							{
								x: A2($elm$core$List$cons, attr, els.x),
								c: A2($elm$core$List$cons, attr, els.c)
							});
					case 2:
						return _Utils_update(
							els,
							{
								h: A2($elm$core$List$cons, attr, els.h)
							});
					case 1:
						var _v4 = attr.b;
						return _Utils_update(
							els,
							{
								h: A2($elm$core$List$cons, attr, els.h)
							});
					default:
						var flag = attr.a;
						var cls = attr.b;
						return _Utils_update(
							els,
							{
								c: A2($elm$core$List$cons, attr, els.c)
							});
				}
			case 0:
				return els;
			case 1:
				var a = attr.a;
				return _Utils_update(
					els,
					{
						p: A2($elm$core$List$cons, attr, els.p)
					});
			case 2:
				return _Utils_update(
					els,
					{
						p: A2($elm$core$List$cons, attr, els.p)
					});
			case 3:
				return _Utils_update(
					els,
					{
						c: A2($elm$core$List$cons, attr, els.c)
					});
			default:
				return _Utils_update(
					els,
					{
						p: A2($elm$core$List$cons, attr, els.p)
					});
		}
	});
var $mdgriffith$elm_ui$Element$Input$redistribute = F3(
	function (isMultiline, stacked, attrs) {
		return function (redist) {
			return {
				x: $elm$core$List$reverse(redist.x),
				h: $elm$core$List$reverse(redist.h),
				p: $elm$core$List$reverse(redist.p),
				c: $elm$core$List$reverse(redist.c),
				aq: $elm$core$List$reverse(redist.aq)
			};
		}(
			A3(
				$elm$core$List$foldl,
				A2($mdgriffith$elm_ui$Element$Input$redistributeOver, isMultiline, stacked),
				{x: _List_Nil, h: _List_Nil, p: _List_Nil, c: _List_Nil, aq: _List_Nil},
				attrs));
	});
var $mdgriffith$elm_ui$Element$Input$renderBox = function (_v0) {
	var top = _v0.hZ;
	var right = _v0.gP;
	var bottom = _v0.dy;
	var left = _v0.fI;
	return $elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px'))))));
};
var $mdgriffith$elm_ui$Element$Input$charcoal = A3($mdgriffith$elm_ui$Element$rgb, 136 / 255, 138 / 255, 133 / 255);
var $mdgriffith$elm_ui$Element$rgba = $mdgriffith$elm_ui$Internal$Model$Rgba;
var $mdgriffith$elm_ui$Element$Input$renderPlaceholder = F3(
	function (_v0, forPlaceholder, on) {
		var placeholderAttrs = _v0.a;
		var placeholderEl = _v0.b;
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_Utils_ap(
				forPlaceholder,
				_Utils_ap(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Font$color($mdgriffith$elm_ui$Element$Input$charcoal),
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.bY + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.gj)),
							$mdgriffith$elm_ui$Element$clip,
							$mdgriffith$elm_ui$Element$Border$color(
							A4($mdgriffith$elm_ui$Element$rgba, 0, 0, 0, 0)),
							$mdgriffith$elm_ui$Element$Background$color(
							A4($mdgriffith$elm_ui$Element$rgba, 0, 0, 0, 0)),
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$alpha(
							on ? 1 : 0)
						]),
					placeholderAttrs)),
			placeholderEl);
	});
var $mdgriffith$elm_ui$Element$scrollbarY = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.gV);
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$html$Html$Attributes$spellcheck = $elm$html$Html$Attributes$boolProperty('spellcheck');
var $mdgriffith$elm_ui$Element$Input$spellcheck = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Attributes$spellcheck);
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $mdgriffith$elm_ui$Element$Input$value = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Attributes$value);
var $mdgriffith$elm_ui$Element$Input$textHelper = F3(
	function (textInput, attrs, textOptions) {
		var withDefaults = _Utils_ap($mdgriffith$elm_ui$Element$Input$defaultTextBoxStyle, attrs);
		var redistributed = A3(
			$mdgriffith$elm_ui$Element$Input$redistribute,
			_Utils_eq(textInput.t, $mdgriffith$elm_ui$Element$Input$TextArea),
			$mdgriffith$elm_ui$Element$Input$isStacked(textOptions.bS),
			withDefaults);
		var onlySpacing = function (attr) {
			if ((attr.$ === 4) && (attr.b.$ === 5)) {
				var _v9 = attr.b;
				return true;
			} else {
				return false;
			}
		};
		var heightConstrained = function () {
			var _v7 = textInput.t;
			if (!_v7.$) {
				var inputType = _v7.a;
				return false;
			} else {
				return A2(
					$elm$core$Maybe$withDefault,
					false,
					A2(
						$elm$core$Maybe$map,
						$mdgriffith$elm_ui$Element$Input$isConstrained,
						$elm$core$List$head(
							$elm$core$List$reverse(
								A2($elm$core$List$filterMap, $mdgriffith$elm_ui$Element$Input$getHeight, withDefaults)))));
			}
		}();
		var getPadding = function (attr) {
			if ((attr.$ === 4) && (attr.b.$ === 7)) {
				var cls = attr.a;
				var _v6 = attr.b;
				var pad = _v6.a;
				var t = _v6.b;
				var r = _v6.c;
				var b = _v6.d;
				var l = _v6.e;
				return $elm$core$Maybe$Just(
					{
						dy: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(b - 3)),
						fI: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(l - 3)),
						gP: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(r - 3)),
						hZ: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(t - 3))
					});
			} else {
				return $elm$core$Maybe$Nothing;
			}
		};
		var parentPadding = A2(
			$elm$core$Maybe$withDefault,
			{dy: 0, fI: 0, gP: 0, hZ: 0},
			$elm$core$List$head(
				$elm$core$List$reverse(
					A2($elm$core$List$filterMap, getPadding, withDefaults))));
		var inputElement = A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			function () {
				var _v3 = textInput.t;
				if (!_v3.$) {
					var inputType = _v3.a;
					return $mdgriffith$elm_ui$Internal$Model$NodeName('input');
				} else {
					return $mdgriffith$elm_ui$Internal$Model$NodeName('textarea');
				}
			}(),
			_Utils_ap(
				function () {
					var _v4 = textInput.t;
					if (!_v4.$) {
						var inputType = _v4.a;
						return _List_fromArray(
							[
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Attributes$type_(inputType)),
								$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.fC)
							]);
					} else {
						return _List_fromArray(
							[
								$mdgriffith$elm_ui$Element$clip,
								$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
								$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.fy),
								$mdgriffith$elm_ui$Element$Input$calcMoveToCompensateForPadding(withDefaults),
								$mdgriffith$elm_ui$Element$paddingEach(parentPadding),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								A2(
									$elm$html$Html$Attributes$style,
									'margin',
									$mdgriffith$elm_ui$Element$Input$renderBox(
										$mdgriffith$elm_ui$Element$Input$negateBox(parentPadding)))),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								A2($elm$html$Html$Attributes$style, 'box-sizing', 'content-box'))
							]);
					}
				}(),
				_Utils_ap(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Input$value(textOptions.cH),
							$mdgriffith$elm_ui$Internal$Model$Attr(
							$elm$html$Html$Events$onInput(textOptions.b$)),
							$mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute(textOptions.bS),
							$mdgriffith$elm_ui$Element$Input$spellcheck(textInput.I),
							A2(
							$elm$core$Maybe$withDefault,
							$mdgriffith$elm_ui$Internal$Model$NoAttribute,
							A2($elm$core$Maybe$map, $mdgriffith$elm_ui$Element$Input$autofill, textInput.D))
						]),
					redistributed.p)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_Nil));
		var wrappedInput = function () {
			var _v0 = textInput.t;
			if (_v0.$ === 1) {
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					_Utils_ap(
						(heightConstrained ? $elm$core$List$cons($mdgriffith$elm_ui$Element$scrollbarY) : $elm$core$Basics$identity)(
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, withDefaults) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.bB),
									$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.fB)
								])),
						redistributed.c),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[
								A4(
								$mdgriffith$elm_ui$Internal$Model$element,
								$mdgriffith$elm_ui$Internal$Model$asParagraph,
								$mdgriffith$elm_ui$Internal$Model$div,
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
										A2(
											$elm$core$List$cons,
											$mdgriffith$elm_ui$Element$inFront(inputElement),
											A2(
												$elm$core$List$cons,
												$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.fA),
												redistributed.aq)))),
								$mdgriffith$elm_ui$Internal$Model$Unkeyed(
									function () {
										if (textOptions.cH === '') {
											var _v1 = textOptions.b6;
											if (_v1.$ === 1) {
												return _List_fromArray(
													[
														$mdgriffith$elm_ui$Element$text('\u00A0')
													]);
											} else {
												var place = _v1.a;
												return _List_fromArray(
													[
														A3($mdgriffith$elm_ui$Element$Input$renderPlaceholder, place, _List_Nil, textOptions.cH === '')
													]);
											}
										} else {
											return _List_fromArray(
												[
													$mdgriffith$elm_ui$Internal$Model$unstyled(
													A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Style$classes.fz)
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(textOptions.cH + '\u00A0')
															])))
												]);
										}
									}()))
							])));
			} else {
				var inputType = _v0.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						A2(
							$elm$core$List$cons,
							A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, withDefaults) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.bB),
							$elm$core$List$concat(
								_List_fromArray(
									[
										redistributed.c,
										function () {
										var _v2 = textOptions.b6;
										if (_v2.$ === 1) {
											return _List_Nil;
										} else {
											var place = _v2.a;
											return _List_fromArray(
												[
													$mdgriffith$elm_ui$Element$behindContent(
													A3($mdgriffith$elm_ui$Element$Input$renderPlaceholder, place, redistributed.x, textOptions.cH === ''))
												]);
										}
									}()
									])))),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[inputElement])));
			}
		}();
		return A3(
			$mdgriffith$elm_ui$Element$Input$applyLabel,
			A2(
				$elm$core$List$cons,
				A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.eq),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$Input$isHiddenLabel(textOptions.bS) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Element$spacing(5),
					A2($elm$core$List$cons, $mdgriffith$elm_ui$Element$Region$announce, redistributed.h))),
			textOptions.bS,
			wrappedInput);
	});
var $mdgriffith$elm_ui$Element$Input$multiline = F2(
	function (attrs, multi) {
		return A3(
			$mdgriffith$elm_ui$Element$Input$textHelper,
			{D: $elm$core$Maybe$Nothing, I: multi.cD, t: $mdgriffith$elm_ui$Element$Input$TextArea},
			attrs,
			{bS: multi.bS, b$: multi.b$, b6: multi.b6, cH: multi.cH});
	});
var $pablohirafuji$elm_markdown$Markdown$Block$BlockQuote = function (a) {
	return {$: 5, a: a};
};
var $pablohirafuji$elm_markdown$Markdown$Block$List = F2(
	function (a, b) {
		return {$: 6, a: a, b: b};
	});
var $pablohirafuji$elm_markdown$Markdown$Block$Paragraph = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$trim = _String_trim;
var $pablohirafuji$elm_markdown$Markdown$Block$formatParagraphLine = function (rawParagraph) {
	return (A2($elm$core$String$right, 2, rawParagraph) === '  ') ? ($elm$core$String$trim(rawParagraph) + '  ') : $elm$core$String$trim(rawParagraph);
};
var $pablohirafuji$elm_markdown$Markdown$Block$addToParagraph = F2(
	function (paragraph, rawLine) {
		return A2(
			$pablohirafuji$elm_markdown$Markdown$Block$Paragraph,
			paragraph + ('\n' + $pablohirafuji$elm_markdown$Markdown$Block$formatParagraphLine(rawLine)),
			_List_Nil);
	});
var $pablohirafuji$elm_markdown$Markdown$Block$blockQuoteLineRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^ {0,3}(?:>[ ]?)(.*)$'));
var $pablohirafuji$elm_markdown$Markdown$Block$blankLineRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^\\s*$'));
var $elm$regex$Regex$contains = _Regex_contains;
var $pablohirafuji$elm_markdown$Markdown$Block$calcListIndentLength = function (_v0) {
	var listBlock = _v0.a;
	var indentSpace = _v0.b;
	var rawLine = _v0.c;
	var indentSpaceLength = $elm$core$String$length(indentSpace);
	var isIndentedCode = indentSpaceLength >= 4;
	var updtRawLine = isIndentedCode ? _Utils_ap(indentSpace, rawLine) : rawLine;
	var indentLength = (isIndentedCode || A2($elm$regex$Regex$contains, $pablohirafuji$elm_markdown$Markdown$Block$blankLineRegex, rawLine)) ? (listBlock.r - indentSpaceLength) : listBlock.r;
	return _Utils_Tuple2(
		_Utils_update(
			listBlock,
			{r: indentLength}),
		updtRawLine);
};
var $pablohirafuji$elm_markdown$Markdown$Block$atxHeadingLineRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^ {0,3}(#{1,6})' + ('(?:[ \\t]+[ \\t#]+$|[ \\t]+|$)' + '(.*?)(?:\\s+[ \\t#]*)?$')));
var $pablohirafuji$elm_markdown$Markdown$Block$Heading = F3(
	function (a, b, c) {
		return {$: 2, a: a, b: b, c: c};
	});
var $pablohirafuji$elm_markdown$Markdown$Block$extractATXHeadingRM = function (match) {
	var _v0 = match.hx;
	if ((_v0.b && (!_v0.a.$)) && _v0.b.b) {
		var lvl = _v0.a.a;
		var _v1 = _v0.b;
		var maybeHeading = _v1.a;
		return $elm$core$Maybe$Just(
			A3(
				$pablohirafuji$elm_markdown$Markdown$Block$Heading,
				A2($elm$core$Maybe$withDefault, '', maybeHeading),
				$elm$core$String$length(lvl),
				_List_Nil));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$regex$Regex$findAtMost = _Regex_findAtMost;
var $elm$core$Result$fromMaybe = F2(
	function (err, maybe) {
		if (!maybe.$) {
			var v = maybe.a;
			return $elm$core$Result$Ok(v);
		} else {
			return $elm$core$Result$Err(err);
		}
	});
var $pablohirafuji$elm_markdown$Markdown$Block$checkATXHeadingLine = function (_v0) {
	var rawLine = _v0.a;
	var ast = _v0.b;
	return A2(
		$elm$core$Result$fromMaybe,
		_Utils_Tuple2(rawLine, ast),
		A2(
			$elm$core$Maybe$map,
			function (a) {
				return A2($elm$core$List$cons, a, ast);
			},
			A2(
				$elm$core$Maybe$andThen,
				$pablohirafuji$elm_markdown$Markdown$Block$extractATXHeadingRM,
				$elm$core$List$head(
					A3($elm$regex$Regex$findAtMost, 1, $pablohirafuji$elm_markdown$Markdown$Block$atxHeadingLineRegex, rawLine)))));
};
var $pablohirafuji$elm_markdown$Markdown$Block$BlankLine = function (a) {
	return {$: 0, a: a};
};
var $pablohirafuji$elm_markdown$Markdown$Block$CodeBlock = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $pablohirafuji$elm_markdown$Markdown$Block$Fenced = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $pablohirafuji$elm_markdown$Markdown$Block$addBlankLineToListBlock = F2(
	function (match, asts) {
		if (!asts.b) {
			return _List_fromArray(
				[
					_List_fromArray(
					[
						$pablohirafuji$elm_markdown$Markdown$Block$BlankLine(match.fU)
					])
				]);
		} else {
			var ast = asts.a;
			var astsTail = asts.b;
			return A2(
				$elm$core$List$cons,
				A2($pablohirafuji$elm_markdown$Markdown$Block$parseBlankLine, ast, match),
				astsTail);
		}
	});
var $pablohirafuji$elm_markdown$Markdown$Block$parseBlankLine = F2(
	function (ast, match) {
		_v0$2:
		while (true) {
			if (ast.b) {
				switch (ast.a.$) {
					case 3:
						if ((ast.a.a.$ === 1) && ast.a.a.a) {
							var _v1 = ast.a;
							var _v2 = _v1.a;
							var fence = _v2.b;
							var code = _v1.b;
							var astTail = ast.b;
							return function (a) {
								return A2($elm$core$List$cons, a, astTail);
							}(
								A2(
									$pablohirafuji$elm_markdown$Markdown$Block$CodeBlock,
									A2($pablohirafuji$elm_markdown$Markdown$Block$Fenced, true, fence),
									code + '\n'));
						} else {
							break _v0$2;
						}
					case 6:
						var _v3 = ast.a;
						var model = _v3.a;
						var items = _v3.b;
						var astTail = ast.b;
						return A2(
							$elm$core$List$cons,
							A2(
								$pablohirafuji$elm_markdown$Markdown$Block$List,
								model,
								A2($pablohirafuji$elm_markdown$Markdown$Block$addBlankLineToListBlock, match, items)),
							astTail);
					default:
						break _v0$2;
				}
			} else {
				break _v0$2;
			}
		}
		return A2(
			$elm$core$List$cons,
			$pablohirafuji$elm_markdown$Markdown$Block$BlankLine(match.fU),
			ast);
	});
var $pablohirafuji$elm_markdown$Markdown$Block$checkBlankLine = function (_v0) {
	var rawLine = _v0.a;
	var ast = _v0.b;
	return A2(
		$elm$core$Result$fromMaybe,
		_Utils_Tuple2(rawLine, ast),
		A2(
			$elm$core$Maybe$map,
			$pablohirafuji$elm_markdown$Markdown$Block$parseBlankLine(ast),
			$elm$core$List$head(
				A3($elm$regex$Regex$findAtMost, 1, $pablohirafuji$elm_markdown$Markdown$Block$blankLineRegex, rawLine))));
};
var $pablohirafuji$elm_markdown$Markdown$Block$indentedCodeLineRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^(?: {4,4}| {0,3}\\t)(.*)$'));
var $pablohirafuji$elm_markdown$Markdown$Block$Indented = {$: 0};
var $pablohirafuji$elm_markdown$Markdown$Block$blocksAfterBlankLines = F2(
	function (ast, blankLines) {
		blocksAfterBlankLines:
		while (true) {
			if (ast.b && (!ast.a.$)) {
				var blankStr = ast.a.a;
				var astTail = ast.b;
				var $temp$ast = astTail,
					$temp$blankLines = A2($elm$core$List$cons, blankStr, blankLines);
				ast = $temp$ast;
				blankLines = $temp$blankLines;
				continue blocksAfterBlankLines;
			} else {
				return _Utils_Tuple2(ast, blankLines);
			}
		}
	});
var $pablohirafuji$elm_markdown$Markdown$Block$maybeContinueParagraph = F2(
	function (rawLine, ast) {
		_v0$3:
		while (true) {
			if (ast.b) {
				switch (ast.a.$) {
					case 4:
						var _v1 = ast.a;
						var paragraph = _v1.a;
						var astTail = ast.b;
						return $elm$core$Maybe$Just(
							A2(
								$elm$core$List$cons,
								A2($pablohirafuji$elm_markdown$Markdown$Block$addToParagraph, paragraph, rawLine),
								astTail));
					case 5:
						var bqAST = ast.a.a;
						var astTail = ast.b;
						return A2(
							$elm$core$Maybe$map,
							function (updtBqAST) {
								return A2(
									$elm$core$List$cons,
									$pablohirafuji$elm_markdown$Markdown$Block$BlockQuote(updtBqAST),
									astTail);
							},
							A2($pablohirafuji$elm_markdown$Markdown$Block$maybeContinueParagraph, rawLine, bqAST));
					case 6:
						var _v2 = ast.a;
						var model = _v2.a;
						var items = _v2.b;
						var astTail = ast.b;
						if (items.b) {
							var itemAST = items.a;
							var itemASTTail = items.b;
							return A2(
								$elm$core$Maybe$map,
								A2(
									$elm$core$Basics$composeR,
									function (a) {
										return A2($elm$core$List$cons, a, itemASTTail);
									},
									A2(
										$elm$core$Basics$composeR,
										$pablohirafuji$elm_markdown$Markdown$Block$List(model),
										function (a) {
											return A2($elm$core$List$cons, a, astTail);
										})),
								A2($pablohirafuji$elm_markdown$Markdown$Block$maybeContinueParagraph, rawLine, itemAST));
						} else {
							return $elm$core$Maybe$Nothing;
						}
					default:
						break _v0$3;
				}
			} else {
				break _v0$3;
			}
		}
		return $elm$core$Maybe$Nothing;
	});
var $elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var $pablohirafuji$elm_markdown$Markdown$Helpers$tabRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('\\t'));
var $pablohirafuji$elm_markdown$Markdown$Helpers$indentLine = function (indentLength_) {
	return A2(
		$elm$core$Basics$composeR,
		A2(
			$elm$regex$Regex$replace,
			$pablohirafuji$elm_markdown$Markdown$Helpers$tabRegex,
			function (_v0) {
				return '    ';
			}),
		A3(
			$elm$regex$Regex$replaceAtMost,
			1,
			A2(
				$elm$core$Maybe$withDefault,
				$elm$regex$Regex$never,
				$elm$regex$Regex$fromString(
					'^ {0,' + ($elm$core$String$fromInt(indentLength_) + '}'))),
			function (_v1) {
				return '';
			}));
};
var $pablohirafuji$elm_markdown$Markdown$Block$resumeIndentedCodeBlock = F2(
	function (codeLine, _v0) {
		var remainBlocks = _v0.a;
		var blankLines = _v0.b;
		if ((remainBlocks.b && (remainBlocks.a.$ === 3)) && (!remainBlocks.a.a.$)) {
			var _v2 = remainBlocks.a;
			var _v3 = _v2.a;
			var codeStr = _v2.b;
			var remainBlocksTail = remainBlocks.b;
			return $elm$core$Maybe$Just(
				function (a) {
					return A2($elm$core$List$cons, a, remainBlocksTail);
				}(
					A2(
						$pablohirafuji$elm_markdown$Markdown$Block$CodeBlock,
						$pablohirafuji$elm_markdown$Markdown$Block$Indented,
						function (a) {
							return a + (codeLine + '\n');
						}(
							_Utils_ap(
								codeStr,
								$elm$core$String$concat(
									A2(
										$elm$core$List$map,
										function (bl) {
											return A2($pablohirafuji$elm_markdown$Markdown$Helpers$indentLine, 4, bl) + '\n';
										},
										blankLines)))))));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $pablohirafuji$elm_markdown$Markdown$Block$parseIndentedCodeLine = F2(
	function (ast, codeLine) {
		_v0$2:
		while (true) {
			if (ast.b) {
				switch (ast.a.$) {
					case 3:
						if (!ast.a.a.$) {
							var _v1 = ast.a;
							var _v2 = _v1.a;
							var codeStr = _v1.b;
							var astTail = ast.b;
							return function (a) {
								return A2($elm$core$List$cons, a, astTail);
							}(
								A2($pablohirafuji$elm_markdown$Markdown$Block$CodeBlock, $pablohirafuji$elm_markdown$Markdown$Block$Indented, codeStr + (codeLine + '\n')));
						} else {
							break _v0$2;
						}
					case 0:
						var blankStr = ast.a.a;
						var astTail = ast.b;
						return A2(
							$elm$core$Maybe$withDefault,
							function (a) {
								return A2($elm$core$List$cons, a, ast);
							}(
								A2($pablohirafuji$elm_markdown$Markdown$Block$CodeBlock, $pablohirafuji$elm_markdown$Markdown$Block$Indented, codeLine + '\n')),
							A2(
								$pablohirafuji$elm_markdown$Markdown$Block$resumeIndentedCodeBlock,
								codeLine,
								A2(
									$pablohirafuji$elm_markdown$Markdown$Block$blocksAfterBlankLines,
									astTail,
									_List_fromArray(
										[blankStr]))));
					default:
						break _v0$2;
				}
			} else {
				break _v0$2;
			}
		}
		return A2(
			$elm$core$Maybe$withDefault,
			function (a) {
				return A2($elm$core$List$cons, a, ast);
			}(
				A2($pablohirafuji$elm_markdown$Markdown$Block$CodeBlock, $pablohirafuji$elm_markdown$Markdown$Block$Indented, codeLine + '\n')),
			A2($pablohirafuji$elm_markdown$Markdown$Block$maybeContinueParagraph, codeLine, ast));
	});
var $pablohirafuji$elm_markdown$Markdown$Block$checkIndentedCode = function (_v0) {
	var rawLine = _v0.a;
	var ast = _v0.b;
	return A2(
		$elm$core$Result$fromMaybe,
		_Utils_Tuple2(rawLine, ast),
		A2(
			$elm$core$Maybe$map,
			$pablohirafuji$elm_markdown$Markdown$Block$parseIndentedCodeLine(ast),
			A2(
				$elm$core$Maybe$withDefault,
				$elm$core$Maybe$Nothing,
				A2(
					$elm$core$Maybe$withDefault,
					$elm$core$Maybe$Nothing,
					A2(
						$elm$core$Maybe$map,
						A2(
							$elm$core$Basics$composeR,
							function ($) {
								return $.hx;
							},
							$elm$core$List$head),
						$elm$core$List$head(
							A3($elm$regex$Regex$findAtMost, 1, $pablohirafuji$elm_markdown$Markdown$Block$indentedCodeLineRegex, rawLine)))))));
};
var $pablohirafuji$elm_markdown$Markdown$Entity$decimalRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('&#([0-9]{1,8});'));
var $elm$core$Basics$modBy = _Basics_modBy;
var $pablohirafuji$elm_markdown$Markdown$Entity$isBadEndUnicode = function (_int) {
	var remain_ = A2($elm$core$Basics$modBy, 16, _int);
	var remain = A2($elm$core$Basics$modBy, 131070, _int);
	return (_int >= 131070) && ((((0 <= remain) && (remain <= 15)) || ((65536 <= remain) && (remain <= 65551))) && ((remain_ === 14) || (remain_ === 15)));
};
var $pablohirafuji$elm_markdown$Markdown$Entity$isValidUnicode = function (_int) {
	return (_int === 9) || ((_int === 10) || ((_int === 13) || ((_int === 133) || (((32 <= _int) && (_int <= 126)) || (((160 <= _int) && (_int <= 55295)) || (((57344 <= _int) && (_int <= 64975)) || (((65008 <= _int) && (_int <= 65533)) || ((65536 <= _int) && (_int <= 1114109)))))))));
};
var $pablohirafuji$elm_markdown$Markdown$Entity$validUnicode = function (_int) {
	return ($pablohirafuji$elm_markdown$Markdown$Entity$isValidUnicode(_int) && (!$pablohirafuji$elm_markdown$Markdown$Entity$isBadEndUnicode(_int))) ? $elm$core$String$fromChar(
		$elm$core$Char$fromCode(_int)) : $elm$core$String$fromChar(
		$elm$core$Char$fromCode(65533));
};
var $pablohirafuji$elm_markdown$Markdown$Entity$replaceDecimal = function (match) {
	return A2(
		$elm$core$Maybe$withDefault,
		match.fU,
		A2(
			$elm$core$Maybe$map,
			$pablohirafuji$elm_markdown$Markdown$Entity$validUnicode,
			A2(
				$elm$core$Maybe$andThen,
				$elm$core$String$toInt,
				A2(
					$elm$core$Maybe$withDefault,
					$elm$core$Maybe$Nothing,
					$elm$core$List$head(match.hx)))));
};
var $pablohirafuji$elm_markdown$Markdown$Entity$replaceDecimals = A2($elm$regex$Regex$replace, $pablohirafuji$elm_markdown$Markdown$Entity$decimalRegex, $pablohirafuji$elm_markdown$Markdown$Entity$replaceDecimal);
var $pablohirafuji$elm_markdown$Markdown$Entity$entitiesRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('&([0-9a-zA-Z]+);'));
var $pablohirafuji$elm_markdown$Markdown$Entity$entities = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('quot', 34),
			_Utils_Tuple2('amp', 38),
			_Utils_Tuple2('apos', 39),
			_Utils_Tuple2('lt', 60),
			_Utils_Tuple2('gt', 62),
			_Utils_Tuple2('nbsp', 160),
			_Utils_Tuple2('iexcl', 161),
			_Utils_Tuple2('cent', 162),
			_Utils_Tuple2('pound', 163),
			_Utils_Tuple2('curren', 164),
			_Utils_Tuple2('yen', 165),
			_Utils_Tuple2('brvbar', 166),
			_Utils_Tuple2('sect', 167),
			_Utils_Tuple2('uml', 168),
			_Utils_Tuple2('copy', 169),
			_Utils_Tuple2('ordf', 170),
			_Utils_Tuple2('laquo', 171),
			_Utils_Tuple2('not', 172),
			_Utils_Tuple2('shy', 173),
			_Utils_Tuple2('reg', 174),
			_Utils_Tuple2('macr', 175),
			_Utils_Tuple2('deg', 176),
			_Utils_Tuple2('plusmn', 177),
			_Utils_Tuple2('sup2', 178),
			_Utils_Tuple2('sup3', 179),
			_Utils_Tuple2('acute', 180),
			_Utils_Tuple2('micro', 181),
			_Utils_Tuple2('para', 182),
			_Utils_Tuple2('middot', 183),
			_Utils_Tuple2('cedil', 184),
			_Utils_Tuple2('sup1', 185),
			_Utils_Tuple2('ordm', 186),
			_Utils_Tuple2('raquo', 187),
			_Utils_Tuple2('frac14', 188),
			_Utils_Tuple2('frac12', 189),
			_Utils_Tuple2('frac34', 190),
			_Utils_Tuple2('iquest', 191),
			_Utils_Tuple2('Agrave', 192),
			_Utils_Tuple2('Aacute', 193),
			_Utils_Tuple2('Acirc', 194),
			_Utils_Tuple2('Atilde', 195),
			_Utils_Tuple2('Auml', 196),
			_Utils_Tuple2('Aring', 197),
			_Utils_Tuple2('AElig', 198),
			_Utils_Tuple2('Ccedil', 199),
			_Utils_Tuple2('Egrave', 200),
			_Utils_Tuple2('Eacute', 201),
			_Utils_Tuple2('Ecirc', 202),
			_Utils_Tuple2('Euml', 203),
			_Utils_Tuple2('Igrave', 204),
			_Utils_Tuple2('Iacute', 205),
			_Utils_Tuple2('Icirc', 206),
			_Utils_Tuple2('Iuml', 207),
			_Utils_Tuple2('ETH', 208),
			_Utils_Tuple2('Ntilde', 209),
			_Utils_Tuple2('Ograve', 210),
			_Utils_Tuple2('Oacute', 211),
			_Utils_Tuple2('Ocirc', 212),
			_Utils_Tuple2('Otilde', 213),
			_Utils_Tuple2('Ouml', 214),
			_Utils_Tuple2('times', 215),
			_Utils_Tuple2('Oslash', 216),
			_Utils_Tuple2('Ugrave', 217),
			_Utils_Tuple2('Uacute', 218),
			_Utils_Tuple2('Ucirc', 219),
			_Utils_Tuple2('Uuml', 220),
			_Utils_Tuple2('Yacute', 221),
			_Utils_Tuple2('THORN', 222),
			_Utils_Tuple2('szlig', 223),
			_Utils_Tuple2('agrave', 224),
			_Utils_Tuple2('aacute', 225),
			_Utils_Tuple2('acirc', 226),
			_Utils_Tuple2('atilde', 227),
			_Utils_Tuple2('auml', 228),
			_Utils_Tuple2('aring', 229),
			_Utils_Tuple2('aelig', 230),
			_Utils_Tuple2('ccedil', 231),
			_Utils_Tuple2('egrave', 232),
			_Utils_Tuple2('eacute', 233),
			_Utils_Tuple2('ecirc', 234),
			_Utils_Tuple2('euml', 235),
			_Utils_Tuple2('igrave', 236),
			_Utils_Tuple2('iacute', 237),
			_Utils_Tuple2('icirc', 238),
			_Utils_Tuple2('iuml', 239),
			_Utils_Tuple2('eth', 240),
			_Utils_Tuple2('ntilde', 241),
			_Utils_Tuple2('ograve', 242),
			_Utils_Tuple2('oacute', 243),
			_Utils_Tuple2('ocirc', 244),
			_Utils_Tuple2('otilde', 245),
			_Utils_Tuple2('ouml', 246),
			_Utils_Tuple2('divide', 247),
			_Utils_Tuple2('oslash', 248),
			_Utils_Tuple2('ugrave', 249),
			_Utils_Tuple2('uacute', 250),
			_Utils_Tuple2('ucirc', 251),
			_Utils_Tuple2('uuml', 252),
			_Utils_Tuple2('yacute', 253),
			_Utils_Tuple2('thorn', 254),
			_Utils_Tuple2('yuml', 255),
			_Utils_Tuple2('OElig', 338),
			_Utils_Tuple2('oelig', 339),
			_Utils_Tuple2('Scaron', 352),
			_Utils_Tuple2('scaron', 353),
			_Utils_Tuple2('Yuml', 376),
			_Utils_Tuple2('fnof', 402),
			_Utils_Tuple2('circ', 710),
			_Utils_Tuple2('tilde', 732),
			_Utils_Tuple2('Alpha', 913),
			_Utils_Tuple2('Beta', 914),
			_Utils_Tuple2('Gamma', 915),
			_Utils_Tuple2('Delta', 916),
			_Utils_Tuple2('Epsilon', 917),
			_Utils_Tuple2('Zeta', 918),
			_Utils_Tuple2('Eta', 919),
			_Utils_Tuple2('Theta', 920),
			_Utils_Tuple2('Iota', 921),
			_Utils_Tuple2('Kappa', 922),
			_Utils_Tuple2('Lambda', 923),
			_Utils_Tuple2('Mu', 924),
			_Utils_Tuple2('Nu', 925),
			_Utils_Tuple2('Xi', 926),
			_Utils_Tuple2('Omicron', 927),
			_Utils_Tuple2('Pi', 928),
			_Utils_Tuple2('Rho', 929),
			_Utils_Tuple2('Sigma', 931),
			_Utils_Tuple2('Tau', 932),
			_Utils_Tuple2('Upsilon', 933),
			_Utils_Tuple2('Phi', 934),
			_Utils_Tuple2('Chi', 935),
			_Utils_Tuple2('Psi', 936),
			_Utils_Tuple2('Omega', 937),
			_Utils_Tuple2('alpha', 945),
			_Utils_Tuple2('beta', 946),
			_Utils_Tuple2('gamma', 947),
			_Utils_Tuple2('delta', 948),
			_Utils_Tuple2('epsilon', 949),
			_Utils_Tuple2('zeta', 950),
			_Utils_Tuple2('eta', 951),
			_Utils_Tuple2('theta', 952),
			_Utils_Tuple2('iota', 953),
			_Utils_Tuple2('kappa', 954),
			_Utils_Tuple2('lambda', 955),
			_Utils_Tuple2('mu', 956),
			_Utils_Tuple2('nu', 957),
			_Utils_Tuple2('xi', 958),
			_Utils_Tuple2('omicron', 959),
			_Utils_Tuple2('pi', 960),
			_Utils_Tuple2('rho', 961),
			_Utils_Tuple2('sigmaf', 962),
			_Utils_Tuple2('sigma', 963),
			_Utils_Tuple2('tau', 964),
			_Utils_Tuple2('upsilon', 965),
			_Utils_Tuple2('phi', 966),
			_Utils_Tuple2('chi', 967),
			_Utils_Tuple2('psi', 968),
			_Utils_Tuple2('omega', 969),
			_Utils_Tuple2('thetasym', 977),
			_Utils_Tuple2('upsih', 978),
			_Utils_Tuple2('piv', 982),
			_Utils_Tuple2('ensp', 8194),
			_Utils_Tuple2('emsp', 8195),
			_Utils_Tuple2('thinsp', 8201),
			_Utils_Tuple2('zwnj', 8204),
			_Utils_Tuple2('zwj', 8205),
			_Utils_Tuple2('lrm', 8206),
			_Utils_Tuple2('rlm', 8207),
			_Utils_Tuple2('ndash', 8211),
			_Utils_Tuple2('mdash', 8212),
			_Utils_Tuple2('lsquo', 8216),
			_Utils_Tuple2('rsquo', 8217),
			_Utils_Tuple2('sbquo', 8218),
			_Utils_Tuple2('ldquo', 8220),
			_Utils_Tuple2('rdquo', 8221),
			_Utils_Tuple2('bdquo', 8222),
			_Utils_Tuple2('dagger', 8224),
			_Utils_Tuple2('Dagger', 8225),
			_Utils_Tuple2('bull', 8226),
			_Utils_Tuple2('hellip', 8230),
			_Utils_Tuple2('permil', 8240),
			_Utils_Tuple2('prime', 8242),
			_Utils_Tuple2('Prime', 8243),
			_Utils_Tuple2('lsaquo', 8249),
			_Utils_Tuple2('rsaquo', 8250),
			_Utils_Tuple2('oline', 8254),
			_Utils_Tuple2('frasl', 8260),
			_Utils_Tuple2('euro', 8364),
			_Utils_Tuple2('image', 8465),
			_Utils_Tuple2('weierp', 8472),
			_Utils_Tuple2('real', 8476),
			_Utils_Tuple2('trade', 8482),
			_Utils_Tuple2('alefsym', 8501),
			_Utils_Tuple2('larr', 8592),
			_Utils_Tuple2('uarr', 8593),
			_Utils_Tuple2('rarr', 8594),
			_Utils_Tuple2('darr', 8595),
			_Utils_Tuple2('harr', 8596),
			_Utils_Tuple2('crarr', 8629),
			_Utils_Tuple2('lArr', 8656),
			_Utils_Tuple2('uArr', 8657),
			_Utils_Tuple2('rArr', 8658),
			_Utils_Tuple2('dArr', 8659),
			_Utils_Tuple2('hArr', 8660),
			_Utils_Tuple2('forall', 8704),
			_Utils_Tuple2('part', 8706),
			_Utils_Tuple2('exist', 8707),
			_Utils_Tuple2('empty', 8709),
			_Utils_Tuple2('nabla', 8711),
			_Utils_Tuple2('isin', 8712),
			_Utils_Tuple2('notin', 8713),
			_Utils_Tuple2('ni', 8715),
			_Utils_Tuple2('prod', 8719),
			_Utils_Tuple2('sum', 8721),
			_Utils_Tuple2('minus', 8722),
			_Utils_Tuple2('lowast', 8727),
			_Utils_Tuple2('radic', 8730),
			_Utils_Tuple2('prop', 8733),
			_Utils_Tuple2('infin', 8734),
			_Utils_Tuple2('ang', 8736),
			_Utils_Tuple2('and', 8743),
			_Utils_Tuple2('or', 8744),
			_Utils_Tuple2('cap', 8745),
			_Utils_Tuple2('cup', 8746),
			_Utils_Tuple2('int', 8747),
			_Utils_Tuple2('there4', 8756),
			_Utils_Tuple2('sim', 8764),
			_Utils_Tuple2('cong', 8773),
			_Utils_Tuple2('asymp', 8776),
			_Utils_Tuple2('ne', 8800),
			_Utils_Tuple2('equiv', 8801),
			_Utils_Tuple2('le', 8804),
			_Utils_Tuple2('ge', 8805),
			_Utils_Tuple2('sub', 8834),
			_Utils_Tuple2('sup', 8835),
			_Utils_Tuple2('nsub', 8836),
			_Utils_Tuple2('sube', 8838),
			_Utils_Tuple2('supe', 8839),
			_Utils_Tuple2('oplus', 8853),
			_Utils_Tuple2('otimes', 8855),
			_Utils_Tuple2('perp', 8869),
			_Utils_Tuple2('sdot', 8901),
			_Utils_Tuple2('lceil', 8968),
			_Utils_Tuple2('rceil', 8969),
			_Utils_Tuple2('lfloor', 8970),
			_Utils_Tuple2('rfloor', 8971),
			_Utils_Tuple2('lang', 9001),
			_Utils_Tuple2('rang', 9002),
			_Utils_Tuple2('loz', 9674),
			_Utils_Tuple2('spades', 9824),
			_Utils_Tuple2('clubs', 9827),
			_Utils_Tuple2('hearts', 9829),
			_Utils_Tuple2('diams', 9830)
		]));
var $pablohirafuji$elm_markdown$Markdown$Entity$replaceEntity = function (match) {
	return A2(
		$elm$core$Maybe$withDefault,
		match.fU,
		A2(
			$elm$core$Maybe$map,
			A2($elm$core$Basics$composeR, $elm$core$Char$fromCode, $elm$core$String$fromChar),
			A2(
				$elm$core$Maybe$andThen,
				function (a) {
					return A2($elm$core$Dict$get, a, $pablohirafuji$elm_markdown$Markdown$Entity$entities);
				},
				A2(
					$elm$core$Maybe$withDefault,
					$elm$core$Maybe$Nothing,
					$elm$core$List$head(match.hx)))));
};
var $pablohirafuji$elm_markdown$Markdown$Entity$replaceEntities = A2($elm$regex$Regex$replace, $pablohirafuji$elm_markdown$Markdown$Entity$entitiesRegex, $pablohirafuji$elm_markdown$Markdown$Entity$replaceEntity);
var $pablohirafuji$elm_markdown$Markdown$Helpers$escapableRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('(\\\\+)([!\"#$%&\\\'()*+,./:;<=>?@[\\\\\\]^_`{|}~-])'));
var $pablohirafuji$elm_markdown$Markdown$Helpers$replaceEscapable = A2(
	$elm$regex$Regex$replace,
	$pablohirafuji$elm_markdown$Markdown$Helpers$escapableRegex,
	function (regexMatch) {
		var _v0 = regexMatch.hx;
		if (((_v0.b && (!_v0.a.$)) && _v0.b.b) && (!_v0.b.a.$)) {
			var backslashes = _v0.a.a;
			var _v1 = _v0.b;
			var escapedStr = _v1.a.a;
			return _Utils_ap(
				A2(
					$elm$core$String$repeat,
					($elm$core$String$length(backslashes) / 2) | 0,
					'\\'),
				escapedStr);
		} else {
			return regexMatch.fU;
		}
	});
var $pablohirafuji$elm_markdown$Markdown$Entity$hexadecimalRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('&#[Xx]([0-9a-fA-F]{1,8});'));
var $pablohirafuji$elm_markdown$Markdown$Entity$hexToInt = A2(
	$elm$core$Basics$composeR,
	$elm$core$String$toLower,
	A2(
		$elm$core$Basics$composeR,
		$elm$core$String$toList,
		A2(
			$elm$core$List$foldl,
			F2(
				function (hexDigit, _int) {
					return ((_int * 16) + A2(
						$elm$core$Basics$modBy,
						39,
						$elm$core$Char$toCode(hexDigit))) - 9;
				}),
			0)));
var $pablohirafuji$elm_markdown$Markdown$Entity$replaceHexadecimal = function (match) {
	return A2(
		$elm$core$Maybe$withDefault,
		match.fU,
		A2(
			$elm$core$Maybe$map,
			A2($elm$core$Basics$composeR, $pablohirafuji$elm_markdown$Markdown$Entity$hexToInt, $pablohirafuji$elm_markdown$Markdown$Entity$validUnicode),
			A2(
				$elm$core$Maybe$withDefault,
				$elm$core$Maybe$Nothing,
				$elm$core$List$head(match.hx))));
};
var $pablohirafuji$elm_markdown$Markdown$Entity$replaceHexadecimals = A2($elm$regex$Regex$replace, $pablohirafuji$elm_markdown$Markdown$Entity$hexadecimalRegex, $pablohirafuji$elm_markdown$Markdown$Entity$replaceHexadecimal);
var $pablohirafuji$elm_markdown$Markdown$Helpers$formatStr = function (str) {
	return $pablohirafuji$elm_markdown$Markdown$Entity$replaceHexadecimals(
		$pablohirafuji$elm_markdown$Markdown$Entity$replaceDecimals(
			$pablohirafuji$elm_markdown$Markdown$Entity$replaceEntities(
				$pablohirafuji$elm_markdown$Markdown$Helpers$replaceEscapable(str))));
};
var $pablohirafuji$elm_markdown$Markdown$Block$extractOpenCodeFenceRM = function (match) {
	var _v0 = match.hx;
	if (((_v0.b && _v0.b.b) && (!_v0.b.a.$)) && _v0.b.b.b) {
		var maybeIndent = _v0.a;
		var _v1 = _v0.b;
		var fence = _v1.a.a;
		var _v2 = _v1.b;
		var maybeLanguage = _v2.a;
		return $elm$core$Maybe$Just(
			A2(
				$pablohirafuji$elm_markdown$Markdown$Block$Fenced,
				true,
				{
					a_: A2($elm$core$String$left, 1, fence),
					a$: $elm$core$String$length(fence),
					r: A2(
						$elm$core$Maybe$withDefault,
						0,
						A2($elm$core$Maybe$map, $elm$core$String$length, maybeIndent)),
					a4: A2(
						$elm$core$Maybe$map,
						$pablohirafuji$elm_markdown$Markdown$Helpers$formatStr,
						A2(
							$elm$core$Maybe$andThen,
							function (lang) {
								return (lang === '') ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(lang);
							},
							$elm$core$List$head(
								A2(
									$elm$core$Maybe$withDefault,
									_List_Nil,
									A2($elm$core$Maybe$map, $elm$core$String$words, maybeLanguage)))))
				}));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $pablohirafuji$elm_markdown$Markdown$Block$openCodeFenceLineRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^( {0,3})(`{3,}(?!.*`)|~{3,}(?!.*~))(.*)$'));
var $pablohirafuji$elm_markdown$Markdown$Block$checkOpenCodeFenceLine = function (_v0) {
	var rawLine = _v0.a;
	var ast = _v0.b;
	return A2(
		$elm$core$Result$fromMaybe,
		_Utils_Tuple2(rawLine, ast),
		A2(
			$elm$core$Maybe$map,
			function (a) {
				return A2($elm$core$List$cons, a, ast);
			},
			A2(
				$elm$core$Maybe$map,
				function (f) {
					return A2($pablohirafuji$elm_markdown$Markdown$Block$CodeBlock, f, '');
				},
				A2(
					$elm$core$Maybe$andThen,
					$pablohirafuji$elm_markdown$Markdown$Block$extractOpenCodeFenceRM,
					$elm$core$List$head(
						A3($elm$regex$Regex$findAtMost, 1, $pablohirafuji$elm_markdown$Markdown$Block$openCodeFenceLineRegex, rawLine))))));
};
var $pablohirafuji$elm_markdown$Markdown$Block$Ordered = function (a) {
	return {$: 1, a: a};
};
var $pablohirafuji$elm_markdown$Markdown$Block$Unordered = {$: 0};
var $pablohirafuji$elm_markdown$Markdown$Block$extractOrderedListRM = function (match) {
	var _v0 = match.hx;
	if (((((((_v0.b && (!_v0.a.$)) && _v0.b.b) && (!_v0.b.a.$)) && _v0.b.b.b) && (!_v0.b.b.a.$)) && _v0.b.b.b.b) && _v0.b.b.b.b.b) {
		var indentString = _v0.a.a;
		var _v1 = _v0.b;
		var start = _v1.a.a;
		var _v2 = _v1.b;
		var delimiter = _v2.a.a;
		var _v3 = _v2.b;
		var maybeIndentSpace = _v3.a;
		var _v4 = _v3.b;
		var maybeRawLine = _v4.a;
		return $elm$core$Maybe$Just(
			_Utils_Tuple3(
				{
					at: delimiter,
					r: $elm$core$String$length(indentString) + 1,
					T: false,
					t: A2(
						$elm$core$Maybe$withDefault,
						$pablohirafuji$elm_markdown$Markdown$Block$Unordered,
						A2(
							$elm$core$Maybe$map,
							$pablohirafuji$elm_markdown$Markdown$Block$Ordered,
							$elm$core$String$toInt(start)))
				},
				A2($elm$core$Maybe$withDefault, '', maybeIndentSpace),
				A2($elm$core$Maybe$withDefault, '', maybeRawLine)));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $pablohirafuji$elm_markdown$Markdown$Block$orderedListLineRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^( *(\\d{1,9})([.)])( {0,4}))(?:[ \\t](.*))?$'));
var $pablohirafuji$elm_markdown$Markdown$Block$checkOrderedListLine = function (rawLine) {
	return A2(
		$elm$core$Result$fromMaybe,
		rawLine,
		A2(
			$elm$core$Maybe$andThen,
			$pablohirafuji$elm_markdown$Markdown$Block$extractOrderedListRM,
			$elm$core$List$head(
				A3($elm$regex$Regex$findAtMost, 1, $pablohirafuji$elm_markdown$Markdown$Block$orderedListLineRegex, rawLine))));
};
var $pablohirafuji$elm_markdown$Markdown$Block$extractSetextHeadingRM = function (match) {
	var _v0 = match.hx;
	if (_v0.b && (!_v0.a.$)) {
		var delimiter = _v0.a.a;
		return A2($elm$core$String$startsWith, '=', delimiter) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(1, delimiter)) : $elm$core$Maybe$Just(
			_Utils_Tuple2(2, delimiter));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $pablohirafuji$elm_markdown$Markdown$Block$parseSetextHeadingLine = F3(
	function (rawLine, ast, _v0) {
		var lvl = _v0.a;
		var delimiter = _v0.b;
		if (ast.b && (ast.a.$ === 4)) {
			var _v2 = ast.a;
			var rawText = _v2.a;
			var astTail = ast.b;
			return $elm$core$Maybe$Just(
				A2(
					$elm$core$List$cons,
					A3($pablohirafuji$elm_markdown$Markdown$Block$Heading, rawText, lvl, _List_Nil),
					astTail));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $pablohirafuji$elm_markdown$Markdown$Block$setextHeadingLineRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^ {0,3}(=+|-+)[ \\t]*$'));
var $pablohirafuji$elm_markdown$Markdown$Block$checkSetextHeadingLine = function (_v0) {
	var rawLine = _v0.a;
	var ast = _v0.b;
	return A2(
		$elm$core$Result$fromMaybe,
		_Utils_Tuple2(rawLine, ast),
		A2(
			$elm$core$Maybe$andThen,
			A2($pablohirafuji$elm_markdown$Markdown$Block$parseSetextHeadingLine, rawLine, ast),
			A2(
				$elm$core$Maybe$andThen,
				$pablohirafuji$elm_markdown$Markdown$Block$extractSetextHeadingRM,
				$elm$core$List$head(
					A3($elm$regex$Regex$findAtMost, 1, $pablohirafuji$elm_markdown$Markdown$Block$setextHeadingLineRegex, rawLine)))));
};
var $pablohirafuji$elm_markdown$Markdown$Block$ThematicBreak = {$: 1};
var $pablohirafuji$elm_markdown$Markdown$Block$thematicBreakLineRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^ {0,3}(?:' + ('(?:\\*[ \\t]*){3,}' + ('|(?:_[ \\t]*){3,}' + '|(?:-[ \\t]*){3,})[ \\t]*$'))));
var $pablohirafuji$elm_markdown$Markdown$Block$checkThematicBreakLine = function (_v0) {
	var rawLine = _v0.a;
	var ast = _v0.b;
	return A2(
		$elm$core$Result$fromMaybe,
		_Utils_Tuple2(rawLine, ast),
		A2(
			$elm$core$Maybe$map,
			function (_v1) {
				return A2($elm$core$List$cons, $pablohirafuji$elm_markdown$Markdown$Block$ThematicBreak, ast);
			},
			$elm$core$List$head(
				A3($elm$regex$Regex$findAtMost, 1, $pablohirafuji$elm_markdown$Markdown$Block$thematicBreakLineRegex, rawLine))));
};
var $pablohirafuji$elm_markdown$Markdown$Block$extractUnorderedListRM = function (match) {
	var _v0 = match.hx;
	if ((((((_v0.b && (!_v0.a.$)) && _v0.b.b) && (!_v0.b.a.$)) && _v0.b.b.b) && _v0.b.b.b.b) && (!_v0.b.b.b.b.b)) {
		var indentString = _v0.a.a;
		var _v1 = _v0.b;
		var delimiter = _v1.a.a;
		var _v2 = _v1.b;
		var maybeIndentSpace = _v2.a;
		var _v3 = _v2.b;
		var maybeRawLine = _v3.a;
		return $elm$core$Maybe$Just(
			_Utils_Tuple3(
				{
					at: delimiter,
					r: $elm$core$String$length(indentString) + 1,
					T: false,
					t: $pablohirafuji$elm_markdown$Markdown$Block$Unordered
				},
				A2($elm$core$Maybe$withDefault, '', maybeIndentSpace),
				A2($elm$core$Maybe$withDefault, '', maybeRawLine)));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $pablohirafuji$elm_markdown$Markdown$Block$unorderedListLineRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^( *([\\*\\-\\+])( {0,4}))(?:[ \\t](.*))?$'));
var $pablohirafuji$elm_markdown$Markdown$Block$checkUnorderedListLine = function (rawLine) {
	return A2(
		$elm$core$Result$fromMaybe,
		rawLine,
		A2(
			$elm$core$Maybe$andThen,
			$pablohirafuji$elm_markdown$Markdown$Block$extractUnorderedListRM,
			$elm$core$List$head(
				A3($elm$regex$Regex$findAtMost, 1, $pablohirafuji$elm_markdown$Markdown$Block$unorderedListLineRegex, rawLine))));
};
var $pablohirafuji$elm_markdown$Markdown$Block$closeCodeFenceLineRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^ {0,3}(`{3,}|~{3,})\\s*$'));
var $pablohirafuji$elm_markdown$Markdown$Block$isCloseFenceLineHelp = F2(
	function (fence, match) {
		var _v0 = match.hx;
		if (_v0.b && (!_v0.a.$)) {
			var fenceStr = _v0.a.a;
			return (_Utils_cmp(
				$elm$core$String$length(fenceStr),
				fence.a$) > -1) && _Utils_eq(
				A2($elm$core$String$left, 1, fenceStr),
				fence.a_);
		} else {
			return false;
		}
	});
var $pablohirafuji$elm_markdown$Markdown$Block$isCloseFenceLine = function (fence) {
	return A2(
		$elm$core$Basics$composeR,
		A2($elm$regex$Regex$findAtMost, 1, $pablohirafuji$elm_markdown$Markdown$Block$closeCodeFenceLineRegex),
		A2(
			$elm$core$Basics$composeR,
			$elm$core$List$head,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$Maybe$map(
					$pablohirafuji$elm_markdown$Markdown$Block$isCloseFenceLineHelp(fence)),
				$elm$core$Maybe$withDefault(false))));
};
var $pablohirafuji$elm_markdown$Markdown$Block$continueOrCloseCodeFence = F3(
	function (fence, previousCode, rawLine) {
		return A2($pablohirafuji$elm_markdown$Markdown$Block$isCloseFenceLine, fence, rawLine) ? A2(
			$pablohirafuji$elm_markdown$Markdown$Block$CodeBlock,
			A2($pablohirafuji$elm_markdown$Markdown$Block$Fenced, false, fence),
			previousCode) : A2(
			$pablohirafuji$elm_markdown$Markdown$Block$CodeBlock,
			A2($pablohirafuji$elm_markdown$Markdown$Block$Fenced, true, fence),
			previousCode + (A2($pablohirafuji$elm_markdown$Markdown$Helpers$indentLine, fence.r, rawLine) + '\n'));
	});
var $pablohirafuji$elm_markdown$Markdown$Helpers$ifError = F2(
	function (_function, result) {
		if (!result.$) {
			return result;
		} else {
			var err = result.a;
			return _function(err);
		}
	});
var $pablohirafuji$elm_markdown$Markdown$Helpers$initSpacesRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^ +'));
var $pablohirafuji$elm_markdown$Markdown$Helpers$indentLength = A2(
	$elm$core$Basics$composeR,
	A2(
		$elm$regex$Regex$replace,
		$pablohirafuji$elm_markdown$Markdown$Helpers$tabRegex,
		function (_v0) {
			return '    ';
		}),
	A2(
		$elm$core$Basics$composeR,
		A2($elm$regex$Regex$findAtMost, 1, $pablohirafuji$elm_markdown$Markdown$Helpers$initSpacesRegex),
		A2(
			$elm$core$Basics$composeR,
			$elm$core$List$head,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$Maybe$map(
					A2(
						$elm$core$Basics$composeR,
						function ($) {
							return $.fU;
						},
						$elm$core$String$length)),
				$elm$core$Maybe$withDefault(0)))));
var $pablohirafuji$elm_markdown$Markdown$Block$isBlankLineLast = function (items) {
	isBlankLineLast:
	while (true) {
		if (!items.b) {
			return false;
		} else {
			var item = items.a;
			var itemsTail = items.b;
			_v1$3:
			while (true) {
				if (item.b) {
					switch (item.a.$) {
						case 0:
							if (!item.b.b) {
								return false;
							} else {
								return true;
							}
						case 6:
							var _v2 = item.a;
							var items_ = _v2.b;
							var $temp$items = items_;
							items = $temp$items;
							continue isBlankLineLast;
						default:
							break _v1$3;
					}
				} else {
					break _v1$3;
				}
			}
			return false;
		}
	}
};
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $pablohirafuji$elm_markdown$Markdown$Block$parseTextLine = F2(
	function (rawLine, ast) {
		return A2(
			$elm$core$Maybe$withDefault,
			A2(
				$elm$core$List$cons,
				A2(
					$pablohirafuji$elm_markdown$Markdown$Block$Paragraph,
					$pablohirafuji$elm_markdown$Markdown$Block$formatParagraphLine(rawLine),
					_List_Nil),
				ast),
			A2($pablohirafuji$elm_markdown$Markdown$Block$maybeContinueParagraph, rawLine, ast));
	});
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $pablohirafuji$elm_markdown$Markdown$Block$checkBlockQuote = function (_v16) {
	var rawLine = _v16.a;
	var ast = _v16.b;
	return A2(
		$elm$core$Result$fromMaybe,
		_Utils_Tuple2(rawLine, ast),
		A2(
			$elm$core$Maybe$map,
			$pablohirafuji$elm_markdown$Markdown$Block$parseBlockQuoteLine(ast),
			A2(
				$elm$core$Maybe$map,
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.hx;
					},
					A2(
						$elm$core$Basics$composeR,
						$elm$core$List$head,
						A2(
							$elm$core$Basics$composeR,
							$elm$core$Maybe$withDefault($elm$core$Maybe$Nothing),
							$elm$core$Maybe$withDefault('')))),
				$elm$core$List$head(
					A3($elm$regex$Regex$findAtMost, 1, $pablohirafuji$elm_markdown$Markdown$Block$blockQuoteLineRegex, rawLine)))));
};
var $pablohirafuji$elm_markdown$Markdown$Block$checkListLine = function (_v15) {
	var rawLine = _v15.a;
	var ast = _v15.b;
	return A2(
		$elm$core$Result$mapError,
		function (e) {
			return _Utils_Tuple2(e, ast);
		},
		A2(
			$elm$core$Result$map,
			A2($pablohirafuji$elm_markdown$Markdown$Block$parseListLine, rawLine, ast),
			A2(
				$elm$core$Result$map,
				$pablohirafuji$elm_markdown$Markdown$Block$calcListIndentLength,
				A2(
					$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
					$pablohirafuji$elm_markdown$Markdown$Block$checkUnorderedListLine,
					$pablohirafuji$elm_markdown$Markdown$Block$checkOrderedListLine(rawLine)))));
};
var $pablohirafuji$elm_markdown$Markdown$Block$incorporateLine = F2(
	function (rawLine, ast) {
		_v11$2:
		while (true) {
			if (ast.b) {
				switch (ast.a.$) {
					case 3:
						if ((ast.a.a.$ === 1) && ast.a.a.a) {
							var _v12 = ast.a;
							var _v13 = _v12.a;
							var fence = _v13.b;
							var code = _v12.b;
							var astTail = ast.b;
							return function (a) {
								return A2($elm$core$List$cons, a, astTail);
							}(
								A3($pablohirafuji$elm_markdown$Markdown$Block$continueOrCloseCodeFence, fence, code, rawLine));
						} else {
							break _v11$2;
						}
					case 6:
						var _v14 = ast.a;
						var model = _v14.a;
						var items = _v14.b;
						var astTail = ast.b;
						return (_Utils_cmp(
							$pablohirafuji$elm_markdown$Markdown$Helpers$indentLength(rawLine),
							model.r) > -1) ? A5($pablohirafuji$elm_markdown$Markdown$Block$parseIndentedListLine, rawLine, model, items, ast, astTail) : A2(
							$elm$core$Result$withDefault,
							A2($pablohirafuji$elm_markdown$Markdown$Block$parseTextLine, rawLine, ast),
							A2(
								$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
								$pablohirafuji$elm_markdown$Markdown$Block$checkBlockQuote,
								A2(
									$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
									$pablohirafuji$elm_markdown$Markdown$Block$checkATXHeadingLine,
									A2(
										$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
										$pablohirafuji$elm_markdown$Markdown$Block$checkSetextHeadingLine,
										A2(
											$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
											$pablohirafuji$elm_markdown$Markdown$Block$checkOpenCodeFenceLine,
											A2(
												$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
												$pablohirafuji$elm_markdown$Markdown$Block$checkIndentedCode,
												A2(
													$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
													$pablohirafuji$elm_markdown$Markdown$Block$checkBlankLine,
													A2(
														$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
														$pablohirafuji$elm_markdown$Markdown$Block$checkListLine,
														$pablohirafuji$elm_markdown$Markdown$Block$checkThematicBreakLine(
															_Utils_Tuple2(rawLine, ast))))))))));
					default:
						break _v11$2;
				}
			} else {
				break _v11$2;
			}
		}
		return A2($pablohirafuji$elm_markdown$Markdown$Block$parseRawLine, rawLine, ast);
	});
var $pablohirafuji$elm_markdown$Markdown$Block$parseBlockQuoteLine = F2(
	function (ast, rawLine) {
		if (ast.b && (ast.a.$ === 5)) {
			var bqAST = ast.a.a;
			var astTail = ast.b;
			return function (a) {
				return A2($elm$core$List$cons, a, astTail);
			}(
				$pablohirafuji$elm_markdown$Markdown$Block$BlockQuote(
					A2($pablohirafuji$elm_markdown$Markdown$Block$incorporateLine, rawLine, bqAST)));
		} else {
			return function (a) {
				return A2($elm$core$List$cons, a, ast);
			}(
				$pablohirafuji$elm_markdown$Markdown$Block$BlockQuote(
					A2($pablohirafuji$elm_markdown$Markdown$Block$incorporateLine, rawLine, _List_Nil)));
		}
	});
var $pablohirafuji$elm_markdown$Markdown$Block$parseIndentedListLine = F5(
	function (rawLine, model, items, ast, astTail) {
		if (!items.b) {
			return function (a) {
				return A2($elm$core$List$cons, a, astTail);
			}(
				A2(
					$pablohirafuji$elm_markdown$Markdown$Block$List,
					model,
					function (a) {
						return A2($elm$core$List$cons, a, _List_Nil);
					}(
						function (a) {
							return A2($pablohirafuji$elm_markdown$Markdown$Block$incorporateLine, a, _List_Nil);
						}(
							A2($pablohirafuji$elm_markdown$Markdown$Helpers$indentLine, model.r, rawLine)))));
		} else {
			var item = items.a;
			var itemsTail = items.b;
			var indentedRawLine = A2($pablohirafuji$elm_markdown$Markdown$Helpers$indentLine, model.r, rawLine);
			var updateList = function (model_) {
				return function (a) {
					return A2($elm$core$List$cons, a, astTail);
				}(
					A2(
						$pablohirafuji$elm_markdown$Markdown$Block$List,
						model_,
						function (a) {
							return A2($elm$core$List$cons, a, itemsTail);
						}(
							A2($pablohirafuji$elm_markdown$Markdown$Block$incorporateLine, indentedRawLine, item))));
			};
			_v7$3:
			while (true) {
				if (item.b) {
					switch (item.a.$) {
						case 0:
							if (!item.b.b) {
								return updateList(model);
							} else {
								var itemTail = item.b;
								return A2(
									$elm$core$List$all,
									function (block) {
										if (!block.$) {
											return true;
										} else {
											return false;
										}
									},
									itemTail) ? A2($pablohirafuji$elm_markdown$Markdown$Block$parseRawLine, rawLine, ast) : updateList(
									_Utils_update(
										model,
										{T: true}));
							}
						case 6:
							var _v9 = item.a;
							var model_ = _v9.a;
							var items_ = _v9.b;
							var itemTail = item.b;
							return (_Utils_cmp(
								$pablohirafuji$elm_markdown$Markdown$Helpers$indentLength(indentedRawLine),
								model_.r) > -1) ? updateList(model) : ($pablohirafuji$elm_markdown$Markdown$Block$isBlankLineLast(items_) ? updateList(
								_Utils_update(
									model,
									{T: true})) : updateList(model));
						default:
							break _v7$3;
					}
				} else {
					break _v7$3;
				}
			}
			return updateList(model);
		}
	});
var $pablohirafuji$elm_markdown$Markdown$Block$parseListLine = F3(
	function (rawLine, ast, _v0) {
		var listBlock = _v0.a;
		var listRawLine = _v0.b;
		var parsedRawLine = A2($pablohirafuji$elm_markdown$Markdown$Block$incorporateLine, listRawLine, _List_Nil);
		var newList = A2(
			$elm$core$List$cons,
			A2(
				$pablohirafuji$elm_markdown$Markdown$Block$List,
				listBlock,
				_List_fromArray(
					[parsedRawLine])),
			ast);
		_v1$2:
		while (true) {
			if (ast.b) {
				switch (ast.a.$) {
					case 6:
						var _v2 = ast.a;
						var model = _v2.a;
						var items = _v2.b;
						var astTail = ast.b;
						return _Utils_eq(listBlock.at, model.at) ? function (a) {
							return A2($elm$core$List$cons, a, astTail);
						}(
							A2(
								$pablohirafuji$elm_markdown$Markdown$Block$List,
								_Utils_update(
									model,
									{
										r: listBlock.r,
										T: model.T || $pablohirafuji$elm_markdown$Markdown$Block$isBlankLineLast(items)
									}),
								A2($elm$core$List$cons, parsedRawLine, items))) : newList;
					case 4:
						var _v3 = ast.a;
						var rawText = _v3.a;
						var inlines = _v3.b;
						var astTail = ast.b;
						if ((parsedRawLine.b && (!parsedRawLine.a.$)) && (!parsedRawLine.b.b)) {
							return A2(
								$elm$core$List$cons,
								A2($pablohirafuji$elm_markdown$Markdown$Block$addToParagraph, rawText, rawLine),
								astTail);
						} else {
							var _v5 = listBlock.t;
							if (_v5.$ === 1) {
								if (_v5.a === 1) {
									return newList;
								} else {
									var _int = _v5.a;
									return A2(
										$elm$core$List$cons,
										A2($pablohirafuji$elm_markdown$Markdown$Block$addToParagraph, rawText, rawLine),
										astTail);
								}
							} else {
								return newList;
							}
						}
					default:
						break _v1$2;
				}
			} else {
				break _v1$2;
			}
		}
		return newList;
	});
var $pablohirafuji$elm_markdown$Markdown$Block$parseRawLine = F2(
	function (rawLine, ast) {
		return A2(
			$elm$core$Result$withDefault,
			A2($pablohirafuji$elm_markdown$Markdown$Block$parseTextLine, rawLine, ast),
			A2(
				$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
				$pablohirafuji$elm_markdown$Markdown$Block$checkListLine,
				A2(
					$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
					$pablohirafuji$elm_markdown$Markdown$Block$checkThematicBreakLine,
					A2(
						$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
						$pablohirafuji$elm_markdown$Markdown$Block$checkBlockQuote,
						A2(
							$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
							$pablohirafuji$elm_markdown$Markdown$Block$checkATXHeadingLine,
							A2(
								$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
								$pablohirafuji$elm_markdown$Markdown$Block$checkSetextHeadingLine,
								A2(
									$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
									$pablohirafuji$elm_markdown$Markdown$Block$checkOpenCodeFenceLine,
									A2(
										$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
										$pablohirafuji$elm_markdown$Markdown$Block$checkIndentedCode,
										$pablohirafuji$elm_markdown$Markdown$Block$checkBlankLine(
											_Utils_Tuple2(rawLine, ast))))))))));
	});
var $pablohirafuji$elm_markdown$Markdown$Block$incorporateLines = F2(
	function (rawLines, ast) {
		if (!rawLines.b) {
			return ast;
		} else {
			var rawLine = rawLines.a;
			var rawLinesTail = rawLines.b;
			return A2(
				$pablohirafuji$elm_markdown$Markdown$Block$incorporateLines,
				rawLinesTail,
				A2($pablohirafuji$elm_markdown$Markdown$Block$incorporateLine, rawLine, ast));
		}
	});
var $elm$core$String$lines = _String_lines;
var $pablohirafuji$elm_markdown$Markdown$Block$Custom = F2(
	function (a, b) {
		return {$: 8, a: a, b: b};
	});
var $pablohirafuji$elm_markdown$Markdown$Block$PlainInlines = function (a) {
	return {$: 7, a: a};
};
var $pablohirafuji$elm_markdown$Markdown$Config$Sanitize = function (a) {
	return {$: 1, a: a};
};
var $pablohirafuji$elm_markdown$Markdown$Config$defaultAllowedHtmlAttributes = _List_fromArray(
	['name', 'class']);
var $pablohirafuji$elm_markdown$Markdown$Config$defaultAllowedHtmlElements = _List_fromArray(
	['address', 'article', 'aside', 'b', 'blockquote', 'br', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'dd', 'details', 'div', 'dl', 'dt', 'figcaption', 'figure', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'legend', 'li', 'menu', 'menuitem', 'nav', 'ol', 'optgroup', 'option', 'p', 'pre', 'section', 'strike', 'summary', 'small', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul']);
var $pablohirafuji$elm_markdown$Markdown$Config$defaultSanitizeOptions = {bn: $pablohirafuji$elm_markdown$Markdown$Config$defaultAllowedHtmlAttributes, bo: $pablohirafuji$elm_markdown$Markdown$Config$defaultAllowedHtmlElements};
var $pablohirafuji$elm_markdown$Markdown$Config$defaultOptions = {
	cd: $pablohirafuji$elm_markdown$Markdown$Config$Sanitize($pablohirafuji$elm_markdown$Markdown$Config$defaultSanitizeOptions),
	cB: false
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$initParser = F3(
	function (options, refs, rawText) {
		return {a: _List_Nil, b0: options, v: rawText, bc: refs, g: _List_Nil};
	});
var $pablohirafuji$elm_markdown$Markdown$Inline$CodeInline = function (a) {
	return {$: 2, a: a};
};
var $pablohirafuji$elm_markdown$Markdown$Inline$Emphasis = F2(
	function (a, b) {
		return {$: 6, a: a, b: b};
	});
var $pablohirafuji$elm_markdown$Markdown$Inline$HardLineBreak = {$: 1};
var $pablohirafuji$elm_markdown$Markdown$Inline$HtmlInline = F3(
	function (a, b, c) {
		return {$: 5, a: a, b: b, c: c};
	});
var $pablohirafuji$elm_markdown$Markdown$Inline$Image = F3(
	function (a, b, c) {
		return {$: 4, a: a, b: b, c: c};
	});
var $pablohirafuji$elm_markdown$Markdown$Inline$Link = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var $pablohirafuji$elm_markdown$Markdown$Inline$Text = function (a) {
	return {$: 0, a: a};
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$matchToInline = function (_v0) {
	var match = _v0;
	var _v1 = match.t;
	switch (_v1.$) {
		case 0:
			return $pablohirafuji$elm_markdown$Markdown$Inline$Text(match.cH);
		case 1:
			return $pablohirafuji$elm_markdown$Markdown$Inline$HardLineBreak;
		case 2:
			return $pablohirafuji$elm_markdown$Markdown$Inline$CodeInline(match.cH);
		case 3:
			var _v2 = _v1.a;
			var text = _v2.a;
			var url = _v2.b;
			return A3(
				$pablohirafuji$elm_markdown$Markdown$Inline$Link,
				url,
				$elm$core$Maybe$Nothing,
				_List_fromArray(
					[
						$pablohirafuji$elm_markdown$Markdown$Inline$Text(text)
					]));
		case 4:
			var _v3 = _v1.a;
			var url = _v3.a;
			var maybeTitle = _v3.b;
			return A3(
				$pablohirafuji$elm_markdown$Markdown$Inline$Link,
				url,
				maybeTitle,
				$pablohirafuji$elm_markdown$Markdown$InlineParser$matchesToInlines(match.a));
		case 5:
			var _v4 = _v1.a;
			var url = _v4.a;
			var maybeTitle = _v4.b;
			return A3(
				$pablohirafuji$elm_markdown$Markdown$Inline$Image,
				url,
				maybeTitle,
				$pablohirafuji$elm_markdown$Markdown$InlineParser$matchesToInlines(match.a));
		case 6:
			var model = _v1.a;
			return A3(
				$pablohirafuji$elm_markdown$Markdown$Inline$HtmlInline,
				model.hG,
				model.Y,
				$pablohirafuji$elm_markdown$Markdown$InlineParser$matchesToInlines(match.a));
		default:
			var length = _v1.a;
			return A2(
				$pablohirafuji$elm_markdown$Markdown$Inline$Emphasis,
				length,
				$pablohirafuji$elm_markdown$Markdown$InlineParser$matchesToInlines(match.a));
	}
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$matchesToInlines = function (matches) {
	return A2($elm$core$List$map, $pablohirafuji$elm_markdown$Markdown$InlineParser$matchToInline, matches);
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$Match = $elm$core$Basics$identity;
var $pablohirafuji$elm_markdown$Markdown$InlineParser$prepareChildMatch = F2(
	function (parentMatch, childMatch) {
		return _Utils_update(
			childMatch,
			{bx: childMatch.bx - parentMatch.J, bf: childMatch.bf - parentMatch.J, ao: childMatch.ao - parentMatch.J, J: childMatch.J - parentMatch.J});
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$addChild = F2(
	function (parentMatch, childMatch) {
		return _Utils_update(
			parentMatch,
			{
				a: A2(
					$elm$core$List$cons,
					A2($pablohirafuji$elm_markdown$Markdown$InlineParser$prepareChildMatch, parentMatch, childMatch),
					parentMatch.a)
			});
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$organizeMatch = F2(
	function (_v0, matches) {
		var match = _v0;
		if (!matches.b) {
			return _List_fromArray(
				[match]);
		} else {
			var prevMatch = matches.a;
			var matchesTail = matches.b;
			return (_Utils_cmp(prevMatch.bx, match.bf) < 1) ? A2($elm$core$List$cons, match, matches) : (((_Utils_cmp(prevMatch.bf, match.bf) < 0) && (_Utils_cmp(prevMatch.bx, match.bx) > 0)) ? A2(
				$elm$core$List$cons,
				A2($pablohirafuji$elm_markdown$Markdown$InlineParser$addChild, prevMatch, match),
				matchesTail) : matches);
		}
	});
var $elm$core$List$sortBy = _List_sortBy;
function $pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$organizeMatches() {
	return A2(
		$elm$core$Basics$composeR,
		$elm$core$List$sortBy(
			function (_v0) {
				var match = _v0;
				return match.bf;
			}),
		A2(
			$elm$core$Basics$composeR,
			A2($elm$core$List$foldl, $pablohirafuji$elm_markdown$Markdown$InlineParser$organizeMatch, _List_Nil),
			$elm$core$List$map(
				function (_v1) {
					var match = _v1;
					return _Utils_update(
						match,
						{
							a: $pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$organizeMatches()(match.a)
						});
				})));
}
var $pablohirafuji$elm_markdown$Markdown$InlineParser$organizeMatches = $pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$organizeMatches();
$pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$organizeMatches = function () {
	return $pablohirafuji$elm_markdown$Markdown$InlineParser$organizeMatches;
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$organizeParserMatches = function (model) {
	return _Utils_update(
		model,
		{
			a: $pablohirafuji$elm_markdown$Markdown$InlineParser$organizeMatches(model.a)
		});
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$NormalType = {$: 0};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$normalMatch = function (text) {
	return {
		bx: 0,
		a: _List_Nil,
		bf: 0,
		cH: $pablohirafuji$elm_markdown$Markdown$Helpers$formatStr(text),
		ao: 0,
		J: 0,
		t: $pablohirafuji$elm_markdown$Markdown$InlineParser$NormalType
	};
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$parseTextMatch = F3(
	function (rawText, _v2, parsedMatches) {
		var matchModel = _v2;
		var updtMatch = _Utils_update(
			matchModel,
			{
				a: A3($pablohirafuji$elm_markdown$Markdown$InlineParser$parseTextMatches, matchModel.cH, _List_Nil, matchModel.a)
			});
		if (!parsedMatches.b) {
			var finalStr = A2($elm$core$String$dropLeft, matchModel.bx, rawText);
			return $elm$core$String$isEmpty(finalStr) ? _List_fromArray(
				[updtMatch]) : _List_fromArray(
				[
					updtMatch,
					$pablohirafuji$elm_markdown$Markdown$InlineParser$normalMatch(finalStr)
				]);
		} else {
			var matchHead = parsedMatches.a;
			var matchesTail = parsedMatches.b;
			return _Utils_eq(matchHead.t, $pablohirafuji$elm_markdown$Markdown$InlineParser$NormalType) ? A2($elm$core$List$cons, updtMatch, parsedMatches) : (_Utils_eq(matchModel.bx, matchHead.bf) ? A2($elm$core$List$cons, updtMatch, parsedMatches) : ((_Utils_cmp(matchModel.bx, matchHead.bf) < 0) ? A2(
				$elm$core$List$cons,
				updtMatch,
				A2(
					$elm$core$List$cons,
					$pablohirafuji$elm_markdown$Markdown$InlineParser$normalMatch(
						A3($elm$core$String$slice, matchModel.bx, matchHead.bf, rawText)),
					parsedMatches)) : parsedMatches));
		}
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$parseTextMatches = F3(
	function (rawText, parsedMatches, matches) {
		parseTextMatches:
		while (true) {
			if (!matches.b) {
				if (!parsedMatches.b) {
					return $elm$core$String$isEmpty(rawText) ? _List_Nil : _List_fromArray(
						[
							$pablohirafuji$elm_markdown$Markdown$InlineParser$normalMatch(rawText)
						]);
				} else {
					var matchModel = parsedMatches.a;
					return (matchModel.bf > 0) ? A2(
						$elm$core$List$cons,
						$pablohirafuji$elm_markdown$Markdown$InlineParser$normalMatch(
							A2($elm$core$String$left, matchModel.bf, rawText)),
						parsedMatches) : parsedMatches;
				}
			} else {
				var match = matches.a;
				var matchesTail = matches.b;
				var $temp$rawText = rawText,
					$temp$parsedMatches = A3($pablohirafuji$elm_markdown$Markdown$InlineParser$parseTextMatch, rawText, match, parsedMatches),
					$temp$matches = matchesTail;
				rawText = $temp$rawText;
				parsedMatches = $temp$parsedMatches;
				matches = $temp$matches;
				continue parseTextMatches;
			}
		}
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$parseText = function (model) {
	return _Utils_update(
		model,
		{
			a: A3($pablohirafuji$elm_markdown$Markdown$InlineParser$parseTextMatches, model.v, _List_Nil, model.a)
		});
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$angleBracketLTokenRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('(\\\\*)(\\<)'));
var $elm$regex$Regex$find = _Regex_findAtMost(_Regex_infinity);
var $pablohirafuji$elm_markdown$Markdown$InlineParser$CharToken = function (a) {
	return {$: 3, a: a};
};
var $pablohirafuji$elm_markdown$Markdown$Helpers$isEven = function (_int) {
	return !A2($elm$core$Basics$modBy, 2, _int);
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToAngleBracketLToken = function (regMatch) {
	var _v0 = regMatch.hx;
	if ((_v0.b && _v0.b.b) && (!_v0.b.a.$)) {
		var maybeBackslashes = _v0.a;
		var _v1 = _v0.b;
		var delimiter = _v1.a.a;
		var backslashesLength = A2(
			$elm$core$Maybe$withDefault,
			0,
			A2($elm$core$Maybe$map, $elm$core$String$length, maybeBackslashes));
		return $pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength) ? $elm$core$Maybe$Just(
			{
				fw: regMatch.fw + backslashesLength,
				b: 1,
				e: $pablohirafuji$elm_markdown$Markdown$InlineParser$CharToken('<')
			}) : $elm$core$Maybe$Nothing;
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$findAngleBracketLTokens = function (str) {
	return A2(
		$elm$core$List$filterMap,
		$pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToAngleBracketLToken,
		A2($elm$regex$Regex$find, $pablohirafuji$elm_markdown$Markdown$InlineParser$angleBracketLTokenRegex, str));
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$angleBracketRTokenRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('(\\\\*)(\\>)'));
var $pablohirafuji$elm_markdown$Markdown$InlineParser$RightAngleBracket = function (a) {
	return {$: 4, a: a};
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToAngleBracketRToken = function (regMatch) {
	var _v0 = regMatch.hx;
	if ((_v0.b && _v0.b.b) && (!_v0.b.a.$)) {
		var maybeBackslashes = _v0.a;
		var _v1 = _v0.b;
		var backslashesLength = A2(
			$elm$core$Maybe$withDefault,
			0,
			A2($elm$core$Maybe$map, $elm$core$String$length, maybeBackslashes));
		return $elm$core$Maybe$Just(
			{
				fw: regMatch.fw + backslashesLength,
				b: 1,
				e: $pablohirafuji$elm_markdown$Markdown$InlineParser$RightAngleBracket(
					!$pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength))
			});
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$findAngleBracketRTokens = function (str) {
	return A2(
		$elm$core$List$filterMap,
		$pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToAngleBracketRToken,
		A2($elm$regex$Regex$find, $pablohirafuji$elm_markdown$Markdown$InlineParser$angleBracketRTokenRegex, str));
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$asteriskEmphasisTokenRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('(\\\\*)([^*])?(\\*+)([^*])?'));
var $pablohirafuji$elm_markdown$Markdown$InlineParser$EmphasisToken = F2(
	function (a, b) {
		return {$: 6, a: a, b: b};
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$punctuationRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('[!-#%-\\*,-/:;\\?@\\[-\\]_\\{\\}]'));
var $pablohirafuji$elm_markdown$Markdown$InlineParser$containPunctuation = $elm$regex$Regex$contains($pablohirafuji$elm_markdown$Markdown$InlineParser$punctuationRegex);
var $pablohirafuji$elm_markdown$Markdown$InlineParser$spaceRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('\\s'));
var $pablohirafuji$elm_markdown$Markdown$InlineParser$containSpace = $elm$regex$Regex$contains($pablohirafuji$elm_markdown$Markdown$InlineParser$spaceRegex);
var $pablohirafuji$elm_markdown$Markdown$InlineParser$charFringeRank = function (_char) {
	var string = $elm$core$String$fromChar(_char);
	return $pablohirafuji$elm_markdown$Markdown$InlineParser$containSpace(string) ? 0 : ($pablohirafuji$elm_markdown$Markdown$InlineParser$containPunctuation(string) ? 1 : 2);
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$maybeCharFringeRank = function (maybeChar) {
	return A2(
		$elm$core$Maybe$withDefault,
		0,
		A2($elm$core$Maybe$map, $pablohirafuji$elm_markdown$Markdown$InlineParser$charFringeRank, maybeChar));
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$getFringeRank = A2(
	$elm$core$Basics$composeR,
	$elm$core$Maybe$map(
		A2(
			$elm$core$Basics$composeR,
			$elm$core$String$uncons,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$Maybe$map($elm$core$Tuple$first),
				$pablohirafuji$elm_markdown$Markdown$InlineParser$maybeCharFringeRank))),
	$elm$core$Maybe$withDefault(0));
var $pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToEmphasisToken = F3(
	function (_char, rawText, regMatch) {
		var _v0 = regMatch.hx;
		if ((((_v0.b && _v0.b.b) && _v0.b.b.b) && (!_v0.b.b.a.$)) && _v0.b.b.b.b) {
			var maybeBackslashes = _v0.a;
			var _v1 = _v0.b;
			var maybeLeftFringe = _v1.a;
			var _v2 = _v1.b;
			var delimiter = _v2.a.a;
			var _v3 = _v2.b;
			var maybeRightFringe = _v3.a;
			var leftFringeLength = A2(
				$elm$core$Maybe$withDefault,
				0,
				A2($elm$core$Maybe$map, $elm$core$String$length, maybeLeftFringe));
			var mLeftFringe = ((!(!regMatch.fw)) && (!leftFringeLength)) ? $elm$core$Maybe$Just(
				A3($elm$core$String$slice, regMatch.fw - 1, regMatch.fw, rawText)) : maybeLeftFringe;
			var backslashesLength = A2(
				$elm$core$Maybe$withDefault,
				0,
				A2($elm$core$Maybe$map, $elm$core$String$length, maybeBackslashes));
			var isEscaped = ((!$pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength)) && (!leftFringeLength)) || _Utils_eq(
				mLeftFringe,
				$elm$core$Maybe$Just('\\'));
			var delimiterLength = isEscaped ? ($elm$core$String$length(delimiter) - 1) : $elm$core$String$length(delimiter);
			var fringeRank = _Utils_Tuple2(
				isEscaped ? 1 : $pablohirafuji$elm_markdown$Markdown$InlineParser$getFringeRank(mLeftFringe),
				$pablohirafuji$elm_markdown$Markdown$InlineParser$getFringeRank(maybeRightFringe));
			var index = ((regMatch.fw + backslashesLength) + leftFringeLength) + (isEscaped ? 1 : 0);
			return ((delimiterLength <= 0) || ((_char === '_') && _Utils_eq(
				fringeRank,
				_Utils_Tuple2(2, 2)))) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
				{
					fw: index,
					b: delimiterLength,
					e: A2($pablohirafuji$elm_markdown$Markdown$InlineParser$EmphasisToken, _char, fringeRank)
				});
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$findAsteriskEmphasisTokens = function (str) {
	return A2(
		$elm$core$List$filterMap,
		A2($pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToEmphasisToken, '*', str),
		A2($elm$regex$Regex$find, $pablohirafuji$elm_markdown$Markdown$InlineParser$asteriskEmphasisTokenRegex, str));
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$codeTokenRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('(\\\\*)(\\`+)'));
var $pablohirafuji$elm_markdown$Markdown$InlineParser$CodeToken = function (a) {
	return {$: 0, a: a};
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToCodeToken = function (regMatch) {
	var _v0 = regMatch.hx;
	if ((_v0.b && _v0.b.b) && (!_v0.b.a.$)) {
		var maybeBackslashes = _v0.a;
		var _v1 = _v0.b;
		var backtick = _v1.a.a;
		var backslashesLength = A2(
			$elm$core$Maybe$withDefault,
			0,
			A2($elm$core$Maybe$map, $elm$core$String$length, maybeBackslashes));
		return $elm$core$Maybe$Just(
			{
				fw: regMatch.fw + backslashesLength,
				b: $elm$core$String$length(backtick),
				e: $pablohirafuji$elm_markdown$Markdown$InlineParser$CodeToken(
					!$pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength))
			});
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$findCodeTokens = function (str) {
	return A2(
		$elm$core$List$filterMap,
		$pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToCodeToken,
		A2($elm$regex$Regex$find, $pablohirafuji$elm_markdown$Markdown$InlineParser$codeTokenRegex, str));
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$hardBreakTokenRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('(?:(\\\\+)|( {2,}))\\n'));
var $pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken = {$: 8};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToHardBreakToken = function (regMatch) {
	var _v0 = regMatch.hx;
	_v0$2:
	while (true) {
		if (_v0.b) {
			if (!_v0.a.$) {
				var backslashes = _v0.a.a;
				var backslashesLength = $elm$core$String$length(backslashes);
				return (!$pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength)) ? $elm$core$Maybe$Just(
					{fw: (regMatch.fw + backslashesLength) - 1, b: 2, e: $pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken}) : $elm$core$Maybe$Nothing;
			} else {
				if (_v0.b.b && (!_v0.b.a.$)) {
					var _v1 = _v0.b;
					return $elm$core$Maybe$Just(
						{
							fw: regMatch.fw,
							b: $elm$core$String$length(regMatch.fU),
							e: $pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken
						});
				} else {
					break _v0$2;
				}
			}
		} else {
			break _v0$2;
		}
	}
	return $elm$core$Maybe$Nothing;
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToSoftHardBreakToken = function (regMatch) {
	var _v0 = regMatch.hx;
	_v0$2:
	while (true) {
		if (_v0.b) {
			if (!_v0.a.$) {
				var backslashes = _v0.a.a;
				var backslashesLength = $elm$core$String$length(backslashes);
				return $pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength) ? $elm$core$Maybe$Just(
					{fw: regMatch.fw + backslashesLength, b: 1, e: $pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken}) : $elm$core$Maybe$Just(
					{fw: (regMatch.fw + backslashesLength) - 1, b: 2, e: $pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken});
			} else {
				if (_v0.b.b) {
					var _v1 = _v0.b;
					var maybeSpaces = _v1.a;
					return $elm$core$Maybe$Just(
						{
							fw: regMatch.fw,
							b: $elm$core$String$length(regMatch.fU),
							e: $pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken
						});
				} else {
					break _v0$2;
				}
			}
		} else {
			break _v0$2;
		}
	}
	return $elm$core$Maybe$Nothing;
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$softAsHardLineBreakTokenRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('(?:(\\\\+)|( *))\\n'));
var $pablohirafuji$elm_markdown$Markdown$InlineParser$findHardBreakTokens = F2(
	function (softAsHardLineBreak, str) {
		return softAsHardLineBreak ? A2(
			$elm$core$List$filterMap,
			$pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToSoftHardBreakToken,
			A2($elm$regex$Regex$find, $pablohirafuji$elm_markdown$Markdown$InlineParser$softAsHardLineBreakTokenRegex, str)) : A2(
			$elm$core$List$filterMap,
			$pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToHardBreakToken,
			A2($elm$regex$Regex$find, $pablohirafuji$elm_markdown$Markdown$InlineParser$hardBreakTokenRegex, str));
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$linkImageCloseTokenRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('(\\\\*)(\\])'));
var $pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToLinkImageCloseToken = function (regMatch) {
	var _v0 = regMatch.hx;
	if ((_v0.b && _v0.b.b) && (!_v0.b.a.$)) {
		var maybeBackslashes = _v0.a;
		var _v1 = _v0.b;
		var delimiter = _v1.a.a;
		var backslashesLength = A2(
			$elm$core$Maybe$withDefault,
			0,
			A2($elm$core$Maybe$map, $elm$core$String$length, maybeBackslashes));
		return $pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength) ? $elm$core$Maybe$Just(
			{
				fw: regMatch.fw + backslashesLength,
				b: 1,
				e: $pablohirafuji$elm_markdown$Markdown$InlineParser$CharToken(']')
			}) : $elm$core$Maybe$Nothing;
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$findLinkImageCloseTokens = function (str) {
	return A2(
		$elm$core$List$filterMap,
		$pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToLinkImageCloseToken,
		A2($elm$regex$Regex$find, $pablohirafuji$elm_markdown$Markdown$InlineParser$linkImageCloseTokenRegex, str));
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$linkImageOpenTokenRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('(\\\\*)(\\!)?(\\[)'));
var $pablohirafuji$elm_markdown$Markdown$InlineParser$ImageOpenToken = {$: 2};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$LinkOpenToken = function (a) {
	return {$: 1, a: a};
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToLinkImageOpenToken = function (regMatch) {
	var _v0 = regMatch.hx;
	if (((_v0.b && _v0.b.b) && _v0.b.b.b) && (!_v0.b.b.a.$)) {
		var maybeBackslashes = _v0.a;
		var _v1 = _v0.b;
		var maybeImageOpen = _v1.a;
		var _v2 = _v1.b;
		var delimiter = _v2.a.a;
		var backslashesLength = A2(
			$elm$core$Maybe$withDefault,
			0,
			A2($elm$core$Maybe$map, $elm$core$String$length, maybeBackslashes));
		var isEscaped = !$pablohirafuji$elm_markdown$Markdown$Helpers$isEven(backslashesLength);
		var index = (regMatch.fw + backslashesLength) + ((isEscaped && _Utils_eq(
			maybeImageOpen,
			$elm$core$Maybe$Just('!'))) ? 1 : 0);
		var meaning = isEscaped ? A2(
			$elm$core$Maybe$map,
			function (_v3) {
				return $pablohirafuji$elm_markdown$Markdown$InlineParser$LinkOpenToken(true);
			},
			maybeImageOpen) : $elm$core$Maybe$Just(
			A2(
				$elm$core$Maybe$withDefault,
				$pablohirafuji$elm_markdown$Markdown$InlineParser$LinkOpenToken(true),
				A2(
					$elm$core$Maybe$map,
					function (_v4) {
						return $pablohirafuji$elm_markdown$Markdown$InlineParser$ImageOpenToken;
					},
					maybeImageOpen)));
		var length = _Utils_eq(
			meaning,
			$elm$core$Maybe$Just($pablohirafuji$elm_markdown$Markdown$InlineParser$ImageOpenToken)) ? 2 : 1;
		var toModel = function (m) {
			return {fw: index, b: length, e: m};
		};
		return A2($elm$core$Maybe$map, toModel, meaning);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$findLinkImageOpenTokens = function (str) {
	return A2(
		$elm$core$List$filterMap,
		$pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToLinkImageOpenToken,
		A2($elm$regex$Regex$find, $pablohirafuji$elm_markdown$Markdown$InlineParser$linkImageOpenTokenRegex, str));
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$underlineEmphasisTokenRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('(\\\\*)([^_])?(\\_+)([^_])?'));
var $pablohirafuji$elm_markdown$Markdown$InlineParser$findUnderlineEmphasisTokens = function (str) {
	return A2(
		$elm$core$List$filterMap,
		A2($pablohirafuji$elm_markdown$Markdown$InlineParser$regMatchToEmphasisToken, '_', str),
		A2($elm$regex$Regex$find, $pablohirafuji$elm_markdown$Markdown$InlineParser$underlineEmphasisTokenRegex, str));
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$tokenize = function (model) {
	return _Utils_update(
		model,
		{
			g: A2(
				$elm$core$List$sortBy,
				function ($) {
					return $.fw;
				},
				_Utils_ap(
					$pablohirafuji$elm_markdown$Markdown$InlineParser$findAngleBracketRTokens(model.v),
					_Utils_ap(
						$pablohirafuji$elm_markdown$Markdown$InlineParser$findAngleBracketLTokens(model.v),
						_Utils_ap(
							A2($pablohirafuji$elm_markdown$Markdown$InlineParser$findHardBreakTokens, model.b0.cB, model.v),
							_Utils_ap(
								$pablohirafuji$elm_markdown$Markdown$InlineParser$findLinkImageCloseTokens(model.v),
								_Utils_ap(
									$pablohirafuji$elm_markdown$Markdown$InlineParser$findLinkImageOpenTokens(model.v),
									_Utils_ap(
										$pablohirafuji$elm_markdown$Markdown$InlineParser$findUnderlineEmphasisTokens(model.v),
										_Utils_ap(
											$pablohirafuji$elm_markdown$Markdown$InlineParser$findAsteriskEmphasisTokens(model.v),
											$pablohirafuji$elm_markdown$Markdown$InlineParser$findCodeTokens(model.v)))))))))
		});
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$CodeType = {$: 2};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$EmphasisType = function (a) {
	return {$: 7, a: a};
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$HtmlType = function (a) {
	return {$: 6, a: a};
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$ImageType = function (a) {
	return {$: 5, a: a};
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$LinkType = function (a) {
	return {$: 4, a: a};
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$addMatch = F2(
	function (model, match) {
		return _Utils_update(
			model,
			{
				a: A2($elm$core$List$cons, match, model.a)
			});
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$addToken = F2(
	function (model, token) {
		return _Utils_update(
			model,
			{
				g: A2($elm$core$List$cons, token, model.g)
			});
	});
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (!result.$) {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$applyTTM = F2(
	function (finderFunction, model) {
		return finderFunction(
			_Utils_Tuple2(
				model.g,
				_Utils_update(
					model,
					{g: _List_Nil})));
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$AutolinkType = function (a) {
	return {$: 3, a: a};
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$decodeUrlRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('%(?:3B|2C|2F|3F|3A|40|26|3D|2B|24|23|25)'));
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$url$Url$percentEncode = _Url_percentEncode;
var $pablohirafuji$elm_markdown$Markdown$InlineParser$encodeUrl = A2(
	$elm$core$Basics$composeR,
	$elm$url$Url$percentEncode,
	A2(
		$elm$regex$Regex$replace,
		$pablohirafuji$elm_markdown$Markdown$InlineParser$decodeUrlRegex,
		function (match) {
			return A2(
				$elm$core$Maybe$withDefault,
				match.fU,
				$elm$url$Url$percentDecode(match.fU));
		}));
var $pablohirafuji$elm_markdown$Markdown$InlineParser$urlRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^([A-Za-z][A-Za-z0-9.+\\-]{1,31}:[^<>\\x00-\\x20]*)$'));
var $pablohirafuji$elm_markdown$Markdown$InlineParser$autolinkToMatch = function (_v0) {
	var match = _v0;
	return A2($elm$regex$Regex$contains, $pablohirafuji$elm_markdown$Markdown$InlineParser$urlRegex, match.cH) ? $elm$core$Result$Ok(
		_Utils_update(
			match,
			{
				t: $pablohirafuji$elm_markdown$Markdown$InlineParser$AutolinkType(
					_Utils_Tuple2(
						match.cH,
						$pablohirafuji$elm_markdown$Markdown$InlineParser$encodeUrl(match.cH)))
			})) : $elm$core$Result$Err(match);
};
var $pablohirafuji$elm_markdown$Markdown$Helpers$whiteSpaceChars = ' \\t\\f\\v\\r\\n';
var $pablohirafuji$elm_markdown$Markdown$InlineParser$hrefRegex = '(?:<([^<>' + ($pablohirafuji$elm_markdown$Markdown$Helpers$whiteSpaceChars + (']*)>|([^' + ($pablohirafuji$elm_markdown$Markdown$Helpers$whiteSpaceChars + ('\\(\\)\\\\]*(?:\\\\.[^' + ($pablohirafuji$elm_markdown$Markdown$Helpers$whiteSpaceChars + '\\(\\)\\\\]*)*))')))));
var $pablohirafuji$elm_markdown$Markdown$Helpers$titleRegex = '(?:[' + ($pablohirafuji$elm_markdown$Markdown$Helpers$whiteSpaceChars + (']+' + ('(?:\'([^\'\\\\]*(?:\\\\.[^\'\\\\]*)*)\'|' + ('\"([^\"\\\\]*(?:\\\\.[^\"\\\\]*)*)\"|' + '\\(([^\\)\\\\]*(?:\\\\.[^\\)\\\\]*)*)\\)))?'))));
var $pablohirafuji$elm_markdown$Markdown$InlineParser$inlineLinkTypeOrImageTypeRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^\\(\\s*' + ($pablohirafuji$elm_markdown$Markdown$InlineParser$hrefRegex + ($pablohirafuji$elm_markdown$Markdown$Helpers$titleRegex + '\\s*\\)'))));
var $pablohirafuji$elm_markdown$Markdown$InlineParser$prepareUrlAndTitle = function (_v0) {
	var rawUrl = _v0.a;
	var maybeTitle = _v0.b;
	return _Utils_Tuple2(
		$pablohirafuji$elm_markdown$Markdown$InlineParser$encodeUrl(
			$pablohirafuji$elm_markdown$Markdown$Helpers$formatStr(rawUrl)),
		A2($elm$core$Maybe$map, $pablohirafuji$elm_markdown$Markdown$Helpers$formatStr, maybeTitle));
};
var $pablohirafuji$elm_markdown$Markdown$Helpers$returnFirstJust = function (maybes) {
	var process = F2(
		function (a, maybeFound) {
			if (!maybeFound.$) {
				var found = maybeFound.a;
				return $elm$core$Maybe$Just(found);
			} else {
				return a;
			}
		});
	return A3($elm$core$List$foldl, process, $elm$core$Maybe$Nothing, maybes);
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$inlineLinkTypeOrImageTypeRegexToMatch = F3(
	function (matchModel, model, regexMatch) {
		var _v0 = regexMatch.hx;
		if ((((_v0.b && _v0.b.b) && _v0.b.b.b) && _v0.b.b.b.b) && _v0.b.b.b.b.b) {
			var maybeRawUrlAngleBrackets = _v0.a;
			var _v1 = _v0.b;
			var maybeRawUrlWithoutBrackets = _v1.a;
			var _v2 = _v1.b;
			var maybeTitleSingleQuotes = _v2.a;
			var _v3 = _v2.b;
			var maybeTitleDoubleQuotes = _v3.a;
			var _v4 = _v3.b;
			var maybeTitleParenthesis = _v4.a;
			var maybeTitle = $pablohirafuji$elm_markdown$Markdown$Helpers$returnFirstJust(
				_List_fromArray(
					[maybeTitleSingleQuotes, maybeTitleDoubleQuotes, maybeTitleParenthesis]));
			var toMatch = function (rawUrl) {
				return _Utils_update(
					matchModel,
					{
						bx: matchModel.bx + $elm$core$String$length(regexMatch.fU),
						t: function () {
							var _v5 = matchModel.t;
							if (_v5.$ === 5) {
								return $pablohirafuji$elm_markdown$Markdown$InlineParser$ImageType;
							} else {
								return $pablohirafuji$elm_markdown$Markdown$InlineParser$LinkType;
							}
						}()(
							$pablohirafuji$elm_markdown$Markdown$InlineParser$prepareUrlAndTitle(
								_Utils_Tuple2(rawUrl, maybeTitle)))
					});
			};
			var maybeRawUrl = $pablohirafuji$elm_markdown$Markdown$Helpers$returnFirstJust(
				_List_fromArray(
					[maybeRawUrlAngleBrackets, maybeRawUrlWithoutBrackets]));
			return $elm$core$Maybe$Just(
				toMatch(
					A2($elm$core$Maybe$withDefault, '', maybeRawUrl)));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$checkForInlineLinkTypeOrImageType = function (_v0) {
	var remainText = _v0.a;
	var tempMatch = _v0.b;
	var model = _v0.c;
	return A2(
		$elm$core$Result$fromMaybe,
		_Utils_Tuple3(remainText, tempMatch, model),
		A2(
			$elm$core$Maybe$map,
			$pablohirafuji$elm_markdown$Markdown$InlineParser$addMatch(model),
			A2(
				$elm$core$Maybe$andThen,
				A2($pablohirafuji$elm_markdown$Markdown$InlineParser$inlineLinkTypeOrImageTypeRegexToMatch, tempMatch, model),
				$elm$core$List$head(
					A3($elm$regex$Regex$findAtMost, 1, $pablohirafuji$elm_markdown$Markdown$InlineParser$inlineLinkTypeOrImageTypeRegex, remainText)))));
};
var $pablohirafuji$elm_markdown$Markdown$Helpers$insideSquareBracketRegex = '[^\\[\\]\\\\]*(?:\\\\.[^\\[\\]\\\\]*)*';
var $pablohirafuji$elm_markdown$Markdown$InlineParser$refLabelRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^\\[\\s*(' + ($pablohirafuji$elm_markdown$Markdown$Helpers$insideSquareBracketRegex + ')\\s*\\]')));
var $pablohirafuji$elm_markdown$Markdown$Helpers$whitespacesRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('[' + ($pablohirafuji$elm_markdown$Markdown$Helpers$whiteSpaceChars + ']+')));
var $pablohirafuji$elm_markdown$Markdown$Helpers$cleanWhitespaces = A2(
	$elm$core$Basics$composeR,
	$elm$core$String$trim,
	A2(
		$elm$regex$Regex$replace,
		$pablohirafuji$elm_markdown$Markdown$Helpers$whitespacesRegex,
		function (_v0) {
			return ' ';
		}));
var $pablohirafuji$elm_markdown$Markdown$Helpers$prepareRefLabel = A2($elm$core$Basics$composeR, $pablohirafuji$elm_markdown$Markdown$Helpers$cleanWhitespaces, $elm$core$String$toLower);
var $pablohirafuji$elm_markdown$Markdown$InlineParser$refRegexToMatch = F3(
	function (matchModel, model, maybeRegexMatch) {
		var regexMatchLength = A2(
			$elm$core$Maybe$withDefault,
			0,
			A2(
				$elm$core$Maybe$map,
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.fU;
					},
					$elm$core$String$length),
				maybeRegexMatch));
		var toMatch = function (urlTitle) {
			return _Utils_update(
				matchModel,
				{
					bx: matchModel.bx + regexMatchLength,
					t: function () {
						var _v0 = matchModel.t;
						if (_v0.$ === 5) {
							return $pablohirafuji$elm_markdown$Markdown$InlineParser$ImageType;
						} else {
							return $pablohirafuji$elm_markdown$Markdown$InlineParser$LinkType;
						}
					}()(
						$pablohirafuji$elm_markdown$Markdown$InlineParser$prepareUrlAndTitle(urlTitle))
				});
		};
		var refLabel = function (str) {
			return $elm$core$String$isEmpty(str) ? matchModel.cH : str;
		}(
			A2(
				$elm$core$Maybe$withDefault,
				matchModel.cH,
				A2(
					$elm$core$Maybe$withDefault,
					$elm$core$Maybe$Nothing,
					A2(
						$elm$core$Maybe$withDefault,
						$elm$core$Maybe$Nothing,
						A2(
							$elm$core$Maybe$map,
							A2(
								$elm$core$Basics$composeR,
								function ($) {
									return $.hx;
								},
								$elm$core$List$head),
							maybeRegexMatch)))));
		var maybeRefItem = A2(
			$elm$core$Dict$get,
			$pablohirafuji$elm_markdown$Markdown$Helpers$prepareRefLabel(refLabel),
			model.bc);
		return A2($elm$core$Maybe$map, toMatch, maybeRefItem);
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$checkForRefLinkTypeOrImageType = function (_v0) {
	var remainText = _v0.a;
	var tempMatch = _v0.b;
	var model = _v0.c;
	return A2(
		$elm$core$Result$fromMaybe,
		_Utils_Tuple3(remainText, tempMatch, model),
		A2(
			$elm$core$Maybe$map,
			$pablohirafuji$elm_markdown$Markdown$InlineParser$addMatch(model),
			A3(
				$pablohirafuji$elm_markdown$Markdown$InlineParser$refRegexToMatch,
				tempMatch,
				model,
				$elm$core$List$head(
					A3($elm$regex$Regex$findAtMost, 1, $pablohirafuji$elm_markdown$Markdown$InlineParser$refLabelRegex, remainText)))));
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$checkParsedAheadOverlapping = function (parser) {
	var _v0 = parser.a;
	if (!_v0.b) {
		return $elm$core$Result$Err(0);
	} else {
		var match = _v0.a;
		var remainMatches = _v0.b;
		var overlappingMatches = A2(
			$elm$core$List$filter,
			function (_v1) {
				var testMatch = _v1;
				return (_Utils_cmp(match.bx, testMatch.bf) > 0) && (_Utils_cmp(match.bx, testMatch.bx) < 0);
			},
			remainMatches);
		return ($elm$core$List$isEmpty(remainMatches) || $elm$core$List$isEmpty(overlappingMatches)) ? $elm$core$Result$Ok(parser) : $elm$core$Result$Err(0);
	}
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$emailRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^([a-zA-Z0-9.!#$%&\'*+\\/=?^_`{|}~\\-]+@[a-zA-Z0-9](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?)*)$'));
var $pablohirafuji$elm_markdown$Markdown$InlineParser$emailAutolinkTypeToMatch = function (_v0) {
	var match = _v0;
	return A2($elm$regex$Regex$contains, $pablohirafuji$elm_markdown$Markdown$InlineParser$emailRegex, match.cH) ? $elm$core$Result$Ok(
		_Utils_update(
			match,
			{
				t: $pablohirafuji$elm_markdown$Markdown$InlineParser$AutolinkType(
					_Utils_Tuple2(
						match.cH,
						'mailto:' + $pablohirafuji$elm_markdown$Markdown$InlineParser$encodeUrl(match.cH)))
			})) : $elm$core$Result$Err(match);
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$filterTokens = F2(
	function (filter, model) {
		return _Utils_update(
			model,
			{
				g: A2($elm$core$List$filter, filter, model.g)
			});
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$findToken = F2(
	function (isToken, tokens) {
		var search = F2(
			function (token, _v2) {
				var maybeToken = _v2.a;
				var innerTokens = _v2.b;
				var remainTokens = _v2.c;
				if (maybeToken.$ === 1) {
					return isToken(token) ? _Utils_Tuple3(
						$elm$core$Maybe$Just(token),
						innerTokens,
						_List_Nil) : _Utils_Tuple3(
						$elm$core$Maybe$Nothing,
						A2($elm$core$List$cons, token, innerTokens),
						_List_Nil);
				} else {
					return _Utils_Tuple3(
						maybeToken,
						innerTokens,
						A2($elm$core$List$cons, token, remainTokens));
				}
			});
		var _return = function (_v0) {
			var maybeToken = _v0.a;
			var innerTokens = _v0.b;
			var remainTokens = _v0.c;
			return A2(
				$elm$core$Maybe$map,
				function (token) {
					return _Utils_Tuple3(
						token,
						$elm$core$List$reverse(innerTokens),
						$elm$core$List$reverse(remainTokens));
				},
				maybeToken);
		};
		return _return(
			A3(
				$elm$core$List$foldl,
				search,
				_Utils_Tuple3($elm$core$Maybe$Nothing, _List_Nil, _List_Nil),
				tokens));
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$HtmlModel = F2(
	function (tag, attributes) {
		return {Y: attributes, hG: tag};
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$HtmlToken = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$attributesFromRegex = function (regexMatch) {
	var _v0 = regexMatch.hx;
	_v0$2:
	while (true) {
		if (_v0.b && (!_v0.a.$)) {
			if (_v0.a.a === '') {
				return $elm$core$Maybe$Nothing;
			} else {
				if ((_v0.b.b && _v0.b.b.b) && _v0.b.b.b.b) {
					var name = _v0.a.a;
					var _v1 = _v0.b;
					var maybeDoubleQuotes = _v1.a;
					var _v2 = _v1.b;
					var maybeSingleQuotes = _v2.a;
					var _v3 = _v2.b;
					var maybeUnquoted = _v3.a;
					var maybeValue = $pablohirafuji$elm_markdown$Markdown$Helpers$returnFirstJust(
						_List_fromArray(
							[maybeDoubleQuotes, maybeSingleQuotes, maybeUnquoted]));
					return $elm$core$Maybe$Just(
						_Utils_Tuple2(name, maybeValue));
				} else {
					break _v0$2;
				}
			}
		} else {
			break _v0$2;
		}
	}
	return $elm$core$Maybe$Nothing;
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$htmlAttributesRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('([a-zA-Z:_][a-zA-Z0-9\\-_.:]*)(?: ?= ?(?:\"([^\"]*)\"|\'([^\']*)\'|([^\\s\"\'=<>`]*)))?'));
var $pablohirafuji$elm_markdown$Markdown$InlineParser$applyAttributesRegex = A2(
	$elm$core$Basics$composeR,
	$elm$regex$Regex$find($pablohirafuji$elm_markdown$Markdown$InlineParser$htmlAttributesRegex),
	$elm$core$List$filterMap($pablohirafuji$elm_markdown$Markdown$InlineParser$attributesFromRegex));
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$htmlFromRegex = F3(
	function (model, match, regexMatch) {
		var _v0 = regexMatch.hx;
		if ((((_v0.b && _v0.b.b) && (!_v0.b.a.$)) && _v0.b.b.b) && _v0.b.b.b.b) {
			var maybeClose = _v0.a;
			var _v1 = _v0.b;
			var tag = _v1.a.a;
			var _v2 = _v1.b;
			var maybeAttributes = _v2.a;
			var _v3 = _v2.b;
			var maybeSelfClosing = _v3.a;
			var updateModel = function (attrs) {
				return A2(
					$pablohirafuji$elm_markdown$Markdown$InlineParser$addToken,
					model,
					{
						fw: match.bf,
						b: match.bx - match.bf,
						e: A2(
							$pablohirafuji$elm_markdown$Markdown$InlineParser$HtmlToken,
							_Utils_eq(maybeClose, $elm$core$Maybe$Nothing) && _Utils_eq(maybeSelfClosing, $elm$core$Maybe$Nothing),
							A2($pablohirafuji$elm_markdown$Markdown$InlineParser$HtmlModel, tag, attrs))
					});
			};
			var filterAttributes = F2(
				function (attrs, allowed) {
					return A2(
						$elm$core$List$filter,
						function (attr) {
							return A2($elm$core$List$member, attr.a, allowed);
						},
						attrs);
				});
			var attributes = A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				A2($elm$core$Maybe$map, $pablohirafuji$elm_markdown$Markdown$InlineParser$applyAttributesRegex, maybeAttributes));
			var noAttributesInCloseTag = _Utils_eq(maybeClose, $elm$core$Maybe$Nothing) || ((!_Utils_eq(maybeClose, $elm$core$Maybe$Nothing)) && _Utils_eq(attributes, _List_Nil));
			var _v4 = model.b0.cd;
			switch (_v4.$) {
				case 0:
					return noAttributesInCloseTag ? $elm$core$Maybe$Just(
						updateModel(attributes)) : $elm$core$Maybe$Nothing;
				case 1:
					var allowedHtmlElements = _v4.a.bo;
					var allowedHtmlAttributes = _v4.a.bn;
					return (A2($elm$core$List$member, tag, allowedHtmlElements) && noAttributesInCloseTag) ? $elm$core$Maybe$Just(
						updateModel(
							A2(filterAttributes, attributes, allowedHtmlAttributes))) : $elm$core$Maybe$Nothing;
				default:
					return $elm$core$Maybe$Nothing;
			}
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$htmlRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^(\\/)?([a-zA-Z][a-zA-Z0-9\\-]*)(?:\\s+([^<>]*?))?(\\/)?$'));
var $pablohirafuji$elm_markdown$Markdown$InlineParser$htmlToToken = F2(
	function (model, _v0) {
		var match = _v0;
		var _v1 = model.b0.cd;
		if (_v1.$ === 2) {
			return $elm$core$Maybe$Nothing;
		} else {
			return A2(
				$elm$core$Maybe$andThen,
				A2($pablohirafuji$elm_markdown$Markdown$InlineParser$htmlFromRegex, model, match),
				$elm$core$List$head(
					A3($elm$regex$Regex$findAtMost, 1, $pablohirafuji$elm_markdown$Markdown$InlineParser$htmlRegex, match.cH)));
		}
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$isCloseToken = F2(
	function (htmlModel, token) {
		var _v0 = token.e;
		if ((_v0.$ === 5) && (!_v0.a)) {
			var htmlModel_ = _v0.b;
			return _Utils_eq(htmlModel.hG, htmlModel_.hG);
		} else {
			return false;
		}
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$isCodeTokenPair = F2(
	function (closeToken, openToken) {
		var _v0 = openToken.e;
		if (!_v0.$) {
			var isEscaped = _v0.a;
			return isEscaped ? _Utils_eq(openToken.b - 1, closeToken.b) : _Utils_eq(openToken.b, closeToken.b);
		} else {
			return false;
		}
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$isLinkTypeOrImageOpenToken = function (token) {
	var _v0 = token.e;
	switch (_v0.$) {
		case 1:
			return true;
		case 2:
			return true;
		default:
			return false;
	}
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$isOpenEmphasisToken = F2(
	function (closeToken, openToken) {
		var _v0 = openToken.e;
		if (_v0.$ === 6) {
			var openChar = _v0.a;
			var _v1 = _v0.b;
			var openLR = _v1.a;
			var openRR = _v1.b;
			var _v2 = closeToken.e;
			if (_v2.$ === 6) {
				var closeChar = _v2.a;
				var _v3 = _v2.b;
				var closeLR = _v3.a;
				var closeRR = _v3.b;
				return _Utils_eq(openChar, closeChar) ? ((_Utils_eq(openLR, openRR) || _Utils_eq(closeLR, closeRR)) ? (!(!A2($elm$core$Basics$modBy, 3, closeToken.b + openToken.b))) : true) : false;
			} else {
				return false;
			}
		} else {
			return false;
		}
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$voidHtmlTags = _List_fromArray(
	['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
var $pablohirafuji$elm_markdown$Markdown$InlineParser$isVoidTag = function (htmlModel) {
	return A2($elm$core$List$member, htmlModel.hG, $pablohirafuji$elm_markdown$Markdown$InlineParser$voidHtmlTags);
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakType = {$: 1};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$SoftLineBreakToken = {$: 7};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$reverseTokens = function (model) {
	return _Utils_update(
		model,
		{
			g: $elm$core$List$reverse(model.g)
		});
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$tokenToMatch = F2(
	function (token, type_) {
		return {bx: token.fw + token.b, a: _List_Nil, bf: token.fw, cH: '', ao: 0, J: 0, t: type_};
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$lineBreakTTM = function (_v0) {
	lineBreakTTM:
	while (true) {
		var tokens = _v0.a;
		var model = _v0.b;
		if (!tokens.b) {
			return $pablohirafuji$elm_markdown$Markdown$InlineParser$reverseTokens(model);
		} else {
			var token = tokens.a;
			var tokensTail = tokens.b;
			if (_Utils_eq(token.e, $pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakToken) || (_Utils_eq(token.e, $pablohirafuji$elm_markdown$Markdown$InlineParser$SoftLineBreakToken) && model.b0.cB)) {
				return $pablohirafuji$elm_markdown$Markdown$InlineParser$lineBreakTTM(
					function (b) {
						return _Utils_Tuple2(tokensTail, b);
					}(
						_Utils_update(
							model,
							{
								a: A2(
									$elm$core$List$cons,
									A2($pablohirafuji$elm_markdown$Markdown$InlineParser$tokenToMatch, token, $pablohirafuji$elm_markdown$Markdown$InlineParser$HardLineBreakType),
									model.a)
							})));
			} else {
				var $temp$_v0 = _Utils_Tuple2(
					tokensTail,
					A2($pablohirafuji$elm_markdown$Markdown$InlineParser$addToken, model, token));
				_v0 = $temp$_v0;
				continue lineBreakTTM;
			}
		}
	}
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$removeParsedAheadTokens = F2(
	function (tokensTail, parser) {
		var _v0 = parser.a;
		if (!_v0.b) {
			return _Utils_Tuple2(tokensTail, parser);
		} else {
			var match = _v0.a;
			return _Utils_Tuple2(
				A2(
					$elm$core$List$filter,
					function (token) {
						return _Utils_cmp(token.fw, match.bx) > -1;
					},
					tokensTail),
				parser);
		}
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$angleBracketsToMatch = F4(
	function (closeToken, isEscaped, model, _v24) {
		var openToken = _v24.a;
		var remainTokens = _v24.c;
		return function (result) {
			if (result.$ === 1) {
				var tempMatch = result.a;
				return (!isEscaped) ? A2(
					$pablohirafuji$elm_markdown$Markdown$InlineParser$htmlToToken,
					_Utils_update(
						model,
						{g: remainTokens}),
					tempMatch) : $elm$core$Result$toMaybe(result);
			} else {
				return $elm$core$Result$toMaybe(result);
			}
		}(
			A2(
				$elm$core$Result$map,
				function (newMatch) {
					return _Utils_update(
						model,
						{
							a: A2($elm$core$List$cons, newMatch, model.a),
							g: remainTokens
						});
				},
				A2(
					$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
					$pablohirafuji$elm_markdown$Markdown$InlineParser$emailAutolinkTypeToMatch,
					$pablohirafuji$elm_markdown$Markdown$InlineParser$autolinkToMatch(
						A6(
							$pablohirafuji$elm_markdown$Markdown$InlineParser$tokenPairToMatch,
							model,
							function (s) {
								return s;
							},
							$pablohirafuji$elm_markdown$Markdown$InlineParser$CodeType,
							openToken,
							closeToken,
							_List_Nil)))));
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$codeAutolinkTypeHtmlTagTTM = function (_v21) {
	codeAutolinkTypeHtmlTagTTM:
	while (true) {
		var tokens = _v21.a;
		var model = _v21.b;
		if (!tokens.b) {
			return $pablohirafuji$elm_markdown$Markdown$InlineParser$reverseTokens(model);
		} else {
			var token = tokens.a;
			var tokensTail = tokens.b;
			var _v23 = token.e;
			switch (_v23.$) {
				case 0:
					var isEscaped = _v23.a;
					return $pablohirafuji$elm_markdown$Markdown$InlineParser$codeAutolinkTypeHtmlTagTTM(
						function (b) {
							return _Utils_Tuple2(tokensTail, b);
						}(
							A2(
								$elm$core$Maybe$withDefault,
								A2($pablohirafuji$elm_markdown$Markdown$InlineParser$addToken, model, token),
								A2(
									$elm$core$Maybe$map,
									A2($pablohirafuji$elm_markdown$Markdown$InlineParser$codeToMatch, token, model),
									A2(
										$pablohirafuji$elm_markdown$Markdown$InlineParser$findToken,
										$pablohirafuji$elm_markdown$Markdown$InlineParser$isCodeTokenPair(token),
										model.g)))));
				case 4:
					var isEscaped = _v23.a;
					return $pablohirafuji$elm_markdown$Markdown$InlineParser$codeAutolinkTypeHtmlTagTTM(
						function (b) {
							return _Utils_Tuple2(tokensTail, b);
						}(
							A2(
								$pablohirafuji$elm_markdown$Markdown$InlineParser$filterTokens,
								A2(
									$elm$core$Basics$composeR,
									function ($) {
										return $.e;
									},
									$elm$core$Basics$neq(
										$pablohirafuji$elm_markdown$Markdown$InlineParser$CharToken('<'))),
								A2(
									$elm$core$Maybe$withDefault,
									model,
									A2(
										$elm$core$Maybe$andThen,
										A3($pablohirafuji$elm_markdown$Markdown$InlineParser$angleBracketsToMatch, token, isEscaped, model),
										A2(
											$pablohirafuji$elm_markdown$Markdown$InlineParser$findToken,
											A2(
												$elm$core$Basics$composeR,
												function ($) {
													return $.e;
												},
												$elm$core$Basics$eq(
													$pablohirafuji$elm_markdown$Markdown$InlineParser$CharToken('<'))),
											model.g))))));
				default:
					var $temp$_v21 = _Utils_Tuple2(
						tokensTail,
						A2($pablohirafuji$elm_markdown$Markdown$InlineParser$addToken, model, token));
					_v21 = $temp$_v21;
					continue codeAutolinkTypeHtmlTagTTM;
			}
		}
	}
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$codeToMatch = F3(
	function (closeToken, model, _v20) {
		var openToken = _v20.a;
		var remainTokens = _v20.c;
		var updtOpenToken = _Utils_eq(
			openToken.e,
			$pablohirafuji$elm_markdown$Markdown$InlineParser$CodeToken(true)) ? _Utils_update(
			openToken,
			{fw: openToken.fw + 1, b: openToken.b - 1}) : openToken;
		return _Utils_update(
			model,
			{
				a: A2(
					$elm$core$List$cons,
					A6($pablohirafuji$elm_markdown$Markdown$InlineParser$tokenPairToMatch, model, $pablohirafuji$elm_markdown$Markdown$Helpers$cleanWhitespaces, $pablohirafuji$elm_markdown$Markdown$InlineParser$CodeType, updtOpenToken, closeToken, _List_Nil),
					model.a),
				g: remainTokens
			});
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$emphasisTTM = function (_v16) {
	emphasisTTM:
	while (true) {
		var tokens = _v16.a;
		var model = _v16.b;
		if (!tokens.b) {
			return $pablohirafuji$elm_markdown$Markdown$InlineParser$reverseTokens(model);
		} else {
			var token = tokens.a;
			var tokensTail = tokens.b;
			var _v18 = token.e;
			if (_v18.$ === 6) {
				var _char = _v18.a;
				var _v19 = _v18.b;
				var leftRank = _v19.a;
				var rightRank = _v19.b;
				if (_Utils_eq(leftRank, rightRank)) {
					if ((!(!rightRank)) && ((_char !== '_') || (rightRank === 1))) {
						return $pablohirafuji$elm_markdown$Markdown$InlineParser$emphasisTTM(
							A2(
								$elm$core$Maybe$withDefault,
								_Utils_Tuple2(
									tokensTail,
									A2($pablohirafuji$elm_markdown$Markdown$InlineParser$addToken, model, token)),
								A2(
									$elm$core$Maybe$map,
									A3($pablohirafuji$elm_markdown$Markdown$InlineParser$emphasisToMatch, token, tokensTail, model),
									A2(
										$pablohirafuji$elm_markdown$Markdown$InlineParser$findToken,
										$pablohirafuji$elm_markdown$Markdown$InlineParser$isOpenEmphasisToken(token),
										model.g))));
					} else {
						var $temp$_v16 = _Utils_Tuple2(tokensTail, model);
						_v16 = $temp$_v16;
						continue emphasisTTM;
					}
				} else {
					if (_Utils_cmp(leftRank, rightRank) < 0) {
						var $temp$_v16 = _Utils_Tuple2(
							tokensTail,
							A2($pablohirafuji$elm_markdown$Markdown$InlineParser$addToken, model, token));
						_v16 = $temp$_v16;
						continue emphasisTTM;
					} else {
						return $pablohirafuji$elm_markdown$Markdown$InlineParser$emphasisTTM(
							A2(
								$elm$core$Maybe$withDefault,
								_Utils_Tuple2(tokensTail, model),
								A2(
									$elm$core$Maybe$map,
									A3($pablohirafuji$elm_markdown$Markdown$InlineParser$emphasisToMatch, token, tokensTail, model),
									A2(
										$pablohirafuji$elm_markdown$Markdown$InlineParser$findToken,
										$pablohirafuji$elm_markdown$Markdown$InlineParser$isOpenEmphasisToken(token),
										model.g))));
					}
				}
			} else {
				var $temp$_v16 = _Utils_Tuple2(
					tokensTail,
					A2($pablohirafuji$elm_markdown$Markdown$InlineParser$addToken, model, token));
				_v16 = $temp$_v16;
				continue emphasisTTM;
			}
		}
	}
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$emphasisToMatch = F4(
	function (closeToken, tokensTail, model, _v15) {
		var openToken = _v15.a;
		var innerTokens = _v15.b;
		var remainTokens = _v15.c;
		var remainLength = openToken.b - closeToken.b;
		var updt = (!remainLength) ? {aG: closeToken, av: openToken, aQ: remainTokens, aU: tokensTail} : ((remainLength > 0) ? {
			aG: closeToken,
			av: _Utils_update(
				openToken,
				{fw: openToken.fw + remainLength, b: closeToken.b}),
			aQ: A2(
				$elm$core$List$cons,
				_Utils_update(
					openToken,
					{b: remainLength}),
				remainTokens),
			aU: tokensTail
		} : {
			aG: _Utils_update(
				closeToken,
				{b: openToken.b}),
			av: openToken,
			aQ: remainTokens,
			aU: A2(
				$elm$core$List$cons,
				_Utils_update(
					closeToken,
					{fw: closeToken.fw + openToken.b, b: -remainLength}),
				tokensTail)
		});
		var match = A6(
			$pablohirafuji$elm_markdown$Markdown$InlineParser$tokenPairToMatch,
			model,
			function (s) {
				return s;
			},
			$pablohirafuji$elm_markdown$Markdown$InlineParser$EmphasisType(updt.av.b),
			updt.av,
			updt.aG,
			$elm$core$List$reverse(innerTokens));
		return _Utils_Tuple2(
			updt.aU,
			_Utils_update(
				model,
				{
					a: A2($elm$core$List$cons, match, model.a),
					g: updt.aQ
				}));
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$htmlElementTTM = function (_v12) {
	htmlElementTTM:
	while (true) {
		var tokens = _v12.a;
		var model = _v12.b;
		if (!tokens.b) {
			return $pablohirafuji$elm_markdown$Markdown$InlineParser$reverseTokens(model);
		} else {
			var token = tokens.a;
			var tokensTail = tokens.b;
			var _v14 = token.e;
			if (_v14.$ === 5) {
				var isOpen = _v14.a;
				var htmlModel = _v14.b;
				return ($pablohirafuji$elm_markdown$Markdown$InlineParser$isVoidTag(htmlModel) || (!isOpen)) ? $pablohirafuji$elm_markdown$Markdown$InlineParser$htmlElementTTM(
					function (b) {
						return _Utils_Tuple2(tokensTail, b);
					}(
						A2(
							$pablohirafuji$elm_markdown$Markdown$InlineParser$addMatch,
							model,
							A2(
								$pablohirafuji$elm_markdown$Markdown$InlineParser$tokenToMatch,
								token,
								$pablohirafuji$elm_markdown$Markdown$InlineParser$HtmlType(htmlModel))))) : $pablohirafuji$elm_markdown$Markdown$InlineParser$htmlElementTTM(
					A2(
						$elm$core$Maybe$withDefault,
						function (b) {
							return _Utils_Tuple2(tokensTail, b);
						}(
							A2(
								$pablohirafuji$elm_markdown$Markdown$InlineParser$addMatch,
								model,
								A2(
									$pablohirafuji$elm_markdown$Markdown$InlineParser$tokenToMatch,
									token,
									$pablohirafuji$elm_markdown$Markdown$InlineParser$HtmlType(htmlModel)))),
						A2(
							$elm$core$Maybe$map,
							A3($pablohirafuji$elm_markdown$Markdown$InlineParser$htmlElementToMatch, token, model, htmlModel),
							A2(
								$pablohirafuji$elm_markdown$Markdown$InlineParser$findToken,
								$pablohirafuji$elm_markdown$Markdown$InlineParser$isCloseToken(htmlModel),
								tokensTail))));
			} else {
				var $temp$_v12 = _Utils_Tuple2(
					tokensTail,
					A2($pablohirafuji$elm_markdown$Markdown$InlineParser$addToken, model, token));
				_v12 = $temp$_v12;
				continue htmlElementTTM;
			}
		}
	}
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$htmlElementToMatch = F4(
	function (openToken, model, htmlModel, _v11) {
		var closeToken = _v11.a;
		var innerTokens = _v11.b;
		var remainTokens = _v11.c;
		return _Utils_Tuple2(
			remainTokens,
			_Utils_update(
				model,
				{
					a: A2(
						$elm$core$List$cons,
						A6(
							$pablohirafuji$elm_markdown$Markdown$InlineParser$tokenPairToMatch,
							model,
							function (s) {
								return s;
							},
							$pablohirafuji$elm_markdown$Markdown$InlineParser$HtmlType(htmlModel),
							openToken,
							closeToken,
							innerTokens),
						model.a)
				}));
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$linkImageTypeTTM = function (_v8) {
	linkImageTypeTTM:
	while (true) {
		var tokens = _v8.a;
		var model = _v8.b;
		if (!tokens.b) {
			return $pablohirafuji$elm_markdown$Markdown$InlineParser$reverseTokens(model);
		} else {
			var token = tokens.a;
			var tokensTail = tokens.b;
			var _v10 = token.e;
			if ((_v10.$ === 3) && (']' === _v10.a)) {
				return $pablohirafuji$elm_markdown$Markdown$InlineParser$linkImageTypeTTM(
					A2(
						$elm$core$Maybe$withDefault,
						_Utils_Tuple2(tokensTail, model),
						A2(
							$elm$core$Maybe$andThen,
							A3($pablohirafuji$elm_markdown$Markdown$InlineParser$linkOrImageTypeToMatch, token, tokensTail, model),
							A2($pablohirafuji$elm_markdown$Markdown$InlineParser$findToken, $pablohirafuji$elm_markdown$Markdown$InlineParser$isLinkTypeOrImageOpenToken, model.g))));
			} else {
				var $temp$_v8 = _Utils_Tuple2(
					tokensTail,
					A2($pablohirafuji$elm_markdown$Markdown$InlineParser$addToken, model, token));
				_v8 = $temp$_v8;
				continue linkImageTypeTTM;
			}
		}
	}
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$linkOrImageTypeToMatch = F4(
	function (closeToken, tokensTail, model, _v1) {
		var openToken = _v1.a;
		var innerTokens = _v1.b;
		var remainTokens = _v1.c;
		var tempMatch = function (isLinkType) {
			return A6(
				$pablohirafuji$elm_markdown$Markdown$InlineParser$tokenPairToMatch,
				model,
				function (s) {
					return s;
				},
				isLinkType ? $pablohirafuji$elm_markdown$Markdown$InlineParser$LinkType(
					_Utils_Tuple2('', $elm$core$Maybe$Nothing)) : $pablohirafuji$elm_markdown$Markdown$InlineParser$ImageType(
					_Utils_Tuple2('', $elm$core$Maybe$Nothing)),
				openToken,
				closeToken,
				$elm$core$List$reverse(innerTokens));
		};
		var removeOpenToken = _Utils_Tuple2(
			tokensTail,
			_Utils_update(
				model,
				{
					g: _Utils_ap(innerTokens, remainTokens)
				}));
		var remainText = A2($elm$core$String$dropLeft, closeToken.fw + 1, model.v);
		var linkOpenTokenToInactive = function (model_) {
			var process = function (token) {
				var _v7 = token.e;
				if (_v7.$ === 1) {
					return _Utils_update(
						token,
						{
							e: $pablohirafuji$elm_markdown$Markdown$InlineParser$LinkOpenToken(false)
						});
				} else {
					return token;
				}
			};
			return _Utils_update(
				model_,
				{
					g: A2($elm$core$List$map, process, model_.g)
				});
		};
		var args = function (isLinkType) {
			return _Utils_Tuple3(
				remainText,
				tempMatch(isLinkType),
				_Utils_update(
					model,
					{g: remainTokens}));
		};
		var _v2 = openToken.e;
		switch (_v2.$) {
			case 2:
				return $elm$core$Result$toMaybe(
					A2(
						$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
						function (_v4) {
							return $elm$core$Result$Ok(removeOpenToken);
						},
						A2(
							$elm$core$Result$map,
							$pablohirafuji$elm_markdown$Markdown$InlineParser$removeParsedAheadTokens(tokensTail),
							A2(
								$elm$core$Result$andThen,
								$pablohirafuji$elm_markdown$Markdown$InlineParser$checkParsedAheadOverlapping,
								A2(
									$elm$core$Result$mapError,
									function (_v3) {
										return 0;
									},
									A2(
										$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
										$pablohirafuji$elm_markdown$Markdown$InlineParser$checkForRefLinkTypeOrImageType,
										$pablohirafuji$elm_markdown$Markdown$InlineParser$checkForInlineLinkTypeOrImageType(
											args(false))))))));
			case 1:
				if (_v2.a) {
					return $elm$core$Result$toMaybe(
						A2(
							$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
							function (_v6) {
								return $elm$core$Result$Ok(removeOpenToken);
							},
							A2(
								$elm$core$Result$map,
								$pablohirafuji$elm_markdown$Markdown$InlineParser$removeParsedAheadTokens(tokensTail),
								A2(
									$elm$core$Result$map,
									linkOpenTokenToInactive,
									A2(
										$elm$core$Result$andThen,
										$pablohirafuji$elm_markdown$Markdown$InlineParser$checkParsedAheadOverlapping,
										A2(
											$elm$core$Result$mapError,
											function (_v5) {
												return 0;
											},
											A2(
												$pablohirafuji$elm_markdown$Markdown$Helpers$ifError,
												$pablohirafuji$elm_markdown$Markdown$InlineParser$checkForRefLinkTypeOrImageType,
												$pablohirafuji$elm_markdown$Markdown$InlineParser$checkForInlineLinkTypeOrImageType(
													args(true)))))))));
				} else {
					return $elm$core$Maybe$Just(removeOpenToken);
				}
			default:
				return $elm$core$Maybe$Nothing;
		}
	});
var $pablohirafuji$elm_markdown$Markdown$InlineParser$tokenPairToMatch = F6(
	function (model, processText, type_, openToken, closeToken, innerTokens) {
		var textStart = openToken.fw + openToken.b;
		var textEnd = closeToken.fw;
		var start = openToken.fw;
		var end = closeToken.fw + closeToken.b;
		var match = {
			bx: end,
			a: _List_Nil,
			bf: start,
			cH: processText(
				A3($elm$core$String$slice, textStart, textEnd, model.v)),
			ao: textEnd,
			J: textStart,
			t: type_
		};
		var matches = A2(
			$elm$core$List$map,
			function (_v0) {
				var matchModel = _v0;
				return A2($pablohirafuji$elm_markdown$Markdown$InlineParser$prepareChildMatch, match, matchModel);
			},
			$pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$tokensToMatches()(
				_Utils_update(
					model,
					{a: _List_Nil, g: innerTokens})).a);
		return _Utils_update(
			match,
			{a: matches});
	});
function $pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$tokensToMatches() {
	return A2(
		$elm$core$Basics$composeR,
		$pablohirafuji$elm_markdown$Markdown$InlineParser$applyTTM($pablohirafuji$elm_markdown$Markdown$InlineParser$codeAutolinkTypeHtmlTagTTM),
		A2(
			$elm$core$Basics$composeR,
			$pablohirafuji$elm_markdown$Markdown$InlineParser$applyTTM($pablohirafuji$elm_markdown$Markdown$InlineParser$htmlElementTTM),
			A2(
				$elm$core$Basics$composeR,
				$pablohirafuji$elm_markdown$Markdown$InlineParser$applyTTM($pablohirafuji$elm_markdown$Markdown$InlineParser$linkImageTypeTTM),
				A2(
					$elm$core$Basics$composeR,
					$pablohirafuji$elm_markdown$Markdown$InlineParser$applyTTM($pablohirafuji$elm_markdown$Markdown$InlineParser$emphasisTTM),
					$pablohirafuji$elm_markdown$Markdown$InlineParser$applyTTM($pablohirafuji$elm_markdown$Markdown$InlineParser$lineBreakTTM)))));
}
var $pablohirafuji$elm_markdown$Markdown$InlineParser$tokensToMatches = $pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$tokensToMatches();
$pablohirafuji$elm_markdown$Markdown$InlineParser$cyclic$tokensToMatches = function () {
	return $pablohirafuji$elm_markdown$Markdown$InlineParser$tokensToMatches;
};
var $pablohirafuji$elm_markdown$Markdown$InlineParser$parse = F3(
	function (options, refs, rawText) {
		return $pablohirafuji$elm_markdown$Markdown$InlineParser$matchesToInlines(
			$pablohirafuji$elm_markdown$Markdown$InlineParser$parseText(
				$pablohirafuji$elm_markdown$Markdown$InlineParser$organizeParserMatches(
					$pablohirafuji$elm_markdown$Markdown$InlineParser$tokensToMatches(
						$pablohirafuji$elm_markdown$Markdown$InlineParser$tokenize(
							A3(
								$pablohirafuji$elm_markdown$Markdown$InlineParser$initParser,
								options,
								refs,
								$elm$core$String$trim(rawText)))))).a);
	});
var $pablohirafuji$elm_markdown$Markdown$Block$parseInline = F4(
	function (maybeOptions, textAsParagraph, refs, block) {
		var options = A2($elm$core$Maybe$withDefault, $pablohirafuji$elm_markdown$Markdown$Config$defaultOptions, maybeOptions);
		switch (block.$) {
			case 2:
				var rawText = block.a;
				var lvl = block.b;
				return A3(
					$pablohirafuji$elm_markdown$Markdown$Block$Heading,
					rawText,
					lvl,
					A3($pablohirafuji$elm_markdown$Markdown$InlineParser$parse, options, refs, rawText));
			case 4:
				var rawText = block.a;
				var inlines = A3($pablohirafuji$elm_markdown$Markdown$InlineParser$parse, options, refs, rawText);
				if ((inlines.b && (inlines.a.$ === 5)) && (!inlines.b.b)) {
					var _v3 = inlines.a;
					return $pablohirafuji$elm_markdown$Markdown$Block$PlainInlines(inlines);
				} else {
					return textAsParagraph ? A2($pablohirafuji$elm_markdown$Markdown$Block$Paragraph, rawText, inlines) : $pablohirafuji$elm_markdown$Markdown$Block$PlainInlines(inlines);
				}
			case 5:
				var blocks = block.a;
				return $pablohirafuji$elm_markdown$Markdown$Block$BlockQuote(
					A3(
						$pablohirafuji$elm_markdown$Markdown$Block$parseInlines,
						maybeOptions,
						true,
						_Utils_Tuple2(refs, blocks)));
			case 6:
				var model = block.a;
				var items = block.b;
				return A2(
					$pablohirafuji$elm_markdown$Markdown$Block$List,
					model,
					function (a) {
						return A2($elm$core$List$map, a, items);
					}(
						A2(
							$elm$core$Basics$composeL,
							A2($pablohirafuji$elm_markdown$Markdown$Block$parseInlines, maybeOptions, model.T),
							function (b) {
								return _Utils_Tuple2(refs, b);
							})));
			case 8:
				var customBlock = block.a;
				var blocks = block.b;
				return A2(
					$pablohirafuji$elm_markdown$Markdown$Block$Custom,
					customBlock,
					A3(
						$pablohirafuji$elm_markdown$Markdown$Block$parseInlines,
						maybeOptions,
						true,
						_Utils_Tuple2(refs, blocks)));
			default:
				return block;
		}
	});
var $pablohirafuji$elm_markdown$Markdown$Block$parseInlines = F3(
	function (maybeOptions, textAsParagraph, _v0) {
		var refs = _v0.a;
		var blocks = _v0.b;
		return A2(
			$elm$core$List$map,
			A3($pablohirafuji$elm_markdown$Markdown$Block$parseInline, maybeOptions, textAsParagraph, refs),
			blocks);
	});
var $pablohirafuji$elm_markdown$Markdown$Block$dropRefString = F2(
	function (rawText, inlineMatch) {
		var strippedText = A2($elm$core$String$dropLeft, inlineMatch.a5, rawText);
		return A2($elm$regex$Regex$contains, $pablohirafuji$elm_markdown$Markdown$Block$blankLineRegex, strippedText) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(strippedText);
	});
var $pablohirafuji$elm_markdown$Markdown$Block$insertLinkMatch = F2(
	function (refs, linkMatch) {
		return A2($elm$core$Dict$member, linkMatch.ab, refs) ? refs : A3(
			$elm$core$Dict$insert,
			linkMatch.ab,
			_Utils_Tuple2(linkMatch.X, linkMatch.a6),
			refs);
	});
var $pablohirafuji$elm_markdown$Markdown$Block$extractUrlTitleRegex = function (regexMatch) {
	var _v0 = regexMatch.hx;
	if ((((((_v0.b && (!_v0.a.$)) && _v0.b.b) && _v0.b.b.b) && _v0.b.b.b.b) && _v0.b.b.b.b.b) && _v0.b.b.b.b.b.b) {
		var rawText = _v0.a.a;
		var _v1 = _v0.b;
		var maybeRawUrlAngleBrackets = _v1.a;
		var _v2 = _v1.b;
		var maybeRawUrlWithoutBrackets = _v2.a;
		var _v3 = _v2.b;
		var maybeTitleSingleQuotes = _v3.a;
		var _v4 = _v3.b;
		var maybeTitleDoubleQuotes = _v4.a;
		var _v5 = _v4.b;
		var maybeTitleParenthesis = _v5.a;
		var toReturn = function (rawUrl) {
			return {
				ab: rawText,
				a5: $elm$core$String$length(regexMatch.fU),
				a6: $pablohirafuji$elm_markdown$Markdown$Helpers$returnFirstJust(
					_List_fromArray(
						[maybeTitleSingleQuotes, maybeTitleDoubleQuotes, maybeTitleParenthesis])),
				X: rawUrl
			};
		};
		var maybeRawUrl = $pablohirafuji$elm_markdown$Markdown$Helpers$returnFirstJust(
			_List_fromArray(
				[maybeRawUrlAngleBrackets, maybeRawUrlWithoutBrackets]));
		return A2($elm$core$Maybe$map, toReturn, maybeRawUrl);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $pablohirafuji$elm_markdown$Markdown$Block$hrefRegex = '\\s*(?:<([^<>\\s]*)>|([^\\s]*))';
var $pablohirafuji$elm_markdown$Markdown$Block$refRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('^\\s*\\[(' + ($pablohirafuji$elm_markdown$Markdown$Helpers$insideSquareBracketRegex + (')\\]:' + ($pablohirafuji$elm_markdown$Markdown$Block$hrefRegex + ($pablohirafuji$elm_markdown$Markdown$Helpers$titleRegex + '\\s*(?![^\\n])'))))));
var $pablohirafuji$elm_markdown$Markdown$Block$maybeLinkMatch = function (rawText) {
	return A2(
		$elm$core$Maybe$andThen,
		function (linkMatch) {
			return ((linkMatch.X === '') || (linkMatch.ab === '')) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(linkMatch);
		},
		A2(
			$elm$core$Maybe$map,
			function (linkMatch) {
				return _Utils_update(
					linkMatch,
					{
						ab: $pablohirafuji$elm_markdown$Markdown$Helpers$prepareRefLabel(linkMatch.ab)
					});
			},
			A2(
				$elm$core$Maybe$andThen,
				$pablohirafuji$elm_markdown$Markdown$Block$extractUrlTitleRegex,
				$elm$core$List$head(
					A3($elm$regex$Regex$findAtMost, 1, $pablohirafuji$elm_markdown$Markdown$Block$refRegex, rawText)))));
};
var $pablohirafuji$elm_markdown$Markdown$Block$parseReference = F2(
	function (refs, rawText) {
		parseReference:
		while (true) {
			var _v0 = $pablohirafuji$elm_markdown$Markdown$Block$maybeLinkMatch(rawText);
			if (!_v0.$) {
				var linkMatch = _v0.a;
				var updtRefs = A2($pablohirafuji$elm_markdown$Markdown$Block$insertLinkMatch, refs, linkMatch);
				var maybeStrippedText = A2($pablohirafuji$elm_markdown$Markdown$Block$dropRefString, rawText, linkMatch);
				if (!maybeStrippedText.$) {
					var strippedText = maybeStrippedText.a;
					var $temp$refs = updtRefs,
						$temp$rawText = strippedText;
					refs = $temp$refs;
					rawText = $temp$rawText;
					continue parseReference;
				} else {
					return _Utils_Tuple2(updtRefs, $elm$core$Maybe$Nothing);
				}
			} else {
				return _Utils_Tuple2(
					refs,
					$elm$core$Maybe$Just(rawText));
			}
		}
	});
var $pablohirafuji$elm_markdown$Markdown$Block$parseReferences = function (refs) {
	return A2(
		$elm$core$List$foldl,
		$pablohirafuji$elm_markdown$Markdown$Block$parseReferencesHelp,
		_Utils_Tuple2(refs, _List_Nil));
};
var $pablohirafuji$elm_markdown$Markdown$Block$parseReferencesHelp = F2(
	function (block, _v0) {
		var refs = _v0.a;
		var parsedAST = _v0.b;
		switch (block.$) {
			case 4:
				var rawText = block.a;
				var _v2 = A2($pablohirafuji$elm_markdown$Markdown$Block$parseReference, $elm$core$Dict$empty, rawText);
				var paragraphRefs = _v2.a;
				var maybeUpdtText = _v2.b;
				var updtRefs = A2($elm$core$Dict$union, paragraphRefs, refs);
				if (!maybeUpdtText.$) {
					var updtText = maybeUpdtText.a;
					return _Utils_Tuple2(
						updtRefs,
						A2(
							$elm$core$List$cons,
							A2($pablohirafuji$elm_markdown$Markdown$Block$Paragraph, updtText, _List_Nil),
							parsedAST));
				} else {
					return _Utils_Tuple2(updtRefs, parsedAST);
				}
			case 6:
				var model = block.a;
				var items = block.b;
				var _v4 = A3(
					$elm$core$List$foldl,
					F2(
						function (item, _v5) {
							var refs__ = _v5.a;
							var parsedItems = _v5.b;
							return A2(
								$elm$core$Tuple$mapSecond,
								function (a) {
									return A2($elm$core$List$cons, a, parsedItems);
								},
								A2($pablohirafuji$elm_markdown$Markdown$Block$parseReferences, refs__, item));
						}),
					_Utils_Tuple2(refs, _List_Nil),
					items);
				var updtRefs = _v4.a;
				var updtItems = _v4.b;
				return _Utils_Tuple2(
					updtRefs,
					A2(
						$elm$core$List$cons,
						A2($pablohirafuji$elm_markdown$Markdown$Block$List, model, updtItems),
						parsedAST));
			case 5:
				var blocks = block.a;
				return A2(
					$elm$core$Tuple$mapSecond,
					function (a) {
						return A2($elm$core$List$cons, a, parsedAST);
					},
					A2(
						$elm$core$Tuple$mapSecond,
						$pablohirafuji$elm_markdown$Markdown$Block$BlockQuote,
						A2($pablohirafuji$elm_markdown$Markdown$Block$parseReferences, refs, blocks)));
			case 8:
				var customBlock = block.a;
				var blocks = block.b;
				return A2(
					$elm$core$Tuple$mapSecond,
					function (a) {
						return A2($elm$core$List$cons, a, parsedAST);
					},
					A2(
						$elm$core$Tuple$mapSecond,
						$pablohirafuji$elm_markdown$Markdown$Block$Custom(customBlock),
						A2($pablohirafuji$elm_markdown$Markdown$Block$parseReferences, refs, blocks)));
			default:
				return _Utils_Tuple2(
					refs,
					A2($elm$core$List$cons, block, parsedAST));
		}
	});
var $pablohirafuji$elm_markdown$Markdown$Block$parse = function (maybeOptions) {
	return A2(
		$elm$core$Basics$composeR,
		$elm$core$String$lines,
		A2(
			$elm$core$Basics$composeR,
			function (a) {
				return A2($pablohirafuji$elm_markdown$Markdown$Block$incorporateLines, a, _List_Nil);
			},
			A2(
				$elm$core$Basics$composeR,
				$pablohirafuji$elm_markdown$Markdown$Block$parseReferences($elm$core$Dict$empty),
				A2($pablohirafuji$elm_markdown$Markdown$Block$parseInlines, maybeOptions, true))));
};
var $elm$html$Html$blockquote = _VirtualDom_node('blockquote');
var $elm$html$Html$code = _VirtualDom_node('code');
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $elm$html$Html$h4 = _VirtualDom_node('h4');
var $elm$html$Html$h5 = _VirtualDom_node('h5');
var $elm$html$Html$h6 = _VirtualDom_node('h6');
var $elm$html$Html$hr = _VirtualDom_node('hr');
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$html$Html$ol = _VirtualDom_node('ol');
var $elm$html$Html$pre = _VirtualDom_node('pre');
var $elm$html$Html$Attributes$start = function (n) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'start',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$a = _VirtualDom_node('a');
var $pablohirafuji$elm_markdown$Markdown$Inline$attributeToAttribute = function (_v0) {
	var name = _v0.a;
	var maybeValue = _v0.b;
	return A2(
		$elm$html$Html$Attributes$attribute,
		name,
		A2($elm$core$Maybe$withDefault, name, maybeValue));
};
var $pablohirafuji$elm_markdown$Markdown$Inline$attributesToHtmlAttributes = $elm$core$List$map($pablohirafuji$elm_markdown$Markdown$Inline$attributeToAttribute);
var $elm$html$Html$br = _VirtualDom_node('br');
var $elm$html$Html$em = _VirtualDom_node('em');
var $pablohirafuji$elm_markdown$Markdown$Inline$extractText = function (inlines) {
	return A3($elm$core$List$foldl, $pablohirafuji$elm_markdown$Markdown$Inline$extractTextHelp, '', inlines);
};
var $pablohirafuji$elm_markdown$Markdown$Inline$extractTextHelp = F2(
	function (inline, text) {
		switch (inline.$) {
			case 0:
				var str = inline.a;
				return _Utils_ap(text, str);
			case 1:
				return text + ' ';
			case 2:
				var str = inline.a;
				return _Utils_ap(text, str);
			case 3:
				var inlines = inline.c;
				return _Utils_ap(
					text,
					$pablohirafuji$elm_markdown$Markdown$Inline$extractText(inlines));
			case 4:
				var inlines = inline.c;
				return _Utils_ap(
					text,
					$pablohirafuji$elm_markdown$Markdown$Inline$extractText(inlines));
			case 5:
				var inlines = inline.c;
				return _Utils_ap(
					text,
					$pablohirafuji$elm_markdown$Markdown$Inline$extractText(inlines));
			case 6:
				var inlines = inline.b;
				return _Utils_ap(
					text,
					$pablohirafuji$elm_markdown$Markdown$Inline$extractText(inlines));
			default:
				var inlines = inline.b;
				return _Utils_ap(
					text,
					$pablohirafuji$elm_markdown$Markdown$Inline$extractText(inlines));
		}
	});
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $elm$html$Html$strong = _VirtualDom_node('strong');
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $pablohirafuji$elm_markdown$Markdown$Inline$defaultHtml = F2(
	function (customTransformer, inline) {
		var transformer = A2(
			$elm$core$Maybe$withDefault,
			$pablohirafuji$elm_markdown$Markdown$Inline$defaultHtml($elm$core$Maybe$Nothing),
			customTransformer);
		switch (inline.$) {
			case 0:
				var str = inline.a;
				return $elm$html$Html$text(str);
			case 1:
				return A2($elm$html$Html$br, _List_Nil, _List_Nil);
			case 2:
				var codeStr = inline.a;
				return A2(
					$elm$html$Html$code,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(codeStr)
						]));
			case 3:
				var url = inline.a;
				var maybeTitle = inline.b;
				var inlines = inline.c;
				if (!maybeTitle.$) {
					var title_ = maybeTitle.a;
					return A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$href(url),
								$elm$html$Html$Attributes$title(title_)
							]),
						A2($elm$core$List$map, transformer, inlines));
				} else {
					return A2(
						$elm$html$Html$a,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$href(url)
							]),
						A2($elm$core$List$map, transformer, inlines));
				}
			case 4:
				var url = inline.a;
				var maybeTitle = inline.b;
				var inlines = inline.c;
				if (!maybeTitle.$) {
					var title_ = maybeTitle.a;
					return A2(
						$elm$html$Html$img,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$alt(
								$pablohirafuji$elm_markdown$Markdown$Inline$extractText(inlines)),
								$elm$html$Html$Attributes$src(url),
								$elm$html$Html$Attributes$title(title_)
							]),
						_List_Nil);
				} else {
					return A2(
						$elm$html$Html$img,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$alt(
								$pablohirafuji$elm_markdown$Markdown$Inline$extractText(inlines)),
								$elm$html$Html$Attributes$src(url)
							]),
						_List_Nil);
				}
			case 5:
				var tag = inline.a;
				var attrs = inline.b;
				var inlines = inline.c;
				return A3(
					$elm$html$Html$node,
					tag,
					$pablohirafuji$elm_markdown$Markdown$Inline$attributesToHtmlAttributes(attrs),
					A2($elm$core$List$map, transformer, inlines));
			case 6:
				var length = inline.a;
				var inlines = inline.b;
				switch (length) {
					case 1:
						return A2(
							$elm$html$Html$em,
							_List_Nil,
							A2($elm$core$List$map, transformer, inlines));
					case 2:
						return A2(
							$elm$html$Html$strong,
							_List_Nil,
							A2($elm$core$List$map, transformer, inlines));
					default:
						return ((length - 2) > 0) ? A2(
							$elm$html$Html$strong,
							_List_Nil,
							function (a) {
								return A2($elm$core$List$cons, a, _List_Nil);
							}(
								transformer(
									A2($pablohirafuji$elm_markdown$Markdown$Inline$Emphasis, length - 2, inlines)))) : A2(
							$elm$html$Html$em,
							_List_Nil,
							A2($elm$core$List$map, transformer, inlines));
				}
			default:
				var inlines = inline.b;
				return $elm$html$Html$text('');
		}
	});
var $pablohirafuji$elm_markdown$Markdown$Inline$toHtml = $pablohirafuji$elm_markdown$Markdown$Inline$defaultHtml($elm$core$Maybe$Nothing);
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $pablohirafuji$elm_markdown$Markdown$Block$defaultHtml = F3(
	function (customHtml, customInlineHtml, block) {
		var inlineToHtml = A2($elm$core$Maybe$withDefault, $pablohirafuji$elm_markdown$Markdown$Inline$toHtml, customInlineHtml);
		var blockToHtml = A2(
			$elm$core$Maybe$withDefault,
			A2($pablohirafuji$elm_markdown$Markdown$Block$defaultHtml, $elm$core$Maybe$Nothing, customInlineHtml),
			customHtml);
		switch (block.$) {
			case 0:
				return _List_Nil;
			case 2:
				var level = block.b;
				var inlines = block.c;
				var hElement = function () {
					switch (level) {
						case 1:
							return $elm$html$Html$h1(_List_Nil);
						case 2:
							return $elm$html$Html$h2(_List_Nil);
						case 3:
							return $elm$html$Html$h3(_List_Nil);
						case 4:
							return $elm$html$Html$h4(_List_Nil);
						case 5:
							return $elm$html$Html$h5(_List_Nil);
						default:
							return $elm$html$Html$h6(_List_Nil);
					}
				}();
				return _List_fromArray(
					[
						hElement(
						A2($elm$core$List$map, inlineToHtml, inlines))
					]);
			case 1:
				return _List_fromArray(
					[
						A2($elm$html$Html$hr, _List_Nil, _List_Nil)
					]);
			case 4:
				var inlines = block.b;
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_Nil,
						A2($elm$core$List$map, inlineToHtml, inlines))
					]);
			case 3:
				if (block.a.$ === 1) {
					var _v2 = block.a;
					var model = _v2.b;
					var codeStr = block.b;
					var basicView = function (attrs) {
						return _List_fromArray(
							[
								A2(
								$elm$html$Html$pre,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$code,
										attrs,
										_List_fromArray(
											[
												$elm$html$Html$text(codeStr)
											]))
									]))
							]);
					};
					var _v3 = model.a4;
					if (!_v3.$) {
						var language = _v3.a;
						return basicView(
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('language-' + language)
								]));
					} else {
						return basicView(_List_Nil);
					}
				} else {
					var _v4 = block.a;
					var codeStr = block.b;
					return _List_fromArray(
						[
							A2(
							$elm$html$Html$pre,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$code,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text(codeStr)
										]))
								]))
						]);
				}
			case 5:
				var blocks = block.a;
				return function (a) {
					return A2($elm$core$List$cons, a, _List_Nil);
				}(
					A2(
						$elm$html$Html$blockquote,
						_List_Nil,
						$elm$core$List$concat(
							A2($elm$core$List$map, blockToHtml, blocks))));
			case 6:
				var model = block.a;
				var items = block.b;
				return function (a) {
					return A2($elm$core$List$cons, a, _List_Nil);
				}(
					function () {
						var _v5 = model.t;
						if (_v5.$ === 1) {
							var startInt = _v5.a;
							return (startInt === 1) ? $elm$html$Html$ol(_List_Nil) : $elm$html$Html$ol(
								_List_fromArray(
									[
										$elm$html$Html$Attributes$start(startInt)
									]));
						} else {
							return $elm$html$Html$ul(_List_Nil);
						}
					}()(
						A2(
							$elm$core$List$map,
							A2(
								$elm$core$Basics$composeR,
								$elm$core$List$map(blockToHtml),
								A2(
									$elm$core$Basics$composeR,
									$elm$core$List$concat,
									$elm$html$Html$li(_List_Nil))),
							items)));
			case 7:
				var inlines = block.a;
				return A2($elm$core$List$map, inlineToHtml, inlines);
			default:
				var customBlock = block.a;
				var blocks = block.b;
				return function (a) {
					return A2($elm$core$List$cons, a, _List_Nil);
				}(
					A2(
						$elm$html$Html$div,
						_List_Nil,
						A2(
							$elm$core$List$cons,
							$elm$html$Html$text('Unhandled custom block.'),
							$elm$core$List$concat(
								A2($elm$core$List$map, blockToHtml, blocks)))));
		}
	});
var $pablohirafuji$elm_markdown$Markdown$Block$toHtml = A2($pablohirafuji$elm_markdown$Markdown$Block$defaultHtml, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing);
var $pablohirafuji$elm_markdown$Markdown$toHtml = F2(
	function (maybeOptions, rawText) {
		return $elm$core$List$concat(
			A2(
				$elm$core$List$map,
				$pablohirafuji$elm_markdown$Markdown$Block$toHtml,
				A2($pablohirafuji$elm_markdown$Markdown$Block$parse, maybeOptions, rawText)));
	});
var $author$project$Layout$Maincontent$Leftpanel$Notespanel$Content$panelNotesContent = function (model) {
	var noteContent = function () {
		var _v4 = model.ey;
		if (_v4.$ === 3) {
			var noteEvent = _v4.a;
			return noteEvent.f6;
		} else {
			return '';
		}
	}();
	var _v0 = model.hl;
	switch (_v0.$) {
		case 1:
			return A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM),
						$mdgriffith$elm_ui$Element$Border$width(1),
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$scrollbars,
						$mdgriffith$elm_ui$Element$Font$family(
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$Font$monospace]))
					]),
				A2(
					$mdgriffith$elm_ui$Element$Input$multiline,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$Border$width(0),
							function () {
							var _v1 = model.hl;
							switch (_v1.$) {
								case 4:
									return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.bU);
								case 1:
									return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.bU);
								default:
									return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.ij);
							}
						}(),
							$mdgriffith$elm_ui$Element$padding(0),
							$mdgriffith$elm_ui$Element$spacing(0),
							$mdgriffith$elm_ui$Element$clip
						]),
					{
						bS: $mdgriffith$elm_ui$Element$Input$labelHidden(''),
						b$: $author$project$Globaltypes$NoteEditorUserTypedContent,
						b6: $elm$core$Maybe$Nothing,
						cD: true,
						cH: model.hm
					}));
		case 4:
			return A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM),
						$mdgriffith$elm_ui$Element$Border$width(1),
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$scrollbars,
						$mdgriffith$elm_ui$Element$Font$family(
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$Font$monospace]))
					]),
				A2(
					$mdgriffith$elm_ui$Element$Input$multiline,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$Border$width(0),
							function () {
							var _v2 = model.hl;
							switch (_v2.$) {
								case 4:
									return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.bU);
								case 1:
									return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.bU);
								default:
									return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.ij);
							}
						}(),
							$mdgriffith$elm_ui$Element$padding(0),
							$mdgriffith$elm_ui$Element$spacing(0),
							$mdgriffith$elm_ui$Element$clip,
							$mdgriffith$elm_ui$Element$Input$focusedOnLoad
						]),
					{
						bS: $mdgriffith$elm_ui$Element$Input$labelHidden(''),
						b$: $author$project$Globaltypes$NoteEditorUserTypedContent,
						b6: $elm$core$Maybe$Nothing,
						cD: true,
						cH: model.hm
					}));
		default:
			return A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM),
						$mdgriffith$elm_ui$Element$Border$width(1),
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$scrollbars,
						function () {
						var _v3 = model.hl;
						if (!_v3.$) {
							return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fK);
						} else {
							return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.ij);
						}
					}(),
						$mdgriffith$elm_ui$Element$Font$family(
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$Font$monospace]))
					]),
				A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.ij),
							$mdgriffith$elm_ui$Element$Border$widthEach(
							{dy: 0, fI: 0, gP: 0, hZ: 1})
						]),
					$mdgriffith$elm_ui$Element$html(
						A2(
							$elm$html$Html$div,
							_List_Nil,
							A2($pablohirafuji$elm_markdown$Markdown$toHtml, $elm$core$Maybe$Nothing, noteContent)))));
	}
};
var $mdgriffith$elm_ui$Element$Font$bold = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$fontWeight, $mdgriffith$elm_ui$Internal$Style$classes.dr);
var $author$project$Layout$Maincontent$Leftpanel$Notespanel$Toolbar$toolbarEventId = function (model) {
	var _v0 = model.eu;
	if (_v0.$ === 3) {
		var event = _v0.a;
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[$mdgriffith$elm_ui$Element$alignLeft, $mdgriffith$elm_ui$Element$Font$bold]),
			$mdgriffith$elm_ui$Element$text(
				$elm$core$String$concat(
					_List_fromArray(
						[
							' ',
							'id:',
							$elm$core$String$fromInt(event.bM),
							' '
						]))));
	} else {
		return $mdgriffith$elm_ui$Element$none;
	}
};
var $mdgriffith$elm_ui$Element$Font$sansSerif = $mdgriffith$elm_ui$Internal$Model$SansSerif;
var $author$project$Layout$Maincontent$Leftpanel$Notespanel$Toolbar$toolbarLabel = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$paddingEach(
			{dy: 5, fI: 5, gP: 1, hZ: 5}),
			$mdgriffith$elm_ui$Element$Font$size(16),
			$mdgriffith$elm_ui$Element$Font$center,
			$mdgriffith$elm_ui$Element$Font$family(
			_List_fromArray(
				[$mdgriffith$elm_ui$Element$Font$sansSerif]))
		]),
	$mdgriffith$elm_ui$Element$text('Notes'));
var $author$project$Globaltypes$ShowNoteEditor = function (a) {
	return {$: 8, a: a};
};
var $author$project$Ui$Widgets$toolbarVoidButton = A2(
	$mdgriffith$elm_ui$Element$Input$button,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$padding(3),
			$mdgriffith$elm_ui$Element$Border$width(0),
			$mdgriffith$elm_ui$Element$focused(
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.fk)
				]))
		]),
	{
		bS: A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$clip,
					$mdgriffith$elm_ui$Element$Border$rounded(6),
					$mdgriffith$elm_ui$Element$width(
					$mdgriffith$elm_ui$Element$px(24)),
					$mdgriffith$elm_ui$Element$height(
					$mdgriffith$elm_ui$Element$px(24))
				]),
			$mdgriffith$elm_ui$Element$none),
		ba: $elm$core$Maybe$Nothing
	});
var $author$project$Layout$Maincontent$Leftpanel$Notespanel$Toolbar$renderButtonEdit = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_Nil,
		function () {
			var _v0 = model.hl;
			if (_v0.$ === 3) {
				var noteId = _v0.a;
				return A2(
					$author$project$Ui$Widgets$toolbarButton,
					$author$project$Monoicons$Png$monoIcons.eR,
					$elm$core$Maybe$Just(
						$author$project$Globaltypes$ShowNoteEditor(
							$author$project$Globaltypes$StateNoteEditorEdit(noteId))));
			} else {
				return $author$project$Ui$Widgets$toolbarVoidButton;
			}
		}());
};
var $author$project$Layout$Maincontent$Leftpanel$Notespanel$Toolbar$renderButtonNew = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_Nil,
		function () {
			var _v0 = model.hl;
			if (!_v0.$) {
				return A2(
					$author$project$Ui$Widgets$toolbarButton,
					$author$project$Monoicons$Png$monoIcons.cU,
					$elm$core$Maybe$Just(
						$author$project$Globaltypes$ShowNoteEditor($author$project$Globaltypes$StateNoteEditorNewEdit)));
			} else {
				return $author$project$Ui$Widgets$toolbarVoidButton;
			}
		}());
};
var $author$project$Layout$Maincontent$Leftpanel$Notespanel$Toolbar$renderButtonSave = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_Nil,
		function () {
			var _v0 = model.hl;
			switch (_v0.$) {
				case 1:
					return A2(
						$author$project$Ui$Widgets$toolbarButton,
						$author$project$Monoicons$Png$monoIcons.cu,
						$elm$core$Maybe$Just(
							$author$project$Globaltypes$ShowNoteEditor($author$project$Globaltypes$StateNoteEditorNewSave)));
				case 4:
					var noteId = _v0.a;
					return A2(
						$author$project$Ui$Widgets$toolbarButton,
						$author$project$Monoicons$Png$monoIcons.cu,
						$elm$core$Maybe$Just(
							$author$project$Globaltypes$ShowNoteEditor(
								$author$project$Globaltypes$StateNoteEditorSaveEdit(noteId))));
				default:
					return $author$project$Ui$Widgets$toolbarVoidButton;
			}
		}());
};
var $author$project$Layout$Maincontent$Leftpanel$Notespanel$Toolbar$toolbarNoteActionsToolbar = function (model) {
	var _v0 = model.eu;
	if (_v0.$ === 3) {
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[$mdgriffith$elm_ui$Element$alignRight]),
			A2(
				$mdgriffith$elm_ui$Element$row,
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Element$spacingXY, 1, 0),
						$mdgriffith$elm_ui$Element$paddingEach(
						{dy: 0, fI: 0, gP: 0, hZ: 0}),
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
					]),
				_List_fromArray(
					[
						$author$project$Layout$Maincontent$Leftpanel$Notespanel$Toolbar$renderButtonNew(model),
						$author$project$Layout$Maincontent$Leftpanel$Notespanel$Toolbar$renderButtonEdit(model),
						$author$project$Layout$Maincontent$Leftpanel$Notespanel$Toolbar$renderButtonSave(model)
					])));
	} else {
		return $mdgriffith$elm_ui$Element$none;
	}
};
var $author$project$Layout$Maincontent$Leftpanel$Notespanel$Toolbar$toolbarNoteSize = function (model) {
	var _v0 = model.ey;
	if (_v0.$ === 3) {
		var noteEvent = _v0.a;
		return A2(
			$mdgriffith$elm_ui$Element$row,
			_List_fromArray(
				[$mdgriffith$elm_ui$Element$alignLeft]),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_Nil,
					$mdgriffith$elm_ui$Element$text(' Size: ')),
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_Nil,
					$mdgriffith$elm_ui$Element$text(
						$author$project$Helpers$humanReadableBytes(
							$elm$core$Maybe$Just(
								$elm$core$String$length(noteEvent.f6))))),
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_Nil,
					$mdgriffith$elm_ui$Element$text(''))
				]));
	} else {
		return $mdgriffith$elm_ui$Element$none;
	}
};
var $author$project$Ui$Widgets$toolbarSeparatorX = A2(
	$mdgriffith$elm_ui$Element$row,
	_List_Nil,
	_List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$paddingEach(
					{dy: 10, fI: 2, gP: 2, hZ: 10}),
					$mdgriffith$elm_ui$Element$Border$widthEach(
					{dy: 0, fI: 0, gP: 1, hZ: 0}),
					$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM)
				]),
			$mdgriffith$elm_ui$Element$none),
			A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$paddingEach(
					{dy: 10, fI: 2, gP: 2, hZ: 10}),
					$mdgriffith$elm_ui$Element$Border$widthEach(
					{dy: 0, fI: 1, gP: 0, hZ: 0}),
					$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.ij)
				]),
			$mdgriffith$elm_ui$Element$none)
		]));
var $author$project$Layout$Maincontent$Leftpanel$Notespanel$Toolbar$panelNotesToolbar = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height(
				$mdgriffith$elm_ui$Element$px(28)),
				$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM),
				$mdgriffith$elm_ui$Element$Border$widthEach(
				{dy: 0, fI: 0, gP: 1, hZ: 1}),
				$mdgriffith$elm_ui$Element$Font$family(
				_List_fromArray(
					[$mdgriffith$elm_ui$Element$Font$monospace]))
			]),
		_List_fromArray(
			[
				$author$project$Layout$Maincontent$Leftpanel$Notespanel$Toolbar$toolbarLabel,
				A2(
				$mdgriffith$elm_ui$Element$row,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
					]),
				_List_fromArray(
					[
						$author$project$Layout$Maincontent$Leftpanel$Notespanel$Toolbar$toolbarEventId(model),
						$author$project$Ui$Widgets$toolbarSeparatorX,
						$author$project$Layout$Maincontent$Leftpanel$Notespanel$Toolbar$toolbarNoteSize(model),
						$author$project$Layout$Maincontent$Leftpanel$Notespanel$Toolbar$toolbarNoteActionsToolbar(model)
					]))
			]));
};
var $author$project$Layout$Maincontent$Leftpanel$Notespanel$Base$panelNotes = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
			]),
		_List_fromArray(
			[
				$author$project$Layout$Maincontent$Leftpanel$Notespanel$Toolbar$panelNotesToolbar(model),
				$author$project$Layout$Maincontent$Leftpanel$Notespanel$Content$panelNotesContent(model)
			]));
};
var $author$project$Globaltypes$FilterBySite = function (a) {
	return {$: 1, a: a};
};
var $author$project$Layout$Maincontent$Leftpanel$Sitespanel$Content$backgroundIfFiltered = F2(
	function (site, maybeFilter) {
		if (!maybeFilter.$) {
			var filter = maybeFilter.a;
			return _Utils_eq(site, filter) ? $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fK) : $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.ij);
		} else {
			return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.ij);
		}
	});
var $author$project$Layout$Maincontent$Leftpanel$Sitespanel$Content$cellTH = function (labelText) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Border$widthEach(
				{dy: 1, fI: 1, gP: 1, hZ: 1}),
				$mdgriffith$elm_ui$Element$Border$rounded(1),
				$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM)
			]),
		A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[$mdgriffith$elm_ui$Element$centerX]),
			$mdgriffith$elm_ui$Element$text(labelText)));
};
var $author$project$Layout$Maincontent$Leftpanel$Sitespanel$Content$renderTableSites = F2(
	function (sites, shared_events_filter_by_site) {
		return A2(
			$mdgriffith$elm_ui$Element$table,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.ij),
					$mdgriffith$elm_ui$Element$spacing(1),
					$mdgriffith$elm_ui$Element$padding(2)
				]),
			{
				eg: _List_fromArray(
					[
						{
						E: $author$project$Layout$Maincontent$Leftpanel$Sitespanel$Content$cellTH('Evts'),
						K: function (row) {
							return A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										A2($author$project$Layout$Maincontent$Leftpanel$Sitespanel$Content$backgroundIfFiltered, row.ha, shared_events_filter_by_site)
									]),
								A2(
									$mdgriffith$elm_ui$Element$el,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$alignRight,
											$mdgriffith$elm_ui$Element$paddingEach(
											{dy: 0, fI: 0, gP: 2, hZ: 0}),
											$mdgriffith$elm_ui$Element$Font$family(
											_List_fromArray(
												[$mdgriffith$elm_ui$Element$Font$monospace]))
										]),
									$mdgriffith$elm_ui$Element$text(
										$elm$core$String$concat(
											_List_fromArray(
												[
													$elm$core$String$fromInt(row.eY),
													' '
												])))));
						},
						L: $mdgriffith$elm_ui$Element$px(40)
					},
						{
						E: $author$project$Layout$Maincontent$Leftpanel$Sitespanel$Content$cellTH('Site'),
						K: function (row) {
							return A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$pointer,
										$mdgriffith$elm_ui$Element$mouseOver(
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fK)
											])),
										A2($author$project$Layout$Maincontent$Leftpanel$Sitespanel$Content$backgroundIfFiltered, row.ha, shared_events_filter_by_site),
										$mdgriffith$elm_ui$Element$Events$onClick(
										$author$project$Globaltypes$FilterBySite(row.ha)),
										$mdgriffith$elm_ui$Element$Font$family(
										_List_fromArray(
											[$mdgriffith$elm_ui$Element$Font$monospace]))
									]),
								$mdgriffith$elm_ui$Element$text(row.ha));
						},
						L: $mdgriffith$elm_ui$Element$fill
					}
					]),
				et: sites
			});
	});
var $author$project$Layout$Maincontent$Leftpanel$Sitespanel$Content$sitesContent = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM),
				$mdgriffith$elm_ui$Element$Border$width(1),
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.ij),
				$mdgriffith$elm_ui$Element$scrollbars,
				$mdgriffith$elm_ui$Element$Font$size(12)
			]),
		_List_fromArray(
			[
				function () {
				var _v0 = model.eA;
				if (_v0.$ === 3) {
					var maybeSitesResponse = _v0.a;
					if (!maybeSitesResponse.$) {
						var sitesResponse = maybeSitesResponse.a;
						return A2($author$project$Layout$Maincontent$Leftpanel$Sitespanel$Content$renderTableSites, sitesResponse.hb, model.g4);
					} else {
						return $mdgriffith$elm_ui$Element$none;
					}
				} else {
					return $mdgriffith$elm_ui$Element$none;
				}
			}()
			]));
};
var $author$project$Globaltypes$GetDataSites = {$: 21};
var $author$project$Monoicons$Gif$monoIconsGif = {ce: 'data:image/gif;base64,R0lGODlhMAAwAKECAA0NDQ4ODv///////yH/C05FVFNDQVBFMi4wAwEAAAAh/hFDcmVhdGVkIHdpdGggR0lNUAAh+QQJCgACACwAAAAAMAAwAAACmJSPqcvtD6OctNqLGQC5m715GRiKF8mZFqquZNugcgl/8522OB7AO+6bKVg64vBVBMWQKuNRmaQtmE2oQ2py1q7W7YPq1YDDzxxZjO2kl+vTphcZY+TTrtrONt/bZb0bnydCh+bnwlcHOEECp5goMZhXGAfCSKE16QhxyZWJ2SkgkyWUcBP1s9kRcLoYtlpJVnomO0tbu1UAACH5BAkKAAMALAAAAAAwADAAAAKInI+py+0Po5y02ouz3rz7D4biaADmeZIIyrZjC7trasU2Ops1vMQHTuE9ZECJzGibHJU+JG23dLAyTUiReXMCoEnrM3jbenXcVkCrGn7Tiis74X7/1vISvR6vB+54/jvfR1aXIzho58cAqFWohhgh1GDG0TUHuRGWBYI5RbJ3cyZnaThKWmpaAAAh+QQJCgADACwAAAAAMAAwAAACl5yPqcvtD6OctNqLs968+78B4iiCDYmi5pG2KujG4+cqNZdCufZKvfXzkS6B4SUYMWKUwlkG6WAunU0AjqqTHrUM7raUxPLEJ/IUnEUDrQalOuFNs43e+EM1hA70clnUXHVT9lbh91AEGJgItxhml4BIWNho8whR9CW5srCz+dfpWRkTCmlIehDJF0oScOr6ChsrO0urUAAAIfkECQoAAwAsAAAAADAAMAAAApicj6nL7Q+jnLTai7PeHAUAhmH3iOZJJueKkuxrdqszay10WzkeXz21i/wqQ4nIdpx8RpliiYkEAaHNJI9alQqxWYCRi7E+tRwxDexDK8zdr3pKvno3zgZb91Ys42m+3D1nUHeWJ0h1JxdoBzU45rfG1PjnGFSxlIiYgsCiifnYuQmjCGoIQ5qwx3ka+rLq+gobKztLWztRAAAh+QQJCgADACwAAAAAMAAwAAACk5yPqcvtD6OctNqLB9h8Zxp0Yvc54YhuQamkLsceaYvGI3R/IrVjPU+ynDyX3yTog4GQRSZOqYNGnE3ilGoxOrBVgISblW7FGXBiGNOQG1aWOc14wxPa+bhtf8jz6nX0iefmZ1AXNVhYBoaY5JeTVjcD9+IyNzS5B3Q5WKLJR4eZt+gpA2onOtrnhTq22ur6CjtaAAAh+QQJCgADACwAAAAAMAAwAAACj5yPqcvtD6OctNqLEdgc5Bp04hZ8z4h2ppK26jq0iWyG4jmat5Rn77SDVYJCIKdo+SEjyiWEU3Iyj9IntepoYlnX7ULrPYDDsa7DlrqMZy5P0sxouylrtuu94aF8dc1e3ef3R0eEk2YUKOjWk8Wol2dwaFc4BRkpJ0loeYmZiCcXRkM2SlpqeoqaqrrKulUAACH5BAkKAAMALAAAAAAwADAAAAKXnI+py+0Po5y02ouz3lwGAAJdFZZAMEamiabOaroqLEtrbZfXucWUrim1ZsBM8QETGUPDRhIUDCGfUMxRQb1OfFidV5urdqtAMFG5EBfFFvMY3ZOeR+5E/SeHcJd5fd/6N8UGOChYiBdoGHVoCIfI03aXJulEebC3gzlp2RiYlJL1JBN6g0PqiDPwmcra6voKGys7S+taAAAh+QQJCgADACwAAAAAMAAwAAACmpyPqcvtD6OctNqLs968bwCGIuA94xmUzXmqDDu6Jis7cP3ec6rBICTKxAbBWegyJB6NP0vR8LRFI0llE7icTJ0hnmTLvWKzQjKzU5WKe+ZVGwNexMMk6ht5V8wre0T/+wcVeKaVV7jGVAfXRZHGZ5gD6Sap5ziGCDgoqFk52MJmeUDD4VNKmWka+pGK6eLjhRMrO0tba3tbUQAAOw=='};
var $author$project$Layout$Maincontent$Leftpanel$Sitespanel$Toolbar$sitesPanelToolbarRightToolbar = function (sitesStatus) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Element$spacingXY, 1, 0),
				$mdgriffith$elm_ui$Element$paddingEach(
				{dy: 0, fI: 0, gP: 0, hZ: 0}),
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
			]),
		_List_fromArray(
			[
				function () {
				if (sitesStatus.$ === 1) {
					return A2($author$project$Ui$Widgets$toolbarButton, $author$project$Monoicons$Gif$monoIconsGif.ce, $elm$core$Maybe$Nothing);
				} else {
					return A2(
						$author$project$Ui$Widgets$toolbarButton,
						$author$project$Monoicons$Png$monoIcons.ce,
						$elm$core$Maybe$Just($author$project$Globaltypes$GetDataSites));
				}
			}()
			]));
};
var $author$project$Layout$Maincontent$Leftpanel$Sitespanel$Toolbar$sitesPanelToolbar = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height(
				$mdgriffith$elm_ui$Element$px(28)),
				$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM),
				$mdgriffith$elm_ui$Element$Border$widthEach(
				{dy: 0, fI: 0, gP: 1, hZ: 0})
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$paddingEach(
						{dy: 5, fI: 5, gP: 5, hZ: 5}),
						$mdgriffith$elm_ui$Element$Font$size(16),
						$mdgriffith$elm_ui$Element$Font$center
					]),
				$mdgriffith$elm_ui$Element$text('Sites:')),
				function () {
				var _v0 = model.eA;
				if (_v0.$ === 3) {
					var maybeData = _v0.a;
					if (!maybeData.$) {
						var data = maybeData.a;
						return A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[$mdgriffith$elm_ui$Element$alignLeft]),
							$mdgriffith$elm_ui$Element$text(
								$elm$core$String$concat(
									_List_fromArray(
										[
											$elm$core$String$fromInt(data.h1),
											' (Total events: ',
											$elm$core$String$fromInt(data.h0),
											')'
										]))));
					} else {
						return $mdgriffith$elm_ui$Element$none;
					}
				} else {
					return $mdgriffith$elm_ui$Element$none;
				}
			}(),
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[$mdgriffith$elm_ui$Element$alignRight]),
				$author$project$Layout$Maincontent$Leftpanel$Sitespanel$Toolbar$sitesPanelToolbarRightToolbar(model.eA))
			]));
};
var $author$project$Layout$Maincontent$Leftpanel$Sitespanel$Base$sitesPanel = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
			]),
		_List_fromArray(
			[
				$author$project$Layout$Maincontent$Leftpanel$Sitespanel$Toolbar$sitesPanelToolbar(model),
				$author$project$Layout$Maincontent$Leftpanel$Sitespanel$Content$sitesContent(model)
			]));
};
var $author$project$Layout$Maincontent$Leftpanel$Base$leftPanel = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width(
				$mdgriffith$elm_ui$Element$px(300)),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
			]),
		_List_fromArray(
			[
				$author$project$Layout$Maincontent$Leftpanel$Sitespanel$Base$sitesPanel(model),
				$author$project$Ui$Widgets$horizontalSplitter,
				$author$project$Layout$Maincontent$Leftpanel$Notespanel$Base$panelNotes(model)
			]));
};
var $author$project$Layout$Maincontent$Rightpanel$Request$Base$requestToolbar = function (model) {
	var maybeRequestBodySize = function () {
		var _v5 = model.eu;
		if (_v5.$ === 3) {
			var event = _v5.a;
			return event.gz;
		} else {
			return $elm$core$Maybe$Nothing;
		}
	}();
	var maybeHeadersCount = function () {
		var _v4 = model.eu;
		if (_v4.$ === 3) {
			var event = _v4.a;
			return $elm$core$Maybe$Just(
				$elm$core$List$length(event.ci));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	}();
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height(
				$mdgriffith$elm_ui$Element$px(28)),
				$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM),
				$mdgriffith$elm_ui$Element$Border$widthEach(
				{dy: 0, fI: 1, gP: 1, hZ: 0}),
				$mdgriffith$elm_ui$Element$Font$family(
				_List_fromArray(
					[$mdgriffith$elm_ui$Element$Font$monospace]))
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$paddingEach(
						{dy: 5, fI: 5, gP: 1, hZ: 5}),
						$mdgriffith$elm_ui$Element$Font$size(16),
						$mdgriffith$elm_ui$Element$Font$center,
						$mdgriffith$elm_ui$Element$Font$family(
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$Font$sansSerif]))
					]),
				$mdgriffith$elm_ui$Element$text('Request')),
				function () {
				var _v0 = model.g5;
				if (!_v0.$) {
					var eventId = _v0.a;
					return A2(
						$mdgriffith$elm_ui$Element$row,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[$mdgriffith$elm_ui$Element$alignLeft, $mdgriffith$elm_ui$Element$Font$bold]),
								$mdgriffith$elm_ui$Element$text(
									$elm$core$String$concat(
										_List_fromArray(
											[
												' ',
												'id:',
												$elm$core$String$fromInt(eventId),
												''
											])))),
								A2(
								$author$project$Ui$Widgets$toolbarButton,
								$author$project$Monoicons$Png$monoIcons.dh,
								$elm$core$Maybe$Just(
									$author$project$Globaltypes$ShowHttpEvent($elm$core$Maybe$Nothing)))
							]));
				} else {
					return $mdgriffith$elm_ui$Element$none;
				}
			}(),
				$author$project$Ui$Widgets$toolbarSeparatorX,
				function () {
				var _v1 = model.g5;
				if (!_v1.$) {
					if (!maybeHeadersCount.$) {
						var headersCount = maybeHeadersCount.a;
						return A2(
							$mdgriffith$elm_ui$Element$row,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
								]),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Element$row,
									_List_fromArray(
										[$mdgriffith$elm_ui$Element$alignLeft]),
									_List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_Nil,
											$mdgriffith$elm_ui$Element$text('Headers: ')),
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[
													(headersCount > 0) ? $mdgriffith$elm_ui$Element$Font$bold : $mdgriffith$elm_ui$Element$Font$regular
												]),
											$mdgriffith$elm_ui$Element$text(
												$elm$core$String$fromInt(headersCount))),
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_Nil,
											$mdgriffith$elm_ui$Element$text(' | Body size: ')),
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[
													function () {
													if (!maybeRequestBodySize.$) {
														var bodySize = maybeRequestBodySize.a;
														return (bodySize > 0) ? $mdgriffith$elm_ui$Element$Font$bold : $mdgriffith$elm_ui$Element$Font$regular;
													} else {
														return $mdgriffith$elm_ui$Element$Font$regular;
													}
												}()
												]),
											$mdgriffith$elm_ui$Element$text(
												$author$project$Helpers$humanReadableBytes(maybeRequestBodySize))),
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_Nil,
											$mdgriffith$elm_ui$Element$text(''))
										])),
									A2(
									$mdgriffith$elm_ui$Element$el,
									_List_fromArray(
										[$mdgriffith$elm_ui$Element$alignRight]),
									A2(
										$mdgriffith$elm_ui$Element$row,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Element$spacingXY, 1, 0),
												$mdgriffith$elm_ui$Element$paddingEach(
												{dy: 0, fI: 0, gP: 0, hZ: 0}),
												$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
											]),
										_List_fromArray(
											[
												A2($author$project$Ui$Widgets$toolbarButton, $author$project$Monoicons$Png$monoIcons.eR, $elm$core$Maybe$Nothing)
											])))
								]));
					} else {
						return $mdgriffith$elm_ui$Element$none;
					}
				} else {
					return $mdgriffith$elm_ui$Element$none;
				}
			}()
			]));
};
var $author$project$Layout$Maincontent$Rightpanel$Request$Bodypanel$renderRequestBody = function (model) {
	var _v0 = model.g5;
	if (!_v0.$) {
		var _v1 = model.eu;
		switch (_v1.$) {
			case 3:
				var event = _v1.a;
				var _v2 = event.gz;
				if (!_v2.$) {
					var bodySize = _v2.a;
					if (bodySize > 0) {
						var _v3 = model.ev;
						switch (_v3.$) {
							case 3:
								var requestBody = _v3.a;
								var _v4 = requestBody.gE;
								if (!_v4.$) {
									var postdataText = _v4.a;
									return A2(
										$mdgriffith$elm_ui$Element$row,
										_List_Nil,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$text(postdataText)
											]));
								} else {
									return $mdgriffith$elm_ui$Element$none;
								}
							case 1:
								return (bodySize > 0) ? A2(
									$mdgriffith$elm_ui$Element$row,
									_List_fromArray(
										[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY]),
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$text('Loading...')
										])) : $mdgriffith$elm_ui$Element$none;
							default:
								return $mdgriffith$elm_ui$Element$none;
						}
					} else {
						return $mdgriffith$elm_ui$Element$none;
					}
				} else {
					return $mdgriffith$elm_ui$Element$none;
				}
			case 1:
				return A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY]),
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$text('Loading...')
						]));
			default:
				return $mdgriffith$elm_ui$Element$none;
		}
	} else {
		return $mdgriffith$elm_ui$Element$none;
	}
};
var $author$project$Layout$Maincontent$Rightpanel$Request$Bodypanel$requestViewerBody = function (model) {
	var dynamicBackgroundColor = function () {
		var _v0 = model.g5;
		if (!_v0.$) {
			var _v1 = model.eu;
			if (_v1.$ === 3) {
				var event = _v1.a;
				var _v2 = event.gz;
				if (!_v2.$) {
					var bodySize = _v2.a;
					return (bodySize > 0) ? $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.ij) : $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fK);
				} else {
					return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fK);
				}
			} else {
				return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fK);
			}
		} else {
			return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fK);
		}
	}();
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM),
				$mdgriffith$elm_ui$Element$Border$rounded(2),
				$mdgriffith$elm_ui$Element$Border$width(1),
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				dynamicBackgroundColor,
				$mdgriffith$elm_ui$Element$scrollbars,
				$mdgriffith$elm_ui$Element$Font$family(
				_List_fromArray(
					[$mdgriffith$elm_ui$Element$Font$monospace]))
			]),
		_List_fromArray(
			[
				$author$project$Layout$Maincontent$Rightpanel$Request$Bodypanel$renderRequestBody(model)
			]));
};
var $author$project$Layout$Maincontent$Rightpanel$Request$Headerspanel$renderHeaderRow = function (header) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$row,
				_List_fromArray(
					[$mdgriffith$elm_ui$Element$Font$bold]),
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text(header.f4 + ': ')
					])),
				A2(
				$mdgriffith$elm_ui$Element$row,
				_List_Nil,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text(header.ie)
					]))
			]));
};
var $author$project$Layout$Maincontent$Rightpanel$Request$Headerspanel$renderRequestHeaders = function (eventFull) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_Nil,
		A2(
			$elm$core$List$map,
			function (header) {
				return $author$project$Layout$Maincontent$Rightpanel$Request$Headerspanel$renderHeaderRow(header);
			},
			eventFull.ci));
};
var $mdgriffith$elm_ui$Element$Font$semiBold = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$fontWeight, $mdgriffith$elm_ui$Internal$Style$classes.hS);
var $author$project$Layout$Maincontent$Rightpanel$Request$Headerspanel$renderRequestMethodUrlHttpVersion = function (eventFull) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Font$semiBold,
				$mdgriffith$elm_ui$Element$paddingEach(
				{dy: 2, fI: 0, gP: 0, hZ: 0})
			]),
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$text(
				function () {
					var _v0 = eventFull.ck;
					if (!_v0.$) {
						var requestMethod = _v0.a;
						return requestMethod;
					} else {
						return '';
					}
				}()),
				$mdgriffith$elm_ui$Element$text(' '),
				A2(
				$mdgriffith$elm_ui$Element$row,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.$7)
					]),
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text(
						function () {
							var _v1 = eventFull.gG;
							if (!_v1.$) {
								var requestUrl = _v1.a;
								return requestUrl;
							} else {
								return '';
							}
						}())
					])),
				$mdgriffith$elm_ui$Element$text(' '),
				$mdgriffith$elm_ui$Element$text(
				function () {
					var _v2 = eventFull.cj;
					if (!_v2.$) {
						var requestHttpVersion = _v2.a;
						return requestHttpVersion;
					} else {
						return '';
					}
				}())
			]));
};
var $author$project$Layout$Maincontent$Rightpanel$Request$Headerspanel$requestViewerHeaders = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM),
				$mdgriffith$elm_ui$Element$Border$rounded(2),
				$mdgriffith$elm_ui$Element$Border$width(1),
				A2($mdgriffith$elm_ui$Element$paddingXY, 3, 3),
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				function () {
				var _v0 = model.g5;
				if (!_v0.$) {
					return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.ij);
				} else {
					return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fK);
				}
			}(),
				$mdgriffith$elm_ui$Element$scrollbars,
				$mdgriffith$elm_ui$Element$Font$family(
				_List_fromArray(
					[$mdgriffith$elm_ui$Element$Font$monospace]))
			]),
		function () {
			var _v1 = model.g5;
			if (!_v1.$) {
				var _v2 = model.eu;
				switch (_v2.$) {
					case 3:
						var eventFull = _v2.a;
						return _List_fromArray(
							[
								$author$project$Layout$Maincontent$Rightpanel$Request$Headerspanel$renderRequestMethodUrlHttpVersion(eventFull),
								$author$project$Layout$Maincontent$Rightpanel$Request$Headerspanel$renderRequestHeaders(eventFull)
							]);
					case 1:
						return _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$row,
								_List_fromArray(
									[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY]),
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$text('Loading...')
									]))
							]);
					default:
						return _List_Nil;
				}
			} else {
				return _List_Nil;
			}
		}());
};
var $author$project$Layout$Maincontent$Rightpanel$Request$Base$requestViewer = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
			]),
		_List_fromArray(
			[
				$author$project$Layout$Maincontent$Rightpanel$Request$Headerspanel$requestViewerHeaders(model),
				$author$project$Ui$Widgets$horizontalSplitter,
				$author$project$Layout$Maincontent$Rightpanel$Request$Bodypanel$requestViewerBody(model)
			]));
};
var $author$project$Layout$Maincontent$Rightpanel$Request$Base$panelHttpViewerRequest = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width(
				$mdgriffith$elm_ui$Element$px(
					$elm$core$Basics$floor(model.im * 0.37))),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
			]),
		_List_fromArray(
			[
				$author$project$Layout$Maincontent$Rightpanel$Request$Base$requestToolbar(model),
				$author$project$Layout$Maincontent$Rightpanel$Request$Base$requestViewer(model)
			]));
};
var $author$project$Layout$Maincontent$Rightpanel$Response$Base$responseToolbar = function (model) {
	var maybeResponseBodySize = function () {
		var _v5 = model.eu;
		if (_v5.$ === 3) {
			var eventFull = _v5.a;
			return eventFull.cn;
		} else {
			return $elm$core$Maybe$Nothing;
		}
	}();
	var maybeHeadersCount = function () {
		var _v4 = model.eu;
		if (_v4.$ === 3) {
			var eventFull = _v4.a;
			return $elm$core$Maybe$Just(
				$elm$core$List$length(eventFull.cp));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	}();
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height(
				$mdgriffith$elm_ui$Element$px(28)),
				$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM),
				$mdgriffith$elm_ui$Element$Border$widthEach(
				{dy: 0, fI: 1, gP: 1, hZ: 0}),
				$mdgriffith$elm_ui$Element$Font$family(
				_List_fromArray(
					[$mdgriffith$elm_ui$Element$Font$monospace]))
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$paddingEach(
						{dy: 5, fI: 5, gP: 1, hZ: 5}),
						$mdgriffith$elm_ui$Element$Font$size(16),
						$mdgriffith$elm_ui$Element$Font$center,
						$mdgriffith$elm_ui$Element$Font$family(
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$Font$sansSerif]))
					]),
				$mdgriffith$elm_ui$Element$text('Response')),
				function () {
				var _v0 = model.g5;
				if (!_v0.$) {
					var eventId = _v0.a;
					return A2(
						$mdgriffith$elm_ui$Element$row,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[$mdgriffith$elm_ui$Element$alignLeft, $mdgriffith$elm_ui$Element$Font$bold]),
								$mdgriffith$elm_ui$Element$text(
									$elm$core$String$concat(
										_List_fromArray(
											[
												' ',
												'id:',
												$elm$core$String$fromInt(eventId),
												''
											]))))
							]));
				} else {
					return $mdgriffith$elm_ui$Element$none;
				}
			}(),
				$author$project$Ui$Widgets$toolbarSeparatorX,
				function () {
				var _v1 = model.g5;
				if (!_v1.$) {
					if (!maybeHeadersCount.$) {
						var headersCount = maybeHeadersCount.a;
						return A2(
							$mdgriffith$elm_ui$Element$row,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
								]),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Element$row,
									_List_fromArray(
										[$mdgriffith$elm_ui$Element$alignLeft]),
									_List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_Nil,
											$mdgriffith$elm_ui$Element$text('Headers: ')),
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[
													(headersCount > 0) ? $mdgriffith$elm_ui$Element$Font$bold : $mdgriffith$elm_ui$Element$Font$regular
												]),
											$mdgriffith$elm_ui$Element$text(
												$elm$core$String$fromInt(headersCount))),
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_Nil,
											$mdgriffith$elm_ui$Element$text(' | Body size: ')),
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[
													function () {
													if (!maybeResponseBodySize.$) {
														var bodySize = maybeResponseBodySize.a;
														return (bodySize > 0) ? $mdgriffith$elm_ui$Element$Font$bold : $mdgriffith$elm_ui$Element$Font$regular;
													} else {
														return $mdgriffith$elm_ui$Element$Font$regular;
													}
												}()
												]),
											$mdgriffith$elm_ui$Element$text(
												$author$project$Helpers$humanReadableBytes(maybeResponseBodySize))),
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_Nil,
											$mdgriffith$elm_ui$Element$text(''))
										])),
									A2(
									$mdgriffith$elm_ui$Element$el,
									_List_fromArray(
										[$mdgriffith$elm_ui$Element$alignRight]),
									A2(
										$mdgriffith$elm_ui$Element$row,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Element$spacingXY, 1, 0),
												$mdgriffith$elm_ui$Element$paddingEach(
												{dy: 0, fI: 0, gP: 0, hZ: 0}),
												$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
											]),
										_List_fromArray(
											[
												A2($author$project$Ui$Widgets$toolbarButton, $author$project$Monoicons$Png$monoIcons.fX, $elm$core$Maybe$Nothing),
												A2($author$project$Ui$Widgets$toolbarButton, $author$project$Monoicons$Png$monoIcons.d1, $elm$core$Maybe$Nothing)
											])))
								]));
					} else {
						return $mdgriffith$elm_ui$Element$none;
					}
				} else {
					return $mdgriffith$elm_ui$Element$none;
				}
			}()
			]));
};
var $author$project$Layout$Maincontent$Rightpanel$Response$Bodypanel$renderResponseBody = function (model) {
	var _v0 = model.g5;
	if (!_v0.$) {
		var _v1 = model.eu;
		switch (_v1.$) {
			case 3:
				var eventFull = _v1.a;
				var _v2 = eventFull.cn;
				if (!_v2.$) {
					var bodySize = _v2.a;
					if (bodySize > 0) {
						var _v3 = model.ew;
						switch (_v3.$) {
							case 3:
								var responseBody = _v3.a;
								var _v4 = responseBody.gH;
								if (!_v4.$) {
									var bodyContent = _v4.a;
									var _v5 = responseBody.gI;
									if (!_v5.$) {
										var response_body_encoding = _v5.a;
										switch (response_body_encoding) {
											case 'image/png':
												return A2(
													$mdgriffith$elm_ui$Element$row,
													_List_fromArray(
														[
															$mdgriffith$elm_ui$Element$centerX,
															$mdgriffith$elm_ui$Element$centerY,
															$mdgriffith$elm_ui$Element$Border$width(1)
														]),
													_List_fromArray(
														[
															A2(
															$mdgriffith$elm_ui$Element$image,
															_List_Nil,
															{eF: '', hj: 'data:image/png;base64, ' + bodyContent})
														]));
											case 'image/jpeg':
												return A2(
													$mdgriffith$elm_ui$Element$row,
													_List_fromArray(
														[
															$mdgriffith$elm_ui$Element$centerX,
															$mdgriffith$elm_ui$Element$centerY,
															$mdgriffith$elm_ui$Element$Border$width(1)
														]),
													_List_fromArray(
														[
															A2(
															$mdgriffith$elm_ui$Element$image,
															_List_Nil,
															{eF: '', hj: 'data:image/jpeg;base64, ' + bodyContent})
														]));
											case 'image/gif':
												return A2(
													$mdgriffith$elm_ui$Element$row,
													_List_fromArray(
														[
															$mdgriffith$elm_ui$Element$centerX,
															$mdgriffith$elm_ui$Element$centerY,
															$mdgriffith$elm_ui$Element$Border$width(1)
														]),
													_List_fromArray(
														[
															A2(
															$mdgriffith$elm_ui$Element$image,
															_List_Nil,
															{eF: '', hj: 'data:image/gif;base64, ' + bodyContent})
														]));
											case 'image/webp':
												return A2(
													$mdgriffith$elm_ui$Element$row,
													_List_fromArray(
														[
															$mdgriffith$elm_ui$Element$centerX,
															$mdgriffith$elm_ui$Element$centerY,
															$mdgriffith$elm_ui$Element$Border$width(1)
														]),
													_List_fromArray(
														[
															A2(
															$mdgriffith$elm_ui$Element$image,
															_List_Nil,
															{eF: '', hj: 'data:image/webp;base64, ' + bodyContent})
														]));
											case 'image/vnd.microsoft.icon':
												return A2(
													$mdgriffith$elm_ui$Element$row,
													_List_fromArray(
														[
															$mdgriffith$elm_ui$Element$centerX,
															$mdgriffith$elm_ui$Element$centerY,
															$mdgriffith$elm_ui$Element$Border$width(1)
														]),
													_List_fromArray(
														[
															A2(
															$mdgriffith$elm_ui$Element$image,
															_List_Nil,
															{eF: '', hj: 'data:image/vnd.microsoft.icon;base64, ' + bodyContent})
														]));
											case 'image/x-icon':
												return A2(
													$mdgriffith$elm_ui$Element$row,
													_List_fromArray(
														[
															$mdgriffith$elm_ui$Element$centerX,
															$mdgriffith$elm_ui$Element$centerY,
															$mdgriffith$elm_ui$Element$Border$width(1)
														]),
													_List_fromArray(
														[
															A2(
															$mdgriffith$elm_ui$Element$image,
															_List_Nil,
															{eF: '', hj: 'data:image/x-icon;base64, ' + bodyContent})
														]));
											default:
												return A2(
													$mdgriffith$elm_ui$Element$row,
													_List_Nil,
													_List_fromArray(
														[
															$mdgriffith$elm_ui$Element$text(bodyContent)
														]));
										}
									} else {
										return A2(
											$mdgriffith$elm_ui$Element$row,
											_List_Nil,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$text(bodyContent)
												]));
									}
								} else {
									return $mdgriffith$elm_ui$Element$none;
								}
							case 1:
								return (bodySize > 0) ? A2(
									$mdgriffith$elm_ui$Element$row,
									_List_fromArray(
										[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY]),
									_List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$image,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$alpha(0.7)
												]),
											{eF: 'Loading...', hj: $author$project$Monoicons$Gif$monoIconsGif.ce})
										])) : $mdgriffith$elm_ui$Element$none;
							default:
								return $mdgriffith$elm_ui$Element$none;
						}
					} else {
						return $mdgriffith$elm_ui$Element$none;
					}
				} else {
					return $mdgriffith$elm_ui$Element$none;
				}
			case 1:
				return A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY]),
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$text('Loading...')
						]));
			default:
				return $mdgriffith$elm_ui$Element$none;
		}
	} else {
		return $mdgriffith$elm_ui$Element$none;
	}
};
var $author$project$Layout$Maincontent$Rightpanel$Response$Bodypanel$responseViewerBody = function (model) {
	var dynamicBackgroundColor = function () {
		var _v0 = model.g5;
		if (!_v0.$) {
			var _v1 = model.eu;
			if (_v1.$ === 3) {
				var eventFull = _v1.a;
				var _v2 = eventFull.cn;
				if (!_v2.$) {
					var bodySize = _v2.a;
					return (bodySize > 0) ? $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.ij) : $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fK);
				} else {
					return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fK);
				}
			} else {
				return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fK);
			}
		} else {
			return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fK);
		}
	}();
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM),
				$mdgriffith$elm_ui$Element$Border$rounded(2),
				$mdgriffith$elm_ui$Element$Border$width(1),
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				dynamicBackgroundColor,
				$mdgriffith$elm_ui$Element$scrollbars,
				$mdgriffith$elm_ui$Element$Font$family(
				_List_fromArray(
					[$mdgriffith$elm_ui$Element$Font$monospace]))
			]),
		_List_fromArray(
			[
				$author$project$Layout$Maincontent$Rightpanel$Response$Bodypanel$renderResponseBody(model)
			]));
};
var $author$project$Layout$Maincontent$Rightpanel$Response$Headerspanel$renderHeaderRow = function (header) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$row,
				_List_fromArray(
					[$mdgriffith$elm_ui$Element$Font$bold]),
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text(header.f4 + ': ')
					])),
				A2(
				$mdgriffith$elm_ui$Element$row,
				_List_Nil,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text(header.ie)
					]))
			]));
};
var $author$project$Layout$Maincontent$Rightpanel$Response$Headerspanel$renderResponseHeaders = function (eventFull) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_Nil,
		A2(
			$elm$core$List$map,
			function (header) {
				return $author$project$Layout$Maincontent$Rightpanel$Response$Headerspanel$renderHeaderRow(header);
			},
			eventFull.cp));
};
var $author$project$Helpers$renderStatusCodeReason = function (statusCode) {
	switch (statusCode) {
		case 100:
			return 'Continue';
		case 101:
			return 'Switching Protocols';
		case 200:
			return 'OK';
		case 201:
			return 'Created';
		case 202:
			return 'Accepted';
		case 203:
			return 'Non-Authoritative Information';
		case 204:
			return 'No Content';
		case 205:
			return 'Reset Content';
		case 206:
			return 'Partial Content';
		case 300:
			return 'Multiple Choices';
		case 301:
			return 'Moved Permanently';
		case 302:
			return 'Found';
		case 303:
			return 'See Other';
		case 304:
			return 'Not Modified';
		case 305:
			return 'Use Proxy';
		case 306:
			return '(Unused)';
		case 307:
			return 'Temporary Redirect';
		case 400:
			return 'Bad Request';
		case 402:
			return 'Payment Required';
		case 403:
			return 'Forbidden';
		case 404:
			return 'Not Found';
		case 405:
			return 'Method Not Allowed';
		case 406:
			return 'Not Acceptable';
		case 408:
			return 'Request Timeout';
		case 409:
			return 'Conflict';
		case 410:
			return 'Gone';
		case 411:
			return 'Length Required';
		case 413:
			return 'Payload Too Large';
		case 414:
			return 'URI Too Long';
		case 415:
			return 'Unsupported Media Type';
		case 417:
			return 'Expectation Failed';
		case 426:
			return 'Upgrade Required';
		case 428:
			return 'Precondition Required';
		case 429:
			return 'Too Many Requests';
		case 431:
			return 'Request Header Fields Too Large';
		case 500:
			return 'Internal Server Error';
		case 501:
			return 'Not Implemented';
		case 502:
			return 'Bad Gateway';
		case 503:
			return 'Service Unavailable';
		case 504:
			return 'Gateway Timeout';
		case 505:
			return 'HTTP Version Not Supported';
		case 511:
			return 'Network Authentication Required';
		default:
			return 'Unknown code';
	}
};
var $author$project$Layout$Maincontent$Rightpanel$Response$Headerspanel$renderResponseHttpVersionStatusCodeAndReason = function (eventFull) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Font$semiBold,
				$mdgriffith$elm_ui$Element$paddingEach(
				{dy: 2, fI: 0, gP: 0, hZ: 0})
			]),
		_List_fromArray(
			[
				function () {
				var responseHttpVersion = function () {
					var _v1 = eventFull.gM;
					if (!_v1.$) {
						var data = _v1.a;
						return data;
					} else {
						return '';
					}
				}();
				var requestHttpVersion = function () {
					var _v0 = eventFull.cj;
					if (!_v0.$) {
						var data = _v0.a;
						return data;
					} else {
						return '';
					}
				}();
				return A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							_Utils_eq(responseHttpVersion, requestHttpVersion) ? $mdgriffith$elm_ui$Element$Font$regular : $mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.gu)
						]),
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$text(responseHttpVersion)
						]));
			}(),
				$mdgriffith$elm_ui$Element$text(' '),
				A2(
				$mdgriffith$elm_ui$Element$row,
				_List_fromArray(
					[$mdgriffith$elm_ui$Element$Font$semiBold]),
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text(
						function () {
							var _v2 = eventFull.cq;
							if (!_v2.$) {
								var statusCode = _v2.a;
								return $elm$core$String$fromInt(statusCode);
							} else {
								return '';
							}
						}())
					])),
				$mdgriffith$elm_ui$Element$text(' '),
				A2(
				$mdgriffith$elm_ui$Element$row,
				_List_fromArray(
					[
						function () {
						var _v3 = eventFull.cq;
						if (!_v3.$) {
							var statusCode = _v3.a;
							return (statusCode > 499) ? $mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.gt) : ((statusCode > 399) ? $mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.bq) : ((statusCode > 299) ? $mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.bq) : $mdgriffith$elm_ui$Element$Font$regular));
						} else {
							return $mdgriffith$elm_ui$Element$Font$regular;
						}
					}()
					]),
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text(
						function () {
							var _v4 = eventFull.cq;
							if (!_v4.$) {
								var statusCode = _v4.a;
								return $author$project$Helpers$renderStatusCodeReason(statusCode);
							} else {
								return '';
							}
						}())
					])),
				$mdgriffith$elm_ui$Element$text(' ')
			]));
};
var $author$project$Layout$Maincontent$Rightpanel$Response$Headerspanel$responseViewerHeaders = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM),
				$mdgriffith$elm_ui$Element$Border$rounded(2),
				$mdgriffith$elm_ui$Element$Border$width(1),
				A2($mdgriffith$elm_ui$Element$paddingXY, 3, 3),
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				function () {
				var _v0 = model.g5;
				if (!_v0.$) {
					return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.ij);
				} else {
					return $mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fK);
				}
			}(),
				$mdgriffith$elm_ui$Element$scrollbars,
				$mdgriffith$elm_ui$Element$Font$family(
				_List_fromArray(
					[$mdgriffith$elm_ui$Element$Font$monospace]))
			]),
		function () {
			var _v1 = model.g5;
			if (!_v1.$) {
				var _v2 = model.eu;
				switch (_v2.$) {
					case 3:
						var eventFull = _v2.a;
						return _List_fromArray(
							[
								$author$project$Layout$Maincontent$Rightpanel$Response$Headerspanel$renderResponseHttpVersionStatusCodeAndReason(eventFull),
								$author$project$Layout$Maincontent$Rightpanel$Response$Headerspanel$renderResponseHeaders(eventFull)
							]);
					case 1:
						return _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$row,
								_List_fromArray(
									[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY]),
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$text('Loading...')
									]))
							]);
					default:
						return _List_Nil;
				}
			} else {
				return _List_Nil;
			}
		}());
};
var $author$project$Layout$Maincontent$Rightpanel$Response$Base$responseViewer = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
			]),
		_List_fromArray(
			[
				$author$project$Layout$Maincontent$Rightpanel$Response$Headerspanel$responseViewerHeaders(model),
				$author$project$Ui$Widgets$horizontalSplitter,
				$author$project$Layout$Maincontent$Rightpanel$Response$Bodypanel$responseViewerBody(model)
			]));
};
var $author$project$Layout$Maincontent$Rightpanel$Response$Base$panelHttpViewerResponse = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width(
				$mdgriffith$elm_ui$Element$px(
					((model.im - 300) - $elm$core$Basics$floor(model.im * 0.37)) - 12)),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
			]),
		_List_fromArray(
			[
				$author$project$Layout$Maincontent$Rightpanel$Response$Base$responseToolbar(model),
				$author$project$Layout$Maincontent$Rightpanel$Response$Base$responseViewer(model)
			]));
};
var $author$project$Ui$Cursor$ColResize = 5;
var $author$project$Ui$Widgets$verticalSplitter = A2(
	$mdgriffith$elm_ui$Element$el,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
			$mdgriffith$elm_ui$Element$width(
			$mdgriffith$elm_ui$Element$px(6))
		]),
	A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width(
				$mdgriffith$elm_ui$Element$px(6)),
				$mdgriffith$elm_ui$Element$centerY,
				$author$project$Ui$Cursor$cursor(5),
				$mdgriffith$elm_ui$Element$Background$image($author$project$Monoicons$Png$monoIcons.gh)
			]),
		A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Element$paddingXY, 6, 10)
				]),
			$mdgriffith$elm_ui$Element$none)));
var $author$project$Layout$Maincontent$Rightpanel$Base$rightPanel = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
			]),
		_List_fromArray(
			[
				$author$project$Layout$Maincontent$Rightpanel$Request$Base$panelHttpViewerRequest(model),
				$author$project$Ui$Widgets$verticalSplitter,
				$author$project$Layout$Maincontent$Rightpanel$Response$Base$panelHttpViewerResponse(model)
			]));
};
var $author$project$Layout$Maincontent$Base$mainContent = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$Border$widthEach(
				{dy: 0, fI: 0, gP: 0, hZ: 1}),
				$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.ij)
			]),
		A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
				]),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
						]),
					_List_fromArray(
						[
							$author$project$Layout$Maincontent$Leftpanel$Base$leftPanel(model),
							$author$project$Ui$Widgets$verticalSplitter,
							$author$project$Layout$Maincontent$Rightpanel$Base$rightPanel(model)
						])),
					$author$project$Ui$Widgets$horizontalSplitter,
					$author$project$Layout$Maincontent$Bottompanel$Base$bottomPanel(model)
				])));
};
var $mdgriffith$elm_ui$Internal$Model$Top = 0;
var $mdgriffith$elm_ui$Element$alignTop = $mdgriffith$elm_ui$Internal$Model$AlignY(0);
var $author$project$Layout$Statusbar$statusBar = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height(
				$mdgriffith$elm_ui$Element$px(20)),
				$mdgriffith$elm_ui$Element$Border$widthEach(
				{dy: 0, fI: 0, gP: 0, hZ: 1}),
				$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.ij)
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$paddingEach(
						{dy: 0, fI: 0, gP: 5, hZ: 0})
					]),
				$mdgriffith$elm_ui$Element$none),
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width(
						$mdgriffith$elm_ui$Element$px(100)),
						$mdgriffith$elm_ui$Element$height(
						$mdgriffith$elm_ui$Element$px(14)),
						$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.aM),
						$mdgriffith$elm_ui$Element$alignTop,
						$mdgriffith$elm_ui$Element$Border$widthEach(
						{dy: 0, fI: 1, gP: 0, hZ: 1}),
						$mdgriffith$elm_ui$Element$Font$size(12)
					]),
				A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width(
							$mdgriffith$elm_ui$Element$px(100)),
							$mdgriffith$elm_ui$Element$height(
							$mdgriffith$elm_ui$Element$px(14)),
							$mdgriffith$elm_ui$Element$Border$color($author$project$Ui$Colors$color.ij),
							$mdgriffith$elm_ui$Element$alignTop,
							$mdgriffith$elm_ui$Element$Border$widthEach(
							{dy: 1, fI: 0, gP: 1, hZ: 0}),
							$mdgriffith$elm_ui$Element$Font$size(12)
						]),
					$mdgriffith$elm_ui$Element$text('statusBar '))),
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$color($author$project$Ui$Colors$color.gt)
					]),
				$mdgriffith$elm_ui$Element$text(
					function () {
						var _v0 = model.eW;
						if (!_v0.$) {
							return $elm$core$String$concat(
								_List_fromArray(
									[' Error! See console.log.']));
						} else {
							return '';
						}
					}()))
			]));
};
var $author$project$Layout$Base$renderLayout = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$layout,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$clip,
				$mdgriffith$elm_ui$Element$Background$color($author$project$Ui$Colors$color.fk),
				$mdgriffith$elm_ui$Element$Font$size(14),
				$mdgriffith$elm_ui$Element$Font$family(
				_List_fromArray(
					[$mdgriffith$elm_ui$Element$Font$sansSerif]))
			]),
		A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
				]),
			_List_fromArray(
				[
					$author$project$Layout$Maincontent$Base$mainContent(model),
					$author$project$Layout$Statusbar$statusBar(model)
				])));
};
var $author$project$Main$view = function (model) {
	return $author$project$Layout$Base$renderLayout(model);
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{fx: $author$project$Main$init, hy: $author$project$Main$subscriptions, h7: $author$project$Main$update, K: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (y) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (x) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (ua) {
							return $elm$json$Json$Decode$succeed(
								{cL: ua, ip: x, iq: y});
						},
						A2($elm$json$Json$Decode$field, 'ua', $elm$json$Json$Decode$string));
				},
				A2($elm$json$Json$Decode$field, 'x', $elm$json$Json$Decode$int));
		},
		A2($elm$json$Json$Decode$field, 'y', $elm$json$Json$Decode$int)))(0)}});}(this));