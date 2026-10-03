import sharp from "sharp";

const SUPPORTED_FORMATS = [
  "jpeg",
  "png",
  "webp",
];

const MIN_WIDTH = 300;
const MIN_HEIGHT = 200;

export async function validateImage(
  imagePath
) {
  try {
    const metadata =
      await sharp(imagePath).metadata();

    const {
      width,
      height,
      format,
    } = metadata;

    const errors = [];

    // Format check
    if (
      !SUPPORTED_FORMATS.includes(format)
    ) {
      errors.push(
        `Unsupported image format: ${format || "unknown"}`
      );
    }

    // Width check
    if (
      !width ||
      width < MIN_WIDTH
    ) {
      errors.push(
        `Image width must be at least ${MIN_WIDTH}px`
      );
    }

    // Height check
    if (
      !height ||
      height < MIN_HEIGHT
    ) {
      errors.push(
        `Image height must be at least ${MIN_HEIGHT}px`
      );
    }

    return {
      valid: errors.length === 0,

      image: imagePath,

      format: format || null,

      width: width || null,

      height: height || null,

      errors,
    };
  } catch (error) {
    return {
      valid: false,

      image: imagePath,

      format: null,

      width: null,

      height: null,

      errors: [
        "Image could not be read or is corrupted.",
      ],
    };
  }
}