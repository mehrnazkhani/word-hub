import { AlertTriangle, Trash2, UserX } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function PrivacySettings() {
  return (
    <Card className="border-red-500/20 bg-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>

          <div>
            <CardTitle className="text-red-500">Danger Zone</CardTitle>

            <CardDescription className="mt-1">
              These actions are permanent and cannot be undone.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Delete Categories */}

        <Card className="border-red-500/20 bg-red-500/3">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
                <Trash2 className="h-7 w-7 text-red-500" />
              </div>

              <div>
                <h3 className="text-lg font-semibold">Delete All Categories</h3>

                <p className="mt-2 max-w-md text-muted-foreground">
                  Permanently delete every category together with all related
                  words and data.
                </p>
              </div>
            </div>

            <Button variant="destructive" className="ml-8">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete All
            </Button>
          </CardContent>
        </Card>

        {/* Delete Account */}

        <Card className="border-red-500/20 bg-red-500/3">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
                <UserX className="h-7 w-7 text-red-500" />
              </div>

              <div>
                <h3 className="text-lg font-semibold">Delete Account</h3>

                <p className="mt-2 max-w-md text-muted-foreground">
                  Permanently remove your account, categories, words, progress,
                  and every piece of stored data.
                </p>
              </div>
            </div>

            <Button variant="destructive" className="ml-8">
              <UserX className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
