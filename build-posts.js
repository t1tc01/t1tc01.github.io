#!/usr/bin/env node

/**
 * Build script to automatically scan directories and generate posts.js
 * Run this script whenever you add new posts: node build-posts.js
 * 
 * This script will:
 * 1. Scan all series directories
 * 2. Find all HTML files
 * 3. Extract titles from the files
 * 4. Generate a posts.js file with all the data
 */

const fs = require('fs');
const path = require('path');

// Default icon map based on folder names
const folderIconMap = {
    'design-system': '🎨',
    'lang-chain-series': '🔗',
    'langchain-series': '🔗',
    'leetcode-series': '💻',
    'algorithm': '🧮',
    'tutorial': '📚',
    'blog': '📝',
    'project': '🚀',
    'note': '📔',
    'default': '📄'
};

/**
 * Get icon for a folder name
 */
function getFolderIcon(folderName) {
    return folderIconMap[folderName.toLowerCase()] || folderIconMap.default;
}

/**
 * Convert folder name to readable title
 */
function folderToTitle(folderName) {
    return folderName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') + ' Series';
}

/**
 * Auto-discover all series folders in docs directory
 */
function autoDiscoverSeries() {
    const docsPath = 'docs';
    const seriesConfig = [];
    
    try {
        const items = fs.readdirSync(docsPath, { withFileTypes: true });
        
        items.forEach(item => {
            // Only process directories, skip index.html and other files
            if (item.isDirectory()) {
                const folderName = item.name;
                const folderPath = path.join(docsPath, folderName);
                
                seriesConfig.push({
                    id: folderName,
                    icon: getFolderIcon(folderName),
                    title: folderToTitle(folderName),
                    description: `Posts and articles about ${folderToTitle(folderName).replace(' Series', '')}`,
                    directory: folderPath,
                    filePattern: /.*\.html$/  // Match all HTML files
                });
                
                console.log(`📁 Discovered series: ${folderName}`);
            }
        });
        
        // Sort by folder name for consistent ordering
        seriesConfig.sort((a, b) => a.id.localeCompare(b.id));
        
    } catch (error) {
        console.error('Error discovering series:', error.message);
    }
    
    return seriesConfig;
}

/**
 * Extract title from HTML file
 */
function extractTitleFromHTML(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Try to find title in <title> tag
        const titleMatch = content.match(/<title>(.*?)<\/title>/i);
        if (titleMatch) {
            return titleMatch[1].trim();
        }
        
        // Try to find first <h1> tag
        const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
        if (h1Match) {
            return h1Match[1].replace(/<[^>]*>/g, '').trim();
        }
        
        // Fallback to filename
        return path.basename(filePath, '.html')
            .replace(/^\d+\./, '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        return path.basename(filePath, '.html');
    }
}

/**
 * Extract part number from filename
 */
function extractPartNumber(filename) {
    // Try to match "1.filename.html" or "part-1-filename.html"
    const match = filename.match(/^(\d+)\./) || filename.match(/part-(\d+)/i);
    if (match) {
        return `Part ${match[1]}`;
    }
    
    // Special case for list-of-content or index files
    if (filename.includes('list') || filename.includes('index')) {
        return '📋';
    }
    
    return '📄';
}

/**
 * Scan a directory and extract post information
 */
function scanDirectory(dirPath, filePattern, basePath) {
    try {
        if (!fs.existsSync(dirPath)) {
            console.warn(`Directory not found: ${dirPath}`);
            return [];
        }

        const files = fs.readdirSync(dirPath)
            .filter(file => filePattern.test(file))
            .sort();

        return files.map(file => {
            const fullPath = path.join(dirPath, file);
            const relativePath = path.relative('docs', fullPath);
            const title = extractTitleFromHTML(fullPath);
            const partNumber = extractPartNumber(file);

            return {
                file,
                url: relativePath,
                title,
                partNumber
            };
        });
    } catch (error) {
        console.error(`Error scanning directory ${dirPath}:`, error.message);
        return [];
    }
}

/**
 * Build the complete posts structure
 */
function buildPostsData() {
    const posts = {};
    
    // Auto-discover all series folders
    const seriesConfig = autoDiscoverSeries();
    
    if (seriesConfig.length === 0) {
        console.warn('⚠️  No series folders found in docs/ directory');
        return posts;
    }

    seriesConfig.forEach(series => {
        const dirPath = series.directory;
        const postsInSeries = scanDirectory(dirPath, series.filePattern, 'docs');

        posts[series.id] = {
            icon: series.icon,
            title: series.title,
            description: series.description,
            count: postsInSeries.length,
            posts: postsInSeries
        };

        console.log(`✓ Found ${postsInSeries.length} posts in ${series.title}`);
    });

    return posts;
}

/**
 * Generate JavaScript module content
 */
function generateJavaScriptModule(postsData) {
    return `// Auto-generated file - DO NOT EDIT MANUALLY
// Generated on: ${new Date().toISOString()}
// Run 'node build-posts.js' to regenerate this file

/**
 * Posts data for all series
 * This file is automatically generated by scanning the directories
 */
const postsData = ${JSON.stringify(postsData, null, 2)};

// Export for use in the HTML page
if (typeof window !== 'undefined') {
    window.POSTS_DATA = postsData;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = postsData;
}
`;
}

/**
 * Main execution
 */
function main() {
    console.log('🔨 Auto-generating posts from directory structure...\n');

    const postsData = buildPostsData();
    const outputPath = path.join('docs', 'posts.js');

    // Generate JavaScript module
    const jsContent = generateJavaScriptModule(postsData);
    fs.writeFileSync(outputPath, jsContent, 'utf8');

    console.log(`\n✅ Successfully generated ${outputPath}`);
    console.log(`\nTotal series: ${Object.keys(postsData).length}`);
    console.log(`Total posts: ${Object.values(postsData).reduce((sum, s) => sum + s.count, 0)}`);
    console.log('\n💡 The posts will now be automatically displayed in your HTML page!');
    console.log('💡 Run this script again whenever you add new posts: node build-posts.js');
}

// Run the script
main();

