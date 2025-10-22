# 🌐 Personal Blog - Auto-Generated Post System

A static blog website with **automatic folder and file discovery**!

## ⚡ Quick Start

### Add Content (Files & Folders)
```bash
# Add to existing series
docs/design-system/3.new-post.html

# Or create new series
mkdir docs/golang-series
docs/golang-series/1.basics.html
```

### Update Website
```bash
npm run build
```

**That's it!** All folders and files are automatically discovered and displayed.

## 🎯 Key Features

- ✅ **Auto-discovers all folders** in `docs/`
- ✅ **Auto-finds all HTML files** in each folder
- ✅ **Auto-extracts titles** from your HTML
- ✅ **Auto-generates series dropdowns**
- ✅ **Zero manual configuration** required

## 📁 Project Structure

```
docs/
  ├── index.html          # Main page (loads posts.js)
  ├── posts.js            # Auto-generated (by build script)
  ├── design-system/      # Series folder ← Auto-discovered!
  │   ├── 1.post.html
  │   └── 2.post.html
  ├── lang-chain-series/  # Series folder ← Auto-discovered!
  │   └── part-1.html
  └── YOUR-NEW-FOLDER/    # New series ← Auto-discovered!
      └── your-file.html
```

## 🚀 Workflow

1. **Create**: Add HTML files to any folder in `docs/`
2. **Build**: Run `npm run build` 
3. **Deploy**: Commit and push to GitHub Pages

The build script automatically:
- Scans all folders
- Finds all HTML files  
- Extracts titles
- Generates `posts.js`
- Your website updates!

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Examples and usage
- **[AUTO_POSTS_README.md](AUTO_POSTS_README.md)** - Detailed explanation

## 🤔 Why Run a Build Command?

**Browser limitation**: JavaScript in browsers cannot read folders/files from disk for security reasons.

**Solution**: A simple Node.js script scans your folders and generates a JavaScript file that the browser can load. It's the closest we can get to "fully automatic" for static sites!

## 🎨 Customization

Edit `build-posts.js` to customize icons:
```javascript
const folderIconMap = {
    'design-system': '🎨',
    'golang-series': '🐹',  // Add your own!
    'default': '📄'
};
```

## 📝 Example

```bash
# Add new series with 3 posts
mkdir docs/javascript-tutorial
touch docs/javascript-tutorial/{1.intro,2.basics,3.advanced}.html

# Update website
npm run build

# Result: New "Javascript Tutorial Series" with 3 posts appears!
```

---

**Made with ❤️ by Hoang Phan**
