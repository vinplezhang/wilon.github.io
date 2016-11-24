forked from contra/gulp-concat
support my blog project.  https://github.com/wilon/wilon.github.io


## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-concat-blogdata`

## Information

<table>
<tr>
<td>Package</td><td>gulp-concat-blogdata</td>
</tr>
<tr>
<td>Description</td>
<td>Concatenates files</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.10</td>
</tr>
</table>

## Usage

```js
var concatBlogMd = require('gulp-concat-blogdata');

gulp.task('scripts', function() {
  return gulp.src('./lib/*.md')
    .pipe(concatBlogMd('all.json'))
    .pipe(gulp.dest('./dist/'));
});
```

This will concat files by your operating systems newLine. It will take the base directory from the first file that passes through it.

Files will be concatenated in the order that they are specified in the `gulp.src` function. For example, to concat `./lib/file3.md`, `./lib/file1.md` and `./lib/file2.md` in that order, the following code will create a task to do that:

```js
var concatBlogMd = require('gulp-concat-blogdata');

gulp.task('scripts', function() {
  return gulp.src(['./lib/file3.md', './lib/file1.md', './lib/file2.md'])
    .pipe(concatBlogMd('all.json'))
    .pipe(gulp.dest('./dist/'));
});
```

## example

```md

 md file1:

 ### the title1
 ```language
    the content1
    ...
 ```
 ...

 result json file:
 [
     {
         "tag": "file1",
         "name": "title1",
         "des": "    the content1    ..."
     },
     ...
 ]

```