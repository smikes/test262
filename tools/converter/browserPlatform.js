// Copyright 2011 by Google, Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.


/**
 * Each implementation of *Platform.js abstracts the underlying OS and JS
 * engine peculiarities.
 *
 * <p>The implementation here is for running in many browsers, and so
 * should assume the platform may be anything from ES3+Reality
 * forward, including somewhat non-conformant implementations.
 */
(function (global) {
   "use strict";

   /////////////////// Development Switches /////////////////

   var VERBOSE = true;

   // Affects side effecting os operations,
   // currently only platform.writeSpawn and platform.mkdir.
   var DRY_RUN = false;

   // When converting paths to path strings, should the pathstring be
   // relative to the TEST262_ROOT, or should it be relative to the
   // current working directory?
   var ABSOLUTE_PATHSTR = false;

   ////////////////////////////////////////////////////////

   global.t262 = global.t262 || {};

   var platform = global.t262.platform = {};

   /**
    * Appends a bunch of RegExps together into a single RegExp,
    * solving both the RegExp-one-liner problem and the doubled
    * backslash problem when composing literal strings.
    *
    * <p>The arguments can be any mixture of RegExps and strings. By
    * expressing the portions that should be well formed regexps as
    * regexps, we catch well-formedness errors within such a portion
    * separately. The strings are added as is without escaping --
    * BEWARE. By not escaping the strings, we can use them to
    * represent the individually unbalanced fragments, like capturing
    * parens, around other regexps. If arguments[0] is a RegExp, we
    * use its flags on the resuting RegExp.
    *
    * <p>Not platform dependent, so does not really belong in this
    * file.
    *
    * <p>TODO(erights): must rewrite to avoid depending on anything
    * not in ES3+Reality.
    */
   function regExp(var_args) {
     var args = [].slice.call(arguments, 0);
     var reSrc = args.map(function(arg) {
       return (typeof arg === 'string') ? arg : arg.source;
     }).join('');
     var flags = '';
     if (typeof args[0] === 'object') {
       var parts = (''+args[0]).split('/');
       flags = parts[parts.length -1];
     }
     return new RegExp(reSrc, flags);
   }
   platform.regExp = regExp;

   ////////////////// Needed for building and running //////////////


   // Someday these will be https:
   var ABS_ROOT = ['http://test262.ecmascript.org'];

   var TEST262_ROOT = ABSOLUTE_PATHSTR ? ABS_ROOT : ['http:'];

   var TEST262_ROOT_STR = TEST262_ROOT.join('/');

   var CONVERTER_PATH = ['resources', 'scripts', 'global'];
   platform.CONVERTER_PATH = CONVERTER_PATH;

   var ME_PATH = CONVERTER_PATH.concat('browserPlatform.js');

   /**
    *
    */
   function validatePath(path) {
     var pathStr = path.join('/');
     path.forEach(function(segment) {
       if (segment === '') {
         throw new Error('A path cannot have empty segments: ' + pathStr);
       }
       if (segment === '/') {
         throw new Error('Path insufficiently parsed: ' + pathStr);
       }
       if (segment === '..') {
         throw new Error('Cannot use "..": ' + pathStr);
       }
     });
     return path;
   }

   /**
    * Converts a relPath to a relPathStr.
    *
    * A relPath is an array of filenames relative to some base onto
    * which it will be concatenated before use.
    */
   function toRelPathStr(relPath) {
     validatePath(relPath);
     return relPath.join('/');
   }
   platform.toRelPathStr = toRelPathStr;

   /**
    * Converts a path to a pathStr.
    *
    * A path is an array of filenames relative to TEST262_ROOT. A
    * pathStr is a (possibly fully qualified string) for referring to
    * that file on the current platform, according to the operations
    * in this *Platform.js file.
    */
   function toPathStr(path) {
     validatePath(path);
     return TEST262_ROOT.concat(path).join('/');
   }
   platform.toPathStr = toPathStr;

   /**
    * Returns the text found at path, with newlines normalized and
    * any initial BOM (Unicode Byte Order Mark) removed.
    *
    * Note: Don't simply revise this (without renamings) to follow the
    * general pattern of also defining a local 'read' function, as it
    * will mask the v8 shell's read function, which we use.
    */
   platform.read = function(path) {
     var text = "TBD".
       replace(/\r\n/g, '\n').
       replace(/\r/g, '\n');
     if (text.charCodeAt(0) === 0xfeff) { return text.substring(1); }
     return text;
   };

   /**
    * How one JavaScript script possibly spawns another and possibly
    * redirects its printed form to a chosen file (or resource).
    *
    * <p>For example, if !DRY_RUN, then<pre>
    *   writeSpawn([], 'print(+arguments[0] + +arguments[1]);', ['3', '5'])
    * </pre>
    * should return the string "8" if writeSpawn decides to spawn.
    *
    * @param scriptPaths An array of path arrays of JavaScript source
    * files to be loaded into the spawned JS engine (in addition to
    * the spawning platform file) if we are indeed spawning.
    * @param opt_src A Program to be evaluated in an environment in
    * which "arguments" is bound to the list of strings provided by
    * opt_args. If spawned, the result is whatever the program writes
    * to its stdout. On platforms (like SES) where this can be a
    * safely confining evaluation, it should be. The implementation
    * here is not safe.
    * @param opt_args A list of strings to be bound to top-level
    * 'arguments' both in opt_src and in the possibly spawed scripts.
    * @param opt_targetPath A path array naming a file where the
    * result of opt_src should be written. In the browser context, the
    * result is PUT (or should that be POST), using XHR, to the target
    * resource.
    * @param opt_spawn_required If truthy, forces spawning.
    * @returns If there is a target, then the null string. Otherwise,
    * the string result of evaluating opt_src.
    */
   function writeSpawn(scriptPaths,
                       opt_src,
                       opt_args,
                       opt_targetPath,
                       opt_spawn_required,
                       opt_forceNonStrict) {
     "TBD"();
     if (VERBOSE || DRY_RUN) { "TBD"(); }
     if (DRY_RUN) { return ''; }

     return "TBD";
   }
   platform.writeSpawn = writeSpawn;


   ////////////////// Only needed for running //////////////////////


 })(this);