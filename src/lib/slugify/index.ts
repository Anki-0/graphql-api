import { randomString } from '../../utils/helpers.js';
import charmap from './config/charmap.js';
import locales from './config/locales.js';

interface SlugifyOptionsParams {
  replacement?: string; // replace spaces with replacement character, defaults to `-`
  remove?: string; // remove characters that match regex, defaults to `undefined`
  lower?: boolean; // convert to lower case, defaults to `false`
  strict?: boolean; // strip special characters except replacement, defaults to `false`
  locale?: keyof typeof locales; // language code of the locale to use
  trim?: boolean; // trim leading and trailing replacement chars, defaults to `true`
  unique?: boolean; // unique add a unique identifier at end of slug, defaults to `true`
}

const slugify = (content: string, options?: SlugifyOptionsParams) => {
  //   const locale = options?.locale ? locales[options.locale] : {};
  const {
    replacement = '-',
    remove,
    lower = false,
    strict = false,
    trim = true,
    unique = true
  } = options ?? {};

  let slug = content
    .normalize()
    .split('')
    // replace characters based on charMap
    .reduce((result, ch) => {
      let appendChar = locales[ch as keyof typeof locales] as unknown as string;
      if (!appendChar) appendChar = charmap[ch as keyof typeof charmap];
      if (!appendChar) appendChar = ch;
      if (appendChar === replacement) appendChar = ' ';

      return (
        result +
        appendChar
          // `remove` characters that match regex, defaults to `undefined`
          .replace(remove || /[^\w\s$*_+~.()'"!\-:@]+/g, '')
      );
    }, '');

  // strip special characters except replacement, defaults to `false`
  if (strict) {
    slug = slug.replace(/[^A-Za-z0-9\s]/g, '');
  }

  // trim leading and trailing replacement chars, defaults to `true`
  if (trim) {
    slug = slug.trim();
  }

  // convert to lower case, defaults to `false`
  if (lower) {
    slug = slug.toLowerCase();
  }
  // add a unique identifier at end of slug, defaults to `true`
  if (unique) {
    slug = slug.concat(`--${randomString(11)}`);
  }

  // Replace spaces with replacement character, treating multiple consecutive
  // spaces as a single space.
  slug = slug.replace(/\s+/g, replacement);

  return slug;
};

export default slugify;
