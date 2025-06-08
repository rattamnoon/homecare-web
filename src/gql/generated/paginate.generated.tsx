import * as Types from "./graphql";

import { gql } from "@apollo/client";
export type IPaginateMetaFragment = {
  __typename?: "IPaginateMeta";
  totalItems?: number | null;
  itemCount: number;
  itemsPerPage: number;
  totalPages?: number | null;
  currentPage: number;
};

export type IPaginateLinksFragment = {
  __typename?: "IPaginateLinks";
  first?: string | null;
  previous?: string | null;
  next?: string | null;
  last?: string | null;
};

export const IPaginateMetaFragmentDoc = gql`
  fragment IPaginateMeta on IPaginateMeta {
    totalItems
    itemCount
    itemsPerPage
    totalPages
    currentPage
  }
`;
export const IPaginateLinksFragmentDoc = gql`
  fragment IPaginateLinks on IPaginateLinks {
    first
    previous
    next
    last
  }
`;
