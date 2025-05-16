import { ENV } from "./env";

const url = ENV.getFullUrl();

export const Urls = {
  auth: {
    login: `${url}login`,
    signIn: `${url}signIn`,
    check_me: `${url}check_me`,
  },
  user: (userId: string) => {
    return {
      getProfile: function () {
        return `${url}profile/userId=${userId}`;
      },
      editInfo: () => {
        return `${url}profile/edit/userId=${userId}`;
      },
    };
  },
};
