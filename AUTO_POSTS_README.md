# 🚀 Fully Automatic Posts System

This blog **automatically discovers ALL folders and files** - no manual configuration needed!

## ⚡ Super Simple Workflow

### 1️⃣ Add New Content

**Option A: Add a post to existing series**
```bash
# Just create a file in any existing folder
docs/design-system/3.my-new-post.html
docs/leetcode-series/binary-search.html
```

**Option B: Create a brand new series** 
```bash
# Create a new folder and add files
mkdir docs/golang-series
echo "<html>...</html>" > docs/golang-series/part-1.html
```

### 2️⃣ Run ONE Simple Command
```bash
npm run build
# or
node build-posts.js
```

### 3️⃣ Done! 🎉
The script **automatically**:
- ✅ Discovers ALL folders in `docs/`
- ✅ Scans ALL HTML files in each folder  
- ✅ Extracts titles automatically
- ✅ Creates series dropdowns
- ✅ Generates `docs/posts.js`
- ✅ Your website shows everything!

## 🎯 Key Features

### Zero Configuration Required
- ✅ **New folder?** Automatically detected!
- ✅ **New file?** Automatically found!
- ✅ **Icons & titles?** Auto-generated from folder names!
- ✅ **Post order?** Sorted by filename!

### Example: Adding a New Series
```bash
# Create new folder
mkdir docs/javascript-tutorial

# Add files
touch docs/javascript-tutorial/1.intro.html
touch docs/javascript-tutorial/2.variables.html

# Run build
npm run build

# That's it! New series appears automatically!
```

## 📝 File Naming Convention

For best results, name your files like this:
- **Design System**: `1.your-title.html`, `2.next-post.html`
- **LangChain**: `part-1-your-title.html`, `part-2-next.html`
- **LeetCode**: `any-name.html`

The script will automatically extract part numbers and titles!

## 🎯 Workflow

```
Add new post file → Run build-posts.js → Commit & push → Done!
```

That's it! No need to manually edit `index.html` or any JSON files.

## 🎨 Customizing Icons

The script auto-assigns icons based on folder names. To customize, edit `build-posts.js`:

```javascript
const folderIconMap = {
    'design-system': '🎨',
    'lang-chain-series': '🔗',
    'leetcode-series': '💻',
    'golang-series': '🐹',      // Add your own!
    'javascript-tutorial': '⚡',  // Add your own!
    'default': '📄'              // Fallback icon
};
```

## 🤔 Why Can't JavaScript Do This Automatically?

**Browser Security**: Browsers cannot read folders/files from disk for security reasons. 

**The Solution**: Run a simple build script (`npm run build`) that scans folders and generates a JavaScript file. It's the closest we can get to "fully automatic" for static sites!

## 📁 Generated Files

- `docs/posts.js` - Auto-generated (DO NOT EDIT MANUALLY)
  - This file is loaded by `index.html`
  - Contains all post metadata
  - Regenerated each time you run the build script

## ✨ Benefits

- ✅ **Zero config** - No manual editing needed
- ✅ **Auto-discovers folders** - New series detected automatically  
- ✅ **Auto-finds files** - All HTML files included automatically
- ✅ **Auto-extracts titles** - From your HTML `<title>` tags
- ✅ **Auto-generates icons** - Based on folder names
- ✅ **One command workflow** - Just run `npm run build`

## 📝 Complete Example

```bash
# Starting point: You have 3 series
docs/
  design-system/
  lang-chain-series/
  leetcode-series/

# Add a completely new series
mkdir docs/golang-tutorial
echo "<html><title>Go Basics</title>...</html>" > docs/golang-tutorial/1.basics.html
echo "<html><title>Go Advanced</title>...</html>" > docs/golang-tutorial/2.advanced.html

# Add to existing series  
echo "<html><title>New Post</title>...</html>" > docs/design-system/3.new-post.html

# Update everything
npm run build

# Result: All 4 series with all posts automatically displayed! ✨
```

