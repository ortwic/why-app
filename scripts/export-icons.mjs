import fs from "fs";
import path from "path";
import sharp from "sharp";

const src = path.resolve("src/assets/icons/logo.svg");
const outDir = path.resolve("src/assets/icons");

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function generateIcons() {
  console.log("Generating icons...");

  for (const size of sizes) {
    const baseName = `icon-${size}.png`;

    const colorFile = path.join(outDir, baseName);
    await sharp(src)
      .resize(size, size)
      .png()
      .toFile(colorFile);
    console.log(`Color: ${baseName}`);

    // const monoFile = path.join(outDir, `icon-${size}-mono.png`);
    // await sharp(src)
    //   .resize(size, size)
    //   .png()
    //   .tint("#808080")
    //   .toFile(monoFile);
    // console.log(`Monochrome: icon-${size}-mono.png`);
  }

  const icoFile = path.join(outDir, "favicon.ico");
  await sharp(src)
    .resize(48, 48)
    .toFormat("ico")
    .toFile(icoFile);

  console.log("Done! All icons written to:", outDir);
}

generateIcons().catch(console.error);
