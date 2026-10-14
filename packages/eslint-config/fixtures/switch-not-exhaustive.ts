type Role = "admin" | "manager" | "worker";

export function describeRole(role: Role): string {
  switch (role) {
    case "admin":
      return "Administrator";
    case "manager":
      return "Manager";
  }
  return "unknown";
}
