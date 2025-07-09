import { TSESTree, AST_NODE_TYPES } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  name => `https://github.com/your-org/eslint-plugin-no-browsermodule/blob/main/docs/rules/${name}.md`
);

export default createRule({
  name: 'no-browsermodule-in-feature',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow importing BrowserModule outside of the root AppModule'      
    },
    messages: {
      noBrowser:
        'Importing BrowserModule is only allowed in your root AppModule (e.g. app.module.ts).',
    },
    schema: [
      {
        type: 'object',
        properties: {
          rootFiles: {
            type: 'array',
            items: { type: 'string' },
            default: ['app.module.ts'],
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ rootFiles: ['app.module.ts'] }],
  create(context, [options]) {
    const filename = context.filename;
    const { rootFiles } = options;

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        // only care about imports from @angular/platform-browser
        if (
          typeof node.source.value !== 'string' ||
          node.source.value !== '@angular/platform-browser'
        ) {
          return;
        }

        for (const specifier of node.specifiers) {
          // narrow to ImportSpecifier
          if (specifier.type !== AST_NODE_TYPES.ImportSpecifier) {
            continue;
          }

          // now specifier.imported is definitely an Identifier
          if (
            specifier.imported.type === AST_NODE_TYPES.Identifier &&
            specifier.imported.name === 'BrowserModule'
          ) {
            // if this isn't one of our allowed root files, error
            if (!rootFiles.some(root => filename.endsWith(root))) {
              context.report({
                node: specifier,
                messageId: 'noBrowser',
              });
            }
          }
        }
      },
    };
  },
});
