const getDomain = (url: string) => {
  const urlObj = new URL(url);
  const hostItems = urlObj.host.split('.');
  return `.${hostItems.slice(hostItems.length - 2).join('.')}`;
};

export default {
  getDomain,
};
