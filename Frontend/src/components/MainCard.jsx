import React from "react";

const MainCard = () => {
  return (
    <div>
      <section class="bg-white dark:bg-gray-900 mt-10">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
            <h1 class="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">
              How to quickly deploy a static website
            </h1>
            <p class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
              Static websites are now used to bootstrap lots of websites and are
              becoming the basis for a variety of tools that even influence both
              web designers and developers.
            </p>
            <a
              href="#drag"
              class="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Let's go
              <svg
                class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainCard;
