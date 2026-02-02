#!/usr/bin/env node

/**
 * Image optimization script
 * Converts large images to WebP format with responsive sizes
 * Run: node scripts/optimize-images.mjs
 */

import sharp from "sharp";
import { mkdir, access, readdir, stat } from "fs/promises";
import { join, basename, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, "..", "public");
const outputDir = join(publicDir, "optimized");

// Images to optimize with their configurations
const imagesToOptimize = [
    { file: "camping.jpg", sizes: [640, 1024, 1920] },
    { file: "paviljoen-jd.png", sizes: [640, 1024, 1920] },
    { file: "verkleed-background.png", sizes: [640, 1024, 1920] },
];

// WebP quality (95% for maximum visual fidelity)
const WEBP_QUALITY = 95;

async function ensureOutputDir() {
    try {
        await access(outputDir);
    } catch {
        await mkdir(outputDir, { recursive: true });
        console.log(`Created output directory: ${outputDir}`);
    }
}

async function getFileSize(filePath) {
    const stats = await stat(filePath);
    return stats.size;
}

function formatBytes(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

async function optimizeImage(config) {
    const inputPath = join(publicDir, config.file);
    const baseName = basename(config.file, extname(config.file));

    try {
        await access(inputPath);
    } catch {
        console.warn(`⚠️  Skipping ${config.file} - file not found`);
        return;
    }

    const originalSize = await getFileSize(inputPath);
    console.log(`\n📸 Processing ${config.file} (${formatBytes(originalSize)})`);

    const image = sharp(inputPath);
    const metadata = await image.metadata();

    let totalOutputSize = 0;

    for (const width of config.sizes) {
        // Skip if image is smaller than target width
        if (metadata.width && metadata.width < width) {
            console.log(`   Skipping ${width}w - source image is ${metadata.width}px wide`);
            continue;
        }

        const outputPath = join(outputDir, `${baseName}-${width}w.webp`);

        await sharp(inputPath)
            .resize(width, null, {
                withoutEnlargement: true,
                fit: "inside",
            })
            .webp({ quality: WEBP_QUALITY })
            .toFile(outputPath);

        const outputSize = await getFileSize(outputPath);
        totalOutputSize += outputSize;
        console.log(`   ✓ ${baseName}-${width}w.webp (${formatBytes(outputSize)})`);
    }

    // Also create a full-size WebP version
    const fullOutputPath = join(outputDir, `${baseName}.webp`);
    await sharp(inputPath)
        .webp({ quality: WEBP_QUALITY })
        .toFile(fullOutputPath);

    const fullSize = await getFileSize(fullOutputPath);
    totalOutputSize += fullSize;
    console.log(`   ✓ ${baseName}.webp (${formatBytes(fullSize)}) [full size]`);

    const savings = originalSize - totalOutputSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1);
    console.log(
        `   📉 Total: ${formatBytes(totalOutputSize)} (saved ${formatBytes(savings)}, ${savingsPercent}%)`
    );
}

async function main() {
    console.log("🚀 Starting image optimization...\n");
    console.log(`   Input:  ${publicDir}`);
    console.log(`   Output: ${outputDir}`);

    await ensureOutputDir();

    for (const config of imagesToOptimize) {
        await optimizeImage(config);
    }

    // List final output
    console.log("\n✅ Optimization complete!\n");

    try {
        const files = await readdir(outputDir);
        let totalSize = 0;
        for (const file of files) {
            const size = await getFileSize(join(outputDir, file));
            totalSize += size;
        }
        console.log(`   Total optimized images: ${files.length} files (${formatBytes(totalSize)})`);
    } catch {
        // Output dir might not exist if no images were processed
    }
}

main().catch((error) => {
    console.error("❌ Optimization failed:", error);
    process.exit(1);
});
