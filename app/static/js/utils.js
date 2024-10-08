const ajax = (url, callback, data) => {
  const x = new XMLHttpRequest();
  x.open(data ? 'POST' : 'GET', url, true);
  x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  x.onreadystatechange = function() {
    if (x.readyState > 3 && callback) {
      callback(JSON.parse(x.responseText), x);
    }
  };
  x.send(data);
};

const createTrackingLink = (href) => {
  const link = document.createElement('a');
  link.className = 'tracking-link';
  link.textContent = 'View Tracking Info';
  link.href = href;
  mainDiv.prepend(link);
};

const compareQuery = (query, provider) => {
  return provider.expr.find((regex) => query.match(regex));
};

const checkForTracking = () => {
  const mainDiv = document.getElementById('main');
  const searchBar = document.getElementById('search-bar');

  if (!mainDiv || !searchBar) {
    return;
  }

  const query = searchBar.value.replace(/\s+/g, '');

  const matchTracking = {
    ups: {
      link: `https://www.ups.com/track?tracknum=${query}`,
      expr: [/\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/],
    },
    usps: {
      link: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${query}`,
      expr: [
        /(\b\d{30}\b)|(\b91\d+\b)|(\b\d{20}\b)/,
        /^E\D{1}\d{9}\D{2}$|^9\d{15,21}$/,
        /^91[0-9]+$/,
        /^[A-Za-z]{2}[0-9]+US$/,
      ],
    },
    fedex: {
      link: `https://www.fedex.com/apps/fedextrack/?tracknumbers=${query}`,
      expr: [
        /(\b96\d{20}\b)|(\b\d{15}\b)|(\b\d{12}\b)/,
        /\b((98\d\d\d\d\d?\d\d\d\d|98\d\d) ?\d\d\d\d ?\d\d\d\d( ?\d\d\d)?)\b/,
        /^[0-9]{15}$/,
      ],
    },
  };

  for (const [key, value] of Object.entries(matchTracking)) {
    if (compareQuery(query, value)) {
      createTrackingLink(value.link);
      break;
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {
  checkForTracking();

  const searchBar = document.getElementById('search-bar');
  const resetBtn = document.getElementById('search-reset');

  if (!searchBar || !resetBtn) {
    return;
  }

  resetBtn.addEventListener('click', (event) => {
    event.preventDefault();
    searchBar.value = '';
    searchBar.focus();
  });
});
