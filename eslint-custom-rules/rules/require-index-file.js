import fs from 'fs';
import path from 'path';

const INDEX_FILES = ['index.ts', 'index.tsx', 'index.js', 'index.jsx'];

export default {
  meta: {
    type: 'layout',
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          folders: {
            type: 'array',
            items: { type: 'string' },
          },
          ignoreSubfolders: {
            type: 'array',
            items: { type: 'string' },
          },
          ignoreFilePatterns: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {};
    const allowedFolders = options.folders || [];
    const ignoreSubfolders = options.ignoreSubfolders || [];
    const ignoreFilePatterns = options.ignoreFilePatterns || [];

    return {
      Program(node) {
        const filename = context.getFilename();
        if (filename === '<input>') {
          return;
        }

        const basename = path.basename(filename);

        if (INDEX_FILES.includes(basename)) {
          return;
        }

        if (ignoreFilePatterns.some((p) => basename.includes(p))) {
          return;
        }

        const fileDir = path.dirname(filename);

        const projectRoot = context.getCwd();
        const relativeDir = path.relative(path.join(projectRoot, 'src'), fileDir).replace(/\\/g, '/');

        const pathSegments = relativeDir.split('/');
        const topFolder = pathSegments[0];

        if (!allowedFolders.includes(topFolder)) {
          return;
        }

        if (pathSegments.slice(1).some((seg) => ignoreSubfolders.includes(seg))) {
          return;
        }

        const hasIndexNearby = INDEX_FILES.some((indexFile) => fs.existsSync(path.join(fileDir, indexFile)));

        if (!hasIndexNearby) {
          context.report({
            node,
            message: 'Missing index file in this folder',
          });
        }
      },
    };
  },
};
