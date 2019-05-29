import Schema from 'validate';
const RULES = {
  minWidth: {
    type: Number,
    size: { min: 1 },
  },
  maxWidth: {
    type: Number,
  },
  minHeight: {
    type: Number,
    size: { min: 1 },
  },
  maxHeight: {
    type: Number,
  },
  resizeHandlerClassName: {
    type: String,
  },
  customMoveHandler: {
    type: String,
  },
  customMaximizeHandler: {
    type: String,
  },
};
export function validate(customParams) {
  const schema = new Schema(RULES);
  const errors = schema.validate(customParams);
  if (errors.length === 0) {
    return true;
  } else {
    console.warn(
      'There are some mistakes in your params to vue-directive-window, please fix them. Otherwise, it will act not like what you expected.'
    );
    console.log(errors);
    errors.forEach(error => {
      delete customParams[error.path];
      console.warn(error.message);
    });
  }
}
