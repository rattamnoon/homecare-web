import { IPaginateMeta } from "@/gql/generated/graphql";
import { TablePaginationConfig } from "antd";
import numeral from "numeral";

export const getTablePaginationProps = (
  meta?: IPaginateMeta | null
): TablePaginationConfig => {
  return {
    current: meta?.currentPage,
    pageSize: meta?.itemsPerPage,
    total: meta?.totalItems || 0,
    position: ["bottomCenter"],
    showTotal: () => {
      if (!meta) {
        return "";
      }
      const first = (meta.currentPage - 1) * meta.itemsPerPage + 1;
      const last = first + (meta.itemCount || 0) - 1;

      const firstText = numeral(first).format("0,0");
      const lastText = numeral(last).format("0,0");
      const totalText = numeral(meta.totalItems).format("0,0");

      return `${firstText}-${lastText} of ${totalText} items`;
    },
  };
};
