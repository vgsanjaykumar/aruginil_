import React from "react";
import LocalFindPageShell from "../../features/localfind/shared/components/LocalFindPageShell";
import LocalFindNotFound from "../../features/localfind/shared/components/LocalFindNotFound";

/**
 * Full-page "not found" state for LocalFind, used whenever a
 * /:city/:category or /:city/:category/:businessSlug URL doesn't
 * resolve to real data (invalid city, invalid category, or a valid
 * city/category combination that isn't offered — e.g.
 * /coimbatore/beauty-parlour).
 */
const LocalFindNotFoundPage = ({ title, message, backTo, backLabel }) => (
  <LocalFindPageShell>
    <LocalFindNotFound title={title} message={message} backTo={backTo} backLabel={backLabel} />
  </LocalFindPageShell>
);

export default LocalFindNotFoundPage;
