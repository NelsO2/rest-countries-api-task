import { useState, useEffect } from "react";
import CountryDetails from "./CountryDetails";
import Switcher from "./Switcher";

export default function Countries() {
  /* function to get all countries */
  const [countries, setCountries] = useState([]); //populate the data after it fetched
  const [searchText, setSearchText] = useState("");
  const regions = [
    //Destructuring props is a way to extract/unpack values from objects or arrays and assign them to variables
    {
      name: "Choose Region",
    },
    {
      name: "Europe",
    },
    {
      name: "Asia",
    },
    {
      name: "Africa",
    },
    {
      name: "Oceania",
    },
    {
      name: "Americas",
    },
    {
      name: "Antarctic",
    },
  ];

  useEffect(() => {
    document.title = `Showing All Countries`;
  }, []); //empty dependency array so that it only run one

  useEffect(() => {
    const getCountries = async () => {
      /* assynchronous function to fetch all countries from the API */
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json(); //convert data to json obj
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };

    getCountries();
  }, []);

  async function searchCountry() {
    /* function to search for a particular country by name */
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${searchText}`
      );
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function filterByRegion(region) {
    /* fetching countries by region, to enable filtering by region */
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSearchCountry(e) {
    e.preventDefault();
    searchCountry(); /* calling the search funtion line:50 */
  }

  function handleFilterByRegion(e) {
    e.preventDefault();
    filterByRegion(); /* calling the filter funtion line:50 */
  }

  return (
    <>
      <Switcher />

      {!countries ? (
        <h1 className="text-gray-900 font-bold uppercase tracking-wide flex items-center justify-center text-center h-screen text-4xl dark:text-white">
          Loading...
        </h1>
      ) : (
        <section className="container mx-auto p-8">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <form
              onSubmit={handleSearchCountry}
              autoComplete="off"
              className="max-w-4xl md:flex-1"
            >
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search for a country by name"
                required
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="py-3 px-4 text-gray-600 placeholder-gray-600 w-full shadow rounded outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700 transition-all duration-200"
              />
            </form>

            <form onSubmit={handleFilterByRegion}>
              <select
                // placeholder="Search for Region"
                name="filter-by-region"
                id="filter-by-region"
                className="w-52 py-3 px-4 outline-none shadow rounded text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700"
                value={regions.name}
                onChange={(e) => filterByRegion(e.target.value)}
              >
                {regions.map((region, index) => (
                  <option key={index} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
            </form>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {countries.map((country) => (
              <CountryDetails key={country.name.common} {...country} /> //(spread operator) passing the remaining properties
            ))}
          </div>
        </section>
      )}
    </>
  );
}
