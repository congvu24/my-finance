import 'intl';

import 'intl/locale-data/jsonp/en';

export default function formatMoney(value = 0) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(value);
}
