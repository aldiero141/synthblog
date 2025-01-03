import { useEffect, useState } from "react";
import WelcomeDialog from "~/components/Dialog/WelcomeDialog";
import Posts from "~/components/posts";
import { UserState } from "~/store/user";

export default function Home() {
  const [openWelcomeDialog, setOpenWelcomeDialog] = useState<boolean>(false);
  const { data: userCredential } = UserState();

  const onConfirmWelcomeDialog = () => {
    setOpenWelcomeDialog(false);
  };

  useEffect(() => {
    if (!userCredential?.token) {
      setOpenWelcomeDialog(true);
    }
  }, []);

  return (
    <>
      <div className="mt-8">
        <WelcomeDialog
          key="welcome-dialog"
          open={openWelcomeDialog}
          onConfirm={() => {
            onConfirmWelcomeDialog();
          }}
        />

        <Posts />
      </div>
    </>
  );
}
