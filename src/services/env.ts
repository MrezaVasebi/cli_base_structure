export const ENV = {
  baseUrl: "https://server_address/",
  version: "v1/",
  fullUrl: function () {
    return `${this.baseUrl}${this.version}`;
  },
};
