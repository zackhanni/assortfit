import React from "react";

const page = () => {
  return (
    <main className="flex min-h-screen flex-1 flex-col bg-pattern bg-cover bg-top bg-dark-100 px-5 xs:px-10 md:px-16 items-center justify-center">
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
        Woah, Slow down there, speedy!
      </h1>
      <p className="mt-3 max-w-xl text-center text-light-100">
        Looks like you&apos;ve been a little too eager. We put a temporary pause
        on your excitement. Wait a minute and try again.
      </p>
    </main>
  );
};

export default page;
