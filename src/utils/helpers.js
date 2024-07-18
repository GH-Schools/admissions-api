module.exports = {
  /**
   * @param {string} string
   * @returns string
   */
  capitalizeFirstLetters(string) {
    const output = string
      .trim()
      .replace(/\s+/g, " ")
      .split(" ")
      .map(
        (eachWord) =>
          eachWord.substring(0, 1).toUpperCase() +
          eachWord.substring(1).toLowerCase()
      )
      .join(" ");
    // this.print({ string, output });
    return output;
  },

  formatPhone(mobile) {
    return mobile ? mobile.replace(/(\+234)|(\+233)/g, "0") : null;
  },

  /**
   *
   * @param {*} text
   * @returns string
   */
   formatAsSlug(text) {
    return `${text
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[\\/]/g, "_")
      .replace(/&/g, "and")
      .toLowerCase()}`;
  },

  /**
   * A helper method for generating random characters with configuration options
   * @param {number} length The length of the generated string
   * @param {{
   * lowercase?: boolean,
   * uppercase?: boolean,
   * alphabetsOnly?: boolean,
   * digitsOnly?: boolean,
   * prefix?: string;
   * splitBy?: string;
   * splitInterval?: number
   * }} options Can be used to format the resulting string. options.lowercase
   * results in randomly generated lowercase string while options.uppercase results in randomly
   * generated uppercase string
   * @param {string} characters A string of characters to randomize from. Example: 'AaBbcC01234'
   * @returns string
   */
  generateRandomCharacters(length, options = {}, characters = null) {
    let randomChar = "";
    let CHARACTERS =
      characters ??
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
    options.prefix = options.prefix ?? "";

    if (!!options && options.alphabetsOnly === true) {
      CHARACTERS = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
    }

    if (!!options && options.digitsOnly === true) {
      CHARACTERS = "0123456789";
    }

    if (!!options && options.lowercase === true) {
      CHARACTERS = CHARACTERS.toLowerCase();
    }

    if (!!options && options.uppercase === true) {
      CHARACTERS = CHARACTERS.toUpperCase();
    }

    randomChar = options.prefix;

    // eslint-disable-next-line no-plusplus
    while (length-- > 0) {
      const index = Math.floor(Math.random() * CHARACTERS.length);
      randomChar += CHARACTERS.charAt(index);

      if (!!options && options.splitBy) {
        const splitBy = options.splitBy ?? "-";
        const splitInterval = options.splitInterval ?? 4;

        const pat = new RegExp(`${splitBy}`, "g");

        const actualRandomChar = randomChar.replace(pat, "");

        if (
          (actualRandomChar.length - options.prefix.length) % splitInterval ===
          0
        ) {
          randomChar += `${splitBy}`;
        }
      }
    }

    return randomChar;
  },

  mapAsFilters(requestQuery = {}) {
    const returnedValue = {
      page: 1,
      limit: 20,
      fromDate: new Date(1970, 0, 1),
      toDate: new Date(),
      sortBy: [["createdAt", "desc"]],
    };

    const transformers = {
      page: (val) => {
        val = Number(val);
        return {
          key: "page",
          value: val,
        };
      },
      limit: (val) => {
        val = Number(val);
        return {
          key: "limit",
          value: val,
        };
      },
      fromDate: (val) => {
        val = new Date(val);
        return {
          key: "fromDate",
          value: val,
        };
      },
      toDate: (val) => {
        val = new Date(`${val} 23:59:59`);
        return {
          key: "toDate",
          value: val,
        };
      },
      role: (val) => {
        val = val.split(",");
        val = val.map((a) => a.toUpperCase());
        return {
          key: "role",
          value: val,
        };
      },
      minAmount: (val) => {
        val = Number(val);
        return {
          key: "minAmount",
          value: val,
        };
      },
      maxAmount: (val) => {
        val = Number(val);
        return {
          key: "maxAmount",
          value: val,
        };
      },
    };

    Object.entries(requestQuery).forEach(([key, value]) => {
      if (key in transformers) {
        const result = transformers[key](value);
        returnedValue[result.key] = result.value;
      } else {
        returnedValue[key] = value;
      }
    });

    return returnedValue;
  },
};
