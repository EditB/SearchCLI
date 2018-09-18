// data file options
exports.dataFile = [
    "organizations",
    "tickets",
    "users"
];

exports.organizationsFields = [
  "_id",
  "url",
  "external_id",
  "name",
  "domain_names",
  "created_at",
  "details",
  "shared_tickets",
  "tags"
];

exports.ticketsFields = [
  "_id",
  "url",
  "external_id",
  "created_at",
  "type",
  "subject",
  "description",
  "priority",
  "status",
  "submitter_id",
  "assignee_id",
  "organization_id",
  "tags",
  "has_incidents",
  "due_at",
  "via"
];

exports.usersFields = [
  "_id",
  "url",
  "external_id",
  "name",
  "alias",
  "created_at",
  "active",
  "verified",
  "shared",
  "locale",
  "timezone",
  "last_login_at",
  "email",
  "phone",
  "signature",
  "organization_id",
  "tags",
  "suspended",
  "role"
];

exports.timeStampFields = [
    "created_at",
    "due_at",
    "last_login_at"
];

exports.arrayFields = [
    "domain_names",
    "tags"
];

exports.numericFields = [
    "submitter_id",
    "organization_id",
    "assignee_id"
];

exports.booleanFields = [
    "shared_tickets",
    "has_incidents",
    "active",
    "verified",
    "shared",
    "suspended"
];

exports.numericIDFiles = [
    "organizations",
    "users"
];
