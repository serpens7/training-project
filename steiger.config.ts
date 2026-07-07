import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
    ...fsd.configs.recommended,

    // ── My compromise ──────────────────────────────────────────────────
    // Store types (StateSchema / ThunkConfig) live in `app/providers/StoreProvider`
    // and are consumed by model-layer code on lower layers. Fully removing this
    // requires Redux module augmentation (a global, self-augmented StateSchema).
    // Until then these imports are surfaced as warnings, not CI-blocking errors.
    {
        files: ['./src/**/model/**'],
        rules: {
            'fsd/forbidden-imports': 'warn',
        },
    },
    // Test & Storybook utilities legitimately need the composed store from `app`.
    {
        files: ['./src/shared/config/storybook/**', './src/shared/lib/tests/**'],
        rules: {
            'fsd/forbidden-imports': 'warn',
        },
    },

    // ── Deliberate project conventions (disabled, documented tech-debt) ───────
    {
        files: ['./src/**'],
        rules: {
            // `shared` uses deep imports and per-segment folders without index.ts.
            // Re-enable once shared/ui & shared/lib expose per-segment public APIs.
            'fsd/public-api': 'off',
            'fsd/no-public-api-sidestep': 'off',
            // Intentionally small slices (Comment/Country/Currency, switchers, …).
            'fsd/insignificant-slice': 'off',
            // app/providers/* deliberately use ui/config/model folder names.
            'fsd/no-reserved-folder-names': 'off',
            // Custom segments (types/const) used across the project.
            'fsd/segments-by-purpose': 'off',
            'fsd/repetitive-naming': 'off',
            // widgets/Page keeps a flat structure (no ui/ segment) for now.
            'fsd/no-segmentless-slices': 'off',
        },
    },
]);
