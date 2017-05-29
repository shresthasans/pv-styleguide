### Frontend UI Development with Gulp and living Styleguide (SC5)
---

#### Getting Started

1. Open `CMD` or `Terminal`, point the path to your designed folder.
2. In the same CMD or , run `cd gulp-fe-dev`
3. Next, run `npm i` (`i` stands for `install`)
 
Now, run `gulp` from same CMD window. It will open the project server: 
- `Project` - `http://localhost:3000/`
- `Styleguide` - `http://localhost:3000/`

Continue working, as soon as you save - it will compile CSS, and Refresh HTML too.

##### Gulp Tasks
- `gulp` - Compiles the development files and generate the production ready files.
- `gulp styleguide` - Generate the styleguides with *styleguide* folder on root path.
- `gulp webstandards` - Validates whether your HTML/CSS/JS is up-to-date or not and or according to Web Standards.


##### File Structure

**Production Files:-**
```
	+-- dist
	|   +-- images
	|   +-- scripts
	|	|   +-- main.min.js
	|   +-- styles
	|	|   +-- styles.min.css 
	|   +-- index.html
```

**Development Files:-**
```
	+-- src
	|   +-- fonts
	|   +-- images
	|   +-- scripts
	|	|   +-- vendors
	|	|	|   +-- Dependencies 1
	|	|	|   +-- Dependencies 2
	|	|   +-- scripts.js
	|   +-- scss
	|	|   +-- base
	|	|	|   +-- _branding.scss
	|	|	|   +-- _typo.scss
	|	|	|   +-- _units.scss
	|	|	|   +-- _vars.scss
	|	|   +-- components
	|	|	|   +-- _button.scss
	|	|	|   +-- _form.scss
	|	|   +-- layout
	|	|	|   +-- _header.scss
	|	|	|   +-- _nav.scss
	|	|	|   +-- _footer.scss
	|	|	|   +-- _page.scss
	|	|   +-- modules
	|	|	|   +-- _modules-name.scss
	|	|   +-- vendors
	|	|	|   +-- _vendors 1.scss
	|	|	|   +-- _vendors 1.scss
	|	|   +-- styles.scss
	|   +-- includes
	|	|	|   +-- header.html
	|	|	|   +-- aside.html
	|	|	|   +-- footer.html
	|   +-- index.html
```


