import React from "react";

const makeProxy = () =>
  new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...props }: any) =>
          React.createElement(tag, props, children),
    }
  );

const motion = makeProxy();
const m = makeProxy();

const useInView = () => true;
const useAnimation = () => ({ start: jest.fn() });
const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const LazyMotion = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const domAnimation = {};

export { motion, m, useInView, useAnimation, AnimatePresence, LazyMotion, domAnimation };
