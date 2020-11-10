/*
 * The MIT License (MIT)
 * Copyright (c) 2020 Karl STEIN
 */

module.exports = (api) => {
  const presets = [
    '@babel/preset-env',
  ];
  const plugins = [];

  api.cache.forever();

  return {
    presets,
    plugins,
  };
};
