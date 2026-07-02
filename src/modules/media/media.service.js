import path from "path";

import Media from "./media.model.js";

import ApiError from "../../utils/ApiError.js";
import baseService from "../../services/base.service.js";

import uploadToCloudinary from "../../utils/cloudinary-upload.js";
import cloudinary from "../../config/cloudinary.js";

/**
 * Upload Media
 */
const uploadMedia = async (file, payload) => {
  if (!file) {
    throw new ApiError(400, "File is required.");
  }

  const folder = payload.folder || "general";

  const uploadResult = await uploadToCloudinary(
    file,
    `mercury-academy/${folder}`,
  );

  const media = await Media.create({
    originalName: file.originalname,
    fileName: uploadResult.original_filename,
    publicId: uploadResult.public_id,
    url: uploadResult.secure_url,

    mimeType: file.mimetype,

    resourceType: uploadResult.resource_type,

    extension: path.extname(file.originalname).replace(".", "").toLowerCase(),
    size: file.size,

    width: uploadResult.width || null,
    height: uploadResult.height || null,

    folder,

    altText: payload.altText,
    caption: payload.caption,

    featured: payload.featured,
    displayOrder: payload.displayOrder,
    status: payload.status,
  });

  return media;
};

/**
 * Get Media
 */
const getMedia = async ({
  page = 1,
  limit = 10,
  search = "",
  folder,
  mimeType,
  resourceType,
  featured,
  status,
  sortBy = "displayOrder",
  sortOrder = "asc",
}) => {
  const filter = {};

  if (search) {
    filter.$or = [
      {
        originalName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        altText: {
          $regex: search,
          $options: "i",
        },
      },
      {
        caption: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (folder) {
    filter.folder = folder;
  }

  if (mimeType) {
    filter.mimeType = mimeType;
  }

  if (resourceType) {
    filter.resourceType = resourceType;
  }

  if (featured !== undefined) {
    filter.featured = featured;
  }

  if (status) {
    filter.status = status;
  }

  return await baseService.paginate(Media, filter, {
    page,
    limit,
    sortBy,
    sortOrder,
  });
};

/**
 * Get Media By ID
 */
const getMediaById = async (id) => {
  return await baseService.findById(Media, id);
};

/**
 * Update Media
 */
const updateMedia = async (id, payload) => {
  const media = await baseService.findById(Media, id);

  Object.assign(media, payload);

  await media.save();

  return media;
};

/**
 * Delete Media
 */
const deleteMedia = async (id) => {
  const media = await baseService.findById(Media, id);

  await cloudinary.uploader.destroy(media.publicId, {
    resource_type: media.resourceType,
  });

  await baseService.softDelete(Media, id);

  return null;
};

const mediaService = {
  uploadMedia,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
};

export default mediaService;
