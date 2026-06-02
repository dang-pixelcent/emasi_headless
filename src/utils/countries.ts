// utils/countries.ts
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

countries.registerLocale(en);

export const countryOptions = Object.entries(
  countries.getNames("en", { select: "official" })
).map(([code, name]) => ({
  code,
  name,
}));

export const listCountriesFlags = countryOptions.map((country) => ({
  id: country.name,
  name: country.name,
  code: country.code,
  image: `https://flagcdn.com/w40/${country.code.toLowerCase()}.png`,
}));