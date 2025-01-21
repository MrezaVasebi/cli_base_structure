import { ENV } from "./env";

const url = ENV.fullUrl();

export const APIs = {
  auth: {
    login: `${url}login`,
    signIn: `${url}signIn`,
    check_me: `${url}check_me`,
  },
  user: {
    getProfile: function (userId: string) {
      return `${url}profile/userId=${userId}`;
    },
    editInfo: function (userId: string) {
      return `${url}profile/edit/userId=${userId}`;
    },
  },
};
