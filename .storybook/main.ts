import type { StorybookConfig } from "@storybook/react-vite";
import path from 'path';
import { fileURLToPath } from 'url';
import type { Plugin } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../app/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ],
  async viteFinal(config) {
    const mockImagePath = path.resolve(__dirname, './next-image-mock.tsx');
    const mockLinkPath = path.resolve(__dirname, './next-link-mock.tsx');
    const rootPath = path.resolve(__dirname, '..');
    
    // Use resolve.alias but preserve existing configuration
    if (!config.resolve) {
      config.resolve = {};
    }
    
    // Get existing aliases
    const existingAliases = Array.isArray(config.resolve.alias)
      ? config.resolve.alias
      : config.resolve.alias
        ? Object.entries(config.resolve.alias).map(([find, replacement]) => ({
            find,
            replacement: typeof replacement === 'string' ? replacement : replacement,
          }))
        : [];
    
    // Add our aliases
    const mockRouterPath = path.resolve(__dirname, './next-router-mock.tsx');
    config.resolve.alias = [
      ...existingAliases,
      {
        find: 'next/image',
        replacement: mockImagePath,
      },
      {
        find: 'next/link',
        replacement: mockLinkPath,
      },
      {
        find: 'next/navigation',
        replacement: mockRouterPath,
      },
      {
        find: '@',
        replacement: rootPath,
      },
    ];
    
    return config;
  },
};
export default config;
