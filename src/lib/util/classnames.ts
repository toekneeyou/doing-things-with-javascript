type ClassNameArg =
  | Array<ClassNameArg>
  | { [classname: string]: boolean }
  | string
  | undefined;

/**
 * Combines all arguments and returns a string.
 *
 * The argument can either be a string, an object with a class as key
 * and a truthy/falsy value, or an array/nested array containing
 * those two types.
 *
 * @param {...ClassNameArg} args - The arguments to combine.
 * @returns {string} The combined class names.
 */
export const classnames = (
  ...args: Array<ClassNameArg>
): undefined | string => {
  if (args.filter(Boolean).length === 0) return undefined;

  const classNames: string[] = [];

  const recursivelyHandleArgs = (arg: ClassNameArg) => {
    if (Array.isArray(arg)) {
      arg.forEach(recursivelyHandleArgs);
    } else if (typeof arg === "object" && arg !== null) {
      Object.entries(arg).forEach(([key, value]) => {
        if (key && value) {
          classNames.push(key);
        }
      });
    } else if (typeof arg === "string") {
      if (arg) classNames.push(arg.trim());
    } else if (arg) classNames.push(arg);
  };

  args.forEach(recursivelyHandleArgs);

  return classNames.join(" ");
};
