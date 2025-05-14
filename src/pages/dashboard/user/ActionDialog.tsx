import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,

} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import EditUserForm from "./EditUserForm";
import { userDto } from "@/dto/userDto";

const UserActionDialog = ({ rowData }: {rowData: userDto}) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Manage User");
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen((prevState) => !prevState)}>
      <DialogTrigger asChild>
        <Button variant="secondary" className={"cursor-pointer bg-muted"} size={"icon"}>
          <Eye size={64} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-sm sm:max-w-xl max-h-[90vh] overflow-y-auto md:p-6 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-teal-800 text-center">{dialogTitle}</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            (Admin Access only)
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-x-2">
          <EditUserForm
            setIsOpen={setIsOpen}
            setDialogTitle={setDialogTitle}
            user={rowData}
          />
        </div>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserActionDialog;