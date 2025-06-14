import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

interface CustomCollapseProps {
  children: React.ReactNode;
  open: boolean;
}

export const CustomCollapse = ({ children, open }: CustomCollapseProps) => {
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          initial={{ height: 0, opacity: 0, scale: 1 }}
          animate={{ height: "auto", opacity: 1, scale: 1 }}
          exit={{ height: 0, opacity: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
