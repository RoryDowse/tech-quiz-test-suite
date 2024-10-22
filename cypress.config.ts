import { defineConfig } from 'cypress';
// Import custom Vite config for component testing
import customViteConfig from './vite.config'; 

export default defineConfig({
    // Configuration for component testing
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
            viteConfig: customViteConfig, // Pass the custom Vite configuration (from vite.config.ts)
        },
        // Specify the pattern to locate component test files
        specPattern: 'cypress/component/**/*.cy.{js,ts,jsx,tsx}',
    },

    // Configuration for end-to-end testing
    e2e: {
        baseUrl: 'http://localhost:3001',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});