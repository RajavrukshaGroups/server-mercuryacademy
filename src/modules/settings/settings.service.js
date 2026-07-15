import Settings from "./settings.model.js";

import baseService from "../../services/base.service.js";

const findSettings = () =>
  Settings.findOne({
    isDeleted: false,
  });

/**
 * Get Settings
 */
const getSettings = async () => {
  let settings = await findSettings()
    .populate("branding.logo")
    .populate("branding.favicon")
    .populate("branding.defaultBanner")
    .populate("seo.ogImage");

  /**
   * Create default settings if none exist
   */
  if (!settings) {
    settings = await Settings.create({});
  }

  return settings;
};

/**
 * Update Settings
 */
const updateSettings = async (payload) => {
  let settings = await findSettings();

  /**
   * Create default settings if none exist
   */
  if (!settings) {
    settings = await Settings.create({});
  }

  /**
   * Merge incoming payload
   */
  Object.assign(settings, payload);

  await settings.save();

  return await Settings.findById(settings._id)
    .populate("branding.logo")
    .populate("branding.favicon")
    .populate("branding.defaultBanner")
    .populate("seo.ogImage");
};

const settingsService = {
  getSettings,
  updateSettings,
};

export default settingsService;
