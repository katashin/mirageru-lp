import React from "react";

const motion = new Proxy(
  {},
  {
    get: (_target, tag: string) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ({ children, ...props }: any) =>
        React.createElement(tag, props, children),
  }
);

const useInView = () => true;
const useAnimation = () => ({ start: jest.fn() });
const AnimatePresence = ({ children }: { children: React.ReactNode }) =>
  <>{children}</>;

export { motion, useInView, useAnimation, AnimatePresence };
