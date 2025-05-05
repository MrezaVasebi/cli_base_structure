export const ENV = {
  baseUrl: "https://server_address/",
  version: "v1/",
  getFullUrl: function () {
    return `${this.baseUrl}${this.version}`;
  },
};
