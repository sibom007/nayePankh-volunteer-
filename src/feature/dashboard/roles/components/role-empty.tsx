import { Users } from "lucide-react";

export  function RolesEmpty() {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center gap-4">
      <Users className="text-muted-foreground h-12 w-12" />

      <div className="text-center">
        <h2 className="text-xl font-semibold">No users found</h2>

        <p className="text-muted-foreground">
          There are currently no users available.
        </p>
      </div>
    </div>
  );
}
