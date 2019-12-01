import Schema from 'micro-schema-validator';
const RULES = {
  windowSelector: {
    type: 'string',
    required: false,
  },
  minWidth: {
    type: 'number',
    size: { min: 1 },
  },
  maxWidth: {
    type: 'number',
  },
  minHeight: {
    type: 'number',
    size: { min: 1 },
  },
  maxHeight: {
    type: 'number',
  },
  resizeHandlerClassName: {
    type: 'string',
  },
  customMoveHandler: {
    type: 'string',
  },
  customMaximizeHandler: {
    type: 'string',
  },
  movable: {
    type: 'boolean|string',
    required: false,
  },
  resizable: {
    type: 'boolean|string',
    required: false,
  },
  maximizeCallback: {
    type: 'function',
  },
};
export function validate(customParams = {}) {
  const schema = new Schema(RULES);
  const validateResult = schema.validate(customParams);
  if (validateResult.status) {
    return;
  } else {
    console.warn(
      'There are some mistakes in your params to vue-directive-window, please fix them. Otherwise, it will act not like what you expected.'
    );
    if (Array.isArray(validateResult.errors)) {
      validateResult.errors.forEach(error => {
        console.warn(error.msg);
        /* 参数有误则立刻抛出异常 */
        throw 'Params validation failed, so vue-directive-window stopped.';
      });
    }
  }
}
