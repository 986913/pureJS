/*
  Given a list of strings, implement a function listFormat that returns the items concatenated into a single string.
  A common use case would be in summarizing the reactions for social media posts.

  The function should support a few options as the second parameter:
    sorted: Sorts the items by alphabetical order.
    length: Show only the first length items, using "and X other(s)" for the remaining. Ignore invalid values (negative, 0, etc).
    unique: Remove duplicate items.
*/

/* ----------------------------用例测试--------------------------------*/
listFormat(); // ''
listFormat([]); // ''
listFormat(['Bob']); // 'Bob'
listFormat(['Bob', 'Alice']); // 'Bob and Alice'
listFormat(['Bob', 'Ben', '', '', 'John']); // 'Bob, Ben and John'
listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John']); // 'Bob, Ben, Tim, Jane and John'
listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], {
  length: 3,
}); // 'Bob, Ben, Tim and 2 others'
listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], {
  length: 4,
}); // 'Bob, Ben, Tim, Jane and 1 other'
listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], {
  length: 3,
  sorted: true,
}); // 'Ben, Bob, Jane and 2 others'
listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John', 'Bob'], {
  length: 3,
  unique: true,
}); // 'Bob, Ben, Tim and 2 others'
listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], {
  length: 3,
  unique: true,
}); // 'Bob, Ben, Tim and 2 others'

/* -------------------------- Code Solution -------------------------------- */
/**
 * @param {Array<string>} items
 * @param {{sorted?: boolean, length?: number, unique?: boolean}} [options]
 * @return {string}
 */

const SEPARATOR = ', ';
const OTHERS_SEPARATOR = ' and ';
const OTHERS_LABEL = 'other';

export default function listFormat(itemsParam, options = {}) {
  if (!itemsParam || itemsParam.length === 0) return '';

  // No processing is needed if there's only one item.
  if (itemsParam.length === 1) return itemsParam[0];
  // Filter falsey values.
  let items = itemsParam.filter((item) => !!item);
  const { sorted, unique, length } = options;
  // Sort values.
  if (sorted) items.sort();
  // Remove duplicate values.
  if (unique) items = [...new Set(items)];
  // Length is specified and valid.
  if (length && length > 0 && length < items.length) {
    const firstSection = items.slice(0, length).join(SEPARATOR);
    const count = items.length - length;
    const secondSection = `${count} ${OTHERS_LABEL + (count > 1 ? 's' : '')}`;
    return [firstSection, secondSection].join(OTHERS_SEPARATOR);
  }

  // Case where length is not specified.
  const firstSection = items.slice(0, items.length - 1).join(SEPARATOR);
  const secondSection = items[items.length - 1];
  return [firstSection, secondSection].join(OTHERS_SEPARATOR);
}
